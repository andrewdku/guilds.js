import type { DiscordAPI } from "@/typings";
import { Client, GuildsError } from "@/classes";

/**
 * Class representing a Discord guild (server)
 * @see https://docs.discord.com/developers/resources/guild
 */
export class Guild {
    /** The client associated with this guild */
    public client: Client;
    public id: string;
    public name: string;

    public constructor(client: Client, data: DiscordAPI.APIGuild) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("Invalid client provided", "DiscordAPIError");
        }

        this.client = client;
        this.id = data.id;
        this.name = data.name;
    }
}
