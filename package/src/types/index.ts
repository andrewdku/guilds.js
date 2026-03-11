import type { Gateway } from "@/classes/gateway"
import type { RESTManager } from "@/classes/rest-manager"
import type { APIUser } from "@/discord-api"

export interface ClientProps {
    gateway: Gateway
    rest: RESTManager
}

/** Shorthand type for `(typeof T)[keyof typeof T]` */
export type ConstValues<T> = T[keyof T]

export type GatewayEventMap = {
    [K in keyof GatewayEvents]: [
        event: {
            data: GatewayEvents[K]
            gateway: Gateway
            rest: RESTManager
        },
    ]
}

export interface GatewayEvents {
    READY: {
        user: APIUser
        session_id: string
    }
}

export interface GatewayProps {
    intents: number
    rest: RESTManager
    token: string
}

export type HTTPMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT"

export interface RESTManagerProps {
    token: string
}
