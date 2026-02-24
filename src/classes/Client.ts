import { EventHandler, GuildsError, Endpoints, RESTManager, User } from "@/classes";
import { ActivityTypes, GatewayOpcodes } from "@/utils";
import type {
    ClientEvents,
    ClientPresenceProps,
    ClientProps,
    GatewayPayload,
} from "@/typings";

/** Class representing a Discord client */
export class Client extends EventHandler<ClientEvents> {
    #token: string;

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
    public user: User | null = null!;

    /** Current presence information */
    public presence: ClientPresenceProps = {
        platform: "desktop",
        status: "online",
        activities: [],
    };

    /**
     * Instantiate a new Client
     * @param props Client options
     */
    public constructor(props: ClientProps) {
        super();

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

        if (Array.isArray(props.intents)) {
            let intents = props.intents as number[];
            let parsedIntents: number = 0;

            for (const intent of intents) {
                if (typeof intent !== "number") {
                    throw new GuildsError(
                        "Invalid intents provided",
                        "ClientIntentsError"
                    );
                }

                parsedIntents += intent;
            }

            this.intents = parsedIntents;
        } else if (typeof props.intents === "number") {
            this.intents = props.intents;
        } else {
            throw new GuildsError("Invalid intents provided", "ClientIntentsError");
        }

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

        this.user = new User(this, userRes.data)!;
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
        this.ws.onopen = () => this.emit("debug", "WebSocket connected");
        this.ws.onerror = (error) => this.emit("error", `WebSocket error: ${error}`);
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

    public destroyed: boolean = false;
    public lastHeartbeatAck: boolean = true;

    /** Handle incoming gateway events */
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
                if (payload.t !== "READY") {
                    break;
                }

                this.sessionId = payload.d.session_id;
                this.ready = true;
                this.emit("debug", "Received Dispatch (Ready) event");
                this.emit("ready", this);

                break;
            }
        }
    }

    /** Update the client's user presence */
    public setPresence(presence: Partial<ClientPresenceProps>) {
        this.presence = { ...this.presence, ...presence };

        if (this.ws) {
            this.ws.send(
                JSON.stringify({
                    op: GatewayOpcodes.PresenceUpdate,
                    d: {
                        status: this.presence.status,
                        since: null,
                        afk: false,
                        activities: (this.presence.activities ?? []).map((a) => ({
                            ...a,
                            type:
                                typeof a.type === "string"
                                    ? ActivityTypes[a.type as keyof typeof ActivityTypes]
                                    : a.type,
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
