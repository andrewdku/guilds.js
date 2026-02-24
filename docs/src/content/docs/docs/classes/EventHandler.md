---
editUrl: false
next: false
prev: false
title: "EventHandler"
---

Defined in: packages/guilds.js/src/classes/EventHandler.ts:2

Class representing a type-safe EventEmitter

## Extended by

- [`Client`](/docs/classes/client/)

## Type Parameters

### Events

`Events` *extends* `Record`\<`string`, `any`[]\>

## Constructors

### Constructor

> **new EventHandler**\<`Events`\>(): `EventHandler`\<`Events`\>

#### Returns

`EventHandler`\<`Events`\>

## Methods

### emit()

> **emit**\<`K`\>(`event`, ...`args`): `Promise`\<`boolean`\>

Defined in: packages/guilds.js/src/classes/EventHandler.ts:55

Emit an event

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

`K`

Event name

##### args

...`Events`\[`K`\]

Event arguments

#### Returns

`Promise`\<`boolean`\>

***

### off()

> **off**\<`K`\>(`event`, `listener`): `EventHandler`\<`Events`\>

Defined in: packages/guilds.js/src/classes/EventHandler.ts:41

Remove an event name

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

`K`

Event name

##### listener

(...`args`) => `any`

Listener callback

#### Returns

`EventHandler`\<`Events`\>

***

### on()

> **on**\<`K`\>(`event`, `listener`): `EventHandler`\<`Events`\>

Defined in: packages/guilds.js/src/classes/EventHandler.ts:12

Add a new event listener

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

`K`

Event name

##### listener

(...`args`) => `any`

Listener callback

#### Returns

`EventHandler`\<`Events`\>

***

### once()

> **once**\<`K`\>(`event`, `listener`): `EventHandler`\<`Events`\>

Defined in: packages/guilds.js/src/classes/EventHandler.ts:26

Add a new event listener which only runs once

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

`K`

Event name

##### listener

(...`args`) => `any`

Listener callback

#### Returns

`EventHandler`\<`Events`\>
