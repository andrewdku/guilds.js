import type { Client } from "@/classes/Client";
import type { GatewayPayload } from "@/types";
import { Message } from "@/classes/Message";

export function handleGatewayDispatch(
    client: Client,
    payload: GatewayPayload
): void {
    switch (payload.t) {
        case "MESSAGE_CREATE": {
            const message = new Message(client, payload.d);
            client.emit("messageCreate", message);
            break;
        }

        case "READY": {
            client.sessionId = payload.d.session_id;
            client.ready = true;
            client.emit("debug", "Received Dispatch (Ready) event");
            client.emit("ready", client);
            break;
        }
    }
}
