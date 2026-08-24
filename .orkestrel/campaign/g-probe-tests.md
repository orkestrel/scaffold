`git -C /home/user/orkestrel/probe status --porcelain` was rejected in this session (before and after). No writes were issued. `createTeardown` is not imported anywhere under `tests/`.

---

### 1. `createTeardown` duplication

Every `*.test.ts` `finally` is an inline cleanup list: `scratch.destroy()`, `stage`/`probe`/`server.destroy()`, `rmSync`/`rmdirSync`, and/or `child.kill`. None register those handlers on `createTeardown`.

**`tests/src/bin/main.test.ts`**
- `156`: `child.kill('SIGKILL')` if still live; `scratch.destroy()`
- `354`: `output.close()`; `child.kill('SIGTERM')`; await exit
- `423`: `client.disconnect()`; `rmdirSync(directory)`
- `484`: same as `423`
- `570`: same as `354`
- `639`: `child.kill('SIGKILL')`; `scratch.destroy()`

**`tests/config.test.ts`**
- `631`: `rmSync(workspace, { recursive: true, force: true })`
- `634`: `await server.close()`
- `935`, `1023`, `1061`, `1091`: `scratch.destroy()`
- `1162`: `rmSync(workspace, …)`

**`tests/src/server/stages/RuntimeStage.test.ts`**
- `47`: helper `readFIFOGate` — `scratch.destroy()`
- `84`: `scratch.destroy()`
- `119`, `228`, `278`, `345`, `602`, `831`: `await stage.destroy()`
- `164`, `373`, `471`, `510`, `642`, `671`, `708`, `738`, `769`, `806`, `861`, `1150`, `1441`: `stage.destroy()` then `scratch.destroy()`
- `203`: `stage.destroy()`; `scratch.destroy()`; `outside.destroy()`
- `401`, `440`: `stage.destroy()`; `rmSync(dependency, { force: true })`
- `537`: `stage.destroy()`; `rmSync(directory, { force: true, recursive: true })`
- `573`: `stage.destroy()`; `rmSync(blocker, { force: true })`
- `930`: `rmSync(file)`; `vitest.close()`
- `937`: `scratch.destroy()`
- `980`: `writeFileSync(release)`; `stage.destroy()`; `scratch.destroy()`
- `1073`: `rmSync(cache)` if set; `stage.destroy()`; `scratch.destroy()`
- `1182`, `1223`: `stage.destroy()`; walk `tmp/probe` and `rmSync` marker files
- `1283`: `stage.destroy().catch`; `inspection.catch`; `scratch.destroy()`
- `1334`: `first.destroy()`; `second.destroy()`

**`tests/src/server/stages/TypeStage.test.ts`**
- `26`, `554`, `590`: `scratch.destroy()`
- `56`, `112`, `194`, `218`, `240`, `461`, `500`, `551`, `587`: `await stage.destroy()` (or `replacement.destroy` at `500`)
- `85`, `269`, `368`: `stage.destroy()`; `rmSync(…File)`
- `157`: `stage.destroy()`; `scratch.destroy()`
- `324`: `stage.destroy()`; `rmSync` of `testFile`, `firstFile`, `secondFile`
- `423`: `stage.destroy()`; `rmSync` of `firstFile`, `secondFile`
- `503`: `stage.destroy()`; `rmSync(resolve(ROOT, directory), { recursive: true, force: true })`

**`tests/src/server/Probe.test.ts`**
- `212`, `254`, `287`, `563`, `624`, `1014`, `1347`: `await probe.destroy()`
- `339`: `probe.destroy()`; `rmSync(blocker)`
- `389`, `442`, `716`, `796`, `847`, `907`, `977`, `1171`: `probe.destroy()`; `scratch.destroy()`
- `480`: `probe.destroy()`; restore `process.exitCode`
- `1236`, `1302`: `probe.destroy()`; `rmSync(resolve(ROOT, lax))`
- `1429`: `probe.destroy()`; `rmSync(spec)`
- `1396` is a string inside `writeFileSync` (`'\t} finally {'`), not an executed block

**`tests/src/server/stages/LintStage.test.ts`**
- `297`, `324`, `404`, `439`, `904`: `await stage.destroy()`
- `350`, `473`, `507`, `541`, `594`, `631`, `839`, `874`, `947`: `stage.destroy()`; `scratch.destroy()`
- `376`: `stage.destroy()`; `expect(held).rejects`; `scratch.destroy()`
- `668`, `689`, `712`, `758`, `784`, `811`, `991`: `scratch.destroy()`
- `731`: `answering.destroy()`

**`tests/src/server/helpers.test.ts`** — `238`, `258`, `297`, `351`, `542`: `scratch.destroy()`

**`tests/src/core/errors.test.ts`** — `279`: `workspace.destroy()`; `outside.destroy()`. `298`: `workspace.destroy()`

**`tests/guides.test.ts`** — `411`: `await probe.destroy()`

**`tests/policy.test.ts`** — `37`: `scratch.destroy()`

**`tests/src/server/ProbeServer.test.ts`** (same `try`/`finally` shape, different payload)
- `66`, `225`: remove stdin `data` listener; restore pause/resume
- `100`: `closing = server.destroy()`; assert `server.destroy() === closing`; `await closing` (the latch is the proof)
- `130`: restore stdin pause/resume
- `185`: `process.removeListener('SIGINT'|'SIGTERM', …)`

**No `finally`:** `tests/src/server/Overlay.test.ts`, `tests/distribution.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`.

Same pattern in helpers, not proofs: `tests/setupServer.ts:30` (`scratch.destroy()`), `tests/setupPolicy.ts:1603` (`scratch.destroy()`).

---

### 2. `LintStage.test.ts` local process-ending helper

`tests/src/server/stages/LintStage.test.ts:144-163`:

```144:163:tests/src/server/stages/LintStage.test.ts
function readFixtureServer(scratch: ScratchInterface): number {
	const announced = scratch.read('server.pid')
	if (announced === undefined) throw new Error('The fixture server never announced its process id')
	return Number.parseInt(announced, 10)
}
// …
function killFixtureServer(scratch: ScratchInterface): void {
	process.kill(readFixtureServer(scratch), 'SIGKILL')
}
```

`readFixtureServer` parses `server.pid` from the fixture workspace. `killFixtureServer` `SIGKILL`s that pid. Neighbors in the same file: `waitForFixtureServer` (`152-158`, attempt loop + `waitForDelay(50)`), `readHostEnding` (`172-186`, spawn + `process.kill` + phrase the exit), `readInputRefusal` (`195-224`, spawn + optional `child.kill`), `isProcessLive` (`229-235`, `process.kill(id, 0)`). Call sites of `killFixtureServer`: `647`, `827`.

**Similar process-ending logic elsewhere under `tests/`:** only `tests/src/bin/main.test.ts`. `readSignalEnding` at `91-104` spawns `node -e`, waits for stdout, then `child.kill(signal)` and returns `{ code, signal }`. Inline `child.kill` in `finally` at `157`, `360`, `576`, `641`, and the delivery at `629`. No other test file calls `process.kill` or defines `isProcessLive` / `killFixtureServer`.

**Obliged files’ current state** (the named trio plus the destination helper):

| Path | State |
|---|---|
| `tests/setupServer.ts` | Present. Exports `REFUSED_RUNTIME_TARGETS` and `DIRECTORY_LINKS`. No process-ending helper. |
| `tests/setup.ts` | Absent. Every Vitest project still lists `setupFiles: ['./tests/setup.ts']`. |
| `tests/setup*.test.ts` | Absent (`glob` of `tests/setup*.test.ts` is empty). `tests/config.test.ts:133-137` would register a `setup` project only if that glob were non-empty. |
| Setup project | No `export const setup` in `vite.config.ts`. Default `test.projects` is `[srcCore, srcServer, srcBin, policy, config, guides, distribution, probe]` (`vite.config.ts:238`). |
| Setup script | `package.json` `scripts` has `test:src`, `test:policy`, `test:config`, `test:guides`, `test:distribution`, `test:probe`, `test:bench`. No `test:setup`. |

`src:server` and `src:bin` already load `./tests/setupServer.ts` as a setup file (`vite.config.ts:97`, `134`).

---

### 3. `resolveRoot` / `tests/setup.ts`

`tests/setup.ts` does not exist. There is no `WORKSPACE_ROOT` / `resolveRoot` export under `tests/`. `tests/setupServer.ts` does not compute a repository root.

**`fileURLToPath(new URL('…', import.meta.url))` used as repository root**

- `tests/src/bin/main.test.ts:14` — `'../../../'`
- `tests/src/server/ProbeServer.test.ts:10` — `'../../../'`
- `tests/src/server/Probe.test.ts:14` — `'../../../'`
- `tests/src/server/helpers.test.ts:34` — `'../../../'`
- `tests/src/core/errors.test.ts:16` — `'../../../'`
- `tests/src/server/stages/RuntimeStage.test.ts:29` — `'../../../../'`
- `tests/src/server/stages/TypeStage.test.ts:11` — `'../../../../'`
- `tests/src/server/stages/LintStage.test.ts:10` — `'../../../../'`
- `tests/guides.test.ts:11` — `'../'`

**Same constructor, not the repo root**

- `tests/guides.test.ts:12` — `'../tmp/probe'` (`WORKBENCH`)
- `tests/src/server/Probe.test.ts:538`, `554`, `1023` — `'../../../tmp/probe/'`
- Fixture strings (not this file’s root): `RuntimeStage.test.ts:1090`, `1169`, `1212`, `1269`; `LintStage.test.ts:97`

**Other root shape** (`resolve(dirname(fileURLToPath(import.meta.url)), '..')`)

- `tests/config.test.ts:27`
- `tests/distribution.test.ts:26`

No `fileURLToPath(new URL(…))` root in `Overlay.test.ts`, `policy.test.ts`, `helpers.test.ts` (core), `validators.test.ts`.

---

### 4. Wait-loop map

`waitForCondition` is unused under `tests/`. Every `waitForDelay` site:

**(a) attempt-counted or deadline poll** (loop body is `waitForDelay`)

- `tests/src/bin/main.test.ts:63-70` `waitForArming` — `do { … await waitForDelay(10) } while (now < deadline)` until two `arm-*` files
- `tests/src/bin/main.test.ts:76-83` `waitForArmed` — calls `waitForArming`, then polls until zero `arm-*` files (`waitForDelay(10)`)
- `tests/src/bin/main.test.ts:626-627` — callers: `waitForArming` / `waitForArmed`
- `tests/src/server/Probe.test.ts:826-833` — `do { readdir arm-*; await waitForDelay(5) } while (now < deadline)` until two arm files
- `tests/src/server/stages/RuntimeStage.test.ts:971-972` — `while (!existsSync(ready) && now < budget) await waitForDelay(10)`
- `tests/src/server/stages/RuntimeStage.test.ts:1274-1279` — `for (attempt < 500 && !existsSync(unlink-ready); …) await waitForDelay(10)`
- `tests/src/server/stages/LintStage.test.ts:152-157` `waitForFixtureServer` — `for (attempt < 200; …) { if pid; await waitForDelay(50) }`
- `tests/src/server/stages/LintStage.test.ts:368-370` — `while (scratch.read('admitted') === undefined && now < deadline) await waitForDelay(20)`

**(b) fixed settling wait immediately before a negative assertion**

- `tests/src/server/stages/LintStage.test.ts:344` — `await waitForDelay(250)` then `expect(stage.inspect(…)).rejects.toThrow('already inspecting…')`
- `tests/src/server/stages/LintStage.test.ts:828` — after `killFixtureServer`, `await waitForDelay(250)` then `expect(stage.inspect(…)).rejects.toThrow(…exited with ${ending})`
- `tests/src/server/stages/LintStage.test.ts:939` — `await waitForDelay(250)` then `expect(stage.inspect(…)).rejects.toThrow('EPIPE')`

**Matches neither (a) nor (b)** — single `waitForDelay`, not a poll, next assertion is not a rejection:

- `tests/src/bin/main.test.ts:285`, `549` — `waitForDelay(250)` then `child.stdin.write(…)`
- `tests/src/server/stages/TypeStage.test.ts:80` — `waitForDelay(20)` then rewrite the dependency and inspect again
- `tests/src/server/ProbeServer.test.ts:64`, `223` — `waitForDelay(20)` then `expect(reader.calls…).toStrictEqual(['probe'])`
- `tests/src/server/Probe.test.ts:541` — `waitForDelay(100)` then `probe.prove(ordinary)`
- `tests/src/server/Probe.test.ts:682` — `waitForDelay(7_000).then(() => { throw … })` raced with `prove` (watchdog, not a poll)
- `tests/src/server/stages/LintStage.test.ts:648` — after kill, `waitForDelay(250)` then `expect(destroy()).resolves`
- `tests/src/server/stages/LintStage.test.ts:778` — `waitForDelay(50)` then `expect(destroy()).resolves` (comment: teardown during warming)
- `tests/src/server/stages/LintStage.test.ts:806` — `waitForDelay(250)` then `expect(destroy()).resolves` (comment: let `close` land first)

---

### Unknowns

- `git -C /home/user/orkestrel/probe status --porcelain` did not run (tool rejection). Working tree dirtiness is unread. `.git/HEAD` is `ref: refs/heads/main`.
- Whether `tests/setup.ts` is gitignored versus never created is unread from `tests/` alone; the path is absent on disk.
- `createTeardown`’s published contract was not read (scope is `tests/` only). Duplication is inferred from the `try`/`finally` cleanup lists above.
