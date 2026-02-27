import { ActivityTypes, GatewayOpcodes } from "@/utils/constants";
import { ClientUser } from "@/classes/ClientUser";
import { Endpoints } from "@/utils/endpoints";
import { EventHandler } from "@/classes/EventHandler";
import { GuildsError } from "@/classes/GuildsError";
import { parseIntents } from "@/utils/parse-intents";
import { RESTManager } from "@/classes/RESTManager";
import { User } from "@/classes/User";
import type {
    ClientEvents,
    ClientPresence,
    ClientPresenceProps,
    ClientProps,
    CreateMessageProps,
    GatewayPayload,
} from "@/types";

/** Class representing a Discord client */
export class Client {
    #token: string;

    /** Client event handler */
    public events = new EventHandler<ClientEvents>();

    /** Gateway heartbeat inteval */
    public heartbeatInterval?: NodeJS.Timeout;

    /** Last received sequence number */
    public sequenceNumber: number | null = null;

    /** Gateway session ID */
    public sessionId?: string;

    /** REST manager instance to handle API calls */
    public rest: RESTManager;

    /** Client intents bitfield */
    public intents: number;

    /** Whether the client is ready */
    public ready: boolean = false;

    /** WebSocket connection */
    public ws?: WebSocket;

    /** Client user, or null if not ready */
    public user: ClientUser | null = null!;

    /** Current presence information */
    public presence: ClientPresence = {
        platform: "desktop",
        status: "online",
        activities: [],
    };

    /**
     * Instantiate a new Client
     * @param props Client options
     */
    public constructor(props: ClientProps) {
        if (!props || typeof props !== "object") {
            throw new GuildsError("Invalid client props provided", "ClientPropsError");
        }

        if (!props.token || typeof props.token !== "string") {
            throw new GuildsError("Invalid token provided", "ClientTokenError");
        }

        if (
            props.intents === null ||
            props.intents === undefined ||
            (Array.isArray(props.intents) == false && typeof props.intents !== "number")
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

        this.rest = new RESTManager(this.#token);
        this.intents = parseIntents(props.intents);

        return this;
    }

    /** The client's token */
    public get token() {
        return this.#token;
    }

    /** Start the connection to Discord's gateway */
    public async connect(): Promise<Client> {
        const res = await this.rest.get(Endpoints.gatewayBot());
        const userRes = await this.rest.get(Endpoints.user());

        if (!res.ok || !userRes.ok) {
            throw new GuildsError("Failed to connect to Discord", "DiscordAPIError");
        }

        this.user = new ClientUser(this, userRes.data)!;
        this.lastHeartbeatAck = true;
        this.destroyed = false;
        this.#connectWebSocket(res.data.url);

        return this;
    }

    /** Initialize the WebSocket */
    #connectWebSocket(url: string) {
        if (this.destroyed) {
            return;
        }

        this.ws = new WebSocket(`${url}?v=10&encoding=json`);
        this.ws.onopen = () => {
            this.events.emit("debug", "WebSocket connected");
        };

        this.ws.onerror = (error) => {
            this.events.emit("error", `WebSocket error: ${error}`);
        };

        this.ws.onmessage = (event) => {
            this.#handleGatewayEvent(JSON.parse(event.data.toString()));
        };

        this.ws.onclose = (event) => {
            this.events.emit(
                "debug",
                `WebSocket closed: ${event.reason} (${event.code})`
            );

            if (!this.destroyed) {
                setTimeout(() => this.#connectWebSocket(url), 3000);
            }
        };
    }

    public destroyed: boolean = false;
    public lastHeartbeatAck: boolean = true;

    /** Handle incoming gateway events */
    #handleGatewayEvent(payload: GatewayPayload) {
        if (payload.s !== undefined && payload.s !== null) {
            this.sequenceNumber = payload.s;
        }

        switch (payload.op) {
            case GatewayOpcodes.Hello: {
                this.events.emit("debug", "Received Hello event");

                if (this.heartbeatInterval) {
                    clearInterval(this.heartbeatInterval);
                }

                this.lastHeartbeatAck = true;
                this.heartbeatInterval = setInterval(() => {
                    if (!this.lastHeartbeatAck) {
                        this.events.emit(
                            "debug",
                            "Heartbeat ACK failed, reconnecting..."
                        );
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

                    this.events.emit("debug", "Resuming  session...");
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

                    this.events.emit("debug", "Identifying...");
                }

                break;
            }

            case GatewayOpcodes.HeartbeatACK: {
                this.lastHeartbeatAck = true;
                break;
            }

            case GatewayOpcodes.Dispatch: {
                if (payload.t !== "READY") {
                    break;
                }

                this.sessionId = payload.d.session_id;
                this.ready = true;
                this.events.emit("debug", "Received Dispatch (Ready) event");
                this.events.emit("ready", this);

                break;
            }
        }
    }

    /**
     * Send a message to a specified channel ID
     * @param channelId Channel ID
     * @param data Message data
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
     * Fetch a user by ID
     * @param id User ID (default: @me)
     * @returns User object or null
     */
    public async fetchUser(id: string = "@me"): Promise<User | null> {
        const res = await this.rest.get(Endpoints.user(id));

        if (!res.ok) {
            return null;
        }

        return new User(this, res.data)!;
    }

    /** Update the client's user presence */
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
                        activities: (this.presence.activities ?? []).map((activity) => ({
                            ...activity,
                            type:
                                typeof activity.type === "string"
                                    ? ActivityTypes[
                                          activity.type as keyof typeof ActivityTypes
                                      ]
                                    : activity.type,
                        })),
                    },
                })
            );
        }

        return this;
    }

    /** Destroy the connection to Discord's gateway */
    public disconnect(): void {
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        this.ws?.close(1000, "Client disconnected");
        this.ws = undefined;
    }
}
