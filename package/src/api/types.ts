import type { ConstValues } from "@/types"
import type {
    APIApplicationEventWebhookStatuses,
    APIApplicationInstallParamScopes,
    APIApplicationIntegrationTypes,
    APIChannelDefaultForumLayouts,
    APIChannelDefaultSortOrders,
    APIChannelOverwriteTypes,
    APIChannelTypes,
    APIChannelVideoQualityModes,
    APIEmbedTypes,
    APIGuildAgeRestrictionLevels,
    APIGuildDefaultMessageNotificationLevels,
    APIGuildExplicitContentFilterLevels,
    APIGuildFeatures,
    APIGuildMFALevels,
    APIGuildPremiumTiers,
    APIGuildSystemChannelFlags,
    APIGuildVerificationLevels,
    APIInteractionTypes,
    APIMessageActivityTypes,
    APIMessageComponentTypes,
    APIMessageReferenceTypes,
    APIMessageTypes,
    APIPollLayoutTypes,
    APIStickerFormatTypes,
    APIStickerTypes,
    APITeamMemberMembershipStates,
    APITeamMemberRoleTypes,
} from "@/api"

/** @see https://docs.discord.com/developers/resources/application#application-object */
export interface APIApplication {
    id: APISnowflake
    name: string
    icon: string | null
    description: string
    rpc_origins?: string[]
    bot_public: boolean
    bot_require_code_grant: boolean
    bot?: Partial<APIUser>
    terms_of_service_url?: string
    privacy_policy_url?: string
    owner?: Partial<APIUser>
    verify_key: string
    team: APITeam | null
    guild_id?: APISnowflake
    guild: Partial<APIGuild>
    primary_sku_id?: APISnowflake
    slug?: string
    cover_image?: string
    flags?: number
    approximate_guild_count?: number
    approximate_user_install_count?: number
    approximate_user_authorization_count?: number
    redirect_uris?: string[]
    interactions_endpoint_url?: string
    role_connections_verification_url?: string | null
    event_webhooks_url?: string | null
    event_webhooks_status: APIApplicationEventWebhookStatus
    event_webhooks_types?: APIWebhookEventType[]
    tags?: string[]
    install_params?: APIApplicationInstallParams
    custom_install_url?: string
}

/** @see https://docs.discord.com/developers/resources/application#application-object-application-event-webhook-status */
export type APIApplicationEventWebhookStatus = ConstValues<
    typeof APIApplicationEventWebhookStatuses
>

/** @see https://docs.discord.com/developers/resources/application#install-params-object */
export interface APIApplicationInstallParams {
    scopes: string[]
    permissions: string
}

/** @see https://docs.discord.com/developers/topics/oauth2#shared-resources-oauth2-scopes */
export type APIApplicationInstallParamsScope =
    (typeof APIApplicationInstallParamScopes)[number]

/** @see https://docs.discord.com/developers/resources/application#application-object-application-integration-types */
export type APIApplicationIntegrationType = ConstValues<
    typeof APIApplicationIntegrationTypes
>

/** @see https://docs.discord.com/developers/resources/message#attachment-object */
export interface APIAttachment {
    content_type?: string
    description?: string
    duration_secs?: number
    ephemeral?: boolean
    filename: string
    flags?: number
    height?: number | null
    id: APISnowflake
    proxy_url: string
    size: number
    title?: string
    url: string
    waveform?: string
    width?: number | null
}

/** @see https://docs.discord.com/developers/resources/user#avatar-decoration-data-object */
export interface APIAvatarDecorationData {
    asset: string
    sku_id: APISnowflake
}

/** @see https://docs.discord.com/developers/resources/channel#channel-object */
export interface APIChannel {
    application_id?: APISnowflake
    applied_tags?: APISnowflake[]
    available_tags?: ForumTag[]
    bitrate?: number
    default_auto_archive_duration?: APIChannelAutoArchiveDuration
    default_forum_layout?: APIChannelDefaultForumLayout
    default_reaction_emoji?: APIForumDefaultReaction
    default_sort_order?: APIChannelDefaultSortOrder
    default_thread_rate_limit_per_user?: number
    flags?: number
    guild_id?: APISnowflake
    icon?: string | null
    id: APISnowflake
    last_message_id?: APISnowflake | null
    last_pin_timestamp?: APIISO8601Timestamp | null
    managed?: boolean
    member?: APIThreadMember
    member_count?: number
    message_count?: number
    name?: string | null
    nsfw?: boolean
    owner_id?: APISnowflake
    parent_id?: APISnowflake | null
    permission_overwrites?: APIChannelOverwrite[]
    permissions?: string
    position?: number
    rate_limit_per_user?: number
    recipients?: APIUser[]
    rtc_region?: string | null
    thread_metadata?: APIThreadMetadata
    topic?: string | null
    total_message_sent?: number
    type: APIChannelType
    user_limit?: number
    video_quality_mode?: APIChannelVideoQualityMode
}

export type APIChannelAutoArchiveDuration = 60 | 1440 | 4320 | 10080 | (number & {})

export type APIChannelDefaultForumLayout = ConstValues<
    typeof APIChannelDefaultForumLayouts
>

/** @see https://docs.discord.com/developers/resources/channel#channel-object-sort-order-types */
export type APIChannelDefaultSortOrder = ConstValues<typeof APIChannelDefaultSortOrders>

/** @see https://docs.discord.com/developers/resources/message#channel-mention-object */
export interface APIChannelMention {
    guild_id: APISnowflake
    id: APISnowflake
    name: string
    type: APIChannelType
}

/** @see https://docs.discord.com/developers/resources/channel#overwrite-object */
export interface APIChannelOverwrite {
    id: APISnowflake
    type: number
    allow: string
    deny: string
}

export type APIChannelOverwriteType = ConstValues<typeof APIChannelOverwriteTypes>
export type APIChannelType = ConstValues<typeof APIChannelTypes>
export type APIChannelVideoQualityMode = ConstValues<typeof APIChannelVideoQualityModes>

/** @see https://docs.discord.com/developers/resources/user#collectibles */
export interface APICollectibles {
    nameplate?: APINameplate
}

/** @see https://docs.discord.com/developers/resources/message#embed-object */
export interface APIEmbed {
    author?: APIEmbedAuthor
    color?: number
    description?: string
    fields?: APIEmbedField[]
    footer?: APIEmbedFooter
    image?: APIEmbedImage
    provider?: APIEmbedProvider
    thumbnail?: APIEmbedThumbnail
    timestamp?: APIISO8601Timestamp
    title?: string
    type?: APIEmbedType
    url?: string
    video?: APIEmbedVideo
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-author-structure */
export interface APIEmbedAuthor {
    icon_url?: string
    name: string
    proxy_icon_url?: string
    url?: string
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-field-structure */
export interface APIEmbedField {
    inline?: boolean
    name: string
    value: string
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-footer-structure */
export interface APIEmbedFooter {
    icon_url?: string
    proxy_icon_url?: string
    text: string
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-image-structure */
export interface APIEmbedImage {
    height?: number
    proxy_url?: string
    url: string
    width?: number
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-provider-structure */
export interface APIEmbedProvider {
    name?: string
    url?: string
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-thumbnail-structure */
export interface APIEmbedThumbnail {
    height?: number
    proxy_url?: string
    url: string
    width?: number
}

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-types */
export type APIEmbedType = (typeof APIEmbedTypes)[number]

/** @see https://docs.discord.com/developers/resources/message#embed-object-embed-video-structure */
export interface APIEmbedVideo {
    height?: number
    proxy_url?: string
    url?: string
    width?: number
}

/** @see https://docs.discord.com/developers/resources/emoji#emoji-object */
export interface APIEmoji {
    animated?: boolean
    available?: boolean
    id: APISnowflake | null
    managed?: boolean
    name: string | null
    require_colons?: boolean
    roles?: APIRole[]
    user?: APIUser
}

/** @see https://docs.discord.com/developers/resources/channel#default-reaction-object */
export interface APIForumDefaultReaction {
    emoji_id: APISnowflake | null
    emoji_name: string | null
}

/** @see https://docs.discord.com/developers/resources/channel#forum-tag-object */
export interface ForumTag {
    emoji_id: APISnowflake | null
    emoji_name: string | null
    id: APISnowflake
    moderated: boolean
    name: string
}

/** @see https://docs.discord.com/developers/resources/guild#guild-object */
export interface APIGuild {
    afk_channel_id: APISnowflake | null
    afk_timeout: number
    application_id: APISnowflake | null
    approximate_member_count?: number
    approximate_presence_count?: number
    banner: string | null
    default_message_notifications: APIGuildDefaultMessageNotificationLevel
    description: string | null
    discovery_splash: string | null
    emojis: APIEmoji[]
    explicit_content_filter: APIGuildExplicitContentFilterLevel
    features: APIGuildFeature[]
    icon: string | null
    icon_hash?: string | null
    id: APISnowflake
    incidents_data: APIGuildIncidentsData | null
    max_members?: number
    max_presences?: number | null
    max_stage_video_channel_users?: number
    max_video_channel_users?: number
    mfa_level: APIGuildMFALevel
    name: string
    nsfw_level: number
    owner?: boolean
    owner_id: APISnowflake
    permissions?: string
    preferred_locale: string
    premium_progress_bar_enabled: boolean
    premium_subscription_count?: number
    premium_tier: APIGuildPremiumTier
    public_updates_channel_id: APISnowflake | null
    region?: string | null
    roles: APIRole[]
    rules_channel_id: APISnowflake | null
    safety_alerts_channel_id: APISnowflake | null
    splash: string | null
    stickers?: APISticker[]
    system_channel_flags: number
    system_channel_id: APISnowflake | null
    vanity_url_code: string | null
    verification_level: APIGuildVerificationLevel
    welcome_screen?: APIGuildWelcomeScreen
    widget_channel_id?: APISnowflake | null
    widget_enabled?: boolean
}

/** @see https://docs.discord.com/developers/resources/guild#guild-object-guild-nsfw-level */
export type APIGuildAgeRestrictionLevel = ConstValues<typeof APIGuildAgeRestrictionLevels>

/** @see https://docs.discord.com/developers/resources/guild#guild-object-default-message-notification-level */
export type APIGuildDefaultMessageNotificationLevel = ConstValues<
    typeof APIGuildDefaultMessageNotificationLevels
>

/** @see https://docs.discord.com/developers/resources/guild#guild-object-explicit-content-filter-level */
export type APIGuildExplicitContentFilterLevel = ConstValues<
    typeof APIGuildExplicitContentFilterLevels
>

/** @see https://docs.discord.com/developers/resources/guild#guild-object-guild-features */
export type APIGuildFeature = (typeof APIGuildFeatures)[number]

/** @see https://docs.discord.com/developers/resources/guild#incidents-data-object */
export interface APIGuildIncidentsData {
    dm_spam_detected_at?: APIISO8601Timestamp | null
    dms_disabled_until: APIISO8601Timestamp | null
    invites_disabled_until: APIISO8601Timestamp | null
    raid_detected_at?: APIISO8601Timestamp | null
}

/** @see https://docs.discord.com/developers/resources/guild#guild-member-object */
export interface APIGuildMember {
    avatar?: string | null
    avatar_decoration_data?: APIAvatarDecorationData | null
    banner?: string | null
    communication_disabled_until?: APIISO8601Timestamp | null
    deaf: boolean
    flags: number
    joined_at: APIISO8601Timestamp | null
    mute: boolean
    nick?: string | null
    pending?: boolean
    permissions?: string
    premium_since?: APIISO8601Timestamp | null
    roles: APISnowflake[]
    user?: APIUser
}

/** @see https://docs.discord.com/developers/resources/guild#guild-object-mfa-level */
export type APIGuildMFALevel = ConstValues<typeof APIGuildMFALevels>

/** @see https://docs.discord.com/developers/resources/guild#guild-object-premium-tier */
export type APIGuildPremiumTier = ConstValues<typeof APIGuildPremiumTiers>

/** @see https://docs.discord.com/developers/resources/guild#guild-object-system-channel-flags */
export type APIGuildSystemChannelFlag = ConstValues<typeof APIGuildSystemChannelFlags>

/** @see https://docs.discord.com/developers/resources/guild#guild-object-verification-level */
export type APIGuildVerificationLevel = ConstValues<typeof APIGuildVerificationLevels>

/** @see https://docs.discord.com/developers/resources/voice#voice-region-object */
export interface APIGuildVoiceRegion {
    custom: boolean
    deprecated: boolean
    id: string
    name: string
    optimal: boolean
}

/** @see https://docs.discord.com/developers/resources/guild#welcome-screen-object */
export interface APIGuildWelcomeScreen {
    description: string | null
    welcome_channels: APIGuildWelcomeScreenChannel[]
}

/** @see https://docs.discord.com/developers/resources/guild#welcome-screen-object-welcome-screen-channel-structure */
export interface APIGuildWelcomeScreenChannel {
    channel_id: APISnowflake
    description: string
    emoji_id: APISnowflake
    emoji_name: string
}

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-interaction-type */
export type APIInteractionType = ConstValues<typeof APIInteractionTypes>

/** @see https://docs.discord.com/developers/reference#iso8601-date%2Ftime */
export type APIISO8601Timestamp = string

/** @see https://docs.discord.com/developers/resources/message#message-object */
export interface APIMessage {
    activity?: APIMessageActivityType
    application?: Partial<APIApplication>
    attachments: APIAttachment[]
    author: APIUser
    call?: APIMessageCall
    channel_id: APISnowflake
    components?: APIMessageComponent[]
    content: string
    edited_timestamp: APIISO8601Timestamp | null
    embeds: APIEmbed[]
    flags?: number
    id: APISnowflake
    interaction?: APIMessageInteraction
    interaction_metadata?: APIMessageInteractionMetadata
    mention_channels: APIChannelMention[]
    mention_everyone: boolean
    mention_roles: APIRole[]
    mentions: APIUser[]
    message_reference?: APIMessageReference
    message_snapshots?: APIMessageSnapshot[]
    nonce?: string | number
    pinned: boolean
    poll?: APIPoll
    position?: number
    reactions?: APIReaction[]
    referenced_message?: APIMessage | null
    resolved?: APIResolved
    role_subscription_data?: APIRoleSubscriptionData
    sticker_items?: APIMessageStickerItem[]
    stickers?: APISticker[]
    thread?: APIChannel
    timestamp: APIISO8601Timestamp
    tts: boolean
    type: APIMessageType
    webhook_id?: APISnowflake
}

/** @see https://docs.discord.com/developers/resources/message#message-object-message-activity-structure */
export type APIMessageActivityType = ConstValues<typeof APIMessageActivityTypes>

/** @see https://docs.discord.com/developers/resources/message#message-call-object */
export interface APIMessageCall {
    participants: APISnowflake[]
    ended_timestamp?: APIISO8601Timestamp | null
}

/** @see https://docs.discord.com/developers/components/reference#anatomy-of-a-component */
export interface APIMessageComponent {
    id?: number
    type: APIMessageComponentType
}

/** @see https://docs.discord.com/developers/components/reference#component-object-component-types */
export type APIMessageComponentType = ConstValues<typeof APIMessageComponentTypes>

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#message-interaction-object-message-interaction-structure */
export interface APIMessageInteraction {
    id: APISnowflake
    member?: Partial<APIGuildMember>
    name: string
    type: APIInteractionType
    user: APIUser
}

/** @see https://docs.discord.com/developers/resources/message#message-interaction-metadata-object */
export interface APIMessageInteractionMetadata {
    authorizing_integration_owners: APIMessageInteractionMetadataAuthorizingIntegrationOwners
    id: APISnowflake
    original_response_message_id?: APISnowflake
    target_message_id?: APISnowflake
    target_user?: APIUser
    type: APIInteractionType
    user: APIUser
}

export type APIMessageInteractionMetadataAuthorizingIntegrationOwners = Partial<
    Record<APIApplicationIntegrationType, APISnowflake>
>

/** @see https://docs.discord.com/developers/resources/message#message-reference-structure */
export interface APIMessageReference {
    channel_id?: APISnowflake
    fail_if_not_exists?: boolean
    guild_id?: APISnowflake
    message_id?: APISnowflake
    type?: APIMessageReferenceType
}

/** @see https://docs.discord.com/developers/resources/message#message-reference-types */
export type APIMessageReferenceType = ConstValues<typeof APIMessageReferenceTypes>

/** @see https://docs.discord.com/developers/resources/message#message-snapshot-object */
export interface APIMessageSnapshot {
    message: Partial<APIMessage>
}

/** @see https://docs.discord.com/developers/resources/sticker#sticker-item-object */
export interface APIMessageStickerItem {
    format_type: APIStickerFormatType
    id: APISnowflake
    name: string
}

/** @see https://docs.discord.com/developers/resources/message#message-object-message-types */
export type APIMessageType = ConstValues<typeof APIMessageTypes>

/** @see https://docs.discord.com/developers/resources/user#nameplate-nameplate-structure */
export interface APINameplate {
    asset: string
    label: string
    palette: APINameplatePalette
    sku_id: APISnowflake
}

export type APINameplatePalette =
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
export interface APIPoll {
    allow_multiselect: boolean
    answers: APIPollAnswer[]
    expiry: APIISO8601Timestamp | null
    layout_type: APIPollLayoutType
    question: APIPollMedia
    results?: APIPollResults
}

/** @see https://docs.discord.com/developers/resources/poll#poll-answer-object-poll-answer-object-structure */
export interface APIPollAnswer {
    answer_id: number
    poll_media: APIPollMedia
}

/** @see https://docs.discord.com/developers/resources/poll#poll-answer-object-poll-answer-object-structure */
export interface APIPollAnswerCount {
    count: boolean
    id: number
    me_voted: boolean
}

/** @see https://docs.discord.com/developers/resources/poll#layout-type */
export type APIPollLayoutType = ConstValues<typeof APIPollLayoutTypes>

/** @see https://docs.discord.com/developers/resources/poll#poll-media-object-poll-media-object-structure */
export interface APIPollMedia {
    emoji?: Partial<APIEmoji>
}

/** @see https://docs.discord.com/developers/resources/poll#poll-answer-object-poll-answer-object-structure */
export interface APIPollResults {
    answer_counts: APIPollAnswerCount[]
    is_finalized: boolean
}

/** @see https://docs.discord.com/developers/resources/message#reaction-object */
export interface APIReaction {
    burst_colors: string[]
    count: number
    count_details: APIReactionCountDetails
    emoji: Partial<APIEmoji>
    me: boolean
    me_burst: boolean
}

/** @see https://docs.discord.com/developers/resources/message#reaction-count-details-object */
export interface APIReactionCountDetails {
    burst: number
    normal: number
}

/** @see https://docs.discord.com/developers/interactions/receiving-and-responding#interaction-object-resolved-data-structure */
export interface APIResolved {
    attachments?: Record<APISnowflake, APIAttachment>
    channels?: Record<APISnowflake, Partial<APIChannel>>
    members?: Record<APISnowflake, Partial<APIGuildMember>>
    messages?: Record<APISnowflake, Partial<APIMessage>>
    roles?: Record<APISnowflake, APIRole>
    users?: Record<APISnowflake, APIUser>
}

/** @see https://docs.discord.com/developers/topics/permissions#role-object */
export interface APIRole {
    /** @deprecated */ color: number
    colors: APIRoleColors
    flags: number
    hoist: boolean
    icon?: string | null
    id: APISnowflake
    managed: boolean
    mentionable: boolean
    name: string
    permissions: string
    position: number
    tags?: APIRoleTags
    unicode_emoji?: string | null
}

/** @see https://docs.discord.com/developers/topics/permissions#role-object-role-colors-object */
export interface APIRoleColors {
    primary_color: number
    secondary_color: number | null
    tertiary_color: number | null
}

/** @see https://docs.discord.com/developers/resources/message#role-subscription-data-object */
export interface APIRoleSubscriptionData {
    is_renewal: boolean
    role_subscription_listing_id: APISnowflake
    tier_name: string
    total_months_subscribed: number
}

/** @see https://docs.discord.com/developers/topics/permissions#role-object-role-tags-structure */
export interface APIRoleTags {
    available_for_purchase?: null
    bot_id?: APISnowflake
    guild_connections?: null
    integration_id?: APISnowflake
    premium_subscriber?: null
    subscription_listing_id?: APISnowflake
}

/** @see https://docs.discord.com/developers/reference#snowflakes */
export type APISnowflake = string

/** @see https://docs.discord.com/developers/resources/sticker#sticker-object */
export interface APISticker {
    available?: boolean
    description: string | null
    format_type: APIStickerFormatType
    guild_id?: APISnowflake
    id: APISnowflake
    name: string
    pack_id?: APISnowflake
    sort_value?: number
    tags: string
    type: APIStickerType
    user?: APIUser
}

/** @see https://docs.discord.com/developers/resources/sticker#sticker-object-sticker-format-types */
export type APIStickerFormatType = ConstValues<typeof APIStickerFormatTypes>

/** @see https://docs.discord.com/developers/resources/sticker#sticker-object-sticker-types */
export type APIStickerType = ConstValues<typeof APIStickerTypes>

/** @see https://docs.discord.com/developers/topics/teams#data-models-team-object */
export interface APITeam {
    icon: string | null
    id: APISnowflake
    members: APITeamMember[]
    name: string
    owner_user_id: APISnowflake
}

/** @see https://docs.discord.com/developers/topics/teams#data-models-team-member-object */
export interface APITeamMember {
    membership_state: APITeamMemberMembershipState
    team_id: APISnowflake
    user: Partial<APIUser>
    role: string
}

/** @see https://docs.discord.com/developers/topics/teams#data-models-membership-state-enum */
export type APITeamMemberMembershipState = ConstValues<
    typeof APITeamMemberMembershipStates
>

/** @see https://docs.discord.com/developers/topics/teams#team-member-roles-team-member-role-types */
export type APITeamMemberRoleType = ConstValues<typeof APITeamMemberRoleTypes>

/** @see https://docs.discord.com/developers/resources/channel#thread-member-object */
export interface APIThreadMember {
    flags: number
    id?: APISnowflake
    join_timestamp: APIISO8601Timestamp
    member?: APIGuildMember
    user_id?: APISnowflake
}

/** @see https://docs.discord.com/developers/resources/channel#thread-metadata-object */
export interface APIThreadMetadata {
    archive_timestamp: APIISO8601Timestamp
    archived: boolean
    auto_archive_duration: APIChannelAutoArchiveDuration
    create_timestamp?: APIISO8601Timestamp | null
    invitable?: boolean
    locked: boolean
}

/** @see https://docs.discord.com/developers/resources/user#user-object */
export interface APIUser {
    accent_color?: number
    avatar: string | null
    avatar_decoration_data?: APIAvatarDecorationData | null
    banner?: string | null
    bot?: boolean
    collectibles?: APICollectibles | null
    discriminator: string
    email?: string | null
    flags?: number
    global_name: string | null
    id: APISnowflake
    locale?: string
    mfa_enabled?: boolean
    premium_type?: number
    primary_guild?: APIUserPrimaryGuild | null
    public_flags?: number
    system?: boolean
    username: string
    verified?: boolean
}

/** @see https://docs.discord.com/developers/resources/user#user-object-user-primary-guild */
export interface APIUserPrimaryGuild {
    badge: string | null
    identity_enabled: boolean | null
    identity_guild_id: APISnowflake | null
    tag: string | null
}

/** @see https://docs.discord.com/developers/events/webhook-events#event-types */
export type APIWebhookEventType =
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
