import type { Snowflake } from "@/api"

export const Endpoints = {
    /**
     * - GET
     * - PUT
     */
    applicationCommand: (applicationId: Snowflake, commandId: Snowflake) =>
        `/applications/${applicationId}/commands/${commandId}` as const,

    /**
     * - GET
     * - PUT
     */
    applicationCommandPermissions: (
        applicationId: Snowflake,
        guildId: Snowflake,
        commandId: Snowflake
    ) =>
        `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}/permissions` as const,

    /**
     * - GET
     * - PUT
     * - POST
     */
    applicationCommands: (applicationId: Snowflake) =>
        `/applications/${applicationId}/commands` as const,

    /**
     * - GET
     * - PUT
     */
    applicationEmoji: (applicationId: Snowflake, emojiId: Snowflake) =>
        `/applications/${applicationId}/emojis/${emojiId}` as const,

    /**
     * - GET
     * - POST
     */
    applicationEmojis: (applicationId: Snowflake) =>
        `/applications/${applicationId}/emojis` as const,

    /**
     * - GET
     * - PUT
     * - POST
     */
    applicationGuildCommand: (
        applicationId: Snowflake,
        guildId: Snowflake,
        commandId: Snowflake
    ) =>
        `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}` as const,

    /**
     * - GET
     * - PUT
     * - POST
     */
    applicationGuildCommands: (applicationId: Snowflake, guildId: Snowflake) =>
        `/applications/${applicationId}/guilds/${guildId}/commands` as const,

    /**
     * - GET
     * - PUT
     */
    applicationRoleConnectionMetadata: (applicationId: Snowflake) =>
        `/applications/${applicationId}/role-connections/metadata` as const,

    /**
     * - GET
     * - POST
     */
    channel: (channelId: Snowflake) => `/channels/${channelId}` as const,

    /**
     * - POST
     */
    channelBulkDelete: (channelId: Snowflake) =>
        `/channels/${channelId}/messages/bulk-delete` as const,

    /**
     * - POST
     */
    channelFollowers: (channelId: Snowflake) =>
        `/channels/${channelId}/followers` as const,

    /**
     * - GET
     * - POST
     */
    channelInvites: (channelId: Snowflake) => `/channels/${channelId}/invites` as const,

    /**
     * - GET
     */
    channelJoinedArchivedThreads: (channelId: Snowflake) =>
        `/channels/${channelId}/users/@me/threads/archived/private` as const,

    /**
     * - GET
     * - PATCH
     * - DELETE
     */
    channelMessage: (channelId: Snowflake, messageId: Snowflake) =>
        `/channels/${channelId}/messages/${messageId}` as const,

    /**
     * - DELETE
     */
    channelMessageAllReactions: (channelId: Snowflake, messageId: Snowflake) =>
        `/channels/${channelId}/messages/${messageId}/reactions` as const,

    /**
     * - POST
     */
    channelMessageCrosspost: (channelId: Snowflake, messageId: Snowflake) =>
        `/channels/${channelId}/messages/${messageId}/crosspost` as const,

    /**
     * - PUT
     * - DELETE
     */
    channelMessageOwnReaction: (
        channelId: Snowflake,
        messageId: Snowflake,
        emoji: string
    ) => `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me` as const,

    /**
     * - GET
     * - DELETE
     */
    channelMessageReaction: (channelId: Snowflake, messageId: Snowflake, emoji: string) =>
        `/channels/${channelId}/messages/${messageId}/reactions/${emoji}` as const,

    /**
     * - GET
     * - POST
     */
    channelMessages: (channelId: Snowflake) => `/channels/${channelId}/messages` as const,

    /**
     * - PUT
     * - DELETE
     */
    channelMessagesPin: (channelId: Snowflake, messageId: Snowflake) =>
        `/channels/${channelId}/messages/pins/${messageId}` as const,

    /**
     * - GET
     */
    channelMessagesPins: (channelId: Snowflake) =>
        `/channels/${channelId}/messages/pins` as const,

    /**
     * - DELETE
     */
    channelMessageUserReaction: (
        channelId: Snowflake,
        messageId: Snowflake,
        emoji: string,
        userId: Snowflake
    ) =>
        `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/${userId}` as const,

    /**
     * - PUT
     * - DELETE
     */
    channelPermission: (channelId: Snowflake, overwriteId: Snowflake) =>
        `/channels/${channelId}/permissions/${overwriteId}` as const,

    /**
     * - PUT
     * - DELETE
     */
    channelPin: (channelId: Snowflake, messageId: Snowflake) =>
        `/channels/${channelId}/pins/${messageId}` as const,

    /**
     * - GET
     */
    channelPins: (channelId: Snowflake) => `/channels/${channelId}/pins` as const,

    /**
     * - PUT
     * - DELETE
     */
    channelRecipient: (channelId: Snowflake, userId: Snowflake) =>
        `/channels/${channelId}/recipients/${userId}` as const,

    /**
     * - GET
     * - POST
     */
    channelThreads: (channelId: Snowflake, archivedStatus: "private" | "public") =>
        `/channels/${channelId}/threads/archived/${archivedStatus}` as const,

    /**
     * - POST
     */
    channelTyping: (channelId: Snowflake) => `/channels/${channelId}/typing` as const,

    /**
     * - GET
     * - POST
     */
    channelWebhooks: (channelId: Snowflake) => `/channels/${channelId}/webhooks` as const,

    /**
     * - POST
     */
    consumeEntitlement: (applicationId: Snowflake, entitlementId: Snowflake) =>
        `/applications/${applicationId}/entitlements/${entitlementId}/consume` as const,

    /**
     * - GET
     */
    currentApplication: () => "/applications/@me" as const,

    /**
     * - GET
     * - DELETE
     */
    entitlement: (applicationId: Snowflake, entitlementId: Snowflake) =>
        `/applications/${applicationId}/entitlements/${entitlementId}` as const,

    /**
     * - GET
     * - POST
     */
    entitlements: (applicationId: Snowflake) =>
        `/applications/${applicationId}/entitlements` as const,

    /**
     * - POST
     */
    expirePoll: (channelId: Snowflake, messageId: Snowflake) =>
        `/channels/${channelId}/polls/${messageId}/expire` as const,

    /**
     * - GET
     */
    gateway: () => "/gateway" as const,

    /**
     * - GET
     */
    gatewayBot: () => "/gateway/bot" as const,

    /**
     * - POST
     */
    guild: (guildId: Snowflake) => `/guilds/${guildId}` as const,

    /**
     * - GET
     */
    guildActiveThreads: (guildId: Snowflake) =>
        `/guilds/${guildId}/threads/active` as const,

    /**
     * - GET
     * - PATCH
     * - DELETE
     */
    guildApplicationCommandsPermissions: (applicationId: Snowflake, guildId: Snowflake) =>
        `/applications/${applicationId}/guilds/${guildId}/commands/permissions` as const,

    /**
     * - GET
     * - PUT
     * - POST
     */
    guildAuditLog: (guildId: Snowflake) => `/guilds/${guildId}/audit-logs` as const,

    /**
     * - GET
     * - PUT
     * - POST
     */
    guildAutoModerationRule: (guildId: Snowflake, ruleId: Snowflake) =>
        `/guilds/${guildId}/auto-moderation/rules/${ruleId}` as const,

    /**
     * - GET
     * - POST
     */
    guildAutoModerationRules: (guildId: Snowflake) =>
        `/guilds/${guildId}/auto-moderation/rules` as const,

    /**
     * - GET
     * - PUT
     * - DELETE
     */
    guildBan: (guildId: Snowflake, userId: Snowflake) =>
        `/guilds/${guildId}/bans/${userId}` as const,

    /**
     * - GET
     */
    guildBans: (guildId: Snowflake) => `/guilds/${guildId}/bans` as const,

    /**
     * - POST
     */
    guildBulkBan: (guildId: Snowflake) => `/guilds/${guildId}/bulk-ban` as const,

    /**
     * - GET
     * - POST
     */
    guildChannels: (guildId: Snowflake) => `/guilds/${guildId}/channels` as const,

    /**
     * - PATCH
     */
    guildCurrentMemberNickname: (guildId: Snowflake) =>
        `/guilds/${guildId}/members/@me/nick` as const,

    /**
     * - GET
     * - PATCH
     */
    guildEmoji: (guildId: Snowflake, emojiId: Snowflake) =>
        `/guilds/${guildId}/emojis/${emojiId}` as const,

    /**
     * - GET
     * - POST
     */
    guildEmojis: (guildId: Snowflake) => `/guilds/${guildId}/emojis` as const,

    /**
     * - DELETE
     */
    guildIncidentActions: (guildId: Snowflake) =>
        `/guilds/${guildId}/incident-actions` as const,

    /**
     * - DELETE
     */
    guildIntegration: (guildId: Snowflake, integrationId: Snowflake) =>
        `/guilds/${guildId}/integrations/${integrationId}` as const,

    /**
     * - GET
     */
    guildIntegrations: (guildId: Snowflake) => `/guilds/${guildId}/integrations` as const,

    /**
     * - GET
     */
    guildInvites: (guildId: Snowflake) => `/guilds/${guildId}/invites` as const,

    /**
     * - GET
     * - PUT
     */
    guildMember: (guildId: Snowflake, userId: Snowflake = "@me") =>
        `/guilds/${guildId}/members/${userId}` as const,

    /**
     * - PUT
     * - DELETE
     */
    guildMemberRole: (guildId: Snowflake, memberId: Snowflake, roleId: Snowflake) =>
        `/guilds/${guildId}/members/${memberId}/roles/${roleId}` as const,

    /**
     * - GET
     */
    guildMembers: (guildId: Snowflake) => `/guilds/${guildId}/members` as const,

    /**
     * - GET
     */
    guildMembersSearch: (guildId: Snowflake) =>
        `/guilds/${guildId}/members/search` as const,

    /**
     * - GET
     * - PATCH
     */
    guildMemberVerification: (guildId: Snowflake) =>
        `/guilds/${guildId}/member-verification` as const,

    /**
     * - POST
     */
    guildMFA: (guildId: Snowflake) => `/guilds/${guildId}/mfa` as const,

    /**
     * - GET
     * - PUT
     */
    guildOnboarding: (guildId: Snowflake) => `/guilds/${guildId}/onboarding` as const,

    /**
     * - GET
     */
    guildPreview: (guildId: Snowflake) => `/guilds/${guildId}/preview` as const,

    /**
     * - GET
     * - POST
     */
    guildPrune: (guildId: Snowflake) => `/guilds/${guildId}/prune` as const,

    /**
     * - GET
     * - PATCH
     * - DELETE
     */
    guildRole: (guildId: Snowflake, roleId: Snowflake) =>
        `/guilds/${guildId}/roles/${roleId}` as const,

    /**
     * - GET
     */
    guildRoleMemberCounts: (guildId: Snowflake) =>
        `/guilds/${guildId}/roles/member-counts` as const,

    /**
     * - GET
     * - POST
     * - PATCH
     */
    guildRoles: (guildId: Snowflake) => `/guilds/${guildId}/roles` as const,

    /**
     * - GET
     * - POST
     */
    guilds: () => "/guilds" as const,

    /**
     * - GET
     * - PATCH
     * - DELETE
     */
    guildScheduledEvent: (guildId: Snowflake, guildScheduledEventId: Snowflake) =>
        `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}` as const,

    /**
     * - GET
     * - POST
     */
    guildScheduledEvents: (guildId: Snowflake) =>
        `/guilds/${guildId}/scheduled-events` as const,

    /**
     * - GET
     */
    guildScheduledEventUsers: (guildId: Snowflake, guildScheduledEventId: Snowflake) =>
        `/guilds/${guildId}/scheduled-events/${guildScheduledEventId}/users` as const,

    /**
     * - GET
     * - PATCH
     * - DELETE
     */
    guildSoundboardSound: (guildId: Snowflake, soundId: Snowflake) =>
        `/guilds/${guildId}/soundboard-sounds/${soundId}` as const,

    /**
     * - GET
     * - POST
     */
    guildSoundboardSounds: (guildId: Snowflake) =>
        `/guilds/${guildId}/soundboard-sounds` as const,

    /**
     * - GET
     * - PATCH
     * - DELETE
     */
    guildSticker: (guildId: Snowflake, stickerId: Snowflake) =>
        `/guilds/${guildId}/stickers/${stickerId}` as const,

    /**
     * - GET
     * - POST
     */
    guildStickers: (guildId: Snowflake) => `/guilds/${guildId}/stickers` as const,

    /**
     * - PUT
     * - PATCH
     * - DELETE
     */
    guildTemplate: (guildId: Snowflake, code: string) =>
        `/guilds/${guildId}/templates/${code}` as const,

    /**
     * - GET
     * - POST
     */
    guildTemplates: (guildId: Snowflake) => `/guilds/${guildId}/templates` as const,

    /**
     * - GET
     */
    guildVanityUrl: (guildId: Snowflake) => `/guilds/${guildId}/vanity-url` as const,

    /**
     * - GET
     */
    guildVoiceRegions: (guildId: Snowflake) => `/guilds/${guildId}/regions` as const,

    /**
     * - GET
     * - PATCH
     */
    guildVoiceState: (guildId: Snowflake, userId: Snowflake = "@me") =>
        `/guilds/${guildId}/voice-states/${userId}` as const,

    /**
     * - GET
     */
    guildWebhooks: (guildId: Snowflake) => `/guilds/${guildId}/webhooks` as const,

    /**
     * - GET
     * - PATCH
     */
    guildWelcomeScreen: (guildId: Snowflake) =>
        `/guilds/${guildId}/welcome-screen` as const,

    /**
     * - GET
     */
    guildWidgetImage: (guildId: Snowflake) => `/guilds/${guildId}/widget.png` as const,

    /**
     * - GET
     */
    guildWidgetJSON: (guildId: Snowflake) => `/guilds/${guildId}/widget.json` as const,

    /**
     * - GET
     * - PATCH
     */
    guildWidgetSettings: (guildId: Snowflake) => `/guilds/${guildId}/widget` as const,

    /**
     * - GET
     * - DELETE
     */
    interactionCallback: (interactionId: Snowflake, interactionToken: string) =>
        `/interactions/${interactionId}/${interactionToken}/callback` as const,

    /**
     * - GET
     * - POST
     */
    invite: (code: string) => `/invites/${code}` as const,

    /**
     * - GET
     * - POST
     */
    nitroStickerPacks: () => "/sticker-packs" as const,

    /**
     * - GET
     * - POST
     */
    oauth2Authorization: () => "/oauth2/authorize" as const,

    /**
     * - GET
     */
    oauth2CurrentApplication: () => "/oauth2/applications/@me" as const,

    /**
     * - GET
     */
    oauth2CurrentAuthorization: () => "/oauth2/@me" as const,

    /**
     * - POST
     */
    oauth2TokenExchange: () => "/oauth2/token" as const,

    /**
     * - POST
     */
    oauth2TokenRevocation: () => "/oauth2/token/revoke" as const,

    /**
     * - GET
     * - POST
     */
    pollAnswerVoters: (channelId: Snowflake, messageId: Snowflake, answerId: number) =>
        `/channels/${channelId}/polls/${messageId}/answers/${answerId}` as const,

    /**
     * - POST
     */
    sendSoundboardSound: (channelId: Snowflake) =>
        `/channels/${channelId}/send-soundboard-sound` as const,

    /**
     * - GET
     */
    skus: (applicationId: Snowflake) => `/applications/${applicationId}/skus` as const,

    /**
     * - GET
     */
    skuSubscription: (skuId: Snowflake, subscriptionId: Snowflake) =>
        `/skus/${skuId}/subscriptions/${subscriptionId}` as const,

    /**
     * - GET
     */
    skuSubscriptions: (skuId: Snowflake) => `/skus/${skuId}/subscriptions` as const,

    /**
     * - GET
     */
    soundboardDefaultSounds: () => "/soundboard-default-sounds" as const,

    /**
     * - GET
     * - POST
     */
    stageInstance: (channelId: Snowflake) => `/stage-instances/${channelId}` as const,

    /**
     * - GET
     * - POST
     */
    stageInstances: () => "/stage-instances" as const,

    /**
     * - GET
     */
    sticker: (stickerId: Snowflake) => `/stickers/${stickerId}` as const,

    /**
     * - GET
     */
    stickerPack: (packId: Snowflake) => `/sticker-packs/${packId}` as const,

    /**
     * - GET
     * - POST
     */
    stickerPacks: () => "/sticker-packs" as const,

    /**
     * - GET
     * - PUT
     * - DELETE
     */
    template: (code: string) => `/guilds/templates/${code}` as const,

    /**
     * - GET
     * - PUT
     * - DELETE
     */
    threadMembers: (threadId: Snowflake, userId?: Snowflake | "@me") =>
        userId
            ? (`/channels/${threadId}/thread-members/${userId}` as const)
            : (`/channels/${threadId}/thread-members` as const),

    /**
     * - POST
     */
    threads: (parentId: Snowflake, messageId?: Snowflake) =>
        messageId
            ? (`/channels/${parentId}/messages/${messageId}/threads` as const)
            : (`/channels/${parentId}/threads` as const),

    /**
     * - GET
     * - PUT
     */
    user: (userId: Snowflake = "@me") => `/users/${userId}` as const,

    /**
     * - GET
     * - PUT
     */
    userApplicationRoleConnection: (applicationId: Snowflake) =>
        `/users/@me/applications/${applicationId}/role-connection` as const,

    /**
     * - POST
     */
    userChannels: () => "/users/@me/channels" as const,

    /**
     * - GET
     */
    userConnections: () => "/users/@me/connections" as const,

    /**
     * - DELETE
     */
    userGuild: (guildId: Snowflake) => `/users/@me/guilds/${guildId}` as const,

    /**
     * - GET
     */
    userGuildMember: (guildId: Snowflake) =>
        `/users/@me/guilds/${guildId}/member` as const,

    /**
     * - GET
     */
    userGuilds: () => "/users/@me/guilds" as const,

    /**
     * - GET
     */
    voiceRegions: () => "/voice/regions" as const,

    /**
     * - GET
     * - PATCH
     * - DELETE
     * - POST
     */
    webhook: (webhookId: Snowflake, webhookToken?: string) =>
        webhookToken
            ? (`/webhooks/${webhookId}/${webhookToken}` as const)
            : (`/webhooks/${webhookId}` as const),

    /**
     * - GET
     * - PATCH
     * - DELETE
     */
    webhookMessage: (
        webhookId: Snowflake,
        webhookToken: string,
        messageId?: Snowflake | "@original"
    ) =>
        `/webhooks/${webhookId}/${webhookToken}/messages/${messageId || "@original"}` as const,

    /**
     * - POST
     */
    webhookPlatform: (
        webhookId: Snowflake,
        webhookToken: string,
        platform: "github" | "slack"
    ) =>
        platform === "github"
            ? (`/webhooks/${webhookId}/${webhookToken}/github` as const)
            : (`/webhooks/${webhookId}/${webhookToken}/slack` as const),
}
