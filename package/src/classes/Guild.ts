import type { APIGuild } from "discord-api-types/v10";
import { Client, GuildsError } from "@/index";

/**
 * Class representing a Discord guild (server)
 * @see https://docs.discord.com/developers/resources/guild
 */
export class Guild {
    /** The client associated with this guild */
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
