import type { APIChannel, APIGuildVoiceChannel } from "discord-api-types/v10";
import type { ChannelType } from "@/types";
import { Channel } from "@/classes/Channel";
import { ChannelTypes } from "@/utils/constants";
import { Client } from "@/classes/Client";
import { Guild } from "@/classes/Guild";

/** Class representing a voice channel in a guild */
export class VoiceChannel extends Channel {
    public type: ChannelType = ChannelTypes.GuildVoice;
    public guild: Guild | null;

    /**
     * Instantiate a new voice channel
     * @param client Associated client
     * @param guild Associated guild
     * @param data Discord API channel data
     * @returns VoiceChannel object
     */
    public constructor(client: Client, guild: Guild, data: APIGuildVoiceChannel) {
        super(client, data as APIChannel);

        if (!guild || !(guild instanceof Guild)) {
            throw new TypeError("Invalid guild provided");
        }

        this.guild = guild;
        return this;
    }
}
