# Supervisor

> A complete Supervisor library workspace. Source: [`src/core`](../../src/core), [`src/server`](../../src/server), [`app/core`](../../app/core), [`app/server`](../../app/server).
> Published through `@orkestrel/supervisor`; workspace barrels: `@src/core`, `@src/server`, `@app/core`, `@app/server`.

## Surface

```ts
import { createSupervisor } from '@orkestrel/supervisor'

const instance = createSupervisor({ id: 'example' })
```

```ts
import {
	ApplicationError,
	createApplication,
	isApplicationError,
	parseApplicationName,
} from '@app/core'

const name = parseApplicationName(' supervisor ')
const application = createApplication(name)
isApplicationError(new ApplicationError('CONFIG', 'invalid')) // true
```

```ts
import type { ApplicationRecord, ApplicationState } from '@app/server'
import {
	APP_HEALTH_METHOD,
	APP_HEALTH_PATH,
	APP_HOST_LABEL_PATTERN,
	APP_NUMERIC_HOST_PATTERN,
	ApplicationServerError,
	DEFAULT_APP_START_TIMEOUT,
	MAX_APP_START_TIMEOUT,
	createApplicationDispatcher,
	createApplicationServer,
	handleApplicationHealth,
	isApplicationServerError,
	parseApplicationHost,
	parseApplicationPort,
	parseApplicationServerOptions,
	parseApplicationStartTimeout,
	reportApplicationServerError,
} from '@app/server'

const host = parseApplicationHost('127.0.0.1')
const port = parseApplicationPort('0')
const timeout = parseApplicationStartTimeout('5000')
const options = parseApplicationServerOptions({ server: { host, port, timeout } })
parseApplicationStartTimeout(String(DEFAULT_APP_START_TIMEOUT)) // 10000
MAX_APP_START_TIMEOUT // 300000
APP_HOST_LABEL_PATTERN.test('api') // true
APP_NUMERIC_HOST_PATTERN.test('999.999.999.999') // true (and therefore rejected as a host)
const state: ApplicationState = { connection: { encrypted: false } }
const record: ApplicationRecord = { name: 'supervisor', status: 'ok' }
const dispatcher = createApplicationDispatcher()
try {
	const response = await dispatcher.handle(
		new Request(`http://application.test${APP_HEALTH_PATH}`, { method: APP_HEALTH_METHOD }),
		state,
	)
	const health = handleApplicationHealth()
	const encoded = Response.json(record)
	if (!response.ok || !health.ok || !encoded.ok) throw new Error('Application health failed')
} finally {
	dispatcher.destroy()
}

const failure: unknown = new ApplicationServerError('CONFIG', 'invalid')
if (isApplicationServerError(failure)) {
	reportApplicationServerError(failure) // writes only a stable CONFIG diagnostic
}

const server = createApplicationServer(options)
const controller = new AbortController()
await server.start(controller.signal)
await server.stop()
await server.destroy()
```

```ts
import { ApplicationServerRunner } from '@app/server'

const runner = new ApplicationServerRunner({ server: { port: 0 } })
runner.start() // process owns shutdown signals
await runner.stop()
```

```ts
import { startApplicationServer } from '@app/server'

const processRunner = startApplicationServer({ server: { port: 0 } })
await processRunner.stop()
```

### Factories

| Name                          | Kind     | Summary                                           |
| ----------------------------- | -------- | ------------------------------------------------- |
| `createSupervisor`            | function | Create a Supervisor.                              |
| `createApplication`           | function | Create an application identity.                   |
| `createApplicationDispatcher` | function | Create a standalone application route dispatcher. |
| `createApplicationServer`     | function | Create a stopped application server.              |
| `startApplicationServer`      | function | Start the process-owned application server.       |

### Entities

| Name                      | Kind  | Summary                                         |
| ------------------------- | ----- | ----------------------------------------------- |
| `Supervisor`              | class | The Supervisor entity.                          |
| `ApplicationServer`       | class | The composed application server.                |
| `ApplicationServerRunner` | class | The application server process lifecycle owner. |

### Parsers

| Name                            | Kind     | Summary                               |
| ------------------------------- | -------- | ------------------------------------- |
| `parseApplicationName`          | function | Parse an application name.            |
| `parseApplicationHost`          | function | Parse an application host.            |
| `parseApplicationPort`          | function | Parse an application port.            |
| `parseApplicationStartTimeout`  | function | Parse an application startup timeout. |
| `parseApplicationServerOptions` | function | Parse application server options.     |

### Guards

| Name                       | Kind     | Summary                                          |
| -------------------------- | -------- | ------------------------------------------------ |
| `isApplicationError`       | function | Narrow a caught value to ApplicationError.       |
| `isApplicationServerError` | function | Narrow a caught value to ApplicationServerError. |

### Handlers

| Name                           | Kind     | Summary                                                             |
| ------------------------------ | -------- | ------------------------------------------------------------------- |
| `handleApplicationHealth`      | function | Return the application health record.                               |
| `reportApplicationServerError` | function | Report a process-owned failure without exposing diagnostic context. |

### Errors

| Name                     | Kind  | Summary                                    |
| ------------------------ | ----- | ------------------------------------------ |
| `ApplicationError`       | class | An application configuration error.        |
| `ApplicationServerError` | class | A server configuration or lifecycle error. |

### Types

| Name                               | Kind      | Summary                                            |
| ---------------------------------- | --------- | -------------------------------------------------- |
| `SupervisorOptions`                | interface | Options for creating a Supervisor.                 |
| `SupervisorInterface`              | interface | The Supervisor contract.                           |
| `ApplicationErrorContext`          | interface | Application boundary-failure context.              |
| `Application`                      | interface | The shared application identity.                   |
| `ApplicationRecord`                | interface | The application health record.                     |
| `ApplicationState`                 | interface | Per-request application state.                     |
| `ApplicationServerErrorContext`    | interface | Application server boundary-failure context.       |
| `ApplicationServerOptions`         | interface | Options for creating an application server.        |
| `ApplicationServerInterface`       | interface | The application server lifecycle contract.         |
| `ApplicationServerRunnerInterface` | interface | The application server process lifecycle contract. |

### Aliases

| Name                         | Kind | Summary                                    |
| ---------------------------- | ---- | ------------------------------------------ |
| `ApplicationErrorCode`       | type | An application configuration error reason. |
| `ApplicationServerErrorCode` | type | An application server error reason.        |

### Constants

| Name                                | Kind  | Summary                                           |
| ----------------------------------- | ----- | ------------------------------------------------- |
| `APP_NAME`                          | const | The shared application name.                      |
| `MAX_APPLICATION_NAME_LENGTH`       | const | The maximum application-name length.              |
| `MAX_APPLICATION_NAME_INPUT_LENGTH` | const | The maximum raw application-name input length.    |
| `DEFAULT_APP_HOST`                  | const | The loopback host default.                        |
| `DEFAULT_APP_PORT`                  | const | The application port default.                     |
| `DEFAULT_APP_START_TIMEOUT`         | const | The application startup timeout default.          |
| `MAX_APP_START_TIMEOUT`             | const | The maximum application startup timeout.          |
| `MAX_APP_HOST_INPUT_LENGTH`         | const | The maximum raw application-host input length.    |
| `MAX_APP_NUMBER_INPUT_LENGTH`       | const | The maximum raw application numeric input length. |
| `APP_PORT_PATTERN`                  | const | The decimal application-port syntax.              |
| `APP_HOST_LABEL_PATTERN`            | const | The DNS application-host label syntax.            |
| `APP_NUMERIC_HOST_PATTERN`          | const | The ambiguous numeric-host rejection syntax.      |
| `APP_HEALTH_METHOD`                 | const | The owned health request method.                  |
| `APP_HEALTH_PATH`                   | const | The owned health request path.                    |

## Methods

#### `ApplicationServerInterface`

| Method    | Returns         | Behavior                                                                                                                                                                                                                                                          |
| --------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start`   | `Promise<void>` | Bind the installed `@orkestrel/server` substrate when idle or stopped. The optional `AbortSignal` and bounded startup timeout cancel pending binding. Rejects with `ApplicationServerError` code `LIFECYCLE` when startup fails, times out, or the caller aborts. |
| `stop`    | `Promise<void>` | Drain and stop the installed server; repeated calls while stopped are safe. Rejects with `ApplicationServerError` code `LIFECYCLE` when closing fails.                                                                                                            |
| `destroy` | `Promise<void>` | Perform terminal idempotent teardown through the installed server lifecycle, then destroy its owned dispatcher. Rejects with `ApplicationServerError` code `LIFECYCLE` when server teardown fails.                                                                |

#### `ApplicationServerRunnerInterface`

| Method  | Returns         | Behavior                                                                                                                                                                                                                       |
| ------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `start` | `void`          | Register one generation-owned set of SIGINT/SIGTERM cleanup listeners, start the server, write one `[READY] <name> <url>` line after readiness, and translate asynchronous startup failures into a non-zero process exit code. |
| `stop`  | `Promise<void>` | Release both process listeners before stopping the server; repeated calls are safe and lifecycle failures reject.                                                                                                              |

The constructor validates grouped direct options plus `APP_HOST`, `APP_PORT`, and
`APP_START_TIMEOUT` before allocating
a listener. Direct options must be an exact plain own-key data record containing only a
`server` record with `host`, `port`, and/or `timeout`; inherited properties, accessors, symbols, instances, proxies that
throw during reflection, and unknown keys fail closed. Invalid values throw
`ApplicationServerError` code `CONFIG`; the default host is loopback and port `0` is
supported for collision-free ephemeral allocation. Startup defaults to 10 seconds and accepts
only integer timeouts from 1 through 300,000 milliseconds. Lifecycle failures use code
`LIFECYCLE`; both may carry `context.cause` or `context.value`. Narrow caught values with
`isApplicationServerError` before reading either field.

Before binding, `url` is `undefined`; after a successful start it reflects the real bound port,
and it returns to `undefined` after stop or destroy. `ApplicationState` extends middleware's
`IdentifierState` and adds only its `connection` property; there is no redundant `listening` member.

Each `createApplicationDispatcher()` call returns a fresh dispatcher that owns exactly `GET /health`
and serializes the shared `ApplicationRecord` shape `{ name: APP_NAME, status: 'ok' }` as JSON. The
server composes `createBoundary()`, `createSecurity()`, then `createDeadline({ ms: timeout })`
around that owned dispatcher; standalone callers destroy theirs after use. Every other path returns
`404`, and every unsupported method returns `405` with `Allow: GET`.

## Tests

- [`tests/policy.test.ts`](../../tests/policy.test.ts) — filename placement and real browser capability probing.
- [`tests/src/core/Supervisor.test.ts`](../../tests/src/core/Supervisor.test.ts) — entity boundaries.
- [`tests/src/core/factories.test.ts`](../../tests/src/core/factories.test.ts) — factory behavior.
- [`tests/src/server/Supervisor.test.ts`](../../tests/src/server/Supervisor.test.ts) — entity boundaries.
- [`tests/src/server/factories.test.ts`](../../tests/src/server/factories.test.ts) — factory behavior.
- [`tests/app/core/factories.test.ts`](../../tests/app/core/factories.test.ts) — host-independent identity behavior.
- [`tests/app/server/ApplicationServer.test.ts`](../../tests/app/server/ApplicationServer.test.ts) — real loopback lifecycle and protocol behavior.
- [`tests/app/server/parsers.test.ts`](../../tests/app/server/parsers.test.ts) — hostile environment boundaries.

## See also

- [`AGENTS.md`](../../AGENTS.md) — the rules.
- [`guide.md`](guide.md) — the mirrored guide for `@orkestrel/guide`, the
  devDependency powering this repo's guides-parity test suite.
- [`README.md`](../README.md) — the guides index.
