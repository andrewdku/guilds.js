import type { GatewayEventMap, GatewayProps } from "@/types"
import { GatewayOpcodes } from "@/constants"
import { EventHandler } from "@/classes/event-handler"
import { RESTManager } from "@/classes/rest-manager"
import { parseToken } from "@/functions/parse-token"
import { Endpoints } from "@/api"

/** Connects to Discord's gateway */
export class Gateway {
    #token: string

    /** Event handler for gateway dispatch events */
    public events = new EventHandler<GatewayEventMap>()

    /** Heartbeat interval handle */
    public heartbeatInterval?: NodeJS.Timeout

    /** Intents bitfield */
    public intents: number

    /** Last heartbeat ACK status */
    public lastHeartbeatAck: boolean = true

    /** Used for REST API calls */
    public rest: RESTManager

    /** Last sequence number from gateway */
    public sequenceNumber: number | null = null

    /** Session ID for resuming connections */
    public sessionId?: string

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

        if (!res.ok || !res.data.url) {
            throw new Error("Failed to fetch gateway URL")
        }

        this.ws = new WebSocket(`${res.data.url}/?v=10&encoding=json`)
        this.ws.onopen = () => {
            this.events.emit("WS_DEBUG", {
                data: "Gateway connected",
                gateway: this,
                rest: this.rest,
            })
        }

        this.ws.onmessage = (message) => {
            const payload = JSON.parse(message.data.toString())

            if (payload.s !== undefined && payload.s !== null) {
                this.sequenceNumber = payload.s
            }

            switch (payload.op) {
                case GatewayOpcodes.Hello: {
                    if (this.heartbeatInterval) {
                        clearInterval(this.heartbeatInterval)
                    }

                    this.lastHeartbeatAck = true
                    this.heartbeatInterval = setInterval(() => {
                        if (!this.lastHeartbeatAck) {
                            this.ws?.close(4000, "Heartbeat ACK failed")
                            return
                        }

                        this.lastHeartbeatAck = false
                        this.ws?.send(
                            JSON.stringify({
                                op: GatewayOpcodes.Heartbeat,
                                d: this.sequenceNumber,
                            })
                        )
                    }, payload.d.heartbeat_interval)

                    if (this.sessionId) {
                        this.ws?.send(
                            JSON.stringify({
                                op: GatewayOpcodes.Resume,
                                d: {
                                    token: this.#token,
                                    session_id: this.sessionId,
                                    seq: this.sequenceNumber,
                                },
                            })
                        )
                    } else {
                        this.ws?.send(
                            JSON.stringify({
                                op: GatewayOpcodes.Identify,
                                d: {
                                    token: this.#token,
                                    intents: this.intents,
                                    properties: {
                                        browser: "guilds.js",
                                        device: "guilds.js",
                                        os: "guilds.js",
                                    },
                                },
                            })
                        )
                    }
                    break
                }

                case GatewayOpcodes.HeartbeatACK: {
                    this.lastHeartbeatAck = true
                    break
                }

                case GatewayOpcodes.Dispatch: {
                    if (payload.t === "READY") {
                        this.sessionId = payload.d.session_id
                    }

                    this.events.emit(payload.t, {
                        data: payload.d,
                        gateway: this,
                        rest: this.rest,
                    })

                    break
                }
            }

            this.events.emit("WS_MESSAGE", {
                data: payload,
                gateway: this,
                rest: this.rest,
            })
        }

        this.ws.onerror = (error) => {
            this.events.emit("WS_ERROR", {
                data: `${error}`,
                gateway: this,
                rest: this.rest,
            })
        }

        this.ws.onclose = (event) => {
            this.events.emit("WS_DEBUG", {
                data: `Gateway closed: ${event.code} - ${event.reason}`,
                gateway: this,
                rest: this.rest,
            })

            setTimeout(this.connect, 3000)
        }

        return this
    }

    /** Disconnects from the gateway and clears heartbeat */
    public disconnect() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval)
        }

        this.ws?.close(1000, "Client disconnected")
        this.ws = undefined

        return this
    }
}
