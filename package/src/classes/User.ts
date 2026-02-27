import type { APIUser } from "discord-api-types/v10";
import type { AvatarURLProps } from "@/types";
import { Client } from "@/classes/Client";
import { colorIntToHex } from "@/utils/color-convert";
import { GuildsError } from "@/classes/GuildsError";

/**
 * Class representing a Discord user
 * @see https://docs.discord.com/developers/resources/user#user-object
 */
export class User {
    /** User banner color as an integer color, if set */
    public accentColor?: number;

    /** Accent color as a hex color string, or null */
    public accentColorHex: string | null;

    /** Whether this user is a Discord bot */
    public bot: boolean = false;

    /** The client associated with this user */
    public client: Client;

    /** Legacy discriminator, defaults to "0" if no discriminator */
    public discriminator: string = "0";

    /** User's display name, if set */
    public displayName?: string;

    /** Unique user ID snowflake */
    public id: string;

    /**  Raw API user data as-is */
    public rawData: APIUser;

    /** Whether this user is an official Discord system account */
    public system: boolean = false;

    /** The user's username (without discriminator) */
    public username: string;

    /**
     * Instantiate a new user
     * @param client Associated client
     * @param data Discord API user data
     * @returns User object
     */
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

    /**
     * Returns the CDN URL for the user's avatar, or null if not set
     * @param props Options such as size and format
     * @returns CDN URL or null
     */
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

    /**
     * User's username with discriminator (if has one, e.g. example#1234)
     * or just the username if there's no discriminator (e.g. example)
     */
    public get tag(): string {
        return this.discriminator == "0"
            ? this.username
            : `${this.username}#${this.discriminator}`;
    }

    /** @returns Mention string for the user, e.g. <@123456789> */
    public toString(): string {
        return `<@${this.id}>`;
    }
}
