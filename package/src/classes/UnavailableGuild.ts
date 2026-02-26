import type { APIUnavailableGuild } from "discord-api-types/v10";
import { Client } from "@/classes/Client";
import { GuildsError } from "@/classes/GuildsError";

/**
 * Class representing an unavailable Discord guild (server)
 * @see https://docs.discord.com/developers/resources/guild#unavailable-guild-object
 */
export class UnavailableGuild {
    /** The client associated with this guild */
    public client: Client;
    public id: string;
    public rawData: APIUnavailableGuild;
    public unavailable: boolean = true;

    public constructor(client: Client, data: APIUnavailableGuild) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("Invalid client provided", "DiscordAPIError");
        }

        this.client = client;
        this.id = data.id;
        this.rawData = data;
        this.unavailable = data.unavailable;
    }
}
