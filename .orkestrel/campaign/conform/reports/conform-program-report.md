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

| Item | Edit                                                        | Sites now                                                                                                                                                                                                                                                                                                                                                                                    |
| ---- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `logicalPremises` → `ruleToPremises`                        | `src/core/helpers.ts:34` (import), `:224` (`@remarks` link), `:261` (call); `guides/program.md:276` (Helpers prose)                                                                                                                                                                                                                                                                          |
| 1    | `qualificationDefinition` → `createQualificationDefinition` | `tests/setup.ts:21`, `tests/setup.test.ts:22`, `tests/guides.test.ts:7`, `tests/src/core/factories.test.ts:4`, `tests/src/core/helpers.test.ts:66`, `tests/src/core/validators.test.ts:34`, `tests/src/core/programs/Program.test.ts:64`, `tests/src/core/programs/ProgramManager.test.ts:13`, plus every call site in those files; `README.md:31,50`; `guides/program.md:38,57,764,780,870` |
| 1    | `rulingDefinition` → `createRuling`                         | same import lines as the preceding row plus every call site; `README.md:31,56`; `guides/program.md:38,63,792,821,832,890`                                                                                                                                                                                                                                                                    |
| 1    | `RuleResult.conclusion` drop                                | `noop` — no fixture carries a `RuleResult`. Every `conclusion` in this package reads `LogicalResult.conclusion`, which the staged reason still declares (`tests/setup.ts:251`, `tests/setup.test.ts:128,133,776,817`, `tests/src/core/helpers.test.ts:814`)                                                                                                                                  |
| 2    | `lineDefinition` → `buildLineDefinition`                    | `tests/setup.ts:23`, `tests/src/core/helpers.test.ts:37`, `tests/src/core/factories.test.ts:5`, `tests/src/core/programs/Program.test.ts:4`, `tests/guides.test.ts:8`, plus every call site; `README.md:32,63`; `guides/program.md:39,70,795`                                                                                                                                                |
| 2    | `ratingDefinition` → `buildRatingDefinition`                | same import lines plus `tests/src/core/validators.test.ts:35`, plus every call site; `README.md:32,71`; `guides/program.md:39,78,798`                                                                                                                                                                                                                                                        |
| 3    | `symbol.kind` → `symbol.keyword`                            | `tests/guides.test.ts:133`                                                                                                                                                                                                                                                                                                                                                                   |

Every affected named-import list was re-sorted. The vendored `guides/<dep>.md` mirrors
were not touched.

## Rows

| Row             | Disposition              | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| program-obj-1   | applied                  | `tests/setup.ts:92` declares `class RecordingReason implements RecordingEngineInterface`; `createRecordingEngine` at `tests/setup.ts:609` returns `new RecordingReason(options)`. The nested `function reason` is gone. `isArray<Subject>` from `@orkestrel/contract` narrows the overload implementation.                                                                                                                                                                                          |
| program-obj-2   | applied                  | `tests/setup.ts:618-640` contains `recordEvents`; each `program.emitter.on` subscription pushes its own event name inline, and no local `record` arrow remains.                                                                                                                                                                                                                                                                                                                                     |
| program-obj-3   | applied                  | `tests/guides.test.ts:192-268` contains `describe('flagship fences')`, the executed Surface and batch assertions, cleanup under `finally`, and the presence guards.                                                                                                                                                                                                                                                                                                                                 |
| program-obj-4   | applied                  | Every hand-rolled capture block is replaced by `captureError`, imported at `tests/src/core/programs/ProgramManager.test.ts:6`, `tests/src/core/factories.test.ts:7`, and `tests/src/core/helpers.test.ts:5`; `tests/src/core/programs/Program.test.ts:15` already imports it. The cleanup blocks in `tests/setup.test.ts` are unchanged. Sweep: `grep -rn "let error: unknown\|expect.unreachable" tests/src tests/setup.ts tests/setup.test.ts` returns nothing.                                   |
| program-obj-5   | applied                  | `tests/setup.ts:400`, `:414`, and `:434` declare the off-contract fixtures; their factories and `buildQualificationResult` are at `tests/setup.ts:532-548`; `buildStandardProgramDefinition` is at `tests/setup.ts:690`. The consuming tests import these names.                                                                                                                                                                                                                                    |
| program-obj-6   | applied                  | `tests/src/core/factories.test.ts:97-108` proves the default validation branch and the `{ validate: false }` branch against the same definition.                                                                                                                                                                                                                                                                                                                                                    |
| program-obj-8   | applied                  | `isBrowserVuePath` deleted from `tests/setup.ts` with its doc comment; `describe('isBrowserVuePath')` and the import entry deleted from `tests/setup.test.ts`. Sweep: `grep -rn isBrowserVuePath` over the checkout excluding `node_modules` returns nothing.                                                                                                                                                                                                                                       |
| program-obj-9   | noop (EXEMPT)            | The documented collapse remains at `src/core/helpers.ts:600-620` and `guides/program.md:350`. Reopening it changes `AggregateGroup.key` and the `formatGroupKey` return type, so it needs its own breaking unit.                                                                                                                                                                                                                                                                                    |
| program-subj-1  | applied                  | The parenthetical is gone from the affected declarations and prose, including `src/core/types.ts:193,239,250,361`, `src/core/helpers.ts:125`, `src/core/programs/ProgramManager.ts:21,235`, `src/core/programs/Program.ts:166`, `guides/program.md:29,93,153,401,423`, and `guides/README.md:3,58`. The `AGENTS §` sweep is empty.                                                                                                                                                                  |
| program-subj-2  | applied (BREAKING)       | `STATUS_PRECEDENCE` is deleted. `src/core/helpers.ts:850` and `src/core/validators.ts:266` iterate `STATUSES`; imports are at `src/core/helpers.ts:36` and `src/core/validators.ts:35`; the TSDoc links are at `src/core/helpers.ts:836` and `src/core/validators.ts:251`. The `completeTallies` literal remains. `tests/src/core/programs/Program.test.ts:13,1010-1014` use `STATUSES`.                                                                                                            |
| program-subj-3  | applied (BREAKING)       | `buildNoticeDeterminations` and `buildLimitDeterminations` are declared at `src/core/helpers.ts:202,242`. `src/core/programs/Program.ts:39-40,342,360,433` imports and calls them. `buildNotice` is unchanged, and `buildNotices` was not reintroduced.                                                                                                                                                                                                                                             |
| program-subj-4  | applied (BREAKING)       | `src/core/types.ts:403` declares `readonly count: number`; `src/core/programs/ProgramManager.ts:118` implements `get count(): number`. The package tests read `manager.count`, including `tests/src/core/programs/ProgramManager.test.ts:24,31,101,137,162,168,207,312`.                                                                                                                                                                                                                            |
| program-subj-5  | applied                  | `src/core/errors.ts:44` reads "Determines whether a caught value is a {@link ProgramError}." Nothing else changed. Sweep: `grep -rn "Checks whether" src` returns nothing.                                                                                                                                                                                                                                                                                                                          |
| program-subj-6  | applied                  | Every member of `ProgramInterface` (`src/core/types.ts:242-358`) and `ProgramManagerInterface` (`src/core/types.ts:393-567`) carries TSDoc, mirrored on `src/core/programs/Program.ts:86-280` and `src/core/programs/ProgramManager.ts:77-325`. The overload notes remain at `src/core/programs/Program.ts:179` and `src/core/programs/ProgramManager.ts:242`.                                                                                                                                      |
| program-subj-7  | applied                  | `guides/program.md:151` Shape cell reads `` `emitter` / `count` + `has` / `program` / `programs` / `add` / `remove` / `destroy`. `` — `count` because program-subj-4 lands in the same campaign.                                                                                                                                                                                                                                                                                                    |
| program-subj-8  | applied                  | `guides/program.md:316` — `assertProgramDefinition,` is the first entry of the import block, before `assertProgramSubject,`. The guides suite's `imports only real exports in every ts fence` case passes, so the name resolves.                                                                                                                                                                                                                                                                    |
| program-subj-9  | applied                  | `README.md:24` reads `- Node.js >= 22.12.0`, matching `package.json` `engines.node`. `package.json` was not edited.                                                                                                                                                                                                                                                                                                                                                                                 |
| program-subj-10 | applied                  | The rewritten token prose is at `src/core/helpers.ts:183-184,217,221,985`, `src/core/programs/ProgramManager.ts:21`, and `guides/program.md:138`.                                                                                                                                                                                                                                                                                                                                                   |
| program-subj-11 | applied                  | The rewritten prose is at `src/core/helpers.ts:814`, `src/core/validators.ts:344-345`, and `guides/program.md:174,533,932`. The sentence at `guides/program.md:174` names its members ("`completeTallies` writes every `Status` member as a literal record").                                                                                                                                                                                                                                      |
| program-subj-12 | applied                  | The `through` form appears at `README.md:25`, `guides/program.md:701`, `tests/src/core/helpers.test.ts:1035`, and `tests/setup.ts:1125`. The `via` sweep is empty.                                                                                                                                                                                                                                                                                                                                  |
| program-subj-13 | applied (BREAKING)       | `AggregateInput.partition` and `AggregateDefinition.partition` are at `src/core/types.ts:52,93`. The implementation reads are at `src/core/helpers.ts:575-576,600-620,691-758,1008-1024`, `src/core/validators.ts:112-115`, and `src/core/programs/Program.ts:382`; representative tests are at `tests/setup.ts:902`, `tests/setup.test.ts:832-834`, `tests/src/core/programs/Program.test.ts:911,935`, `tests/src/core/validators.test.ts:128`, and `tests/src/core/helpers.test.ts:607-623,1088`. |
| program-subj-14 | applied                  | The defaults use the fixed form at `src/core/types.ts:219,376-377`.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| program-subj-16 | applied (BREAKING)       | `tallySubject` is declared at `src/core/helpers.ts:870`, imported and called at `src/core/programs/Program.ts:46,397`, and used by `tests/src/core/helpers.test.ts:32,767` and `guides/program.md:305`.                                                                                                                                                                                                                                                                                             |
| fleet-F1        | applied by program-obj-8 | Folded into that row, which deletes the helper. `tests/setup.ts` has no header comment naming `isBrowserVuePath` and is not export-free, so neither of the row's other shapes fires. No second edit was made. `tests/setup.ts` stays as `setupFiles[0]`, the `setup` project stays in `vite.config.ts`, and `test:setup` stays in the `test` chain — this row removes no axis, so the stop condition does not apply.                                                                                |
| fleet-F2        | noop                     | `Program` (`src/core/programs/Program.ts:73-90`) declares every `#` field before `id`, `name`, and `definition`. `ProgramManager` (`src/core/programs/ProgramManager.ts:37-48`) declares no `id`. `ProgramError` (`src/core/errors.ts:23-41`) declares no `#` field or `id`.                                                                                                                                                                                                                        |

## Files touched

| File                                                                      | Summary                                                                                                                                                            |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/home/user/fleet/program/src/core/types.ts`                              | `by` → `partition`, `size` → `count`, complete TSDoc on both interfaces' members, `Default:` form, AGENTS citations deleted                                        |
| `/home/user/fleet/program/src/core/constants.ts`                          | `STATUS_PRECEDENCE` deleted, `Status` type import narrowed out                                                                                                     |
| `/home/user/fleet/program/src/core/errors.ts`                             | `isProgramError` opens "Determines whether"                                                                                                                        |
| `/home/user/fleet/program/src/core/factories.ts`                          | `createProgram`'s `@remarks` for `options.validate`: the boolean form and the "Default: …" form, comment-only                                                     |
| `/home/user/fleet/program/src/core/helpers.ts`                            | `ruleToPremises`, `buildNoticeDeterminations`, `buildLimitDeterminations`, `tallySubject`, `partition`, `STATUSES`, and the pluralized-token and count prose fixes |
| `/home/user/fleet/program/src/core/validators.ts`                         | `isAggregateDefinition` keys `partition`, `isTallies` iterates `STATUSES`, count prose fix                                                                         |
| `/home/user/fleet/program/src/core/programs/Program.ts`                   | renamed helper calls, `partition` reads, mirrored member TSDoc, citation stripped from the overload comment                                                        |
| `/home/user/fleet/program/src/core/programs/ProgramManager.ts`            | `get count()`, mirrored member TSDoc, pluralized-token and citation fixes                                                                                          |
| `/home/user/fleet/program/tests/setup.ts`                                 | `RecordingReason` class, inlined `recordEvents` pushes, the five moved fixtures, `isBrowserVuePath` deleted, dependency renames                                    |
| `/home/user/fleet/program/tests/setup.test.ts`                            | proofs for the five moved exports, `isBrowserVuePath` block and import removed, dependency renames                                                                 |
| `/home/user/fleet/program/tests/guides.test.ts`                           | `describe('flagship fences')` with executed transcriptions and presence guards, `symbol.keyword`                                                                   |
| `/home/user/fleet/program/tests/src/core/helpers.test.ts`                 | local fixtures removed and imported, `captureError`, renamed helpers, `partition`                                                                                  |
| `/home/user/fleet/program/tests/src/core/factories.test.ts`               | `captureError`, the rewritten `defaults validate to true` case, `manager.count`                                                                                    |
| `/home/user/fleet/program/tests/src/core/programs/Program.test.ts`        | `captureError`, `STATUSES`, `partition`, dependency renames                                                                                                        |
| `/home/user/fleet/program/tests/src/core/programs/ProgramManager.test.ts` | `buildStandardProgramDefinition`, `captureError`, `manager.count`                                                                                                  |
| `/home/user/fleet/program/tests/src/core/validators.test.ts`              | `partition`, dependency renames                                                                                                                                    |
| `/home/user/fleet/program/guides/program.md`                              | Constants, Types, Surface, Helpers, Methods, Validation, Status, and fence updates for every row                                                                   |
| `/home/user/fleet/program/guides/README.md`                               | AGENTS citations removed from the tagline and the See-also entry                                                                                                   |
| `/home/user/fleet/program/README.md`                                      | Node floor, `through` for `via`, dependency renames in the usage fence                                                                                             |

```text
 README.md                                      |  16 +-
 guides/README.md                               |   4 +-
 guides/program.md                              |  96 ++++---
 src/core/constants.ts                          |  11 +-
 src/core/errors.ts                             |   2 +-
 src/core/factories.ts                          |   5 +-
 src/core/helpers.ts                            |  93 ++++---
 src/core/programs/Program.ts                   | 164 +++++++++++-
 src/core/programs/ProgramManager.ts            | 203 ++++++++++++++-
 src/core/types.ts                              | 319 +++++++++++++++++++++--
 src/core/validators.ts                         |  16 +-
 tests/guides.test.ts                           | 102 +++++++-
 tests/setup.test.ts                            | 137 ++++++++--
 tests/setup.ts                                 | 340 +++++++++++++++++--------
 tests/src/core/factories.test.ts               |  90 +++----
 tests/src/core/helpers.test.ts                 | 334 ++++++++++--------------
 tests/src/core/programs/Program.test.ts        | 155 +++++------
 tests/src/core/programs/ProgramManager.test.ts | 174 +++++--------
 tests/src/core/validators.test.ts              |  10 +-
 19 files changed, 1529 insertions(+), 742 deletions(-)
```

## Failing-first controls

Each control planted the defect the row's assertion claims to catch, ran the named
command, then restored by editing and re-ran the same command. No git command discarded
anything.

| Row           | Command                                                                                                                | Red                                                | Green                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------ |
| program-obj-1 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`                 | 1 failed, 84 passed (85) — `program-obj-1-red2.txt` | 85 passed (85) — `program-obj-1-green2.txt` |
| program-obj-2 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`                 | 1 failed, 84 passed (85) — `program-obj-2-red.txt` | 85 passed (85) — `program-obj-2-green.txt` |
| program-obj-5 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`                 | 1 failed, 84 passed (85) — `program-obj-5-red.txt` | 85 passed (85) — `program-obj-5-green.txt` |
| program-obj-4 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`   | 1 failed, 73 passed (74) — `program-obj-4-red.txt` | 74 passed (74) — `program-obj-4-green.txt` |
| program-obj-6 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/factories.test.ts` | 1 failed, 6 passed (7) — `program-obj-6-red.txt`   | 7 passed (7) — `program-obj-6-green.txt`   |
| program-obj-3 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts`               | 1 failed, 25 passed (26) — `program-obj-3-red.txt` | 26 passed (26) — `program-obj-3-green.txt` |

Every file named is under `/home/user/work/evidence/program-proofs/`.

Failing test names and the plant each one caught:

- program-obj-1 — `createRecordingEngine > counts every destroy, so a suite can prove an owned engine was released once`; plant: `RecordingReason.destroy` incremented `#destroyCount` only on its first call. The case calls `destroy` twice and asserts the count reaches 2, so the plant is the defect the case's name claims to catch.
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

| Pattern                                                                                                                                                                                                                                                                                                                                                   | Result                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `\b(STATUS_PRECEDENCE\|buildNotices\|buildLimits\|tallyProgram\|isBrowserVuePath\|buildQualification\|buildDefinition\|ScriptedQualifier\|ScriptedReason\|logicalPremises\|qualificationDefinition\|rulingDefinition\|lineDefinition\|ratingDefinition)\b` over `src tests guides/program.md guides/README.md README.md`                                  | empty                                                                                                                                                                                                                                                      |
| `\b(status_precedence\|buildnotices\|buildlimits\|tallyprogram\|isbrowservuepath\|buildqualification\|builddefinition\|scriptedqualifier\|scriptedreason\|logicalpremises\|qualificationdefinition\|rulingdefinition\|linedefinition\|ratingdefinition)(s\|es\|ed\|ing)\b` case-insensitive over `src tests guides/program.md guides/README.md README.md` | empty                                                                                                                                                                                                                                                      |
| `\bby\?\|\.by\b\|[{,] by:\|symbol\.kind`                                                                                                                                                                                                                                                                                                                  | empty                                                                                                                                                                                                                                                      |
| `\.size\b`                                                                                                                                                                                                                                                                                                                                                | two hits, both `Set.prototype.size` (`src/core/helpers.ts:537`, `tests/setup.test.ts:479`). Permitted — the built-in, not the renamed member.                                                                                                              |
| program-subj-1 — `AGENTS §` over `src tests/setup.ts tests/setup.test.ts tests/guides.test.ts tests/src guides/program.md guides/README.md README.md`                                                                                                                                                                                                     | empty                                                                                                                                                                                                                                                      |
| program-subj-5 — `Checks whether` over `src`                                                                                                                                                                                                                                                                                                              | empty                                                                                                                                                                                                                                                      |
| program-subj-6 — `@throws \{@link ProgramError\} Thrown when` and `@throws` over `src`                                                                                                                                                                                                                                                                    | Every `@throws` row opens "Thrown when": the two patterns match the same lines on the final tree.                                                                                                                                                          |
| program-subj-7 — `\bsize\b` over `guides/program.md`                                                                                                                                                                                                                                                                                                      | empty                                                                                                                                                                                                                                                      |
| program-subj-8 — `^\s*assertProgramDefinition,` over `guides/program.md`                                                                                                                                                                                                                                                                                  | `guides/program.md:316` imports the helper used later in the fence.                                                                                                                                                                                        |
| program-subj-9 — `Node\.js >= 24` over `README.md`                                                                                                                                                                                                                                                                                                        | empty                                                                                                                                                                                                                                                      |
| program-subj-10 — pattern `\{@link [^}]+\}s\|\`FieldPath\`s\|\`\{\{token\}\}\`s`over paths`src guides/program.md`                                                                                                                                                                                                                                         | empty                                                                                                                                                                                                                                                      |
| program-subj-11 — `\b(above\|below)\b` case-insensitive over `tests/setup.ts tests/setup.test.ts tests/guides.test.ts tests/src guides/program.md guides/README.md README.md`                                                                                                                                                                             | hits at `tests/setup.ts:916`, `tests/setup.test.ts:804`, `tests/src/core/programs/Program.test.ts:983`, `tests/src/core/validators.test.ts:132`, `guides/program.md:877`, and `guides/program.md:901`; each names the reason engine's comparison operator. |
| program-subj-11 — `\b(hundreds\|dozens\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten) (subjects\|lines\|programs\|fixtures\|entries\|cases\|tests)\b` case-insensitive over the same paths                                                                                                                                                        | `tests/src/core/programs/Program.test.ts:968` only; permitted because the case names the fixed shared-id subject pair and its corresponding result pair.                                                                                                   |
| program-subj-12 — `\bvia\b` case-insensitive over `src tests/setup.ts tests/setup.test.ts tests/guides.test.ts tests/src guides/program.md guides/README.md README.md`                                                                                                                                                                                    | empty                                                                                                                                                                                                                                                      |
| program-subj-14 — `\(default ` over `src guides/program.md`                                                                                                                                                                                                                                                                                               | empty                                                                                                                                                                                                                                                      |
| program-obj-11 — `from '@src` over `guides/program.md`                                                                                                                                                                                                                                                                                                    | empty                                                                                                                                                                                                                                                      |
| `\b[0-9]+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b`                                                                                                                                                                | empty                                                                                                                                                                                                                                                      |
| `\bshould\b\|\bsimply\b\|\butilize\b\|\bleverage\b\|\bcurrently\b` case-insensitive                                                                                                                                                                                                                                                                       | empty                                                                                                                                                                                                                                                      |

Earlier number-word sweeps found package-owned prose that this campaign corrected:

- `tests/guides.test.ts:2` read "The five constants below" — a count over a set this
  change added `CORE_GUIDE` to, and `below` as a document reference. It now reads "The
  constants declared next".
- `tests/setup.test.ts:643` read "so two ids never share one object" in a case this
  change authored. It now reads "so a later call never shares the first object".

The fix-round-specific rulings and paths are in the preceding table.

## Sweep hits outside the rows

Fix round 2 carried the recorded writing-rule sites into its Owned scope. Their
current forms are listed in that round's section.

## Breaking

Consumers: none. `"@orkestrel/program"` appears in no other `package.json` under
`/home/user/fleet`, so no fleet consumer re-pins and no consumer-side edit is owed. The
published surface changes are:

| Removed or renamed                            | Replacement                                                   |
| --------------------------------------------- | ------------------------------------------------------------- |
| `STATUS_PRECEDENCE` (const)                   | `STATUSES`, which carries the same literals in the same order |
| `ProgramManagerInterface.size`                | `ProgramManagerInterface.count`                               |
| `AggregateInput.by`, `AggregateDefinition.by` | `partition` on each                                           |
| `buildNotices`                                | `buildNoticeDeterminations`                                   |
| `buildLimits`                                 | `buildLimitDeterminations`                                    |
| `tallyProgram`                                | `tallySubject`                                                |

A consumer outside the fleet updates an import name, a member read, or an object key for
each row. No compatibility alias, re-export, or shim was added.

## Shared-file patches

None. Every edit landed inside Owned. No shared or off-limits file needed a change:
`package.json`, `configs/**`, `scripts/**`, `.claude/**`, the vendored test files, and the
vendored `guides/<dep>.md` mirrors are untouched.

## Gates

Run in order, each read bare. Output files are under
`/home/user/work/evidence/program-proofs/`.

| Command                | Exit | Evidence                  |
| ---------------------- | ---- | ------------------------- |
| `npm run format:check` | 0    | `gate-1-format-check.txt` |
| `npm run lint:check`   | 0    | `gate-2-lint-check.txt`   |
| `npm run check`        | 0    | `gate-3-check.txt`        |
| `npm run build`        | 0    | `gate-4-build.txt`        |
| `npm test`             | 0    | `gate-5-test.txt`         |

Fix round 3 re-ran `format:check`, `lint:check`, `check`, `test:guides`, and the `setup`
and `src:core` projects on the tree its own edits produced; the landing's deciding run
executes the full chain in this table, including `build`, `policy`, and `config`, on the
final tree.

`npm test` reported `src:core` 216 passed, `policy` 111 passed, `config` 46 passed,
`setup` 85 passed, `guides` 26 passed. No failure excerpt exists.

Before proving with the checks, the mutating `npm run lint` (`oxlint --fix`) and
`npm run format` (`oxfmt --write`) ran once each to converge, in that order. The lint pass
reported one diagnostic it could not fix — the unused `Status` type import in
`src/core/constants.ts` that program-subj-2 created — which was closed by narrowing the
import, and the pass then ran clean.

`git status --short` lists only paths under Owned, and no untracked file. Evidence files
written by `node /home/user/scaffold/tmp/work/evidence.mjs program`:
`/home/user/work/evidence/conform-program.diff` and
`/home/user/work/evidence/conform-program.status`.

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
  rows are at `src/core/types.ts:267-273,298-304,472-480`,
  `src/core/programs/Program.ts:180-186,211-217`,
  `src/core/programs/ProgramManager.ts:195-203`, and
  `src/core/helpers.ts:68-70`.
- Claim 4: the Failing-first controls table carries one isolated red and green command
  for program-obj-1, program-obj-2, program-obj-5, program-obj-4, program-obj-6, and
  program-obj-3. Each red capture reports only the test named in the plant paragraph.
- O1: `src/core/types.ts:466-468` and
  `src/core/programs/ProgramManager.ts:189-191` state: "After appending the program,
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
`/home/user/work/evidence/program-proofs/`: `program-obj-1-red2.txt`,
`program-obj-1-green2.txt`, `program-obj-2-red.txt`, `program-obj-2-green.txt`,
`program-obj-5-red.txt`, `program-obj-5-green.txt`, `program-obj-4-red.txt`,
`program-obj-4-green.txt`, `program-obj-6-red.txt`, `program-obj-6-green.txt`,
`program-obj-3-red.txt`, and `program-obj-3-green.txt`.

The round's gates and scoped runs read:

| Command                                                                                                                              | Exit | Reading                                     |
| ------------------------------------------------------------------------------------------------------------------------------------ | ---- | ------------------------------------------- |
| `npm run format:check`                                                                                                               | 0    | All matched files use the correct format.   |
| `npm run lint:check`                                                                                                                 | 0    | No diagnostic.                              |
| `npm run check`                                                                                                                      | 0    | Root and `src:core` TypeScript checks pass. |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts`                             | 0    | 26 passed (26).                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`                               | 0    | 85 passed (85).                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`                 | 0    | 74 passed (74).                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/programs/Program.test.ts`        | 0    | 60 passed (60).                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/programs/ProgramManager.test.ts` | 0    | 20 passed (20).                             |

## Fix round 2

This round carries the rulings from
`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/program-objective-r2-sol.md`.

- Claim 2: every `@throws` row added on `ProgramInterface`, `ProgramManagerInterface`,
  `Program`, and `ProgramManager` opens "Thrown when". The command
  `grep -rnE '@throws \{@link ProgramError\} Thrown when' src` measured 38 rows.
  The command `grep -rnE '@throws' src` measured 40 rows. The unmatched rows are
  the pre-existing `src/core/helpers.ts:451,453`, which this fix round does not own.
- Claim 3: the inflection sweep in § Sweeps carries the full alternation through
  `ratingdefinition` and names `src`, `tests`, `guides/program.md`,
  `guides/README.md`, and `README.md`. The result is empty.
- Claim 4: § Sweeps records the old-form proof for program-subj-1, program-subj-5,
  program-subj-6, program-subj-7, program-subj-8, program-subj-9,
  program-subj-10, program-subj-11, program-subj-12, program-subj-14, and
  program-obj-11, with each pattern's paths and result.
- Claim 9: the disposition table and the row sections use pointers from the final
  tree. `RecordingReason` is at `tests/setup.ts:92`,
  `createRecordingEngine` is at `tests/setup.ts:609`,
  `ProgramManagerInterface.count` is at `src/core/types.ts:404`, and
  `ProgramManager.count` is at `src/core/programs/ProgramManager.ts:111`.
- O1: `tests/setup.test.ts:4` reads "Each following contract is asserted".
- O2: `tests/setup.test.ts:465` reads "matches the hand-written fixture table".
- O3: `tests/setup.test.ts:723` reads "give the property rating distinct scoped
  lines".
- O4: `tests/guides.test.ts:48` names "the internal-symbol assertion".
- O5: `guides/program.md:932` reads "as the preceding example shows".
- O6: `tests/src/core/programs/ProgramManager.test.ts:157` reads "preserves count,
  lookup, order, and fresh arrays for a generated program collection".
- The `above|below` sweep returns only the reason engine's comparison operator at
  `tests/setup.ts:916`, `tests/setup.test.ts:804`,
  `tests/src/core/programs/Program.test.ts:983`,
  `tests/src/core/validators.test.ts:132`, `guides/program.md:877`, and
  `guides/program.md:901`.
- The targeted count sweep returns
  `tests/src/core/programs/Program.test.ts:968`; the case names the fixed
  shared-id subject pair and its corresponding result pair.

The fix-round gates and scoped runs read:

| Command                                                                                                                              | Exit | Reading                                     |
| ------------------------------------------------------------------------------------------------------------------------------------ | ---- | ------------------------------------------- |
| `npm run format:check`                                                                                                               | 0    | All matched files use the correct format.   |
| `npm run lint:check`                                                                                                                 | 0    | No diagnostic.                              |
| `npm run check`                                                                                                                      | 0    | Root and `src:core` TypeScript checks pass. |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/programs/Program.test.ts`        | 0    | 60 passed (60).                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/programs/ProgramManager.test.ts` | 0    | 20 passed (20).                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`                               | 0    | 85 passed (85).                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts`                             | 0    | 26 passed (26).                             |

`git status --short` lists the same package-owned modified paths as the incoming
unit and no untracked path.

## Fix round 3

The round-3 objective lane
(`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/program-objective-r3-sol.md`)
refuted claims 2 and 4. Both are closed. Because each of the three rounds found a new
TSDoc-form defect through a new door, the whole public TSDoc surface under `src/core/**`
was swept against `.claude/rules/typescript.md` § Comments and API documentation in one
pass, and every departure the sweep found is rewritten.

### Claim 2 — overload-specific notes out of public TSDoc

- `src/core/types.ts:251` — the `ProgramInterface` doc block's `@remarks` naming the
  array-first `execute` overload order is deleted, and the note now sits before the
  overload block as `// Array overload first so a subject list resolves to the batch
  form.`, the wording `src/core/programs/Program.ts:179` already carried.
- `src/core/types.ts:491` — the `remove(ids)` `@remarks` sentence "Declared FIRST so an
  id list resolves here rather than to the single-id overload." is deleted, and the note
  now sits before the overload block as `// Array overload first so an id list resolves
  to the batch form.`, the wording `src/core/programs/ProgramManager.ts:242` already
  carried. The vacuous-empty-list fact moved from `@returns` into `@remarks`.

No public TSDoc block under `src/core/**` carries an overload-specific note. The
`overload|[Dd]eclared FIRST|declared first` sweep over `src/` returns only the
single-line comments at `src/core/types.ts:251`, `src/core/types.ts:491`,
`src/core/programs/Program.ts:179`, and `src/core/programs/ProgramManager.ts:242`.

### TSDoc sweep

Population: every `/** … */` block on an exported symbol or an interface member in
`src/core/constants.ts`, `src/core/errors.ts`, `src/core/factories.ts`,
`src/core/helpers.ts`, `src/core/types.ts`, `src/core/validators.ts`,
`src/core/programs/Program.ts`, and `src/core/programs/ProgramManager.ts`.
`src/core/index.ts` is a barrel and carries no doc block.

| Bullet                                                                                     | Sites rewritten                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Comments explain why, never restate what self-explanatory code does                        | none                                                                                                                                                                                        |
| Every public export has complete TSDoc: description, `@param`, `@returns`, `@example`      | `src/core/programs/Program.ts:93-105` and `src/core/programs/ProgramManager.ts:50-56` — each constructor carried no block, so neither parameterized public entry point documented a `@param` |
| First sentence in the third person with an `-s` verb, never repeating the symbol's name    | none                                                                                                                                                                                        |
| Boolean parameter as "If `true`, …; if `false`, …" and boolean return as "True if …"       | returns `src/core/types.ts:408,501,519` and `src/core/programs/ProgramManager.ts:127,252,270`; the `validate` boolean option field `src/core/types.ts:218-220,374-376` and `src/core/factories.ts:15-17` |
| A default written as "Default: …"                                                          | `src/core/factories.ts:15-17`                                                                                                                                                               |
| A thrown error written as "Thrown when …"                                                  | `src/core/helpers.ts:451-454`                                                                                                                                                               |
| A prerequisite and the failure behavior stated wherever the symbol has either              | none                                                                                                                                                                                        |
| `@deprecated` names the replacement first, then the reason                                 | none — the `@internal\|@deprecated\|@alpha\|@beta\|@public\|@private` sweep over `src/` returns empty                                                                                        |
| An options object documented as one `@param`, with its short fields under `@remarks`       | none — `ProgramOptions` and `ProgramManagerOptions` carry their fields under `@remarks`, and each factory takes one `options` `@param`                                                       |
| Private methods and overload-specific notes as single-line `//` comments                   | `src/core/types.ts:251` and `src/core/types.ts:491`; no `#` private method carries a doc block                                                                                               |
| No speculative future product behavior                                                     | none                                                                                                                                                                                        |
| No `@internal`                                                                             | none — same sweep as `@deprecated`, empty                                                                                                                                                   |

The boolean-return rewrites replaced "True when …" with "True if …" and, for
`remove(ids)`, replaced "True only when every listed id named a compiled program; an
empty list succeeds vacuously" with "True if every listed id named a compiled program;
false otherwise". The `validate` rewrites give the option field the boolean form and keep
its "Default: {@link DEFAULT_PROGRAM_VALIDATE}" clause. The `@throws` rewrites at
`src/core/helpers.ts:451-454` put `assertProgramDefinition` in the "Thrown when …" form
the rest of the package already used.

### Claim 4 — the destroy-count case binds to its name

`tests/setup.test.ts:313-321`, the case
`createRecordingEngine > counts every destroy, so a suite can prove an owned engine was
released once`, now calls `destroy()` twice and asserts `destroyCount` reaches 2. Its
control planted `RecordingReason.destroy` in `tests/setup.ts:144-147` to increment
`#destroyCount` only on its first call — the implementation the old single-call body
admitted — and restored it by editing the line back. No git command discarded anything.

Command:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`

- Red: 1 failed | 84 passed (85) —
  `/home/user/work/evidence/program-proofs/program-obj-1-red2.txt`. The only failure is
  the named case, at `tests/setup.test.ts:320`, `expected 1 to be 2`.
- Green: 85 passed (85) —
  `/home/user/work/evidence/program-proofs/program-obj-1-green2.txt`.

The Failing-first controls table's program-obj-1 row and its plant paragraph now name
these captures.

### Fix-round-3 gates and scoped runs

| Command                                                                                                | Exit | Reading                                     |
| -------------------------------------------------------------------------------------------------------- | ---- | ------------------------------------------- |
| `npm run format:check`                                                                                 | 0    | All matched files use the correct format.   |
| `npm run lint:check`                                                                                   | 0    | No diagnostic.                              |
| `npm run check`                                                                                        | 0    | Root and `src:core` TypeScript checks pass. |
| `npm run test:guides`                                                                                  | 0    | 26 passed (26).                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` | 0    | 85 passed (85).                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`                  | 0    | 216 passed (216).                           |

Captures for these runs sit beside the controls under
`/home/user/work/evidence/program-proofs/`: `fix3-gate-1-format-check.txt`,
`fix3-gate-2-lint-check.txt`, `fix3-gate-3-check.txt`, `fix3-gate-4-test-guides.txt`,
and `fix3-src-core.txt`.

`git status --short` lists the incoming unit's modified paths plus `src/core/factories.ts`,
which this round's sweep modified for the first time. The file is inside the round's owned
scope (`src/core/**` doc blocks) and the edit is comment-only. No untracked path appears,
and no vendored file is touched.

## Fix round 4

This round carries the rulings from
`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/program-objective-r4.md`.

- Claim 9: § Files touched now carries a row for `src/core/factories.ts` (the comment-only
  `validate` boolean and "Default: …" rewrite), and the diffstat fence is regenerated from
  `git -C /home/user/fleet/program diff HEAD --stat` on the final tree. Every pointer the
  refuter named is re-derived: `program-subj-4` reads `src/core/types.ts:403` for
  `readonly count: number` and `src/core/programs/ProgramManager.ts:118` for
  `get count(): number`; `program-subj-6` reads the overload notes at
  `src/core/programs/Program.ts:179` and `src/core/programs/ProgramManager.ts:242`;
  `program-subj-3` reads the renamed calls at `src/core/programs/Program.ts:342,360,433`;
  `program-subj-16` reads the `tallySubject` call at `src/core/programs/Program.ts:397`;
  `program-subj-11` reads the rewritten sentences at `guides/program.md:174,533,932`, and
  the sentence naming its members sits at `:174`. The program-subj-6 § Sweeps row now states
  that the two `@throws` patterns match the same lines on the final tree, replacing the
  stale finder claim. The `.size` § Sweeps row now points to `tests/setup.test.ts:479`.
- O1: § Gates now states, after the table, that fix round 3 re-ran `format:check`,
  `lint:check`, `check`, `test:guides`, and the `setup` and `src:core` projects, and that
  the landing's deciding run executes the full chain in the table, including `build`,
  `policy`, and `config`, on the final tree.
- O2: the status sentence now reads "`git status --short` lists only paths under Owned",
  with no count. The count sweep over the report is recorded following.

Count sweep: `grep -noE '\b[0-9]+ (files|rows|tests|members|entries|paths)\b'` finds three
hits — the diffstat fence's own `git diff --stat` summary line and, in the Fix round 2
section, the two counts each stated beside the `grep` command that produced it
("The command `grep -rnE '@throws {@link ProgramError} Thrown when' src` measured 38
rows", "The command `grep -rnE '@throws' src` measured 40 rows"). All three are counts
reported beside the command that produced them, so none is deleted. The number-word sweep
`\b(one|two|three|four|five|six|seven|eight|nine|ten|dozens|hundreds) (files|rows|tests|
members|entries|paths|hits)\b` finds one hit, "two hits" in the `.size` § Sweeps row,
stated beside its pattern in the adjacent column; retained on the same basis.

`git -C /home/user/fleet/program status --short` unchanged from the incoming list:

```text
 M README.md
 M guides/README.md
 M guides/program.md
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/programs/Program.ts
 M src/core/programs/ProgramManager.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/programs/Program.test.ts
 M tests/src/core/programs/ProgramManager.test.ts
 M tests/src/core/validators.test.ts
```
