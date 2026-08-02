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
import { once } from 'node:events'
import { createServer } from 'node:http'
import {
	APP_HEALTH_METHOD,
	APP_HEALTH_PATH,
	APP_HEADERS_TIMEOUT,
	APP_HOST_LABEL_PATTERN,
	APP_KEEP_ALIVE_TIMEOUT,
	APP_MAX_CONNECTIONS,
	APP_MAX_HEADERS,
	APP_MAX_REQUESTS_PER_SOCKET,
	APP_REQUEST_TIMEOUT,
	APP_NUMERIC_HOST_PATTERN,
	ApplicationServer,
	ApplicationServerError,
	DEFAULT_APP_START_TIMEOUT,
	MAX_APP_START_TIMEOUT,
	createApplicationServer,
	handleApplicationRequest,
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
const options = parseApplicationServerOptions({ host, port, timeout })
APP_HOST_LABEL_PATTERN.test('api') // true
APP_NUMERIC_HOST_PATTERN.test('999.999.999.999') // true (and therefore rejected as a host)
APP_HEALTH_METHOD // 'GET'
APP_HEALTH_PATH // '/'
APP_MAX_CONNECTIONS // 16
APP_MAX_HEADERS // 100
APP_HEADERS_TIMEOUT // 10000
APP_REQUEST_TIMEOUT // 30000
APP_KEEP_ALIVE_TIMEOUT // 5000
APP_MAX_REQUESTS_PER_SOCKET // 100
DEFAULT_APP_START_TIMEOUT // 10000
MAX_APP_START_TIMEOUT // 300000
const handlerServer = createServer(handleApplicationRequest)
handlerServer.listen(0, host)
await once(handlerServer, 'listening')
const handlerClosed = once(handlerServer, 'close')
handlerServer.close()
await handlerClosed

const error = new ApplicationServerError('CONFIG', 'invalid')
isApplicationServerError(error) // true
reportApplicationServerError(error) // writes only a stable CONFIG diagnostic
new ApplicationServer(options) // stopped entity

const server = createApplicationServer(options)
const controller = new AbortController()
await server.start(controller.signal)
await server.stop()
```

```ts
import { ApplicationServerRunner } from '@app/server'

const runner = new ApplicationServerRunner({ port: 0 })
runner.start() // process owns shutdown signals
await runner.stop()
```

```ts
import { startApplicationServer } from '@app/server'

const processRunner = startApplicationServer({ port: 0 })
await processRunner.stop()
```

### Factories

| Name                      | Kind     | Summary                                     |
| ------------------------- | -------- | ------------------------------------------- |
| `createSupervisor`        | function | Create a Supervisor.                        |
| `createApplication`       | function | Create an application identity.             |
| `createApplicationServer` | function | Create a stopped application server.        |
| `startApplicationServer`  | function | Start the process-owned application server. |

### Entities

| Name                      | Kind  | Summary                                         |
| ------------------------- | ----- | ----------------------------------------------- |
| `Supervisor`              | class | The Supervisor entity.                          |
| `ApplicationServer`       | class | The Node HTTP application server.               |
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
| `handleApplicationRequest`     | function | Handle an application HTTP request.                                 |
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
| `APP_MAX_CONNECTIONS`               | const | The simultaneous connection limit.                |
| `APP_MAX_HEADERS`                   | const | The request-header count limit.                   |
| `APP_HEADERS_TIMEOUT`               | const | The request-header timeout.                       |
| `APP_REQUEST_TIMEOUT`               | const | The complete-request timeout.                     |
| `APP_KEEP_ALIVE_TIMEOUT`            | const | The idle keep-alive timeout.                      |
| `APP_MAX_REQUESTS_PER_SOCKET`       | const | The keep-alive request limit.                     |
| `APP_PORT_PATTERN`                  | const | The decimal application-port syntax.              |
| `APP_HOST_LABEL_PATTERN`            | const | The DNS application-host label syntax.            |
| `APP_NUMERIC_HOST_PATTERN`          | const | The ambiguous numeric-host rejection syntax.      |
| `APP_HEALTH_METHOD`                 | const | The owned health request method.                  |
| `APP_HEALTH_PATH`                   | const | The owned health request path.                    |

## Methods

#### `ApplicationServerInterface`

| Method  | Returns         | Behavior                                                                                                                                                                                                                                                                                                   |
| ------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start` | `Promise<void>` | Serialize in call order; start only when stopped, and repeat safely when already listening. The optional `AbortSignal` and bounded startup timeout cancel pending name resolution/listen work. Rejects with `ApplicationServerError` code `LIFECYCLE` when startup fails, times out, or the caller aborts. |
| `stop`  | `Promise<void>` | Cancel every pending start before its queued stop, force active and idle connections closed, and repeat safely when already stopped. Rejects with `ApplicationServerError` code `LIFECYCLE` when closing fails.                                                                                            |

#### `ApplicationServerRunnerInterface`

| Method  | Returns         | Behavior                                                                                                                                                          |
| ------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start` | `void`          | Register one idempotent set of SIGINT/SIGTERM cleanup listeners, start the server, and translate asynchronous startup failures into a non-zero process exit code. |
| `stop`  | `Promise<void>` | Release both process listeners before stopping the server; repeated calls are safe and lifecycle failures reject.                                                 |

The constructor validates direct options plus `APP_HOST`, `APP_PORT`, and
`APP_START_TIMEOUT` before allocating
a listener. Direct options must be an exact plain own-key data record containing only
`host`, `port`, and/or `timeout`; inherited properties, accessors, symbols, instances, proxies that
throw during reflection, and unknown keys fail closed. Invalid values throw
`ApplicationServerError` code `CONFIG`; the default host is loopback and port `0` is
supported for collision-free ephemeral allocation. Startup defaults to 10 seconds and accepts
only integer timeouts from 1 through 300,000 milliseconds. Lifecycle failures use code
`LIFECYCLE`; both may carry `context.cause` or `context.value`. Narrow caught values with
`isApplicationServerError` before reading either field.

The generated server owns exactly `GET /`. It serializes
`{ name: APP_NAME, status: 'ok' }` as JSON with `cache-control: no-store`;
every other path returns deterministic plain-text `404 Not Found`, and every unsupported
method returns deterministic plain-text `405 Method Not Allowed` with `Allow: GET`.

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
