import type { ErrorCode } from "@/types";

export class GuildsError extends Error {
    public static override name: string = "GuildsError";
    public readonly scope?: ErrorCode;

    public override get name(): string {
        return this.scope
            ? `${this.constructor.name} (${this.scope})`
            : this.constructor.name;
    }

    public constructor(message: string, scope?: ErrorCode) {
        super(message);

        if (scope) {
            this.scope = scope;
        }

        Error.captureStackTrace?.(this, this.constructor);
    }
}
