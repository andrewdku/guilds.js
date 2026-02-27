import type { APIUser } from "discord-api-types/v10";
import type { Client } from "@/classes/Client";
import { User } from "@/classes/User";

export class ClientUser extends User {
    /** The client user's about me */
    public bio?: string;

    public constructor(client: Client, data: APIUser) {
        super(client, data);

        this.bio = (data as any).bio ?? undefined;
    }
}
