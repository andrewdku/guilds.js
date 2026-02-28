import type { ClientPresence } from "@/types";

export const ActivityTypes = {
    Competing: 5,
    Custom: 4,
    Listening: 2,
    Playing: 0,
    Streaming: 1,
    Watching: 3,
} as const;

/** The base API url for contacting Discord's v10 API */
export const baseApiUrl = "https://discord.com/api/v10";

export const defaultClientPresence: ClientPresence = {
    platform: "desktop",
    status: "online",
    activities: [],
};

export const errorScopes = [
    "ClientIntentsError",
    "ClientPropsError",
    "ClientTokenError",
    "CreateMessageError",
    "DiscordAPIError",
    "GatewayError",
    "WebSocketError",
] as const;

export const GatewayIntents = {
    AutoModerationConfiguration: 1 << 20,
    AutoModerationExecution: 1 << 21,
    DirectMessagePolls: 1 << 25,
    DirectMessageReactions: 1 << 13,
    DirectMessages: 1 << 12,
    DirectMessageTyping: 1 << 14,
    GuildExpressions: 1 << 3,
    GuildIntegrations: 1 << 4,
    GuildInvites: 1 << 6,
    GuildMembers: 1 << 1,
    GuildMessagePolls: 1 << 24,
    GuildMessageReactions: 1 << 10,
    GuildMessages: 1 << 9,
    GuildMessageTyping: 1 << 11,
    GuildModeration: 1 << 2,
    GuildPresences: 1 << 8,
    Guilds: 1 << 0,
    GuildScheduledEvents: 1 << 16,
    GuildVoiceStates: 1 << 7,
    GuildWebhooks: 1 << 5,
    MessageContent: 1 << 15,
} as const;

export const GatewayOpcodes = {
    /** Receive */
    Dispatch: 0,

    /** Send or Receive */
    Heartbeat: 1,

    /** Receive */
    HeartbeatACK: 11,

    /** Receive */
    Hello: 10,

    /** Send */
    Identify: 2,

    /** Receive */
    InvalidSession: 9,

    /** Send */
    PresenceUpdate: 3,

    /** Receive */
    Reconnect: 7,

    /** Send */
    RequestGuildMembers: 8,

    /** Send */
    RequestSoundboardSounds: 12,

    /** Send */
    Resume: 6,

    /** Send */
    VoiceStateUpdate: 3,
} as const;
