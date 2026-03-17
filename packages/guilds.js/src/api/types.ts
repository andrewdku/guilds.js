import type {
    ApplicationCommandOptionTypes,
    ApplicationCommandTypes,
    ApplicationEventWebhookStatuses,
    ApplicationInstallParamScopes,
    ApplicationIntegrationTypes,
    ChannelDefaultForumLayouts,
    ChannelDefaultSortOrders,
    ChannelOverwriteTypes,
    ChannelTypes,
    ChannelVideoQualityModes,
    EmbedTypes,
    EntitlementTypes,
    GuildAgeRestrictionLevels,
    GuildDefaultMessageNotificationLevels,
    GuildExplicitContentFilterLevels,
    GuildFeatures,
    GuildMFALevels,
    GuildPremiumTiers,
    GuildSystemChannelFlags,
    GuildVerificationLevels,
    InteractionContextTypes,
    InteractionTypes,
    Locales,
    MessageActivityTypes,
    MessageComponentTypes,
    MessageReferenceTypes,
    MessageTypes,
    PollLayoutTypes,
    StickerFormatTypes,
    StickerTypes,
    TeamMemberMembershipStates,
    TeamMemberRoleTypes,
} from "@/api"

/** @see https://docs.discord.com/developers/resources/application#application-object */
export interface Application {
    approximate_guild_count?: number
    approximate_user_authorization_count?: number
    approximate_user_install_count?: number
    bot?: Partial<User>
    bot_public: boolean
    bot_require_code_grant: boolean
    cover_image?: string
    custom_install_url?: string
    description: string
    event_webhooks_status: ApplicationEventWebhookStatus
    event_webhooks_types?: WebhookEventType[]
    event_webhooks_url?: string | null
    flags?: number
    guild: Partial<Guild>
    guild_id?: Snowflake
    icon: string | null
    id: Snowflake
    install_params?: ApplicationInstallParams
    interactions_endpoint_url?: string
    name: string
    owner?: Partial<User>
    primary_sku_id?: Snowflake
    privacy_policy_url?: string
    redirect_uris?: string[]
    role_connections_verification_url?: string | null
    rpc_origins?: string[]
    slug?: string
    tags?: string[]
    team: Team | null
    terms_of_service_url?: string
    verify_key: string
}

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-application-command-data-structure */
export interface ApplicationCommandData {
    guild_id?: Snowflake
    id: Snowflake
    name: string
    options?: ApplicationCommandInteractionDataOption[]
    resolved?: Resolved
    target_id?: Snowflake
    type: ApplicationCommandType
}

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-application-command-interaction-data-option-structure */
export interface ApplicationCommandInteractionDataOption {
    focused?: boolean
    name: string
    options?: ApplicationCommandInteractionDataOption[]
    type: ApplicationCommandOptionType
    value?: string | number | boolean
}

export type ApplicationCommandOptionType =
    (typeof ApplicationCommandOptionTypes)[keyof typeof ApplicationCommandOptionTypes]

export type ApplicationCommandType =
    (typeof ApplicationCommandTypes)[keyof typeof ApplicationCommandTypes]

/** @see https://docs.discord.com/developers/resources/application#application-object-application-event-webhook-status */
export type ApplicationEventWebhookStatus =
    (typeof ApplicationEventWebhookStatuses)[keyof typeof ApplicationEventWebhookStatuses]

/** @see https://docs.discord.com/developers/resources/application#install-params-object */
export interface ApplicationInstallParams {
    scopes: string[]
    permissions: string
}

/** @see https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes */
export type ApplicationInstallParamsScope = (typeof ApplicationInstallParamScopes)[number]

/** @see https://docs.discord.com/developers/resources/application#application-object-application-integration-types */
export type ApplicationIntegrationType =
    (typeof ApplicationIntegrationTypes)[keyof typeof ApplicationIntegrationTypes]

/** @see https://docs.discord.com/developers/resources/message#attachment-object */
export interface Attachment {
    content_type?: string
    description?: string
    duration_secs?: number
    ephemeral?: boolean
    filename: string
    flags?: number
    height?: number | null
    id: Snowflake
    proxy_url: string
    size: number
    title?: string
    url: string
    waveform?: string
    width?: number | null
}

export type AuthorizingIntegrationOwners = Partial<
    Record<ApplicationIntegrationType, Snowflake>
>

/** @see https://docs.discord.com/developers/resources/user#avatar-decoration-data-object */
export interface AvatarDecorationData {
    asset: string
    sku_id: Snowflake
}

/** @see https://docs.discord.com/developers/resources/channel#channel-object */
export interface Channel {
    application_id?: Snowflake
    applied_tags?: Snowflake[]
    available_tags?: ForumTag[]
    bitrate?: number
    default_auto_archive_duration?: ChannelAutoArchiveDuration
    default_forum_layout?: ChannelDefaultForumLayout
    default_reaction_emoji?: ForumDefaultReaction
    default_sort_order?: ChannelDefaultSortOrder
    default_thread_rate_limit_per_user?: number
    flags?: number
    guild_id?: Snowflake
    icon?: string | null
    id: Snowflake
    last_message_id?: Snowflake | null
    last_pin_timestamp?: ISO8601Timestamp | null
    managed?: boolean
    member?: ThreadMember
    member_count?: number
    message_count?: number
    name?: string | null
    nsfw?: boolean
    owner_id?: Snowflake
    parent_id?: Snowflake | null
    permission_overwrites?: ChannelOverwrite[]
    permissions?: string
    position?: number
    rate_limit_per_user?: number
    recipients?: User[]
    rtc_region?: string | null
    thread_metadata?: ThreadMetadata
    topic?: string | null
    total_message_sent?: number
    type: ChannelType
    user_limit?: number
    video_quality_mode?: ChannelVideoQualityMode
}

export type ChannelAutoArchiveDuration = 60 | 1440 | 4320 | 10080 | (number & {})

export type ChannelDefaultForumLayout =
    (typeof ChannelDefaultForumLayouts)[keyof typeof ChannelDefaultForumLayouts]

/** @see https://docs.discord.com/developers/resources/channel#channel-object-sort-order-types */
export type ChannelDefaultSortOrder =
    (typeof ChannelDefaultSortOrders)[keyof typeof ChannelDefaultSortOrders]

/** @see https://docs.discord.com/developers/resources/message#channel-mention-object */
export interface ChannelMention {
    guild_id: Snowflake
    id: Snowflake
    name: string
    type: ChannelType
}

/** @see https://docs.discord.com/developers/resources/channel#overwrite-object */
export interface ChannelOverwrite {
    allow: string
    deny: string
    id: Snowflake
    type: number
}

export type ChannelOverwriteType =
    (typeof ChannelOverwriteTypes)[keyof typeof ChannelOverwriteTypes]

/** @see https://docs.discord.com/developers/components/reference#channel-select-channel-select-interaction-response-structure */
export interface ChannelSelectInteractionResponse {
    component_type: 8
    custom_id: string
    id: number
    resolved: Resolved
    type: 8
    values: Snowflake[]
}

export type ChannelType = (typeof ChannelTypes)[keyof typeof ChannelTypes]
export type ChannelVideoQualityMode =
    (typeof ChannelVideoQualityModes)[keyof typeof ChannelVideoQualityModes]

/** @see https://docs.discord.com/developers/components/reference#checkbox-group-structure */
export interface CheckboxGroup {
    custom_id: string
    id?: number
    max_values?: number
    min_values?: number
    options: CheckboxGroupOption[]
    required?: boolean
    type: 22
}

/** @see https://docs.discord.com/developers/components/reference#checkbox-group-interaction-response-structure */
export interface CheckboxGroupInteractionResponse {
    custom_id: string
    id: number
    type: 22
    values: string[]
}

/** @see https://docs.discord.com/developers/components/reference#checkbox-group-option-structure */
export interface CheckboxGroupOption {
    default?: boolean
    description?: string
    label: string
    value: string
}

/** @see https://docs.discord.com/developers/components/reference#checkbox-interaction-response-structure */
export interface CheckboxInteractionResponse {
    custom_id: string
    id: number
    type: 23
    value: boolean
}

/** @see https://docs.discord.com/developers/resources/user#collectibles */
export interface Collectibles {
    nameplate?: Nameplate
}

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-component-interaction-response-structures */
export type ComponentInteractionResponse =
    | ChannelSelectInteractionResponse
    | CheckboxGroupInteractionResponse
    | CheckboxInteractionResponse
    | FileUploadInteractionResponse
    | LabelInteractionResponse
    | MentionableSelectInteractionResponse
    | RadioGroupInteractionResponse
    | RoleSelectInteractionResponse
    | StringSelectInteractionResponse
    | TextInputInteractionResponse
    | UserSelectInteractionResponse

/** @see https://docs.discord.com/developers/resources/message#embed-object */
export interface Embed {
    author?: EmbedAuthor
    color?: number
    description?: string
    fields?: EmbedField[]
    footer?: EmbedFooter
    image?: EmbedImage
    provider?: EmbedProvider
    thumbnail?: EmbedThumbnail
    timestamp?: ISO8601Timestamp
    title?: string
    type?: EmbedType
    url?: string
    video?: EmbedVideo
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-author-structure */
export interface EmbedAuthor {
    icon_url?: string
    name: string
    proxy_icon_url?: string
    url?: string
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-field-structure */
export interface EmbedField {
    inline?: boolean
    name: string
    value: string
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-footer-structure */
export interface EmbedFooter {
    icon_url?: string
    proxy_icon_url?: string
    text: string
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-image-structure */
export interface EmbedImage {
    height?: number
    proxy_url?: string
    url: string
    width?: number
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-provider-structure */
export interface EmbedProvider {
    name?: string
    url?: string
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-thumbnail-structure */
export interface EmbedThumbnail {
    height?: number
    proxy_url?: string
    url: string
    width?: number
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-types */
export type EmbedType = (typeof EmbedTypes)[number]

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-video-structure */
export interface EmbedVideo {
    height?: number
    proxy_url?: string
    url?: string
    width?: number
}

/** @see https://docs.discord.com/developers/resources/emoji#emoji-object */
export interface Emoji {
    animated?: boolean
    available?: boolean
    id: Snowflake | null
    managed?: boolean
    name: string | null
    require_colons?: boolean
    roles?: Role[]
    user?: User
}

/** @see https://docs.discord.com/developers/resources/entitlement#entitlement-object */
export interface Entitlement {
    application_id: Snowflake
    consumed?: boolean
    deleted: boolean
    ends_at: ISO8601Timestamp | null
    guild_id?: Snowflake
    id: Snowflake
    sku_id: Snowflake
    starts_at: ISO8601Timestamp | null
    type: EntitlementType
    user_id?: Snowflake
}

/** @see https://docs.discord.com/developers/resources/entitlement#entitlement-object-entitlement-types */
export type EntitlementType = (typeof EntitlementTypes)[keyof typeof EntitlementTypes]

/** @see https://docs.discord.com/developers/components/reference#file-upload-file-upload-interaction-response-structure */
export interface FileUploadInteractionResponse {
    custom_id: string
    id: number
    type: 19
    values: Snowflake[]
}

/** @see https://docs.discord.com/developers/resources/channel#default-reaction-object */
export interface ForumDefaultReaction {
    emoji_id: Snowflake | null
    emoji_name: string | null
}

/** @see https://docs.discord.com/developers/resources/channel#forum-tag-object */
export interface ForumTag {
    emoji_id: Snowflake | null
    emoji_name: string | null
    id: Snowflake
    moderated: boolean
    name: string
}

/** @see https://docs.discord.com/developers/resources/guild#guild-object */
export interface Guild {
    afk_channel_id: Snowflake | null
    afk_timeout: number
    application_id: Snowflake | null
    approximate_member_count?: number
    approximate_presence_count?: number
    banner: string | null
    default_message_notifications: GuildDefaultMessageNotificationLevel
    description: string | null
    discovery_splash: string | null
    emojis: Emoji[]
    explicit_content_filter: GuildExplicitContentFilterLevel
    features: GuildFeature[]
    icon: string | null
    icon_hash?: string | null
    id: Snowflake
    incidents_data: GuildIncidentsData | null
    max_members?: number
    max_presences?: number | null
    max_stage_video_channel_users?: number
    max_video_channel_users?: number
    mfa_level: GuildMFALevel
    name: string
    nsfw_level: number
    owner?: boolean
    owner_id: Snowflake
    permissions?: string
    preferred_locale: Locale
    premium_progress_bar_enabled: boolean
    premium_subscription_count?: number
    premium_tier: GuildPremiumTier
    public_updates_channel_id: Snowflake | null
    region?: string | null
    roles: Role[]
    rules_channel_id: Snowflake | null
    safety_alerts_channel_id: Snowflake | null
    splash: string | null
    stickers?: Sticker[]
    system_channel_flags: number
    system_channel_id: Snowflake | null
    vanity_url_code: string | null
    verification_level: GuildVerificationLevel
    welcome_screen?: GuildWelcomeScreen
    widget_channel_id?: Snowflake | null
    widget_enabled?: boolean
}

/** @see https://docs.discord.com/developers/resources/guild#guild-object-guild-nsfw-level */
export type GuildAgeRestrictionLevel =
    (typeof GuildAgeRestrictionLevels)[keyof typeof GuildAgeRestrictionLevels]

/** @see https://docs.discord.com/developers/resources/guild#guild-object-default-message-notification-level */
export type GuildDefaultMessageNotificationLevel =
    (typeof GuildDefaultMessageNotificationLevels)[keyof typeof GuildDefaultMessageNotificationLevels]

/** @see https://docs.discord.com/developers/resources/guild#guild-object-explicit-content-filter-level */
export type GuildExplicitContentFilterLevel =
    (typeof GuildExplicitContentFilterLevels)[keyof typeof GuildExplicitContentFilterLevels]

/** @see https://docs.discord.com/developers/resources/guild#guild-object-guild-features */
export type GuildFeature = (typeof GuildFeatures)[number]

/** @see https://docs.discord.com/developers/resources/guild#incidents-data-object */
export interface GuildIncidentsData {
    dm_spam_detected_at?: ISO8601Timestamp | null
    dms_disabled_until: ISO8601Timestamp | null
    invites_disabled_until: ISO8601Timestamp | null
    raid_detected_at?: ISO8601Timestamp | null
}

/** @see https://docs.discord.com/developers/resources/guild#guild-member-object */
export interface GuildMember {
    avatar?: string | null
    avatar_decoration_data?: AvatarDecorationData | null
    banner?: string | null
    communication_disabled_until?: ISO8601Timestamp | null
    deaf: boolean
    flags: number
    joined_at: ISO8601Timestamp | null
    mute: boolean
    nick?: string | null
    pending?: boolean
    permissions?: string
    premium_since?: ISO8601Timestamp | null
    roles: Snowflake[]
    user?: User
}

/** @see https://docs.discord.com/developers/resources/guild#guild-object-mfa-level */
export type GuildMFALevel = (typeof GuildMFALevels)[keyof typeof GuildMFALevels]

/** @see https://docs.discord.com/developers/resources/guild#guild-object-premium-tier */
export type GuildPremiumTier = (typeof GuildPremiumTiers)[keyof typeof GuildPremiumTiers]

/** @see https://docs.discord.com/developers/resources/guild#guild-object-system-channel-flags */
export type GuildSystemChannelFlag =
    (typeof GuildSystemChannelFlags)[keyof typeof GuildSystemChannelFlags]

/** @see https://docs.discord.com/developers/resources/guild#guild-object-verification-level */
export type GuildVerificationLevel =
    (typeof GuildVerificationLevels)[keyof typeof GuildVerificationLevels]

/** @see https://docs.discord.com/developers/resources/voice#voice-region-object */
export interface GuildVoiceRegion {
    custom: boolean
    deprecated: boolean
    id: string
    name: string
    optimal: boolean
}

/** @see https://docs.discord.com/developers/resources/guild#welcome-screen-object */
export interface GuildWelcomeScreen {
    description: string | null
    welcome_channels: GuildWelcomeScreenChannel[]
}

/** @see https://docs.discord.com/developers/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export interface GuildWelcomeScreenChannel {
    channel_id: Snowflake
    description: string
    emoji_id: Snowflake
    emoji_name: string
}

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object */
export interface Interaction {
    app_permissions: string
    application_id: Snowflake
    attachment_size_limit: number
    authorizing_integration_owners: AuthorizingIntegrationOwners
    channel?: Partial<Channel>
    context?: InteractionContextType
    data?: InteractionData
    entitlements: Entitlement[]
    guild?: Partial<Guild>
    guild_id?: Snowflake
    guild_locale?: Locale
    id: Snowflake
    locale?: Locale
    member?: GuildMember
    message?: Message
    token: string
    type: InteractionType
    user?: User
    version: 1 | (number & {})
}

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-context-types */
export type InteractionContextType =
    (typeof InteractionContextTypes)[keyof typeof InteractionContextTypes]

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-data */
export type InteractionData =
    | ApplicationCommandData
    | MessageComponentData
    | ModalSubmitData
    | undefined

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-type */
export type InteractionType = (typeof InteractionTypes)[keyof typeof InteractionTypes]

/** @see https://docs.discord.com/developers/reference#iso8601-date%2Ftime */
export type ISO8601Timestamp = string

/** @see https://docs.discord.com/developers/components/reference#label-label-interaction-response-structure */
export interface LabelInteractionResponse {
    component: ComponentInteractionResponse
    id: number
    type: 18
}

/** @see https://docs.discord.com/developers/reference#locales */
export type Locale = (typeof Locales)[keyof typeof Locales] | (string & {})

/** @see https://docs.discord.com/developers/components/reference#mentionable-select-mentionable-select-interaction-response-structure */
export interface MentionableSelectInteractionResponse {
    component_type: 7
    custom_id: string
    id: number
    resolved: Resolved
    type: 7
    values: Snowflake[]
}

/** @see https://docs.discord.com/developers/resources/message#message-object */
export interface Message {
    activity?: MessageActivityType
    application?: Partial<Application>
    attachments: Attachment[]
    author: User
    call?: MessageCall
    channel_id: Snowflake
    components?: MessageComponent[]
    content: string
    edited_timestamp: ISO8601Timestamp | null
    embeds: Embed[]
    flags?: number
    id: Snowflake
    interaction?: MessageInteraction
    interaction_metadata?: MessageInteractionMetadata
    mention_channels: ChannelMention[]
    mention_everyone: boolean
    mention_roles: Role[]
    mentions: User[]
    message_reference?: MessageReference
    message_snapshots?: MessageSnapshot[]
    nonce?: string | number
    pinned: boolean
    poll?: Poll
    position?: number
    reactions?: Reaction[]
    referenced_message?: Message | null
    resolved?: Resolved
    role_subscription_data?: RoleSubscriptionData
    sticker_items?: MessageStickerItem[]
    stickers?: Sticker[]
    thread?: Channel
    timestamp: ISO8601Timestamp
    tts: boolean
    type: MessageType
    webhook_id?: Snowflake
}

/** @see https://docs.discord.com/developers/resources/message#message-object-message-activity-structure */
export type MessageActivityType =
    (typeof MessageActivityTypes)[keyof typeof MessageActivityTypes]

/** @see https://docs.discord.com/developers/resources/message#message-call-object */
export interface MessageCall {
    participants: Snowflake[]
    ended_timestamp?: ISO8601Timestamp | null
}

/** @see https://docs.discord.com/developers/components/reference#anatomy-of-a-component */
export interface MessageComponent {
    id?: number
    type: MessageComponentType
}

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-message-component-data-structure */
export interface MessageComponentData {
    custom_id: string
    component_type: MessageComponentType
    values?: SelectOption[]
    resolved?: Resolved
}

/** @see https://docs.discord.com/developers/components/reference#component-object-component-types */
export type MessageComponentType =
    (typeof MessageComponentTypes)[keyof typeof MessageComponentTypes]

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface MessageInteraction {
    id: Snowflake
    member?: Partial<GuildMember>
    name: string
    type: InteractionType
    user: User
}

/** @see https://docs.discord.com/developers/resources/message#message-interaction-metadata-object */
export interface MessageInteractionMetadata {
    authorizing_integration_owners: AuthorizingIntegrationOwners
    id: Snowflake
    original_response_message_id?: Snowflake
    target_message_id?: Snowflake
    target_user?: User
    type: InteractionType
    user: User
}

/** @see https://docs.discord.com/developers/resources/message#message-reference-structure */
export interface MessageReference {
    channel_id?: Snowflake
    fail_if_not_exists?: boolean
    guild_id?: Snowflake
    message_id?: Snowflake
    type?: MessageReferenceType
}

/** @see https://docs.discord.com/developers/resources/message#message-reference-types */
export type MessageReferenceType =
    (typeof MessageReferenceTypes)[keyof typeof MessageReferenceTypes]

/** @see https://docs.discord.com/developers/resources/message#message-snapshot-object */
export interface MessageSnapshot {
    message: Partial<Message>
}

/** @see https://docs.discord.com/developers/resources/sticker#sticker-item-object */
export interface MessageStickerItem {
    format_type: StickerFormatType
    id: Snowflake
    name: string
}

/** @see https://docs.discord.com/developers/resources/message#message-object-message-types */
export type MessageType = (typeof MessageTypes)[keyof typeof MessageTypes]

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-modal-submit-data-structure */
export interface ModalSubmitData {
    components: ComponentInteractionResponse[] // https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-component-interaction-response-structures
    custom_id: string
    resolved?: Resolved
}

/** @see https://docs.discord.com/developers/resources/user#nameplate-nameplate-structure */
export interface Nameplate {
    asset: string
    label: string
    palette: NameplatePalette
    sku_id: Snowflake
}

export type NameplatePalette =
    | "berry"
    | "bubble_gum"
    | "clover"
    | "cobalt"
    | "crimson"
    | "forest"
    | "lemon"
    | "sky"
    | "teal"
    | "violet"
    | "white"
    | (string & {})

/** @see https://docs.discord.com/developers/resources/poll#poll-object */
export interface Poll {
    allow_multiselect: boolean
    answers: PollAnswer[]
    expiry: ISO8601Timestamp | null
    layout_type: PollLayoutType
    question: PollMedia
    results?: PollResults
}

/** @see https://docs.discord.com/developers/resources/poll#poll-answer-object-poll-answer-object-structure */
export interface PollAnswer {
    answer_id: number
    poll_media: PollMedia
}

/** @see https://docs.discord.com/developers/resources/poll#poll-answer-object-poll-answer-object-structure */
export interface PollAnswerCount {
    count: boolean
    id: number
    me_voted: boolean
}

/** @see https://docs.discord.com/developers/resources/poll#layout-type */
export type PollLayoutType = (typeof PollLayoutTypes)[keyof typeof PollLayoutTypes]

/** @see https://docs.discord.com/developers/resources/poll#poll-media-object-poll-media-object-structure */
export interface PollMedia {
    emoji?: Partial<Emoji>
}

/** @see https://docs.discord.com/developers/resources/poll#poll-answer-object-poll-answer-object-structure */
export interface PollResults {
    answer_counts: PollAnswerCount[]
    is_finalized: boolean
}

/** @see https://docs.discord.com/developers/components/reference#radio-group-interaction-response-structure */
export interface RadioGroupInteractionResponse {
    custom_id: string
    id: number
    type: 21
    value: string | null
}

/** @see https://docs.discord.com/developers/resources/message#reaction-object */
export interface Reaction {
    burst_colors: string[]
    count: number
    count_details: ReactionCountDetails
    emoji: Partial<Emoji>
    me: boolean
    me_burst: boolean
}

/** @see https://docs.discord.com/developers/resources/message#reaction-count-details-object */
export interface ReactionCountDetails {
    burst: number
    normal: number
}

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-resolved-data-structure */
export interface Resolved {
    attachments?: Record<Snowflake, Attachment>
    channels?: Record<Snowflake, Partial<Channel>>
    members?: Record<Snowflake, Partial<GuildMember>>
    messages?: Record<Snowflake, Partial<Message>>
    roles?: Record<Snowflake, Role>
    users?: Record<Snowflake, User>
}

/** @see https://docs.discord.com/developers/topics/permissions#role-object */
export interface Role {
    /** @deprecated Use {@link Role.colors} instead. */ color: number
    colors: RoleColors
    flags: number
    hoist: boolean
    icon?: string | null
    id: Snowflake
    managed: boolean
    mentionable: boolean
    name: string
    permissions: string
    position: number
    tags?: RoleTags
    unicode_emoji?: string | null
}

/** @see https://docs.discord.com/developers/topics/permissions#role-object-role-colors-object */
export interface RoleColors {
    primary_color: number
    secondary_color: number | null
    tertiary_color: number | null
}

/** @see https://docs.discord.com/developers/components/reference#role-select-role-select-interaction-response-structure */
export interface RoleSelectInteractionResponse {
    component_type: 6
    custom_id: string
    id: number
    resolved: Resolved
    type: 6
    values: Snowflake[]
}

/** @see https://docs.discord.com/developers/resources/message#role-subscription-data-object */
export interface RoleSubscriptionData {
    is_renewal: boolean
    role_subscription_listing_id: Snowflake
    tier_name: string
    total_months_subscribed: number
}

/** @see https://docs.discord.com/developers/topics/permissions#role-object-role-tags-structure */
export interface RoleTags {
    available_for_purchase?: null
    bot_id?: Snowflake
    guild_connections?: null
    integration_id?: Snowflake
    premium_subscriber?: null
    subscription_listing_id?: Snowflake
}

export interface SelectOption {
    default?: boolean
    description?: string
    emoji?: Partial<Emoji> & {
        animated?: boolean
        id: Snowflake | null
        name: string | null
    }
    label: string
    value: string
}

/** @see https://docs.discord.com/developers/reference#snowflakes */
export type Snowflake = string

/** @see https://docs.discord.com/developers/resources/sticker#sticker-object */
export interface Sticker {
    available?: boolean
    description: string | null
    format_type: StickerFormatType
    guild_id?: Snowflake
    id: Snowflake
    name: string
    pack_id?: Snowflake
    sort_value?: number
    tags: string
    type: StickerType
    user?: User
}

/** @see https://docs.discord.com/developers/resources/sticker#sticker-object-sticker-format-types */
export type StickerFormatType =
    (typeof StickerFormatTypes)[keyof typeof StickerFormatTypes]

/** @see https://docs.discord.com/developers/resources/sticker#sticker-object-sticker-types */
export type StickerType = (typeof StickerTypes)[keyof typeof StickerTypes]

/** @see https://docs.discord.com/developers/components/reference#string-select-string-select-interaction-response-structure */
export interface StringSelectInteractionResponse {
    component_type: 3
    custom_id: string
    id: number
    type: 3
    values: string[]
}

/** @see https://docs.discord.com/developers/topics/teams#data-models-team-object */
export interface Team {
    icon: string | null
    id: Snowflake
    members: TeamMember[]
    name: string
    owner_user_id: Snowflake
}

/** @see https://docs.discord.com/developers/topics/teams#data-models-team-member-object */
export interface TeamMember {
    membership_state: TeamMemberMembershipState
    team_id: Snowflake
    user: Partial<User>
    role: string
}

/** @see https://docs.discord.com/developers/topics/teams#data-models-membership-state-enum */
export type TeamMemberMembershipState =
    (typeof TeamMemberMembershipStates)[keyof typeof TeamMemberMembershipStates]

/** @see https://docs.discord.com/developers/topics/teams#team-member-roles-team-member-role-types */
export type TeamMemberRoleType =
    (typeof TeamMemberRoleTypes)[keyof typeof TeamMemberRoleTypes]

/** @see https://docs.discord.com/developers/resources/channel#thread-member-object */
export interface ThreadMember {
    flags: number
    id?: Snowflake
    join_timestamp: ISO8601Timestamp
    member?: GuildMember
    user_id?: Snowflake
}

/** @see https://docs.discord.com/developers/resources/channel#thread-metadata-object */
export interface ThreadMetadata {
    archive_timestamp: ISO8601Timestamp
    archived: boolean
    auto_archive_duration: ChannelAutoArchiveDuration
    create_timestamp?: ISO8601Timestamp | null
    invitable?: boolean
    locked: boolean
}

/** @see https://docs.discord.com/developers/components/reference#text-display */
export interface TextDisplay {
    content: string
    id?: number
    type: 10
}

/** @see https://docs.discord.com/developers/components/reference#text-display-text-display-interaction-response-structure */
export interface TextDisplayInteractionResponse {
    type: 10
    id: number
}

/** @see https://docs.discord.com/developers/components/reference#text-input-text-input-interaction-response-structure */
export interface TextInputInteractionResponse {
    custom_id: string
    id: number
    type: 4
    value: string
}

/** @see https://docs.discord.com/developers/resources/user#user-object */
export interface User {
    accent_color?: number
    avatar: string | null
    avatar_decoration_data?: AvatarDecorationData | null
    banner?: string | null
    bot?: boolean
    collectibles?: Collectibles | null
    discriminator: string
    email?: string | null
    flags?: number
    global_name: string | null
    id: Snowflake
    locale?: string
    mfa_enabled?: boolean
    premium_type?: number
    primary_guild?: UserPrimaryGuild | null
    public_flags?: number
    system?: boolean
    username: string
    verified?: boolean
}

/** @see https://docs.discord.com/developers/resources/user#user-object-user-primary-guild */
export interface UserPrimaryGuild {
    badge: string | null
    identity_enabled: boolean | null
    identity_guild_id: Snowflake | null
    tag: string | null
}

/** @see https://docs.discord.com/developers/components/reference#user-select-user-select-interaction-response-structure */
export interface UserSelectInteractionResponse {
    component_type: 5
    custom_id: string
    id: number
    resolved: Resolved
    type: 5
    values: Snowflake[]
}

/** @see https://docs.discord.com/developers/events/webhook-events#event-types */
export type WebhookEventType =
    | "APPLICATION_AUTHORIZED"
    | "APPLICATION_DEAUTHORIZED"
    | "ENTITLEMENT_CREATE"
    | "ENTITLEMENT_DELETE"
    | "ENTITLEMENT_UPDATE"
    | "GAME_DIRECT_MESSAGE_CREATE"
    | "GAME_DIRECT_MESSAGE_DELETE"
    | "GAME_DIRECT_MESSAGE_UPDATE"
    | "LOBBY_MESSAGE_CREATE"
    | "LOBBY_MESSAGE_DELETE"
    | "LOBBY_MESSAGE_UPDATE"
    | "QUEST_USER_ENROLLMENT"
