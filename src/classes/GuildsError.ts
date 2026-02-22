import type { ErrorCode } from "@/types";

export class GuildsError extends Error {
    public static override name: string = "GuildsError";
    public readonly code: ErrorCode;

    public override get name(): string {
        return `${this.constructor.name} (${this.code})`;
    }

    public constructor(code: ErrorCode, ...args: unknown[]) {
        super(args.join(" "));
        this.code = code;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
