import type { APIUnavailableGuild } from "discord-api-types/v10";
import { Client } from "@/classes/Client";
import { GuildsError } from "@/classes/GuildsError";

/** Class representing a Guild unavailable due to outages */
export class UnavailableGuild {
    /** The client associated with this unavailable guild */
    public client: Client;

    /** Unique Discord guild ID */
    public id: string;

    /** Raw API guild data as-is */
    public rawData: APIUnavailableGuild;

    /** Whether this guild is unavailable due to an outage */
    public unavailable: boolean = true;

    /**
     * Instantiate a new unavailable guild
     * @param client Associated client
     * @param data Discord API guild data
     * @returns UnavailableGuild object
     */
    public constructor(client: Client, data: APIUnavailableGuild) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("Invalid client provided", "DiscordAPIError");
        }

        this.client = client;
        this.id = data.id;
        this.rawData = data;
        this.unavailable = data.unavailable || true;

        return this;
    }
}
