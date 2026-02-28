import type { Client } from "@/classes/Client";
import type { Message } from "@/classes/Message";
import type {
    ActivityTypes,
    errorScopes,
    GatewayIntents,
    GatewayOpcodes,
} from "@/utils/constants";

export interface AvatarURLProps {
    size: 128 | 256 | 512 | 1024 | 2048 | 4096;
    format?: "webp" | "png" | "jpg" | "gif";
}

export type ClientEvents = {
    debug: [message: string];
    error: [error: any];
    messageCreate: [message: Message];
    ready: [client: Client];
};

export interface ClientPresence {
    activities: UserActivity[];
    platform: "desktop" | "mobile";
    status: UserStatus;
}

export type ClientPresenceProps = Partial<ClientPresence>;

export interface ClientProps {
    token: string;
    intents: IntentsResolvable;
    presence?: Partial<ClientPresence>;
}

export type CreateMessageProps = Partial<{
    content: string;
}>;

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
export type If<
    Condition extends boolean,
    Then,
    Else = never,
> = Condition extends true ? Then : Else;

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
