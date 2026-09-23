# Terrain brief — B-UTILITIES (Cursor Grok, read-only)

Route `grok` on Cursor Grok (`grok-4.7-high`), `--mode=ask`, read-only, rooted at `/home/user/veneer`
(the session branch tip `7b66db2`; CLOSE-GUIDE has not landed, so `guides/veneer.md`,
`tests/guides.test.ts`, and `tests/src/styles/integration.test.ts` will move after this reading;
cite every site by symbol or heading and give a line only as approximate). Perform the reading
directly and spawn nothing. Capture `git status --porcelain` before and after; any change is a
deviation. Return evidence with `file:line` pointers and no raw file dumps, no decisions, no design,
no edits. Never read `dist/`, `node_modules/bootstrap/dist/`, `tmp/`, or a lockfile. Quote at most
twelve lines per site.

## Question

What does the utilities family B-UTILITIES require, and what does each site say today? The family
owns the keys `ROADMAP.md` § The family queue lists under **B-UTILITIES** (the spacing set, the
display and flex set, the sizing set, the type set, the paint set, the position set, the gap keys,
the stack keys, and `object-fit`, `overflow`, `user-select`, `visible`, `invisible`,
`visually-hidden`, `clearfix`, `stretched-link`, `float`, and `focus-ring`), and the queue rules
"Size each unit by mechanism, never by key." The gap keys already ship: `src/styles/utilities/`
holds `_gap.scss` alone (`ls src/styles/utilities` → `_gap.scss`), its proof is
`tests/src/styles/utilities/gap.test.ts`, and the guide carries a `#### row-gap` table around line
3126. The helper keys `icon-link`, `ratio`, and `vr` ship under `### Helper classes` in the guide.
The tree holds Bootstrap `5.3.8` under `node_modules/bootstrap/` (`grep '"bootstrap"' package.json`
→ `"bootstrap": "5.3.8"`); `wc -l` reads `_utilities.scss` at 806 lines, `mixins/_utilities.scss`
at 97, `utilities/_api.scss` at 47, `mixins/_breakpoints.scss` at 127, and the `helpers/` files
between 3 and 36 lines each.

## Evidence sought

A. **Bootstrap's utility API.** From `node_modules/bootstrap/scss/_utilities.scss`: every entry of
   the `$utilities` map, as a table with the entry name, `property`, `class` (where set), the
   `values` source (a literal list, a map, or a variable such as `$spacers`, `$display-values`,
   `$theme-colors-rgb`), and each flag among `responsive`, `print`, `rfs`, `state`, `local-vars`,
   `css-var`, `css-variable-name`, and `rtl`. From `mixins/_utilities.scss`: how
   `generate-utility` builds a selector, applies `$enable-important-utilities`, handles `rfs`,
   `state`, `local-vars`, and `css-var`, and what it does with an `rtl` value. From
   `utilities/_api.scss`: the breakpoint loop over `$grid-breakpoints` (name each breakpoint and its
   infix) and the print loop. From `_variables.scss`: `$spacers`, `$grid-breakpoints`,
   `$font-sizes`, `$display-values`, `$position-values`, `$zindex-levels`, `$border-widths`,
   `$theme-colors-rgb`, `$utilities-text`, `$utilities-bg`, `$utilities-border`, and every other map
   the `$utilities` map reads (name each and quote its literal). Map each family-queue key onto the
   map entries that produce it, and name every entry the queue does not list.
B. **The helpers.** From `_helpers.scss` and `helpers/*.scss`: for `stacks`, `position`,
   `stretched-link`, `visually-hidden`, `text-truncation`, `clearfix`, `focus-ring`, `color-bg`,
   and `colored-links`, the selectors and declarations, and which of them the family queue lists
   (`hstack`, `vstack`, `fixed`, `sticky`, `translate-middle`, `stretched-link`, `visually-hidden`,
   `text-truncate`, `clearfix`, `focus-ring`) and which it does not (`color-bg`, `colored-links`):
   say where the queue or the guide places the unlisted ones.
C. **The shipped utility pattern.** The `_gap.scss` partial whole (the layer, the `!important`,
   whether it loops or writes literal rules, the breakpoint infixes it writes), its `@use` line in
   `src/styles/index.scss` (list the whole `@use` order), `tests/src/styles/utilities/gap.test.ts`
   (what it reads and how), the guide `#### row-gap` table and the `gap` and `column-gap` tables
   beside it (quote each header and one row) with the prose section that carries them, the
   `### Departures` and `### Additions` rows naming a gap key, the ledger binding of the gap keys in
   `tests/setupServer.ts` (`ORACLE_BINDINGS`, `LAYER_COMPONENTS`, and the inventory: grep `gap` and
   `utilities`; the `.row-gap-0` remark sits around line 2117 and the `.row-gap-3` remark around
   line 1492), the showcase home the gap keys have or lack (`app/browser/sections/LayoutSection.ts`,
   the § Carriers row "Helper key with no subject region and no showcase home": quote it), and the
   capture registry rows for a utility if any (`tests/setup.ts`: grep `gap`).
D. **Tailwind.** The shared class-name measurement at the history path
   `git -C /home/user/scaffold show dddc59a~1:.orkestrel/veneer/units/f8-tailwind-intersection.json`
   (read it with that command; report `inventoryClasses`, `tailwindProducedSelectors`, and the
   shared names grouped by the family-queue set each belongs to, naming any shared name outside the
   queue), the guide `### Tailwind` subsection's sentences on the utilities layer, importance, and
   shared names (quote), `SHARED_LONGHANDS` and `collectImportantNames` and `collectSharedNames` in
   `tests/setupServer.ts` (what each computes), and the proofs under `tests/service/tailwind/`
   (name each file and the claim it proves). State what a utility partial must satisfy for a shared
   name, in the guide's own words.
E. **Tokens.** In `src/styles/_tokens.scss`: the `--vn-space-*`, `--vn-size-*`, `--vn-weight-*`,
   `--vn-line-*`, `--vn-radius-*`, `--vn-border-*`, `--vn-shadow-*`, `--vn-opacity-*`,
   `--vn-stack-*`, and breakpoint tokens (list each group's names and values), and the guide
   § Tokens rows under `#### Space, border, radius, and elevation` and `#### Motion, focus,
   validation, breakpoints, and stacking` (quote the headers and the rows a utility would bind);
   how a component partial binds a token today (`_pagination.scss`: one `var(--vn-…)` read with its
   ledger row under `### Pagination classes`).
F. **The rulings that bind the family.** `ROADMAP.md` § Tenets and § Rulings: every paragraph
   naming a utility, `!important`, a layer, a breakpoint, print, or `rfs` (quote; the important-
   utility contract sits around lines 138-171 of `guides/veneer.md` too: quote it); § Exit criterion
   items 2, 3, 5, and 6 (quote); every § Carriers row naming B-UTILITIES, a gap key, a helper, a
   utility, `!important`, or print (quote whole); every decision in
   `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` naming utilities, layers,
   `!important`, or Tailwind (quote its number and text); and the § Standing conditions rows a
   writer of this family will hit.
G. **Sizing.** Per family-queue set: the map entries, the value count per entry, and the selector
   count the API generates (values × the breakpoint infixes where `responsive` is set, plus the
   print variants where `print` is set), so units can be sized by mechanism; the `_gap.scss`,
   `gap.test.ts`, and `_pagination.scss` line counts as comparables.
H. **Files the family makes false.** Every enumerating assertion over shipped partials or keys:
   grep `_gap` and `'gap'` under `tests/`, `src/styles/index.scss`, the guide `### Files` table,
   `tests/conformance.test.ts` (the order case), `tests/setupStyles.test.ts`, `Showcase.ts` and its
   proof; name each file and the assertion. Name `tests/setupPolicy.ts` and `tests/policy.test.ts`
   as vendored and off-limits, and say what each reads that a new partial, proof, or guide section
   would trip.

## Output

One distillate with a section per lettered item, each fact with a `file:line` pointer (line
approximate, symbol or heading named), contradictions between the guide, the roadmap, and the code
called out, and a closing list of unresolved inputs. No design, no recommendation, no edits.
