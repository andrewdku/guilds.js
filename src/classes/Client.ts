import type { ClientEvents, ClientPresence, ClientProps, GatewayPayload } from "@/types";
import { activityTypes, baseApiUrl, opCodes } from "@/utils";
import { EventHandler, GuildsError } from "@/classes";

export class Client<Ready extends boolean = false> extends EventHandler<ClientEvents> {
    #token: string;
    #heartbeatInterval?: NodeJS.Timeout;
    #presence: ClientPresence = { platform: "desktop", status: "online", activities: [] };
    #sequenceNumber: number | null = null;
    #sessionId?: string;
    #intents: number;
    #ready: boolean = false;
    #ws?: WebSocket;

    public get token() {
        return this.#token;
    }

    public get intents() {
        return this.#intents;
    }

    public get heartbeatInterval() {
        return this.#heartbeatInterval;
    }

    public get presence() {
        return this.#presence;
    }

    public isReady(): this is Client<true> {
        return this.#ready;
    }

    public constructor(props: ClientProps) {
        super();

        if (!props) {
            throw new GuildsError("Props must be provided", "ClientPropsError");
        }

        if (!props.token) {
            throw new GuildsError("Token must be provided", "ClientTokenError");
        }

        if (!props.intents) {
            throw new GuildsError("Intents must be provided", "ClientIntentsError");
        }

        this.#intents = props.intents;
        this.#token = props.token.trim().toLowerCase().startsWith("bot ")
            ? props.token
            : `Bot ${props.token}`;

        return this;
    }

    public async connect(): Promise<Client<true>> {
        const res = await fetch(`${baseApiUrl}/gateway/bot`, {
            headers: {
                Authorization: this.#token,
            },
        });

        const userRes = await fetch(`${baseApiUrl}/users/@me`, {
            headers: { Authorization: this.#token },
        });

        if (!res.ok || !userRes.ok) {
            throw new GuildsError(
                "Failed to connect to the Discord gateway",
                "GatewayError"
            );
        }

        const data: any = await res.json();

        this.#ws = new WebSocket(`${data.url}?v=10&encoding=json`);
        this.#ws.onmessage = (event) => {
            this.#handleGatewayEvent(JSON.parse(event.data.toString()));
        };

        return this as Client<true>;
    }

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

    public setPresence(presence: Partial<ClientPresence>) {
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
    }

    public async disconnect(): Promise<void> {
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
