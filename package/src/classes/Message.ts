import type { APIMessage } from "discord-api-types/v10";
import { Client } from "@/classes/Client";
import { GuildsError } from "@/classes/GuildsError";

/**
 * Class representing a Discord message
 * @see https://docs.discord.com/developers/resources/message#message-object
 */
export class Message {
    /** The client associated with this message */
    public client: Client;

    /** The content of the message, if exists */
    public content?: string;

    /** Unique Discord message ID */
    public id: string;

    /** Raw API message data as-is */
    public rawData: APIMessage;

    /**
     * Instantiate a new message
     * @param client Associated client
     * @param data Discord API message data
     * @returns Message object
     */
    public constructor(client: Client, data: APIMessage) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("Invalid client provided", "DiscordAPIError");
        }

        this.client = client;
        this.content = data.content;
        this.id = data.id;
        this.rawData = data;

        return this;
    }
}
