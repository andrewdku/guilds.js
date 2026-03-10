import type { ClientProps } from "@/types"
import { Gateway } from "@/classes/gateway"
import { RESTManager } from "@/classes/rest-manager"

export class Client {
    public gateway: Gateway
    public rest: RESTManager

    public constructor(props: ClientProps) {
        if (!props || !props.gateway || !props.rest) {
            throw new TypeError()
        }

        this.gateway = props.gateway
        this.rest = props.rest
    }
}
