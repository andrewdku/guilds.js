export type * from "@/api/types"
export * from "@/api/endpoints"

export const ApplicationCommandTypes = {
    CHAT_INPUT: 1,
    MESSAGE: 3,
    PRIMARY_ENTRY_POINT: 4,
    USER: 2,
} as const

export const ApplicationCommandOptionTypes = {
    ATTACHMENT: 11,
    BOOLEAN: 5,
    CHANNEL: 7,
    INTEGER: 4,
    MENTIONABLE: 9,
    NUMBER: 10,
    ROLE: 8,
    STRING: 3,
    SUB_COMMAND: 1,
    SUB_COMMAND_GROUP: 2,
    USER: 6,
} as const

export const ApplicationEventWebhookStatuses = {
    DISABLED: 1,
    DISABLED_BY_DISCORD: 3,
    ENABLED: 2,
} as const

export const ApplicationInstallParamScopes = [
    "activities.read",
    "activities.write",
    "applications.builds.read",
    "applications.builds.upload",
    "applications.commands",
    "applications.commands.permissions.update",
    "applications.commands.update",
    "applications.entitlements",
    "applications.store.update",
    "bot",
    "connections",
    "dm_channels.read",
    "email",
    "gdm.join",
    "guilds",
    "guilds.join",
    "guilds.members.read",
    "identify",
    "messages.read",
    "relationships.read",
    "role_connections.write",
    "rpc",
    "rpc.activities.write",
    "rpc.notifications.read",
    "rpc.voice.read",
    "rpc.voice.write",
    "voice",
    "webhook.incoming",
] as const

export const ApplicationIntegrationTypes = {
    GUILD_INSTALL: 0,
    USER_INSTALL: 1,
} as const

export const ChannelDefaultForumLayouts = {
    GALLERY_VIEW: 2,
    LIST_VIEW: 1,
    NOT_SET: 0,
} as const

export const ChannelDefaultSortOrders = {
    CREATION_DATE: 1,
    LATEST_ACTIVITY: 0,
} as const

export const ChannelOverwriteTypes = {
    MEMBER: 1,
    ROLE: 0,
} as const

export const ChannelTypes = {
    ANNOUNCEMENT_THREAD: 10,
    DM: 1,
    GROUP_DM: 3,
    GUILD_ANNOUNCEMENT: 5,
    GUILD_CATEGORY: 4,
    GUILD_DIRECTORY: 14,
    GUILD_FORUM: 15,
    GUILD_MEDIA: 16,
    GUILD_STAGE_VOICE: 13,
    GUILD_TEXT: 0,
    GUILD_VOICE: 2,
    PRIVATE_THREAD: 12,
    PUBLIC_THREAD: 11,
} as const

export const ChannelVideoQualityModes = {
    AUTO: 1,
    FULL: 2,
} as const

export const EmbedTypes = [
    "article",
    "gifv",
    "image",
    "link",
    "poll_result",
    "rich",
    "video",
] as const

export const EntitlementTypes = {
    APPLICATION_SUBSCRIPTION: 8,
    DEVELOPER_GIFT: 3,
    FREE_PURCHASE: 5,
    PREMIUM_PURCHASE: 7,
    PREMIUM_SUBSCRIPTION: 2,
    PURCHASE: 1,
    TEST_MODE_PURCHASE: 4,
    USER_GIFT: 6,
} as const

export const GuildAgeRestrictionLevels = {
    AGE_RESTRICTED: 3,
    DEFAULT: 0,
    EXPLICIT: 1,
    SAFE: 2,
} as const

export const GuildDefaultMessageNotificationLevels = {
    ALL_MESSAGES: 0,
    ONLY_MENTIONS: 1,
} as const

export const GuildExplicitContentFilterLevels = {
    ALL_MEMBERS: 2,
    DISABLED: 0,
    MEMBERS_WITHOUT_ROLES: 1,
} as const

export const GuildFeatures = [
    "ANIMATED_BANNER",
    "ANIMATED_ICON",
    "APPLICATION_COMMAND_PERMISSIONS_V2behavior",
    "AUTO_MODERATION",
    "BANNER",
    "COMMUNITY",
    "CREATOR_MONETIZABLE_PROVISIONAL",
    "CREATOR_STORE_PAGE",
    "DEVELOPER_SUPPORT_SERVER",
    "DISCOVERABLE",
    "ENHANCED_ROLE_COLORS",
    "FEATURABLE",
    "GUESTS_ENABLED",
    "GUILD_TAGS",
    "INVITE_SPLASH",
    "INVITES_DISABLED",
    "MEMBER_VERIFICATION_GATE_ENABLED",
    "MORE_SOUNDBOARD",
    "MORE_STICKERS",
    "NEWS",
    "PARTNERED",
    "PREVIEW_ENABLED",
    "RAID_ALERTS_DISABLED",
    "ROLE_ICONS",
    "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
    "ROLE_SUBSCRIPTIONS_ENABLED",
    "SOUNDBOARD",
    "TICKETED_EVENTS_ENABLED",
    "VANITY_URL",
    "VERIFIED",
    "VIP_REGIONS",
    "WELCOME_SCREEN_ENABLED",
] as const

export const GuildMFALevels = {
    ELEVATED: 1,
    NONE: 0,
} as const

export const GuildPremiumTiers = {
    NONE: 0,
    TIER_1: 1,
    TIER_2: 2,
    TIER_3: 3,
} as const

export const GuildSystemChannelFlags = {
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS: 1 << 2,
    SUPPRESS_JOIN_NOTIFICATION_REPLIES: 1 << 3,
    SUPPRESS_JOIN_NOTIFICATIONS: 1 << 0,
    SUPPRESS_PREMIUM_SUBSCRIPTIONS: 1 << 1,
    SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES: 1 << 5,
    SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS: 1 << 4,
} as const

export const GuildVerificationLevels = {
    HIGH: 3,
    LOW: 1,
    MEDIUM: 2,
    NONE: 0,
    VERY_HIGH: 4,
} as const

export const InteractionContextTypes = {
    BOT_DM: 1,
    GUILD: 0,
    PRIVATE_CHANNEL: 2,
} as const

export const InteractionTypes = {
    APPLICATION_COMMAND: 2,
    APPLICATION_COMMAND_AUTOCOMPLETE: 4,
    MESSAGE_COMPONENT: 3,
    MODAL_SUBMIT: 5,
    PING: 1,
} as const

export const Locales = {
    BULGARIAN: "bg",
    CHINESE_CHINA: "zh-CN",
    CHINESE_TAIWAN: "zh-TW",
    CROATIAN: "hr",
    CZECH: "cs",
    DANISH: "da",
    DUTCH: "nl",
    ENGLISH_UK: "en-GB",
    ENGLISH_US: "en-US",
    FINNISH: "fi",
    FRENCH: "fr",
    GERMAN: "de",
    GREEK: "el",
    HINDI: "hi",
    HUNGARIAN: "hu",
    INDONESIAN: "id",
    ITALIAN: "it",
    JAPANESE: "ja",
    KOREAN: "ko",
    LITHUANIAN: "lt",
    NORWEGIAN: "no",
    POLISH: "pl",
    PORTUGUESE_BRAZILIAN: "pt-BR",
    ROMANIAN: "ro",
    RUSSIAN: "ru",
    SPANISH: "es-ES",
    SPANISH_LATAM: "es-419",
    SWEDISH: "sv-SE",
    THAI: "th",
    TURKISH: "tr",
    UKRAINIAN: "uk",
    VIETNAMESE: "vi",
} as const

export const MessageActivityTypes = {
    JOIN: 1,
    JOIN_REQUEST: 5,
    LISTEN: 3,
    SPECTATE: 2,
} as const

export const MessageComponentTypes = {
    ACTION_ROW: 1,
    BUTTON: 2,
    CHANNEL_SELECT: 8,
    CHECKBOX: 23,
    CHECKBOX_GROUP: 22,
    CONTAINER: 17,
    FILE: 13,
    FILE_UPLOAD: 19,
    LABEL: 18,
    MEDIA_GALLERY: 12,
    MENTIONABLE_SELECT: 7,
    RADIO_GROUP: 21,
    ROLE_SELECT: 6,
    SECTION: 9,
    SEPARATOR: 14,
    STRING_SELECT: 3,
    TEXT_DISPLAY: 10,
    TEXT_INPUT: 4,
    THUMBNAIL: 11,
    USER_SELECT: 5,
} as const

export const MessageReferenceTypes = {
    DEFAULT: 0,
    FORWARD: 1,
} as const

export const MessageTypes = {
    AUTO_MODERATION_ACTION: 24,
    CALL: 3,
    CHANNEL_FOLLOW_ADD: 12,
    CHANNEL_ICON_CHANGE: 5,
    CHANNEL_NAME_CHANGE: 4,
    CHANNEL_PINNED_MESSAGE: 6,
    CHAT_INPUT_COMMAND: 20,
    CONTEXT_MENU_COMMAND: 23,
    DEFAULT: 0,
    GUILD_APPLICATION_PREMIUM_SUBSCRIPTION: 32,
    GUILD_BOOST: 8,
    GUILD_BOOST_TIER_1: 9,
    GUILD_BOOST_TIER_2: 10,
    GUILD_BOOST_TIER_3: 11,
    GUILD_DISCOVERY_DISQUALIFIED: 14,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING: 17,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING: 16,
    GUILD_DISCOVERY_REQUALIFIED: 15,
    GUILD_INCIDENT_ALERT_MODE_DISABLED: 37,
    GUILD_INCIDENT_ALERT_MODE_ENABLED: 36,
    GUILD_INCIDENT_REPORT_FALSE_ALARM: 39,
    GUILD_INCIDENT_REPORT_RAID: 38,
    GUILD_INVITE_REMINDER: 22,
    INTERACTION_PREMIUM_UPSELL: 26,
    POLL_RESULT: 46,
    PURCHASE_NOTIFICATION: 44,
    RECIPIENT_ADD: 1,
    RECIPIENT_REMOVE: 2,
    REPLY: 19,
    ROLE_SUBSCRIPTION_PURCHASE: 25,
    STAGE_END: 28,
    STAGE_SPEAKER: 29,
    STAGE_START: 27,
    STAGE_TOPIC: 31,
    THREAD_CREATED: 18,
    THREAD_STARTER_MESSAGE: 21,
    USER_JOIN: 7,
} as const

export const PollLayoutTypes = {
    DEFAULT: 1,
} as const

export const StickerFormatTypes = {
    APNG: 2,
    GIF: 4,
    LOTTIE: 3,
    PNG: 1,
} as const

export const StickerTypes = {
    GUILD: 2,
    STANDARD: 1,
} as const

export const TeamMemberMembershipStates = {
    ACCEPTED: 2,
    INVITED: 1,
} as const

export const TeamMemberRoleTypes = {
    ADMIN: "admin",
    DEVELOPER: "developer",
    /**
     * No value for this role exists. It's
     * represented by {@link Team.owner_user_id} instead.
     */
    OWNER: undefined,
    READ_ONLY: "read_only",
} as const
