# Unit UTIL-DISPLAY (`ud`) — round 3 report

Landing copy built at `tmp/probe/land` from `e4e6a40` with `tools/land.sh`, `tools/sync.sh`
applying the owned files and `tools/apply-check.sh` confirming `ud-shared-2.patch` as the round-2
baseline; the round-3 edits below were made directly in the copy, and `tmp/units/ud-shared-3.patch`
is the resulting `git diff` against that baseline. The copy was rebuilt once mid-round after a
stale background `mutate.py` run from an earlier launch collided with the fresh one and left the
copy's style partials in an inconsistent state (see Deviations).

## Findings closed

1. **The label loop** (`tests/app/browser/sections/FlexSection.test.ts`, owned, real edit).
   Before: `requireValue(region.querySelector(...), \`No ${label} element in ${name}\`)` asserted
   one matching element and read its and its children's text.
   After: the loop reads every element the selector matches (`querySelectorAll`), asserts the set
   is non-empty, and checks every matched element (and its children) carries the label text.
   Added mutation `label-trailing-bare` to `tools/mutate.py` (`relabel_last_fill`): relabels the
   fill row's last `flex-fill` item's text to `Fill`, class unchanged. Logged red on the render case
   (`FlexSection > renders every declared specimen through the shared section contract`) at
   `tmp/units/ud-instruments-3/logs/record/label-trailing-bare.log.txt`; the unmutated control is
   green beside it at `.../record/control.log.txt`.
2. **The `families` matrix.** Moved from `FlexSection.test.ts` (lines 47–56 before) to
   `tests/setupStyles.ts` (shared, in the patch), directly after `FLEX_RESTING_VALUES`, as
   `FLEX_FAMILY_CASES`: a frozen list of `{ name, context, properties }` rows with
   `readonly properties: readonly string[]`, TSDoc "Lists each family the Flex section renders,
   with the context selector that locates its labeled element and the properties whose classes it
   demonstrates." Added `FLEX_FAMILY_CASES` to the import list, the export-list case
   (`Object.keys(setup).sort()`), and the freeze assertions (added to the frozen-table loop, plus a
   per-entry `Object.isFrozen(entry)`/`Object.isFrozen(entry.properties)` loop) in
   `tests/setupStyles.test.ts` (shared, in the patch). `FlexSection.test.ts` now imports
   `FLEX_FAMILY_CASES` from `../../../setupStyles.js` alongside `FLEX_ENTRY_CASES` and restates no
   row; the render case's loop iterates `FLEX_FAMILY_CASES` directly.
3. **The binding case** (`tests/setupStyles.test.ts`, shared, in the patch). Before: the flex
   prefix set used in the binding assertion came only from `[...new Set(FLEX_ENTRY_CASES.map(...))]`.
   After: a new `derivedPrefixes` reads every unconditioned rule's selector across
   `inventory.components`, matches it against
   `/^\.(flex|justify-content|align-items|align-content|align-self|order)-/`, collects the captured
   prefix, dedupes, and sorts; the case asserts
   `expect(prefixes.slice().sort()).toEqual(derivedPrefixes)` (`prefixes` is the existing
   deduped `FLEX_ENTRY_CASES` prefix set, now hoisted and reused for the previously inline
   `recorded` computation too). Every existing assertion in the case is kept. Added control
   `flex-prefix-omitted` to `tools/setup-controls.py` (removes the whole `order` entry from
   `FLEX_ENTRY_CASES`), under `tmp/units/ud-instruments-3/logs/setup/flex-prefix-omitted.log.txt`,
   red on the binding case alone. Re-ran every round-2 control
   (`display-values-reordered`, `align-value-dropped`, `flex-entry-value-changed`,
   `flex-resting-written`, `flex-table-unfrozen`) beside it: each stays red on the binding case
   alone, and `control` (unmutated) is green.
4. **The interface's TSDoc** (`tests/setupStyles.ts`, shared, in the patch). `FlexRestingValue`'s
   doc block and members replaced exactly as specified: a one-line interface doc and a one-line doc
   on each of `declared` and `computed`.
5. **The count** (`app/browser/constants.ts`, shared, in the patch, `FLEX_SPECIMENS` remark).
   Before: "...so three items overflow one line at every width...". After: "...so the items
   overflow one line at every width...". Added, after the convention sentence ("An item that only
   gives the demonstration something to act on keeps a prose label..."): "The wrap specimen's
   items carry the `flex-shrink-1` class as a supporting class that lets the column classes size
   them, not as a demonstrated one, so they keep their prose labels."
6. **The describe title** (`tests/src/styles/utilities/vertical-align.test.ts`, owned, real edit).
   Before: `describe('vertical alignment utilities', ...)`. After:
   `describe('vertical-alignment utilities', ...)`.
7. **This report.** States no count of a growable set and names no list item by its position.

## Gate exits (landing copy)

| Gate | Command | Exit | Result | Log |
| --- | --- | --- | --- | --- |
| format:check | `npm run format:check` | 0 | All matched files use the correct format. | `logs/gates/format-check.log.txt` |
| lint:check | `npm run lint:check` | 0 | (no warnings) | `logs/gates/lint-check.log.txt` |
| check | `npm run check` | 0 | (no diagnostics) | `logs/gates/check.log.txt` |
| build:src | `npm run build:src` | 0 | (build succeeded) | `logs/gates/build-src.log.txt` |
| styles proofs | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/display.test.ts tests/src/styles/utilities/flex.test.ts tests/src/styles/utilities/vertical-align.test.ts tests/src/styles/components/stacks.test.ts tests/setupStyles.test.ts` | 0 | Tests 37 passed (37) | `logs/gates/styles-proofs.log.txt` |
| app-proofs (`--project app:browser`) | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/DisplaySection.test.ts tests/app/browser/sections/FlexSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | Tests 11 passed (11) | `logs/gates/app-proofs.log.txt` |
| test:guides | `npm run test:guides` | 0 | Tests 19 passed (19) | `logs/gates/test-guides.log.txt` |
| test:policy | `npm run test:policy` | 0 | Tests 109 passed, 1 skipped (110) | `logs/gates/test-policy.log.txt` |
| test:setup | `npm run test:setup` | 0 | Tests 251 passed (251) | `logs/gates/test-setup.log.txt` |
| test:conformance | `npm run test:conformance` | 0 | Tests 22 passed (22) | `logs/gates/test-conformance.log.txt` |
| conformance-verbose | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project conformance` | 0 | Tests 22 passed (22) | `logs/gates/conformance-verbose.log.txt` |
| test:service | `npm run build:src:styles && npm run test:service` | 0 | Tests 18 passed (18) | `logs/gates/test-service.log.txt` |

`npx tsc --noEmit -p tsconfig.json` (whole-workspace typecheck, run directly against the landing
copy as an extra confirmation of the `setupStyles.ts`/`setupStyles.test.ts` edits) exited 0.

The setup binding case (`npx vitest run --config vite.config.ts --no-cache --reporter=dot
--project setup tests/setupStyles.test.ts`) exited 0 with `Tests 110 passed (110)`, run standalone
before and after the format fix and again after the copy rebuild.

Mutation record (`tools/record.sh`, log at
`tmp/units/ud-instruments-3/logs/record/*.log.txt`): `control` green on both the styles and
sections commands, every round-1 and round-2 mutation red as in the round-2 record, and the added
`label-trailing-bare` red on the render case alone.

Setup controls (`tools/setup-controls.py control display-values-reordered align-value-dropped
flex-entry-value-changed flex-resting-written flex-table-unfrozen flex-prefix-omitted`, logs at
`tmp/units/ud-instruments-3/logs/setup/*.log.txt`): `control` green; every other control,
including the added `flex-prefix-omitted`, red on the binding case alone.

`git -C tmp/probe/land apply --check tmp/units/ud-shared-3.patch` exited 0 (checked by
`tools/apply-check.sh`, which also confirmed `git apply -R` on the patch returns the copy's tree to
the `e4e6a40` tree exactly, and reported `index lines: 15; diff headers: 15`).

## The exact patch

`tmp/units/ud-shared-3.patch` — a single unified diff against `e4e6a40`, `git diff` output from the
landing copy after the round-2 baseline was applied and the round-3 edits made, touching
`app/browser/constants.ts` and `tests/setupStyles.ts`/`tests/setupStyles.test.ts` beyond the
round-2 content (plus every other file the round-1/round-2 patch already carried, since this patch
supersedes `ud-shared-2.patch` whole). It supersedes `tmp/units/ud-shared-2.patch`.

## Deviations

- **Mid-round landing-copy corruption from a stale background process, recorded and recovered.**
  The first `tools/record.sh` launch was interrupted (a superseded background command from before
  `record.sh` was edited to add `label-trailing-bare` was still running against the same landing
  copy when the corrected run started), producing two concurrent `mutate.py` processes writing the
  same files. This left `tests/setupStyles.ts`/`.test.ts` reformatted correctly but the styles
  partials (`_display.scss`, `_flex.scss`) in a state where the unmutated `control` run itself came
  back red and a mutation reported `MUTATION DID NOT APPLY`. Found by: the `control` run's own
  failing exit and by two `python3 mutate.py` processes with different argument lists both present
  in `ps aux`. Fix: killed every stray process by process id (never by pattern), confirmed the tree
  clean, deleted and rebuilt the landing copy from `land.sh` (fresh `git ls-files` copy of the real
  worktree at the current `e4e6a40`-based commit), reapplied the round-2 patch and the round-3
  shared edits from scratch, and re-ran every check and the full mutation/control record and gate
  suite once more, all green, before generating the final patch. This is a process deviation only;
  no finding's content changed, and the retained logs under `tmp/units/ud-instruments-3/logs/`
  reflect the final clean run.
- **`FLEX_FAMILY_CASES`'s frozen inner array typed as `readonly string[]` through `Object.freeze`
  rather than a separate type annotation.** The brief asks for `readonly properties: readonly
  string[]`; the table is not declared against an explicit interface (matching `FLEX_ENTRY_CASES`'s
  own un-annotated `Object.freeze([...])` shape), so `properties`'s type is inferred from
  `Object.freeze(['flex-direction'])` etc., which TypeScript already infers as `readonly string[]`.
  Confirmed by the landing copy's clean `npx tsc --noEmit -p tsconfig.json`.

## What the unit could not close

Nothing. Every item of § Findings to close is closed, every acceptance criterion's gate is green
on the landing copy, and the patch applies cleanly to `e4e6a40`.
