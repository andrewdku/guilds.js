import type { ClientEvents, ClientPresence, ClientProps, GatewayPayload } from "@/types";
import { DiscordAPI, EventHandler, GuildsError, Routes } from "@/classes";
import { activityTypes, opCodes } from "@/utils";

export class Client<Ready extends boolean = false> extends EventHandler<ClientEvents> {
    #api: DiscordAPI;
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

        this.#token = props.token.trim().toLowerCase().startsWith("bot ")
            ? props.token
            : `Bot ${props.token}`;

        this.#intents = props.intents;
        this.#api = new DiscordAPI(this.#token);

        return this;
    }

    public async connect(): Promise<Client<true>> {
        const res = await this.#api.get(Routes.gateway(true));
        const userRes = await this.#api.get(Routes.user());

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
