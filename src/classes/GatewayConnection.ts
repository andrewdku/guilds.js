import type { GatewayPayload } from "@/types";
import { baseApiUrl, opCodes } from "@/utils";
import { Client } from "@/classes/Client";
import { GuildsError } from "@/classes/GuildsError";

export class GatewayConnection {
    #client: Client;
    #heartbeatInterval?: NodeJS.Timeout;
    #sequenceNumber: number | null = null;
    #ws?: WebSocket;

    public get heartbeatInterval() {
        return this.#heartbeatInterval;
    }

    public constructor(client: Client) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("GatewayError", "Invalid gateway client provided");
        }

        this.#client = client;
    }

    public async connect() {
        const res = await fetch(`${baseApiUrl}/gateway/bot`, {
            headers: {
                Authorization: this.#client.token,
            },
        });

        const userRes = await fetch(`${baseApiUrl}/users/@me`, {
            headers: { Authorization: this.#client.token },
        });

        if (!res.ok || !userRes.ok) {
            throw new GuildsError(
                "GatewayError",
                "Failed to connect to the Discord gateway"
            );
        }

        const data: any = await res.json();

        this.#ws = new WebSocket(`${data.url}?v=10&encoding=json`);
        this.#ws.onmessage = (event) => {
            const payload: GatewayPayload = JSON.parse(event.data.toString());

            if (payload.s !== undefined && payload.s !== null) {
                this.#sequenceNumber = payload.s;
            }

            switch (payload.op) {
                case opCodes.Hello: {
                    this.#heartbeatInterval = setInterval(() => {
                        this.#ws?.send(
                            JSON.stringify({
                                op: opCodes.Heartbeat,
                                d: this.#sequenceNumber,
                            })
                        );
                    }, payload.d.heartbeat_interval);

                    this.#ws?.send(
                        JSON.stringify({
                            op: opCodes.Identify,
                            d: {
                                token: this.#client.token,
                                intents: this.#client.intents,
                                properties: {
                                    $os: "linux",
                                    $browser: "guilds.js",
                                    $device: "guilds.js",
                                },
                            },
                        })
                    );
                }
            }
        };
    }

    public async disconnect() {
        if (this.#heartbeatInterval) {
            clearInterval(this.#heartbeatInterval);
        }

        if (this.#ws) {
            this.#ws.close(1000, "Client disconnected");
            this.#ws = undefined;
        }
    }
}
