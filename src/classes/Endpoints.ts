import { baseApiUrl } from "@/utils";

/** Class representing Discord's API v10 endpoints */
export class Endpoints {
    /**
     * - GET `/gateway`
     */
    public static gateway() {
        return `${baseApiUrl}/gateway` as const;
    }

    /**
     * - GET `/gateway/bot`
     * - POST `/gateway/bot`
     */
    public static gatewayBot() {
        return `${Endpoints.gateway()}/bot` as const;
    }

    /**
     * - GET `/users/{userId}`
     * @param userId User ID (default: "@me")
     */
    public static user(userId: string = "@me") {
        return `${baseApiUrl}/users/${userId}` as const;
    }
}
