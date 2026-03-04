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

export const ChannelTypes = {
    AnnouncementThread: 10,
    DM: 1,
    GroupDM: 3,
    GuildAnnouncement: 5,
    GuildCategory: 4,
    GuildDirectory: 14,
    GuildForum: 15,
    GuildMedia: 16,
    GuildStageVoice: 13,
    GuildText: 0,
    GuildVoice: 2,
    PrivateThread: 12,
    PublicThread: 11,
} as const;

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

export const GatewayEvents = {
    ApplicationCommandPermissionsUpdate: "APPLICATION_COMMAND_PERMISSIONS_UPDATE",
    AutoModerationActionExecution: "AUTO_MODERATION_ACTION_EXECUTION",
    AutoModerationRuleCreate: "AUTO_MODERATION_RULE_CREATE",
    AutoModerationRuleDelete: "AUTO_MODERATION_RULE_DELETE",
    AutoModerationRuleUpdate: "AUTO_MODERATION_RULE_UPDATE",
    ChannelCreate: "CHANNEL_CREATE",
    ChannelDelete: "CHANNEL_DELETE",
    ChannelPinsUpdate: "CHANNEL_PINS_UPDATE",
    ChannelUpdate: "CHANNEL_UPDATE",
    EntitlementCreate: "ENTITLEMENT_CREATE",
    EntitlementDelete: "ENTITLEMENT_DELETE",
    EntitlementUpdate: "ENTITLEMENT_UPDATE",
    GuildAuditLogEntryCreate: "GUILD_AUDIT_LOG_ENTRY_CREATE",
    GuildBanAdd: "GUILD_BAN_ADD",
    GuildBanRemove: "GUILD_BAN_REMOVE",
    GuildCreate: "GUILD_CREATE",
    GuildDelete: "GUILD_DELETE",
    GuildEmojisUpdate: "GUILD_EMOJIS_UPDATE",
    GuildIntegrationsUpdate: "GUILD_INTEGRATIONS_UPDATE",
    GuildMemberAdd: "GUILD_MEMBER_ADD",
    GuildMemberRemove: "GUILD_MEMBER_REMOVE",
    GuildMembersChunk: "GUILD_MEMBERS_CHUNK",
    GuildMemberUpdate: "GUILD_MEMBER_UPDATE",
    GuildRoleCreate: "GUILD_ROLE_CREATE",
    GuildRoleDelete: "GUILD_ROLE_DELETE",
    GuildRoleUpdate: "GUILD_ROLE_UPDATE",
    GuildScheduledEventCreate: "GUILD_SCHEDULED_EVENT_CREATE",
    GuildScheduledEventDelete: "GUILD_SCHEDULED_EVENT_DELETE",
    GuildScheduledEventUpdate: "GUILD_SCHEDULED_EVENT_UPDATE",
    GuildScheduledEventUserAdd: "GUILD_SCHEDULED_EVENT_USER_ADD",
    GuildScheduledEventUserRemove: "GUILD_SCHEDULED_EVENT_USER_REMOVE",
    GuildSoundboardSoundCreate: "GUILD_SOUNDBOARD_SOUND_CREATE",
    GuildSoundboardSoundDelete: "GUILD_SOUNDBOARD_SOUND_DELETE",
    GuildSoundboardSoundsUpdate: "GUILD_SOUNDBOARD_SOUNDS_UPDATE",
    GuildSoundboardSoundUpdate: "GUILD_SOUNDBOARD_SOUND_UPDATE",
    SoundboardSounds: "SOUNDBOARD_SOUNDS",
    GuildStickersUpdate: "GUILD_STICKERS_UPDATE",
    GuildUpdate: "GUILD_UPDATE",
    IntegrationCreate: "INTEGRATION_CREATE",
    IntegrationDelete: "INTEGRATION_DELETE",
    IntegrationUpdate: "INTEGRATION_UPDATE",
    InteractionCreate: "INTERACTION_CREATE",
    InviteCreate: "INVITE_CREATE",
    InviteDelete: "INVITE_DELETE",
    MessageCreate: "MESSAGE_CREATE",
    MessageDelete: "MESSAGE_DELETE",
    MessageDeleteBulk: "MESSAGE_DELETE_BULK",
    MessagePollVoteAdd: "MESSAGE_POLL_VOTE_ADD",
    MessagePollVoteRemove: "MESSAGE_POLL_VOTE_REMOVE",
    MessageReactionAdd: "MESSAGE_REACTION_ADD",
    MessageReactionRemove: "MESSAGE_REACTION_REMOVE",
    MessageReactionRemoveAll: "MESSAGE_REACTION_REMOVE_ALL",
    MessageReactionRemoveEmoji: "MESSAGE_REACTION_REMOVE_EMOJI",
    MessageUpdate: "MESSAGE_UPDATE",
    PresenceUpdate: "PRESENCE_UPDATE",
    RateLimited: "RATE_LIMITED",
    Ready: "READY",
    Resumed: "RESUMED",
    StageInstanceCreate: "STAGE_INSTANCE_CREATE",
    StageInstanceDelete: "STAGE_INSTANCE_DELETE",
    StageInstanceUpdate: "STAGE_INSTANCE_UPDATE",
    SubscriptionCreate: "SUBSCRIPTION_CREATE",
    SubscriptionDelete: "SUBSCRIPTION_DELETE",
    SubscriptionUpdate: "SUBSCRIPTION_UPDATE",
    ThreadCreate: "THREAD_CREATE",
    ThreadDelete: "THREAD_DELETE",
    ThreadListSync: "THREAD_LIST_SYNC",
    ThreadMembersUpdate: "THREAD_MEMBERS_UPDATE",
    ThreadMemberUpdate: "THREAD_MEMBER_UPDATE",
    ThreadUpdate: "THREAD_UPDATE",
    TypingStart: "TYPING_START",
    UserUpdate: "USER_UPDATE",
    VoiceChannelEffectSend: "VOICE_CHANNEL_EFFECT_SEND",
    VoiceServerUpdate: "VOICE_SERVER_UPDATE",
    VoiceStateUpdate: "VOICE_STATE_UPDATE",
    WebhooksUpdate: "WEBHOOKS_UPDATE",
} as const;

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
