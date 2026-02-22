import type { errorCodes, opCodes } from "@/utils";

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
