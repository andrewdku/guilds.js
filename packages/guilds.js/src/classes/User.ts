import type { AvatarURLProps, DiscordAPI } from "@/typings";
import { Client, GuildsError } from "@/classes";
import { colorIntToHex } from "@/utils";

/**
 * Class representing a Discord user
 * @see https://docs.discord.com/developers/resources/user
 */
export class User {
    /** The user's banner color as a color integer */
    public accentColor?: number;

    /** The user's banner color as a hex color*/
    public accentColorHex: string | null;

    /** The user's about me (client only) */
    public bio: string | null;

    /** Whether the user is an application (bot) */
    public bot: boolean = false;

    /** The client associated with this user */
    public client: Client;

    /** The user's discriminator, or "0" if they have none */
    public discriminator: string = "0";

    /** The user's display name or bot's application name */
    public displayName?: string;

    /** The user's email (user clients only) */
    public email?: string;

    /** The user's ID snowflake */
    public id: string;

    /** Whether the user has two factor authentication enabled (user clients only) */
    public mfaEnabled?: boolean;

    /** The data from Discord's API provided as-is */
    public rawData: DiscordAPI.User;

    /** Whether the user is a Discord system account */
    public system: boolean = false;

    /** The user's username (not to be confused with display name or tag) */
    public username: string;

    /** Whether the user's email is verified (user clients only) */
    public verified?: boolean;

    public constructor(client: Client, data: DiscordAPI.User) {
        if (!client || !(client instanceof Client)) {
            throw new GuildsError("Invalid client provided", "DiscordAPIError");
        }

        this.accentColor = data.accent_color;
        this.accentColorHex = colorIntToHex(data.accent_color || null) || null;
        this.bio = (data as any).bio ?? null;
        this.bot = data.bot || false;
        this.client = client;
        this.discriminator = data.discriminator || "0";
        this.email = data.email;
        this.displayName = data.global_name;
        this.id = data.id;
        this.mfaEnabled = data.mfa_enabled;
        this.rawData = data;
        this.system = data.system || false;
        this.username = data.username;
        this.verified = data.verified;

        return this;
    }

    /** Get the user's avatar as an image URL */
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

    /** `username#0000` or just `username` (if no discriminator) */
    public get tag(): string {
        return this.discriminator == "0"
            ? this.username
            : `${this.username}#${this.discriminator}`;
    }

    /** User mention as a string, e.g. <@123456789> */
    public toString(): string {
        return `<@${this.id}>`;
    }
}
