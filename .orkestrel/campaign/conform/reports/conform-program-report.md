# Unit conform-program — report

Every row is `applied` except `program-obj-9` (`noop`, EXEMPT as the refuter ruled) and
`fleet-F2` (`noop`, the shape the row fires on is absent). The gate chain is green, and
`git status --short` lists only files under Owned.

## Consumer edits taken

The addendum's edits were applied first. The baseline `npm run check` was already red on
exactly this surface — `/home/user/work/evidence/program-proofs/baseline-check.txt`
(exit 2, 24 diagnostics naming `logicalPremises`, `qualificationDefinition`,
`rulingDefinition`, `lineDefinition`, `ratingDefinition`, and `SurfaceSymbol.kind`).
After the three items, `npm run check` exits 0 —
`/home/user/work/evidence/program-proofs/addendum-check.txt`.

| Item | Edit | Sites now |
| --- | --- | --- |
| 1 | `logicalPremises` → `ruleToPremises` | `src/core/helpers.ts:34` (import), `:220` (`@remarks` link), `:259` (call); `guides/program.md:276` (Helpers prose) |
| 1 | `qualificationDefinition` → `createQualificationDefinition` | `tests/setup.ts:20`, `tests/setup.test.ts:23`, `tests/guides.test.ts:8`, `tests/src/core/factories.test.ts:4`, `tests/src/core/helpers.test.ts:66`, `tests/src/core/validators.test.ts:34`, `tests/src/core/programs/Program.test.ts:64`, `tests/src/core/programs/ProgramManager.test.ts:14`, plus every call site in those files; `README.md:31,50`; `guides/program.md:38,57,770,786,874` |
| 1 | `rulingDefinition` → `createRuling` | same import lines as the preceding row plus every call site; `README.md:31,56`; `guides/program.md:38,63,792,821,832,890` |
| 1 | `RuleResult.conclusion` drop | `noop` — no fixture carries a `RuleResult`. Every `conclusion` in this package reads `LogicalResult.conclusion`, which the staged reason still declares (`tests/setup.ts:187`, `tests/setup.test.ts:127,132,676,717`, `tests/src/core/helpers.test.ts:791`) |
| 2 | `lineDefinition` → `buildLineDefinition` | `tests/setup.ts:21`, `tests/src/core/helpers.test.ts:37`, `tests/src/core/factories.test.ts:5`, `tests/src/core/programs/Program.test.ts:4`, `tests/guides.test.ts:9`, plus every call site; `README.md:32,63`; `guides/program.md:39,70,800` |
| 2 | `ratingDefinition` → `buildRatingDefinition` | same import lines plus `tests/src/core/validators.test.ts:35`, plus every call site; `README.md:32,71`; `guides/program.md:39,78,798` |
| 3 | `symbol.kind` → `symbol.keyword` | `tests/guides.test.ts:133` |

Every affected named-import list was re-sorted. The vendored `guides/<dep>.md` mirrors
were not touched.

## Rows

| Row | Disposition | Evidence |
| --- | --- | --- |
| program-obj-1 | applied | `tests/setup.ts:81` declares `class RecordingReason implements RecordingEngineInterface` beside `FixedReason`; `createRecordingEngine` at `:481` is `return new RecordingReason(options)`. The nested `function reason` is gone. `isArray<Subject>` from `@orkestrel/contract` narrows the overload implementation (closes the `program-obj-7` clause the repair names). `tests/setup.test.ts` `createRecordingEngine` assertions are unchanged. |
| program-obj-2 | applied | `tests/setup.ts:508-528` — the `const record = …` arrow is gone and each of the `program.emitter.on` subscriptions pushes its own name inline. `tests/setup.test.ts` `recordEvents` cases unchanged. |
| program-obj-3 | applied | `tests/guides.test.ts:206-260` adds `describe('flagship fences')` beside the parity suite: one executed case transcribing the Surface fence and continuing into the batch fence against `@src/core`, plus a presence guard per fence in the form `/home/user/fleet/sse/tests/guides.test.ts` uses. Every existing parity assertion is untouched. |
| program-obj-4 | applied | Every hand-rolled `let error: unknown; try { … expect.unreachable(…) } catch` block is replaced by `captureError`. `captureError` imported into `tests/src/core/programs/ProgramManager.test.ts:6`, `tests/src/core/factories.test.ts:7`, `tests/src/core/helpers.test.ts:5`; already present in `Program.test.ts:15`. `factories.test.ts:30` keeps its `toSatisfy` predicate; `Program.test.ts:410` moves `JSON.parse('"subject"')` inside the thunk. The `try { … } finally { destroy() }` cleanup blocks in `tests/setup.test.ts` are untouched. Sweep: `grep -rn "let error: unknown\|expect.unreachable" tests/src tests/setup.ts tests/setup.test.ts` returns nothing. |
| program-obj-5 | applied | Moved into `tests/setup.ts` as `class OffContractValidationResult` (`:353`), `class OffContractQualifier` (`:367`), `class OffContractReason` (`:388`) with factories `createOffContractValidationResult` (`:472`), `createOffContractQualifier` (`:476`), `createOffContractReason` (`:480`), plus `buildQualificationResult` (`:484`) and `buildStandardProgramDefinition` (`:604`). `helpers.test.ts` and `ProgramManager.test.ts` declare none of them and import the new names. `FixedReason` was not merged into `OffContractReason`, as the refuter ruled. |
| program-obj-6 | applied | `tests/src/core/factories.test.ts:97-108` — `it('defaults validate to true')` now builds `buildProgramDefinition('', '', standardQualification, standardRating)`, asserts `captureError(() => validating.add(definition))` matches `{ code: 'DEFINITION' }`, then asserts `permissive.add(definition).id === ''`, destroying both managers. `it('seeds programs from options')` unchanged. |
| program-obj-8 | applied | `isBrowserVuePath` deleted from `tests/setup.ts` with its doc comment; `describe('isBrowserVuePath')` and the import entry deleted from `tests/setup.test.ts`. Sweep: `grep -rn isBrowserVuePath` over the checkout excluding `node_modules` returns nothing. |
| program-obj-9 | noop (EXEMPT) | No change, as the refuter ruled. The collapse is a documented limit at `src/core/helpers.ts:601-605` (`@remarks`) and `guides/program.md:349`. Reopening it changes `AggregateGroup.key` and `formatGroupKey`'s return type, so it needs its own breaking unit. |
| program-subj-1 | applied | The `(AGENTS §N)` parenthetical is deleted at every package-owned site: `src/core/types.ts:193,238,252,384`; `src/core/helpers.ts:127`; `src/core/programs/ProgramManager.ts:21,225`; `src/core/programs/Program.ts:165`; `guides/program.md:29,93,153,401,423`; `guides/README.md:3`. `guides/README.md:58` reads `- [`AGENTS.md`](../AGENTS.md) — the rules.` No replacement citation was added. Sweep: `grep -rn "AGENTS §"` over the package-owned files returns nothing. |
| program-subj-2 | applied (BREAKING) | `STATUS_PRECEDENCE` deleted from `src/core/constants.ts`. `src/core/helpers.ts:846` and `src/core/validators.ts:260` iterate `STATUSES`; the imports at `helpers.ts:36` and `validators.ts:35` drop it; the `{@link}` targets at `helpers.ts:832` and `validators.ts:245` retarget to `STATUSES`. The `completeTallies` literal stays. `Program.test.ts:13` and its `tallies shape` case use `STATUSES` with the same expected order. `guides/program.md` drops the Constants row, rewrites the Constants prose, changes the `isTallies` sentence, and deletes the Status-section sentence. Consequence: `Status` became an unused type import in `constants.ts` — oxlint reported it (`src/core/constants.ts:1:25 eslint(no-unused-vars)`), so the import was narrowed to `Decision` and the `{@link Status}` reference stays, matching the package's existing unimported-link usage (`helpers.ts:935` links `Program`). |
| program-subj-3 | applied (BREAKING) | `buildNotices` → `buildNoticeDeterminations` and `buildLimits` → `buildLimitDeterminations` in `src/core/helpers.ts` (declaration, first sentence, and `@example`). `buildNotice` unchanged. Updated: `Program.ts:39-40` (import), `:281`, `:299`, `:409`; `helpers.test.ts` import and every call and `describe` title; `guides/program.md:286-287`. `buildNotices` was not reintroduced under any meaning. |
| program-subj-4 | applied (BREAKING) | `src/core/types.ts:387` is `readonly count: number`; `src/core/programs/ProgramManager.ts:118` is `get count(): number`. Every test site updated (`factories.test.ts:96,104`; `ProgramManager.test.ts:24,31,101,129,137,162,168,182,314`). Two test titles that named `size` in prose were reworded to `count` — recorded as an ancillary decision. |
| program-subj-5 | applied | `src/core/errors.ts:44` reads "Determines whether a caught value is a {@link ProgramError}." Nothing else changed. Sweep: `grep -rn "Checks whether" src` returns nothing. |
| program-subj-6 | applied | Every member of `ProgramInterface` (`src/core/types.ts:242-352`) and `ProgramManagerInterface` (`:386-556`) carries a complete block, mirrored on `Program.ts` (`:86-91` data fields, `:150`, `:168`, `:196`, `:224`, `:249`) and `ProgramManager.ts` (`:76`, `:92`, `:111`, `:136`, `:155`, `:181`, `:225`, `:249`, `:266`, `:292`). Shape follows the qualifier's: third-person first sentence, `@remarks` for guide-stated behaviour, one `@param` per parameter, `@returns`, a `@throws {@link ProgramError}` row per code the member raises, and one `@example` importing from `'@orkestrel/program'`. Readonly data members take single-sentence blocks; `ProgramManagerInterface.count` additionally carries its `DESTROYED` `@throws`, because the rule the row cites requires the failure behaviour wherever the symbol has one. The overload notes stay in the `//` comments at `Program.ts:167` and `ProgramManager.ts:225`, stripped of their citation. |
| program-subj-7 | applied | `guides/program.md:151` Shape cell reads `` `emitter` / `count` + `has` / `program` / `programs` / `add` / `remove` / `destroy`. `` — `count` because program-subj-4 lands in the same campaign. |
| program-subj-8 | applied | `guides/program.md:316` — `assertProgramDefinition,` is the first entry of the import block, before `assertProgramSubject,`. The guides suite's `imports only real exports in every ts fence` case passes, so the name resolves. |
| program-subj-9 | applied | `README.md:24` reads `- Node.js >= 22.12.0`, matching `package.json` `engines.node`. `package.json` was not edited. |
| program-subj-10 | applied | `src/core/helpers.ts:185-186` "Resolves authored {@link Notice} values into unconditionally-applied `notice` {@link Determination} values."; `:219` "…into `limit` {@link Determination} values."; `:223` "…are plain {@link LogicalDefinition} definitions with no program-authored ruling map…"; `src/core/programs/ProgramManager.ts:21` "Manages compiled {@link ProgramInterface} programs in order…"; `guides/program.md:138` "batch sums (`FieldPath` values)"; `src/core/helpers.ts:982` "The message template, carrying optional `{{token}}` placeholders". |
| program-subj-11 | applied | `src/core/helpers.ts:810` "@returns A record carrying every {@link Status}"; `src/core/validators.ts:338` "checks the program-owned members directly"; `guides/program.md:171` "The reserved keys exist only for composed program execution"; `:533` "(a decision gate, listed later)"; `:553` "A `decision` is present only when every gate holds:". `both` at `guides/program.md:176` left alone — the sentence names its members. Sweeps recorded in § Sweeps. |
| program-subj-12 | applied | `README.md:25` "…CommonJS (`require`) through the `exports` field"; `guides/program.md:704` "exact shape through `isProgramDefinition`…"; `tests/src/core/helpers.test.ts:1046` "…through real qualification"; `tests/setup.ts:1024` "OWN keys through JSON parsing". Sweep: `grep -rniE "\bvia\b"` over the package-owned population returns nothing. |
| program-subj-13 | applied (BREAKING) | `by` → `partition` on `AggregateInput` (`src/core/types.ts:51`) and `AggregateDefinition` (`:92`), with the `@remarks` at `:46` and `:62` rewritten. Renamed the parameter and every read in `src/core/helpers.ts` (`:568`, `:602`, `:607-618`, `:689-691`, `:707-711`, `:731`, `:746-751`, `:1005`, `:1012`, `:1021`), the key and optional list in `isAggregateDefinition` (`src/core/validators.ts:112-115`), and the reads at `Program.ts:373` and `:379`. Tests: `setup.ts:781`, `setup.test.ts:726,735`, `Program.test.ts:911,931`, `validators.test.ts:128`, `helpers.test.ts:634,1096`. Guide: `:135`, `:138`, `:260`, `:360`, `:711`, `:868`. Derived by the `\bby\b` sweep over `src/**`, `tests/**`, and `guides/program.md`. |
| program-subj-14 | applied | `src/core/types.ts:217-218` "`validate` — validate the definition at construction. Default: {@link DEFAULT_PROGRAM_VALIDATE}."; `:369-370` "`validate` — validate each seeded and added definition at construction. Default: {@link DEFAULT_PROGRAM_VALIDATE}." The `@throws` rows are untouched. |
| program-subj-16 | applied (BREAKING) | `tallyProgram` → `tallySubject` at `src/core/helpers.ts:867` and in its `@example` at `:862`; import at `Program.ts:46` and call at `:381`; import at `tests/src/core/helpers.test.ts:32` and call at `:770`; row at `guides/program.md:305`. |
| fleet-F1 | applied by program-obj-8 | Folded into that row, which deletes the helper. `tests/setup.ts` has no header comment naming `isBrowserVuePath` and is not export-free, so neither of the row's other shapes fires. No second edit was made. `tests/setup.ts` stays as `setupFiles[0]`, the `setup` project stays in `vite.config.ts`, and `test:setup` stays in the `test` chain — this row removes no axis, so the stop condition does not apply. |
| fleet-F2 | noop | The shape the row fires on is absent. `Program` (`src/core/programs/Program.ts:74-89`) declares every `#` field first (`#emitter`, `#qualifier`, `#rater`, `#engine`, `#evaluator`, `#qualifierOwned`, `#raterOwned`, `#engineOwned`, `#validate`, `#labels`, `#destroyed`) and only then `readonly id` / `name` / `definition`, so no public `id` sits ahead of them. `ProgramManager` (`:38-48`) declares `#` fields only and no `id`. `ProgramError` (`src/core/errors.ts:23-41`) has no `#` field and no `id`. Classes read: `Program`, `ProgramManager`, `ProgramError`. |

## Files touched

| File | Summary |
| --- | --- |
| `/home/user/fleet/program/src/core/types.ts` | `by` → `partition`, `size` → `count`, complete TSDoc on both interfaces' members, `Default:` form, AGENTS citations deleted |
| `/home/user/fleet/program/src/core/constants.ts` | `STATUS_PRECEDENCE` deleted, `Status` type import narrowed out |
| `/home/user/fleet/program/src/core/errors.ts` | `isProgramError` opens "Determines whether" |
| `/home/user/fleet/program/src/core/helpers.ts` | `ruleToPremises`, `buildNoticeDeterminations`, `buildLimitDeterminations`, `tallySubject`, `partition`, `STATUSES`, and the pluralized-token and count prose fixes |
| `/home/user/fleet/program/src/core/validators.ts` | `isAggregateDefinition` keys `partition`, `isTallies` iterates `STATUSES`, count prose fix |
| `/home/user/fleet/program/src/core/programs/Program.ts` | renamed helper calls, `partition` reads, mirrored member TSDoc, citation stripped from the overload comment |
| `/home/user/fleet/program/src/core/programs/ProgramManager.ts` | `get count()`, mirrored member TSDoc, pluralized-token and citation fixes |
| `/home/user/fleet/program/tests/setup.ts` | `RecordingReason` class, inlined `recordEvents` pushes, the five moved fixtures, `isBrowserVuePath` deleted, dependency renames |
| `/home/user/fleet/program/tests/setup.test.ts` | proofs for the five moved exports, `isBrowserVuePath` block and import removed, dependency renames |
| `/home/user/fleet/program/tests/guides.test.ts` | `describe('flagship fences')` with executed transcriptions and presence guards, `symbol.keyword` |
| `/home/user/fleet/program/tests/src/core/helpers.test.ts` | local fixtures removed and imported, `captureError`, renamed helpers, `partition` |
| `/home/user/fleet/program/tests/src/core/factories.test.ts` | `captureError`, the rewritten `defaults validate to true` case, `manager.count` |
| `/home/user/fleet/program/tests/src/core/programs/Program.test.ts` | `captureError`, `STATUSES`, `partition`, dependency renames |
| `/home/user/fleet/program/tests/src/core/programs/ProgramManager.test.ts` | `buildStandardProgramDefinition`, `captureError`, `manager.count` |
| `/home/user/fleet/program/tests/src/core/validators.test.ts` | `partition`, dependency renames |
| `/home/user/fleet/program/guides/program.md` | Constants, Types, Surface, Helpers, Methods, Validation, Status, and fence updates for every row |
| `/home/user/fleet/program/guides/README.md` | AGENTS citations removed from the tagline and the See-also entry |
| `/home/user/fleet/program/README.md` | Node floor, `through` for `via`, dependency renames in the usage fence |

```text
 README.md                                      |  16 +-
 guides/README.md                               |   4 +-
 guides/program.md                              |  94 ++++---
 src/core/constants.ts                          |  11 +-
 src/core/errors.ts                             |   2 +-
 src/core/helpers.ts                            |  80 +++---
 src/core/programs/Program.ts                   | 144 ++++++++++-
 src/core/programs/ProgramManager.ts            | 184 ++++++++++++-
 src/core/types.ts                              | 295 +++++++++++++++++++--
 src/core/validators.ts                         |  16 +-
 tests/guides.test.ts                           |  98 ++++++-
 tests/setup.test.ts                            | 129 ++++++++--
 tests/setup.ts                                 | 340 +++++++++++++++++--------
 tests/src/core/factories.test.ts               |  90 +++----
 tests/src/core/helpers.test.ts                 | 334 ++++++++++--------------
 tests/src/core/programs/Program.test.ts        | 155 +++++------
 tests/src/core/programs/ProgramManager.test.ts | 174 +++++--------
 tests/src/core/validators.test.ts              |  10 +-
 18 files changed, 1450 insertions(+), 726 deletions(-)
```

## Failing-first controls

Each control planted the defect the row's assertion claims to catch, ran the named
command, then restored by editing and re-ran the same command. No git command discarded
anything.

| Row | Command | Red | Green |
| --- | --- | --- | --- |
| program-obj-1 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` | 1 failed, 84 passed (85) — `program-obj-1-red.txt` | 85 passed (85) — `program-obj-1-green.txt` |
| program-obj-2 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` | 1 failed, 84 passed (85) — `program-obj-2-red.txt` | 85 passed (85) — `program-obj-2-green.txt` |
| program-obj-5 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` | 1 failed, 84 passed (85) — `program-obj-5-red.txt` | 85 passed (85) — `program-obj-5-green.txt` |
| program-obj-4 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts` | 1 failed, 73 passed (74) — `program-obj-4-red.txt` | 74 passed (74) — `program-obj-4-green.txt` |
| program-obj-6 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts` | 1 failed, 6 passed (7) — `program-obj-6-red.txt` | 7 passed (7) — `program-obj-6-green.txt` |
| program-obj-3 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts` | 1 failed, 25 passed (26) — `program-obj-3-red.txt` | 26 passed (26) — `program-obj-3-green.txt` |

Every file named is under `/home/user/work/evidence/program-proofs/`.

Failing test names and the plant each one caught:

- program-obj-1 — `createRecordingEngine > counts every destroy, so a suite can prove an owned engine was released once`; plant: `RecordingReason.destroy` dropped its `#destroyCount` increment.
- program-obj-2 — `recordEvents > records every wired event name, in the order the emitter fired it`; plant: the `rate` subscription pushed `'qualify'`.
- program-obj-5 — `buildStandardProgramDefinition > names the definition after the given id and reuses the standard pair by identity`; plant: `buildStandardProgramDefinition` used the id as the name.
- program-obj-4 — `helpers > assertProgramSubject > throws RESERVED with the offending key as context`; plant: `assertProgramSubject`'s `RESERVED` branch was made unreachable. The `captureError` conversion did not weaken the assertion.
- program-obj-6 — `factories > createProgramManager > defaults validate to true`; plant: `DEFAULT_PROGRAM_VALIDATE` flipped to `false`. This is exactly the defect the old body could not catch, which is the row's finding.
- program-obj-3 — `flagship fences > carries the batch fence lines the transcription copies`; plant: the batch fence's last comment was edited to `// one`.

Not a behavioural row, so no control: program-obj-8, program-obj-9, and every `program-subj-*` row. Their proof is the sweep plus the gate chain.

## Sweeps

Population for every sweep unless stated otherwise: `src/`, `tests/setup.ts`,
`tests/setup.test.ts`, `tests/guides.test.ts`, `tests/src/`, `guides/program.md`,
`guides/README.md`, `README.md`. The vendored `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, and the
vendored `guides/<dep>.md` mirrors are outside it.

| Pattern | Result |
| --- | --- |
| `\b(STATUS_PRECEDENCE\|buildNotices\|buildLimits\|tallyProgram\|isBrowserVuePath\|buildQualification\|buildDefinition\|ScriptedQualifier\|ScriptedReason\|logicalPremises\|qualificationDefinition\|rulingDefinition\|lineDefinition\|ratingDefinition)\b` | empty |
| `(status_precedence\|buildnotices\|buildlimits\|tallyprogram\|isbrowservuepath\|scriptedqualifier\|scriptedreason\|logicalpremises)(s\|es\|ed\|ing)?` case-insensitive | empty |
| `\bby\?\|\.by\b\|[{,] by:\|symbol\.kind` | empty |
| `\.size\b` | two hits, both `Set.prototype.size` (`src/core/helpers.ts:536`, `tests/setup.test.ts:477`). Permitted — the built-in, not the renamed member. |
| `AGENTS §` | empty |
| `\bvia\b` case-insensitive | empty |
| `\b[0-9]+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b` | empty |
| `\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b` case-insensitive | ruled in the following list |
| `\babove\b\|\bbelow\b` case-insensitive | ruled in the following list |
| `\bshould\b\|\bsimply\b\|\butilize\b\|\bleverage\b\|\bcurrently\b` case-insensitive | empty |

Ruling the number-word hits: almost every hit is `one` as an article or pronoun ("one
subject", "one shared engine", "each one", "at least one line"), which names no tally,
and the `two` hits name the members of the pair the sentence is about. Two hits were
counts the change itself authored or invalidated, and both were corrected:

- `tests/guides.test.ts:2` read "The five constants below" — a count over a set this
  change added `CORE_GUIDE` to, and `below` as a document reference. It now reads "The
  constants declared next".
- `tests/setup.test.ts:643` read "so two ids never share one object" in a case this
  change authored. It now reads "so a later call never shares the first object".

Ruling the `above` / `below` hits: `src/core/…` has none; the hits at
`tests/setup.ts:916`, `tests/setup.test.ts:804`, `tests/src/core/programs/Program.test.ts:983`,
`tests/src/core/validators.test.ts:132`, `guides/program.md:877`, and `guides/program.md:901`
are the reason engine's `'above'` and `'below'` comparison operators, which
`.claude/rules/writing.md` § Code tokens does not reach.

## Sweep hits outside the rows

These are pre-existing, of the same class a row closes, and at sites no row names. They
are recorded rather than edited, so the enumerated scope stays fixed.

- `tests/setup.test.ts:465` — "matches a hand-written table of the first four subjects". A count over table rows; program-subj-11's class.
- `tests/setup.test.ts:723` — "give the property rating two lines a scope can tell apart". A count over rating lines; program-subj-11's class.
- `tests/setup.test.ts:4` — "Each contract below is asserted against…". A document reference using `below`; the class program-subj-11's evidence noted at `guides/program.md:536`.
- `tests/guides.test.ts:48` — "the second assertion below fails when a name…". Same class.
- `guides/program.md:932` — "as shown above — matching the engine `Program` creates…". Same class.

## Breaking

Consumers: none. `"@orkestrel/program"` appears in no other `package.json` under
`/home/user/fleet`, so no fleet consumer re-pins and no consumer-side edit is owed. The
published surface changes are:

| Removed or renamed | Replacement |
| --- | --- |
| `STATUS_PRECEDENCE` (const) | `STATUSES`, which carries the same literals in the same order |
| `ProgramManagerInterface.size` | `ProgramManagerInterface.count` |
| `AggregateInput.by`, `AggregateDefinition.by` | `partition` on each |
| `buildNotices` | `buildNoticeDeterminations` |
| `buildLimits` | `buildLimitDeterminations` |
| `tallyProgram` | `tallySubject` |

A consumer outside the fleet updates an import name, a member read, or an object key for
each row. No compatibility alias, re-export, or shim was added.

## Shared-file patches

None. Every edit landed inside Owned. No shared or off-limits file needed a change:
`package.json`, `configs/**`, `scripts/**`, `.claude/**`, the vendored test files, and the
vendored `guides/<dep>.md` mirrors are untouched.

## Gates

Run in order, each read bare. Output files are under
`/home/user/work/evidence/program-proofs/`.

| Command | Exit | Evidence |
| --- | --- | --- |
| `npm run format:check` | 0 | `gate-1-format-check.txt` |
| `npm run lint:check` | 0 | `gate-2-lint-check.txt` |
| `npm run check` | 0 | `gate-3-check.txt` |
| `npm run build` | 0 | `gate-4-build.txt` |
| `npm test` | 0 | `gate-5-test.txt` |

`npm test` reported `src:core` 216 passed, `policy` 111 passed, `config` 46 passed,
`setup` 85 passed, `guides` 26 passed. No failure excerpt exists.

Before proving with the checks, the mutating `npm run lint` (`oxlint --fix`) and
`npm run format` (`oxfmt --write`) ran once each to converge, in that order. The lint pass
reported one diagnostic it could not fix — the unused `Status` type import in
`src/core/constants.ts` that program-subj-2 created — which was closed by narrowing the
import, and the pass then ran clean.

`git status --short` lists 18 modified files, every one under Owned, and no untracked
file. Evidence files written by `node /home/user/scaffold/tmp/work/evidence.mjs program`:
`/home/user/work/evidence/conform-program.diff` (3982 lines) and
`/home/user/work/evidence/conform-program.status` (18 entries).

## Deviations

None. No row's repair contradicted a rule, collided with an existing name, required a
file outside Owned, or required a consumer edit to keep this package's gates green.

Ancillary decisions taken and carried on from, per the deviation contract:

- `RecordingReason` places `get emitter()` and `get destroyCount()` together before its
  methods rather than in the member order the repair lists, because
  `.claude/rules/architecture.md` § Class order puts the public interface as getters then
  methods. Every member the repair names is present.
- Two `ProgramManager` test titles that named `size` in prose were reworded to `count`,
  so no old name survives in prose.
- Three `describe` titles in `helpers.test.ts` were renamed with their helpers
  (`buildNoticeDeterminations`, `buildLimitDeterminations`, and the `edges` block).
- The moved fixtures' classes sit after `ResultClass` and their factories after
  `createResultClass` in `tests/setup.ts`; `buildStandardProgramDefinition` sits beside
  `standardProgramDefinition`, whose pair it builds from.
- The `program-obj-3` transcription runs the Surface fence and the batch fence in one
  case, because the guide's batch fence continues from the same `program` the Surface
  fence built, and a second `program` would not be what the guide claims. Each fence
  keeps its own presence guard.

## Fix round 1

This round carries the rulings from
`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/program-objective-r1-sol.md`.

- Claim 2a: `tests/guides.test.ts:255-258` guards the Surface fence from the `gates`
  definition through `program.destroy()`. The guard names the logical definition,
  qualification, ruling, rating line, rating definition, program definition, subjects,
  and documented result values that the transcription reuses.
- Claim 2b: every multi-code `@throws` row is split into one row per code. The split
  rows are at `src/core/types.ts:267-273,298-304,467-475`,
  `src/core/programs/Program.ts:180-186,211-217`,
  `src/core/programs/ProgramManager.ts:191-199`, and
  `src/core/helpers.ts:68-70`.
- Claim 4: the Failing-first controls table carries one isolated red and green command
  for program-obj-1, program-obj-2, program-obj-5, program-obj-4, program-obj-6, and
  program-obj-3. Each red capture reports only the test named in the plant paragraph.
- O1: `src/core/types.ts:460-463` and
  `src/core/programs/ProgramManager.ts:184-187` state: "After appending the program,
  the `add` event fires with its id."
- O2: `tests/guides.test.ts:229-252` wraps the executed Surface and batch fence
  assertions in `try`, with `program.destroy()` in `finally`.
- R1: `guides/program.md:172-176` states that `completeTallies` writes every `Status`
  member as a literal record and that `isTallies` checks membership through `STATUSES`.

The round recorded these sweeps:

- `grep -rnE "@throws" src` shows one error code per `@throws` row. The rows split in
  this round start with "Thrown when".
- `grep -rnwE "new" src/core/types.ts src/core/programs/ProgramManager.ts` reports only
  runtime constructor expressions in `ProgramManager.ts`; no doc comment uses temporal
  `new`.

The controls table names these captures under
`/home/user/work/evidence/program-proofs/`: `program-obj-1-red.txt`,
`program-obj-1-green.txt`, `program-obj-2-red.txt`, `program-obj-2-green.txt`,
`program-obj-5-red.txt`, `program-obj-5-green.txt`, `program-obj-4-red.txt`,
`program-obj-4-green.txt`, `program-obj-6-red.txt`, `program-obj-6-green.txt`,
`program-obj-3-red.txt`, and `program-obj-3-green.txt`.

The round's gates and scoped runs read:

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format. |
| `npm run lint:check` | 0 | No diagnostic. |
| `npm run check` | 0 | Root and `src:core` TypeScript checks pass. |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts` | 0 | 26 passed (26). |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` | 0 | 85 passed (85). |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts` | 0 | 74 passed (74). |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/programs/Program.test.ts` | 0 | 60 passed (60). |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/programs/ProgramManager.test.ts` | 0 | 20 passed (20). |
