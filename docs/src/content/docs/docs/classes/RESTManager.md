---
editUrl: false
next: false
prev: false
title: "RESTManager"
---

Defined in: packages/guilds.js/src/classes/RESTManager.ts:5

Class representing a Discord REST API manager

## Constructors

### Constructor

> **new RESTManager**(`token`): `RESTManager`

Defined in: packages/guilds.js/src/classes/RESTManager.ts:12

Instantiate a new Discord API manager

#### Parameters

##### token

`string`

Client token

#### Returns

`RESTManager`

## Methods

### delete()

> **delete**\<`T`\>(`endpoint`, `init?`): `Promise`\<`Response` & `object`\>

Defined in: packages/guilds.js/src/classes/RESTManager.ts:54

Create a HTTP DELETE request

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### endpoint

`string`

Endpoint URI

##### init?

`RequestInit`

Request data

#### Returns

`Promise`\<`Response` & `object`\>

***

### get()

> **get**\<`T`\>(`endpoint`, `init?`): `Promise`\<`Response` & `object`\>

Defined in: packages/guilds.js/src/classes/RESTManager.ts:63

Create a HTTP GET request

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### endpoint

`string`

Endpoint URI

##### init?

`RequestInit`

Request data

#### Returns

`Promise`\<`Response` & `object`\>

***

### patch()

> **patch**\<`T`\>(`endpoint`, `init?`): `Promise`\<`Response` & `object`\>

Defined in: packages/guilds.js/src/classes/RESTManager.ts:72

Create a HTTP PATCH request

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### endpoint

`string`

Endpoint URI

##### init?

`RequestInit`

Request data

#### Returns

`Promise`\<`Response` & `object`\>

***

### post()

> **post**\<`T`\>(`endpoint`, `init?`): `Promise`\<`Response` & `object`\>

Defined in: packages/guilds.js/src/classes/RESTManager.ts:81

Create a HTTP POST request

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### endpoint

`string`

Endpoint URI

##### init?

`RequestInit`

Request data

#### Returns

`Promise`\<`Response` & `object`\>

***

### put()

> **put**\<`T`\>(`endpoint`, `init?`): `Promise`\<`Response` & `object`\>

Defined in: packages/guilds.js/src/classes/RESTManager.ts:90

Create a HTTP PUT request

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### endpoint

`string`

Endpoint URI

##### init?

`RequestInit`

Request data

#### Returns

`Promise`\<`Response` & `object`\>
