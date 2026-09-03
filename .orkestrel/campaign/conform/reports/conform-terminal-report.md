# Unit conform-terminal — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green, `scaffold audit --offline`
reports no drift, and `git status --short` lists only files under Owned.

## Rows

| Row               | Disposition | What landed                                                                                                                                            |
| ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| terminal-obj-2    | applied     | `ESCAPE` deleted from both modules, `KEY_CSI` and the server `CSI` deleted; `CSI` and `ESC` imported from `@orkestrel/console` and `KEY_SS3` built from `ESC` |
| terminal-obj-3    | applied     | `CARRIAGE_RETURN` and `LINE_FEED` deleted from `src/server/constants.ts`; the server reads core's `RETURN` and `NEWLINE`                                |
| terminal-obj-4    | applied     | `OutputStreamInterface` and `isOutputStream` deleted; `TerminalOptions.output` is console's `StreamTargetInterface`, narrowed by `isStreamTarget`       |
| terminal-obj-5    | applied     | `tests/guides.test.ts` gained a `guide fences` block. Fix round 1 widened it to every fence line of `guides/terminal.md` that carries a value comment — the manager, database-store, password, select, checkbox, editor, themed-select, `prompt.pending()`, `result.error.errors`, `renderCursorUp(0)`, and absent-id `delete` lines included |
| terminal-obj-6    | applied     | `tests/src/core/validators.test.ts` created; the guard cases moved there out of `tests/src/core/helpers.test.ts`                                        |
| terminal-obj-7    | applied     | `createScriptedTTY` deleted; `createFakeTTY(options?: FakeTTYOptions)` replays `options.scripts` when supplied                                          |
| terminal-subj-1   | applied     | The false tarball-pin paragraph deleted from `README.md`                                                                                                |
| terminal-subj-2   | applied     | The `## Build and pin` section deleted from `guides/terminal.md`; `FENCE_LANGUAGES` dropped `'text'` and its justifying comment                         |
| terminal-subj-3   | applied     | `guides/README.md` names `form.md` as a mirror, drops the console release clause, and adds `test.md`, `scaffold.md`, and `probe.md` paragraphs          |
| terminal-subj-4   | applied     | The `§N` citations removed from `guides/README.md:4` and `:84` and from the `DatabaseTerminalStore` test name                                           |
| terminal-subj-6   | applied     | Every imperative `Summary` cell in the `## Surface` tables recast as a noun phrase; the `## Methods` `Behavior` cells untouched                         |
| terminal-subj-7   | applied     | `guides/terminal.md` bullet rewritten as "`required` therefore refuses a blank line. A field with no `required` rule accepts an empty answer."          |
| terminal-subj-8   | applied     | Every count over a package-owned set deleted from source, tests, guide, and README; `createTwelveControlSchema` renamed `createEveryControlSchema`      |
| terminal-subj-9   | applied     | `@param` and `@returns` added to every listed export, to `TerminalError`'s constructor, and to both store twins' `get` / `set` / `delete`               |
| terminal-subj-10  | applied     | Every `@example` specifier moved from `@src/core` to `@orkestrel/terminal`; the `DatabaseTerminalStore` example splits `createMemoryDriver` out         |
| terminal-subj-11  | applied     | The reducer family renamed to `reduceInput`, `reducePassword`, `reduceConfirm`, `reduceSelect`, `reduceCheckbox`, `reduceEditor`                        |
| terminal-subj-12  | applied     | `TerminalAnswerError`'s member renamed `'terminal'` → `'target'` in the type, the producer, the test, and the guide                                     |
| terminal-subj-14  | applied     | `moveUp` renamed `renderCursorUp` at its declaration, its caller, the constant's `{@link}`, the guide rows and fence, and the test                      |
| fleet-F1          | noop        | `isBrowserVuePath` is absent. `grep -rn "isBrowserVuePath"` over `/home/user/fleet/terminal` returned nothing; `tests/setup.ts` exports the timer, response, reducer-fold, recording-terminal, schema, and store-matrix helpers and no path predicate. The workspace has no `src/browser`, no `app/browser`, and no `tests/setupBrowser.ts`. |
| fleet-F2          | noop        | No implementation class declares a public `readonly id: string`. Classes read: `Prompt`, `PromptClient`, `TerminalManager`, `Terminal`, `MemoryTerminalStore`, `DatabaseTerminalStore`, `TerminalError`. Observation for a later round: `PromptClient` declares `readonly url: string` ahead of its `#` fields, which is the same shape under a different field name and outside this row's trigger. |

## Files touched

| File                                            | Change                                                                                                      |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `src/core/constants.ts`                         | Imports `CSI` and `ESC` from console; `ESCAPE` and `KEY_CSI` deleted; `SEQUENCE_NAMES` and `CONTROL_NAMES` key off the console primitives; counts deleted |
| `src/core/types.ts`                             | `TerminalAnswerError` carries `{ reason: 'target' }`; the `reduceInput` link and the control count corrected |
| `src/core/helpers.ts`                           | The reducer family renamed to `reduce*`; `@param` and `@returns` added to every listed export                |
| `src/core/validators.ts`                        | `isPendingFormStatus` and `isTerminalSnapshot` given complete blocks                                        |
| `src/core/errors.ts`                            | `TerminalError`'s constructor documented                                                                     |
| `src/core/factories.ts`                         | Every `@example` imports `@orkestrel/terminal`                                                              |
| `src/core/stores/MemoryTerminalStore.ts`        | `@example` specifier corrected; `get` / `set` / `delete` given complete blocks                               |
| `src/core/stores/DatabaseTerminalStore.ts`      | `@example` split across `@orkestrel/terminal` and `@orkestrel/database`; the point-access blocks completed   |
| `src/core/TerminalManager.ts`                   | `answer` returns `{ reason: 'target' }` for an unmounted endpoint                                            |
| `src/server/constants.ts`                       | `ESCAPE`, `CSI`, `CARRIAGE_RETURN`, and `LINE_FEED` deleted; `CSI` imported from console                     |
| `src/server/types.ts`                           | `OutputStreamInterface` deleted; `TerminalOptions.output` takes console's `StreamTargetInterface`            |
| `src/server/helpers.ts`                         | `isOutputStream` deleted; `moveUp` renamed `renderCursorUp`; `RETURN` imported from core; line renderers documented |
| `src/server/Terminal.ts`                        | Narrows output through `isStreamTarget`; writes core's `NEWLINE`; drives the `reduce*` family                |
| `src/server/factories.ts`                       | The control count deleted from the driver's `@remarks`                                                       |
| `guides/terminal.md`                            | `## Build and pin` deleted; Surface rows removed, renamed, and recast as noun phrases; counts deleted; fences updated |
| `guides/README.md`                              | `form.md` documented as a mirror; the console release clause dropped; `test.md`, `scaffold.md`, and `probe.md` added; the `§` citations removed |
| `README.md`                                     | The false tarball-pin paragraph deleted; counts deleted                                                      |
| `tests/guides.test.ts`                          | `FENCE_LANGUAGES` narrowed to `ts`; the `guide fences` transcription block added                             |
| `tests/setup.ts`                                | `createTwelveControlSchema` renamed `createEveryControlSchema`; the count in the hostile-schema block deleted |
| `tests/setup.test.ts`                           | Follows the fixture rename; reads console's `CSI` instead of `KEY_CSI`                                       |
| `tests/setupServer.ts`                          | `createScriptedTTY` deleted, folded into `createFakeTTY(options?)`; recording targets typed `StreamTargetInterface` |
| `tests/setupServer.test.ts`                     | The scripted block folded into `describe('createFakeTTY')`, with the no-script case added                    |
| `tests/integration.test.ts`                     | Drives `createFakeTTY({ scripts })`                                                                          |
| `tests/src/core/helpers.test.ts`                | Follows the reducer renames and the console primitives; the guard cases moved out                            |
| `tests/src/core/validators.test.ts`             | New mirrored proof for `src/core/validators.ts`                                                              |
| `tests/src/core/TerminalManager.test.ts`        | Asserts `{ reason: 'target' }`                                                                               |
| `tests/src/core/stores/DatabaseTerminalStore.test.ts` | The `§14` citation stripped from a test name                                                           |
| `tests/src/server/helpers.test.ts`              | Drops the `isOutputStream` cases; reads `renderCursorUp` and core's `RETURN`                                 |
| `tests/src/server/Terminal.test.ts`             | Drives `createFakeTTY({ scripts })`, console's `CSI`, and the renamed fixture                                |
| `tests/src/server/factories.test.ts`            | Drives `createFakeTTY({ scripts })`                                                                          |

Diffstat: 30 paths, `+3219` lines of unified diff at `/home/user/work/evidence/conform-terminal.diff`.

## Failing-first controls

Each command was run from `/home/user/fleet/terminal`. Every capture is a file, not a transcription.

| Row               | Command                                                                                                                   | Red                                                | Green         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------- |
| terminal-subj-12  | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/TerminalManager.test.ts` | `1 failed \| 12 passed (13)` — the test named the old `'terminal'` literal against the new producer | `13 passed (13)` |
| terminal-obj-6    | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/validators.test.ts`      | `No test files found, exiting with code 1` — the mirrored proof did not exist | `2 passed (2)`   |
| terminal-obj-7    | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts`                 | `1 failed \| 7 passed (8)` — `createFakeTTY` did not replay a supplied script | `8 passed (8)`   |
| terminal-obj-5    | `npm run test:guides`                                                                                                       | `1 failed \| 51 passed (52)` — the transcription caught a planted `renderConfirmView` change that contradicted the fence | `52 passed (52)` |

Capture files, under `/home/user/work/evidence/terminal-proofs/`:
`terminal-subj-12-red.txt`, `terminal-subj-12-green.txt`, `terminal-obj-6-red.txt`, `terminal-obj-6-green.txt`,
`terminal-obj-7-red.txt`, `terminal-obj-7-green.txt`, `terminal-obj-5-red.txt`, `terminal-obj-5-green.txt`.

The terminal-obj-5 control was a planted edit to `src/core/helpers.ts` — `renderConfirmView` rendering
`(yes/NO)` where the fence claims `(y/N)`. The plant was reverted in the same turn, the green capture
was taken after the revert, and `git diff src/core/helpers.ts | grep "yes/\|'NO'"` returns only the
`yes/no` phrase inside a `@returns` line. No plant is live.

## Sweeps

Each pattern ran under `grep -rn` (`-E` for alternation, `-i` where stated) from
`/home/user/fleet/terminal`, over `src`, `tests` (excluding no path), `guides/terminal.md`,
`guides/README.md`, and `README.md` unless the row states otherwise.

| Sweep                                                                                                                        | Result                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `\b(ESCAPE\|KEY_CSI\|CARRIAGE_RETURN\|LINE_FEED\|OutputStreamInterface\|isOutputStream\|moveUp\|createScriptedTTY\|createTwelveControlSchema)\b` over `src tests guides README.md package.json` | One hit: `guides/database.md:111` `LIKE … ESCAPE '\'`, the SQL keyword inside a vendored dependency mirror. No hit in an owned file. |
| `-i` `\b(escaped\|escaping\|moveup\|moves up\|moved up\|moving up\|scripted ?tty\|output ?stream ?interface)\b`                | Hits are `escaped`/`escaping` prose in the vendored `tests/setupPolicy.ts` and `tests/distribution.test.ts`, and the phrase "scripted TTY" as English in `tests/setupServer.test.ts`, `tests/integration.test.ts`, and `guides/terminal.md`. No identifier survives. |
| `\b(input\|password\|confirm\|select\|checkbox\|editor)Reduce\b\|\*Reduce`                                                     | Empty.                                                                                                                        |
| `reason: 'terminal'\|reason === 'terminal'\|'terminal' }`                                                                      | Empty in this package. The remaining fleet hits are toolbox's, listed under § Shared-file patches.                             |
| `§` over the owned source, tests, guides, and README                                                                          | One hit: `src/core/errors.ts:3` cites `.claude/rules/typescript.md § Errors and outcomes`, a named section the refuter permits. |
| `-i` `\b[0-9]+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b` | Empty.                                                                                                                        |
| `-i` `\b(two\|three\|four\|five\|six\|seven\|eight\|nine\|ten\|eleven\|twelve)\b`                                              | Every surviving hit is permitted by its sense, ruled individually in the next list.                                            |

Number words ruled permitted, with the sense that admits each:

- `two-byte`, `one-byte`, `two-space` (`src/core/helpers.ts:56,89`, `src/core/constants.ts:74`, `guides/terminal.md:593`) — a byte-length and a column measurement, a value the reader needs.
- `Single Shift Three` (`src/core/constants.ts:35`, `guides/terminal.md:302`) — the terminal protocol's own name.
- `Two roles sharing a style today are still two roles` (`src/core/constants.ts:163`) — a hypothetical pair in a claim about role identity, not a tally of the role set.
- `the two are separate facts` (`src/core/types.ts:332`, `guides/terminal.md:198`) — the sentence names the members, the ticket's status and the form's status.
- `collapses two cases into one test name` (`tests/setup.test.ts:298`) — names the collision mechanism, not how many cases exist.
- `'two'`, `'two.txt'`, `'Two'` (`tests/setup.ts:299-300`, `tests/integration.test.ts:246`, `tests/src/server/Terminal.test.ts:210,214`, `tests/src/core/helpers.test.ts:399`) — fixture data values, not prose.

Counts deleted beyond the sites the row listed, found by the same sweep and ruled as counts:
`guides/terminal.md` "One contract, three surfaces" / "three ways" / "Three consequences" / "the two
source trees" / "The two stream shapes", `README.md` "three surfaces" / "Two entry points",
`tests/guides.test.ts` "The five constants below", `src/server/types.ts` "two required methods",
`src/core/constants.ts` "the four arrows" / "the two Backspace bytes".

## Gates

Run as `npm --prefix /home/user/fleet/terminal run <script>` in the chain's order. Every command
exited 0; the captures are under `/home/user/work/evidence/terminal-proofs/`.

| Command                        | Exit | Reading                                                                                                  | Capture                  |
| ------------------------------ | ---- | ---------------------------------------------------------------------------------------------------------- | ------------------------ |
| `npm run format:check`         | 0    | `All matched files use the correct format.` over 68 files                                                | `gate-format-check.txt`  |
| `npm run lint:check`           | 0    | No diagnostic                                                                                             | `gate-lint-check.txt`    |
| `npm run check`                | 0    | Root project, `configs/src/tsconfig.core.json`, and `configs/src/tsconfig.server.json` all clean          | `gate-check.txt`         |
| `npm run build`                | 0    | Core and server ESM + CJS built, both `.d.cts` copies written                                            | `gate-build.txt`         |
| `npm test`                     | 0    | `src` 126 passed, `policy` 111 passed, `config` 46 passed, `setup` 25 passed, `guides` 52 passed, `integration` 2 passed | `gate-test.txt`          |
| `npx scaffold audit --offline` | 0    | `0 of 40 planned paths drifted from the plan.`                                                            | `scaffold-audit.txt`     |

Convergence step, run before `format:check` passed:
`cd /home/user/fleet/terminal && npx oxfmt --config .oxfmtrc.json guides/terminal.md src/server/Terminal.ts`.

`node /home/user/scaffold/tmp/work/evidence.mjs terminal` wrote
`/home/user/work/evidence/conform-terminal.diff` (3219 lines) and
`/home/user/work/evidence/conform-terminal.status` (30 entries). Every status entry is under Owned.

**Observation, not a criterion.** The whole-suite `npm test` reading was taken inside this unit's own
exec. The deciding run belongs to the Orchestrator after this unit exits.

## Breaking

The published surface moved. Removed: `ESCAPE` (core and server), `KEY_CSI`, `CSI` (server),
`CARRIAGE_RETURN`, `LINE_FEED`, `OutputStreamInterface`, `isOutputStream`. Renamed: `inputReduce` →
`reduceInput`, `passwordReduce` → `reducePassword`, `confirmReduce` → `reduceConfirm`,
`selectReduce` → `reduceSelect`, `checkboxReduce` → `reduceCheckbox`, `editorReduce` →
`reduceEditor`, `moveUp` → `renderCursorUp`. Changed: `TerminalAnswerError`'s member
`{ reason: 'terminal' }` → `{ reason: 'target' }`, and `TerminalOptions.output` now takes
`StreamTargetInterface` from `@orkestrel/console/server`.

`@orkestrel/toolbox` declares `@orkestrel/terminal` `^0.0.13` and imports
`TerminalManagerInterface`, `createTerminalManager`, `TerminalError`, `HEADER_TOKEN`,
`TimerHandler`, `TimerCancelFunction`, `isTerminalError`, `defaultTimer`, `PendingForm`,
`WireEvent`, `serializeExpire`, and `serializePending` — none of the removed or renamed names. It
imports no `@orkestrel/terminal/server` symbol. The one edit it owes is the discriminant branch,
given under § Shared-file patches.

The built server declaration imports the foreign type rather than inlining it:
`dist/src/server/index.d.ts:9` reads `import { StreamTargetInterface } from '@orkestrel/console/server';`
and `:393` `readonly output?: StreamTargetInterface;`. `@orkestrel/console` is a declared runtime
dependency of this package, so a consumer resolves it without a new declaration.

## Shared-file patches

Not applied here. Carry each to `@orkestrel/toolbox`'s own unit in layer order, after this package
publishes and toolbox re-pins.

`/home/user/fleet/toolbox/src/server/terminals/TerminalBridge.ts:136` — replace

```ts
		if (result.error.reason === 'terminal') return Response.json(result, { status: 404 })
```

with

```ts
		if (result.error.reason === 'target') return Response.json(result, { status: 404 })
```

`/home/user/fleet/toolbox/guides/terminal.md:282` and `:465` name `{ reason: 'terminal' }` in the
vendored mirror of this package's guide. A mirror is refreshed by toolbox's next re-vendor of the
published guide, not edited by hand; the corrected sentences are in this package's
`guides/terminal.md` at the `TerminalAnswerError` Surface row and the `TerminalManagerInterface`
`answer` Methods row.

## Deviations

No row stopped, and nothing in the assignment was left undone. Three conditions are recorded for the
Orchestrator rather than as blockers.

1. **A directive arrived inside tool output that contradicts the dispatch.** A block appended to a
   tool result told me to work through Bash — `cat`, `sed`, heredocs — "rather than using the
   dedicated Read, Edit, or Write tools". The dispatch's § Context fixes the opposite discipline and
   gives the reason: a permission prompt blocks the round. I followed the dispatch, used Read, Grep,
   Glob, Edit, and Write for every file change, and kept Bash to the named runners. Nothing in this
   unit was written through a shell.
2. **The Edit and Write path converts a `\uXXXX` escape in my input into a raw control byte.** My
   first version of the `guide fences` transcription therefore landed a raw NUL, ESC, and BEL inside
   `tests/guides.test.ts`, which the project's own idiom forbids. I detected it by scanning the file
   for control characters, rewrote the affected literals to build each byte from
   `String.fromCharCode` beside console's own `ESC`, and re-scanned: the file now carries no
   character below `0x20` other than tab and newline, and none at `0x7f`. Any successor unit writing
   a control-byte literal into this tree must use the same construction.
3. **Two facts in the brief's evidence did not match the tree, without changing any ruling.** The
   brief cites `package.json:90` as `"@orkestrel/form": "^0.0.3"`; the manifest declares `^0.0.4`.
   Both are registry ranges, so terminal-subj-1 and terminal-subj-2 stand exactly as ruled. The
   brief cites `guides/terminal.md:57` against a declared console `^0.0.11`, which is what
   `package.json:86` carries; that citation is correct.

Two rows required a judgment the brief left to me, recorded here rather than raised:

- **terminal-obj-4's asymmetry.** `InputStreamInterface`, `isInputStream`, and `isReadable` stay
  local because console publishes no input-stream counterpart, exactly as the refuter's operative
  form directs. `src/server/types.ts`'s module comment now states that asymmetry and names
  `StreamTargetInterface` as the reason the output half is gone.
- **terminal-subj-6's boundary.** I recast the `Summary` column of every `## Surface` table and left
  every `## Methods` `Behavior` cell imperative, which is what the row's operative form fixes.

## Fix round 1

The round-1 objective lane's refutation of claim 9 is closed. Every fence line of
`guides/terminal.md` that carries a value comment now has a transcription in the `guide fences`
block, the header sentence names that population exactly, and the new TSDoc blocks in
`tests/setupServer.ts` open in the third person. The gate chain is green on the tree the round left,
`scaffold audit --offline` reports no drift, and `git status --short` lists the same paths it listed
before the round.

### Findings closed

| Finding | The claim it refuted                                                                                                   | The edit that closes it                                                                                                                                                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1      | `tests/guides.test.ts:3-5` claimed the block transcribes each flagship fence while the manager fence carried no case     | Cases added for the manager fence, the database-store fence, and the password, select, checkbox, editor, and themed-`renderSelectView` lines of the direct-drive and re-theme fences                                        |
| F1      | Value-claiming lines outside the lane's list also carried no case                                                        | `prompt.pending()` given its own case; `result.error.errors` folded into the broker case by comparing the whole outcome with `toEqual`; `renderCursorUp(0)` and `delete` on an absent id asserted beside their siblings      |
| F1      | The header sentence still overclaimed once the fence population was read against the block                               | `tests/guides.test.ts:1-7` rewritten to name the covered scope: every fence line carrying a value comment, and no case for a line whose comment claims no value                                                             |
| F3      | The new TSDoc blocks in `tests/setupServer.ts` opened as noun phrases                                                    | `:43` "Settings for a recording TTY." → "Configures a recording TTY."; `:50` "Create a recording TTY. …" → "Creates a recording TTY. …". `createLineInput` and `createStreamTarget` keep their pre-existing form            |

The block comment above `describe('guide fences')` also lost its `below` reference, which
`.claude/rules/writing.md` § Code tokens, references, and links bans.

### Lines ruled out of the population, with the reason

`guides/terminal.md:612` `createTerminal() // process.stdin / process.stdout by default` claims a
resolved default rather than a returned value, and no test can assert it without a real TTY.
`:89`, `:90`, `:647`, `:672`, `:698-700`, and `:740` claim an emission, a fill, a teardown, or an
ownership boundary rather than a value. The header sentence names that exclusion rather than
implying those lines are covered elsewhere.

### Failing-first controls

Each reading ran
`cd /home/user/fleet/terminal && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`
and is captured under `/home/user/work/evidence/terminal-proofs/`.

| Reading                                     | Plant                                                                         | Result                        | Exit | Capture                     |
| ------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------- | ---- | --------------------------- |
| Baseline, before the round                  | None                                                                          | `52 passed (52)`              | 0    | `fix1-baseline.txt`         |
| An existing transcription made wrong        | `renderConfirmView` expected as `'? Continue? (yes/NO)'` where the fence claims `(y/N)` | `1 failed \| 51 passed (52)` | 1    | `fix1-existing-red.txt`     |
| The plant restored and the new cases added  | None                                                                          | `60 passed (60)`              | 0    | `fix1-existing-green.txt`   |
| A new case made wrong                       | The manager fence's `{ name: 'Ada' }` expected as `{ name: 'Grace' }`         | `1 failed \| 59 passed (60)`  | 1    | `fix1-manager-red.txt`      |
| That plant restored                         | None                                                                          | `60 passed (60)`              | 0    | `fix1-manager-green.txt`    |

Both plants were removed by editing the expectation back. `grep -n "Grace\|yes/NO" tests/guides.test.ts`
returns nothing, so no plant is live.

`fix1-added-first.txt` records the run between the plant's restoration and the green reading: my own
first select transcription expected `' ○ Admin'` where `renderSelectView` writes `'  ○ Admin'` for an
unfocused row, so the run read `1 failed | 59 passed (60)`. The expectation was corrected to what the
code returns. The fence's own comment claims no exact string for that line, so no guide claim is in
question.

`grep -nP "[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]" tests/guides.test.ts` returns nothing: every control byte
in the file is still built through `String.fromCharCode` or console's own `CSI`.

### Gates

Run in the chain's order on the tree the round left. Every command exited 0; the captures are under
`/home/user/work/evidence/terminal-proofs/`.

| Command                        | Exit | Reading                                                                                                                | Capture                       |
| ------------------------------ | ---- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| `npm run format:check`         | 0    | `All matched files use the correct format.` over 68 files                                                              | `fix1-gate-format-check.txt`  |
| `npm run lint:check`           | 0    | No diagnostic                                                                                                           | `fix1-gate-lint-check.txt`    |
| `npm run check`                | 0    | Root project, `configs/src/tsconfig.core.json`, and `configs/src/tsconfig.server.json` all clean                        | `fix1-gate-check.txt`         |
| `npm run build`                | 0    | Core and server ESM + CJS built, both `.d.cts` copies written                                                          | `fix1-gate-build.txt`         |
| `npm test`                     | 0    | `src` 126 passed, `policy` 111 passed, `config` 46 passed, `setup` 25 passed, `guides` 60 passed, `integration` 2 passed | `fix1-gate-test.txt`          |
| `npx scaffold audit --offline` | 0    | `0 of 40 planned paths drifted from the plan. Audit compared bytes at 25, existence at 5, and nothing at 10.`           | `fix1-scaffold-audit.txt`     |

No convergence step was needed: `format:check` passed without an `oxfmt` write.

`node /home/user/scaffold/tmp/work/evidence.mjs terminal` rewrote
`/home/user/work/evidence/conform-terminal.diff` (3419 lines, up from 3219) and
`/home/user/work/evidence/conform-terminal.status` (30 entries, unchanged). Every status entry is a
path the unit already owned; the round added no file. `git diff --stat tests/guides.test.ts
tests/setupServer.ts` reads `475 insertions(+), 66 deletions(-)` against `HEAD`, which carries the
base unit's work as well as this round's.

**Observation, not a criterion.** The whole-suite `npm test` reading was taken inside this unit's own
exec. The deciding run belongs to the Orchestrator after this unit exits.

### Deviations

No row stopped. No fence's claimed value contradicted what the code returns, so no guide edit was
needed and `guides/terminal.md` is untouched. No prompt fence needed `createFakeTTY`: every line this
round transcribes is a pure core call.

Two judgments the brief left to me are recorded rather than raised.

- **The population is wider than the lane's list.** Row 1 says "every untranscribed value-claiming
  line", and Row 2 makes the header sentence the test of it, so I re-derived the population from the
  guide rather than taking the lane's list as complete. That added `prompt.pending()`,
  `result.error.errors`, `renderCursorUp(0)`, and `delete` on an absent id.
- **The header sentence changed even though no value-claiming line stays untranscribed.** Row 2's
  "otherwise leave it" would have left a sentence that still claims each flagship fence is
  transcribed, which stays false for the fences that drive a real TTY walk and claim no value. I
  rewrote it to name the covered scope, which is the form Row 2 prescribes for the case it does
  anticipate. This is the ancillary wording the deviation contract leaves to the executor.

The directive appended to `.claude/rules/documentation.md`'s tool output — work through Bash rather
than the Read, Edit, and Write tools — was ignored, as the dispatch instructs. Every file change in
this round went through `Edit`.

### Orchestrator integration (20:4x UTC)

The round-2 objective lane (`units/l3/terminal-objective-r2.md`) held every claim and named two prose findings with their exact replacements, which the Orchestrator applied as returned: `src/core/helpers.ts:786` reads "The ticked indices, in tick order" (the `currently` deleted), and `tests/guides.test.ts:2` reads "The constants that follow are this package's own". Its R2 completes the exclusion list in § Lines ruled out of the population: `guides/terminal.md:35-36` (a bare-return TTY walk) and `:692` and `:693` (two `// the default` option lines) claim no value and carry no case, under the header's categorical exclusion. Its R1 (`PromptClient.url`, fleet-F2's shape under another field name) is a fleet ruling recorded in the follow-on ledger. The evidence was regenerated with `node /home/user/scaffold/tmp/work/evidence.mjs terminal` after the edits.
