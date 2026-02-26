/** Class representing a type-safe EventEmitter */
export class EventHandler<Events extends Record<string, any[]>> {
    #listeners: {
        [K in keyof Events]?: Array<(...args: Events[K]) => any>;
    } = {};

    /**
     * Add a new event listener
     * @param event Event name
     * @param listener Listener callback
     */
    public on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => any) {
        if (!this.#listeners[event]) {
            this.#listeners[event] = [];
        }

        this.#listeners[event]!.push(listener);
        return this;
    }

    /**
     * Add a new event listener which only runs once
     * @param event Event name
     * @param listener Listener callback
     */
    public once<K extends keyof Events>(event: K, listener: (...args: Events[K]) => any) {
        const wrapped = (...args: Events[K]) => {
            listener(...args);
            this.off(event, wrapped);
        };

        this.on(event, wrapped);
        return this;
    }

    /**
     * Remove an event name
     * @param event Event name
     * @param listener Listener callback
     */
    public off<K extends keyof Events>(event: K, listener: (...args: Events[K]) => any) {
        if (!this.#listeners[event]) {
            return this;
        }

        this.#listeners[event] = this.#listeners[event]!.filter((l) => l !== listener);
        return this;
    }

    /**
     * Emit an event
     * @param event Event name
     * @param args Event arguments
     * @internal
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
