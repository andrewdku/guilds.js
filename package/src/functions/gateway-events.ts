import type { GatewayPayload } from "@/types";
import { Client } from "@/classes/Client";
import { GatewayEvents } from "@/utils/constants";
import { Message } from "@/classes/Message";

/**
 * Handles incoming gateway payloads and events
 * @param client Associated client
 * @param payload Gateway payload data
 */
export function handleGatewayEvents(client: Client, payload: GatewayPayload): void {
    if (!client || !(client instanceof Client)) {
        throw new TypeError("Invalid client provided");
    }

    switch (payload.t) {
        case GatewayEvents.MessageCreate: {
            const message = new Message(client, payload.d);
            client.emit("messageCreate", message);
            client.cache.messages.set(message.id, message);
            break;
        }

        case GatewayEvents.Ready: {
            client.sessionId = payload.d.session_id;
            client.ready = true;
            client.emit("debug", "Received Dispatch (Ready) event");
            client.emit("ready", client);
            break;
        }
    }
}
