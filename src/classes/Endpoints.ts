import { baseApiUrl } from "@/utils";

export class Endpoints {
    public static gateway() {
        return `${baseApiUrl}/gateway` as const;
    }

    public static gatewayBot() {
        return `${Endpoints.gateway()}/bot` as const;
    }

    public static user(userId: string = "@me") {
        return `${baseApiUrl}/users/${userId}` as const;
    }
}
