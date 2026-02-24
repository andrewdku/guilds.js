import type * as DiscordAPI from "./api-types";
import type { ActivityTypes, GatewayIntents, GatewayOpcodes } from "@/utils";
import type { Client } from "@/classes";

export interface AvatarURLProps {
    size: 128 | 256 | 512 | 1024 | 2048 | 4096;
    format?: "webp" | "png" | "jpg" | "gif";
}

export type ClientEvents = {
    debug: [message: string];
    error: [error: any];
    ready: [client: Client];
};

export interface ClientPresenceProps {
    activities: UserActivity[];
    platform: "desktop" | "mobile";
    status: UserStatus;
}

export interface ClientProps {
    token: string;
    intents: IntentsResolvable;
    presence?: Partial<ClientPresenceProps>;
}

const errorScopes = [
    "ClientIntentsError",
    "ClientPropsError",
    "ClientTokenError",
    "DiscordAPIError",
    "GatewayError",
    "WebSocketError",
] as const;

export type ErrorScope = (typeof errorScopes)[keyof typeof errorScopes];
export type GatewayIntent =
    | keyof typeof GatewayIntents
    | (typeof GatewayIntents)[keyof typeof GatewayIntents];

export type GatewayOpcode = (typeof GatewayOpcodes)[keyof typeof GatewayOpcodes];

export interface GatewayPayload {
    op: GatewayOpcode;
    d?: any;
    s?: number | null;
    t?: string | null;
}

export type HTTPRequestMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
export type If<Condition extends boolean, Then, Else = never> = Condition extends true
    ? Then
    : Else;

export type IntentsResolvable = number | number[] | GatewayIntent[];

export interface UserActivity {
    name: string;
    state?: string;
    type: UserActivityType;
    url?: string;
}

export type UserActivityType =
    | keyof typeof ActivityTypes
    | (typeof ActivityTypes)[keyof typeof ActivityTypes];

export type UserStatus = "online" | "idle" | "dnd" | "offline";

export type { DiscordAPI };
