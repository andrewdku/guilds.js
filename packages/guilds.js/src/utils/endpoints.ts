import { baseApiUrl } from "@/utils";

/** Discord's API v10 endpoints */
export const Endpoints = {
    /**
     * - GET `/gateway`
     */
    gateway() {
        return `${baseApiUrl}/gateway` as const;
    },

    /**
     * - GET `/gateway/bot`
     * - POST `/gateway/bot`
     */
    gatewayBot() {
        return `${Endpoints.gateway()}/bot` as const;
    },

    /**
     * - GET `/users/{userId}`
     * @param userId User ID (default: "@me")
     */
    user(userId: string = "@me") {
        return `${baseApiUrl}/users/${userId}` as const;
    },
};
