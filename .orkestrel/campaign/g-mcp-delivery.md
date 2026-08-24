**Porcelain.** `git status --porcelain` in `/home/user/orkestrel/mcp` and `/home/user/orkestrel/process` was rejected by the harness. No writes were issued. HEAD files read: mcp `refs/heads/main` → `8526679d6d83aef477c04d9e4de367fe1031a4e8`; process `refs/heads/main` → `ddb5851ab2dc1a325d03ba4cc90532d9ea12a216`. ROADMAP row lives in `/home/user/scaffold/ROADMAP.md:44–46`, not in either package.

---

### 1. `ProcessOptions.delivery` semantics

**Contract** (`ProcessOptions` published from `@orkestrel/process` core, re-exported by the package barrel):

```160:161:/home/user/orkestrel/process/src/core/types.ts
	/** Milliseconds an unconfirmed {@link ProcessInterface.send} waits before resolving `false`. `0` or omitted disables the bound. */
	readonly delivery?: number
```

`send` never rejects. `true` is host-pipe acceptance, not a child read. `false` covers closed / destroyed / ended / failed / unconfirmed through `delivery`:

```274:289:/home/user/orkestrel/process/src/core/types.ts
	 * Write one line to the open standard-input channel.
	 * ...
	 * Never rejects. `true` means the host accepted the bytes without reporting a fault; it does not
	 * prove that the child read them. An ordinary write settles when the kernel accepts it. Only a
	 * full pipe can hold the write unconfirmed. The `delivery` option can bound that wait, and every
	 * terminal teardown path settles pending writes.
	 * ...
	 * @returns True when the host accepted the bytes without reporting a fault; false when the channel was closed, destroyed, ended, failed, or remained unconfirmed through `delivery`
```

**Default when omitted:** stored as `0` (bound disabled). Validated as a timer in `[0, PROCESS_TIMER]` (`PROCESS_TIMER` is `2_147_483_647` at `/home/user/orkestrel/process/src/core/constants.ts:34`).

```118:140:/home/user/orkestrel/process/src/server/Process.ts
		const delivery = options.delivery
		...
		validateTimer(delivery, "option 'delivery'")
		...
		this.#delivery = delivery ?? 0
```

```256:260:/home/user/orkestrel/process/src/server/Process.ts
		if (this.#delivery > 0 && this.#writes.has(settled)) {
			const timer = setTimeout(() => this.#settleWrite(settled, false), this.#delivery)
			timer.unref()
			this.#writes.set(settled, timer)
		}
```

Guide restates the same: omit or `0` → write stays pending until a host fault or teardown; expiry emits no event (`/home/user/orkestrel/process/guides/process.md:454–458`). Host-reported stdin faults (POSIX `EPIPE`, Windows `EOF` on a pending write after exit) surface as `ProcessError` coded `protocol` on `error`, and the affected `send` resolves `false` (`Process.ts:431–473`, `types.ts:107–116`, `guides/process.md:442–452, 1245–1250`). A child that never reads can fill the pipe and leave `send` unconfirmed; that is the wait `delivery` bounds. Windows 11 / Node v24.18.1 note: a child that closes fd 0 can still yield `send` → `true` with no fault (`types.ts:283–286`, `guides/process.md:461–465`).

`execute` / `executeSync` TSDoc say “failure delivery”; that is `ExecuteOptions.strict`, not `ProcessOptions.delivery` (`execute.ts:51`).

Package at the tree: `@orkestrel/process` `0.0.6`. mcp depends on `"@orkestrel/process": "^0.0.6"` (`mcp/package.json:98`).

---

### 2. mcp spawn sites

**Matching site (spawn + write child stdin):** `StdioClientTransport` only.

- **How spawned:** `@orkestrel/process/server` `Process`, not `node:child_process`. `createStdioClientTransport` is a thin factory (`factories.ts:345–348`).
- **Options actually passed:** `command`, `workspace: process.cwd()`, `grace: PROCESS_GRACE`, `writable: true`. No `delivery`.

```5:6:/home/user/orkestrel/mcp/src/server/transports/StdioClientTransport.ts
import { Process } from '@orkestrel/process/server'
import { PROCESS_GRACE } from '@orkestrel/process'
```

```137:146:/home/user/orkestrel/mcp/src/server/transports/StdioClientTransport.ts
		const child = new Process({
			command: {
				file: this.#command,
				arguments: [...this.#args],
				...(this.#env === undefined ? {} : { environment: this.#env }),
			},
			workspace: process.cwd(),
			grace: PROCESS_GRACE,
			writable: true,
		})
```

- **How stdin is written:** `send` stringifies one JSON-RPC message and `await`s `Process.send` (supervisor appends `\n`). `StdioClientTransportOptions` is `{ command, args?, env? }` only (`types.ts:371–375`) — no `delivery` field. The token `delivery` does not appear in `mcp/src`.

```153:163:/home/user/orkestrel/mcp/src/server/transports/StdioClientTransport.ts
	async send(message: JSONRPCMessage): Promise<void> {
		...
		const delivered = child === undefined ? false : await child.send(JSON.stringify(message))
		if (!delivered) throw new Error('stdio transport is not connected')
	}
```

- **Search remainder in `mcp/src`:** no `node:child_process`, no `spawn(`, no `createProcess`, no `ProcessManager`. `StdioServerTransport` wraps *this* process’s `stdin`/`stdout` (or injected streams) and writes `output` without spawning (`StdioServerTransport.ts:99–101`, `factories.ts:383–389`). Browser “spawn” is `MessagePortTransport` (`browser/helpers.ts:102`).

**When a write fails or the child never reads (this site, today):**

| Condition | What happens |
|---|---|
| Transport not started / already closed | `child === undefined` → throw `'stdio transport is not connected'` |
| Host accepts bytes | `send` resolves |
| Host reports stdin fault (`EPIPE` / callback error) | supervisor `send` → `false` + `error` with `protocol`; mcp throws the same not-connected `Error` |
| Child never reads; pipe fills | with omitted `delivery` (`0`), `Process.send` stays pending; mcp `send` stays pending until `close()`/`destroy()` settles the write `false` |
| `close()` while a write is pending | `destroy` → `#kill` → `#settleWrites(false)` → mcp rejects not-connected |

Observed in tests against a deaf child and a `256 * 1024` payload: still pending after 300ms; `close()` then rejects (`StdioClientTransport.test.ts:43–47, 84, 163–185`).

---

### 3. Existing failure handling

**Detects (via supervisor boolean, collapsed to one Error):**

```158:163:/home/user/orkestrel/mcp/src/server/transports/StdioClientTransport.ts
		const child = this.#closed ? undefined : this.#process
		const delivered = child === undefined ? false : await child.send(JSON.stringify(message))
		if (!delivered) throw new Error('stdio transport is not connected')
```

`false` covers closed/destroyed/ended/failed *and* (if `delivery > 0` were set) an unconfirmed wait. mcp does not pass `delivery`, so the unconfirmed-wait arm is unused.

**Detects host stdin fault as a forwarded event, not as a distinct send error:**

```148:148:/home/user/orkestrel/mcp/src/server/transports/StdioClientTransport.ts
		child.emitter.on('error', (cause) => this.#emitter.emit('error', cause))
```

Supervisor wraps that fault:

```466:473:/home/user/orkestrel/process/src/server/Process.ts
	#failInputCallback(cause: Error): void {
		if (this.#failure !== undefined || this.#stopping) return
		this.#failure = cause
		this.#settleWrites()
		this.#emitter.emit(
			'error',
			new ProcessError('The standard-input channel failed', { code: 'protocol', cause }),
		)
	}
```

Stdin `error` listener is `Process.ts:159`. Teardown settles pending writes `false` at `Process.ts:490–495` (`#stopping = true`, then `#settleWrites()`, then `stdin.destroy()`). `#settle` (natural terminal moment, `Process.ts:404–420`) does **not** call `#settleWrites`.

**Misses / does not bound:**

- Unflushed full pipe while the child lives: no timer; mcp `send` remains pending (`Process.ts:256` requires `#delivery > 0`; constructor sets `?? 0`; mcp omits the option). Guide: “Omit `delivery`, or pass `0`, and the write stays pending until the channel faults or teardown settles it” (`process/guides/process.md:457–458`).
- Child never reading, pipe not yet full: kernel accepts → `true`; mcp treats that as connected. Supervisor docs: `true` does not prove a child read (`types.ts:278–279`).
- Windows fd-0 close while child stays alive: `true` with no `protocol` event (`types.ts:283–286`).
- Send rejection text does not distinguish EPIPE / teardown / never-started / delivery timeout: all throw `'stdio transport is not connected'` (`StdioClientTransport.ts:163`).
- `#report` on `exit.drained === false` is drain-cutoff evidence, not stdin-delivery (`StdioClientTransport.ts:248–255`).

**`StdioServerTransport.send` (not a child spawn):** `this.#output.write(...)` with no return check, no callback, no `output` `error` subscription (`StdioServerTransport.ts:99–101` vs input `error` at `96`).

---

### Unknowns

- Live `git status --porcelain` for mcp and process (harness rejected the command).
- Whether a natural child exit with a still-pending `send` always hits stdin `error`/`#failInputCallback` before `#settle`, given `#settle` does not itself settle `#writes`.
- Whether mcp’s installed `@orkestrel/process` tree matches this `src` (declared `^0.0.6`; this tree’s `package.json` is `0.0.6`).
- POSIX `EPIPE` fast path vs Windows `EOF` on a live child: process guide marks POSIX EPIPE and the delivery matrix as unproven residue (`process/guides/process.md:1248–1251`).
- Whether supervisor (named in the same ROADMAP row) has further stdin-delivery consumers; this pass read only `mcp/src` and `process/src` + `process/guides`.
