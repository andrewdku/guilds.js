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
            throw new GuildsError("ClientPropsError", "Props must be provided");
        }

        if (!props.token) {
            throw new GuildsError("ClientTokenError", "Token must be provided");
        }

        if (!props.intents) {
            throw new GuildsError("ClientIntentsError", "Intents must be provided");
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
