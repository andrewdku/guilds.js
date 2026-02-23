import type { activityTypes, errorScopes, opCodes } from "@/utils";
import type { Client } from "@/classes";

export interface Activity {
    name: string;
    state?: string;
    type: ActivityType;
    url?: string;
}

export type ActivityType =
    | keyof typeof activityTypes
    | (typeof activityTypes)[keyof typeof activityTypes];

export type ClientEvents = {
    debug: [message: string];
    error: [error: any];
    ready: [readyClient: Client<true>];
};

export interface ClientPresenceProps {
    activities: Activity[];
    platform: "desktop" | "mobile";
    status: UserStatus;
}

export interface ClientProps {
    token: string;
    intents: IntentsResolvable;
    presence?: Partial<ClientPresenceProps>;
}

export type ErrorScope = (typeof errorScopes)[keyof typeof errorScopes];

/**
 * Discord gateway payload object
 */
export interface GatewayPayload {
    op: (typeof opCodes)[keyof typeof opCodes];
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
