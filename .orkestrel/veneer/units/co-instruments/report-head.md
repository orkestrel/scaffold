# Unit COLLAPSE (`co`) report — successor brief 2

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-co` (branch `unit/co` over
`87ff1d0`). Effective brief: `tmp/units/co-brief-2.md` over `tmp/units/co-brief.md`, plus the
Orchestrator's mid-campaign ruling on `.collapsing` (no specimen carries an inline style).

## Outcome

The `collapse` and `collapsing` keys ship in `_collapse.scss` exactly as the pinned inventory
records them. The four owned source and proof files are written, and `collapse` is on the exclusion
line in the three owned Tailwind files. Every other change is a report-only patch at the end of this
report.

Three stops were resolved inside scope and are recorded under § Deviations:

- **Criteria 2–6 need shared files.** They cannot go green in the worktree while the shared files
  are report-only. For example, the styles proof reads the built cascade, which `src/styles/index.scss`
  must load. So every gate ran in a scratch copy of the worktree with the returned patches applied.
  The worktree's own shared files are untouched.
- **`tests/fixtures/tailwind/markup.html` is needed but not owned.** Criterion 6 needs this file,
  and the brief's Owned row does not grant it. It is returned as a patch.
- **The mid-campaign ruling is applied.** No specimen carries an inline style. The `.collapsing`
  class renders no specimen and no frame (D17). It is proved on probe elements in the cascade proof.

## Touched files (owned)

| File | Summary |
| --- | --- |
| `src/styles/components/_collapse.scss` (new, 31 lines) | The hiding rule, the closing box, and the horizontal compound, with each transition written through the `transition` mixin at the release's `0.35s ease` value. |
| `tests/src/styles/components/collapse.test.ts` (new, 205 lines) | The cascade proof: the written selectors, the declared closing box and its reduced-motion twin, hidden and shown display, the clip with a hit test below the edge, the zero box, the horizontal compound against a nested element, both transitions at rest and staged, and every state inside a dark island. |
| `app/browser/sections/CollapseSection.ts` (new, 20 lines) | The `SpecimenSection` subclass fed by `COLLAPSE_COPY` and `COLLAPSE_SPECIMENS`. |
| `tests/app/browser/sections/CollapseSection.test.ts` (new, 123 lines) | The section contract, the resting classes reaching the region, no `.collapsing` specimen, no inline style, no trigger, each panel's state reading, and destruction. |
| `tests/setup.css` | `collapse` joins the `@source not inline` exclusion line. |
| `tests/fixtures/tailwind/consumer.css` | The same line. |
| `tests/fixtures/tailwind/preflight.css` | The same line. |

Diffstat (`git -C /home/user/veneer-co diff --stat 87ff1d0` plus the untracked files): 3 files
changed, 3 insertions, 3 deletions. The untracked files are the four new files listed in the
preceding table. `git status --porcelain` shows exactly those seven paths. The baseline logs the
first run wrote under `tmp/probe/` were moved to `tmp/units/co-baseline-conformance.log.txt` and
`tmp/units/co-baseline-styles.log.txt`, and `tmp/probe/` was removed.

## Unknowns, answered

- **Inline style on a specimen.** The shell renders specimen markup through `innerHTML` and the
  showcase declares no CSP, so an inline style would survive. The journey's census case
  (`reads the mounted class and style populations`) refuses one, so under the mid-campaign ruling
  no specimen carries an inline style. `CollapseSection.test.ts` asserts
  `region.querySelector('[style]')` is `null`.
- **Shared-name enumerations.** `grep -rn "caption-bottom caption-top\|caption-top" tests/` finds
  the exclusion line only in `tests/setup.css` and the two owned fixtures. No file under
  `tests/service/tailwind/**` and no case in `tests/setupServer.test.ts` enumerates the shared
  names, so no service proof is owned or patched. The consumer proof enumerates the shared set by
  requiring an element per name in `tests/fixtures/tailwind/markup.html`. That fixture is patched
  (see § Deviations).

## Proof matrix

Readings are from the scratch copy with every returned patch applied. The mutation log is
`co-unit-tools/logs/mutations.log.txt`. Each mutation was applied to one file, rebuilt, run, and
restored to a matching SHA-256.

| Recorded selector and condition (key) | Proof case | Distinguishing mutation → red cases | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.collapse:not(.show)`, no condition (`collapse`) | `hides a collapse until the show class is set, and leaves the shown panel its own display`; `writes the recorded collapse and collapsing selectors and no other rule on their classes`; `resolves every state the same inside a dark island as inside a light one` | `:not(.show)` dropped → 4 red (those three plus `closes a panel carrying no size of its own to a zero-height box`); a dark-island retune added → 2 red (the island case and the selector case) | `Collapse hidden`, `Horizontal collapse hidden`; the shown pair as the contrast | `collapse-hidden`, `horizontal-collapse-hidden` (selector `.card:has(> .collapse)` or `.card:has(> .collapse-horizontal)`, property `height`; the hidden panel's own box clips to no pixel) |
| `.collapse.show`, the shown state (no rule of its own) | the same hide/show case (shown `display` is the element's own, `block` or `inline`); `CollapseSection > renders each panel in the state its specimen names` | the shown specimen drops `show` → 1 red; the horizontal shown specimen drops `show` → 1 red | `Collapse shown`, `Horizontal collapse shown` | `collapse-shown` (`.collapse.show`, `display`), `horizontal-collapse-shown` (`.collapse-horizontal.show`, `display`) |
| `.collapsing`, no condition (`collapsing`): `height: 0`, `overflow: hidden`, `transition: height 0.35s ease` | `declares the recorded closing box at rest and no transition under the reduced-motion condition`; `clips a closing panel to the size set on it and lets the page show through below` (the `readHit` hit test at the child's centre, below the panel's bottom edge, lands outside the child); `closes a panel carrying no size of its own to a zero-height box` | `overflow` dropped → 3 red; `height: 0` dropped → 2 red | none: declined under the mid-campaign ruling, because its resting paint is empty (D17) | none (declined; recorded in the `CASCADE_KEYS` remarks and § Collapse classes) |
| `.collapsing` under `@media (prefers-reduced-motion: reduce)`: `transition: none` (`collapsing`) | the declared case (condition text equals `REDUCED_MOTION`); `transitions the closing size and collapses that transition under the reduced-motion preference` (`0.35s` at rest, `0s` under `stageMedia({ motion: false })`, `0.35s` after `releaseMedia()`) | a bare `transition` without the mixin → 2 red | none (declined) | none |
| `.collapsing.collapse-horizontal`, no condition (`collapse` and `collapsing`): `width: 0`, `height: auto`, `transition: width 0.35s ease` | the declared case; `closes a horizontal panel on its width alone, and only where both classes sit on one element` (zero width, content height, and a nested `.collapse-horizontal` keeping its width and `transition-property: all`) | written as the descendant `.collapsing .collapse-horizontal` → 5 red | none (declined); `.collapse-horizontal` renders at rest in the horizontal pair | none |
| `.collapsing.collapse-horizontal` under `@media (prefers-reduced-motion: reduce)`: `transition: none` (`collapse` and `collapsing`) | the declared case; the transitions case | a bare `transition` without the mixin → 2 red | none (declined) | none |
| The whole key set against the ledger | `cascade ledger > records every measured value difference in the guide ledger` (conformance) | `height 0.35s ease` → `height 0.3s ease` → 1 red, printing `collapsing \| .collapsing \| transition \| — \| height 0.35s ease \| height 0.3s ease \| declared` | — | — |

Failing-first evidence for the cascade proof: with the barrel line absent from the build, the
following command exits 1 with `Tests 8 failed (8)`, and with the line present it exits 0 with
`Tests 8 passed (8)`. Both runs are in the scratch copy.

```text
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/collapse.test.ts
```

Criterion 3: the built cascade (`dist/src/styles/index.css`, minified to one line, so
`grep -c` reads `1`) carries these rules and no other rule naming `.collapse` or `.collapsing`:
`.collapse:not(.show){display:none}`, `.collapsing{height:0;transition:height .35s;overflow:hidden}`,
`@media (prefers-reduced-motion:reduce){.collapsing{transition:none}}`,
`.collapsing.collapse-horizontal{width:0;height:auto;transition:width .35s}`, and
`@media (prefers-reduced-motion:reduce){.collapsing.collapse-horizontal{transition:none}}`.
`grep -o '\.collaps[a-z-]*'` tallies `.collapse` once, `.collapse-horizontal` twice, and
`.collapsing` four times. The inventory records the same set: `collapse` with 3 selector entries
(`.collapse:not(.show)`, the horizontal compound, and its reduced-motion twin) and `collapsing` with
4 (`.collapsing`, its twin, the horizontal compound, and its twin).

## Ledger rows

None. With the keys in the `listed` literal, the conformance ledger gates (departures, additions,
deferrals, and compatibility presence) are green. So the comparison reports no departure and no
addition for `collapse` or `collapsing`, and no `#### collapse` or `#### collapsing` table is
created. The ledger mutation in the preceding matrix shows that the comparison reads the key.
`0.35s ease` is written as the release's literal because no motion token resolves to `0.35s`. The
easing alone is not routed through `--vn-ease-standard`, because that would record a `tokenized`
departure while the duration still ignores `--vn-factor-motion`.

## Resting rows (`CASCADE_KEYS`, appended at the end) and subjects

| Scenario | Subject | Selector | Property |
| --- | --- | --- | --- |
| `collapse-shown` | `Collapse shown` | `.collapse.show` | `display` |
| `collapse-hidden` | `Collapse hidden` | `.card:has(> .collapse)` | `height` |
| `horizontal-collapse-shown` | `Horizontal collapse shown` | `.collapse-horizontal.show` | `display` |
| `horizontal-collapse-hidden` | `Horizontal collapse hidden` | `.card:has(> .collapse-horizontal)` | `height` |

A hidden row names its card, which hosts the hidden panel. This follows the registry's
`display: none` rule, the same rule the `badge-collapsed` row follows. No driven row is added, and
no `CaptureState` member is added. The journey ran at all four variants without `CAPTURE=1` in the
scratch copy, and each exited 0 with `Tests 38 passed (38)`. That run includes the lifted-frame
equality over these rows and the census with no inline style. The capture run is the
Orchestrator's.

## Guide text (inside the `guides/veneer.md` patch)

- **§ Surface (R17):** "…so they stay that shape until the first engine component carrying a
  cancelable pre-change event lands." The B-COLLAPSE sentence is removed.
- **§ Files row:** `src/styles/components/_collapse.scss`, "The hidden and shown panel, the closing
  box on each axis, and their transitions in the components layer, read by
  `tests/src/styles/components/collapse.test.ts`." It follows the `_pagination.scss` row.
- **§ Tailwind:** `collapse` is added to both recipe fences, and one sentence names the `collapse`
  class and Tailwind's `visibility: collapse` utility.
- **§ Collapse classes:** placed before `### Button group classes`, because `collapse` loads before
  `button-group`. It covers both keys, states that the classes are set in markup, and points at
  § Compatibility for the plugin. It also records the declined closing specimen.
- **§ Compatibility:** a `collapse | selector` row and a `collapsing | selector` row follow the
  pagination rows. Neither key has a variable row, because the inventory's property map is empty.
  The Collapse `plugin` row follows the last engine row: `engine | plugin | Collapse: … Owner:
  J-ENGINE. | — | accepted`, with the obligation cell from terrain § B. The cell is kept within
  the table's existing column width, so the formatter re-pads no other row. The R8 sentence
  follows the table: "A `plugin` row records behavior the engine owns and no shipped Veneer module
  performs, while the classes that plugin sets ship in the cascade and render in markup."
- **§ Showcase:** one clause, "and a Collapse region follows the Input group region".
- **§ Tests:** a link to the collapse classes proof.

## Scoped gate exits

Worktree, owned files only, as they stand:

- `npm run format:check`: exit 0.
- `npm run lint:check`: exit 0.
- `npm run test:policy`: exit 0 (`109 passed | 1 skipped`).
- `npm run check`: exit 2. The only errors are `TS2724` in `CollapseSection.ts` and
  `CollapseSection.test.ts`, because `COLLAPSE_COPY`, `COLLAPSE_SPECIMENS`, and `CollapseSection`
  reach the barrel only through the shared patches.

Scratch copy (`co-unit-tools/gates.sh`, all returned patches applied; logs under
`co-unit-tools/logs/`):

- `npm run format:check`: exit 0.
- `npm run lint:check`: exit 0.
- `npm run check`: exit 0.
- `npm run build:src`: exit 0.
- The criterion-4 command: exit 0 (8 passed).
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CollapseSection.test.ts`:
  exit 0 (3 passed). The section proof runs in the `app:browser` project of `vite.config.ts`, the
  project its siblings use.
- `npm run test:app`: exit 0 (68 passed).
- `npm run test:setup`: exit 0 (250 passed).
- `npm run test:conformance`: exit 0 (21 passed).
- `npm run test:guides`: exit 0 (18 passed).
- `npm run test:policy`: exit 0.
- `npm run test:service`: exit 0 (18 passed).
- `npm run test:setup:browser`: exit 0 (65 passed).
- `npm run test:config`: exit 0.
- The whole styles project: exit 0 (766 passed).
- The journey at each variant: exit 0 (38 passed each).

Criterion 6 controls (consumer proof only):

- With `collapse` dropped from the consumer's line, the run exits 1 with 4 failed, and the pairing
  reports `collapse visibility: visible became collapse`.
- With the markup fixture at `87ff1d0`, the run exits 1 with 1 failed:
  `derives the shared class names, and mounts an element for every one of them` lists `collapse`
  as unmounted.

Baseline readings the first run took at `87ff1d0` (`tmp/units/co-baseline-*.log.txt`):
`test:conformance` 21 passed; the scoped styles run 51 passed over 3 files.
