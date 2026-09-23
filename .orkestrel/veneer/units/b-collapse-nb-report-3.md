# Unit NAVBAR (`nb`) round 3 report

I worked as `builder` on Sonnet, a native subagent and the sole writer in `/home/user/veneer-nb`
(branch `unit/nb`, uncommitted over `a658879`). The effective brief is
`/home/user/veneer-nb/tmp/units/nb-brief-3.md`. I committed, pushed, and installed nothing, and I
ran no `git checkout`, `restore`, `stash`, `reset`, or `clean`. I did not edit
`tests/setupPolicy.ts` or `tests/policy.test.ts`.

## Outcome

Every finding of round 2 is closed, in the owned files and in the revised patches:

- `/home/user/veneer-nb/tmp/units/nb-shared-3.patch`
- `/home/user/veneer-nb/tmp/units/nb-offlimits-3.patch`
- `/home/user/veneer-nb/tmp/units/nb-retirement-3.patch`

The retained path for the shared patch is `/home/user/scaffold/.orkestrel/veneer/units/nb-shared-3.patch`.

Every criterion reads green on the stage. The stage is the worktree with the shared and
off-limits patches applied, plus the round-2 instruments' node_modules linked in with `cp -al`
(the earlier symlink form tripped the browser project's package-root check with
"Resolved dependencies must remain inside their physical package root," so I linked the
directory tree instead). Every proof still distinguishes its mutation. The stage and the
retirement copy are deleted.

## Findings closed

### Token nouns in the selector docs (finding 1)

- **Site:** `tests/setupStyles.ts`, the `NAV_SELECTORS` doc comment.
  - **Before:** "The release records `.nav-link` unconditionally and again under the
    reduced-motion query." and "`.card-header-tabs .nav-link.active` is recorded under this key
    and written by the card partial."
  - **After:** "The release records the `.nav-link` selector unconditionally and again under the
    reduced-motion query." and "The `.card-header-tabs .nav-link.active` selector is recorded
    under this key and written by the card partial."
- **Site:** `tests/setupStyles.ts`, the `NAVBAR_SELECTORS` doc comment.
  - **Before:** "The release records `.navbar-toggler` unconditionally and again under the
    reduced-motion query."
  - **After:** "The release records the `.navbar-toggler` selector unconditionally and again
    under the reduced-motion query."

### The `{@link}` nouns (finding 2)

- **Site:** `tests/setupStyles.ts`, the `NAVBAR_LENGTH_CASES` doc comment.
  - **Before:** "…each wrapped around {@link NAVBAR_MARKUP} and marked by…"
  - **After:** "…each wrapped around the {@link NAVBAR_MARKUP} constant and marked by…"
- **Site:** `tests/setupStyles.ts`, the `NAVBAR_DARK_SPELLING_CASES` doc comment.
  - **Before:** "…carrying that spelling around {@link NAVBAR_MARKUP}."
  - **After:** "…carrying that spelling around the {@link NAVBAR_MARKUP} constant."

### NAV-HALF (finding 3)

- **Site:** `tests/setupStyles.ts`, the `NAV_SELECTORS` doc comment.
  - **Before:** "It is the nav partial's half of the key's official vocabulary:"
  - **After:** "It is the half of the key's official vocabulary that no navbar rule carries:"

### LENGTH-SENTENCE (finding 4)

- **Site:** `tests/setupStyles.ts`, the `NAVBAR_LENGTH_CASES` doc comment.
  - **Before:** "…and the `target` field addresses the element whose property named by the
    `reads` field consumes it, inside a proof…"
  - **After:** "…the `target` field addresses the element that consumes it, and the `reads`
    field names the property read there, inside a proof…"

### MODE-SCHEME (finding 5)

- **Site:** `guides/veneer.md`, `### Navbar classes`.
  - **Before:** "…so the class bar sets its own scheme to light to show the class's paint."
  - **After:** "…so the class bar carries the `data-bs-theme="light"` attribute, a light island
    inside the card, and the white it shows is the class's paint."
- **Site:** `app/browser/constants.ts`, the `NAVBAR_SPECIMENS` doc block.
  - **Before:** "…so the class bar sets its own scheme to light, and the white it shows is the
    class's paint."
  - **After:** "…so the class bar opens a light island with its own `data-bs-theme` attribute,
    and the white it shows is the class's paint."
- **Site:** `tests/app/browser/sections/NavbarSection.test.ts`, the comment beside the light
  attribute assertion (owned).
  - **Before:** "…so the class bar sets its own scheme to light, and the white it shows over the
    card is the class's paint."
  - **After:** "…so the class bar opens a light island with its own data-bs-theme attribute, and
    the white it shows over the card is the class's paint." The comment stays bare of backticks,
    matching this file's own convention for comments (the file backticks only template-literal
    selector strings, never a plain comment token).
- Each edited block is re-flowed at 100 columns.

### TOKENS-ICONS-HEADER (finding 6)

- **Site:** `src/styles/_tokens.scss`, the `$icons` comment.
  - **Before:** "The forms glyphs and the navbar toggler icon Bootstrap paints in one value
    across the light and dark modes, each as the escaped data URI the release compiles its own
    variable to."
  - **After:** "The forms glyphs and the navbar toggler icon at their light values, each as the
    escaped data URI the release compiles its own variable to."
  - The later sentence naming the caret, the unchecked knob, and the toggler icon as entries of
    the `$dark` map is unchanged.

### INLINE-CASE-TABLES (finding 7)

Each inline matrix moved to `tests/setupStyles.ts`, frozen at every level, documented, exported,
and read through the import with no row restated in the owned test.

- **`NAVBAR_EXPAND_READINGS`.** Rows `{ viewport, expanded }`, `readonly expanded: readonly
  string[]`, holding the light-390 and dark-1280 variants, replacing the `[viewport, expanded]`
  tuples in `tests/src/styles/components/navbar.test.ts`'s case that expands the sm through xl
  bars.
- **`NAVBAR_DARK_CONSUMER_CASES`.** Rows `{ target, reads, property }`, holding the brand, the
  plain link, and the toggler border rows, replacing the `[target, property, slot]` tuples inside
  the dark-spelling case. The loop reads `readStyle(element, reads)` against
  `readToken(retuned, property)`.
- **`NAVBAR_PAINT_MOVE_CASES`.** Rows `{ selector, moves }`, holding the plain-bar brand and
  toggler rows and the dark-class brand and toggler rows, replacing the `[selector, moves]`
  tuples in the case that reads one plain bar paint in light and another in dark.
- **`tests/setupStyles.test.ts`.** The import list and the export-list case name each table. The
  table-freeze loop and the row-freeze loop hold each table and its rows, and
  `NAVBAR_EXPAND_READINGS`'s `expanded` arrays are checked frozen alongside `NAVBAR_EXPAND_CASES`'s
  `readings` arrays. The navbar case-tables case adds an assertion that every
  `NAVBAR_DARK_CONSUMER_CASES` row's `property` is the `property` of a `NAVBAR_COLOR_CASES` row,
  through a `ReadonlySet<string>` built from the color case properties (a plain `Set` inferred
  from the frozen array's literal-typed `property` field otherwise rejects a generic `string`
  argument at `Set.has`, which is the type-check failure I hit and corrected before regenerating
  the patch).
- **`mutate.py`.** Added `expand-readings-unfrozen`, `dark-consumers-unfrozen`, and
  `paint-moves-unfrozen` (the table's outer `Object.freeze(` removed, each red on the setup
  file's freeze case), and `dark-consumers-property-foreign` (the toggler row's `property`
  changed to `--bs-navbar-missing`, red on the navbar case-tables case). The full mutation run
  records the unmutated setup file green (`113 passed (113)`) and the styles run over
  `navbar.test.ts` and `theme.test.ts` green (`46 passed (46)`) with the round-2 case titles.

The `readonly {...}[]` array-type annotation `oxlint`'s `typescript(array-type)` rule refuses for
a non-simple element type, so each of the three tables is typed `ReadonlyArray<{...}>` instead.

## Gate exits

**Stage.**

- Script: `/home/user/veneer-nb/tmp/units/nb-instruments-3/gates.sh`
- Summary: `/home/user/veneer-nb/tmp/units/nb-instruments-3/logs/gates.log.txt`

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format. |
| `npm run lint:check` | 0 | no findings |
| `npm run check` | 0 | every project |
| `npm run build:src` | 0 | built in 1.06s |
| styles run over `navbar.test.ts`, `theme.test.ts`, `container.test.ts` | 0 | `Tests 71 passed (71)`, with the round-2 case titles |
| section run over `NavbarSection.test.ts` | 0 | `Tests 2 passed (2)` |
| setup-project run over `tests/setupStyles.test.ts` | 0 | `Tests 113 passed (113)` |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)` |
| `npm run test:guides` | 0 | `Tests 19 passed (19)` |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)` |
| `npm run test:app` | 0 | `Tests 78 passed (78)` |
| `npm run test:setup` (observation) | 0 | `Tests 254 passed (254)` |

**Retirement copy.**

- Script: `/home/user/veneer-nb/tmp/units/nb-instruments-3/retire.sh`, using `retire.py`.
- Log: `/home/user/veneer-nb/tmp/units/nb-instruments-3/logs/retire-gates.log.txt`

| Command | Exit | Reading |
| --- | --- | --- |
| scoped `oxfmt --check` over the retired files and `tests/setupStyles.ts` | 0 | All matched files use the correct format. |
| `npm run lint:check` | 0 | no findings |
| `npm run check` | 0 | every project |
| `npm run build:src` | 0 | built |
| setup-project run over `tests/setupStyles.test.ts` | 0 | `Tests 112 passed (112)`; the undeclared-key case is retired |
| styles run over `navbar.test.ts`, `theme.test.ts`, `tokens.test.ts`, `container.test.ts` | 0 | `Tests 102 passed (102)` |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)` |

The retirement asset probe (`retirement-asset.log.txt`): with an accordion icon declared in the
retirement copy's dark scope, the theme run exits 1, `Tests 1 failed \| 5 passed (6)`,
`AssertionError: expected 'url("data:image/svg+xml,…' to be ''`. Without it, the theme run exits
0, `Tests 6 passed (6)`. `_theme.scss` was restored and its digest checked, and the copy was
deleted.

**Retirement patch check (criterion 4).** `git -C /home/user/veneer-nb apply --check
tmp/units/nb-retirement-3.patch` was run against the simulated post-ACCORDION state built by
`retire.py … simulate`, inside `retire.sh`, and reads "retirement patch: git apply --check passes
against the simulated state."

## Mutation matrix (criterion 2)

Every mutation from `nb-instruments-2/mutate.py`, carried into
`/home/user/veneer-nb/tmp/units/nb-instruments-3/mutate.py`, was re-run on the round-3 stage, each
restored and its digest checked by the instrument itself (the run ends "done: every mutated file
restored by digest," and the script raises `SystemExit` on a digest mismatch, which did not fire).
Log: `/home/user/veneer-nb/tmp/units/nb-instruments-3/logs/mutations.log.txt`.

The four controls this round adds:

| Mutation | Filter or command | Reading |
| --- | --- | --- |
| `expand-readings-unfrozen` | setup project, `-t "binds the navbar selectors"` | exit 1, `1 failed \| 112 skipped (113)` |
| `dark-consumers-unfrozen` | same | exit 1, `1 failed \| 112 skipped (113)` |
| `paint-moves-unfrozen` | same | exit 1, `1 failed \| 112 skipped (113)` |
| `dark-consumers-property-foreign` | same | exit 1, `1 failed \| 112 skipped (113)` |
| controls, unmutated | navbar with theme; section; setup file | `46 passed (46)`; `2 passed (2)`; `113 passed (113)` |

Every carried mutation reads exit 1 with the round-2 failure signature, unchanged from round 2's
own matrix, and the two case-title-only mutations (the reordered dark-spelling rows) still read
exit 1 on the setup proof and exit 0 on the browser proof that reads each row on its own.

## Patches

**`nb-shared-3.patch`**

- `git apply --check` passes in the worktree.
- Applied with the off-limits patch to `git archive a658879`, it reproduces every stage file.
- The `index` lines name the `a658879` blobs: for example `index 605d1a5..14eb133` for
  `guides/veneer.md`, and `git rev-parse --short a658879:guides/veneer.md` prints `605d1a5`.
- SHA-256 digest: `82fc9093f61645392bd23c19aa2fdb31ca938a5da7262f060599f230d73ba0ad`. Not
  byte-identical to `nb-shared-2.patch`; every finding this round edits is inside this file's own
  changed hunks.

**`nb-offlimits-3.patch`**

- `git apply --check` passes in the worktree. The index lines are `de17941..fabb089` for
  `_mixins.scss` and `93abb90..edd8b00` for `_nav.scss`, matching the `a658879` blobs.
- SHA-256 digest: `f15aa3abbbf44832d0f07538855685cd15da86f952ceeaba9b0b048db4c509fa`. Byte-identical
  to `nb-offlimits-2.patch` (`diff` reports no difference). No finding this round carries a change
  to this patch.

**`nb-retirement-3.patch`**

- Its base is the simulated post-ACCORDION state, the same construction round 2 used.
- `git apply --check` passes against that state.
- SHA-256 digest: `1bc745ef6718a94a009f7a03d15c0fcef9b90513e892faac40004e25e783ec12`. Not
  byte-identical to `nb-retirement-2.patch`: `diff` shows the `index` lines moving (the base
  blobs shifted because the shared patch's own content moved under them) and one hunk header's
  line number shifting from 601 to 607 (the new tables inserted earlier in the same file). The
  hunk content itself is unchanged. This matches round 2's own audit finding that this patch's
  base is never the `a658879` blobs, so a byte-identical copy across rounds was never the
  reachable state; the digest recorded here is the round-3 reading.

**Instruments** are under `/home/user/veneer-nb/tmp/units/nb-instruments-3/`, copied from
`nb-instruments-2/` with every path rewritten for round 3: `class-surface.sh`,
`class-surface.test.ts`, `readings.sh`, `mutate.py`, `patches.sh`, `gates.sh`, `journey.sh`,
`journey-rerun.sh`, `retire.sh`, `retire.py`, and `logs/`.

## Deviations

**D-node-modules: the stage needs its own `node_modules`.** Resolved within scope.

- Expected: the stage, built as a tarball copy of the worktree plus the shared and off-limits
  patches, to run every gate.
- Found: with no `node_modules` in the stage, every command exits 127. A symlink to the
  worktree's `node_modules` resolves the binaries but fails the browser section run: Vite reports
  "Resolved dependencies must remain inside their physical package root" for `@orkestrel/contract`
  imports, because the symlink's real path sits outside the stage tree.
- Evidence: `gates.log.txt`'s first pass (`exit 127` on every step) and the direct run of the
  section command against the symlinked stage (the Vite error, pasted above).
- Done: I replaced the symlink with `cp -al /home/user/veneer-nb/node_modules
  <stage>/node_modules` (hardlinked, so no extra disk copy), which keeps every path inside the
  stage tree. Every gate reads green afterward.
- Not done: nothing; this is an instrument-construction detail the brief's § Context left to me
  ("rebuild the stage the way the round-2 report describes"), not a finding needing your ruling.

**D1 through D8 from round 2, carried forward as the round-2 report and this round's audit
verdict record them.** D3, D4, and D5 are closed (the audit verdict records D3 as corrected by
your records and D4 and D5 as closed). D2 (the `nav-list` off-limits patch), D6 and D7 (waiting on
ACCORDION), and D8 (this report file, which I did write this round with no harness restriction
against it) stand exactly as round 2 left them; this round's findings do not touch them.

## What the unit could not close

- D2: the off-limits `nav-list` patch needs your ruling (unchanged from round 2).
- D6 and D7: both wait on ACCORDION's landing (unchanged from round 2).
- D1: the worktree typecheck stays red until the shared patch applies (unchanged from round 2).

## Review evidence

`git -C /home/user/veneer-nb status --porcelain` reads:

```text
 M tests/src/styles/theme.test.ts
?? app/browser/sections/NavbarSection.ts
?? src/styles/components/_navbar.scss
?? tests/app/browser/sections/NavbarSection.test.ts
?? tests/src/styles/components/navbar.test.ts
```

Round 3 changed these owned files from round 2:

- `tests/src/styles/components/navbar.test.ts`: the import list gains `NAVBAR_DARK_CONSUMER_CASES`,
  `NAVBAR_EXPAND_READINGS`, and `NAVBAR_PAINT_MOVE_CASES`; the three inline tuple loops are
  replaced with `for (const { ... } of TABLE)` over the imported tables.
- `tests/app/browser/sections/NavbarSection.test.ts`: the MODE-SCHEME comment's wording.

`app/browser/sections/NavbarSection.ts` and `src/styles/components/_navbar.scss` are unchanged
from round 2.

`tmp/units/` holds the round-3 patches and `nb-instruments-3/`. Your capture at hand-back is
`nb-3.diff` and `nb-3-status.txt`, taken from inside the worktree.
