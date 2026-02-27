export const ActivityTypes = {
    Competing: 5,
    Custom: 4,
    Listening: 2,
    Playing: 0,
    Streaming: 1,
    Watching: 3,
} as const;

export const baseApiUrl = "https://discord.com/api/v10";

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
