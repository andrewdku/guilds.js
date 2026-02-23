import type { ActivityTypes, GatewayOpcodes } from "@/utils";
import type { Client } from "@/classes";

export interface UserActivity {
    name: string;
    state?: string;
    type: UserActivityType;
    url?: string;
}

export type UserActivityType =
    | keyof typeof ActivityTypes
    | (typeof ActivityTypes)[keyof typeof ActivityTypes];

export type ClientEvents = {
    debug: [message: string];
    error: [error: any];
    ready: [readyClient: Client<true>];
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

export interface GatewayPayload {
    op: (typeof GatewayOpcodes)[keyof typeof GatewayOpcodes];
    d?: any;
    s?: number | null;
    t?: string | null;
}

export type HTTPRequestMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
export type If<Condition extends boolean, Then, Else = never> = Condition extends true
    ? Then
    : Else;

export type IntentsResolvable = number | number[];
export type UserStatus = "online" | "idle" | "dnd" | "offline";
