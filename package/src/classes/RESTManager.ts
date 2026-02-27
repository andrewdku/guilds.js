import type { HTTPRequestMethod } from "@/types";
import { GuildsError } from "@/classes/GuildsError";

/** Simple REST wrapper for interacting with Discord's v10 HTTP API */
export class RESTManager {
    /** Bot token, used for authorization header */
    #token: string;

    /**
     * Instantiate a new REST manager
     * @param token Bot token for authentication
     * @returns RESTManager object
     */
    public constructor(token: string) {
        this.#token = token;
        return this;
    }

    /**
     * Request handler for HTTP methods
     * @internal
     * @private
     */
    async #request<T = any>(
        method: HTTPRequestMethod,
        endpoint: string,
        init?: RequestInit
    ): Promise<Response & { data: T }> {
        const res = await fetch(endpoint, {
            method,
            headers: {
                Authorization: this.#token,
                "User-Agent": `DiscordBot (https://guilds.js.org)`,
                "Content-Type": "application/json",
                ...(init?.headers ?? {}),
            },
            ...init,
        });

        if (!res.ok) {
            const body = await res.text().catch(() => null);
            throw new GuildsError(
                `${body ?? res.statusText} (${res.status})`,
                "DiscordAPIError"
            );
        }

        const json = (await res.json().catch(() => null)) as T;
        return Object.assign(res, { data: json });
    }

    /**
     * Sends a DELETE request to the provided URI
     * @param endpoint Endpoint URI
     * @param init Request data
     */
    public delete<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("DELETE", endpoint, init);
    }

    /**
     * Sends a GET request to the provided URI
     * @param endpoint Endpoint URI
     * @param init Request data
     */
    public get<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("GET", endpoint, init);
    }

    /**
     * Sends a PATCH request to the provided URI
     * @param endpoint Endpoint URI
     * @param init Request data
     */
    public patch<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("PATCH", endpoint, init);
    }

    /**
     * Sends a POST request to the provided URI
     * @param endpoint Endpoint URI
     * @param init Request data
     */
    public post<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("POST", endpoint, init);
    }

    /**
     * Sends a PUT request to the provided URI
     * @param endpoint Endpoint URI
     * @param init Request data
     */
    public put<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("PUT", endpoint, init);
    }
}
