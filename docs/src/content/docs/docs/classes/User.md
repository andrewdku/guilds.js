---
editUrl: false
next: false
prev: false
title: "User"
---

Defined in: packages/guilds.js/src/classes/User.ts:9

Class representing a Discord user

## See

https://docs.discord.com/developers/resources/user

## Constructors

### Constructor

> **new User**(`client`, `data`): `User`

Defined in: packages/guilds.js/src/classes/User.ts:51

#### Parameters

##### client

[`Client`](/docs/classes/client/)

##### data

[`User`](/docs/guildsjs/namespaces/discordapi/interfaces/user/)

#### Returns

`User`

## Properties

### accentColor?

> `optional` **accentColor**: `number`

Defined in: packages/guilds.js/src/classes/User.ts:13

The user's banner color as a color integer

***

### accentColorHex

> **accentColorHex**: `string` \| `null`

Defined in: packages/guilds.js/src/classes/User.ts:16

The user's banner color as a hex color

***

### bio

> **bio**: `string` \| `null`

Defined in: packages/guilds.js/src/classes/User.ts:19

The user's about me (client only)

***

### bot

> **bot**: `boolean` = `false`

Defined in: packages/guilds.js/src/classes/User.ts:22

Whether the user is an application (bot)

***

### discriminator

> **discriminator**: `string` = `"0"`

Defined in: packages/guilds.js/src/classes/User.ts:25

The user's discriminator, or "0" if they have none

***

### displayName?

> `optional` **displayName**: `string`

Defined in: packages/guilds.js/src/classes/User.ts:28

The user's display name or bot's application name

***

### email?

> `optional` **email**: `string`

Defined in: packages/guilds.js/src/classes/User.ts:31

The user's email (user clients only)

***

### id

> **id**: `string`

Defined in: packages/guilds.js/src/classes/User.ts:34

The user's ID snowflake

***

### mfaEnabled?

> `optional` **mfaEnabled**: `boolean`

Defined in: packages/guilds.js/src/classes/User.ts:37

Whether the user has two factor authentication enabled (user clients only)

***

### rawData

> **rawData**: [`User`](/docs/guildsjs/namespaces/discordapi/interfaces/user/)

Defined in: packages/guilds.js/src/classes/User.ts:40

The data from Discord's API provided as-is

***

### system

> **system**: `boolean` = `false`

Defined in: packages/guilds.js/src/classes/User.ts:43

Whether the user is a Discord system account

***

### username

> **username**: `string`

Defined in: packages/guilds.js/src/classes/User.ts:46

The user's username (not to be confused with display name or tag)

***

### verified?

> `optional` **verified**: `boolean`

Defined in: packages/guilds.js/src/classes/User.ts:49

Whether the user's email is verified (user clients only)

## Accessors

### client

#### Get Signature

> **get** **client**(): [`Client`](/docs/classes/client/)

Defined in: packages/guilds.js/src/classes/User.ts:75

The client associated with this user

##### Returns

[`Client`](/docs/classes/client/)

***

### tag

#### Get Signature

> **get** **tag**(): `string`

Defined in: packages/guilds.js/src/classes/User.ts:98

`username#0000` or just `username` (if no discriminator)

##### Returns

`string`

## Methods

### avatarURL()

> **avatarURL**(`props`): `string` \| `null`

Defined in: packages/guilds.js/src/classes/User.ts:80

Get the user's avatar as an image URL

#### Parameters

##### props

[`AvatarURLProps`](/docs/interfaces/avatarurlprops/)

#### Returns

`string` \| `null`

***

### toString()

> **toString**(): `string`

Defined in: packages/guilds.js/src/classes/User.ts:105

User mention as a string, e.g. <@123456789>

#### Returns

`string`
