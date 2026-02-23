import type { activityTypes, errorCodes, opCodes } from "@/utils";
import type { Client } from "@/classes";

export type ActivityType =
    | keyof typeof activityTypes
    | (typeof activityTypes)[keyof typeof activityTypes];

export type ClientEvents = {
    debug: [message: string];
    error: [error: any];
    ready: [readyClient: Client<true>];
};

export interface ClientPresence {
    activities: ClientActivity[];
    platform: "desktop" | "mobile";
    status: UserStatus;
}

export interface ClientActivity {
    name: string;
    state?: string;
    type: ActivityType;
    url?: string;
}
export interface ClientPresence {}

export interface ClientProps {
    token: string;
    intents: number;
    presence?: Partial<ClientPresence>;
}

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];

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

export type UserStatus = "online" | "idle" | "dnd" | "offline";
