import type {
    ClientEvents,
    ClientPresenceProps,
    ClientProps,
    GatewayPayload,
} from "@/types";
import { EventHandler, GuildsError, Endpoints, RESTManager } from "@/classes";
import { activityTypes, opCodes } from "@/utils";

/**
 * Class representing a Discord bot client
 */
export class Client<Ready extends boolean = false> extends EventHandler<ClientEvents> {
    #token: string;
    #heartbeatInterval?: NodeJS.Timeout;
    #sequenceNumber: number | null = null;
    #sessionId?: string;
    #intents: number;
    #presence: ClientPresenceProps = {
        platform: "desktop",
        status: "online",
        activities: [],
    };
    #rest: RESTManager;
    #ready: boolean = false;
    #ws?: WebSocket;

    /**
     * The client's token
     */
    public get token() {
        return this.#token;
    }

    /**
     * The client's intents as a number
     */
    public get intents() {
        return this.#intents;
    }

    /**
     * The websocket heartbeat interval
     */
    public get heartbeatInterval() {
        return this.#heartbeatInterval;
    }

    /**
     * The client's user presence
     */
    public get presence() {
        return this.#presence;
    }

    /**
     * The client's REST manager
     */
    public get rest() {
        return this.#rest;
    }

    /**
     * @returns Boolean representing whether the client is ready
     */
    public isReady(): this is Client<true> {
        return this.#ready;
    }

    /**
     * Instantiate a new Client
     * @param props Client configuration
     */
    public constructor(props: ClientProps) {
        super();

        if (!props || typeof props !== "object") {
            throw new GuildsError(
                "Invalid client props were provided",
                "ClientPropsError"
            );
        }

        if (!props.token || typeof props.token !== "string") {
            throw new GuildsError("Invalid token was provided", "ClientTokenError");
        }

        if (!props.intents || typeof props.intents !== "number") {
            throw new GuildsError("Invalid intents were provided", "ClientIntentsError");
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

        this.#intents = props.intents;
        this.#rest = new RESTManager(this.#token);

        return this;
    }

    /**
     * Start the connection to Discord's gateway
     */
    public async connect(): Promise<Client<true>> {
        const res = await this.#rest.get(Endpoints.gatewayBot());
        const userRes = await this.#rest.get(Endpoints.user());

        if (!res.ok || !userRes.ok || !res || !userRes) {
            throw new GuildsError("Failed to connect to Discord", "GatewayError");
        }

        const data: any = await res.json();

        this.#ws = new WebSocket(`${data.url}?v=10&encoding=json`);
        this.#ws.onmessage = (event) => {
            this.#handleGatewayEvent(JSON.parse(event.data.toString()));
        };

        return this as Client<true>;
    }

    /**
     * Handle incoming gateway events
     */
    #handleGatewayEvent(payload: GatewayPayload) {
        if (payload.s !== undefined && payload.s !== null) {
            this.#sequenceNumber = payload.s;
        }

        switch (payload.op) {
            case opCodes.Hello: {
                this.emit("debug", "Received Hello event");
                this.#heartbeatInterval = setInterval(() => {
                    this.#ws?.send(
                        JSON.stringify({
                            op: opCodes.Heartbeat,
                            d: this.#sequenceNumber,
                        })
                    );
                }, payload.d.heartbeat_interval);

                this.emit("debug", "Identifying...");
                this.#ws?.send(
                    JSON.stringify({
                        op: opCodes.Identify,
                        d: {
                            token: this.#token,
                            intents: this.#intents,
                            presence: this.#presence,
                            properties:
                                this.#presence.platform === "desktop"
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

                break;
            }

            case opCodes.Dispatch: {
                if (payload.t !== "READY") {
                    break;
                }

                this.#sessionId = payload.d.session_id;
                this.#ready = true;
                this.emit("ready", this as Client<true>);

                break;
            }
        }
    }

    /**
     * Update the client's user presence
     * @returns
     */
    public setPresence(presence: Partial<ClientPresenceProps>) {
        this.#presence = { ...this.#presence, ...presence };

        if (this.#ws) {
            this.#ws.send(
                JSON.stringify({
                    op: opCodes.PresenceUpdate,
                    d: {
                        status: this.#presence.status,
                        since: null,
                        afk: false,
                        activities: (this.#presence.activities ?? []).map((a) => ({
                            ...a,
                            type:
                                typeof a.type === "string"
                                    ? activityTypes[a.type as keyof typeof activityTypes]
                                    : a.type,
                        })),
                    },
                })
            );
        }

        return this;
    }

    /**
     * Destroy the connection to Discord's gateway
     */
    public disconnect(): void {
        if (this.#heartbeatInterval) {
            clearInterval(this.#heartbeatInterval);
        }

        if (this.#ws) {
            this.#ws.close(1000, "Client disconnected");
            this.#ws = undefined;
        }

        return;
    }
}
