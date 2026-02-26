import { type IntentsResolvable, GatewayIntents, GuildsError } from "@/index";

/**
 * Parse intents into bitfield
 * @param intents Intents resolvable
 * @returns Parsed intents as a bitfield
 */
export function parseIntents(intents: IntentsResolvable): number {
    if (typeof intents === "number") {
        return intents;
    } else if (typeof intents === "string") {
        const value = GatewayIntents[intents as keyof typeof GatewayIntents];

        if (typeof value !== "number") {
            throw new GuildsError("Invalid intents provided", "ClientIntentsError");
        }

        return value;
    } else if (Array.isArray(intents)) {
        let bitfield: number = 0;

        for (const intent of intents) {
            if (typeof intent === "number") {
                bitfield |= intent;
                continue;
            }

            if (typeof intent === "string") {
                const value = GatewayIntents[intent as keyof typeof GatewayIntents];

                if (typeof value !== "number") {
                    throw new GuildsError(
                        "Invalid intents provided",
                        "ClientIntentsError"
                    );
                }

                bitfield |= value;
                continue;
            }

            throw new GuildsError("Invalid intents provided", "ClientIntentsError");
        }

        return bitfield;
    } else {
        throw new GuildsError("Invalid intents provided", "ClientIntentsError");
    }
}
