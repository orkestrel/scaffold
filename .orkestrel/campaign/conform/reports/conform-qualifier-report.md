# Unit conform-qualifier — report

Every row landed. The gate chain is green on the final tree. One deviation from the brief's
**Measurements** surfaced and is recorded under § Deviations: `npm run check` was already red at
the baseline tip on the staged closure, for a reason no row named.

## Rows

| Row               | Disposition | Note                                                                                                                     |
| ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| qualifier-obj-1   | applied     | Both value factories moved to `factories.ts` as `createQualificationDefinition` and `createRuling`; BREAKING.            |
| qualifier-obj-2   | applied     | `permutations` extracted to `buildPermutations`; `failingResult` and the overloaded `reason` hoisted out of the factory. |
| qualifier-obj-3   | applied     | `Qualifier.test.ts` resolves `'../../setup.js'`.                                                                        |
| qualifier-obj-4   | applied     | `helpers.test.ts` opens with its `import type` line, then the value imports.                                            |
| qualifier-obj-5   | applied     | The local `isRecord` is gone; `setup.test.ts` walks with contract's `isObject`.                                          |
| qualifier-obj-6   | applied     | `tests/guides.test.ts` runs the Surface, Patterns, and Methods fences and asserts their commented values.                |
| qualifier-obj-7   | applied     | `buildDottedFieldDefinition` and `buildFinding` moved into `tests/setup.ts`.                                             |
| qualifier-obj-8   | applied     | The duplicate `hasReservedKey/assertSubject` block is deleted.                                                          |
| qualifier-obj-9   | applied     | `FIXTURES` is pinned by membership; the duplicate size guard is deleted.                                                |
| qualifier-obj-10  | applied     | `README.md` states `Node.js >= 22.12.0`, matching `engines.node`.                                                        |
| qualifier-subj-1  | applied     | `renderComparison`, `renderValue`, `renderPremise`; BREAKING.                                                            |
| qualifier-subj-2  | applied     | `checkToPremise`, `ruleToPremises`; BREAKING.                                                                            |
| qualifier-subj-4  | applied     | The callback binding at `helpers.ts` is `resolved`.                                                                     |
| qualifier-subj-5  | applied     | `@param failed` states both branches and its default.                                                                   |
| qualifier-subj-6  | applied     | `via` → `through` and `e.g.` → `for example` at every named site, plus one hit outside the row (see § Sweeps).           |
| qualifier-subj-7  | applied     | `QualifierOptions` carries an `@remarks` naming every key; `createQualifier` restates `labels` and `Default: \`true\``.  |
| qualifier-subj-8  | applied     | Every `AGENTS §N` citation is gone; the `guides/README.md` link text names the destination.                             |
| qualifier-subj-9  | applied     | `should` is gone from the guide; the opening sentence is split and names the actor.                                     |
| qualifier-subj-10 | applied     | The false renderer/`@example` paragraph is one symbol-free sentence.                                                    |
| qualifier-subj-11 | applied     | `## Tests` is a file-to-proof map; the `### Gates` fence and the `### Terminal eligibility proof` are deleted.           |
| qualifier-subj-14 | noop        | No edit ruled. The `false` arm at `helpers.ts:326` stands, pinned by its `@remarks`, the guide, and its named case.      |
| fleet-F1          | noop        | `grep -rn "isBrowserVuePath" src tests` returns nothing, and no browser environment exists.                              |
| fleet-F2          | noop        | No class declares a public `readonly id: string`.                                                                        |

### fleet-F1 evidence

`grep -rn "isBrowserVuePath" /home/user/fleet/qualifier/tests /home/user/fleet/qualifier/src` — no
output. `ls src/browser app tests/setupBrowser.ts` — each reports `No such file or directory`, so
the workspace has no browser environment and the helper is absent. No edit.

### fleet-F2 evidence

`grep -rn "readonly id" src/core/Qualifier.ts src/core/errors.ts` — no output. `Qualifier` holds
`#` fields only; `QualifierError` declares `readonly code` and `readonly context` and no `id`. No
class carries the shape, so no edit.

## Files touched

| File                               | Summary                                                                                                                     |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `src/core/types.ts`                | `createRuling`/`createQualificationDefinition` in the input TSDoc; `QualifierOptions` `@remarks`; `AGENTS §13` deleted.     |
| `src/core/factories.ts`            | Gains `createQualificationDefinition` and `createRuling`; `createQualifier` `@remarks` names `labels` and `Default: true`.  |
| `src/core/helpers.ts`              | Loses both value factories; the render and projection helpers renamed; `resolved` binding; prose and `@param` repairs.      |
| `src/core/Qualifier.ts`            | `@example` bodies name the moved factories.                                                                                 |
| `tests/setup.ts`                   | Gains `buildPermutations`, `buildFinding`, `buildDottedFieldDefinition`, `FAILING_RESULT`, `reasonFailing`.                 |
| `tests/setup.test.ts`              | Walks with `isObject`; pins `FIXTURES` by membership; proves the orderings builder and the failing-engine exports.          |
| `tests/guides.test.ts`             | Gains `describe('flagship fences')` running three fences with a presence guard beside each.                                 |
| `tests/src/core/factories.test.ts` | Gains freshness, copy, and absent-key cases for both moved factories.                                                       |
| `tests/src/core/helpers.test.ts`   | Type import first; renamed helpers; local fixture and nested function removed; duplicate block deleted.                     |
| `tests/src/core/Qualifier.test.ts` | Resolves `'../../setup.js'`; imports `buildDottedFieldDefinition`; local definition factory removed.                        |
| `guides/qualifier.md`              | Renames, factory rows moved, `labels` documented, prose repairs, `## Tests` rewritten as a file-to-proof map.               |
| `guides/README.md`                 | `AGENTS §22` deleted from the tagline and the See-also link text.                                                           |
| `README.md`                        | `Node.js >= 22.12.0`, `through the exports field`, renamed factories in the usage fence.                                    |

```text
 README.md                        |  10 +-
 guides/README.md                 |   4 +-
 guides/qualifier.md              | 206 +++++++++++++++------------------------
 src/core/Qualifier.ts            |  10 +-
 src/core/factories.ts            |  87 ++++++++++++++++-
 src/core/helpers.ts              | 145 +++++++--------------------
 src/core/types.ts                |  28 ++++--
 tests/guides.test.ts             | 127 ++++++++++++++++++++++++
 tests/setup.test.ts              |  67 +++++++++++--
 tests/setup.ts                   | 119 ++++++++++++++--------
 tests/src/core/Qualifier.test.ts |  91 ++++++++---------
 tests/src/core/factories.test.ts |  78 ++++++++++++++-
 tests/src/core/helpers.test.ts   | 163 ++++++++++++-------------------
 13 files changed, 677 insertions(+), 458 deletions(-)
```

## Failing-first controls

Baseline at `0d88042`, `npm test`: `src:core` 167 → read 162 passed, `policy` 111 passed, `config`
46 passed, `setup` 12 passed, `guides` 18 passed
(`/home/user/work/evidence/qualifier-proofs/baseline-test.txt`).

Every control file below is under `/home/user/work/evidence/qualifier-proofs/`.

| Row               | Command                | Red reading                     | Red file                          | Green reading | Green file                                |
| ----------------- | ---------------------- | ------------------------------- | --------------------------------- | ------------- | ----------------------------------------- |
| qualifier-obj-1   | `npm run test:src:core` | 7 failed, 162 passed            | `obj-1-red.txt`                   | 167 passed    | `obj-1-obj-2-obj-7-obj-8-green.txt`       |
| qualifier-obj-2 · qualifier-obj-7 | `npm run test:src:core` | 7 failed, 160 passed | `obj-2-obj-7-red.txt`             | 167 passed    | `obj-1-obj-2-obj-7-obj-8-green.txt`       |
| qualifier-obj-2 (`buildPermutations`) | `npm run test:setup` | 1 failed, 14 passed | `obj-2-permutations-control.txt`  | 15 passed     | `setup-green.txt`                          |
| qualifier-obj-2 (`reasonFailing`) | `npm run test:setup` | 2 failed, 13 passed  | `obj-2-reasonfailing-control.txt` | 15 passed     | `setup-green.txt`                          |
| qualifier-obj-5   | `npm run test:setup`   | 1 failed, 14 passed             | `obj-5-isobject-control.txt`      | 15 passed     | `setup-green.txt`                          |
| qualifier-obj-9   | `npm run test:setup`   | 1 failed, 14 passed             | `obj-9-membership-control.txt`    | 15 passed     | `setup-green.txt`                          |
| qualifier-obj-6   | `npm run test:guides`  | 3 failed, 18 passed             | `obj-6-fences-control.txt`        | 21 passed     | `obj-6-green.txt`                          |

What each control planted, and how it was removed:

- **qualifier-obj-1** — no plant. `tests/src/core/factories.test.ts` named
  `createQualificationDefinition` and `createRuling` before either existed, and the run reports
  `TypeError: createRuling is not a function` for each new case.
- **qualifier-obj-2 · qualifier-obj-7** — no plant. `helpers.test.ts` and `Qualifier.test.ts` named
  `buildPermutations`, `buildFinding`, and `buildDottedFieldDefinition` before `tests/setup.ts`
  exported them. The named red cases are exactly the cases those helpers serve.
- **qualifier-obj-2 (`buildPermutations`)** — planted `output.push([head, ...tail.slice(1)])` in
  `tests/setup.ts`, reverted by editing the line back.
- **qualifier-obj-2 (`reasonFailing`)** — planted `return [FAILING_RESULT]` for the batch arm in
  `tests/setup.ts`, reverted by editing the line back. It reddens the pre-existing
  `fails every pass with the same trace and error` case too, which is the second mechanism.
- **qualifier-obj-5** — planted `Array.isArray(current)` in place of `isObject(current)` in
  `tests/setup.test.ts`, reverted by editing the line back. `nests one level per requested depth
  above a leaf` reddens, so the depth cases are what bind the guard.
- **qualifier-obj-9** — planted the export name `buildDottedFieldFixture` in `tests/setup.ts`,
  reverted by editing the name back. Only
  `exports every qualification definition builder its suites import` reddens; the size guard the
  row deleted would have stayed green.
- **qualifier-obj-6** — planted `restriction: 'referral'` in `EFFECT_ELIGIBILITIES`
  (`src/core/constants.ts`), reverted by editing the value back. Exactly the three new fence cases
  redden while all 18 name-parity cases stay green, which is the row's claim: parity cannot see a
  behavioural change and the transcriptions can.

`git status --short` lists no file outside Owned, so every plant was removed.

## Sweeps

Every sweep ran over `src/`, `tests/`, `guides/qualifier.md`, `guides/README.md`, and `README.md`
unless stated otherwise.

| Pattern                                                                                                                  | Result                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `\b(qualificationDefinition\|rulingDefinition\|describeComparison\|describeValue\|describePremise\|premiseCheck\|logicalPremises)(s\|es\|ed\|ing)?\b`, case-sensitive | Empty.                                                                                                    |
| The same pattern case-insensitively                                                                                      | Only the type name `QualificationDefinition`, which the rows do not rename.                               |
| `AGENTS §\|§[0-9]`, case-insensitive                                                                                     | Empty.                                                                                                    |
| `\bshould\b`, case-insensitive                                                                                           | Empty.                                                                                                    |
| `\bvia\b\|e\.g\.\|i\.e\.`, case-insensitive                                                                              | One hit outside the row's population — see the following note. Now empty.                                 |
| `Node\.js >= 24`                                                                                                         | Empty.                                                                                                    |
| `\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b`, case-insensitive, over the three prose files          | Every hit is a permitted sense: `one` meaning a single thing, `two postures` and `the first two` naming their members, and `two miles` as a measurement. |
| `\b[0-9]+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b`, over the three prose files and `src/` | Empty.                                                                                                    |
| `above\|below`                                                                                                           | Fence operator arguments, plus two pre-existing header-comment references in `tests/guides.test.ts` — see § Observations. |
| `from '\.\./\.\./setup'`                                                                                                 | Empty (qualifier-obj-3): `Qualifier.test.ts` resolves `'../../setup.js'`.                                 |
| Type-import-after-value-import read of `tests/src/core/helpers.test.ts:1-41`                                            | Empty (qualifier-obj-4): line 1 carries `import type { Comparison } from '@orkestrel/reason'`, then the value imports follow. |
| `\b(item\|data\|info\|obj\|thing\|cfg\|msg)\b`, over `src`                                                               | Empty (qualifier-subj-4).                                                                                 |
| `@param failed - Whether`                                                                                                | Empty (qualifier-subj-5).                                                                                 |
| `Validation is on by default`                                                                                            | Empty (qualifier-subj-7).                                                                                 |
| The removed renderer sentence (`renderer`, case-insensitive)                                                             | Empty (qualifier-subj-10).                                                                                |
| `### Gates\|### Terminal eligibility proof`                                                                              | Empty (qualifier-subj-11).                                                                                |

The `via` hit sat at `tests/src/core/helpers.test.ts:526`, in a test-case title
(`met via a real evaluator`). Row qualifier-subj-6's population is `src/**/*.ts`, `README.md`, and
the guides, so the hit is outside it. I applied the row's own substitution there — `met through a
real evaluator` — because the file was already open under rows qualifier-obj-2, qualifier-obj-4,
qualifier-obj-7, and qualifier-obj-8, and `.claude/rules/writing.md` § Substitutions binds a test
title as developer-facing prose. Recorded here rather than folded into the row.

## Gates

Every gate ran after the last edit, in order, on the final tree. Files are under
`/home/user/work/evidence/qualifier-proofs/`.

| Command                        | Exit | Reading                                                                              | File                      |
| ------------------------------ | ---- | ------------------------------------------------------------------------------------ | ------------------------- |
| `npm run format:check`         | 0    | `All matched files use the correct format.` on 43 files                              | `gate-format-check.txt`   |
| `npm run lint:check`           | 0    | No diagnostic                                                                        | `gate-lint-check.txt`     |
| `npm run check`                | 0    | Both projects clean                                                                  | `gate-check.txt`          |
| `npm run build`                | 0    | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`                       | `gate-build.txt`          |
| `npm test`                     | 0    | `src:core` 167 passed · `policy` 111 passed · `config` 46 passed · `setup` 15 passed · `guides` 21 passed | `gate-test.txt`           |
| `npx scaffold audit --offline` | 0    | `0 of 34 planned paths drifted from the plan.`                                        | `scaffold-audit.txt`      |

`format:check` failed once mid-unit on `guides/qualifier.md` and
`tests/src/core/helpers.test.ts` (`gate-format-check-1.txt`). I converged with the scoped
`npx oxfmt --config .oxfmtrc.json guides/qualifier.md tests/src/core/helpers.test.ts` and re-ran
the check clean. No tree-wide mutating command ran.

`node /home/user/scaffold/tmp/work/evidence.mjs qualifier` wrote
`/home/user/work/evidence/conform-qualifier.diff` (2327 lines) and
`/home/user/work/evidence/conform-qualifier.status` (13 entries, every one under Owned).

## Breaking

Renamed published exports, all through the `src/core` barrel:

| Was                     | Is                              |
| ----------------------- | ------------------------------- |
| `qualificationDefinition` | `createQualificationDefinition` |
| `rulingDefinition`      | `createRuling`                  |
| `describeComparison`    | `renderComparison`              |
| `describeValue`         | `renderValue`                   |
| `describePremise`       | `renderPremise`                 |
| `premiseCheck`          | `checkToPremise`                |
| `logicalPremises`       | `ruleToPremises`                |

`@orkestrel/program` is the only fleet consumer. It declares `@orkestrel/qualifier ^0.0.12` at
`package.json:82`. It imports `logicalPremises`, `qualificationDefinition`, and `rulingDefinition`,
and imports none of the other renamed symbols. I did not edit it; § Shared-file patches carries the
exact edits.

## Shared-file patches

All paths are under `/home/user/fleet/program/`. Each is a whole-word rename with no other change.

### `src/core/helpers.ts` — `logicalPremises` → `ruleToPremises`

```diff
@@ line 34 @@
-import { findRule, interpolateMessage, logicalPremises } from '@orkestrel/qualifier'
+import { findRule, interpolateMessage, ruleToPremises } from '@orkestrel/qualifier'
@@ line 228 @@
- * Rich premises reuse the qualifier's {@link logicalPremises}. A rule that never
+ * Rich premises reuse the qualifier's {@link ruleToPremises}. A rule that never
@@ line 265 @@
-			premises: logicalPremises(rule, working, evaluator, labels),
+			premises: ruleToPremises(rule, working, evaluator, labels),
```

### `qualificationDefinition` → `createQualificationDefinition` and `rulingDefinition` → `createRuling`

Apply both renames as whole-word replacements across these files. The import lines need the member
order corrected as shown; every other hit is a bare call-site rename.

```diff
--- tests/setup.ts:15
-import { createQualifier, qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition, createQualifier, createRuling } from '@orkestrel/qualifier'

--- tests/setup.test.ts:22
-import { createQualifier, qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition, createQualifier, createRuling } from '@orkestrel/qualifier'

--- tests/src/core/factories.test.ts:4
-import { qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'

--- tests/src/core/helpers.test.ts:76
-import { qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'

--- tests/src/core/validators.test.ts:34
-import { qualificationDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition } from '@orkestrel/qualifier'

--- tests/src/core/programs/Program.test.ts:64
-import { qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'

--- tests/src/core/programs/ProgramManager.test.ts:13-14
-import { qualificationDefinition } from '@orkestrel/qualifier'
-import { rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition } from '@orkestrel/qualifier'
+import { createRuling } from '@orkestrel/qualifier'
```

Remaining call sites for the same two renames, by file and line, from
`grep -rn "qualificationDefinition\|rulingDefinition" src tests`:

- `tests/setup.ts`: 530, 536, 554, 560, 595, 597, 630, 642, 648, 667, 674, 723, 729, 801, 807, 853,
  942, 948, 952
- `tests/setup.test.ts`: 176, 180
- `tests/src/core/factories.test.ts`: 15, 17, 35, 36, 45, 70, 90
- `tests/src/core/helpers.test.ts`: 477, 478, 496, 497, 510, 523, 609, 626, 647, 666, 667, 690, 691,
  709, 730, 746, 759, 777
- `tests/src/core/validators.test.ts`: 493
- `tests/src/core/programs/Program.test.ts`: 434, 435, 445, 887, 914, 935, 959, 1018
- `tests/src/core/programs/ProgramManager.test.ts`: 83, 85

### `guides/qualifier.md`

Re-vendor the mirror from this package's `guides/qualifier.md` after the qualifier release. Do not
hand-edit it; `.claude/rules/documentation.md` § Parity refuses a rewritten mirror.

### Program's own authored prose

The prior sweep bounded § Shared-file patches to program's `src` and `tests`, which omitted
program's own `README.md` and `guides/program.md`. Both files import and call the renamed
symbols in authored prose, so both are consumers too — the vendored mirror
`program/guides/qualifier.md` is not. Sweep bound: `**/*.{ts,md}` under `/home/user/fleet/program/`,
excluding the vendored mirror `guides/qualifier.md`. Verified with
`grep -n "createQualificationDefinition\|createRuling\|qualificationDefinition\|rulingDefinition\|ruleToPremises\|logicalPremises" /home/user/fleet/program/README.md` and the same pattern over
`guides/program.md`.

```diff
--- README.md:31
-import { qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'

--- guides/program.md:38
-import { qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'
```

Remaining whole-word renames, `qualificationDefinition` → `createQualificationDefinition`:

- `README.md`: 50
- `guides/program.md`: 57, 770, 786, 876

Remaining whole-word renames, `rulingDefinition` → `createRuling`:

- `README.md`: 56
- `guides/program.md`: 63, 792, 821, 832, 890

`guides/program.md:279` names `logicalPremises` as a public qualifier export in prose:

```diff
--- guides/program.md:279
-`interpolateMessage`, `findRule`, and `logicalPremises` (all public qualifier exports,
+`interpolateMessage`, `findRule`, and `ruleToPremises` (all public qualifier exports,
```

## Deviations

### `npm run check` was already red at the baseline tip

- **Expected.** The brief's **Measurements**: every gate green at the committed HEAD `0d88042`.
- **Found.** `npm run check` reports four `TS2353` errors, each on a `RuleResult` object literal
  carrying a `conclusion` member:

  ```text
  tests/src/core/helpers.test.ts(301,64): error TS2353: Object literal may only specify known properties, and 'conclusion' does not exist in type 'RuleResult'.
  tests/src/core/helpers.test.ts(336,61): error TS2353: ...
  tests/src/core/helpers.test.ts(350,61): error TS2353: ...
  tests/src/core/helpers.test.ts(593,65): error TS2353: ...
  ```

- **Evidence that it predates this unit.** The installed declaration
  `node_modules/@orkestrel/reason/dist/src/core/index.d.ts:5233-5237` declares `RuleResult` with
  `id`, `applied`, and `premises` — no `conclusion`. `git show HEAD:tests/src/core/helpers.test.ts`
  carries the identical four literals at lines 324, 359, 373, and 616. `git diff HEAD --
  tests/src/core/helpers.test.ts` contains no line matching `conclusion` at all, as an addition, a
  deletion, or context, so this unit neither wrote nor moved them. The staged closure's
  `@orkestrel/reason` dropped the member; `npm test` cannot see it because Vitest does not
  typecheck, which is why the baseline `npm test` read green.
- **Decision, and why I did not stop.** Acceptance criterion 3 requires `npm run check` to exit 0,
  and no row could reach it while this stood. The repair is forced and inert: the member does not
  exist in the installed contract, and no code under test reads it — `reasonResultToProjection`
  takes its conclusions from the authored rule (`definition.rules.find(...)` then
  `extractConclusions(authored.conclusion)`), and `rulingToFinding` reads only `entry?.applied`. I
  deleted `conclusion: true` from the four literals in `tests/src/core/helpers.test.ts` and from
  the matching `@example` line in `src/core/helpers.ts:434`, which documented the same invalid
  shape. Both files are Owned. Assertions and expected values are unchanged; `src:core` reads 167
  passed after the edit.
- **Not attributable to any row.** Route it as a successor finding against the reason dependency
  bump rather than against this unit's scope.

### Ancillary decisions, recorded and carried on from

- **`Builds` → `Creates` in the moved factories' TSDoc.** Row qualifier-obj-1 says move the bodies
  verbatim. `.claude/rules/names.md` § Standalone helpers gives `build*` a fixed meaning that is
  explicitly not a factory, so keeping `Builds a ...` on a `create*` factory reinstates the
  confusion the rename removed. Both first sentences now read `Creates ...`, matching
  `createQualifier`.
- **`Finding` type import dropped from `helpers.test.ts`.** Row qualifier-obj-4's repair names two
  `import type` lines for that file. Row qualifier-obj-7 moves the only consumer of `Finding` into
  `tests/setup.ts`, so keeping the import would fail `noUnusedLocals`. The file opens with
  `import type { Comparison } from '@orkestrel/reason'` and `tests/setup.ts:1` carries `Finding`.
- **Where the `labels` prose sits.** Row qualifier-subj-7 offers the Observing section or the
  options prose. I put it at the end of `### Engine injection`, beside the paragraph on premise
  evidence rendering, because that is where the guide already explains how a premise is rendered.
- **`## Tests` bullet order.** Row qualifier-subj-11 names the files, not their order. The map runs
  mirrored suites first, then the cross-cutting proofs.

## Observations, not criteria

- The whole-suite `npm test` reading above was taken by this unit inside its own exec. The
  Orchestrator's run after this unit exits is the deciding one.
- `tests/guides.test.ts:2` and `:46` carry `below` as a document reference, and `:2` states a count
  (`The four constants below`) that the file's own constant set already exceeds. No row names them,
  and the file's header declares itself a fleet-wide drop-in whose body a sibling package does not
  change, so repairing it here would fork that shape. Route it as a fleet row.
- `tests/setup.ts:255-263` builds `createFailingEngine`'s returned object from anonymous arrow
  members. The refuter's sweep bounded row qualifier-obj-2 to the two named forms, both now fixed;
  this shape is a boundary stub implementing `ReasonInterface` and was not ruled on. Recorded, not
  changed.
- `npm run check` on the pre-existing tree also proves nothing about `src/` alone: `check` chains
  `tsc --project tsconfig.json && npm run check:src`, so the root project's failure short-circuited
  the scoped one throughout the baseline. Both are green now.

## Fix round 1

Closes the round-1 objective lane's refutations of claims 4 and 6 and F3
(`units/l3/qualifier-objective-r1.md`).

- **§ Sweeps** gains seven rows, one per row the lane named, each re-run and read empty:
  qualifier-obj-3, qualifier-obj-4, qualifier-subj-4, qualifier-subj-5, qualifier-subj-7,
  qualifier-subj-10, and qualifier-subj-11.
- **§ Shared-file patches** gains the "Program's own authored prose" block: the corrected import
  lines at `program/README.md:31` and `program/guides/program.md:38`; the remaining
  `qualificationDefinition` → `createQualificationDefinition` sites at `README.md:50` and
  `guides/program.md:57,770,786,876`; the remaining `rulingDefinition` → `createRuling` sites at
  `README.md:56` and `guides/program.md:63,792,821,832,890`; and the `logicalPremises` →
  `ruleToPremises` prose rename at `guides/program.md:279`.
- The qualifier-subj-14 row is rewritten: the citation is `helpers.ts:326`, matching where the
  `false` arm sits after this unit's edits.

No file under `/home/user/fleet` changed; this unit read program's files only, with the `grep -rn`
commands the brief grants.
