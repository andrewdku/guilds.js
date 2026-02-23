export interface AvatarDecorationData {
    asset: string;
    sku_id: string;
}

export interface Collectible {
    nameplate?: Nameplate;
}

export interface Nameplate {
    sku_id: string;
    asset: string;
    label: string;
    palette: string;
}

export interface PrimaryGuild {
    badge?: string;
    identity_enabled?: boolean;
    identity_guild_id?: string;
    tag?: string;
}

export interface User {
    accent_color?: number;
    avatar?: string;
    avatar_decoration_data?: AvatarDecorationData;
    banner?: string;
    bot?: boolean;
    collectibles?: Collectible;
    discriminator: string;
    email?: string;
    flags?: number;
    global_name: string;
    id: string;
    locale?: string;
    mfa_enabled?: boolean;
    premium_type?: number;
    primary_guild?: PrimaryGuild;
    public_flags?: number;
    system?: boolean;
    username: string;
    verified?: boolean;
}
