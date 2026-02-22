import type { ClientProps } from "@/types";
import { GatewayConnection } from "@/classes/GatewayConnection";
import { GuildsError } from "@/classes/GuildsError";

export class Client {
    #token: string;
    #gateway?: GatewayConnection;
    #intents: number;

    public get token() {
        return this.#token;
    }

    public get intents() {
        return this.#intents;
    }

    public get gateway() {
        return this.#gateway;
    }

    public constructor(props: ClientProps) {
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
    }

    public async connect() {
        if (!this.#gateway) {
            this.#gateway = new GatewayConnection(this);
            this.#gateway.connect();
        }
    }

    public async disconnect() {
        if (this.#gateway) {
            this.#gateway.disconnect();
        }

        return;
    }
}
