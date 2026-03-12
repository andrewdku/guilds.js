import type { HTTPMethod, RESTManagerProps } from "@/types"
import { baseApiUrl } from "@/constants"
import { parseToken } from "@/functions/parse-token"

export class RESTManager {
    #token: string

    public get token() {
        return this.#token
    }

    public constructor(props: RESTManagerProps) {
        if (!props || typeof props !== "object") {
            throw new TypeError("Invalid props provided")
        }

        if (!props.token || typeof props.token !== "string") {
            throw new TypeError("Invalid token provided")
        }

        this.#token = parseToken(props.token)
        return this
    }

    public async request<T = unknown>(
        method: HTTPMethod,
        endpoint: string,
        options?: { body?: any }
    ) {
        const res = await fetch(baseApiUrl + endpoint, {
            method,
            body: options?.body ? JSON.stringify(options.body) : undefined,
            headers: {
                Authorization: this.#token,
                "Content-Type": "application/json",
            },
        })

        const json = (await res.json().catch(() => null)) as T
        return Object.assign(res, { data: json })
    }

    public delete<T = unknown>(endpoint: string) {
        return this.request<T>("DELETE", endpoint)
    }

    public get<T = unknown>(endpoint: string) {
        return this.request<T>("GET", endpoint)
    }

    public patch<T = unknown>(endpoint: string, options?: { body?: any }) {
        return this.request<T>("PATCH", endpoint, options)
    }

    public post<T = unknown>(endpoint: string, options?: { body?: any }) {
        return this.request<T>("POST", endpoint, options)
    }

    public put<T = unknown>(endpoint: string, options?: { body?: any }) {
        return this.request<T>("PUT", endpoint, options)
    }
}
