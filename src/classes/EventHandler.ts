export class EventHandler<Events extends Record<string, any[]>> {
    #listeners: {
        [K in keyof Events]?: Array<(...args: Events[K]) => any>;
    } = {};

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
