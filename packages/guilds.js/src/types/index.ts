import type { Gateway } from "@/classes/gateway"
import type { RESTManager } from "@/classes/rest-manager"
import type { GuildMember, Message, Snowflake, User } from "@/api"
import type { GatewayIntents, PermissionFlags } from "@/constants"

export interface ClientProps {
    gateway: Gateway
    rest: RESTManager
}

export type GatewayEventMap = {
    [K in keyof GatewayEvents]: [
        event: {
            data: GatewayEvents[K]
            gateway: Gateway
            rest: RESTManager
        },
    ]
}

/** @see https://docs.discord.com/developers/events/gateway-events */
export interface GatewayEvents {
    MESSAGE_CREATE: Message & {
        guild_id?: Snowflake
        member?: Partial<GuildMember>
        mentions: (User & { member?: Partial<GuildMember> | null })[]
    }

    MESSAGE_DELETE: {
        channel_id: Snowflake
        guild_id?: Snowflake
        id: Snowflake
    }

    MESSAGE_UPDATE: Message & { tts: false }

    READY: {
        user: User
        session_id: string
    }

    WS_DEBUG: string
    WS_ERROR: string
}

export type GatewayIntent = (typeof GatewayIntents)[keyof typeof GatewayIntents]

export interface GatewayProps {
    intents: number
    rest: RESTManager
    token: string
}

export type HTTPMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT"
export type PermissionFlag = (typeof PermissionFlags)[keyof typeof PermissionFlags]

export interface RESTManagerProps {
    token: string
}
