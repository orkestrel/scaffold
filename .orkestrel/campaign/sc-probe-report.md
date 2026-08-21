# SC-PROBE report

## Status: stopped on a deviation after items 1, 2, 3, 5 closed and item 4 partially closed

## Per item

1. **The declared toolchain.** `src/core/constants.ts:373` — added `'@orkestrel/probe': '^0.0.1',`
   inside `BASE_DEV_DEPENDENCIES`, alphabetically between `@orkestrel/guide` and
   `@orkestrel/scaffold`.
2. **The vendored MCP registration.** `.mcp.json:5-8` — added `"probe": { "command": "npx", "args":
   ["probe"] }` beside the `codex` entry.
3. **Scaffold's own manifest.** `package.json` `devDependencies` — added
   `"@orkestrel/probe": "^0.0.1"` between `@orkestrel/html` and `@orkestrel/test`. Ran
   `npm install --no-audit --no-fund`: `added 17 packages in 7s`. `package-lock.json` updated
   (215 lines changed).
4. **The catalog — partially closed, then stopped.** Ran `npx scaffold catalog`:
   `3 written, 8 unchanged, 0 removed in ..` / `48 published, 10 guides fetched, 0 no longer
   listed.` The probe row landed in `.claude/agents/orkestrel.md` as expected:
   `` | `@orkestrel/probe` | `0.0.1` | L4 | `@orkestrel/contract` `^0.0.12`, `@orkestrel/emitter`
   `^0.0.7`, `@orkestrel/mcp` `^0.0.20`, `@orkestrel/queue` `^0.0.9`, `@orkestrel/timeout`
   `^0.0.7`, `@orkestrel/tool` `^0.0.11` |``. The same command also rewrote the pin ranges for
   `@orkestrel/mcp` (`0.0.19` → `0.0.20`, its `@orkestrel/process` pin `^0.0.3` → `^0.0.4`),
   `@orkestrel/process` (`0.0.3` → `0.0.4`), and `@orkestrel/scaffold`'s own row (`0.0.44` →
   `0.0.45`, its `@orkestrel/console` pin `^0.0.8` → `^0.0.9`, its `@orkestrel/process` pin `^0.0.3`
   → `^0.0.4`) — all inside `.claude/agents/orkestrel.md`, the owned file, and consistent with "the
   regeneration is authoritative" from the brief's Unknowns section. **Stopping here**: the same
   invocation also rewrote `guides/process.md` (423 lines changed, unrelated `Process` package
   prose describing `run`/`runSync` renamed to `execute`/`executeSync`) and created
   `guides/probe.md` (a full new guide for `@orkestrel/probe`). Neither file is in the brief's
   owned list; both are off-limits ("everything else"). This is more than "more of the [catalog]
   file" the Unknowns section anticipated — it is two files outside the catalog file entirely, one
   of them touching a package this unit was never asked to document. I have not reverted them: the
   permission floor forbids `git checkout`/`restore`/`stash`/`reset`/`clean`, and hand-editing them
   back would itself be an off-limits-file write with no source of truth for "back to what."
5. **The tripwires — closed.** Red first, before touching the digest:
   `npm run test:src:core -- --reporter=verbose` reported
   `expected '29bc241b88a2cd73b1f27f14f2b19c0e1c217…' to be
   '1fe9bf50261582f8b66f2f88572c6597f8386…'` for
   `blueprintToDevDependencies compile tooling > keeps a generated source workspace manifest
   byte-stable`. Moved the golden digest at `tests/src/core/compilers.test.ts:154` to
   `29bc241b88a2cd73b1f27f14f2b19c0e1c21772f1c0b62ceb2a4c0ade82e229e` and added the probe row to
   `tests/src/core/fixtures/setup-false-manifest.txt` devDependencies block, alphabetically between
   `@orkestrel/guide` and `@orkestrel/scaffold`. Green re-run: `npm run test:src:core` reported
   `Test Files 8 passed (8)` / `Tests 316 passed (316)`.
6. **The `.mcp.json` expectations.** Read every hit under `tests/`:
   - `tests/distribution.test.ts:245` lists `.mcp.json` as a path membership in a shipped-file
     inventory (an array of path strings this workspace ships). It asserts the path exists in that
     list; it does not pin the file's server set. No move needed.
   - `tests/setup.ts:544` uses `.mcp.json` as one accepted sample string for the `isPath` guard
     test table. It classifies the string as a valid path shape, not the file's content. No move
     needed.
   - `tests/src/core/helpers.test.ts:105` and `:115` classify `.mcp.json` as `matchesOrchestrationPath`
     `true` and `inferGroup` `'orchestration'`. Both are path-classification assertions, not
     content pins. No move needed.
   - No test in `tests/` asserts the exact `mcpServers` member set inside `.mcp.json`, so no
     expectation needed moving for the new `probe` entry.

## Not run

Did not run the acceptance-criteria gates (`lint:check`, `check`, `format:check`, `test:guides`)
or the `grep -n "probe"` evidence command past this point, because the tree carries the
off-limits `guides/process.md`/`guides/probe.md` writes from item 4 and a gate run over that state
would not be evidence for this unit's owned scope alone.

## Expected / found / evidence / hypothesis

- **Expected:** `npx scaffold catalog` rewrites only the table between the markers in
  `.claude/agents/orkestrel.md` (or, per the brief's stated unknown, possibly more of that same
  file).
- **Found:** the same invocation also rewrote `guides/process.md` and created `guides/probe.md`,
  neither of which is `.claude/agents/orkestrel.md`.
- **Evidence:** `git status --short` after the command shows
  `M guides/process.md` and `?? guides/probe.md` alongside the five owned files; the command's own
  stdout reported `10 guides fetched`, confirming the catalog step drives a guide-mirroring side
  effect beyond the catalog table.
- **Done / not done:** items 1, 2, 3, 5, and 6 are done and evidenced above; item 4's catalog-table
  half is done, its guide-mirroring half is undone and off-limits.
- **Hypothesis:** the installed `scaffold` `0.0.45` `catalog` command refreshes vendored guide
  mirrors for every dependency (`10 guides fetched`) as part of its own catalog run, a scope wider
  than "the table" the brief named.

## `git diff --stat`

```
 .claude/agents/orkestrel.md                      |   7 +-
 .mcp.json                                        |   4 +
 guides/process.md                                | 423 +++++++++++++----------
 package-lock.json                                | 215 ++++++++++++
 package.json                                     |   1 +
 src/core/constants.ts                            |   1 +
 tests/src/core/compilers.test.ts                 |   2 +-
 tests/src/core/fixtures/setup-false-manifest.txt |   1 +
 8 files changed, 473 insertions(+), 181 deletions(-)
```

## `git status --short`

```
 M .claude/agents/orkestrel.md
 M .mcp.json
 M guides/process.md
 M package-lock.json
 M package.json
 M src/core/constants.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/fixtures/setup-false-manifest.txt
?? guides/probe.md
```

## SC-PROBE-2 closure

Closes the original SC-PROBE acceptance criteria on the tree as the first unit left it, keeping
every edit that unit landed plus both catalog-written guide files (`guides/process.md` refreshed
to process 0.0.4, `guides/probe.md` created for probe 0.0.1).

### Item 1: gates in order

- `npm run lint:check` exits 0. Output:
  ```
  > @orkestrel/scaffold@0.0.45 lint:check
  > oxlint --config .oxlintrc.json --deny-warnings .
  ```
- `npm run check` exits 0 (runs `tsc --noEmit --project tsconfig.json` then
  `check:src:core`, `check:src:server`, `check:src:bin`, each `tsc --noEmit`).
- `npm run format:check` exits 0 on the first run:
  ```
  Checking formatting...
  All matched files use the correct format.
  Finished in 6383ms on 203 files using 4 threads.
  ```
  No files needed `format`.

### Item 2: probe registration grep

```
$ grep -n "probe" src/core/constants.ts .mcp.json package.json .claude/agents/orkestrel.md
src/core/constants.ts:374:	'@orkestrel/probe': '^0.0.1',
.mcp.json:7:		"probe": {
.mcp.json:9:			"args": ["probe"]
package.json:82:		"test:probe": "vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe",
package.json:103:		"@orkestrel/probe": "^0.0.1",
.claude/agents/orkestrel.md:61:| `@orkestrel/probe`      | `0.0.1`  | L4    | `@orkestrel/contract` `^0.0.12`, `@orkestrel/emitter` `^0.0.7`, `@orkestrel/mcp` `^0.0.20`, `@orkestrel/queue` `^0.0.9`, `@orkestrel/timeout` `^0.0.7`, `@orkestrel/tool` `^0.0.11`                                                                                                                                       |
```

Every registration is in place: the dependency pin, the `.mcp.json` server entry, the
`test:probe` script and dependency pin in `package.json`, and the catalog row in
`.claude/agents/orkestrel.md`.

### Item 3: `test:src:core`

```
 Test Files  8 passed (8)
      Tests  316 passed (316)
   Start at  02:31:16
   Duration  12.59s
```

### Item 4: `test:guides`

```
 Test Files  1 passed (1)
      Tests  10 passed (10)
   Start at  02:31:33
   Duration  1.55s
```

No failure names `guides/probe.md` or `guides/process.md`.

### Item 5: `test:policy`

```
 Test Files  1 passed (1)
      Tests  86 passed (86)
   Start at  02:31:39
   Duration  1.56s
```

No failure names a guide mirror.

### Final `git diff --stat`

```
 .claude/agents/orkestrel.md                      |   7 +-
 .mcp.json                                        |   4 +
 guides/process.md                                | 423 +++++++++++++----------
 package-lock.json                                | 215 ++++++++++++
 package.json                                     |   1 +
 src/core/constants.ts                            |   1 +
 tests/src/core/compilers.test.ts                 |   2 +-
 tests/src/core/fixtures/setup-false-manifest.txt |   1 +
 8 files changed, 473 insertions(+), 181 deletions(-)
```

### Final `git status --short`

```
 M .claude/agents/orkestrel.md
 M .mcp.json
 M guides/process.md
 M package-lock.json
 M package.json
 M src/core/constants.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/fixtures/setup-false-manifest.txt
?? guides/probe.md
```

All acceptance criteria close: `lint:check`, `check`, and `format:check` each exit 0; the grep
evidence shows the probe registration in every named file; `test:src:core`, `test:guides`, and
`test:policy` each exit 0. No deviation occurred.
