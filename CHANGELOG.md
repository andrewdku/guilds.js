# Changelog

This file includes the library's history and changes.

## [guilds.js@0.0.4](https://github.com/andrewdku/guilds.js/releases/tag/guilds.js%400.0.4) — 24 Feb 2026

- Added (partial) Discord API typings
- Added a `GatewayIntents` object
- Added a separate `GatewayOpcode` type
- Added basic `User` class
- Added color conversion utility
- Added JSDoc comments
- Better client intents parsing via `parseIntents()`
- Improved client WebSocket management
- Moved `types.ts` to `typings/index.ts`
- Renamed `DiscordAPI` to `RESTManager`
- Renamed `Routes` to `Endpoints`
- Separated `gateway` and `gatewayBot` endpoints
- Turned `Endpoints` into an object rather than a static class

## [guilds.js@0.0.3](https://github.com/andrewdku/guilds.js/releases/tag/guilds.js%400.0.3) — 23 Feb 2026

- Initial release (connects client to Discord)
