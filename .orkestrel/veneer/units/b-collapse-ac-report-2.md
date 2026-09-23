# Unit ACCORDION (`ac`) report, round 2

`opus` on Opus 5.5, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-ac`
(branch `unit/ac`, uncommitted over `a658879`). The unit did the work itself and spawned nothing.
Brief: `/home/user/scaffold/.orkestrel/veneer/units/ac-brief-2.md`. This report supersedes
`/home/user/scaffold/.orkestrel/veneer/units/b-collapse-ac-report.md` for this round, and the patch
`/home/user/scaffold/.orkestrel/veneer/units/ac-shared-2.patch` supersedes `/home/user/scaffold/.orkestrel/veneer/units/ac-shared.patch` whole.

## Outcome

Every finding the brief carries is closed. The owned files are in the worktree, and every
shared-file change is in `/home/user/scaffold/.orkestrel/veneer/units/ac-shared-2.patch` (SHA-256
`033b377f1f037e6efde4146d64d629424dd598a36c368cc804ba00ab067e6532`), one unified diff against
`a658879` with an `index` line per file. `git apply --check tmp/units/ac-shared-2.patch` exits 0 in
the worktree, whose tracked files sit at `a658879` unchanged. Every gate the brief names exits 0 on a
validation copy built from `a658879`, that patch, and the owned files. The accordion proof reads red
with the partial emptied and red on the padding rows of the length case under the
`button-padding-literal` mutation, and every round-1 mutation reddens the same cases it reddened in
round 1.

Instruments and logs sit in `/home/user/scaffold/.orkestrel/veneer/units/ac-instruments-2/` and its `logs/` directory. The validation
copies under `tmp/probe/` are deleted.

## Findings closed

### The failing-first evidence (claim 3)

- **Site:** the retained evidence for the accordion proof.
- **Before:** the empty-partial reading had no retained log, the `--bs-accordion-btn-padding-x` and
  `--bs-accordion-btn-padding-y` rows of the length case had no red reading of their own, and the
  `built-selectors.mjs` output and the final application, guide, and policy runs had no retained log
  after the last edit.
- **After:**
  - `logs/empty-partial.log.txt`: `npx vitest run --config configs/src/vite.styles.config.ts
    --no-cache --reporter=verbose tests/src/styles/components/accordion.test.ts` on the final
    validation copy with `_accordion.scss` emptied and the styles rebuilt. Result line:
    `Tests  29 failed | 1 passed (30)`, exit 1. The passing case is `outlines the focused button at
    the focus width under forced colors, where its shadow ring is not painted`, which the
    elements-layer `button:focus-visible` rule answers while the partial is empty; the
    `forced-ring-omitted` mutation reddens it with the partial present.
  - `logs/green-control.log.txt`: the partial restored and checked by its digest
    (`81651f3969d623b1d442bee28f82fa240346683d89e98608270f13a61b341b81` before and after,
    `matches: yes`), the styles rebuilt, and the same command. Result line: `Tests  30 passed (30)`,
    exit 0. The instrument is `empty-partial.sh`.
  - `logs/button-padding-literal.log.txt`: `mutate.py` writes the `.accordion-button` padding as
    the literal `1rem 1.25rem` in place of the slot reads, rebuilds, and runs the proof. Result:
    exit 1, `3 failed | 27 passed (30)`, the failing cases `reads 'padding-left' from
    '--bs-accordion-btn-padding-x' and moves it only from the accordion that declares it`, `reads
    'padding-top' from '--bs-accordion-btn-padding-y' and moves it only from the accordion that
    declares it`, and `drives the block padding of the button and the body from the density factor
    and leaves the inline padding and the chevron fixed`.
  - `logs/built-selectors.log.txt`: the output of `built-selectors.mjs` over the final copy's built
    `dist/src/styles/index.css`, one line per accordion rule with its at-rule conditions and its
    declared properties.
  - `logs/final-test-app.log.txt`, `logs/final-test-guides.log.txt`, and
    `logs/final-test-policy.log.txt`: the final application, guide, and policy runs, taken on the
    final copy after the last edit.

### The specimen headers (S1)

- **Site:** `ACCORDION_SPECIMENS` in `app/browser/constants.ts` and `ACCORDION_MARKUP` in
  `tests/setupStyles.ts` (shared patch).
- **Before:** every header written `<h3 class="accordion-header">…</h3>`.
- **After:** every header written `<h2 class="accordion-header">…</h2>`, the release's markup. The
  level follows from the page: the `Showcase` class writes the page's one `h1` element, and a
  showcase region carries only an `aria-label` attribute and no heading of its own, so a header in a
  region sits directly under the `h1` element. The `ACCORDION_SPECIMENS` doc block states that
  reason. The partial and every proof read the `.accordion-header` class, so no rule moves.
- **Pinned by:** the section proof's case `renders an ordinary and a flush group and every resting
  state class in markup through the shared section contract` reads every header's tag as `H2`, and
  the binding case `binds the accordion selectors, published properties, and markup to the
  inventory` in `tests/setupStyles.test.ts` reads every header in the fixture as `h2`.

### The plain variant's name (S2)

- **Site:** `CaptureSubject`, `CASCADE_KEYS`, and `DRIVEN_KEYS` in `tests/setup.ts`; the journey
  case `reaches a collapsed accordion button through the keyboard and lifts its ring over the items
  beside it` in `tests/app/browser/integration.test.ts`; the name lists of the section proof; the
  `ACCORDION_SPECIMENS` entry and doc block.
- **Before:** `Accordion items`, with the scenarios `accordion-items` and `accordion-items-focus`.
- **After:** `Accordion base`, with the scenarios `accordion-base` and `accordion-base-focus`, so
  the plain variant carries the family's `<Region> base` name beside `Accordion flush`, as
  `List group base` sits beside `List group flush`. `Accordion flush` stays. A search of the
  validation copy for the `nav-base-focus` and `collapse-shown` scenario names, outside
  `node_modules` and `dist`, returned `tests/setup.ts` and `tests/app/browser/integration.test.ts`
  alone, so no other file enumerates the scenarios.
- **Reading under the rename:** every proof reads as it did in round 1 (see the proof matrix); the
  journey observation reads the renamed case and the portfolio cases green.

### Token nouns in the guide (claim 7)

- **Site:** `### Accordion classes` and the retained-variables pair in `guides/veneer.md` (shared
  patch).
- **Before → after:**
  - "lifts to `z-index: 2`, and a focused one lifts to `z-index: 3`" → "lifts to a `z-index` value
    of `2`, and a focused one lifts to a `z-index` value of `3`".
  - "each duration resolves to `0s` under that preference" → "each duration resolves to a `0s`
    duration under that preference".
  - "the release's `1rem`, so the block padding rescales with `--vn-factor-density`" → "the
    release's `1rem` length, so the block padding rescales with the `--vn-factor-density` factor".
  - "mixes `--vn-palette-blue`, which carries that literal" → "mixes the `--vn-palette-blue` token,
    which carries that literal".
  - "Bootstrap also retunes `--bs-navbar-toggler-icon-bg` under a dark component selector" →
    "Bootstrap also retunes the `--bs-navbar-toggler-icon-bg` variable under a dark component
    selector".
  - "`--bs-form-select-bg-img`, `--bs-form-switch-bg`, `--bs-accordion-btn-icon`, and
    `--bs-accordion-btn-active-icon` are declared" → "The `--bs-form-select-bg-img`,
    `--bs-form-switch-bg`, `--bs-accordion-btn-icon`, and `--bs-accordion-btn-active-icon` variables
    are declared".
- **Sweep:** every backticked token in the section and the pair was read with the word after it.
  The remaining tokens each carry a noun: the `collapsed`, `accordion-collapse`, `collapse`, `show`,
  `.accordion`, and `accordion-flush` class; the `parent` option; the `text-align: left` and
  `margin-left` declaration; the `--bs-accordion-inner-border-radius` value; the `:focus`
  pseudo-class; the `forced-ring` and `transition` mixin; the `src/styles/_tokens.scss` file; the
  `0.15s` and `0.2s` timings; the `--vn-space-8` and `--vn-size-3` token; the `1.25rem` literal;
  the `--bs-accordion-btn-focus-box-shadow` property; the `aria-expanded` and `aria-controls`
  attribute; the `tests/src/styles/components/accordion.test.ts` proof.
- **Beyond the section and the pair:** the unit's `### Files` row and its `accordion` `selector`
  and `variable` compatibility rows ended on a bare test path. Each names it as the
  `tests/src/styles/components/accordion.test.ts` proof. The formatter re-padded only those
  compatibility rows, so no sibling row moves.

### Token nouns elsewhere (claim 8)

- **`_accordion.scss`, the opening comment:** "keep the release's `1.25rem`, because" → "keep the
  release's `1.25rem` length, because".
- **The `ACCORDION_SPECIMENS` doc block:** "its panel carries `show`, and a collapsed button carries
  `collapsed` over a panel without `show`" → "its panel carries the `show` class, and a collapsed
  button carries the `collapsed` class over a panel without the `show` class"; "through
  `aria-expanded`" → "through the `aria-expanded` attribute"; "through `aria-controls`" → "through
  the `aria-controls` attribute".
- **`tests/setupStyles.ts`:** the `ACCORDION_SELECTORS` remarks "The release records
  `.accordion-button` and `.accordion-button::after` twice each, unconditionally and under the
  reduced-motion query, so the list carries each name once" → "The release records the
  `.accordion-button` selector and the `.accordion-button::after` selector both unconditionally and
  under the reduced-motion query, and the list names each selector without its condition and without
  repeating it"; its summary "once each" → "without repeating one"; the color-case remarks
  "`source` is the variable" → "the `source` field is the variable"; the length-case and the
  color-case summaries "in `ACCORDION_MARKUP` that" → "in the `ACCORDION_MARKUP` constant that"; the
  `pseudo` member doc "and `undefined` for the element itself" → "and the `undefined` value for the
  element itself".
- **The comment sweep:** every comment line the delta adds was listed from the validation copy's
  diff and read for a bare token and a tally. The sweep corrected these further sites: the section
  proof's "a panel that gains `show` under a collapsed button" → "a panel that gains the `show`
  class under a collapsed button", and the binding case's "The shared markup carries both groups" →
  "The shared markup carries the ordinary and the flush group".

### The report (claim 8 and the F-counts)

- **Before:** the round-1 report stated line counts per file, the tallies "both names", "both
  transitions", "both subjects", "twice each", and "one timing failure", described every worktree
  diagnostic as a missing export, and cited final application, guide, and policy runs with no log.
- **After:** this report states no line count in prose and no tally of a growable set; the
  diffstat is the retained `logs/diffstat.log.txt`. The worktree diagnostics are described under
  § Deviations as consequences of the missing shared exports. Each gate's command, result line,
  and retained log are in § Scoped gate exits.

## Failing first

Each command ran on the validation copy with the proof edited and the constant not yet edited, then
again after the constant changed.

- S2, the rename: `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project
  app:browser tests/app/browser/sections/AccordionSection.test.ts` read `Tests  3 failed | 1 passed
  (4)`, exit 1, with the section proof's name lists at `Accordion base` and the specimen still named
  `Accordion items` (`logs/section-red.log.txt`). The failing cases: `renders an ordinary and a
  flush group and every resting state class in markup through the shared section contract`,
  `renders each item in the state its button announces, with the panel it names shown or hidden to
  match`, and `rounds the ordinary group at its ends and squares the flush group throughout`.
- S1, the header level: after the specimen rename alone, the same command read `Tests  1 failed | 3
  passed (4)`, exit 1, on `expected Set{ 'H3' } to deeply equal Set{ 'H2' }` in `renders an
  ordinary and a flush group and every resting state class in markup through the shared section
  contract` (`logs/section-renamed.log.txt`). `npx vitest run --config vite.config.ts --no-cache
  --reporter=verbose --project setup tests/setupStyles.test.ts -t "accordion case tables"` read
  `Tests  1 failed | 112 skipped (113)`, exit 1, on `expected Set{ 'h3' } to deeply equal Set{ 'h2'
  }` in `binds the accordion selectors, published properties, and markup to the inventory`
  (`logs/setup-styles-red.log.txt`).
- After the `h2` headers: the section proof read `Tests  4 passed (4)`, exit 0
  (`logs/section-green.log.txt`), and the binding case read `Tests  1 passed | 112 skipped (113)`,
  exit 0 (`logs/setup-styles-green.log.txt`).
- The guide and comment wording findings have no executable red reading: no gate reads the word after
  a code token.

## Proof matrix

The case keys are the round-1 keys; the accordion proof's case titles are unchanged. Every
mutation ran through `mutate.py`, one at a time, with a rebuild, the accordion proof, and a
restore. The round-1 set was re-run on the round-2 validation copy
(`logs/mutations-round-1-set.log.txt`), and `compare.py` reads every mutation's failing set as
equal to its round-1 set (`logs/mutations-compare.log.txt`). That copy differed from the final copy
only in comment and guide wording. The empty-partial control and `button-padding-literal` ran on
the final copy.

- C1 writes the recorded accordion selectors and the dark icon rule, and no other rule on the accordion classes
- C2 declares the button and chevron transitions through their slots and no transition under the reduced-motion condition
- C3 lays each button out as a full-width row with its chevron at the end, and zeroes the header margin
- C4 reads `$reads` from `$property` and moves it only from the accordion that declares it (the length rows)
- C5 paints `$reads` from `$property`, the value `$source` gives it, and moves it only from the accordion that declares it (the color rows)
- C6 paints an expanded button from the active slots with its inset rule and turned chevron, and a collapsed button from the resting ones
- C7 draws the resting chevron on a collapsed button and the active chevron on an expanded one
- C8 rounds the group's outer corners on its boundary items, drops the top border of every later item, and squares the rest
- C9 squares every corner and drops the side and outer borders of a flush group
- C10 rings a focused button with the published shadow, lifts it over its neighbours, and lifts a hovered one a step lower
- C11 outlines the focused button at the focus width under forced colors, where its shadow ring is not painted
- C12 draws the dark chevrons on a button inside a dark island and leaves the theme scope without them
- C13 resolves the item, the collapsed button, and the expanded button from the light and the dark theme
- C14 reads one item, button, and chevron paint in light and another in dark
- C15 drives the block padding of the button and the body from the density factor and leaves the inline padding and the chevron fixed
- C16 transitions the button paint and the chevron turn and collapses both under the reduced-motion preference

The following table maps each recorded selector to its proof cases, its executed mutations, its
specimen, and its capture scenario.

| Recorded selector | Condition | Proof cases | Executed mutation → cases that reddened | Specimen | Capture scenario |
| --- | --- | --- | --- | --- | --- |
| (the whole partial) | — | every case but C11 | empty partial (control) → every case but C11 | base, flush | — |
| `.accordion` | — | C4, C5, C15 | `active-bg-literal` → C5 active-bg row; `padding-y-literal` → C15 | base, flush | `accordion-base`, `accordion-flush` |
| `.accordion-button` | — | C3, C4, C5, C15, C16 | `button-padding-literal` → C4 `--bs-accordion-btn-padding-x` and `--bs-accordion-btn-padding-y` rows, C15; `button-motion-outside-mixin` → C2, C4 inner radius, C5 button and active rows, C8, C10, C16 | base, flush | `accordion-base`, `accordion-flush` |
| `.accordion-button` | `@media (prefers-reduced-motion: reduce)` | C2, C16 | `button-motion-outside-mixin` → C2, C16 (and the settle-dependent cases in the preceding row) | base, flush | none: no variant stages the preference |
| `.accordion-button:not(.collapsed)` | — | C6, C5 active rows, C13 | `not-collapsed-inverted` → C1, C5 button and active rows, C6, C10, C13 light and dark | base (`Delivery windows`), flush (`Invoice copies`) | `accordion-base` (key `.accordion-button:not(.collapsed)` `background-color`) |
| `.accordion-button:not(.collapsed)::after` | — | C6, C7 | `not-collapsed-after-inverted` → C1, C6, C7; `one-icon-for-both` → C7 | base, flush | `accordion-base` |
| `.accordion-button::after` | — | C3, C4 icon width, C7 | `chevron-dropped` → C1, C2, C3, C4 icon width, C6, C7, C12, C14, C15, C16 | base, flush | `accordion-base`, `accordion-flush` |
| `.accordion-button::after` | `@media (prefers-reduced-motion: reduce)` | C2, C16 | `chevron-motion-outside-mixin` → C2, C16 | base, flush | none: no variant stages the preference |
| `.accordion-button:hover` | — | C10 | `hover-lift-dropped` → C1, C10 | base | none: the lift alone changes no paint (R1) |
| `.accordion-button:focus` | — | C10 | `focus-shadow-dropped` → C10; `focus-lift-dropped` → C10 | base (`Return policy`) | `accordion-base-focus` (page frame) |
| `.accordion-button:focus` (addition) | `@media (forced-colors: active)` | C11 | `forced-ring-omitted` → C11 | base | none: forced colors is no journey variant |
| `.accordion-header` | — | C3, C1 | `header-margin-changed` (`1rem`) → C3; `header-margin-dropped` → C1 alone, because the elements-layer heading treatment already zeroes heading margins | base, flush | `accordion-base`, `accordion-flush` |
| `.accordion-item` | — | C4, C5 item rows, C8, C13 | `item-dropped` → C1, C3, C4 border width, C5 item rows, C8, C9, C13 dark, C14 | base, flush | `accordion-base`, `accordion-flush` |
| `.accordion-item:first-of-type` | — | C8, C4 radius | `first-item-dropped` → C1, C4 radius row, C8 | base | `accordion-base` |
| `.accordion-item:first-of-type > .accordion-header .accordion-button` | — | C8, C4 inner radius | `first-button-dropped` → C1, C4 inner radius row, C8 | base | `accordion-base` |
| `.accordion-item:not(:first-of-type)` | — | C8, C9 | `later-top-border-dropped` → C1, C8, C9 | base, flush | `accordion-base`, `accordion-flush` |
| `.accordion-item:last-of-type` | — | C8 | `last-item-dropped` → C1, C8 | base | `accordion-base` |
| `.accordion-item:last-of-type > .accordion-header .accordion-button.collapsed` | — | C8 | `last-button-dropped` → C1, C8; `last-button-unqualified` → C1, C8 | base (`Warranty terms`) | `accordion-base` |
| `.accordion-item:last-of-type > .accordion-collapse` | — | C8 (last item opened in markup) | `last-panel-dropped` → C1, C8 | base (matched by the hidden `Warranty terms` panel) | none visible: the panel rests hidden and paints nothing |
| `.accordion-body` | — | C4 body rows, C15 | `body-dropped` → C1, C4 body rows, C15 | base, flush | `accordion-base`, `accordion-flush` |
| `.accordion-flush > .accordion-item` | — | C9 | `flush-item-dropped` → C1, C9 | flush | `accordion-flush` (key `.accordion-flush > .accordion-item` `border-left-width`) |
| `.accordion-flush > .accordion-item:first-child` | — | C9 | `flush-first-dropped` → C1, C9 | flush | `accordion-flush` |
| `.accordion-flush > .accordion-item:last-child` | — | C9 | `flush-last-dropped` → C1, C9 | flush | `accordion-flush` |
| `.accordion-flush > .accordion-item > .accordion-collapse` | — | C9 | `flush-panel-dropped` → C1, C9 | flush | `accordion-flush` |
| `.accordion-flush > .accordion-item > .accordion-header .accordion-button` | — | C9 | `flush-radius-dropped` → C1, C9 | flush | `accordion-flush` |
| `.accordion-flush > .accordion-item > .accordion-header .accordion-button.collapsed` | — | C9 | `flush-collapsed-dropped` → C1, C9 | flush (`Billing cycle`, `Refund timing`) | `accordion-flush` |
| `[data-bs-theme=dark] .accordion-button::after` (recorded under `theme`) | — | C12, C14 | `dark-rule-dropped` → C1, C12, C14; `retune-left-at-theme-scope` → C1, C12, C14; `asset-rows-kept` → C12 | base, flush | `accordion-base`, `accordion-flush` at `dark-1280` and `dark-390` |

The section proof reddens under `flush-class-dropped`, `collapsed-dropped-over-hidden-panel`,
`show-added-under-collapsed`, and `aria-expanded-disagrees` on the round-2 copy, each on the case
it reddened in round 1 (`logs/mutations-section.log.txt`, run by `mutate-section.py`).

## Scoped gate exits

Final validation copy: `a658879`, then `git apply tmp/units/ac-shared-2.patch`, then the owned
files copied from the worktree (`stage-final.sh`, `logs/stage-final.log.txt`). A recursive
comparison of its sources with the working copy the mutations ran on, excluding `node_modules`,
`dist`, and `.git`, reported no difference. `gates-final.sh` ran each gate in series
(`logs/final-chain.log.txt`).

| Gate | Command | Result | Log |
| --- | --- | --- | --- |
| format | `npm run format:check` | exit 0, `All matched files use the correct format.` | `logs/final-format-check.log.txt` |
| lint | `npm run lint:check` | exit 0 | `logs/final-lint-check.log.txt` |
| types | `npm run check` | exit 0 | `logs/final-check.log.txt` |
| build | `npm run build:src` | exit 0 | `logs/final-build-src.log.txt` |
| accordion proof | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/accordion.test.ts` | exit 0, `Tests  30 passed (30)` | `logs/final-accordion.log.txt` |
| section proof | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AccordionSection.test.ts` | exit 0, `Tests  4 passed (4)` | `logs/final-section.log.txt` |
| setup | `npm run test:setup` | exit 0, `Tests  254 passed (254)` | `logs/final-test-setup.log.txt` |
| conformance | `npm run test:conformance` | exit 0, `Tests  22 passed (22)` | `logs/final-test-conformance.log.txt` |
| guides | `npm run test:guides` | exit 0, `Tests  19 passed (19)` | `logs/final-test-guides.log.txt` |
| policy | `npm run test:policy` | exit 0, `Tests  109 passed \| 1 skipped (110)` | `logs/final-test-policy.log.txt` |
| application | `npm run test:app` | exit 0, `Tests  80 passed (80)` | `logs/final-test-app.log.txt` |
| journey (observation) | `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project journey:light-1280` | exit 0, `Tests  41 passed (41)`; the accordion journey case and the portfolio cases read green under the renamed rows, without `CAPTURE` | `logs/final-journey-light-1280.log.txt` |

Worktree, owned files only, shared files untouched:

| Gate | Command | Result | Log |
| --- | --- | --- | --- |
| format | `npm run format:check` | exit 0 | `logs/wt-format-check.log.txt` |
| lint | `npm run lint:check` | exit 0 | `logs/wt-lint-check.log.txt` |
| types | `npm run check` | exit 2 (D1) | `logs/wt-check.log.txt` |

Diffstat: `logs/diffstat.log.txt` holds `git apply --numstat tmp/units/ac-shared-2.patch` and
`git diff --no-index --numstat /dev/null <file>` for each owned file. The owned files' change
from round 1 is `logs/owned-round-delta.log.txt`.

## Touched files

Owned, in the worktree (`git status --porcelain` lists these and nothing else, each untracked):

- `src/styles/components/_accordion.scss`: the opening comment names the `1.25rem` length.
- `tests/app/browser/sections/AccordionSection.test.ts`: the `Accordion base` name lists, the `h2`
  header reading, and the `show` class named in the state case's comment.
- `tests/src/styles/components/accordion.test.ts`: unchanged from round 1.
- `app/browser/sections/AccordionSection.ts`: unchanged from round 1.

Shared, patch only (`/home/user/scaffold/.orkestrel/veneer/units/ac-shared-2.patch`): `app/browser/Showcase.ts`,
`app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`, `src/styles/_tokens.scss`,
`src/styles/index.scss`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`,
`tests/setupServer.test.ts`, `tests/setupStyles.test.ts`, and `tests/setupStyles.ts`. The round-2
changes sit in `app/browser/constants.ts`, `guides/veneer.md`,
`tests/app/browser/integration.test.ts`, `tests/setup.ts`, `tests/setupStyles.test.ts`, and
`tests/setupStyles.ts`; the other files carry the round-1 hunks unchanged.

Instruments in `/home/user/scaffold/.orkestrel/veneer/units/ac-instruments-2/`: `stage.sh` and `stage-final.sh` (the validation
copies), `mutate.py` (the round-1 mutations plus `button-padding-literal`; the `STAGE` variable
names the copy), `mutate-section.py`, `run-mutations.sh` with `mutation-names.txt`, `compare.py`,
`empty-partial.sh`, `built-selectors.mjs`, `gates-fast.sh` (an intermediate reading, logged as
`logs/base-*.log.txt`), `gates-final.sh`, `final-chain.sh`, and `make-patch.sh`. The stage paths
they name under `tmp/probe/` are deleted; `stage.sh` and `stage-final.sh` rebuild them.

## Deviations

- **D1 stands: the worktree's `npm run check` exits 2.** The owned files import the
  `ACCORDION_COPY` and `ACCORDION_SPECIMENS` exports of `app/browser/constants.ts`, the section
  barrel's `AccordionSection` export, and the `ACCORDION_*` tables of `tests/setupStyles.ts`, and
  only the shared patch adds them. The diagnostics in `logs/wt-check.log.txt` are the consequences
  of those missing exports: the `TS2305` and `TS2724` errors name the missing members, and the
  `TS7006`, `TS7031`, `TS2345`, and `TS2347` errors follow from them, because each import that
  fails to resolve leaves its value untyped. The validation copy with the patch reads `npm run
  check` exit 0.
- **Recorded choices, as the deviation contract allows:**
  - S1 is pinned by the section proof's specimen case and by the binding case in
    `tests/setupStyles.test.ts`, a shared file the round-1 patch already carries.
  - The `ACCORDION_SPECIMENS` doc block gains a sentence giving the header level's reason.
  - The retained-variables pair's navbar sentence reads "Bootstrap also retunes the
    `--bs-navbar-toggler-icon-bg` variable" rather than opening on the token, so the sentence keeps
    its actor.
  - The unit's `### Files` row and its compatibility rows are reworded for the token-noun rule,
    past the brief's sweep bound of the section and the pair, because the unit authored them. The
    sibling rows keep their form.
  - The round-1 mutation set ran on a validation copy whose `tests/setupStyles.ts` summary line and
    guide paragraphs were reflowed afterwards; no reflow touched a proof, a rule, or a fixture.
  - The `neighbor` spelling in the section proof stays, as the round-1 verdict rules it a close-out
    sweep.
- **Observation:** sibling units' mutation runs and a journey run in `/home/user/veneer` shared the
  host while these gates ran. No gate reported a timing failure in this round.

## What the unit could not close

- The worktree's `npm run check` reads green only with the shared patch applied (D1).
- No `CAPTURE=1` run, so no frame of `accordion-base`, `accordion-flush`, or `accordion-base-focus`
  exists; the capture run is the Orchestrator's.
- `.accordion-header { margin-bottom: 0 }` changes no resolved value on this cascade, because the
  elements-layer heading treatment already zeroes heading margins; only C1 catches the rule being
  dropped.
- `.accordion-item:last-of-type > .accordion-collapse` matches a hidden panel in the showcase, so no
  frame shows its paint; C8 reads it with the last item opened in markup.
- The hover lift, the reduced-motion twins, and the forced-colors outline have no frame (R1, and no
  variant stages either preference); the proofs read them.
- Carried from round 1, outside the unit's scope: an accordion button takes `line-height:
  var(--vn-line-body)` from the elements-layer `button` treatment, where the release's reboot
  writes `inherit`; the reboot ledger records that row.

## Shared-file patch

The exact patch, `/home/user/scaffold/.orkestrel/veneer/units/ac-shared-2.patch`, a unified diff against `a658879`:

The exact patch is retained beside this report as `/home/user/scaffold/.orkestrel/veneer/units/ac-shared-2.patch`; the round-2 report file embedded it verbatim after this line.
