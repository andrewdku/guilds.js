---
editUrl: false
next: false
prev: false
title: "Endpoints"
---

> `const` **Endpoints**: `object`

Defined in: packages/guilds.js/src/utils/endpoints.ts:4

Discord's API v10 endpoints

## Type Declaration

### gateway()

> **gateway**(): `"https://discord.com/api/v10/gateway"`

- GET `/gateway`

#### Returns

`"https://discord.com/api/v10/gateway"`

### gatewayBot()

> **gatewayBot**(): `"https://discord.com/api/v10/gateway/bot"`

- GET `/gateway/bot`
- POST `/gateway/bot`

#### Returns

`"https://discord.com/api/v10/gateway/bot"`

### user()

> **user**(`userId?`): `` `https://discord.com/api/v10/users/${string}` ``

- GET `/users/{userId}`

#### Parameters

##### userId?

`string` = `"@me"`

User ID (default: "@me")

#### Returns

`` `https://discord.com/api/v10/users/${string}` ``
