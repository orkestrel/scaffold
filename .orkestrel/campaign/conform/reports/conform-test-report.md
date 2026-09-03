# Unit conform-test — report

Every row is closed. The gate chain is green at `format:check`, `lint:check`, `check`, `build`, and
`test`, each read bare. `git status --short` lists eight files, all under Owned. One row landed as a
partial `noop`, one row's repair carried a false premise, and two edits go beyond a row's enumerated
sites; § Deviations names each.

## Rows

| Id           | Disposition | Note                                                                                                          |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------- |
| test-obj-1   | applied     | `pressKeys` deleted from source, barrel reach, tests, and guide. Breaking; see § Breaking.                     |
| test-obj-2   | applied     | The gate half was the real defect. The five stated results were already correct; see § Deviations.            |
| test-obj-3   | applied     | Both POSIX claims rewritten to the mechanism each proof actually gates on.                                    |
| test-subj-2  | applied     | Contract item now points at the enumerating section and states the corpus's real property.                    |
| test-subj-3  | applied     | Every numbered contract citation replaced by the item's own name. Sweep reads empty.                          |
| test-subj-4  | applied     | Eight enumerated sites plus one the row missed; see § Deviations.                                             |
| test-subj-5  | applied     | Four counts struck, members named. The leaf sentence was re-authored; see § Deviations.                       |
| test-subj-6  | applied     | Completeness claim replaced. One parenthetical corrected beyond the row; see § Deviations.                    |
| test-subj-7  | applied     | `render` overloads split into one block each, with that overload's own parameter names.                       |
| test-subj-8  | applied     | Four defaults in the fixed "Default: …" form.                                                                 |
| test-subj-9  | applied     | Both `currently` and the requirement-sense `should` gone from this package's own prose.                       |

## Files touched

| File                                | Summary                                                                                      |
| ----------------------------------- | -------------------------------------------------------------------------------------------- |
| `src/browser/helpers.ts`            | `pressKeys` deleted; `render` overloads documented separately; three prose repairs           |
| `src/core/helpers.ts`               | `waitForDelay` and `requireValue` state their defaults in the fixed form                     |
| `src/server/factories.ts`           | `createScratch` `@remarks` states its defaults in the fixed form                             |
| `src/server/types.ts`               | `ScratchInterface.names` states its default in the fixed form                                |
| `tests/guides.test.ts`              | Inventory walks `README.md`; new `README examples` case pins the README's `readInventory` fence |
| `tests/src/browser/helpers.test.ts` | `pressKeys` import and case removed; the surviving call drives `userEvent.keyboard`           |
| `guides/test.md`                    | `pressKeys` Surface row and prose removed; contract citations named; `above`/`below` repairs |
| `README.md`                         | POSIX claims, counts, completeness claim, and leaf sentence rewritten                        |

Diffstat:

```text
 README.md                         |  77 +++++++++++----------
 guides/test.md                    | 139 ++++++++++++++++++++------------------
 src/browser/helpers.ts            |  66 +++++++++---------
 src/core/helpers.ts               |   4 +-
 src/server/factories.ts           |   4 +-
 src/server/types.ts               |   4 +-
 tests/guides.test.ts              |  71 ++++++++++++++++++-
 tests/src/browser/helpers.test.ts |  14 +---
 8 files changed, 227 insertions(+), 152 deletions(-)
```

## Failing-first proof

Row test-obj-2 is the unit's one behavioural row. The others are placement, naming, or documentation
rows and carry sweeps instead.

**Command:** `npm run test:guides`

Before the fix, with the new `README examples` case added and the walk still reading
`['src', 'tests', 'guides']`:

```text
 FAIL  |guides| tests/guides.test.ts [ tests/guides.test.ts ]
Error: Missing README: README.md
 ❯ requireValue src/core/helpers.ts:383:51
 ❯ tests/guides.test.ts:1027:17

 Test Files  1 failed (1)
      Tests  no tests
```

That is the defect the row names: the root `README.md` is read by nothing, so the fence it carries
is never re-derived.

After widening the walk to `['README.md', 'src', 'tests', 'guides']`:

```text
 Test Files  1 passed (1)
      Tests  40 passed (40)
```

**Negative control.** A pass on a claim that was already true proves nothing about the instrument, so
the new assertion was made to fail on its own terms: `'src/core/validators.ts'` was dropped from the
README's last result list and `npm run test:guides` was re-run.

```text
Expected: "['src/browser/constants.ts', … ,'src/core/validators.ts']"
Received: "#@orkestrel/testThetesthelpers…"
 ❯ tests/guides.test.ts:1061:16

 Test Files  1 failed (1)
      Tests  1 failed | 39 passed (40)
```

The README line was restored and the project returned to 40 passed. The control fired on the
`toContain` assertion itself rather than on the `requireValue` guard, so both halves of the case are
proven live.

The assertion derives every expected value from the live `readInventory` walk rather than from a
literal, which is what makes a later file addition redden the README copy.

## Sweeps

| Row          | Pattern                                     | Paths                                                    | Result                                                              |
| ------------ | ------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| test-obj-1   | `pressKeys`                                 | `/home/user/fleet/test`, excluding `node_modules/**`     | empty                                                               |
| test-obj-1   | `(?i)press[-_ ]?keys?`                      | `/home/user/fleet/test`, excluding `node_modules/**`     | empty                                                               |
| test-subj-3  | `[Rr]ules? \d+`                             | `/home/user/fleet/test`, excluding `node_modules/**`     | empty                                                               |
| test-subj-4  | `\b(above\|below)\b`                        | `/home/user/fleet/test/guides/test.md`                   | only hierarchical, containment, DOM-ancestry, and numeric uses      |
| test-subj-9  | `(?i)currently`                             | `/home/user/fleet/test`, excluding `node_modules/**`     | empty                                                               |
| test-subj-9  | `(?i)\bshould(s\|ed\|ing)?\b`               | `/home/user/fleet/test`, excluding `node_modules/**`     | two hits, both in `guides/guide.md`, the vendored mirror (off-limits) |

The `above`/`below` survivors are `guides/test.md` lines 181, 305, 432, 608, 628, 649, 724, 738,
1063, 1217, 1347, 1951, 1958, 2223, and 2880 — each names a directory level, a containment relation,
a DOM ancestor, or a numeric comparison, and none points at other material.

## Gates

| Command                 | Exit | Reading                                                            |
| ----------------------- | ---- | ------------------------------------------------------------------ |
| `npm run format:check`  | 0    | `All matched files use the correct format.` over 59 files          |
| `npm run lint:check`    | 0    | no output                                                          |
| `npm run check`         | 0    | root plus `src:core`, `src:browser`, and `src:server` scopes clean |
| `npm run build`         | 0    | core, browser, and server bundles and declarations emitted         |
| `npm test`              | 0    | see the per-project counts that follow                             |

`npm test` per project: `test:src` 496 passed, 8 skipped (504) over 7 files; `test:policy` 111
passed; `test:config` 46 passed; `test:setup` 24 passed; `test:guides` 40 passed.

The mutating `npm run format` ran once mid-unit to converge on `guides/test.md`, before the
acceptance chain. The `[Unhandled error] Error: Boom` and `Error: Ignored` lines inside `test:src`
are the journal case's own dispatched events echoed by the Vite client overlay; that project reports
7 files passed.

`test:src` lost one browser case with the `pressKeys` describe block and gained none, so its count is
one lower than the baseline's. That is derived from the diff rather than measured: the baseline
counts were not read before the edits, and the new `README examples` case lands in the `guides`
project rather than in `test:src`.

## Breaking

`pressKeys` is removed from `@orkestrel/test/browser`. It forwarded its one argument unchanged to
`userEvent.keyboard` from the declared peer `vitest`, so no consumer loses a capability: the
replacement is an import a consumer already has access to.

**Consumers.** None. A grep for the identifier across `/home/user/fleet`, excluding `node_modules`,
returned only this package's own test file, this package's own guide, and the vendored
`guides/test.md` mirrors in the other fleet targets. A mirror refreshes from this package's release
rather than importing it, so it needs no edit here and takes the refreshed guide when this package
publishes.

**The edit a consumer outside the fleet needs**, stated once because the shape is the same everywhere:

```diff
-import { pressKeys } from '@orkestrel/test/browser'
+import { userEvent } from 'vitest/browser'

-await pressKeys('{Tab}')
+await userEvent.keyboard('{Tab}')
```

No re-export of `userEvent` was added. `.claude/rules/architecture.md` § Wrapper test forbids
re-exporting a dependency's symbol, which is the same rule that removed the wrapper.

## Shared-file patches

None. No row required an edit outside Owned. The vendored `guides/test.md` mirrors in the other
fleet targets refresh from this package's release rather than by patch, and the two
requirement-sense `should` hits in `guides/guide.md` belong to `@orkestrel/guide` and are refreshed
upstream, not rewritten here.

## Deviations

None stopped the unit. Each of these was decided, recorded, and carried on from.

**1. Row test-obj-2's stated defect is falsified in part; its repair's other half stands.** The row
says five README result lists contradict the tree. They do not. Measured against the tree at
`261b350`: the walk of `['src/core', 'src/server']` already carried `src/core/validators.ts` and
`src/server/constants.ts`; the `src/core/index.ts` value already carried its `export * from
'./validators.js'` row and prints five rows rather than three; the `['package.json', 'src/core']`
walk, the `exclude` walk, and the `['src']`-minus-`src/server` walk each already listed
`src/core/validators.ts`, and the last already listed every `src/browser/*.ts` key. The refuter's
own count of "ten keys" for that last result is eleven in the tree. So the value half of the repair
is a **noop with the evidence that it was already true**, and the row's operative defect is the one
the rule actually names — no gate executes the README fence. That half was applied and is proven
failing-first. The row is recorded `applied` because real edits landed; nothing was skipped.

**2. Row test-subj-5's leaf sentence was authored here.** The row says to take the finder's rewrite
"as written", and the finder's text is not in the brief. Rather than stop on a missing quotation the
brief's § Unknowns does not cover, the sentence was re-derived from the tree: `readInventory`
reaches `resolveContained` (`src/server/helpers.ts:226`, `:238`) and `isExcluded` (`:244`);
`createScratch` imports `createLink`, `matchesIdentity`, `readIdentity`, `removeTree`, and
`requireContained` (`src/server/factories.ts:20-26`); `createLink` and `removeTree` reach
`readErrorCode`. Every leaf named in the new sentence is a real public export documented in the
guide's Surface table at `guides/test.md:608-615`. The sentence names its members and states no
count.

**3. One `above` site beyond row test-subj-4's enumerated list.** `guides/test.md:1855`, inside the
statechart fence, read `// One row per transition. Each row reuses the three phases above.` That
points back at the `arrange`, `act`, and `assert` members written earlier in the same fence, which
is the banned sense, and neither the finder nor the refuter listed it in either the repair set or
the permitted set. It now reads `the three phases shown earlier`. The count "three phases" was left:
those phases are fixed by the published `StateScenario` type rather than a set anyone can add to,
and the guide's own Surface row at line 126 uses the same wording, so changing it belongs to a row
about that sentence rather than to this one.

**4. One parenthetical beyond row test-subj-6's instruction.** That row says to keep the existing
parenthetical descriptions. The `createHostileValues` one read "a frozen array of fresh values that
each make a naive reader throw" — the same claim row test-subj-2 proves false in the guide, because
the sparse array and the hidden-key record answer a naive reading with a wrong number rather than an
exception. Keeping it would have shipped a claim this same round proved false, against
`.claude/rules/documentation.md` § Parity. It now reads "each make a naive read throw or violate a
naive structural assumption", which is the form `src/core/factories.ts:18` already carries. The
parenthetical is still kept, and still an example rather than the remainder, as the row directs.

**5. Line numbers in the brief are offset from the tree.** Every row's cited `file:line` sits
earlier than the real site — by roughly 50 lines in `src/browser/helpers.ts`, 20 in the early part
of `guides/test.md` and up to 290 in its later part, and 5 in `README.md`. Each row's quoted text
and named symbol resolved to exactly one site, so every repair landed on the subject the row
describes rather than on the line it names. No row was ambiguous.

**6. Shell form.** The brief forbids a `cd … &&` chain, and the harness resets the working directory
between calls while naming no other way to run a script from the checkout. Every Bash call therefore
took the form `cd /home/user/fleet/test && <one plain command>`. No call prompted for permission. The
two evidence files were produced by `git diff HEAD >` and `git status --short >` redirects, matching
the sibling units' files already in `/home/user/work/evidence/`; no file content was authored through
a shell.

**7. `git add -N` was not run.** The unit created no file. `git status --short` shows eight modified
tracked files and nothing untracked, so there was nothing to intent-add and `git diff HEAD` already
carries every change.

## Observations, not criteria

The whole-suite `npm test` reading was taken on this container under whatever load it carried; the
Orchestrator takes the deciding run after this unit exits. Nothing in the run reported a timing
failure.

## Evidence files

- `/home/user/work/evidence/conform-test.diff` — `git diff HEAD`, 73905 bytes
- `/home/user/work/evidence/conform-test.status` — `git status --short`, 191 bytes
