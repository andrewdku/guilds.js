---
editUrl: false
next: false
prev: false
title: "Client"
---

Defined in: packages/guilds.js/src/classes/Client.ts:11

Class representing a Discord client

## Extends

- [`EventHandler`](/docs/classes/eventhandler/)\<[`ClientEvents`](/docs/type-aliases/clientevents/)\>

## Constructors

### Constructor

> **new Client**(`props`): `Client`

Defined in: packages/guilds.js/src/classes/Client.ts:49

Instantiate a new Client

#### Parameters

##### props

[`ClientProps`](/docs/interfaces/clientprops/)

Client options

#### Returns

`Client`

#### Overrides

[`EventHandler`](/docs/classes/eventhandler/).[`constructor`](/docs/classes/eventhandler/#constructor)

## Properties

### destroyed

> **destroyed**: `boolean` = `false`

Defined in: packages/guilds.js/src/classes/Client.ts:133

***

### heartbeatInterval?

> `optional` **heartbeatInterval**: `Timeout`

Defined in: packages/guilds.js/src/classes/Client.ts:15

Gateway heartbeat inteval

***

### intents

> **intents**: `number`

Defined in: packages/guilds.js/src/classes/Client.ts:27

Client intents bitfield

***

### lastHeartbeatAck

> **lastHeartbeatAck**: `boolean` = `true`

Defined in: packages/guilds.js/src/classes/Client.ts:134

***

### presence

> **presence**: [`ClientPresenceProps`](/docs/interfaces/clientpresenceprops/)

Defined in: packages/guilds.js/src/classes/Client.ts:39

Current presence information

***

### ready

> **ready**: `boolean` = `false`

Defined in: packages/guilds.js/src/classes/Client.ts:30

Whether the client is ready

***

### rest

> **rest**: [`RESTManager`](/docs/classes/restmanager/)

Defined in: packages/guilds.js/src/classes/Client.ts:24

REST manager instance to handle API calls

***

### sequenceNumber

> **sequenceNumber**: `number` \| `null` = `null`

Defined in: packages/guilds.js/src/classes/Client.ts:18

Last received sequence number

***

### sessionId?

> `optional` **sessionId**: `string`

Defined in: packages/guilds.js/src/classes/Client.ts:21

Gateway session ID

***

### user

> **user**: [`User`](/docs/classes/user/) \| `null`

Defined in: packages/guilds.js/src/classes/Client.ts:36

Client user, or null if not ready

***

### ws?

> `optional` **ws**: `WebSocket`

Defined in: packages/guilds.js/src/classes/Client.ts:33

WebSocket connection

## Accessors

### token

#### Get Signature

> **get** **token**(): `string`

Defined in: packages/guilds.js/src/classes/Client.ts:90

The client's token

##### Returns

`string`

## Methods

### connect()

> **connect**(): `Promise`\<`Client`\>

Defined in: packages/guilds.js/src/classes/Client.ts:95

Start the connection to Discord's gateway

#### Returns

`Promise`\<`Client`\>

***

### disconnect()

> **disconnect**(): `void`

Defined in: packages/guilds.js/src/classes/Client.ts:258

Destroy the connection to Discord's gateway

#### Returns

`void`

***

### emit()

> **emit**\<`K`\>(`event`, ...`args`): `Promise`\<`boolean`\>

Defined in: packages/guilds.js/src/classes/EventHandler.ts:55

Emit an event

#### Type Parameters

##### K

`K` *extends* keyof [`ClientEvents`](/docs/type-aliases/clientevents/)

#### Parameters

##### event

`K`

Event name

##### args

...[`ClientEvents`](/docs/type-aliases/clientevents/)\[`K`\]

Event arguments

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`EventHandler`](/docs/classes/eventhandler/).[`emit`](/docs/classes/eventhandler/#emit)

***

### off()

> **off**\<`K`\>(`event`, `listener`): `Client`

Defined in: packages/guilds.js/src/classes/EventHandler.ts:41

Remove an event name

#### Type Parameters

##### K

`K` *extends* keyof [`ClientEvents`](/docs/type-aliases/clientevents/)

#### Parameters

##### event

`K`

Event name

##### listener

(...`args`) => `any`

Listener callback

#### Returns

`Client`

#### Inherited from

[`EventHandler`](/docs/classes/eventhandler/).[`off`](/docs/classes/eventhandler/#off)

***

### on()

> **on**\<`K`\>(`event`, `listener`): `Client`

Defined in: packages/guilds.js/src/classes/EventHandler.ts:12

Add a new event listener

#### Type Parameters

##### K

`K` *extends* keyof [`ClientEvents`](/docs/type-aliases/clientevents/)

#### Parameters

##### event

`K`

Event name

##### listener

(...`args`) => `any`

Listener callback

#### Returns

`Client`

#### Inherited from

[`EventHandler`](/docs/classes/eventhandler/).[`on`](/docs/classes/eventhandler/#on)

***

### once()

> **once**\<`K`\>(`event`, `listener`): `Client`

Defined in: packages/guilds.js/src/classes/EventHandler.ts:26

Add a new event listener which only runs once

#### Type Parameters

##### K

`K` *extends* keyof [`ClientEvents`](/docs/type-aliases/clientevents/)

#### Parameters

##### event

`K`

Event name

##### listener

(...`args`) => `any`

Listener callback

#### Returns

`Client`

#### Inherited from

[`EventHandler`](/docs/classes/eventhandler/).[`once`](/docs/classes/eventhandler/#once)

***

### setPresence()

> **setPresence**(`presence`): `Client`

Defined in: packages/guilds.js/src/classes/Client.ts:231

Update the client's user presence

#### Parameters

##### presence

`Partial`\<[`ClientPresenceProps`](/docs/interfaces/clientpresenceprops/)\>

#### Returns

`Client`
