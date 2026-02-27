import type { APIUser } from "discord-api-types/v10";
import type { AvatarURLProps } from "@/types";
import { Client } from "@/classes/Client";
import { colorIntToHex } from "@/utils/color-convert";
import { GuildsError } from "@/classes/GuildsError";

export class User {
    public accentColor?: number;
    public accentColorHex: string | null;
    public bot: boolean = false;
    public client: Client;
    public discriminator: string = "0";
    public displayName?: string;
    public id: string;
    public rawData: APIUser;
    public system: boolean = false;
    public username: string;

    public constructor(client: Client, data: APIUser) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("Invalid client provided", "DiscordAPIError");
        }

        this.accentColor = data.accent_color ?? undefined;
        this.accentColorHex = colorIntToHex(data.accent_color || null) || null;
        this.bot = data.bot || false;
        this.client = client;
        this.discriminator = data.discriminator || "0";
        this.displayName = data.global_name ?? undefined;
        this.id = data.id;
        this.rawData = data;
        this.system = data.system || false;
        this.username = data.username;

        return this;
    }

    public avatarURL(props: AvatarURLProps): string | null {
        if (!props || !props.size || (props.format && typeof props.format !== "string")) {
            throw new GuildsError(
                "Invalid user avatar URL props provided",
                "DiscordAPIError"
            );
        }

        const avatarHash = this.rawData.avatar;

        if (!avatarHash) {
            return null;
        }

        return `https://cdn.discordapp.com/avatars/${this.id}/${avatarHash}.${props.format || (avatarHash.startsWith("a_") ? "gif" : "png")}?size=${props.size}`;
    }

    public get tag(): string {
        return this.discriminator == "0"
            ? this.username
            : `${this.username}#${this.discriminator}`;
    }

    public toString(): string {
        return `<@${this.id}>`;
    }
}
