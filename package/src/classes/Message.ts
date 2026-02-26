import type { APIMessage } from "discord-api-types/v10";
import { Client } from "@/index";

export class Message {
    public client: Client;
    public content?: string;
    public id: string;
    public rawData: APIMessage;

    public constructor(client: Client, data: APIMessage) {
        this.client = client;
        this.content = data.content;
        this.id = data.id;
        this.rawData = data;
    }
}
