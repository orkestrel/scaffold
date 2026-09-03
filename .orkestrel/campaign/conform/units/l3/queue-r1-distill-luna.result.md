## Question

For each `conform-queue` row, map the current tree, diff, sweeps, report readings, and available proof evidence.

## Evidence

### Per-row entries

**queue-obj-1**
- **Site now:** `README.md:27-29` shows `## Requirements`, `- Node.js >= 22.12.0`, and `- ESM and CommonJS builds from one entry point`.
- **Diff at the site:** `conform-queue.diff:5` — `@@ -24,8 +24,8 @@ npm install @orkestrel/queue`; the replacement text is present at `conform-queue.diff:11`.
- **Old form sweep:** Pattern `ESM-only|Node\.js >= 24`, word-boundary and case-insensitive, over `src`, `tests`, `guides/queue.md`, `guides/README.md`, and `README.md`: no exact old-form hit. The related phrase `ESM-only` remains in `tests/distribution.test.ts:60` as a declaration-format comment.
- **Report reading:** `conform-queue-report.md:8` says `README.md:28` now reads the replacement. The tree matches.
- **Proof reading:** Placement/documentation row; the README sweep above agrees.

**queue-obj-2**
- **Site now:** `README.md:27-29` carries `- Node.js >= 22.12.0` between the Requirements heading and the CommonJS build statement.
- **Diff at the site:** `conform-queue.diff:5` — `@@ -24,8 +24,8 @@ npm install @orkestrel/queue`; the exact replacement is at `conform-queue.diff:10`.
- **Old form sweep:** Pattern `Node\.js >= 24`, case-insensitive, over the named package paths: no hit.
- **Report reading:** `conform-queue-report.md:11` says the README value matches `engines.node`. `package.json:97` is `">=22.12.0"`; the tree matches.
- **Proof reading:** Placement/documentation row; the sweep agrees.

**queue-obj-3**
- **Site now:** `tests/guides.test.ts:189-220` contains the `guide fences` suite. The guards are asserted at `:191-195`, helpers at `:198-207`, and persistence at `:210-220`.
- **Diff at the site:** `conform-queue.diff:515` — `@@ -168,3 +180,46 @@ for (const entry of manifest)`. The five guard assertions appear at `conform-queue.diff:528-530`; persistence assertions appear at `:548-560`.
- **Old form sweep:** No removed or renamed symbol; not applicable.
- **Report reading:** `conform-queue-report.md:14` says the guide-fence block was appended and points to the failing-first controls. The tree contains it.
- **Proof reading:** The named control exists:
  - Red: `npm --prefix /home/user/fleet/queue run test:guides`; `Tests 2 failed | 24 passed (26)` in `queue-obj-3-guides-red.txt:31`.
  - Green: the same command; `Tests 26 passed (26)` in `queue-obj-3-guides-green.txt:10`.
  - The control files match the report.

**queue-obj-4**
- **Site now:** `tests/src/core/stores/MemoryQueueStore.test.ts:1-4` has only value imports; the former type-import site no longer exists.
- **Diff at the site:** `conform-queue.diff:1664` — `@@ -1,13 +1,15 @@`; the old type import is removed at `:1666`, but the operative moved import text is not present.
- **Old form sweep:** Pattern `import type \{ StoredEntry \} from '@src/core'`, case-sensitive and case-insensitive, over the named package paths: no hit.
- **Report reading:** `conform-queue-report.md:16` says the violation disappeared because `queue-obj-5` removed `entryOf`, the type's only consumer. The current import block matches that statement.
- **Proof reading:** Placement row; the old import sweep agrees. The exact requested move was not performed because the import became unused.

**queue-obj-5**
- **Site now:** `tests/setup.ts:18-30` declares `StubStoreOptions` and `StubStoreResult`; `:33-49` declares `QUEUE_EVENTS` and `QueueEvent`; `:71-92` implements `createStubStore`; `:110-116` implements `createStoredEntry`; `:136-140` implements `createDriverQueueStore`. `tests/src/core/Queue.test.ts:536-570` and later sites use the shared stub.
- **Diff at the site:** Shared-helper hunk `conform-queue.diff:669` — `@@ -4,5 +4,137 @@`; fixture-removal hunk `:870` — `@@ -307,30 +311,10 @@`; representative routing hunks are `:905`, `:917`, `:977`, `:1051`, `:1073`, `:1095`, `:1276`, `:1292`, `:1314`, `:1334`, `:1354`, `:1375`, `:1397`, `:1426`, `:1442`, `:1460`, and `:1476`. The `createStubStore`, `createStoredEntry`, and `createDriverQueueStore` text is present in `+` lines.
- **Old form sweep:** Patterns `failingSaveStore|entryOf|memoryStore|const store: QueueStoreInterface<`, including case-insensitive inflections, over `src`, `tests`, `guides/queue.md`, `guides/README.md`, and `README.md`: no hits.
- **Report reading:** `conform-queue-report.md:18` says the shared factories and event table were added, local factories removed, all inline literals routed, and setup tests rewritten. The tree matches.
- **Proof reading:** The named control exists:
  - Red: `npm --prefix /home/user/fleet/queue run test:setup`; `Tests 2 failed | 5 passed (7)` in `queue-obj-5-setup-red.txt:51`.
  - Green: the same command; `Tests 7 passed (7)` in `queue-obj-5-setup-green.txt:10`.
  - The control files match the report.

**queue-obj-6**
- **Site now:** `tests/src/core/stores/DatabaseQueueStore.test.ts:15` names `src/core/stores/DatabaseQueueStore.ts`; `:16-20` supplies context.
- **Diff at the site:** `conform-queue.diff:1502` — `@@ -11,26 +9,16 @@ import {`; the corrected path is present at `conform-queue.diff:1528`.
- **Old form sweep:** Pattern `workers/stores|src/core/workers`, case-insensitive, over the named package paths: no hit.
- **Report reading:** `conform-queue-report.md:21` says the header names the real path and the `workers/` sweep is empty. The tree matches.
- **Proof reading:** Placement/documentation row; the sweep agrees.

**queue-subj-1**
- **Site now:** `src/core/types.ts:62-78`, `:181-191`, `:204-209`, and `:275-277`; `src/core/factories.ts:21-22`; `src/core/stores/DatabaseQueueStore.ts:15-18` contain no numbered `AGENTS` citations.
- **Diff at the site:** Type hunks are `conform-queue.diff:369`, `:378`, `:448`, `:457`, and `:472`; factory hunk `:316`; store hunks `:347` and `:356`. The deleted citations are present in `-` lines; no numbered citation is added.
- **Old form sweep:** Pattern `AGENTS §[0-9]+|§[0-9]+`, case-insensitive, over `src`, `tests`, `guides/queue.md`, `guides/README.md`, and `README.md`: no hit.
- **Report reading:** `conform-queue-report.md:23` says every numbered citation was deleted while surrounding sentences remained. The tree matches.
- **Proof reading:** Documentation row; the sweep agrees.

**queue-subj-2**
- **Site now:** `guides/queue.md:24`, `:135`, `:139`, `:168`, `:174-176`, `:221`, and `:341`; `guides/README.md:4` and `:60` use named sections or plain positional-free prose.
- **Diff at the site:** Guide hunks are `conform-queue.diff:101`, `:192`, `:211`, `:220`, `:262`, and `:289`; the exact named references appear in `+` lines.
- **Old form sweep:** Pattern `AGENTS §[0-9]+|§[0-9]+`, case-insensitive, over `src`, `tests`, `guides/queue.md`, `guides/README.md`, and `README.md`: no hit.
- **Report reading:** `conform-queue-report.md:26` says numbered citations were replaced with named sections and the See-also lines rewritten. The tree matches.
- **Proof reading:** Documentation row; the sweep agrees.

**queue-subj-3**
- **Site now:** `tests/src/core/Queue.test.ts:18`, `:1382`, and `:1387`; `tests/src/core/stores/DatabaseQueueStore.test.ts:19`; `tests/src/core/stores/MemoryQueueStore.test.ts:10-11` use named sections or no citation.
- **Diff at the site:** Queue hunks `conform-queue.diff:820` and `:1127`; database hunk `:1502`; memory hunk `:1664` and `:1685`. The replacement citations and deletion appear in `+` lines.
- **Old form sweep:** Pattern `AGENTS §[0-9]+|§[0-9]+`, case-insensitive, over `src`, `tests`, `guides/queue.md`, `guides/README.md`, and `README.md`: no hit.
- **Report reading:** `conform-queue-report.md:29` gives the named replacements and deletion. The tree matches.
- **Proof reading:** Documentation row; the sweep agrees.

**queue-subj-4**
- **Site now:** `guides/README.md:20-27` describes every other guide without a count. Runtime mirrors are listed at `:30-46`; development mirrors are listed at `:48-54`. The concept and directory tables remain at `:7-15`.
- **Diff at the site:** `conform-queue.diff:29` — `@@ -16,37 +17,44 @@`; the mirror statement and local links are present in `+` lines `:49-54`, `:60-89`.
- **Old form sweep:** Pattern `Two guides|two guides|GitHub-only dependency reference`, case-insensitive, over `guides/README.md`: no hit.
- **Report reading:** `conform-queue-report.md:32` says the vendored section covers every mirror and the concept and directory tables were unchanged. The tree matches.
- **Proof reading:** Documentation row; the sweep agrees.

**queue-subj-5**
- **Site now:** `guides/queue.md:58-60` uses noun phrases for factory rows; `:121-122` uses noun phrases for helper rows.
- **Diff at the site:** `conform-queue.diff:141` — `@@ -48,15 +49,15 @@`; `:174` — `@@ -113,12 +114,12 @@`; exact noun-phrase replacements are in `+` lines.
- **Old form sweep:** Pattern `^Create |^Read one|^Check one`, case-insensitive, over `guides/queue.md`: no hit.
- **Report reading:** `conform-queue-report.md:35` says the five rows were recast and no other table content changed. The tree matches.
- **Proof reading:** Documentation row; the sweep agrees.

**queue-subj-6**
- **Site now:** `guides/queue.md:130-131`, `:217`, `:221`, `:288`, and `:318`; `guides/README.md:22` contain the replacements.
- **Diff at the site:** Hunks `conform-queue.diff:192`, `:248`, `:262`, `:271`, `:280`, and `:289`; the operative replacements appear in `+` lines.
- **Old form sweep:** Pattern `\b(should|via|above|below|just)\b`, case-insensitive, over `guides/queue.md`, `guides/README.md`, and `README.md`: no hit.
- **Report reading:** `conform-queue-report.md:38` says all confirmed terms were removed, including `guides/queue.md:181`. The scoped tree matches.
- **Proof reading:** Documentation row; the sweep agrees.

**queue-subj-7**
- **Site now:** `guides/queue.md:117` names `readOption` and `validateOption`; `:155` names both store classes and their listed methods; `:182` calls the surface small without a count.
- **Diff at the site:** Hunks `conform-queue.diff:174`, `:211`, and `:220`; exact replacements appear in `+` lines.
- **Old form sweep:** Pattern `Two option leaves|Two classes|four-method|four methods`, case-insensitive, over the named package paths: the old guide forms are absent. An unrelated `four-method` remains at `tests/src/core/stores/MemoryQueueStore.test.ts:12`.
- **Report reading:** `conform-queue-report.md:41` says the three guide tallies were removed and member-naming `both` was retained. The tree matches the report.
- **Proof reading:** Documentation row; scoped guide sweep agrees.

**queue-subj-8**
- **Site now:** `guides/queue.md:7-9` begins with the worker-loop fact; `:29-31` states the omitted features directly.
- **Diff at the site:** `conform-queue.diff:101` — `@@ -4,30 +4,31 @@`; both aphoristic clauses are removed and the concrete text is present in `+` lines.
- **Old form sweep:** Pattern `load-bearing|de-bloated|the cuts are the design`, case-insensitive, over the named package paths: `tests/src/core/Queue.test.ts:756` still contains `load-bearing`; `README.md:15` still contains `de-bloated`. The exact guide sentences are absent.
- **Report reading:** `conform-queue-report.md:44` says both sentences were deleted and their facts retained. The guide matches.
- **Proof reading:** Documentation row; the exact guide-form sweep agrees.

**queue-subj-9**
- **Site now:** `src/core/Queue.ts:141` reads `@throws {QueueError} Thrown synchronously when an option is inaccessible or invalid.`
- **Diff at the site:** `conform-queue.diff:303` — `@@ -138,7 +138,7 @@`; the exact replacement is at `:309`.
- **Old form sweep:** Pattern `Synchronously when an option is inaccessible or invalid`, case-insensitive, over the named package paths: no hit.
- **Report reading:** `conform-queue-report.md:47` says the `enqueue` tag uses the fixed `Thrown synchronously` form. The tree matches.
- **Proof reading:** Documentation row; the sweep agrees.

**queue-subj-10**
- **Site now:** `src/core/types.ts:147`, `:173-178`; `src/core/factories.ts:26-28` use `Default:`. The entry-option retry and timeout bullets at `types.ts:149-151` remain override descriptions without defaults.
- **Diff at the site:** `conform-queue.diff:423` and `:316`; exact `Default:` text appears in `+` lines.
- **Old form sweep:** Pattern `defaults to|default \`[0-9]+\`|default zero`, case-insensitive, over `src`, `tests`, `guides/queue.md`, `guides/README.md`, and `README.md`: no old-form hit.
- **Report reading:** `conform-queue-report.md:50` says defaults were restated and entry-option bullets were left untouched. The tree matches.
- **Proof reading:** Documentation row; the sweep agrees.

**queue-subj-11**
- **Site now:** `src/core/types.ts:75`, `:182`, `:209`, `:276`; `src/core/factories.ts:87` use `through`, `for example`, no `just`, and `preceding`.
- **Diff at the site:** Type hunks `conform-queue.diff:378`, `:423`, `:457`, `:472`; factory hunk `:334`. Replacements appear in `+` lines.
- **Old form sweep:** Pattern `\b(via|e\.g\.|i\.e\.|just|above)\b`, case-insensitive, over `src`, `tests`, `guides/queue.md`, `guides/README.md`, and `README.md`: no targeted old-form hit. Comparative `above` remains at `src/core/types.ts:221`.
- **Report reading:** `conform-queue-report.md:53` says the vocabulary replacements and `above`→`preceding` were applied while comparative `above` stayed. The tree matches.
- **Proof reading:** Documentation row; the sweep agrees.

**queue-subj-12**
- **Site now:** `src/core/types.ts:275-277`, `src/core/stores/DatabaseQueueStore.ts:5-18`, `tests/src/core/stores/DatabaseQueueStore.test.ts:16`, and `tests/src/core/stores/MemoryQueueStore.test.ts:7-11` use `@orkestrel/database`.
- **Diff at the site:** Hunks `conform-queue.diff:347`, `:472`, `:1502`, and `:1664`; the singular dependency token appears in `+` lines.
- **Old form sweep:** Pattern `\bdatabases\b`, case-insensitive, over the named package paths: no hit.
- **Report reading:** `conform-queue-report.md:56` says the token was corrected in both documentation blocks and both test comments. The tree matches.
- **Proof reading:** Documentation/naming row; the sweep agrees.

**queue-subj-13**
- **Site now:** `src/core/types.ts:114` declares `QueueContext`; `:138-141` types the handler parameter as `context: QueueContext`. `guides/queue.md:75-76`, `:52`, `:217`, `:288`, and `:318` use `QueueContext` and `context`. `tests/src/core/Queue.test.ts:1`, `:137`, `:170`, `:605`, `:655`, `:827`, `:833`, `:846`, `:863`, `:1001`, and `:1265` use the renamed type or binding.
- **Diff at the site:** Type hunk `conform-queue.diff:397` changes the declaration; hunk `:406` changes the handler parameter. Test hunks `:813`, `:845`, `:858`, `:993`, `:1011`, `:1022`, `:1033`, and `:1116` carry the consumer changes. Guide hunks `:141`, `:163`, `:248`, `:271`, and `:280` carry the prose changes.
- **Old form sweep:** Pattern `\bQueueExecution\b|\bqueueexecution(s|ed|ing)?\b`, case-insensitive, over the package's source, tests, guide files, and README: no hit.
- **Report reading:** `conform-queue-report.md:59` marks this as breaking and says the guide, test import, annotations, bindings, and consumer patches were updated. The package tree matches; consumer trees still contain the old name as listed under Breaking.
- **Proof reading:** Naming row; package sweep agrees. External consumer sweep is listed below.

**queue-subj-14**
- **Site now:** `tests/guides.test.ts:2-4` names `FENCE_LANGUAGES`, `EXAMPLE_LANGUAGE`, `MODULES`, `INTERNAL`, and `ROOT_FILES`.
- **Diff at the site:** `conform-queue.diff:487` — `@@ -1,6 +1,7 @@`; the replacement header is present at `:491-493`.
- **Old form sweep:** Pattern `four constants below`, case-insensitive, over `tests/guides.test.ts`: no hit. The unrelated phrase `below` remains at `tests/guides.test.ts:47`.
- **Report reading:** `conform-queue-report.md:62` says the header names five constants and line 1 stayed unchanged. The tree matches.
- **Proof reading:** Documentation row; exact old header sweep agrees.

**fleet-F1**
- **Site now:** `tests/setup.ts` has no `isBrowserVuePath`; `tests/setup.test.ts` has no such import or suite. No browser paths were found.
- **Diff at the site:** No matching hunk; no edit was made for this id.
- **Old form sweep:** Pattern `isBrowserVuePath`, case-insensitive, over `src`, `tests`, `guides/queue.md`, `guides/README.md`, and `README.md`: no hit.
- **Report reading:** `conform-queue-report.md:30-34` records `noop`, no browser environment, and no helper. The tree matches.
- **Proof reading:** Placement row; the sweep agrees.

**fleet-F2**
- **Site now:** `src/core/Queue.ts:41-70` begins with `#` fields; `DatabaseQueueStore.ts:31`, `MemoryQueueStore.ts:24`, and `errors.ts:13-15` contain no public `readonly id: string` class field.
- **Diff at the site:** No matching hunk; no edit was made for this id.
- **Old form sweep:** Pattern `readonly id: string` in implementation-class declarations, over `src`: no matching class field.
- **Report reading:** `conform-queue-report.md:35-37` records `noop` after reading the implementation classes. The tree matches.
- **Proof reading:** Placement row; the class-shape sweep agrees.

### Across the unit

#### Scope

The current `git status --short` output matches `conform-queue.status:1-13`. Every changed path is `owned` under `conform-queue-brief.md:31-39`:

`README.md`, `guides/README.md`, `guides/queue.md`, `src/core/Queue.ts`, `src/core/factories.ts`, `src/core/stores/DatabaseQueueStore.ts`, `src/core/types.ts`, `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/Queue.test.ts`, `tests/src/core/stores/DatabaseQueueStore.test.ts`, and `tests/src/core/stores/MemoryQueueStore.test.ts`.

Shared paths changed: none. Off-limits paths changed: none. Diff hunks without a row-owned `Where`: none.

#### Residue

The `+`-line sweep over `conform-queue.diff` used:

`^\+[^+].*(\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger)` with case-insensitive matching.

Hits, all legitimate queue/test vocabulary rather than skip/only/todo/debug residue:

- `conform-queue.diff:77-78` — added `timeout.md` dependency-guide lines.
- `:146`, `:157`, `:169-170`, `:235`, `:239`, `:253`, `:285`, `:329-330`, `:437` — guide or TSDoc timeout/retry terms.
- `:603`, `:735`, `:912`, `:937`, `:1065`, `:1087`, `:1205`, `:1329`, `:1349` — scripted retry or rejection cases.
- `:657`, `:704`, `:950` — event-name or timeout-comment lines.

No added `.skip(`, `.only(`, `.todo(`, `TODO`, `FIXME`, `console.`, or `debugger` hit occurred.

The tree sweep used the same pattern over `src/**/*.ts` and `tests/**/*.ts`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`.

- `src/core/Queue.ts`: `4, 17, 44, 95-100, 107, 139, 159, 166-167, 180, 580, 586, 598, 697, 704-705, 733, 749`.
- `src/core/factories.ts`: `13, 22, 27-28, 39`.
- `src/core/types.ts`: `18, 30, 94, 123, 128, 149-150, 153, 157, 163, 171, 177, 196`.
- `src/core/validators.ts`: `3, 22, 38`.
- `tests/src/core/Queue.test.ts`: `19, 25, 131-135, 146, 152, 385, 594, 651, 668, 672, 848, 938, 989-991, 996-997, 1000, 1015-1016, 1026, 1365-1366, 1371, 1385, 1404, 1559, 1567, 1573, 1598, 1602, 1615, 1658, 1673-1676, 1697, 1712, 1723-1724, 1768, 1776, 1779, 1783, 1791, 1794, 1797, 1800, 2035-2036, 2046`.
- `tests/setup.ts`: `36`.
- `tests/src/core/helpers.test.ts`: `18`.

#### Parity

| Entity | Type/interface members | Guide parity |
|---|---|---|
| `QueueInterface` | readonly `emitter`, `count`, `active`, `paused`, `stopped` at `src/core/types.ts:218-225`; methods `enqueue`, `restore`, `start`, `stop`, `pause`, `resume`, `abort`, `clear`, `destroy` at `:227-243` | Surface row `guides/queue.md:79`; methods `:143-151` |
| `QueueStoreInterface` | methods `save`, `remove`, `load`, `clear` at `src/core/types.ts:289-292` | Surface row `guides/queue.md:86`; methods `:159-162` |
| `QueueContext` | readonly `id`, `signal` at `src/core/types.ts:122-124` | Surface row `guides/queue.md:75` |
| `QueueHandler` | call signature `(input, context)` at `src/core/types.ts:138-141` | Type row `guides/queue.md:76` |
| `QueueEntryOptions` | readonly `id`, `retries`, `timeout`, `signal` at `src/core/types.ts:161-164` | Type row `guides/queue.md:77` |
| `QueueOptions` | readonly `on`, `error`, `handler`, `concurrency`, `retries`, `timeout`, `store` at `src/core/types.ts:190-196` | Type row `guides/queue.md:78` |
| `QueueEventMap` | `enqueue`, `start`, `retry`, `success`, `failure`, `abort`, `drain` at `src/core/types.ts:90-100` | Type row `guides/queue.md:80` |
| `StoredEntry` | readonly `id`, `input`, `attempts` at `src/core/types.ts:263-265` | Type row `guides/queue.md:85` |
| `QueueStoreInterface` implementations | `DatabaseQueueStore.save/remove/load/clear` at `src/core/stores/DatabaseQueueStore.ts:47-63`; `MemoryQueueStore.save/remove/load/clear` at `src/core/stores/MemoryQueueStore.ts:38-90` | `guides/queue.md:159-162` |

The added guide sentences use these queue exports: `createQueue`, `createDatabaseQueueStore`, `createMemoryQueueStore`, `Queue`, `QueueError`, `MemoryQueueStore`, `DatabaseQueueStore`, `QueueContext`, `QueueHandler`, `QueueEntryOptions`, `QueueOptions`, `QueueInterface`, `QueueEventMap`, `QueueCode`, `QueueOption`, `QueueErrorContext`, `QueueErrorOptions`, `StoredEntry`, `QueueStoreInterface`, `readOption`, and `validateOption`. The barrel `src/core/index.ts:1-8` reaches each through its star exports.

The guide also contains non-queue identifiers and references: `@orkestrel/database`, `DriverInterface`, `Emitter`, `EmitterHooks`, `AbortSignal`, `TableInterface`, `AGENTS.md`, and rule-file paths. These are dependency, platform, or documentation references, not queue-barrel exports.

#### Gates

The report records these lines in `conform-queue-report.md:111-123`:

- `npm --prefix /home/user/fleet/queue run format:check` — exit `0`; `gate-format-check.txt:1-8`.
- `npm --prefix /home/user/fleet/queue run lint:check` — exit `0`; `gate-lint-check.txt:1-4`.
- `npm --prefix /home/user/fleet/queue run check` — exit `0`; `gate-check.txt:1-9`.
- `npm --prefix /home/user/fleet/queue run build` — exit `0`; `gate-build.txt:1-34`.
- `npm --prefix /home/user/fleet/queue test` — exit `0`; `gate-test.txt:1-70`.
- `cd /home/user/fleet/queue && npx scaffold audit --offline` — exit `0`; `scaffold-audit.txt:1`.

The independent gate reading remains not established by this read-only pass; the stored gate artifacts are the writer's readings.

#### Breaking

The report states at `conform-queue-report.md:145-149` that `queue-subj-13` renames published `QueueExecution` to `QueueContext`, renames the handler binding to `context`, adds no compatibility alias, and requires consumer updates.

The external word-boundary sweep used:

`rg -n --glob '!node_modules/**' --glob '!queue/**' --glob '!guides/queue.md' '\bQueueExecution\b' /home/user/fleet/*/src /home/user/fleet/*/tests /home/user/scaffold/src`

Hits:

- `/home/user/fleet/agent/src/core/helpers.ts:14,253`
- `/home/user/fleet/worker/src/core/types.ts:3,44`
- `/home/user/fleet/worker/src/core/Worker.ts:2,153`
- `/home/user/fleet/worker/src/server/types.ts:2,101`
- `/home/user/fleet/worker/src/server/Dispatch.ts:1,22,38`
- `/home/user/fleet/worker/src/server/helpers.ts:1,73`
- `/home/user/fleet/worker/src/server/NodeWorker.ts:3,65`
- `/home/user/fleet/workflow/src/core/Runner.ts:4,356`

No hits occurred in `/home/user/scaffold/src` or consumer test trees.

#### Writing sweep

The added-prose sweep used:

`\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`

and:

`\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`

over added lines in `guides/**`, `README.md`, source doc comments, and test titles/comments. Both patterns returned no hits.

## Distillate

queue-obj-1: `README.md:27-28` corrected runtime/build claims | diff present yes | old form hits 0 exact, related `ESM-only` at `tests/distribution.test.ts:60` | report matches yes  
queue-obj-2: `README.md:27` matches `package.json:97` | diff present yes | old form hits 0 | report matches yes  
queue-obj-3: `tests/guides.test.ts:189-220` runs guide fences | diff present yes | old form hits 0 | report matches yes  
queue-obj-4: former type-import site deleted; imports at `MemoryQueueStore.test.ts:1-4` are value-only | diff present yes, exact move text absent | old form hits 0 | report matches yes  
queue-obj-5: shared fixtures at `tests/setup.ts:18-140`; consumers routed | diff present yes | old form hits 0 | report matches yes  
queue-obj-6: `DatabaseQueueStore.test.ts:15` names the real path | diff present yes | old form hits 0 | report matches yes  
queue-subj-1: numbered citations removed from cited source doc blocks | diff present yes | old form hits 0 | report matches yes  
queue-subj-2: named plain rule references at cited guide lines | diff present yes | old form hits 0 | report matches yes  
queue-subj-3: named citations or deletions at cited test comments | diff present yes | old form hits 0 | report matches yes  
queue-subj-4: guide mirror inventory at `guides/README.md:20-54` | diff present yes | old form hits 0 | report matches yes  
queue-subj-5: noun-phrase Surface summaries at `guides/queue.md:58-60,121-122` | diff present yes | old form hits 0 | report matches yes  
queue-subj-6: banned guide vocabulary removed at cited sites | diff present yes | old form hits 0 in scoped guide prose | report matches yes  
queue-subj-7: guide count phrases removed at `:117,155,182` | diff present yes | old guide-form hits 0; unrelated `four-method` at `MemoryQueueStore.test.ts:12` | report matches yes  
queue-subj-8: guide aphorisms removed at `:7` and `:29` | diff present yes | old tokens remain elsewhere at `Queue.test.ts:756` and `README.md:15` | report matches yes  
queue-subj-9: fixed `@throws` wording at `Queue.ts:141` | diff present yes | old form hits 0 | report matches yes  
queue-subj-10: fixed defaults at `types.ts:147,173-178` and `factories.ts:26-28` | diff present yes | old form hits 0 | report matches yes  
queue-subj-11: `through`, `for example`, and `preceding` replacements present | diff present yes | old targeted forms 0; comparative `above` remains at `types.ts:221` | report matches yes  
queue-subj-12: `@orkestrel/database` used in source and test prose | diff present yes | old form hits 0 | report matches yes  
queue-subj-13: `QueueContext` and `context` used in package | diff present yes | package old-name hits 0 | report matches yes  
queue-subj-14: five named constants at `tests/guides.test.ts:2-4` | diff present yes | old header phrase hits 0 | report matches yes  
fleet-F1: helper and browser paths absent | diff present no | old-name hits 0 | report matches yes  
fleet-F2: no public `readonly id: string` implementation field | diff present no | matching class-shape hits 0 | report matches yes  

Scope tags: all status paths are `owned`; shared and off-limits changes: none.

Residue: no added debug or skip controls; legitimate retry/timeout hits are listed above. Tree residue is limited to the cited `src` and non-vendored `tests` lines.

Writing hits: none for either prohibited-vocabulary or growable-count pattern.

Parity: `QueueInterface` methods `enqueue`, `restore`, `start`, `stop`, `pause`, `resume`, `abort`, `clear`, `destroy` match `guides/queue.md:143-151`; `QueueStoreInterface` methods `save`, `remove`, `load`, `clear` match `:159-162`. Readonly data properties and all renamed exports are represented by the cited Surface and Types rows.

## Unknowns

- The historical baseline claims and the writer's exact mutation-and-restore process cannot be independently reproduced without changing the tree; the supplied control logs were read.
- The stored gate results are evidence of the writer's runs, not an independent post-return gate execution.
- The external consumers still contain `QueueExecution`; their required patches are recorded in the report but were not applied in this package tree.

## Journal

[Leave this line for the driver.]

## Deviation

The containment check showed no tree change outside the thirteen status paths listed in `conform-queue.status:1-13`; direct `git status --short` matched that file. `git diff --check` returned no output. All named briefs, reports, evidence logs, source files, guide files, and status files were readable. No required sweep was unreachable.