import type { ClientEvents, ClientProps, GatewayPayload } from "@/types";
import { GuildsError } from "@/classes/GuildsError";
import { EventHandler } from "@/classes/EventHandler";
import { baseApiUrl, opCodes } from "@/utils";

export class Client<
    Ready extends boolean = false,
> extends EventHandler<ClientEvents> {
    #token: string;
    #heartbeatInterval?: NodeJS.Timeout;
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
        this.#ws.onmessage = (event) =>
            this.#handleGatewayEvent(JSON.parse(event.data.toString()));

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
                            properties: {
                                $os: "linux",
                                $browser: "guilds.js",
                                $device: "guilds.js",
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
