# Unit B-SWEEP — report

## Deviations

Recorded per `.agents/orchestration.md` § Deviation protocol. Each is closed and leaves no work
undone.

### 1. The exported name is `findDuplication`, not `findDuplicates`

**Expected.** D15 ruling 2 and the brief fix the exported name `findDuplicates`.

**Found.** That name fails a standing gate. `@orkestrel/reason` claims `findDuplicates` in its
hosted `## Surface` section
(`node_modules/@orkestrel/scaffold/dist/host/guides/reason.md`, the `findDuplicates` row), and
`inspectPolicySurface` in `tests/setupPolicy.ts` grants a root `tests/setup*.ts` export no
grandfather. Proved by running the gate with the verdict's name in place:

```text
$ npm run test:policy            # findDuplicates declared in tests/setupServer.ts
FAIL |policy| tests/policy.test.ts > repository policy > enforces the workspace policy laws including surface ownership
+   { "line": 679,
+     "message": "surface name belongs to one package: findDuplicates (reason)",
+     "path": "tests/setupServer.ts",
+     "rule": "surface" }
 Tests  1 failed | 108 passed | 1 skipped (110)     exit 1
```

**Resolution.** Renamed to `findDuplication` inside owned scope, per
`.claude/rules/names.md` § Fleet name ownership: reuse is barred (`@orkestrel/reason` is not a
declared dependency and its contract differs — it collects duplicated ids), the published package
keeps the colliding name, and the rename names this contract rather than a vaguer one. The
`find` prefix and the `findDrift` precedent the verdict cites are kept; only the colliding word
moves. No other fleet guide claims `findDuplication`
(searched `` `findDuplication` `` across `node_modules/@orkestrel/scaffold/dist/host/guides/*.md`
and `guides/*.md`; no hit). The same gate is green after the rename:
`109 passed | 1 skipped (110)`, exit 0.

**Done.** Yes. The unit is complete under the renamed export.

**Carries for the Orchestrator.** D15 ruling 2, `tmp/units/b-sweep-brief.md`, and any audit claims
file naming `findDuplicates` name a symbol this tree cannot declare. They need the rename, or a
counter-ruling that reopens it.

### 2. The baseline `test:setup` was red for missing build artifacts

**Expected.** The brief's measurement step expects `npm run test:setup` green before editing.

**Found.** This worktree carries no `dist/`, and the `setup` project reads built output:

```text
$ npm run test:setup            # at aca0423, before any edit
 Test Files  2 failed | 1 passed (3)
      Tests  7 failed | 153 passed (160)          exit 1
```

Every failure is `ENOENT ... dist/src/styles/index.css` through `readBuiltCascade`, plus
`dist/src/core/index.js` in `finds a forbidden runtime in a built entry ...`. One failing case is
titled `requires the built cascade from npm run build:src:styles`, which names the prerequisite.

**Resolution.** Ran the scoped builds the proofs name — `npm run build:src:styles` and
`npm run build:src:core` — and nothing wider. Each writes only `dist/`, which `.gitignore` ignores,
so `git status --porcelain` still lists the owned files alone. No tree-wide `build`, `format`, or
`lint --fix` ran.

**Done.** Yes. The baseline reached green before the first edit.

## Readings

| Run | `npm run test:setup` | Exit |
| --- | --- | --- |
| Baseline at `aca0423`, no `dist/` | `Tests 7 failed \| 153 passed (160)` | 1 |
| Baseline after `build:src:styles` and `build:src:core` | `Tests 160 passed (160)` | 0 |
| After this change | `Tests 165 passed (165)` | 0 |

## The plant and what each case distinguishes

Every case builds a real scratch tree through `createScratch`, destroys it in `finally`, and calls
the real `scanStyleBlocks(scratch.path)` before `findDuplication`. Each mutation listed was applied
to `tests/setupServer.ts`, run as
`npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts`
(`77 passed` unmutated), and reverted.

| Case in `describe('findDuplication')` | Shape (overlap, left, right) | Reading | Mutations it distinguishes |
| --- | --- | --- | --- |
| `reports a block one partial copies into another, naming each site and every shared declaration` | (2, 2, 2) | reported, naming `_origin.scss` line 1, `components/_echo.scss` line 2, and `['margin: 0', 'color: inherit']` | A predicate that reports nothing (`count >= 99`) reddens it. A sweep that applies the predicate itself reddens it. |
| `refuses an overlap covering half of each equal block, and reports it after one block narrows` | (3, 6, 6) then (3, 5, 6) | refused, then reported with the same overlap | The tie boundary `count * 2 >= smallest` reddens it — this is the case that pins `>` against `>=`. `Math.max` for `Math.min` reddens it. A predicate that reports everything, one that reports nothing, and a sweep that filters all redden it. |
| `refuses a short overlap inside a wider block, and reports it against a block it is most of` | (2, 5, 6) then (2, 3, 6) | refused, then reported, naming each path and `['margin: 0', 'color: inherit']` | `Math.max` for `Math.min` reddens it. A predicate that reports everything, one that reports nothing, and a sweep that filters all redden it. |
| `reports an overlap wider than accident reaches inside large blocks, and refuses its narrower twin` | (6, 12, 14) then (5, 12, 14) | reported by the absolute arm, then refused | Dropping the absolute arm reddens it. Lowering it to `count >= 5` reddens it. A predicate that reports everything and one that reports nothing redden it. |
| `leaves the sweep reporting every refused intersection it found` | (2, 5, 6) and (3, 6, 6) in one tree | `sweep.shared` lists each intersection with its paths and declarations; `findDuplication(sweep.shared)` is `[]` | A sweep that applies the predicate itself (`declarations.length >= 4`) reddens it — this is the case that pins D15 ruling 2's separation. The tie boundary and a report-everything predicate redden it. |

**One arm no case distinguishes.** Mutating the relative arm's floor from `count >= 2` to
`count >= 1` leaves every case green (`77 passed`). `scanStyleBlocks` emits no intersection
under 2 declarations, so no scanner-driven input reaches that floor; it is defensive against a
hand-built overlap. Flagged rather than covered, because the brief fixes every case on the real
sweep's output.

## Touched files

| File | Change |
| --- | --- |
| `tests/setupServer.ts` | Adds the `findDuplication` pure leaf directly after `scanStyleBlocks`, with the predicate D15 ruling 3 fixes and TSDoc stating each arm, the 2026-09-22 maximum-coincidence reading behind the absolute arm, and the sweep's unchanged contract. Moves the `[]` example onto it and gives `scanStyleBlocks` an example showing a coincidence in its reading. Nothing else in the file moves. |
| `tests/setupServer.test.ts` | Adds `describe('findDuplication')` with the plant's cases, imports the leaf, and adds `'findDuplication'` to the export inventory at its sorted position. |
| `tests/setupStyles.test.ts` | Retitles the gate case to `repeats no partial's written declaration block in another partial`, points its last assertion at `findDuplication(sweep.shared)`, and imports the leaf. The file and folder assertions stand. |

## Gate exits

| Gate | Reading | Exit |
| --- | --- | --- |
| `npm run format:check` | `All matched files use the correct format.` (214 files) | 0 |
| `npm run lint:check` | no diagnostic | 0 |
| `npm run check` | no diagnostic across root, `src` core, browser, styles, and `app` browser | 0 |
| `npm run test:setup` | `Test Files 3 passed (3)`, `Tests 165 passed (165)` | 0 |
| `npm run test:policy` | `Tests 109 passed \| 1 skipped (110)` | 0 |

Scoped `npx oxfmt --config .oxfmtrc.json --write` ran over the owned files before the chain.

## Tree state

```text
$ git status --porcelain
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts

$ git diff aca0423 --stat
 tests/setupServer.test.ts | 145 ++++++++++++++++++++++++++++++++++++++++++++++
 tests/setupServer.ts      |  29 +++++++++-
 tests/setupStyles.test.ts |   5 +-
 3 files changed, 176 insertions(+), 3 deletions(-)
```
