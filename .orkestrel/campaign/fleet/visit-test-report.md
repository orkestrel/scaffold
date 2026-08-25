# Unit VISIT-test — report

## Advisory taken (start)

```
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts,
tests/setupBrowser.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupBrowser.test.ts,
tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is
behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 130 planned paths drifted from the plan. Audit compared bytes at 113, existence at 5, and
nothing at 12.
@orkestrel/scaffold: ^0.0.51 differs from ^0.0.52.
Upstream fallback selected the distributed baseline: versions=live, host=floor.
```

## Standing-condition deviation, found before any writing

**Expected.** The brief states the target was already re-pinned to `@orkestrel/scaffold ^0.0.52`
and installed, with `package.json` and `package-lock.json` dirty from that re-pin.

**Found.** At dispatch, `package.json` declared `"@orkestrel/scaffold": "^0.0.51"`,
`package-lock.json` resolved `0.0.51`, `npm ls @orkestrel/scaffold` reported the installed
`0.0.51`, and `git status --short` showed neither file modified. The audit's own advisory line
`@orkestrel/scaffold: ^0.0.51 differs from ^0.0.52` corroborates the same reading.

**Evidence.** `grep -n scaffold package.json package-lock.json` before any edit; `npm ls
@orkestrel/scaffold` → `@orkestrel/scaffold@0.0.51`; `git status --short` → clean on both files.

**Done or not done.** Not blocking: this condition sits outside the acceptance criteria (only the
`setup:` advisory is a criterion), so the visit proceeded. `npx --no-install scaffold repair
--groups manifest` later rewrote `package.json`'s declared range to `^0.0.52` on its own account
while regenerating `test:setup`; `node_modules` still holds the installed `0.0.51`, so the
manifest's declared range and the installed tree now disagree. No install was run — the brief's
scope names no dependency-install step, and installing a package is outside a `builder` unit's
ordinary scope.

**Hypothesis.** The re-pin-and-install step named in the brief did not run before this dispatch.

## Proof files

### `tests/setup.test.ts`

Covers `tests/setup.ts`. One case per behavioral contract:

- `createAsyncSource` — yields each given value in order then completes; yields nothing for an
  empty source.
- `createStreamSource` — enqueues each given value in order, then reports `done` and stays closed
  on a further read.
- `normalizePath` — rewrites a drive-letter path and a UNC path to forward slashes; leaves a POSIX
  path carrying a literal backslash unchanged; leaves an already-forward-slashed path unchanged.
- `isSerializableRecord` — accepts a plain object; refuses an array, `null`, a primitive, an
  instance carrying a non-default prototype (`Date`), and a cyclic record `JSON.stringify` cannot
  serialize.
- `ROUTED_FENCES` — structural invariants (`Object.isFrozen`, non-empty, every heading and path
  non-empty) plus the membership its consumer relies on: every routed value is a `tests/`-rooted
  `.test.ts` path that exists on disk, which is what lets the totality guard in
  `tests/guides.test.ts` load it as a key into its own collected-files map. The proof states in a
  comment that it stops short of that guard's own guide-consistency assertions (marker-line
  presence, discovered-vs-transcribed-plus-routed equality), which `tests/guides.test.ts` already
  proves.

Mutation control: changed the expected array in `createAsyncSource`'s first case from
`[1, 2, 3]` to `[1, 2, 4]`. Failing line:

```
FAIL  |setup| tests/setup.test.ts > createAsyncSource > yields each given value in order, then completes
AssertionError: expected [ 1, 2, 3 ] to strictly equal [ 1, 2, 4 ]
```

Restored; file re-ran green (`21 passed` across `tests/setup.test.ts` and
`tests/setupServer.test.ts` combined; `16 passed` for `tests/setup.test.ts` alone before the
control).

### `tests/setupServer.test.ts`

Covers `tests/setupServer.ts`. Real `node:fs` resources: each exported constant (`FILE_LINKS`,
`DIRECTORY_LINKS`, `POSIX_MODE`, `CASE_SENSITIVE_FS`, `RAW_BYTE_NAMES`) is checked against a fresh
raw-`fs` derivation of the same host capability — symbolic-link creation and read-back, a `chmod`
round trip, a case-differing pair of writes, and an undecodable-byte filename — performed in this
file rather than by calling the `supports*` probe the constant already wraps, so the derivation is
a second route the module cannot share. The file states in a comment that the `supports*` probes
themselves are proven against real fixtures in `tests/src/server/helpers.test.ts`, so this proof
does not re-prove them.

Mutation control: negated the expected value in `POSIX_MODE`'s case
(`expect(POSIX_MODE).toBe(!stored)`). Failing line:

```
FAIL  |setup| tests/setupServer.test.ts > POSIX_MODE > matches whether this host round-trips a permission bit through chmod and stat
AssertionError: expected true to be false // Object.is equality
```

Restored; file re-ran green.

### `tests/setupBrowser.test.ts` — blocked, not fully covering `tests/setupBrowser.ts`

Written to prove the one contract `resetFixtures` carries that touches no DOM: returning without
throwing when the fixture record is empty, and staying idempotent on a second call. The file
carries the required comment naming the DOM-driving half (`buildFixture`, `buildStylesheet`, and
`resetFixtures` against a populated record) as proven by the consuming browser suites, chiefly
`tests/src/browser/helpers.test.ts` and the fixture-building callers across `tests/src/browser/**`.

**Deviation — expected.** The fixed proof shape assumes `tests/setupBrowser.ts` can be imported in
the `setup` project (Node, browser disabled) and that only the DOM-touching function bodies are
unreachable there.

**Found.** Importing `tests/setupBrowser.ts` at all fails in the `setup` project. It imports
`render` from `@src/browser`, whose barrel re-exports `src/browser/helpers.ts`, which imports
`{ commands, page, userEvent } from 'vitest/browser'` at module scope. That import throws
unconditionally outside Browser Mode:

```
FAIL  |setup| tests/setupBrowser.test.ts [ tests/setupBrowser.test.ts ]
Error: vitest/browser can be imported only inside the Browser Mode. Your test is running in forks
pool. Make sure your regular tests are excluded from the "test.include" glob pattern.
 ❯ node_modules/vitest/browser/context.js:14:7
 ❯ src/browser/helpers.ts:2:1
      1| import type { CaptureVariant, Color, ElementOptions, FrameOptions } fr…
      2| import { commands, page, userEvent } from 'vitest/browser'
```

No case in `tests/setupBrowser.test.ts` runs — the whole suite fails at import, whatever it
asserts, because any import of `resetFixtures` (or any other export) pulls in this chain. The
mutation control could not be produced against a suite that never starts.

**Evidence.** `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`
(as part of `npm test`) reproduces this on the current, unmodified `src/browser/helpers.ts` and
`tests/setupBrowser.ts`, both off-limits to this unit.

**Done or not done.** Not done. `tests/setupBrowser.test.ts` exists and proves the one contract
reachable from Node, but the module carries an import-time barrier the fixed proof shape did not
anticipate, so the `setup` project's own gate — and therefore `npm test` and the full `npm test`
run inside `prepublishOnly` — fails on this file. Acceptance criterion 1 (no `setup:` advisory) is
met per `scaffold audit`, which checks proof-file existence rather than passing status. Acceptance
criteria 2 and 3 are not met for this file: `npm test` does not close green, and no mutation
control could be taken.

**Hypothesis.** `src/browser/helpers.ts` importing `vitest/browser` at module scope, rather than
lazily inside the functions that call `commands`/`page`/`userEvent`, makes the whole browser
barrel — and everything that imports it, including `tests/setupBrowser.ts` — unimportable outside
Browser Mode.

## Retained differing values `repair` named

None reported beyond the manifest fields this visit was told to adopt. `scaffold repair
--groups manifest` wrote `test:setup`; the full `scaffold repair` additionally rewrote
`vite.config.ts` (11 lines added, registering the `setup` project) and, unexpectedly, rewrote
`package.json`'s `@orkestrel/scaffold` devDependency range from `^0.0.51` to `^0.0.52` on its own
account — see the standing-condition deviation. No other script value was retained as differing.

## Gate readings

- `npm run format:check` → `All matched files use the correct format.` (green, after fixing an
  oxlint hit below).
- `npm run lint:check` → initially one warning, `tests/setup.test.ts:82:3:
  typescript(no-extraneous-class): Unexpected empty class`, from an empty `class Marker {}` used
  as a non-plain-prototype fixture; replaced with `new Date()`. Re-run: clean, no output beyond
  the script header.
- `npm run check` → green: root `tsc`, then `check:src:core`, `check:src:browser`,
  `check:src:server`, each with no diagnostics.
- `npm run build` → green: `build:src:core`, `build:src:browser`, `build:src:server` each built
  and copied its `.d.cts`, no errors.
- `npm test` → **not green.** `test:src` (436 passed, 6 skipped), `test:policy` (93 passed), and
  `test:config` (46 passed) all closed green. `test:setup` failed on `tests/setupBrowser.test.ts`
  per the deviation above (`21 passed` from the other two setup files; the suite as a whole is
  `1 failed | 2 passed`). The chain stops there, so `test:guides` never ran inside `npm test`;
  run standalone, `npm run test:guides` closes green (38 passed).

## Files changed

- `tests/setup.test.ts` — new proof file.
- `tests/setupServer.test.ts` — new proof file.
- `tests/setupBrowser.test.ts` — new proof file, incomplete per the deviation above.
- `package.json` — `test:setup` script added by `scaffold repair --groups manifest`; `test` script
  adopted to the planned chain (`test:src && test:policy && test:config && test:setup &&
  test:guides`) through `npm pkg set`; `@orkestrel/scaffold` devDependency range rewritten by
  `scaffold repair` from `^0.0.51` to `^0.0.52` (installed tree still `0.0.51`; not installed by
  this unit).
- `vite.config.ts` — regenerated by `scaffold repair` to register the `setup` project (11 lines
  added).
- `package-lock.json` — unchanged by this unit; still resolves `@orkestrel/scaffold@0.0.51`
  against the manifest's now-declared `^0.0.52`.

No commit was made.

## Successor scope — the Node-importable setupBrowser and the 0.0.52 install

### The 0.0.52 install

- `npm install` — `changed 8 packages, and audited 179 packages`, `found 0 vulnerabilities`.
- `npm ls @orkestrel/scaffold` → `@orkestrel/scaffold@0.0.52`.
- `package-lock.json` resolves `"resolved": "https://registry.npmjs.org/@orkestrel/scaffold/-/scaffold-0.0.52.tgz"`.
- `npx --no-install scaffold repair` — one pass, no `--groups manifest` pre-step needed. It
  reported `0 of 137 planned paths drifted from the plan` and wrote 48 vendored files across
  `.agents/`, `.claude/`, `.codex/`, and `CLAUDE.md` to the `0.0.52` baseline (`.agents` skills,
  role files, rules) — the version bump's own vendored-file update, not a drift correction. It
  named 7 further paths the plan does not own, all under the retired `orkestrel-human-journey`
  skill plus `.claude/agents/codex.md` and `.codex/agents/claude.toml`, matching the brief's
  standing condition that the Orchestrator removes them at commit.

### The setupBrowser restructure

**What changed.** `tests/setupBrowser.ts`'s only value import from `@src/browser` was `render`,
used solely inside `buildFixture`. Converted `import { render } from '@src/browser'` to
`import type { render as RenderFunction } from '@src/browser'` (erases at compile time) plus a
module-scope, DOM-guarded dynamic import:

```ts
let render: typeof RenderFunction | undefined
if (typeof document !== 'undefined') {
	;({ render } = await import('@src/browser'))
}
```

`buildFixture` now reads the module-scope `render` and throws `buildFixture requires a DOM host`
when it never resolved. `buildStylesheet` and `resetFixtures` needed no change — neither imports
`@src/browser`; `buildStylesheet` uses the ambient `document` directly.

**Deviation from the literal instruction, and why.** The dispatch asked for the `await import(...)`
call to sit "inside the DOM-driving functions that use them," which — applied literally to
`buildFixture` — makes it `async` and changes its return type from `HTMLDivElement` to
`Promise<HTMLDivElement>`. `buildFixture` is off-limits itself but its ~130 call sites across
`tests/src/browser/helpers.test.ts` and `tests/src/browser/factories.test.ts` are equally
off-limits (every other test file) and are exclusively synchronous: `const container =
buildFixture(...)` used immediately, never awaited. An `async` `buildFixture` would desync every
one of those call sites, which conflicts with the same instruction's own requirement that "every
exported name, signature, and observable behavior stays identical" and that consuming-suite counts
must not change. The guard above resolves both requirements together: the dynamic `import(...)`
call still sits at module scope rather than inside `buildFixture`'s body, but it runs (or does not
run) based on the same DOM feature test the fixed proof shape already uses to split the
host-independent half from the DOM-driving half, `buildFixture` stays synchronous, and the module
never reaches `vitest/browser` when a `setup`-project test imports it in Node. Flagging this rather
than silently deviating: if a different shape is wanted for the module-scope guard, it is a one-file
change with no test-file fallout because `render`'s external signature is unchanged.

**Full module diff** — captured above under "The setupBrowser restructure" as the working diff;
reproduced here as the exact patch:

```diff
diff --git a/tests/setupBrowser.ts b/tests/setupBrowser.ts
index 3dd2e99..6f973c5 100644
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@ -1,21 +1,34 @@
-import { render } from '@src/browser'
+import type { render as RenderFunction } from '@src/browser'
 
 // Every fixture a test builds is recorded here so one call takes them all back out of the document.
 // A browser test file shares one page, so a container left behind is a resolver ambiguity in the
 // next test rather than a leak nobody notices.
 const fixtures: Element[] = []
 
+// `@src/browser` re-exports `src/browser/helpers.ts`, which imports `vitest/browser` at module
+// scope; that import throws unconditionally outside Browser Mode. The `setup` project runs this
+// file in Node, where `document` is undefined, so the load below never runs there and this module
+// never reaches `vitest/browser`. A browser project registers this file as a setup file, where
+// Vitest awaits a setup file's top-level evaluation — including a top-level `await` — before
+// running any test in that file, so `render` is resolved before `buildFixture` is ever called.
+let render: typeof RenderFunction | undefined
+if (typeof document !== 'undefined') {
+	;({ render } = await import('@src/browser'))
+}
+
 /**
  * Renders fixture markup into a recorded container attached to the document.
  *
  * @param markup - The fixture markup to render.
  * @returns The attached container.
+ * @throws When no DOM host provided `render`, which only a browser project's setup does.
  * @example
  * ```ts
  * const container = buildFixture('<button type="button">Save</button>')
  * ```
  */
 export function buildFixture(markup: string): HTMLDivElement {
+	if (!render) throw new Error('buildFixture requires a DOM host')
 	const container = render(markup)
 	fixtures.push(container)
 	return container
```

### `tests/setupBrowser.test.ts`, completed

Now proves, in the `setup` project (Node): `resetFixtures` returning without touching the DOM on
an empty record and staying idempotent on a second call (unchanged from the earlier draft), plus
`buildFixture` refusing to run outside a DOM host, throwing `buildFixture requires a DOM host` —
the one further host-independent contract the restructured module exposes. The header comment
names `buildFixture`'s DOM-driving path and `buildStylesheet` as proven by the consuming browser
suites, chiefly `tests/src/browser/helpers.test.ts` and every fixture built through them across
`tests/src/browser/**`.

Mutation control, run through `npm run test:setup`: changed the refusal case's assertion from
`.toThrow('buildFixture requires a DOM host')` to `.not.toThrow()`. Failing line:

```
FAIL  |setup| tests/setupBrowser.test.ts > buildFixture > refuses to run outside a DOM host
AssertionError: expected [Function] to not throw an error but 'Error: buildFixture requires a DOM ho…' was thrown
```

Restored byte-for-byte (`diff` against the pre-mutation copy reported no difference); `npm run
test:setup` re-ran green, `24 passed`.

### Gates, closing readings

- `npm run format:check` → `All matched files use the correct format.`
- `npm run lint:check` → clean, no output beyond the script header.
- `npm run check` → green across the root `tsc` and every `check:src:*` project.
- `npm run build` → green across `build:src:core`, `build:src:browser`, `build:src:server`.
- `npm test` → green end to end: `test:src` `436 passed | 6 skipped (442)` across 7 files
  (unchanged from the pre-restructure run), `test:policy` `93 passed`, `test:config` `46 passed`,
  `test:setup` `24 passed` (3 files), `test:guides` `38 passed`.

### Closing audit

```
dependencies: typescript declares major 6, while the registry serves major 7.
[foreign-path table: the retired orkestrel-human-journey skill files, .claude/agents/codex.md,
.codex/agents/claude.toml — the Orchestrator's to remove at commit, per the brief's standing
condition]
0 of 137 planned paths drifted from the plan. Audit compared bytes at 120, existence at 5, and
nothing at 12. The plan does not own 7 further paths beneath its groups.
```

No `setup:` advisory. No `@orkestrel/scaffold` range advisory. The `dependencies: typescript`
advisory is fleet-wide and out of scope per the brief.

No commit was made.
