import { baseApiUrl } from "@/utils/constants";

export const Endpoints = {
    channel(channelId: string) {
        // GET
        return `${baseApiUrl}/channels/${channelId}` as const;
    },

    channelMessages(channelId: string) {
        return `${baseApiUrl}/channels/${channelId}/messages` as const; // GET, POST
    },

    gateway() {
        return `${baseApiUrl}/gateway` as const; // GET
    },

    gatewayBot() {
        return `${Endpoints.gateway()}/bot` as const; // GET, POST
    },

    guild(guildId: string) {
        return `${baseApiUrl}/guilds/${guildId}` as const; // GET, PATCH
    },

    guildPreview(guildId: string) {
        return `${baseApiUrl}/guilds/${guildId}/preview` as const; // GET
    },

    user(userId: string = "@me") {
        return `${baseApiUrl}/users/${userId}` as const; // GET
    },
};
