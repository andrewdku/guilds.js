import type { APIGuild } from "discord-api-types/v10";
import { Client } from "@/classes/Client";
import { GuildsError } from "@/classes/GuildsError";

/**
 * Class representing a Discord guild (i.e. "server" in the UI)
 * @see https://docs.discord.com/developers/resources/guild#guild-object
 */
export class Guild {
    /** The client associated with this guild */
    public client: Client;

    /** Unique Discord guild ID */
    public id: string;

    /** Guild name */
    public name: string;

    /** Raw API guild data as-is */
    public rawData: APIGuild;

    /**
     * Instantiate a new guild
     * @param client Associated client
     * @param data Discord API guild rawData
     * @returns Guild object
     */
    public constructor(client: Client, data: APIGuild) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("Invalid client provided", "DiscordAPIError");
        }

        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.rawData = data;

        return this;
    }
}
