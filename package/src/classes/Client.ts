import { CacheManager } from "@/classes/CacheManager";
import { ClientUser } from "@/classes/ClientUser";
import { Endpoints } from "@/utils/endpoints";
import { EventHandler } from "@/classes/EventHandler";
import { Guild } from "@/classes/Guild";
import { GuildsError } from "@/classes/GuildsError";
import { handleGatewayEvents } from "@/functions/gateway-events";
import { Message } from "@/classes/Message";
import { parseIntents } from "@/functions/parse-intents";
import { RESTManager } from "@/classes/RESTManager";
import { User } from "@/classes/User";
import {
    ActivityTypes,
    defaultClientPresence,
    GatewayOpcodes,
} from "@/utils/constants";
import type {
    ClientEvents,
    ClientPresence,
    ClientPresenceProps,
    ClientProps,
    CreateMessageProps,
    GatewayPayload,
} from "@/types";

/** Class representing a Discord client */
export class Client extends EventHandler<ClientEvents> {
    #token: string;

    /**
     * Whether the client has been destroyed,
     * used to prevent false reconnect attempts
     */
    public destroyed: boolean = false;

    /**
     * Heartbeat interval provided by Discord's gateway,
     * cleared and recreated upon reconnecting
     */
    public heartbeatInterval?: NodeJS.Timeout;

    /** Parsed client intents bitfield */
    public intents: number;

    /** Whether the last heartbeat was acknowledged by Discord */
    public lastHeartbeatAck: boolean = true;

    /** The client's current presence configuration */
    public presence: ClientPresence = defaultClientPresence;

    /** Whether the Dispatch (i.e., ready) event was received */
    public ready: boolean = false;

    /** REST manager used for API requests */
    public rest: RESTManager;

    /**
     * Last sequence number provided by Discord's gateway,
     * used for heartbeats and session resuming
     */
    public sequenceNumber: number | null = null;

    /** Active session ID for resuming connection */
    public sessionId?: string;

    /** Represents the client's Discord user */
    public user: ClientUser | null = null!;

    /** The WebSocket connected to Discord's gateway */
    public ws?: WebSocket;

    /** Internal cache for API structures */
    public cache = {
        guilds: new CacheManager<Guild>(),
        messages: new CacheManager<Message>(),
        users: new CacheManager<User>(),
    } as const;

    /**
     * Instantiate a new client
     * @param props Options such as token and intents
     */
    public constructor(props: ClientProps) {
        super();

        if (!props || typeof props !== "object") {
            throw new GuildsError(
                "Invalid client props provided",
                "ClientPropsError"
            );
        }

        if (!props.token || typeof props.token !== "string") {
            throw new GuildsError("Invalid token provided", "ClientTokenError");
        }

        if (
            props.intents === null ||
            props.intents === undefined ||
            (Array.isArray(props.intents) == false &&
                typeof props.intents !== "number")
        ) {
            throw new GuildsError("Invalid intents provided", "ClientIntentsError");
        }

        if (props.presence) {
            if (typeof props.presence !== "object") {
                throw new GuildsError(
                    "Invalid client presence was provided",
                    "ClientPropsError"
                );
            }

            this.setPresence(props.presence);
        }

        this.#token = props.token.trim().toLowerCase().startsWith("bot ")
            ? props.token
            : `Bot ${props.token}`;

        this.intents = parseIntents(props.intents);
        this.rest = new RESTManager(this.#token);

        return this;
    }

    /**
     * Formatted bot token accessor, starting with "Bot "
     * and used for authentication
     */
    public get token() {
        return this.#token;
    }

    /**
     * Fetches Discord's gateway information then connects to it,
     * and fetches the bot's user before identifying
     */
    public async connect(): Promise<Client> {
        const res = await this.rest.get(Endpoints.gatewayBot());
        const user = await this.fetchUser("@me");

        if (!res.ok || !user) {
            throw new GuildsError("Failed to connect to Discord", "DiscordAPIError");
        }

        this.destroyed = false;
        this.lastHeartbeatAck = true;
        this.user = new ClientUser(this, user.rawData)!;
        this.#connectWebSocket(res.data.url);

        return this;
    }

    /**
     * Manages the WebSocket as well as connecting and reconnecting
     * @param url URL to connect the WebSocket to
     */
    #connectWebSocket(url: string): void {
        if (this.destroyed) {
            return;
        }

        this.ws = new WebSocket(`${url}?v=10&encoding=json`);
        this.ws.onopen = () => {
            this.emit("debug", "WebSocket connected");
        };

        this.ws.onerror = (error) => {
            this.emit("error", `WebSocket error: ${error}`);
        };

        this.ws.onmessage = (event) => {
            this.#handleGatewayEvent(JSON.parse(event.data.toString()));
        };

        this.ws.onclose = (event) => {
            this.emit("debug", `WebSocket closed: ${event.reason} (${event.code})`);

            if (!this.destroyed) {
                setTimeout(() => this.#connectWebSocket(url), 3000);
            }
        };
    }

    /**
     * Processes incoming gateway payloads
     * @param payload Payload data from Discord's gateway
     */
    #handleGatewayEvent(payload: GatewayPayload) {
        if (payload.s !== undefined && payload.s !== null) {
            this.sequenceNumber = payload.s;
        }

        switch (payload.op) {
            case GatewayOpcodes.Hello: {
                this.emit("debug", "Received Hello event");

                if (this.heartbeatInterval) {
                    clearInterval(this.heartbeatInterval);
                }

                this.lastHeartbeatAck = true;
                this.heartbeatInterval = setInterval(() => {
                    if (!this.lastHeartbeatAck) {
                        this.emit("debug", "Heartbeat ACK failed, reconnecting...");

                        this.ws?.close(4000, "Heartbeat failed");
                        return;
                    }

                    this.lastHeartbeatAck = false;
                    this.ws?.send(
                        JSON.stringify({
                            op: GatewayOpcodes.Heartbeat,
                            d: this.sequenceNumber,
                        })
                    );
                }, payload.d.heartbeat_interval);

                if (this.sessionId) {
                    this.ws?.send(
                        JSON.stringify({
                            op: GatewayOpcodes.Resume,
                            d: {
                                token: this.#token,
                                session_id: this.sessionId,
                                seq: this.sequenceNumber,
                            },
                        })
                    );

                    this.emit("debug", "Resuming  session...");
                } else {
                    this.ws?.send(
                        JSON.stringify({
                            op: GatewayOpcodes.Identify,
                            d: {
                                token: this.#token,
                                intents: this.intents,
                                presence: this.presence,
                                properties:
                                    this.presence.platform === "desktop"
                                        ? {
                                              $os: "linux",
                                              $browser: "guilds.js",
                                              $device: "guilds.js",
                                          }
                                        : {
                                              $os: "Discord Android",
                                              $browser: "Discord Android",
                                              $device: "Discord Android",
                                          },
                            },
                        })
                    );

                    this.emit("debug", "Identifying...");
                }

                break;
            }

            case GatewayOpcodes.HeartbeatACK: {
                this.lastHeartbeatAck = true;
                break;
            }

            case GatewayOpcodes.Dispatch: {
                handleGatewayEvents(this, payload);
                break;
            }
        }
    }

    /**
     * Sends a message to a specified channel
     * @param channelId ID of the channel to send the message to
     * @param props Message data, such as content
     */
    public async createMessage(
        channelId: string,
        props: CreateMessageProps
    ): Promise<void> {
        if (!channelId || typeof channelId !== "string") {
            throw new GuildsError("Invalid channel ID", "CreateMessageError");
        }

        if (!props || (props && !props.content)) {
            throw new GuildsError("Invalid message data", "CreateMessageError");
        }

        await this.rest.post(Endpoints.channelMessages(channelId), {
            body: JSON.stringify(props),
        });
    }

    /**
     * Fetches a guild by its ID
     * @param id ID of the guild to fetch
     * @param options Fetch options
     * @returns Guild object or null
     */
    public async fetchGuild(
        id: string,
        options?: { force?: boolean }
    ): Promise<Guild | null> {
        if (!options?.force) {
            const cached = this.cache.guilds.get(id);

            if (cached) {
                return cached;
            }
        }

        const res = await this.rest.get(Endpoints.guild(id));

        if (!res.ok) {
            return null;
        }

        const guild = new Guild(this, res.data);
        this.cache.guilds.set(id, guild);
        return guild;
    }

    /**
     * Fetches a user by their ID
     * @param id ID of the user to fetch (default: "@me")
     * @param options Fetch options
     * @returns User object or null
     */
    public async fetchUser(
        id: string = "@me",
        options?: { force?: boolean }
    ): Promise<User | null> {
        if (!options?.force) {
            const cached = this.cache.users.get(id);

            if (cached) {
                return cached;
            }
        }

        const res = await this.rest.get(Endpoints.user(id));

        if (!res.ok) {
            return null;
        }

        const user = new User(this, res.data);
        this.cache.users.set(id, user);
        return user;
    }

    /**
     * Updates the client's presence and over the Gateway if connected
     * @param presence New presence information
     * @returns Client instance
     */
    public setPresence(presence: ClientPresenceProps) {
        this.presence = { ...this.presence, ...presence } as ClientPresence;

        if (this.ws) {
            this.ws.send(
                JSON.stringify({
                    op: GatewayOpcodes.PresenceUpdate,
                    d: {
                        status: this.presence.status,
                        since: null,
                        afk: false,
                        activities: (this.presence.activities ?? []).map(
                            (activity) => ({
                                ...activity,
                                type:
                                    typeof activity.type === "string"
                                        ? ActivityTypes[
                                              activity.type as keyof typeof ActivityTypes
                                          ]
                                        : activity.type,
                            })
                        ),
                    },
                })
            );
        }

        return this;
    }

    /** Disconnects from Discord's gateway and closes the WebSocket connection */
    public disconnect(): void {
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        this.ws?.close(1000, "Client disconnected");
        this.ws = undefined;
    }
}
