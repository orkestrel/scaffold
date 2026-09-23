# UTIL-SPACER (`us`) report — round 2 (successor brief 3)

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-us` (branch `unit/us`, base `87ff1d0`, uncommitted). Native lane, so no bench journal applies. The unit carried every ruling `us-brief-3.md` names: claim 7 (token nouns, the compatibility rows, and the record for criterion 3), F1 through F7, and R2 and R3. Round 1's edits stay unless a ruling named them.

## Outcome

- Every criterion ran green in the worktree or in the probe copy the brief names. The built cascade is byte-identical to round 1's.
- One ancillary choice departs from the ruling's wording. The `Responsive gap` specimen wraps through a `col-12` last item inside `.row.row-cols-auto`, not through `row-cols-2`. With `row-cols-2`, every item sits on a row of its own at 1280, so no column gap ever shows (§ Deviations).
- One pre-existing defect sits outside scope and is recorded for the Orchestrator (§ Observations).

## Changes by finding

| Finding | Change | Where |
| --- | --- | --- |
| F1 (`$state`) | The `utility` and `utility-variable` mixins take `$state: ()`. Each pseudo-class in `$state` emits a state rule after the base rule, as the release's `state` key does. The fixture carries a hover entry on the `utility` mixin and on the `utility-variable` mixin. | `src/styles/_mixins.scss`, `tests/src/styles/fixtures/mixins.scss`, `tests/src/styles/mixins.test.ts` |
| F2 (classless infix) | When `$class` is empty, the infix's leading hyphen is dropped, so the mixin emits `.md-KEY`. The fixture carries a classless responsive entry. The header comment states the rule. | same files |
| F3 and R3 (specimens) | The gap specimens take the gutter siblings' shape, with plain items and no `.card`. The `Responsive gap` specimen wraps at 1280. The Layout proof asserts the shape, the absence of `.card`, and the 1280 geometry. | patch: `app/browser/constants.ts`; owned: `tests/app/browser/sections/LayoutSection.test.ts` |
| F4 | The Layout copy ends "…row counts, and gutter and gap steps." | patch: `app/browser/constants.ts` |
| F5 | "The gap steps `gap-0` to `gap-5` are shipped names off the line:" | patch: `guides/veneer.md` § Tailwind |
| F6 | § Styles gains a paragraph on the mixin contract: naming, the classless infix, state classes, priority, and the `tests/src/styles/mixins.test.ts` proof. It follows the paragraph on utility importance. § Gap utilities keeps only the gap-specific sentences: naming through the `utility` mixin, the walk and map order, the 768px example, and the gap proof. | patch: `guides/veneer.md` |
| F7 | The CL8b cell reads "closed: UTIL-SPACER landed (`<landing hash>`) with the `gap` and `column-gap` keys beside the `row-gap` key in the `src/styles/utilities/_gap.scss` partial". Criterion 6 required the added nouns. The Orchestrator fills the hash. | patch: `ROADMAP.md` |
| Claim 7a (token nouns) | Applied as ruled to the changed comments and the patch. Examples: "the `breakpoint-each` mixin", "the `vn-utility-` prefix", "the `md-` prefix", "the `gap` entry", "sits in the `base` layer", "under the `components` directory" and "under the `utilities` directory" (these are barrel path segments, not layers), "the `gap-3` name", and "the `tests/src/styles/utilities/gap.test.ts` proof". CSS properties, values, functions, custom properties, class selectors, the `!important` token, and Sass variables stay bare. The ruling allows this. | owned comments; patch |
| Compatibility rows | "Every official `.gap-*` step and breakpoint selector ships; resolved row and column gaps are proved in the `tests/src/styles/utilities/gap.test.ts` proof." The `column-gap` row reads the same way with `.column-gap-*`. | patch: `guides/veneer.md` § Compatibility |
| Claim 7b (criterion 3's record) | The baseline step is retained as `us-instruments/baseline.sh`. Its commands and printed lines are recorded in § Gates. | `/home/user/scaffold/.orkestrel/veneer/units/us-instruments/baseline.sh` |
| R2 | The profiles case asserts `expect(tailwind.variables).toEqual(['--spacing'])`, the measured set. `GAP_KEYS` and `as const` are unchanged, as ruled. | `tests/service/tailwind/profiles.test.ts` |

The § Tailwind paragraph also takes the objective lane's prose note. The partial-importance sentence says that the planted rule declares `!important` on the `grid-column-start` longhand alone. It no longer reads as editing Tailwind's rule.

## The `$state` design

The parameter shape is a Sass list of pseudo-class names, the release's `state` key. The default `()` emits nothing extra.

```scss
@mixin utility($class, $properties, $values, $infix: '', $responsive: false, $locals: (), $state: ())
@mixin utility-variable($class, $variable, $values, $state: ())
```

- **Emitted selector form.** For each key, the base rule `.NAME` comes first. A rule `.NAME-PSEUDO:PSEUDO` follows for each pseudo-class in `$state`, with the same body. `NAME` is the class, the infix, and the key. `PSEUDO` is the pseudo-class. This is the release's per-key order.
  - The `utility` mixin writes every property `!important` and every local normal, in the base rule and in each state rule.
  - The `utility-variable` mixin writes the custom property normal, in the base rule and in each state rule.
- **Mapping the release hover entries.** The mixins express each hover entry with no second mechanism:
  - `link-opacity` and `link-underline-opacity` map to `utility-variable` with `$state: (hover)`.
  - `link-offset` maps to `utility` with `$state: (hover)`, which carries `!important`.

  This answers the brief's unknown: a custom-property hover entry needs only the normal form.
- **Classless infix.** `$lead` is the infix with its leading hyphen sliced off when `$class == ''`. A responsive classless entry emits `.KEY` at the empty infix and `.md-KEY` at `-md`. This matches the release's `$infix` and `$property-class-modifier` composition in `node_modules/bootstrap/scss/mixins/_utilities.scss`.
- **Modules.** The mixins file adds `@use 'sass:list'` for `list.append` and `@use 'sass:string'` for `string.slice`. No function or helper was added.

The following fixture entries were added to `tests/src/styles/fixtures/mixins.scss`:

| Entry | Mixin call | Emits |
| --- | --- | --- |
| Classless responsive | `utility('', z-index, (vn-utility-raised: 1), $infix, true)` | `.vn-utility-raised`, `.sm-vn-utility-raised`, `.md-vn-utility-raised`, `.lg-vn-utility-raised`, `.xl-vn-utility-raised`, and `.xxl-vn-utility-raised`, each gated at its boundary |
| Hover on `utility` | `utility(vn-utility-lift, margin-top, (1: 1px), $infix, $state: (hover))` | `.vn-utility-lift-1` and `.vn-utility-lift-1-hover:hover { margin-top: 1px !important }` |
| Hover on `utility-variable` | `utility-variable(vn-utility-tint, vn-utility-tint, (1: 0.1), $state: (hover))` | `.vn-utility-tint-1` and `.vn-utility-tint-1-hover:hover { --bs-vn-utility-tint: 0.1 }` |

## Gates (worktree unless noted)

npm 11 on `PATH` through the export the brief names.

| Criterion | Command | Exit | Result line |
| --- | --- | --- | --- |
| 1 | `npm run format:check` | 0 | "All matched files use the correct format." (291 files) |
| 1 | `npm run lint:check` | 0 | no findings printed |
| 1 | `npm run check` | 0 | — |
| 2 | `npm run build:src` | 0 | "✓ built in 869ms" (styles step) |
| 3 | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/mixins.test.ts tests/src/styles/utilities/gap.test.ts` | 0 | `Test Files  2 passed (2)`, `Tests  21 passed (21)` |
| 4 | `npm run build:src:styles && npm run test:service` | 0 | `Test Files  3 passed (3)`, `Tests  18 passed (18)` |
| 5 (probe copy, revised patch applied) | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/LayoutSection.test.ts` | 0 | `Tests  3 passed (3)` |
| 6 | `git apply --check --verbose ../../units/us-shared.patch` in a fresh `git archive 87ff1d0` extract; `git -C /home/user/veneer-us apply --check /home/user/scaffold/.orkestrel/veneer/units/us-shared.patch` | 0, 0 | "Checking patch" for each of `app/browser/constants.ts`, `tests/setup.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.ts`, `guides/veneer.md`, and `ROADMAP.md`; the applied files equal the probe's revised files byte for byte |
| 6 | `npx oxfmt --config .oxfmtrc.json --check` over the patched shared files (probe copy) | 0 | "All matched files use the correct format." |

### Criterion 2: the built cascade against round 1

The baseline step, retained as `/home/user/scaffold/.orkestrel/veneer/units/us-instruments/baseline.sh`, extracts `git archive 87ff1d0`, overlays optional style sources, and runs `npm run build:src:styles`. Before this round edited anything, the round-1 style sources were copied to `tmp/probe/round1-src` and the round-1 `dist/src/styles/index.css` to `tmp/probe/round1-built`.

```text
$ bash /home/user/scaffold/.orkestrel/veneer/units/us-instruments/baseline.sh base
badeb54ac6cbb073007223a0116ecb770f6ab0a0cf75aebcf479a76770890e8d  /home/user/veneer-us/tmp/probe/base/index.css
$ bash /home/user/scaffold/.orkestrel/veneer/units/us-instruments/baseline.sh round1 tmp/probe/round1-src
df76aab7ff8dcf3b7ce7e4ff8ececebf1644540956a42adc29b63c1c4f0ed765  /home/user/veneer-us/tmp/probe/round1/index.css
$ sha256sum dist/src/styles/index.css            # after this round's npm run build:src
df76aab7ff8dcf3b7ce7e4ff8ececebf1644540956a42adc29b63c1c4f0ed765  dist/src/styles/index.css
$ node /home/user/scaffold/.orkestrel/veneer/units/us-instruments/compare.mjs
baseline family rules 180 built family rules 252
baseline rules missing or changed in build: []
added rules by key: [ [ 'gap', 36 ], [ 'column-gap', 36 ] ]
gap recorded 36 problems [] extra 0
column-gap recorded 36 problems [] extra 0
row-gap recorded 36 problems [] extra 0
```

The round-1 rebuild's digest equals the digest of the retained round-1 `dist`. This round's build has the same digest, so every rule in the built cascade is unchanged from round 1, including the `gap`, `row-gap`, `column-gap`, `g`, `gx`, and `gy` rules. The `gap` partial calls neither `$state` nor the classless branch. The `compare.mjs` run prints the same lines round 1 recorded against the `87ff1d0` baseline.

## Failing-first records

- **F1 and F2 (mixins).** The fixture entries and test expectations came first. With the `$state` argument not yet accepted, the suite failed to import, because Sass rejects an unknown `$state` argument. The signature then accepted `$state: ()` without emitting it, and the infix was not yet fixed. At that point the criterion 3 command exited 1 with `2 failed | 19 passed`:
  - The naming case received `.-sm-vn-utility-raised` through `.-xxl-vn-utility-raised` and lacked the `.vn-utility-lift-1-hover:hover` and `.vn-utility-tint-1-hover:hover` selectors.
  - The gating case read no condition for the classless selectors.

  After the fix, the same command exited 0 with `21 passed`.
- **R2 (profiles).** `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project service tests/service/tailwind/profiles.test.ts`, run with `expect(tailwind.variables).toEqual([])`, exited 1 with `1 failed | 7 passed` and "expected [ '--spacing' ] to deeply equal []". That run is the measurement. The case asserts `['--spacing']`.
- **F3 and R3 (Layout).** In the worktree, without the patch, the criterion 5 command exits 1 with `2 failed | 1 passed`:
  - The specimen list case reads a list of 12 names against 14 expected.
  - The geometry case throws "No responsive gap row".

  In the probe copy with the revised patch, it exits 0 with `3 passed`.

## Mutations each proof distinguishes

The `/home/user/scaffold/.orkestrel/veneer/units/us-instruments/mutate-styles-2.py` sweep is the successor of `mutate-styles.py`. It restates round 1's mutations against the round-2 text and adds the state and classless-infix mutations. Each mutation rebuilds and runs the criterion 3 command. The source was restored after the sweep, checked with `cmp` against the backup.

| Mutation | Tally | Red cases |
| --- | --- | --- |
| State selector without its pseudo-class (`.NAME-hover`), `utility` | `1 failed \| 20 passed` | naming |
| State emitted on the base class (`.NAME:hover`), `utility` | `1 failed \| 20 passed` | naming |
| State rule written ahead of the base rule, `utility` | `1 failed \| 20 passed` | naming (the adjacency check) |
| `$state` ignored, `utility` | `1 failed \| 20 passed` | naming |
| State selector without its pseudo-class, `utility-variable` | `1 failed \| 20 passed` | naming |
| State emitted on the base class, `utility-variable` | `1 failed \| 20 passed` | naming |
| Classless infix keeps its hyphen (`.-md-KEY`) | `2 failed \| 19 passed` | naming; gating |
| `!important` dropped from `utility` (round 1) | `4 failed \| 17 passed` | naming; priority; gap priority; gap escape |
| `!important` added to `utility-variable` (round 1) | `2 failed \| 19 passed` | naming; priority. The priority filter also covers the tint state rule. |
| `$responsive` always true (round 1) | `1 failed \| 20 passed` | naming |
| `$responsive` always false (round 1) | `8 failed \| 13 passed` | naming; gating; gap order; the gap boundary cases except `xs` |
| Hyphen always inserted (round 1) | `1 failed \| 20 passed` | naming |
| Step map reversed; step reads `--vn-space-*` (round 1) | `11 failed \| 10 passed` each | every gap case |
| Density factor added (round 1) | `7 failed \| 14 passed` | the gap boundary cases; density |
| Loop per entry (round 1) | `1 failed \| 20 passed` | gap order |

The `/home/user/scaffold/.orkestrel/veneer/units/us-instruments/mutate-layout.py` sweep runs in the probe copy. Each mutation edits the copy's `app/browser/constants.ts` and runs the Layout proof. The file was restored and checked with `cmp`.

| Mutation | Tally | Red assertion |
| --- | --- | --- |
| `Responsive gap` on `row-cols-2` (the ruling's wording) | `2 failed \| 1 passed` | geometry: "expected 886 to be 817" (the second item sits on a row of its own); shape selector |
| Last item without `col-12`, no wrap | `2 failed \| 1 passed` | geometry: "expected 817 to be greater than 838"; shape selector |
| A `.card` on a `Responsive gap` item | `1 failed \| 2 passed` | the no-`.card` check |
| `Gap steps` items as `.card > .card-body` (round 1's markup) | `1 failed \| 2 passed` | the no-`.card` check |
| `Gap steps` without `.container-fluid` | `1 failed \| 2 passed` | shape selector |

The `/home/user/scaffold/.orkestrel/veneer/units/us-instruments/mutate-service-2.sh` script runs the service controls on the exact equality. Each control edits `tests/setup.css` from a backup and restores it. `cmp` and `git status --short tests/setup.css` confirm the restore.

| Control | Result | Red case |
| --- | --- | --- |
| C: `theme(static)` on the theme import, so `--font-sans` leaks | exit 1, `2 failed \| 16 passed` | profiles `fills Tailwind reset only under the preflight profile` ("expected [ '--font-sans', …(408) ] to deeply equal [ '--spacing' ]"); profiles `declares the Tailwind parts…` |
| D: a planted `@theme static { --radius-planted: 3px }` | exit 1, `1 failed \| 17 passed` | profiles `fills Tailwind reset…` ("expected [ '--spacing', '--radius-planted' ] to deeply equal [ '--spacing' ]"). Round 1's `not.toContain('--font-sans')` passes this control. |
| A (round 1, `mutate-service.sh`): `.gap-3` loses `!important` | exit 1, `3 failed \| 15 passed` | the red cases round 1 recorded |
| B (round 1): `gap-3` on the line | exit 1, `5 failed \| 13 passed` | the red cases round 1 recorded |

The 1280 geometry comes from the probe copy with the revised patch. Items are measured as left, top, right, and bottom.

| Layout | First item | Second item | Last item | Column gap | Row gap |
| --- | --- | --- | --- | --- | --- |
| Final (`row-cols-auto`, last item `col-12`) | 12, 817, 153.39, 838 | 161.39, 817, 245.81, 838 | 12, 886, 1268, 907 | 8px | 48px |
| `row-cols-2` (the ruling's wording) | top 817 | top 886 | top 955 | never shown | 48px |

The case asserts that the second item's top equals the first item's top, that the gap between them is 8px, and that the last item's top is 48px below the first item's bottom.

## Observations (probe copy with the revised patch, not criteria)

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run test:conformance` | 0 | `22 passed` |
| `npm run test:guides` | 0 | `18 passed` |
| `npm run test:setup` | 0 | `250 passed` |
| `npm run test:setup:browser` | 0 | `65 passed` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/LayoutSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `8 passed` |

The journey, `CAPTURE=1`, and the frames were not run. They are the Orchestrator's at landing.

- **Out of scope, pre-existing at `87ff1d0`.** `guides/veneer.md` § Styles carries an orphan fragment after the paragraph on utility importance. The fragment starts "layer, the calendar-picker indicator rule in the `elements` layer, and the color swatch rules in the `components` layer carry one as well…" and repeats that paragraph's tail. The revised patch leaves it alone and places the paragraph on the mixin contract after it. The carrier is the Orchestrator's to name.
- **For UTIL-TEXT.** `src/styles/components/_link.scss` writes each hover entry as one rule with a selector list, `.link-offset-1, .link-offset-1-hover:hover`. The mixins emit the release's form instead: the base rule, then a state rule. The resolved values are the same.

## Deviations

- **Specimen wrap mechanism (ancillary, decided).** The ruling said `row-cols-2`, like the gutter sibling. Under `row-cols-2` each item has a 50% width, so any column gap forces each item onto a row of its own. The measured tops at 1280 were 817, 886, and 955. The `column-gap-xl-2` class and the column axis of `gap-md-3` would then show nothing, which R12 bars. The chosen shape stays in the gutter form `.container-fluid > .row.row-cols-auto.g-0.gap-1.gap-md-3.row-gap-lg-5.column-gap-xl-2 > div + div + div.col-12`. It shows both axes: a 4px gap at 375, 16px at 768, and at 1280 a column gap of 8px and a row gap of 48px. It wraps at every width. The stop condition did not fire, because the specimen wraps at 1280 inside the Layout region's shape.
- **ROADMAP cell nouns.** The ruled F7 text gained "the … keys", "the … key", and "the … partial", which criterion 6 requires.
- **Off-limits file under a control.** Controls B, C, and D edit `tests/setup.css` temporarily and restore it byte for byte, as round 1's control B did. `git status` lists only the owned files.
- **Report-only files.** No shared or off-limits file changed in the worktree. The shared files are edited only in `tmp/probe/shared/tree` and in the probe copy.

## Files

These owned files changed from `87ff1d0`. Round 1 wrote them all. The table gives this round's change to each:

| File | Round 2 change |
| --- | --- |
| `src/styles/_mixins.scss` | `$state` on the `utility` and `utility-variable` mixins; the classless infix; `sass:list` and `sass:string`; the header comments |
| `src/styles/utilities/_gap.scss` | unchanged this round |
| `tests/src/styles/fixtures/mixins.scss` | the classless responsive entry, the hover entries on the `utility` and `utility-variable` mixins, and comment nouns |
| `tests/src/styles/mixins.test.ts` | naming, order, and gating expectations for the entries; comment wording |
| `tests/src/styles/utilities/gap.test.ts` | comment noun |
| `tests/app/browser/sections/LayoutSection.test.ts` | the gutter-shape selectors, the no-`.card` check, the cascade load, and the 1280 geometry case |
| `tests/service/tailwind/profiles.test.ts` | exact `variables` equality |
| `tests/service/tailwind/preflight.test.ts` | comment noun ("the `base` layer") |
| `tests/service/tailwind/consumer.test.ts`, `tests/fixtures/tailwind/markup.html` | unchanged this round |

The diffstat from `git diff 87ff1d0 --stat` is: `10 files changed, 591 insertions(+), 64 deletions(-)`.

The review evidence captured at hand-back is `tmp/units/us-2.diff` (`git diff 87ff1d0`) and `tmp/units/us-2-status.txt` (`git status --porcelain`).

The revised shared patch at `/home/user/scaffold/.orkestrel/veneer/units/us-shared.patch` supersedes round 1's patch whole. Round 1's copy is retained as `.orkestrel/veneer/units/us-shared.patch` in the scaffold checkout. The patch covers these files:
- `app/browser/constants.ts`
- `tests/setup.ts`
- `tests/conformance.test.ts`
- `tests/setupServer.test.ts`
- `tests/setupStyles.ts`
- `guides/veneer.md`
- `ROADMAP.md`

These instruments are in `/home/user/scaffold/.orkestrel/veneer/units/us-instruments/`:
- `baseline.sh`
- `probe-tree.sh`, which builds `tmp/probe/tree` from `87ff1d0`, the worktree changes, and the revised shared files
- `mutate-styles-2.py`
- `mutate-layout.py`
- `mutate-service-2.sh`
- the round-1 scripts, unchanged

The banned-term sweep used the pattern `\b(should|just|simply|easy|easily|easier|currently|now|new|latest|via|once|since|above|below|ensure|guarantee|e\.g\.|i\.e\.|etc\.|robust|performant|please|utilize|leverage|in order to|allows you to|and/or|dummy|sanity check)\b`, case-insensitive, over the added lines of `git diff 87ff1d0` and the revised patch. Every hit is permitted or is code. `once` means "one time". `below` means "one pixel lower". `new` appears only in `new SheetReader`, `new Set`, `new Map`, and `new LayoutSection`, and `below` also appears as a variable.
