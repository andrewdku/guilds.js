import type { errorCodes } from "@/utils";

export interface ClientProps {
    token: string;
    intents: number;
}

export type ErrorCode = (typeof errorCodes)[keyof typeof errorCodes];

export interface GatewayPayload {
    op: number;
    d?: any;
    s?: number | null;
    t?: string | null;
}
