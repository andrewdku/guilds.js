<div align="center">
  <img
    alt="guilds.js Logo"
    width="85"
    src="https://j7oyzrlowjq7eyu0.public.blob.vercel-storage.com/guildsjs-logo-round.png"
  />
</div>

<div align="center">
  <a href="https://guilds.js.org/">Docs</a> | 
  <a href="https://github.com/andrewdku/guilds.js/">GitHub</a> | 
  <a href="https://npmjs.com/package/guilds.js/">npm</a>
</div>
<h1 align="center">guilds.js</h1>

guilds.js is a Node.js library for using Discord's API and gateway.

## Installation

Install `guilds.js@dev` instead if you wish to use the development build created every 24 hours. This build is unstable and should only be used for testing.

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

You can find more examples and guides [here](https://guilds.js.org/guide/getting-started/).

```js
import { Client, Gateway, RESTManager } from "guilds.js"

const token = process.env.DISCORD_TOKEN
const rest = new RESTManager({ token })
const gateway = new Gateway({ rest, token, intents: 515 })
const client = new Client({ gateway, rest })

client.gateway.events.on("READY", ({ data, gateway, rest }) => {
    console.log(`Connected to Discord as ${data.user.username}!`)
})

client.gateway.connect()
```

## License

See [LICENSE](LICENSE) for more information.
