import { GuildsError } from "@/classes";

export class DiscordAPI {
    #token: string;

    public constructor(token: string) {
        if (!token) {
            throw new GuildsError("Token must be provided", "DiscordAPIError");
        }

        this.#token = token;
    }

    public get token() {
        return this.#token;
    }

    public async get(input: string | URL | Request, init?: RequestInit) {
        return await fetch(input, init);
    }
}
