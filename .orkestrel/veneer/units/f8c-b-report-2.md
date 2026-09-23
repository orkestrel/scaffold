# F8c-B MOVE, round 2: report (`f8c-b-brief-2.md`)

Executor: `opus` on Opus 5.5, a native Claude subagent. It was the sole writer in `/home/user/veneer-f8b` (branch `unit/f8b`, checkpoint `b9c0b0a`, with the round-1 writes uncommitted). Nothing is committed.

All nine carried findings are closed in the owned files, and every gate the brief names exits 0. One deviation needs your ruling. The citation that finding 5 prescribes names two sections that do not state the `@import` placement rule. The guide cites the sections that do state it. See § Deviations.

## Carried findings

1. **Reviewer 4(a), the important-branch overclaim: closed.**
   - The guide sentence ends as follows: "with the exclusion line dropped and Tailwind's own rule on the page, the element resolves, for every property that rule declares, what it resolves under the cascade and the plant alone."
   - The comment at the comparison in `consumer.test.ts` says the same thing.
   - "The cascade alone" became "the cascade and the plant alone", because the baseline reading is taken with the plant loaded.
2. **Reviewer 4(b), the § Files grammar: closed.** The `tests/setupService.ts` row takes the colon grammar: "The service setup: the readiness that verifies the compiler, the built cascade, the pinned browser, and the candidate list; the paths of the Tailwind profiles and fixtures; the profile compiler; and the stage that reads what a page resolves."
   - The row adds "the paths of the Tailwind profiles and fixtures" for the export that finding 6 adds.
   - The `tests/setupServer.ts` row now reads "the installed and built cascades and the guide" for the finding 6 loader.
3. **Reviewer 4, § Scripts wording: closed.**
   - "The publish chain runs it" became "the `prepublishOnly` chain runs it".
   - "Its readiness … before it" became "The `service` project's readiness … before the `test:service` script."
4. **Reviewer R1: closed.** The comparison reddens under the prescribed plant. See § Mutations. No source change.
5. **D25 (reviewer R2): closed, with the citations corrected.**
   - The paragraph states the rule: "an `@import` rule is valid only ahead of every rule other than `@charset` and `@layer` statements". It cites CSS Cascading and Inheritance Level 5, § Importing Style Sheets (`#at-import`) and § Declaring Without Styles (`#layer-empty`).
   - The Vite sentence is restated as a consequence of the rule: "A processor that follows that rule drops an `@import` rule written after a `@source` rule, as the `postcss-import` plugin Vite bundles does, and the cascade import is the one you lose."
   - The closing clause is kept: each recipe writes its imports first, so the rule holds whichever tool inlines them.
   - No test is added. Deviation 1 covers the citations.
6. **Reviewer R4: closed.**
   - `tests/setupService.ts` exports the frozen `TAILWIND_PATHS` record: `tailwind`, `preflight`, `consumer`, `instrument`, and `markup`, each an absolute path under `WORKSPACE_ROOT`.
   - `tests/setupServer.ts` exports `readVeneerGuide()`, which reads `resolve(WORKSPACE_ROOT, VENEER_GUIDE_PATH)`.
   - Both are inventoried and proved. Every repeated path and guide read in the three service proofs goes through them.
   - A word-boundary grep for either name over `tests/` finds no other declaration.
7. **D27 (analyst 1): closed.**
   - The comment on the profiles order case (`declares the one order line in every profile, …`) now says the reading is the first placement of each layer across the linked cascade followed by the loaded profile. It also says the sheet sequence is the one `stage.open` and `stage.load` fix, and the proof assumes it rather than observing it.
   - The comment on the `properties` case points at that assumption.
   - After the guide's "reads both orders" sentence, a new sentence states the same limit.
8. **Deviation 3 (round 1): closed.** The `@param source` TSDoc of `collectInlineSources` now reads: "The stylesheet text, such as a profile read from its file or the CSS fences of a guide holding a profile."
9. **Analyst 2: the complete grep result, with no code change.**
   - `grep -rn "candidates.txt\|CANDIDATES_PATH" tests configs src app` returns `tests/setupService.ts` (the declaration and the one write, in `verifyReadiness`), the four hits in `tests/setupService.test.ts`, and three `@source` read directives: `tests/setup.css:13`, `tests/fixtures/tailwind/preflight.css:5`, and `tests/fixtures/tailwind/unexcluded.css:7`.
   - `verifyReadiness` is the only writer.

## Export names settled

- **`TAILWIND_PATHS`** (`tests/setupService.ts`, placed after `CANDIDATES_PATH`) is a frozen record with an inferred type, like the `CAPTURE_CONTROLS` and `FOCUS_RING` constants in `tests/setup.ts`.
  - Keys: `tailwind` (`tests/setup.css`), `preflight`, `consumer`, `instrument` (`unexcluded.css`), and `markup`.
  - The paths are absolute because `compileProfile` passes each path as the compile's `from`.
  - A record keeps the Tailwind files in one home with one-word keys.
  - `tailwind` is outside the brief's list: `tests/setup.css` was repeated in `profiles.test.ts` and `tests/setupService.test.ts` (the `CANDIDATE_FLOOR` case), which is the same `tests.md` defect. Both sites use the key.
- **`readVeneerGuide()`** (`tests/setupServer.ts`, placed after `readBuiltCascade`) follows the `read{Noun}` loader form of `readBuiltCascade`. No installed `@orkestrel/test`, `@orkestrel/guide`, or `@orkestrel/markdown` export reads a guide file: I read the server and core `index.d.ts` entries.

## Failing-first proofs (finding 6)

| Command | Before the fix | After the fix |
| --- | --- | --- |
| `npm run test:setup` | exit 1, `5 failed \| 197 passed (202)` | exit 0, `202 passed (202)` |

The run before the fix had the tests in place and the exports absent. The following cases failed:

- `service setup › exports the readiness verdict and its gathering, the compiler loader, the profile compile, the Tailwind paths, and the stage` (the inventory)
- `TAILWIND_PATHS › locates each Tailwind profile and fixture the service proofs read, as a file under the workspace root` (added)
- `CANDIDATE_FLOOR › holds a floor every member of which the tailwind profile excludes` (reads through `TAILWIND_PATHS.tailwind`)
- `server setup › declares the identity constants, the specifier walk, the guide and ledger readers, the stylesheet reader, and the helpers the conformance proof measures with` (the inventory)
- `server setup › reads the Veneer guide anchored at the workspace root rather than the working directory` (added)

The two added cases work as follows:

- **The `TAILWIND_PATHS` case** pins each key to its relative path, so a path moved to another existing file reddens. It also requires every value to be absolute and to exist.
- **The `readVeneerGuide` case** runs with `process.chdir` into a scratch directory, the pattern of the `readBootstrapCascade` case under the `forks` pool. It compares the loader's text with a read located by `new URL('../guides/veneer.md', import.meta.url)`, so a loader that reads relative to the working directory fails.

## Mutations

- Instrument: `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8cb2-mutate.py`.
- Log: `f8cb2-mutations.log.txt` beside it.
- Each mutation replaces exactly one occurrence, runs `npm run SCRIPT -- --reporter=verbose` (where `SCRIPT` is the table's command), and applies the exact reverse replacement.

| Mutation | Command | Red reading | Case that reddens | Green after revert | SHA-256 before = after |
| --- | --- | --- | --- | --- | --- |
| **R1:** the plant in `consumer.test.ts` becomes `@layer components { .col-1 { color: rgb(1, 2, 3) !important } }` | `npm run test:service` | exit 1, `1 failed \| 16 passed (17)`, received `[ 'grid-column-start: auto became 1' ]` | `the consumer pairing › keeps an important shared declaration whatever the recipe withholds` (at the comparison; `col-1` stays in the branch) | exit 0, `17 passed (17)` | `ecdc26d744de6ad49c0f745ffa5b5e53dcb1cfa4b8e9537930cb371216e8c243` |
| `TAILWIND_PATHS.consumer` points at `unexcluded.css` | `npm run test:setup` | exit 1, `1 failed \| 201 passed (202)`, received `consumer tests/fixtures/tailwind/unexcluded.css` | `TAILWIND_PATHS › locates each Tailwind profile and fixture …` | exit 0, `202 passed (202)` | `b0f68c90da35b48afe1a643fa0e65e6179948795d70be1f941bd6d37773dfcc6` |
| `readVeneerGuide` reads `VENEER_GUIDE_PATH` relative to the working directory | `npm run test:setup` | exit 1, `1 failed \| 201 passed (202)`, `ENOENT … open 'guides/veneer.md'` | `server setup › reads the Veneer guide anchored at the workspace root …` | exit 0, `202 passed (202)` | `14c7aa23c9959721aa4f0a9979b52cd66cfe380e37f6bb27d71a66915cfa1514` |

## Gate exits

All gates ran from `/home/user/veneer-f8b` after the last edit, at load averages 6.5 to 7.4:

- `npm run format:check`: exit 0 (219 files).
- `npm run lint:check`: exit 0.
- `npm run check`: exit 0.
- `npm run test:policy`: exit 0, `109 passed | 1 skipped (110)`.
- `npm run test:conformance`: exit 0, `17 passed (17)`.
- `npm run build:src:styles && npm run test:service`: exit 0, `3 passed (3)` files, `17 passed (17)` tests.
  - Wall time was 12 s including the build. Vitest reported 8.78 s.
  - No run hit a timeout.
- `npm run test:setup`: exit 0, `4 passed (4)` files, `202 passed (202)` tests.
- `npm run test:guides`: exit 0, `18 passed (18)`. The external links added in finding 5 pass the link check.

## `git status --porcelain`

This is the round-1 set plus `tests/setupServer.ts` and `tests/setupServer.test.ts`, which this round touched:

```text
 M ROADMAP.md
 D configs/src/vite.tailwind.config.ts
 M guides/README.md
 M guides/veneer.md
 M package.json
 M tests/conformance.test.ts
 M tests/setup.css
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupService.test.ts
 M tests/setupService.ts
 D tests/tailwind/preflight.test.ts
 D tests/tailwind/profiles.test.ts
 D tests/tailwind/shared.test.ts
?? tests/service/
```

## `git diff b9c0b0a --stat`

```text
 ROADMAP.md                          |   4 +-
 configs/src/vite.tailwind.config.ts |  71 ----------
 guides/README.md                    |  10 +-
 guides/veneer.md                    | 267 ++++++++++++++++++++----------------
 package.json                        |   3 +-
 tests/conformance.test.ts           |   9 ++
 tests/setup.css                     |  16 ++-
 tests/setupBrowser.test.ts          | 197 +++-----------------------
 tests/setupBrowser.ts               | 257 +---------------------------------
 tests/setupServer.test.ts           |  22 ++-
 tests/setupServer.ts                |  23 +++-
 tests/setupService.test.ts          |  63 +++++++--
 tests/setupService.ts               |  68 ++++++---
 tests/tailwind/preflight.test.ts    | 115 ----------------
 tests/tailwind/profiles.test.ts     | 209 ----------------------------
 tests/tailwind/shared.test.ts       | 250 ---------------------------------
 16 files changed, 342 insertions(+), 1242 deletions(-)
```

The untracked additions are `tests/service/tailwind/consumer.test.ts` (268 lines), `preflight.test.ts` (139 lines), and `profiles.test.ts` (215 lines).

No `ROADMAP.md` patch is owed, because no fact the roadmap states moved. `tmp/probe/` does not exist.

## Deviations

1. **The finding 5 citation. This needs your ruling.**
   - Expected: the brief's citation of CSS Cascading and Inheritance Level 5, § "Layer Ordering", and CSS Syntax Level 3, § "The `@import` rule".
   - Found: I fetched `https://www.w3.org/TR/css-cascade-5/` and `https://www.w3.org/TR/css-syntax-3/` on 2026-09-23.
     - Cascade 5 § 2, "Importing Style Sheets: the @import rule" (`#at-import`), states the rule: "Any @import rules must precede all other valid at-rules and style rules in a style sheet (ignoring @charset and empty @layer definitions) … or else the @import rule is invalid."
     - Cascade 5 § 6.4.4.2, "Declaring Without Styles: the @layer statement at-rule" (`#layer-empty`), permits the `@layer` statement ahead of `@import`.
     - Cascade 5 § 6.4.3, "Layer Ordering", covers first-declaration order only.
     - CSS Syntax Level 3 has no § on `@import`. It names the rule only in an example and defers the definition to css-cascade.
   - Done: the guide cites the two Cascade 5 sections that state the rule, with links. Every other part of D25 is applied as ruled.
   - To restore the brief's citation, replace the two links in the import-placement paragraph of § Tailwind.
2. **Ancillary choices settled in scope.**
   - `TAILWIND_PATHS` carries a `tailwind` key for `tests/setup.css` beyond the brief's four paths (see § Export names settled).
   - The fixture paths are one frozen record rather than separate string constants.
   - The two § Files rows name the new exports.
   - The guide's `@import` paragraph is rewrapped to the column the surrounding prose uses.

## Observations

- `readCompatibility`, `readDeferrals`, `readDepartures`, and `readAdditions` in `tests/setupServer.ts` repeat `resolve(WORKSPACE_ROOT, 'guides/veneer.md')` as their default path. `tests/setupStyles.test.ts` reads `VENEER_GUIDE_PATH` relative to the working directory. Both are outside this unit's scope, so they are unchanged. Each is a candidate site for `readVeneerGuide` or `VENEER_GUIDE_PATH` in a later unit.
