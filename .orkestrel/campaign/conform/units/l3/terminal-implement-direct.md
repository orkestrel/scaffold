# Unit conform-terminal — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green, `scaffold audit --offline` reports no drift, and `git status --short` lists only files under Owned.

## Rows

| Row | Disposition | What landed |
| --- | --- | --- |
| terminal-obj-2 | applied | `ESCAPE` deleted from both modules, `KEY_CSI` and the server `CSI` deleted; `CSI` and `ESC` imported from `@orkestrel/console` and `KEY_SS3` built from `ESC` |
| terminal-obj-3 | applied | `CARRIAGE_RETURN` and `LINE_FEED` deleted from `src/server/constants.ts`; the server reads core's `RETURN` and `NEWLINE` |
| terminal-obj-4 | applied | `OutputStreamInterface` and `isOutputStream` deleted; `TerminalOptions.output` is console's `StreamTargetInterface`, narrowed by `isStreamTarget` |
| terminal-obj-5 | applied | `tests/guides.test.ts` gained a `guide fences` block transcribing each value-claiming flagship fence of `guides/terminal.md` |
| terminal-obj-6 | applied | `tests/src/core/validators.test.ts` created; the guard cases moved there out of `tests/src/core/helpers.test.ts` |
| terminal-obj-7 | applied | `createScriptedTTY` deleted; `createFakeTTY(options?: FakeTTYOptions)` replays `options.scripts` when supplied |
| terminal-subj-1 | applied | The false tarball-pin paragraph deleted from `README.md` |
| terminal-subj-2 | applied | The `## Build and pin` section deleted from `guides/terminal.md`; `FENCE_LANGUAGES` dropped `'text'` and its justifying comment |
| terminal-subj-3 | applied | `guides/README.md` names `form.md` as a mirror, drops the console release clause, and adds `test.md`, `scaffold.md`, and `probe.md` paragraphs |
| terminal-subj-4 | applied | The `§N` citations removed from `guides/README.md:4` and `:84` and from the `DatabaseTerminalStore` test name |
| terminal-subj-6 | applied | Every imperative `Summary` cell in the `## Surface` tables recast as a noun phrase; the `## Methods` `Behavior` cells untouched |
| terminal-subj-7 | applied | Bullet rewritten as "`required` therefore refuses a blank line. A field with no `required` rule accepts an empty answer." |
| terminal-subj-8 | applied | Every count over a package-owned set deleted from source, tests, guide, and README; `createTwelveControlSchema` renamed `createEveryControlSchema` |
| terminal-subj-9 | applied | `@param` and `@returns` added to every listed export, to `TerminalError`'s constructor, and to both store twins' `get` / `set` / `delete` |
| terminal-subj-10 | applied | Every `@example` specifier moved from `@src/core` to `@orkestrel/terminal`; the `DatabaseTerminalStore` example splits `createMemoryDriver` out |
| terminal-subj-11 | applied | The reducer family renamed to `reduceInput`, `reducePassword`, `reduceConfirm`, `reduceSelect`, `reduceCheckbox`, `reduceEditor` |
| terminal-subj-12 | applied | `TerminalAnswerError`'s member renamed `'terminal'` → `'target'` in the type, the producer, the test, and the guide |
| terminal-subj-14 | applied | `moveUp` renamed `renderCursorUp` at its declaration, its caller, the constant's `{@link}`, the guide rows and fence, and the test |
| fleet-F1 | noop | `isBrowserVuePath` is absent. `grep -rn "isBrowserVuePath"` over `/home/user/fleet/terminal` returned nothing; `tests/setup.ts` exports the timer, response, reducer-fold, recording-terminal, schema, and store-matrix helpers and no path predicate. The workspace has no `src/browser`, no `app/browser`, and no `tests/setupBrowser.ts`. |
| fleet-F2 | noop | No implementation class declares a public `readonly id: string`. Classes read: `Prompt`, `PromptClient`, `TerminalManager`, `Terminal`, `MemoryTerminalStore`, `DatabaseTerminalStore`, `TerminalError`. Observation for a later round: `PromptClient` declares `readonly url: string` ahead of its `#` fields, the same shape under a different field name and outside this row's trigger. |

## Files touched

| File | Change |
| --- | --- |
| `/home/user/fleet/terminal/src/core/constants.ts` | Imports `CSI` and `ESC` from console; `ESCAPE` and `KEY_CSI` deleted; `SEQUENCE_NAMES` and `CONTROL_NAMES` key off the console primitives; counts deleted |
| `/home/user/fleet/terminal/src/core/types.ts` | `TerminalAnswerError` carries `{ reason: 'target' }`; the `reduceInput` link and the control count corrected |
| `/home/user/fleet/terminal/src/core/helpers.ts` | The reducer family renamed to `reduce*`; `@param` and `@returns` added to every listed export |
| `/home/user/fleet/terminal/src/core/validators.ts` | `isPendingFormStatus` and `isTerminalSnapshot` given complete blocks |
| `/home/user/fleet/terminal/src/core/errors.ts` | `TerminalError`'s constructor documented |
| `/home/user/fleet/terminal/src/core/factories.ts` | Every `@example` imports `@orkestrel/terminal` |
| `/home/user/fleet/terminal/src/core/stores/MemoryTerminalStore.ts` | `@example` specifier corrected; `get` / `set` / `delete` given complete blocks |
| `/home/user/fleet/terminal/src/core/stores/DatabaseTerminalStore.ts` | `@example` split across `@orkestrel/terminal` and `@orkestrel/database`; the point-access blocks completed |
| `/home/user/fleet/terminal/src/core/TerminalManager.ts` | `answer` returns `{ reason: 'target' }` for an unmounted endpoint |
| `/home/user/fleet/terminal/src/server/constants.ts` | `ESCAPE`, `CSI`, `CARRIAGE_RETURN`, and `LINE_FEED` deleted; `CSI` imported from console |
| `/home/user/fleet/terminal/src/server/types.ts` | `OutputStreamInterface` deleted; `TerminalOptions.output` takes console's `StreamTargetInterface` |
| `/home/user/fleet/terminal/src/server/helpers.ts` | `isOutputStream` deleted; `moveUp` renamed `renderCursorUp`; `RETURN` imported from core; line renderers documented |
| `/home/user/fleet/terminal/src/server/Terminal.ts` | Narrows output through `isStreamTarget`; writes core's `NEWLINE`; drives the `reduce*` family |
| `/home/user/fleet/terminal/src/server/factories.ts` | The control count deleted from the driver's `@remarks` |
| `/home/user/fleet/terminal/guides/terminal.md` | `## Build and pin` deleted; Surface rows removed, renamed, and recast as noun phrases; counts deleted; fences updated |
| `/home/user/fleet/terminal/guides/README.md` | `form.md` documented as a mirror; the console release clause dropped; `test.md`, `scaffold.md`, and `probe.md` added; the `§` citations removed |
| `/home/user/fleet/terminal/README.md` | The false tarball-pin paragraph deleted; counts deleted |
| `/home/user/fleet/terminal/tests/guides.test.ts` | `FENCE_LANGUAGES` narrowed to `ts`; the `guide fences` transcription block added |
| `/home/user/fleet/terminal/tests/setup.ts` | `createTwelveControlSchema` renamed `createEveryControlSchema`; the count in the hostile-schema block deleted |
| `/home/user/fleet/terminal/tests/setup.test.ts` | Follows the fixture rename; reads console's `CSI` instead of `KEY_CSI` |
| `/home/user/fleet/terminal/tests/setupServer.ts` | `createScriptedTTY` deleted, folded into `createFakeTTY(options?)`; recording targets typed `StreamTargetInterface` |
| `/home/user/fleet/terminal/tests/setupServer.test.ts` | The scripted block folded into `describe('createFakeTTY')`, with the no-script case added |
| `/home/user/fleet/terminal/tests/integration.test.ts` | Drives `createFakeTTY({ scripts })` |
| `/home/user/fleet/terminal/tests/src/core/helpers.test.ts` | Follows the reducer renames and the console primitives; the guard cases moved out |
| `/home/user/fleet/terminal/tests/src/core/validators.test.ts` | New mirrored proof for `src/core/validators.ts` |
| `/home/user/fleet/terminal/tests/src/core/TerminalManager.test.ts` | Asserts `{ reason: 'target' }` |
| `/home/user/fleet/terminal/tests/src/core/stores/DatabaseTerminalStore.test.ts` | The `§14` citation stripped from a test name |
| `/home/user/fleet/terminal/tests/src/server/helpers.test.ts` | Drops the `isOutputStream` cases; reads `renderCursorUp` and core's `RETURN` |
| `/home/user/fleet/terminal/tests/src/server/Terminal.test.ts` | Drives `createFakeTTY({ scripts })`, console's `CSI`, and the renamed fixture |
| `/home/user/fleet/terminal/tests/src/server/factories.test.ts` | Drives `createFakeTTY({ scripts })` |

Diffstat: 30 paths, `+3219` lines of unified diff at `/home/user/work/evidence/conform-terminal.diff`.

## Failing-first controls

Each command was run from `/home/user/fleet/terminal`. Every capture is a file, not a transcription.

| Row | Command | Red | Green |
| --- | --- | --- | --- |
| terminal-subj-12 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/TerminalManager.test.ts` | `1 failed \| 12 passed (13)` — the test named the old `'terminal'` literal against the new producer | `13 passed (13)` |
| terminal-obj-6 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/validators.test.ts` | `No test files found, exiting with code 1` — the mirrored proof did not exist | `2 passed (2)` |
| terminal-obj-7 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts` | `1 failed \| 7 passed (8)` — `createFakeTTY` did not replay a supplied script | `8 passed (8)` |
| terminal-obj-5 | `npm run test:guides` | `1 failed \| 51 passed (52)` — the transcription caught a planted `renderConfirmView` change that contradicted the fence | `52 passed (52)` |

Capture files, under `/home/user/work/evidence/terminal-proofs/`: `terminal-subj-12-red.txt`, `terminal-subj-12-green.txt`, `terminal-obj-6-red.txt`, `terminal-obj-6-green.txt`, `terminal-obj-7-red.txt`, `terminal-obj-7-green.txt`, `terminal-obj-5-red.txt`, `terminal-obj-5-green.txt`.

The terminal-obj-5 control was a planted edit to `src/core/helpers.ts` — `renderConfirmView` rendering `(yes/NO)` where the fence claims `(y/N)`. The plant was reverted in the same turn, the green capture was taken after the revert, and `git diff src/core/helpers.ts | grep "yes/\|'NO'"` returns only the `yes/no` phrase inside a `@returns` line. No plant is live.

## Sweeps

Each pattern ran under `grep -rn` (`-E` for alternation, `-i` where stated) from `/home/user/fleet/terminal`, over `src`, `tests`, `guides/terminal.md`, `guides/README.md`, and `README.md` unless the row states otherwise.

| Sweep | Result |
| --- | --- |
| `\b(ESCAPE\|KEY_CSI\|CARRIAGE_RETURN\|LINE_FEED\|OutputStreamInterface\|isOutputStream\|moveUp\|createScriptedTTY\|createTwelveControlSchema)\b` over `src tests guides README.md package.json` | One hit: `guides/database.md:111` `LIKE … ESCAPE '\'`, the SQL keyword inside a vendored dependency mirror. No hit in an owned file. |
| `-i` `\b(escaped\|escaping\|moveup\|moves up\|moved up\|moving up\|scripted ?tty\|output ?stream ?interface)\b` | Hits are `escaped`/`escaping` prose in the vendored `tests/setupPolicy.ts` and `tests/distribution.test.ts`, and the phrase "scripted TTY" as English in `tests/setupServer.test.ts`, `tests/integration.test.ts`, and `guides/terminal.md`. No identifier survives. |
| `\b(input\|password\|confirm\|select\|checkbox\|editor)Reduce\b\|\*Reduce` | Empty. |
| `reason: 'terminal'\|reason === 'terminal'\|'terminal' }` | Empty in this package. The remaining fleet hits are toolbox's, listed under § Shared-file patches. |
| `§` over the owned source, tests, guides, and README | One hit: `src/core/errors.ts:3` cites `.claude/rules/typescript.md § Errors and outcomes`, a named section the refuter permits. |
| `-i` `\b[0-9]+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b` | Empty. |
| `-i` `\b(two\|three\|four\|five\|six\|seven\|eight\|nine\|ten\|eleven\|twelve)\b` | Every surviving hit is permitted by its sense, ruled individually next. |

Number words ruled permitted, with the sense that admits each:

- `two-byte`, `one-byte`, `two-space` (`src/core/helpers.ts:56,89`, `src/core/constants.ts:74`, `guides/terminal.md:593`) — a byte-length and a column measurement, a value the reader needs.
- `Single Shift Three` (`src/core/constants.ts:35`, `guides/terminal.md:302`) — the terminal protocol's own name.
- `Two roles sharing a style today are still two roles` (`src/core/constants.ts:163`) — a hypothetical pair in a claim about role identity, not a tally of the role set.
- `the two are separate facts` (`src/core/types.ts:332`, `guides/terminal.md:198`) — the sentence names the members, the ticket's status and the form's status.
- `collapses two cases into one test name` (`tests/setup.test.ts:298`) — names the collision mechanism, not how many cases exist.
- `'two'`, `'two.txt'`, `'Two'` (`tests/setup.ts:299-300`, `tests/integration.test.ts:246`, `tests/src/server/Terminal.test.ts:210,214`, `tests/src/core/helpers.test.ts:399`) — fixture data values, not prose.

Counts deleted beyond the sites the row listed, found by the same sweep and ruled as counts: `guides/terminal.md` "One contract, three surfaces" / "three ways" / "Three consequences" / "the two source trees" / "The two stream shapes", `README.md` "three surfaces" / "Two entry points", `tests/guides.test.ts` "The five constants below", `src/server/types.ts` "two required methods", `src/core/constants.ts` "the four arrows" / "the two Backspace bytes".

## Gates

Run as `npm --prefix /home/user/fleet/terminal run <script>` in the chain's order. Every command exited 0; the captures are under `/home/user/work/evidence/terminal-proofs/`.

| Command | Exit | Reading | Capture |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` over 68 files | `gate-format-check.txt` |
| `npm run lint:check` | 0 | No diagnostic | `gate-lint-check.txt` |
| `npm run check` | 0 | Root project, `configs/src/tsconfig.core.json`, and `configs/src/tsconfig.server.json` all clean | `gate-check.txt` |
| `npm run build` | 0 | Core and server ESM + CJS built, both `.d.cts` copies written | `gate-build.txt` |
| `npm test` | 0 | `src` 126 passed, `policy` 111 passed, `config` 46 passed, `setup` 25 passed, `guides` 52 passed, `integration` 2 passed | `gate-test.txt` |
| `npx scaffold audit --offline` | 0 | `0 of 40 planned paths drifted from the plan.` | `scaffold-audit.txt` |

Convergence step, run before `format:check` passed: `cd /home/user/fleet/terminal && npx oxfmt --config .oxfmtrc.json guides/terminal.md src/server/Terminal.ts`.

`node /home/user/scaffold/tmp/work/evidence.mjs terminal` wrote `/home/user/work/evidence/conform-terminal.diff` (3219 lines) and `/home/user/work/evidence/conform-terminal.status` (30 entries). Every status entry is under Owned.

**Observation, not a criterion.** The whole-suite `npm test` reading was taken inside this unit's own exec. The deciding run belongs to the Orchestrator after this unit exits.

## Breaking

The published surface moved. Removed: `ESCAPE` (core and server), `KEY_CSI`, `CSI` (server), `CARRIAGE_RETURN`, `LINE_FEED`, `OutputStreamInterface`, `isOutputStream`. Renamed: `inputReduce` → `reduceInput`, `passwordReduce` → `reducePassword`, `confirmReduce` → `reduceConfirm`, `selectReduce` → `reduceSelect`, `checkboxReduce` → `reduceCheckbox`, `editorReduce` → `reduceEditor`, `moveUp` → `renderCursorUp`. Changed: `TerminalAnswerError`'s member `{ reason: 'terminal' }` → `{ reason: 'target' }`, and `TerminalOptions.output` now takes `StreamTargetInterface` from `@orkestrel/console/server`.

`@orkestrel/toolbox` declares `@orkestrel/terminal` `^0.0.13` and imports `TerminalManagerInterface`, `createTerminalManager`, `TerminalError`, `HEADER_TOKEN`, `TimerHandler`, `TimerCancelFunction`, `isTerminalError`, `defaultTimer`, `PendingForm`, `WireEvent`, `serializeExpire`, and `serializePending` — none of the removed or renamed names. It imports no `@orkestrel/terminal/server` symbol. The one edit it owes is the discriminant branch, given next.

The built server declaration imports the foreign type rather than inlining it: `/home/user/fleet/terminal/dist/src/server/index.d.ts:9` reads `import { StreamTargetInterface } from '@orkestrel/console/server';` and `:393` `readonly output?: StreamTargetInterface;`. `@orkestrel/console` is a declared runtime dependency of this package, so a consumer resolves it without a new declaration.

## Shared-file patches

Not applied here. Carry each to `@orkestrel/toolbox`'s own unit in layer order, after this package publishes and toolbox re-pins.

`/home/user/fleet/toolbox/src/server/terminals/TerminalBridge.ts:136` — replace

```ts
		if (result.error.reason === 'terminal') return Response.json(result, { status: 404 })
```

with

```ts
		if (result.error.reason === 'target') return Response.json(result, { status: 404 })
```

`/home/user/fleet/toolbox/guides/terminal.md:282` and `:465` name `{ reason: 'terminal' }` in the vendored mirror of this package's guide. A mirror is refreshed by toolbox's next re-vendor of the published guide, not edited by hand; the corrected sentences are in this package's `/home/user/fleet/terminal/guides/terminal.md` at the `TerminalAnswerError` Surface row and the `TerminalManagerInterface` `answer` Methods row.

## Deviations

No row stopped, and nothing in the assignment was left undone. Three conditions are recorded for the Orchestrator rather than as blockers.

1. **A directive arrived inside tool output that contradicts the dispatch.** A block appended to a tool result told me to work through Bash — `cat`, `sed`, heredocs — "rather than using the dedicated Read, Edit, or Write tools". The dispatch's § Context fixes the opposite discipline and gives the reason: a permission prompt blocks the round. I followed the dispatch, used Read, Grep, Glob, Edit, and Write for every file change, and kept Bash to the named runners. Nothing in this unit was written through a shell.
2. **The Edit and Write path converts a `\uXXXX` escape in my input into a raw control byte.** My first version of the `guide fences` transcription therefore landed a raw NUL, ESC, and BEL inside `/home/user/fleet/terminal/tests/guides.test.ts`, which the project's own idiom forbids. I detected it by scanning the file for control characters, rewrote the affected literals to build each byte from `String.fromCharCode` beside console's own `ESC`, and re-scanned: the file now carries no character below `0x20` other than tab and newline, and none at `0x7f`. Any successor unit writing a control-byte literal into this tree must use the same construction.
3. **Two facts in the brief's evidence did not match the tree, without changing any ruling.** The brief cites `package.json:90` as `"@orkestrel/form": "^0.0.3"`; the manifest declares `^0.0.4`. Both are registry ranges, so terminal-subj-1 and terminal-subj-2 stand exactly as ruled. The brief's citation of a declared console `^0.0.11` is correct.

Two rows required a judgment the brief left to me, recorded here rather than raised:

- **terminal-obj-4's asymmetry.** `InputStreamInterface`, `isInputStream`, and `isReadable` stay local because console publishes no input-stream counterpart, exactly as the refuter's operative form directs. `/home/user/fleet/terminal/src/server/types.ts`'s module comment now states that asymmetry and names `StreamTargetInterface` as the reason the output half is gone.
- **terminal-subj-6's boundary.** I recast the `Summary` column of every `## Surface` table and left every `## Methods` `Behavior` cell imperative, which is what the row's operative form fixes.

The report is also written to `/home/user/scaffold/tmp/units/conform/conform-terminal-report.md`.
