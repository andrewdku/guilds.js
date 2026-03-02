/** Class representing an in-memory cache manager */
export class CacheManager<T> {
    /**
     * Map containing cached items
     * @internal
     * @private
     */
    #cache = new Map<string, T>();

    /** Time to live in milliseconds for cached items */
    public ttl?: number;

    /** Timestamps for TTL tracking */
    public timestamps = new Map<string, number>();

    /**
     * Set the time to live for cache entries
     * @param ttl Time to live in milliseconds
     */
    public setTTL(ttl: number): void {
        this.ttl = ttl;
    }

    /**
     * Retrieve a value from the cache
     * @param key Key of value to retreive
     * @returns Cached value or undefined
     */
    public get(key: string): T | undefined {
        if (this.ttl) {
            const timestamp = this.timestamps.get(key);

            if (timestamp && Date.now() - timestamp > this.ttl) {
                this.delete(key);
                return undefined;
            }
        }

        return this.#cache.get(key);
    }

    /**
     * Store a value in the cache
     * @param key Key to store value as
     * @param value Value to store
     * @returns CacheManager instance
     */
    public set(key: string, value: T): CacheManager<T> {
        this.#cache.set(key, value);

        if (this.ttl) {
            this.timestamps.set(key, Date.now());
        }

        return this;
    }

    /**
     * Check if a key exists in the cache
     * @param key Key to check whether it exists
     * @returns Boolean representing whether the key exists and hasn't expired
     */
    public has(key: string): boolean {
        if (this.ttl) {
            const timestamp = this.timestamps.get(key);

            if (timestamp && Date.now() - timestamp > this.ttl) {
                this.delete(key);
                return false;
            }
        }

        return this.#cache.has(key);
    }

    /**
     * Delete a value from the cache
     * @param key Key to delete
     * @returns True if key was deleted, false if it didn't exist
     */
    public delete(key: string): boolean {
        this.timestamps.delete(key);
        return this.#cache.delete(key);
    }

    /** Clear all entries from the cache */
    public clear(): void {
        this.#cache.clear();
        this.timestamps.clear();
    }

    /** Number of entries in the cache */
    public get size(): number {
        return this.#cache.size;
    }

    public values(): IterableIterator<T> {
        return this.#cache.values();
    }

    public [Symbol.iterator](): IterableIterator<[string, T]> {
        return this.#cache[Symbol.iterator]();
    }
}
