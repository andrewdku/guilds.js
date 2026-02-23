/**
 * Activity types
 */
export const activityTypes = {
    Competing: 5,
    Custom: 4,
    Listening: 2,
    Playing: 0,
    Streaming: 1,
    Watching: 3,
} as const;

export const baseApiUrl = "https://discord.com/api/v10";

export const errorScopes = [
    "ClientIntentsError",
    "ClientPropsError",
    "ClientTokenError",
    "DiscordAPIError",
    "GatewayError",
    "WebSocketError",
] as const;

export const opCodes = {
    Dispatch: 0, // Receive
    Heartbeat: 1, // Send or Receive
    HeartbeatACK: 11, // Receive
    Hello: 10, // Receive
    Identify: 2, // Send
    InvalidSession: 9, // Receive
    PresenceUpdate: 3, // Send
    Reconnect: 7, // Receive
    RequestGuildMembers: 8, // Send
    RequestSoundboardSounds: 12, // Send
    Resume: 6, // Send
    VoiceStateUpdate: 3, // Send
} as const;
