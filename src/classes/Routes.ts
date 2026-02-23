import { baseApiUrl } from "@/utils";

export class Routes {
    public static gateway(bot: boolean = false) {
        return `${baseApiUrl}/gateway${bot ? "/bot" : ""}` as const;
    }

    public static user(userId: string = "@me") {
        return `${baseApiUrl}/users/${userId}` as const;
    }
}
