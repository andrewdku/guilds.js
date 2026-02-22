import type { errorCodes, opCodes } from "@/utils";
import type { Client } from "@/classes";

export type ClientEvents = {
    debug: [message: string];
    error: [error: any];
    ready: [readyClient: Client<true>];
};

export interface ClientProps {
    token: string;
    intents: number;
}

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];

export interface GatewayPayload {
    op: (typeof opCodes)[keyof typeof opCodes];
    d?: any;
    s?: number | null;
    t?: string | null;
}
