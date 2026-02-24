<div align="center">
  <img
    alt="guilds.js Logo"
    width="85"
    src="https://cdn.discordapp.com/attachments/1025091872198250597/1475938039095103669/guilds.js.png?ex=699f4dea&is=699dfc6a&hm=a52d790f5cfa4820e4171126ed454f47ad32f94f5182d781ae08304bb2cdb77e&"
  />
</div>

<div align="center">
  <a href="https://github.com/andrewdku/guilds.js">GitHub</a> | 
  <a href="https://npmjs.com/package/guilds.js">npm</a>
</div>
<h1 align="center">guilds.js</h1>

> Interact with Discord's API with ease

## Installation

```bash
npm install guilds.js
# or
yarn add guilds.js
# or
pnpm add guilds.js
# or
bun add guilds.js
```

## Example

```js
import { Client, GatewayIntents } from "guilds.js";

const client = new Client({
    // https://discord.com/developers/applications
    token: "TOKEN",

    // client intents
    intents: [
        GatewayIntents.Guilds,
        GatewayIntents.GuildMembers,
        GatewayIntents.GuildMessages,
    ],
});

client.once("ready", () => {
    console.log("Client is ready!");
});

// start connection to Discord gateway
client.connect();
```

# Contributing

[pnpm](https://pnpm.io) is used throughout this project for packages and scripts. Pull requests are always welcome. For major changes, please open an issue to discuss what you wish to change.

# License

Licensed under the [Apache License 2.0](LICENSE).
