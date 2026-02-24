import type { DiscordAPI } from "@/typings";
import { Client, GuildsError } from "@/classes";

export class User {
    #client: Client;

    public rawData: DiscordAPI.User;
    public username: string;
    public discriminator: string = "0";

    public constructor(client: Client, data: DiscordAPI.User) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("Invalid client provided", "DiscordAPIError");
        }

        this.#client = client;
        this.rawData = data;
        this.username = data.username;
        this.discriminator = data.discriminator || "0";

        return this;
    }

    public get client() {
        return this.#client;
    }

    public get tag(): string {
        return this.discriminator == "0"
            ? this.username
            : `${this.username}#${this.discriminator}`;
    }
}
