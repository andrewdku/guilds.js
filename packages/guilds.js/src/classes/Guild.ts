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

    // TODO: DiscordAPI.Guild
    public constructor(client: Client, data: any) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("Invalid client provided", "DiscordAPIError");
        }

        this.client = client;
        this.id = data.id;
        this.name = data.name;
    }
}
