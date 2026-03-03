import type { APIChannel, APITextBasedChannel } from "discord-api-types/v10";
import type { ChannelType } from "@/types";
import { Channel } from "@/classes/Channel";
import { ChannelTypes } from "@/utils/constants";
import { Client } from "@/classes/Client";
import { Guild } from "@/classes/Guild";

/** Class representing a text channel in a guild */
export class TextChannel extends Channel {
    public type: ChannelType = ChannelTypes.GuildText;
    public guild: Guild | null;

    /**
     * Instantiate a new text channel
     * @param client Associated client
     * @param guild Associated guild
     * @param data Discord API channel data
     * @returns TextChannel object
     */
    public constructor(
        client: Client,
        guild: Guild,
        data: APITextBasedChannel<typeof ChannelTypes.GuildText>
    ) {
        super(client, data as APIChannel);

        if (!guild || !(guild instanceof Guild)) {
            throw new TypeError("Invalid guild provided");
        }

        this.guild = guild;
        return this;
    }
}
