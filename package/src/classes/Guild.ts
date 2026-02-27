import type { APIGuild } from "discord-api-types/v10";
import { Client } from "@/classes/Client";
import { GuildsError } from "@/classes/GuildsError";

export class Guild {
    public client: Client;
    public id: string;
    public name: string;
    public rawData: APIGuild;

    public constructor(client: Client, data: APIGuild) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("Invalid client provided", "DiscordAPIError");
        }

        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.rawData = data;
    }
}
