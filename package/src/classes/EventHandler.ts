/** Class representing a type-safe EventEmitter */
export class EventHandler<Events extends Record<string, any[]>> {
    /**
     * Map of event names and listeners
     * @internal
     * @private
     */
    #listeners: {
        [K in keyof Events]?: Array<(...args: Events[K]) => any>;
    } = {};

    /**
     * Add a new listener for a specified event
     * @param event Event name
     * @param listener Listener callback
     */
    public on<K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => any
    ) {
        if (!this.#listeners[event]) {
            this.#listeners[event] = [];
        }

        this.#listeners[event]!.push(listener);
        return this;
    }

    /**
     * Add a new listener for a specified event that only runs one time
     * @param event Event name
     * @param listener Listener callback
     */
    public once<K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => any
    ) {
        const wrapped = (...args: Events[K]) => {
            listener(...args);
            this.off(event, wrapped);
        };

        this.on(event, wrapped);
        return this;
    }

    /**
     * Remove an event listener
     * @param event Event name
     * @param listener Listener callback
     */
    public off<K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => any
    ) {
        if (!this.#listeners[event]) {
            return this;
        }

        this.#listeners[event] = this.#listeners[event]!.filter(
            (l) => l !== listener
        );

        return this;
    }

    /**
     * Calls all registered listeners for an event
     * @param event Event name
     * @param args Event arguments
     */
    public async emit<K extends keyof Events>(event: K, ...args: Events[K]) {
        if (!this.#listeners[event]) {
            return false;
        }

        for (const listener of this.#listeners[event]!) {
            await listener(...args);
        }

        return true;
    }
}
