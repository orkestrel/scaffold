# Unit VISIT-console report

## Advisory taken at start

`npx --no-install scaffold audit`:

```
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the
declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run
--config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config
vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts,
tests/setupBrowser.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupBrowser.test.ts,
tests/setupServer.test.ts, each covering the module of the same name.
dependencies: typescript declares major 6, while the registry serves major 7.
```

plus the drift table naming `.agents/…orkestrel-human-journey…`, `.claude/agents/codex.md`, and
`.codex/agents/claude.toml` as `foreign`. Per the brief, `dependencies` and the foreign paths are
out of scope.

## Proof files

- `tests/setup.test.ts` proves `createRecordingSink` (`tests/setup.ts`): each `write(text, level)`
  call is appended as a `(text, level)` tuple to `calls`, in call order; a fresh sink starts with
  no recorded calls; two sink instances hold independent call lists. The "in order" case rebuilds
  its expected tuple array from the input array directly rather than reading it back through the
  sink, so it cannot pass by echoing the sink's own state.
- `tests/setupBrowser.test.ts` proves `captureConsole` (`tests/setupBrowser.ts`): `console.log` /
  `warn` / `error` calls after capture are recorded as `(format, ...styles)` tuples in their own
  recorder, independent of the other two; `restore()` puts back the exact original method
  references (identity comparison); no call is recorded after `restore()`. The file states as a
  comment that `captureConsole` swaps the global `console`, which exists identically in Node and a
  browser, touches no DOM, and therefore carries no separate DOM-driving half for a browser suite
  to prove.
- `tests/setupServer.test.ts` proves `WORKSPACE_ROOT`, `readText`, `fileExists`,
  `createStreamTarget`, and `createWriteProbe` (`tests/setupServer.ts`), using real files under the
  repository root: `WORKSPACE_ROOT` is checked by reading `package.json` directly with
  `node:fs.readFileSync`, independent of `readText`/`fileExists`; `readText` is checked against a
  direct `node:fs` read of the same file, and against a throw for a missing file; `fileExists`
  against a present and an absent real path; `createStreamTarget` against its default `isTTY`/no
  `columns` and its write-recording, and against explicit `isTTY`/`columns`; `createWriteProbe`
  against its default backpressure, string-chunk recording, `Uint8Array`-to-utf-8 decoding, and a
  configured backpressure value.

## Mutation controls (run, observed failing, reverted)

- `tests/setup.test.ts`: reordering the expected tuple array in "records each write as a (text,
  level) pair, in call order" failed at `tests/setup.test.ts:18` —
  `expect(sink.calls).toEqual(expected)`.
- `tests/setupBrowser.test.ts`: moving the pre-restore identity assertions to after
  `capture.restore()` in "restores the exact original console methods by identity" failed at
  `tests/setupBrowser.test.ts:46` — `expect(console.log).not.toBe(originalLog)`.
- `tests/setupServer.test.ts`: appending an extra character to the independently read expected
  text in "reads a real repo-relative file, matching a direct node:fs read" failed at
  `tests/setupServer.test.ts:26` — `expect(readText('package.json')).toBe(expected)`.

All three files diff clean against their pre-mutation state after revert (verified with `diff`
against a scratch backup).

## Retained differing values `repair` named

None beyond what the visit order adopted. The first `scaffold repair --groups manifest` wrote
`test:setup` without a retained-value warning. The subsequent full `scaffold repair` reported `0 of
137 planned paths drifted from the plan`, naming only the standing foreign paths
(`.agents/skills/orkestrel-human-journey/**`, `.claude/agents/codex.md`,
`.claude/skills/orkestrel-human-journey/SKILL.md`, `.codex/agents/claude.toml`) — left alone per
the brief.

## Adopted script values

- `scripts.test:guides` set to the planned value:
  `"vitest run --config vite.config.ts --no-cache --reporter=dot --project guides"`.
- `scripts.test:setup` written by `scaffold repair --groups manifest`:
  `"vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"`.
- `scripts.test` adopted to the planned chain with `test:setup` between `test:config` and
  `test:guides`: `"npm run test:src && npm run test:policy && npm run test:config && npm run
  test:setup && npm run test:guides"`.

## Gates, each read bare

- `npm run format:check` — `All matched files use the correct format.` (177 files)
- `npm run lint:check` — no output, exit clean.
- `npm run check` — `tsc --noEmit` for the root project plus `check:src:core` /
  `check:src:browser` / `check:src:server`, no output, exit clean.
- `npm run build` — `build:src:core`, `build:src:browser`, `build:src:server` each built, `dts`
  declarations generated, `dist/src/server/index.d.cts` copied.
- `npm test` — `test:src` 15 files / 631 tests passed; `test:policy` 1 file / 93 tests passed;
  `test:config` 1 file / 46 tests passed; `test:setup` 3 files / 17 tests passed; `test:guides` 1
  file / 63 tests passed.

## Exit audit

`npx --no-install scaffold audit` at exit reports no `setup:` advisory and no `scripts:` advisory.
Remaining advisories are the out-of-scope `dependencies: typescript declares major 6` line and the
standing foreign-path drift table, both named in the brief as out of scope for this unit.

## Files touched

- `tests/setup.test.ts` (new)
- `tests/setupBrowser.test.ts` (new)
- `tests/setupServer.test.ts` (new)
- `package.json` (`test:guides`, `test:setup`, `test` — plus the standing re-pin to
  `@orkestrel/scaffold ^0.0.52` already dirty before this unit)
- `package-lock.json` (already dirty before this unit; unchanged by this unit)
- `vite.config.ts` (regenerated by `scaffold repair`, 11 lines added registering the `setup`
  project)

Not committed, per the brief.
