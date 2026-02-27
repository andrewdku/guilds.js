import type { ErrorScope } from "@/types";

/** Error class used throughout guilds.js */
export class GuildsError extends Error {
    /** Static name used to distinguish from other errors */
    public static override name: string = "GuildsError";

    /** Scope describing the error */
    public readonly scope?: ErrorScope;

    /** Formatted error name, including scope if exists */
    public override get name(): string {
        return this.scope
            ? `${this.constructor.name} (${this.scope})`
            : this.constructor.name;
    }

    /**
     * Instantiate a new GuildsError
     * @param message Error message
     * @param scope Error scope
     */
    public constructor(message: string, scope?: ErrorScope) {
        super(message);

        if (scope) {
            this.scope = scope;
        }

        Error.captureStackTrace?.(this, this.constructor);
    }
}
