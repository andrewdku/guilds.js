import type { HTTPRequestMethod } from "@/types";
import { GuildsError } from "@/classes/GuildsError";

export class RESTManager {
    #token: string;

    public constructor(token: string) {
        this.#token = token;
    }

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

    public delete<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("DELETE", endpoint, init);
    }

    public get<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("GET", endpoint, init);
    }

    public patch<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("PATCH", endpoint, init);
    }

    public post<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("POST", endpoint, init);
    }

    public put<T = any>(endpoint: string, init?: RequestInit) {
        return this.#request<T>("PUT", endpoint, init);
    }
}
