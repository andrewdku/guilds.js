<div align="center">
  <img
    alt="guilds.js Logo"
    width="85"
    src="https://cdn.discordapp.com/attachments/1025091872198250597/1476568628877856801/logo-round.png?ex=69a19932&is=69a047b2&hm=c72b4ec17e200d4103f24e6b3fecf02de5cd4e379e4ded951035b54494d2beb5&"
  />
</div>

<div align="center">
  <a href="https://guilds.js.org/">Docs</a> | 
  <a href="https://github.com/andrewdku/guilds.js/">GitHub</a> | 
  <a href="https://npmjs.com/package/guilds.js/">npm</a>
</div>
<h1 align="center">guilds.js</h1>

guilds.js is a Node.js library for using the [Discord API](https://discord.com/developers/docs/intro).

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

### Development build

This build is created every 24 hours based on the `main` branch. If you're planning to use the development build, please note that things aren't final and can change at any moment.

```bash
npm install guilds.js@dev
# or
yarn add guilds.js@dev
# or
pnpm add guilds.js@dev
# or
bun add guilds.js@dev
```

## Example

You can find more examples and guides [here](https://guilds.js.org/guide/getting-started/).

```js
import { Client, GatewayIntents } from "guilds.js";

// Configure your bot here:
// https://discord.com/developers/applications

const client = new Client({
    token: process.env.DISCORD_TOKEN,
    intents: [
        GatewayIntents.Guilds,
        GatewayIntents.GuildMembers,
        GatewayIntents.GuildMessages,
    ],
});

client.once("ready", (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
});

client.connect();
```

## License

Licensed under the [Apache License 2.0](LICENSE).
