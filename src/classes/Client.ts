import type { ClientProps } from "@/types";
import { GuildsError } from "@/classes";

export class Client {
    #token: string;
    #intents: number;

    public get token() {
        return this.#token;
    }

    public get intents() {
        return this.#intents;
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

        this.#token = props.token;
        this.#intents = props.intents;
    }
}
