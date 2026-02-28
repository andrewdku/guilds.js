import type { APIUser } from "discord-api-types/v10";
import type { Client } from "@/classes/Client";
import { User } from "@/classes/User";

/** Class representing the user of the client */
export class ClientUser extends User {
    /** The user's about me (client user only) */
    public bio?: string;

    /**
     * Instantiate a new client user
     * @param client Associated client
     * @param data Discord API user data
     * @returns ClientUser object
     */
    public constructor(client: Client, data: APIUser) {
        super(client, data);
        this.bio = (data as any).bio ?? undefined;

        return this;
    }
}
