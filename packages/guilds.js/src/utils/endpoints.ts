import { baseApiUrl } from "@/utils";

/** Discord's API v10 endpoints */
export const Endpoints = {
    /**
     * @GET `/gateway`
     */
    gateway() {
        return `${baseApiUrl}/gateway` as const;
    },

    /**
     * @GET `/gateway/bot`
     * @POST `/gateway/bot`
     */
    gatewayBot() {
        return `${Endpoints.gateway()}/bot` as const;
    },

    /**
     * @GET `/guilds/{guildId}`
     * @PATCH `/guilds/{guildId}`
     * @param guildId Guild ID
     */
    guild(guildId: string) {
        return `${baseApiUrl}/guilds/${guildId}` as const;
    },

    /**
     * @GET `/guilds/{guildId}`
     */
    guildPReview(guildId: string) {
        return `${baseApiUrl}/guilds/${guildId}/preview` as const;
    },

    /**
     * @GET `/users/{userId}`
     * @param userId User ID (default: "@me")
     */
    user(userId: string = "@me") {
        return `${baseApiUrl}/users/${userId}` as const;
    },
};
