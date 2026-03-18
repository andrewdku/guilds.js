import type { GatewayEventMap, GatewayProps } from "@/types"
import { EventHandler } from "@/classes/event-handler"
import { RESTManager } from "@/classes/rest-manager"
import { parseToken } from "@/functions/parse-token"
import { Endpoints } from "@/api"

/** Connects to Discord's gateway */
export class Gateway {
    #token: string

    /** Event handler for gateway dispatch events */
    public events = new EventHandler<GatewayEventMap>()

    /** Intents bitfield */
    public intents: number

    /** Used for REST API calls */
    public rest: RESTManager

    /** WebSocket instance */
    public ws?: WebSocket

    /** Bot token used for authorization */
    public get token() {
        return this.#token
    }

    /**
     * Instantiate a new Gateway
     * @param props Gateway props
     * @returns Gateway instance
     */
    public constructor(props: GatewayProps) {
        if (!props || typeof props !== "object") {
            throw new TypeError("Invalid props provided")
        }

        if (!props.intents || typeof props.intents !== "number") {
            throw new TypeError("Invalid intents provided")
        }

        if (!props.rest || !(props.rest instanceof RESTManager)) {
            throw new TypeError("Invalid rest provided")
        }

        if (!props.token || typeof props.token !== "string") {
            throw new TypeError("Invalid token provided")
        }

        this.#token = parseToken(props.token)
        this.intents = props.intents
        this.rest = props.rest

        return this
    }

    /**
     * Connect to Discord's gateway
     * @returns Gateway instance
     */
    public async connect() {
        const res = await this.rest.get<{ url: string }>(Endpoints.gatewayBot())

        this.ws = new WebSocket(`${res.data.url}/?v=10&encoding=json`)
        this.ws.onopen = () => {
            this.#identify()
        }

        this.ws.onmessage = (message) => {
            const payload = JSON.parse(message.data.toString())

            this.events.emit("WS_MESSAGE", {
                data: payload,
                gateway: this,
                rest: this.rest,
            })

            if (payload.t) {
                this.events.emit(payload.t, {
                    data: payload.d,
                    gateway: this,
                    rest: this.rest,
                })
            }
        }

        this.ws.onerror = (error) => {
            this.events.emit("WS_ERROR", {
                data: `${error}`,
                gateway: this,
                rest: this.rest,
            })

            throw new Error(`DiscordGatewayError: ${error}`)
        }

        this.ws.onclose = (event) => {
            this.events.emit("WS_DEBUG", {
                data: `Gateway closed: ${event.code} - ${event.reason}`,
                gateway: this,
                rest: this.rest,
            })
        }

        return this
    }

    #identify() {
        this.ws?.send(
            JSON.stringify({
                op: 2,
                d: {
                    token: this.#token,
                    intents: this.intents,
                    properties: {
                        $browser: "guilds.js",
                        $device: "guilds.js",
                        $os: "guilds.js",
                    },
                },
            })
        )
    }
}
