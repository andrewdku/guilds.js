import type { HTTPRequestMethod } from "@/typings";
import { GuildsError } from "@/classes";

/**
 * Class representing a Discord API manager
 */
export class RESTManager {
    #token: string;

    /**
     * Instantiate a new Discord API manager
     * @param token Client token
     */
    public constructor(token: string) {
        this.#token = token;
    }

    /**
     * Internal request method
     * @param method HTTP request method
     * @param endpoint Endpoint URI
     * @param init Request data
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
     * Create a HTTP DELETE request
     * @param endpoint Endpoint URI
     * @param init Request data
     */
    public delete<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("DELETE", endpoint, init);
    }

    /**
     * Create a HTTP GET request
     * @param endpoint Endpoint URI
     * @param init Request data
     */
    public get<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("GET", endpoint, init);
    }

    /**
     * Create a HTTP PATCH request
     * @param endpoint Endpoint URI
     * @param init Request data
     */
    public patch<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("PATCH", endpoint, init);
    }

    /**
     * Create a HTTP POST request
     * @param endpoint Endpoint URI
     * @param init Request data
     */
    public post<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("POST", endpoint, init);
    }

    /**
     * Create a HTTP PUT request
     * @param endpoint Endpoint URI
     * @param init Request data
     */
    public put<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("PUT", endpoint, init);
    }
}
