# LEDGER-RETUNE round 2 report

Retained by the Orchestrator from `/home/user/veneer-lret/tmp/units/r2/lret-report-3.md`. Every `lret-instruments/r2/` path is
relative to `/home/user/scaffold/.orkestrel/veneer/units/`, and every source path to `/home/user/veneer-lret`.

Round 2 is complete, and every acceptance gate exits 0. Round 2 stopped once, when
`--vn-shadow-inset` lost its only witness because the resolver varies the root font size. The
Orchestrator ruled in `ledger-retune-brief-3.md`: keep the `root` and `viewport` settings, and write
the token in px. After that ruling, the witness scan names no token. The only member drift is the
set of rows the ruling names. Every case in `describe('ValueResolver')` and in
`describe('cascade ledger')` has a mutation or plant that fails it with an `AssertionError` on the
record. The canonical and witness detection cases fail only under a plant, as this report
states. Deviation state: stopped once and resumed under the ruling. No stop is open.

## The stop and the ruling

- **Stop.** The report was `lret-instruments/r2/lret-report-2.md`, with the drift in
  `lret-instruments/r2/lret-conformance-drift1.log.txt`. The `theme | :root | --bs-box-shadow-inset` row
  read `retuned` at a 20px root font size. The release writes `1px 2px`, and the token wrote
  `0.0625rem 0.125rem`. The witness case named `--vn-shadow-inset`. The experiment in
  `lret-instruments/r2/lret-experiment-noroot.log.txt` showed the `root` setting to be the only cause.
- **Ruling 2 applied.** In `src/styles/_tokens.scss`, `--vn-shadow-inset` is now
  `inset 0 calc(1px * var(--vn-factor-elevation)) calc(2px * var(--vn-factor-elevation)) rgba(var(--vn-palette-black-rgb), 0.075)`.
  The token's § Reference map row in `guides/veneer.md` reads the same value. A search of `tests/`
  for the token's written value and for `--vn-shadow-inset` found no pin to own.
- **Execution step 1.** After `npm run build:src`, `lret-instruments/r2/lret-conformance-drift3.log.txt`
  (load 11.81) shows these results:
  - The witness case passes.
  - The only member drift is `.col-form-label`, `.display-1` to `.display-6`, and `legend`
    `font-size`, each going from `tokenized` to `retuned`.
  - The `--bs-box-shadow-inset` row keeps `tokenized`.

  An earlier run (`lret-conformance-drift2.log.txt`, load 14.18) timed out the ledger hook at the
  old 14700 ms budget before any case read it. The timing reading in this report re-derives that
  budget.

## Evidence re-readings

`lret-instruments/r2/lret-evidence.txt` holds the readings, taken at `7952712` on a clean tree. Every
reading matches the brief except these, which need no change:

- `tests/setupStyles.test.ts` held a second pair of `normalizeDeclaration` cases, around line 3607
  ("compares a percentage as its own number written in full"), besides the cases around line 3258.
- `normalizeDeclarationValue` lives in `tests/setupServer.ts`.

## Changes by item and symbol

- **Item 1: the resolver is faithful.** All of these changes are in `tests/setupServer.ts`.
  - `normalizeResolvedColors` rewrites a color only where it stands as a color value. It leaves
    every quoted string and every `url()` unchanged.
  - `inferScopeMode` replaces `matchesDarkScope`. It returns the `data-bs-theme` value of the
    innermost element among the target and its ancestors, so a `+` or `~` sibling gives no mode.
  - `extractMatchedCompound` is new. It writes the part of a compound an element must match: every
    pseudo-class but `:is()` and `:where()`, and every pseudo-element, is left out.
  - `collectContextElements` builds each element with its type, id, classes, and attributes. An id
    becomes the `id` attribute. The first single-compound alternative of an `:is()` or `:where()`
    adds its own tag, classes, and attributes. Each element carries its `compound`.
  - `ValueResolver.#substitute` checks each built element with `matches()` against its compound.
    A pair whose elements do not all match is undecided.
  - `ValueResolver.#compute` is new. It computes each pair on twins in every setting of the new
    `RESOLVER_SETTINGS` constant: `base`, `font`, `block`, `color`, `direction`, `root`, and
    `viewport`. It runs one pass per root font size and viewport, and sets the viewport with
    `setViewportSize`.
  - A regular property also computes under a parent that sets the property to the first
    `PARENT_VALUES` entry Chromium parses and computes apart from the base host's value.
  - A pair whose sides write the same text after substitution is read in the `base` setting alone.
  - A pair is undecided in either of these cases:
    - The sides differ and a side calls a function the new `UNVARIED_FUNCTIONS` constant names
      (`attr`, `counter`, `counters`, and `env`).
    - A regular property's side is `inherit`, `unset`, `revert`, or `revert-layer` and no parent
      value varies the property.
  - `Resolution` keeps its shape. It carries the first reading whose sides differ, or the `base`
    reading.
  - `ResolverSetting` is a new type.
  - `PROBE_SYNTAXES` keeps `<number>#`, `<length-percentage>+`, `<time>`, `<angle>`, and `<color>`.
    I removed each syntax that computes a value the same way as a kept syntax or the `font-family`
    rung, because removing such a syntax could never fail the probe-syntax case. No real row
    changed member from this.
- **R2 (b): how CSS-wide keywords compute.**
  - On a regular property, `inherit`, `unset`, `revert`, and `revert-layer` compute on the
    neutral twin under the base host and under the varied parent. A concrete value never matches
    both readings, so a keyword against a concrete value reads `retuned`, or undecided where no
    parent value parses.
  - The `.col-form-label` row is the real case of this.
  - The planted world's `reboot | body | text-align` row is another. Its undeclared variable
    computes as `unset`, so the row now reads `retuned`, and the text-only case's `fallback`
    example uses `color: var(--bs-body-color)` instead.
  - A custom property's keyword resolves in its own stylesheet at the site, as before.
- **Item 2: canonical values.** `scanCanonicalValues` changes as follows:
  - It compares a site outside every mode scope with the light cell. It also compares the site,
    written after `[data-bs-theme=dark]`, with the dark cell.
  - Where both sides resolve empty, it compares the written text and prints the empty sides as
    `(empty)`.

  `scanWitnesses` is async and takes the departure resolver. A row witnesses a token only where
  `var(<token>)` alone resolves alike to the row's release value.
- **Item 3: repaint pairs are decided.** The conformance `beforeAll` keeps both repaint `undecided`
  lists. The new case "decides every repainted value difference, with the theme key shipped and
  withheld" expects `[[], []]`. The witness scan and its all-retuned control now run in that hook.
- **Item 4: the boolean reads as an assertion.** `ContextElement.sibling` is now `nested`. It is
  true where the element sits inside the one before it, and for the first element. It is false
  where `+` or `~` places the element beside the one before it. Every site uses the new name.
- **Item 5: one comparison engine.** `normalizeDeclaration` is retired, with its import, its
  export-list row, and both of its case pairs. The new case "compares a duration and a percentage
  as the values Chromium computes, whatever their notation" pins these results: `150ms` against
  `0.15s` alike, `15%` against `15.0%` alike, and `15%` against `16%` apart.
- **Item 6.** The Item 6 section later in this report covers it.
- **Item 7.** The guide section later in this report lists the sentences.
- **Item 8: the case notes.**
  - The text-only case is retitled "…as its text-only member, and an unwritten declaration as
    dropped".
  - The retuned case's `restated` control carries a comment.
  - The mode proof is its own case, "reads the mode from the target and its ancestors, never from a
    sibling", and it names `inferScopeMode`.
  - The witness fixture's `--vn-gray-3000` row carries a near-miss comment.
  - The `var(--vn-container-sm)` row reads `tokenized`, the member the classifier names.
- **Exports.** The export list and the frozen pins in `tests/setupServer.test.ts` add
  `PARENT_VALUES`, `RESOLVER_SETTINGS`, `UNVARIED_FUNCTIONS`, `extractMatchedCompound`, and
  `inferScopeMode`, and drop `matchesDarkScope`. A pin holds that each non-base setting changes
  exactly one context from `base`.

## Failing-first and green readings

The command is
`npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupStyles.test.ts`.

- **Red.** `lret-instruments/r2/lret-red-setup.log.txt` reads `Tests 14 failed | 285 passed (299)`.
  - Every Item 1, 2, and 4 case failed with `AssertionError`, except the cases calling
    `inferScopeMode` and `extractMatchedCompound`. Those failed with `TypeError` because the
    functions did not exist yet.
  - The export-list case failed with `AssertionError`.
  - Item 5's case passed red, because the resolver already computed those values. Its binding is
    the `syntax-time` mutation.
  - Item 3's case has no red reading of its own: it read a list the hook did not yet keep. The
    `rungs-dropped` mutation binds it.
- **Green.** `lret-instruments/r2/lret-setup.log.txt` reads `Tests 297 passed (297)`, with exit 0.

## Rows whose member changed, as the gate printed them

These rows come from `lret-instruments/r2/lret-conformance-drift3.log.txt` and are applied to § Departures:

- `col | .col-form-label | font-size | — | inherit | var(--vn-size-3) | retuned`
- `display | .display-1 | font-size | — | calc(1.625rem + 4.5vw) | calc(var(--vn-display-1) - max(var(--vn-display-1) * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px)) | retuned`
- `display | .display-2 | font-size | — | calc(1.575rem + 3.9vw) | calc(var(--vn-display-2) - max(var(--vn-display-2) * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px)) | retuned`
- `display | .display-3 | font-size | — | calc(1.525rem + 3.3vw) | calc(var(--vn-display-3) - max(var(--vn-display-3) * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px)) | retuned`
- `display | .display-4 | font-size | — | calc(1.475rem + 2.7vw) | calc(var(--vn-display-4) - max(var(--vn-display-4) * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px)) | retuned`
- `display | .display-5 | font-size | — | calc(1.425rem + 2.1vw) | calc(var(--vn-display-5) - max(var(--vn-display-5) * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px)) | retuned`
- `display | .display-6 | font-size | — | calc(1.375rem + 1.5vw) | calc(var(--vn-display-6) - max(var(--vn-display-6) * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px)) | retuned`
- `reboot | legend | font-size | — | calc(1.275rem + 0.3vw) | calc(var(--vn-size-6) - max(var(--vn-size-6) * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px)) | retuned`

Each of these rows was `tokenized`. The `.col-form-label` row reads `retuned` through the parent
reading, and the `display` and `legend` rows through the `root` setting. The `reboot` `th`
`text-align` row still reads `retuned`, so the legend names it (F2). No real pair is undecided.

## Item 6: the mutation driver and the plants

- **Scripts.**
  - The driver is `lret-instruments/r2/lret-mutations-2.sh`. It walks the table in
    `lret-instruments/r2/lret-mutation.py`, runs each entry's paired cases with vitest's full verbose
    output, and restores every edited file from its backup. It checks each restore with `cmp`, and
    writes `git diff --stat` after the restore into each log.
  - Plants on `src/styles` rebuild the styles before the run and again after the restore.
  - `lret-instruments/r2/lret-kills.py` reads the logs. Its output is `lret-instruments/r2/lret-kills.txt`.
  - Before the mutation runs, `lret-instruments/r2/pre-mutation.sha256` recorded the tree. Every owned file
    matched it after the last run.
- **One scripted restore failed.** In `addition-unrecorded`, the table read the guide row it
  deletes at import, so the restore step could not load the table. I restored `guides/veneer.md`
  from `lret-instruments/r2/backup-guides_veneer.md`, whose SHA-256 matches the pre-mutation digest.
  The log records this. I then fixed the table to write the row out whole and reran the entry.
  `lret-mutation-addition-unrecorded.log.txt` is that rerun, and its restore is byte-identical.
- **The detection cases fail only under a plant.** Under `canonical-self-ledger` and
  `witness-row-ledger`, the canonical and witness cases pass on the clean tree (`exit=0`). A mutation that disables a
  detector cannot fail a detection case when the tree has nothing to detect. The plants
  `plant-radius`, `plant-initial`, `plant-scoped`, `plant-witness`, and `plant-pill` fail those
  cases with an `AssertionError` naming the token.
- **The `root` mutation** drops the `root` setting from `RESOLVER_SETTINGS`. It fails the context
  case with an `AssertionError`: `1rem` against `16px` reads alike.

A case that shares a mutation with another case appears once per case in the following table:

| Mutation or plant | Case | Log | AssertionError line |
| --- | --- | --- | --- |
| `addition-stale` | names no addition the compiled cascade no longer emits | `lret-instruments/r2/lret-mutation-addition-stale.log.txt` | `AssertionError: expected [ Array(1) ] to deeply equal []` |
| `addition-unrecorded` | records every emitted name the official inventory lacks | `lret-instruments/r2/lret-mutation-addition-unrecorded.log.txt` | `AssertionError: expected [ Array(1) ] to deeply equal []` |
| `base-only` | decides a pair alike only where both sides compute alike in every context their terms read | `lret-instruments/r2/lret-mutation-base-only.log.txt` | `AssertionError: expected [ { recorded: '8px', …(1) }, …(12) ] to deeply equal [ { recorded: '8px', …(1) }, …(12) ]` |
| `canonical-self-ledger` | (none: exit=0 on the clean tree) | `lret-instruments/r2/lret-mutation-canonical-self-ledger.log.txt` | — |
| `canonical-self` | names a canonical token whose declaration resolves apart from its reference cell, at every site that declares it | `lret-instruments/r2/lret-mutation-canonical-self.log.txt` | `AssertionError: expected [] to deeply equal [ …(2) ]` |
| `category-swapped` | reports an unrecorded literal declaration on a shipped rule as a declaration addition | `lret-instruments/r2/lret-mutation-category-swapped.log.txt` | `AssertionError: expected [ …(330) ] to deeply equal [ Array(1) ]` |
| `colors-raw` | resolves each side in its own stylesheet, a custom property through the first typed probe both values parse | `lret-instruments/r2/lret-mutation-colors-raw.log.txt` | `AssertionError: expected [ { recorded: '16px', …(1) }, …(9) ] to deeply equal [ { recorded: '16px', …(1) }, …(9) ]` |
| `colors-raw` | writes every sRGB color at the 8-bit precision a legacy color computes to, and leaves every other color alone | `lret-instruments/r2/lret-mutation-colors-raw.log.txt` | `AssertionError: expected 'color(srgb 0 0 0 / 0.175)' to be 'rgba(0, 0, 0, 0.176)' // Object.is equality` |
| `colors-strings` | normalizes a color only where it stands as a color value, never inside a string or a URL | `lret-instruments/r2/lret-mutation-colors-strings.log.txt` | `AssertionError: expected '"rgb(255, 0, 0)"' to be '"color(srgb 1 0 0)"' // Object.is equality` |
| `deferrals-inverted` | defers no name the built cascade ships | `lret-instruments/r2/lret-mutation-deferrals-inverted.log.txt` | `AssertionError: expected [ 'ol ol', 'ul ul', 'ol ul', …(11) ] to deeply equal []` |
| `empty-alike` | compares the written text of a canonical token and its cell where both resolve to nothing | `lret-instruments/r2/lret-mutation-empty-alike.log.txt` | `AssertionError: expected [] to deeply equal [ …(2) ]` |
| `id-dropped` | reads every variable at an element that matches its compound, and names a compound it cannot build undecided | `lret-instruments/r2/lret-mutation-id-dropped.log.txt` | `AssertionError: expected [ undefined, …(3) ] to deeply equal [ { recorded: '3px', …(1) }, …(3) ]` |
| `ignore-resolution-ledger` | records every measured value difference in the guide ledger | `lret-instruments/r2/lret-mutation-ignore-resolution-ledger.log.txt` | `AssertionError: expected [ …(457) ] to deeply equal []` |
| `ignore-resolution-ledger` | names no departure the compiled cascade no longer carries | `lret-instruments/r2/lret-mutation-ignore-resolution-ledger.log.txt` | `AssertionError: expected [ …(457) ] to deeply equal []` |
| `ignore-resolution` | classifies a pair whose values resolve apart as retuned, whatever its text reads | `lret-instruments/r2/lret-mutation-ignore-resolution.log.txt` | `AssertionError: expected [ 'tokenized', 'tokenized', …(4) ] to deeply equal [ 'retuned', 'retuned', …(4) ]` |
| `mode-siblings` | reads the mode from the target and its ancestors, never from a sibling | `lret-instruments/r2/lret-mutation-mode-siblings.log.txt` | `AssertionError: expected [ 'dark', 'dark', 'dark', 'dark' ] to deeply equal [ Array(4) ]` |
| `nested-flip` | builds one element per compound that matches it, nested or beside the one before it | `lret-instruments/r2/lret-mutation-nested-flip.log.txt` | `AssertionError: expected [ { tag: 'div', …(4) }, …(2) ] to deeply equal [ { tag: 'div', …(4) }, …(2) ]` |
| `no-parent` | decides a pair alike only where both sides compute alike in every context their terms read | `lret-instruments/r2/lret-mutation-no-parent.log.txt` | `AssertionError: expected [ { recorded: '8px', …(1) }, …(12) ] to deeply equal [ { recorded: '8px', …(1) }, …(12) ]` |
| `no-parent` | names undecided a pair whose term reads a context the resolver cannot vary | `lret-instruments/r2/lret-mutation-no-parent.log.txt` | `AssertionError: expected [ undefined, …(2) ] to deeply equal [ undefined, undefined, { …(2) } ]` |
| `no-parent` | names a planted unrecorded departure, a planted stale row, and each planted difference it cannot decide | `lret-instruments/r2/lret-mutation-no-parent.log.txt` | `AssertionError: expected [ …(4) ] to deeply equal [ …(5) ]` |
| `plant-initial` | resolves every canonical token at every site that declares it to its reference map cell, in each mode | `lret-instruments/r2/lret-mutation-plant-initial.log.txt` | `AssertionError: expected [ …(2) ] to deeply equal []` |
| `plant-pill` | witnesses every bootstrap-sourced token with a departure row whose release value the token itself resolves to | `lret-instruments/r2/lret-mutation-plant-pill.log.txt` | `AssertionError: expected [ '--vn-radius-pill' ] to deeply equal []` |
| `plant-radius` | resolves every canonical token at every site that declares it to its reference map cell, in each mode | `lret-instruments/r2/lret-mutation-plant-radius.log.txt` | `AssertionError: expected [ …(2) ] to deeply equal []` |
| `plant-scoped` | resolves every canonical token at every site that declares it to its reference map cell, in each mode | `lret-instruments/r2/lret-mutation-plant-scoped.log.txt` | `AssertionError: expected [ Array(1) ] to deeply equal []` |
| `plant-undecided` | classifies a pair whose values differ in text and resolve alike as its text-only member, and an unwritten declaration as dropped | `lret-instruments/r2/lret-mutation-plant-undecided.log.txt` | `AssertionError: expected [ Array(1) ] to deeply equal []` |
| `plant-witness` | witnesses every bootstrap-sourced token with a departure row whose release value the token itself resolves to | `lret-instruments/r2/lret-mutation-plant-witness.log.txt` | `AssertionError: expected [ '--vn-radius-pill' ] to deeply equal []` |
| `pseudo-kept` | writes the part of a compound an element must match, without its state or its pseudo-elements | `lret-instruments/r2/lret-mutation-pseudo-kept.log.txt` | `AssertionError: expected '.btn:hover::after' to be '.btn' // Object.is equality` |
| `root` | decides a pair alike only where both sides compute alike in every context their terms read | `lret-instruments/r2/lret-mutation-root.log.txt` | `AssertionError: expected [ { recorded: '8px', …(1) }, …(12) ] to deeply equal [ { recorded: '8px', …(1) }, …(12) ]` |
| `route-undecided` | names each pair the resolver cannot decide, and classifies none of them | `lret-instruments/r2/lret-mutation-route-undecided.log.txt` | `AssertionError: expected [] to deeply equal [ …(2) ]` |
| `rungs-dropped` | decides every measured value difference by the value each side resolves to in Chromium | `lret-instruments/r2/lret-mutation-rungs-dropped.log.txt` | `AssertionError: expected [ …(13) ] to deeply equal []` |
| `rungs-dropped` | decides every repainted value difference, with the theme key shipped and withheld | `lret-instruments/r2/lret-mutation-rungs-dropped.log.txt` | `AssertionError: expected [ [ …(18) ], [ …(3) ] ] to deeply equal [ [], [] ]` |
| `scoped-once` | names a canonical token whose declaration resolves apart from its reference cell, at every site that declares it | `lret-instruments/r2/lret-mutation-scoped-once.log.txt` | `AssertionError: expected [ Array(1) ] to deeply equal [ …(2) ]` |
| `scoped-once` | compares a declaration outside every mode scope with the cell of each mode, and one inside a scope with that mode alone | `lret-instruments/r2/lret-mutation-scoped-once.log.txt` | `AssertionError: expected [] to deeply equal [ Array(1) ]` |
| `syntax-angle` | types a custom property through each probe syntax an input no syntax tried before it parses | `lret-instruments/r2/lret-mutation-syntax-angle.log.txt` | `AssertionError: expected [ { recorded: '1, 2', …(1) }, …(4) ] to deeply equal [ { recorded: '1, 2', …(1) }, …(4) ]` |
| `syntax-color` | types a custom property through each probe syntax an input no syntax tried before it parses | `lret-instruments/r2/lret-mutation-syntax-color.log.txt` | `AssertionError: expected [ { recorded: '1, 2', …(1) }, …(4) ] to deeply equal [ { recorded: '1, 2', …(1) }, …(4) ]` |
| `syntax-length-percentage-list` | types a custom property through each probe syntax an input no syntax tried before it parses | `lret-instruments/r2/lret-mutation-syntax-length-percentage-list.log.txt` | `AssertionError: expected [ { recorded: '1, 2', …(1) }, …(4) ] to deeply equal [ { recorded: '1, 2', …(1) }, …(4) ]` |
| `syntax-number-list` | types a custom property through each probe syntax an input no syntax tried before it parses | `lret-instruments/r2/lret-mutation-syntax-number-list.log.txt` | `AssertionError: expected [ undefined, …(4) ] to deeply equal [ { recorded: '1, 2', …(1) }, …(4) ]` |
| `syntax-time` | compares a duration and a percentage as the values Chromium computes, whatever their notation | `lret-instruments/r2/lret-mutation-syntax-time.log.txt` | `AssertionError: expected [ undefined, …(2) ] to deeply equal [ { recorded: '0.15s', …(1) }, …(2) ]` |
| `syntax-time` | types a custom property through each probe syntax an input no syntax tried before it parses | `lret-instruments/r2/lret-mutation-syntax-time.log.txt` | `AssertionError: expected [ { recorded: '1, 2', …(1) }, …(4) ] to deeply equal [ { recorded: '1, 2', …(1) }, …(4) ]` |
| `tags-layer` | selects in the elements layer exactly the tags the partial table names | `lret-instruments/r2/lret-mutation-tags-layer.log.txt` | `AssertionError: expected [ Array(8) ] to deeply equal [ 'a', 'abbr', 'address', 'b', …(51) ]` |
| `text-compare-ledger` | names a retuned value retuned and a routed release value tokenized, whatever the token source | `lret-instruments/r2/lret-mutation-text-compare-ledger.log.txt` | `AssertionError: expected [ …(2235) ] to include 'accordion \| .accordion \| --bs-accordi…'` |
| `text-compare` | classifies a pair whose values differ in text and resolve alike as its text-only member, and an unwritten declaration as dropped | `lret-instruments/r2/lret-mutation-text-compare.log.txt` | `AssertionError: expected [ …(8) ] to deeply equal [ …(8) ]` |
| `theme-unmeasured` | measures the dark component rules under the theme key, and leaves them unmeasured while it is withheld | `lret-instruments/r2/lret-mutation-theme-unmeasured.log.txt` | `AssertionError: expected [ [], [] ] to deeply equal [ [ …(5) ], [] ]` |
| `unattributed-silent` | attributes every emitted rule to a shipped component | `lret-instruments/r2/lret-mutation-unattributed-silent.log.txt` | `AssertionError: expected [] to deeply equal [ 'components \| .audit-orphan \| —' ]` |
| `unmatched` | reads every variable at an element that matches its compound, and names a compound it cannot build undecided | `lret-instruments/r2/lret-mutation-unmatched.log.txt` | `AssertionError: expected [ { recorded: '3px', …(1) }, …(3) ] to deeply equal [ { recorded: '3px', …(1) }, …(3) ]` |
| `unvaried-ignored` | names undecided a pair whose term reads a context the resolver cannot vary | `lret-instruments/r2/lret-mutation-unvaried-ignored.log.txt` | `AssertionError: expected [ { recorded: '0px', …(1) }, …(2) ] to deeply equal [ undefined, undefined, { …(2) } ]` |
| `where-classes-ignored` | places by measurement every emitted rule but the ones a recorded selector row owns | `lret-instruments/r2/lret-mutation-where-classes-ignored.log.txt` | `AssertionError: expected [ …(10) ] to deeply equal [ …(2) ]` |
| `witness-row-ledger` | (none: exit=0 on the clean tree) | `lret-instruments/r2/lret-mutation-witness-row-ledger.log.txt` | — |
| `witness-row` | names each bootstrap token no departure row reads at the release value, by the token alone | `lret-instruments/r2/lret-mutation-witness-row.log.txt` | `AssertionError: expected [ '--vn-gray-200', '--vn-gray-300' ] to deeply equal [ '--vn-gray-200', …(2) ]` |

## The plants of Execution step 6

Each plant was restored byte for byte, with the `git diff --stat` after the restore in its log.
Each `src/styles` plant was rebuilt before its run (`build:src:styles exit=0`) and after its
restore (`rebuild after restore exit=0`).

| Plant | What it plants | Failing assertion |
| --- | --- | --- |
| `radius` (`lret-mutation-plant-radius.log.txt`) | `--vn-radius-base: calc(0.75rem * var(--vn-factor-radius))` | `AssertionError: expected [ …(2) ] to deeply equal []`, naming `--vn-radius-base \| :root \| … \| 6px \| 12px` and the `[data-bs-theme=dark]` line |
| `witness` (`lret-mutation-plant-witness.log.txt`) | `--vn-radius-pill: 40rem`, with its § Reference map cell | `AssertionError: expected [ '--vn-radius-pill' ] to deeply equal []` |
| `undecided` (`lret-mutation-plant-undecided.log.txt`) | the in-memory pair `.btn` `--bs-btn-padding-x` `1px` against `red` in the text-only case | `AssertionError: expected [ Array(1) ] to deeply equal []`, naming `btn \| .btn \| --bs-btn-padding-x \| — \| 1px \| red` |
| `pill` (`lret-mutation-plant-pill.log.txt`) | the token and its cell at `40rem`, and `--bs-border-radius-pill: calc(var(--vn-radius-pill) * 1.25)` | `AssertionError: expected [ '--vn-radius-pill' ] to deeply equal []` |
| `initial` (`lret-mutation-plant-initial.log.txt`) | `--vn-text-heading: initial` at `:root` in `_tokens.scss` | `AssertionError: expected [ …(2) ] to deeply equal []`, naming `--vn-text-heading \| :root \| — \| inherit \| initial \| (empty) \| (empty)` and the dark line |
| `scoped` (`lret-mutation-plant-scoped.log.txt`) | `.btn { --vn-text-body-base: oklch(0.208 0.042 265.755) }`, the light cell, in `_button.scss` | `AssertionError: expected [ Array(1) ] to deeply equal []`, naming `--vn-text-body-base \| [data-bs-theme=dark] .btn \| — \| oklch(0.929 0.013 255.508) \| oklch(0.208 0.042 265.755) \| …` |

## Timing

The instrument is `lret-instruments/r2/probe/timing.probe.test.ts`, which runs under
`lret-instruments/r2/probe.config.ts`, and its readings go to `lret-instruments/r2/probe/timing.txt`. Each run
does all of the following:

- It launches both resolvers.
- It classifies every gap and both repaint ledgers.
- It scans canonical values, runs the witness scan, and runs its all-retuned control.

These readings came back:

- **Four concurrent runs** (`lret-instruments/r2/lret-timing.sh`, load 11.30–13.92): 9615, 9788, 9873, and
  9907 ms total, with classification taking 6007–6401 ms.
- **One run at load 2.82:** 5677 ms total, with classification taking 3392 ms. This reading is an
  observation.
- **The first reading** (load 17.62) ran before I added the same-text short circuit: 14726 ms. An
  earlier attempt at four concurrent runs, under that load and before that change, exceeded the
  probe's 120 s case timeout. Those logs are `lret-timing-contended-*.log.txt`, overwritten by the
  later round. I then added the short circuit for a pair whose sides write the same text after
  substitution.

`LEDGER_TIMEOUT = 24_900` follows the `ORACLE_TIMEOUT` rule: twice the 9950 ms contended run
(9907 ms rounded up), plus 5000 ms. Observation: the conformance gate took 46.64 s with 34 passing
tests at load 4.62 (`lret-conformance.log.txt`).

## Guide sentences changed (Item 7)

These sentences in `guides/veneer.md` changed:

- **§ Reference map preamble.** The canonical comparison now runs "in each mode that site applies
  in".
- **§ Reference map comparison paragraph.**
  - The 8-bit sentence now names only `rgb()`, `rgba()`, and `color(srgb …)`. A color in any other
    space, `oklch()` and `color(display-p3 …)` included, compares as Chromium writes it.
  - A new sentence says that values which both resolve to nothing compare as written text.
  - The `150ms`, `15%`, and `16%` examples are Item 5's case.
- **§ Departures preamble.**
  - The resolver builds one element per compound, each matching its compound.
  - The target and its ancestors decide the mode.
  - The twins compute under every `RESOLVER_SETTINGS` setting, named in the code's words: the
    `base` setting, then `font`, `block`, `color`, `direction`, `root`, and `viewport`.
  - A regular property also computes under a parent that sets the property.
  - Two sides are alike only under every setting.
  - The `.col-form-label`, `display`, and `legend` rows are named with their reasons.
  - An `env()` value is undecided.
  - The rule for a site the release writes twice names the `pre` and `kbd` `font-size` rows beside
    `-webkit-sticky`.
  - The probe example is `<length-percentage>+`, because `<length>` no longer exists.
- **Legend.** `retuned` compares computed values, and the `reboot` `th` `text-align` row is named
  with `-webkit-match-parent` computing to `left` and `inherit` to `start` (F2).
- **Legend witness sentence.** A witness requires the token alone to resolve to the row's release
  value, so arithmetic on the token witnesses nothing.
- **§ Outside the ledger introduction.** It lists its items in paragraph order, starting with
  canonical values.
- **§ Outside the ledger canonical sentence.** The comparison runs in each mode a declaration
  applies in, and compares written text where both sides resolve to nothing.
- **§ Tests.** The conformance sentence now covers these proofs:
  - members under every setting;
  - every departure and every repainted difference decided;
  - canonical values in each mode;
  - witnesses by the token itself.

  The helper sentence now covers these proofs:
  - context settings;
  - matching elements;
  - ancestry mode;
  - string colors;
  - an unvaried context;
  - a canonical declaration apart in one mode.
- **Rows.** The rows listed earlier now read `retuned`. The `--vn-shadow-inset` § Reference
  map value is written in px.

## Gate table

`lret-instruments/r2/lret-gates-2.sh` ran the gates in order. Each log is
`lret-instruments/r2/lret-<gate>.log.txt` and holds the command first, the load, the output, and `exit=`.

| Gate | Command | Load | Result |
| --- | --- | --- | --- |
| check | `npm run check` | 2.09 | exit=0 |
| lint-check | `npm run lint:check` | 3.02 | exit=0 |
| format-check | `oxfmt --config .oxfmtrc.json --check` over the owned files and `src/styles/_tokens.scss` | 2.94 | exit=0 |
| setup | the setup command from the failing-first section | 3.61 | 297 passed, exit=0 |
| build-src | `npm run build:src` | 4.83 | exit=0 |
| conformance | `npm run test:conformance` | 4.62 | 34 passed, exit=0. The `.btn` `--bs-btn-font-size` row reads `retuned`, the `.accordion` `--bs-accordion-btn-padding-y` row reads `tokenized`, and the `theme` `--bs-primary` row reads `retuned`. |
| build-src-styles | `npm run build:src:styles` | 3.54 | exit=0 |
| tokens | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/tokens.test.ts` | 3.54 | 29 passed, exit=0 |
| guides | `npm run test:guides` | 3.21 | 26 passed, exit=0 |
| policy | `npm run test:policy` | 3.44 | 109 passed and 1 skipped, exit=0 |
| src-styles (observation) | `npm run test:src:styles` | 3.32 | 115 files and 1507 tests passed, exit=0 |

## Diff, status, and shared-file patches

- **Touched files:**
  - `tests/setupServer.ts`: the resolver, the context, the canonical scan, the witness scan, and
    the constants.
  - `tests/setupServer.test.ts`: the resolver cases, the export list, and the frozen pins.
  - `tests/conformance.test.ts`: the repaint `undecided` lists and the async witness scan.
  - `tests/setupStyles.ts` and `tests/setupStyles.test.ts`: `normalizeDeclaration` retired.
  - `guides/veneer.md`: Item 7 and the rows.
  - `src/styles/_tokens.scss`: the inset token in px.
- **Diffstat:**
  - Against `7952712`: 7 files changed, 1096 insertions(+), 336 deletions(-).
  - Against `73326c7`: 8 files changed, 2867 insertions(+), 948 deletions(-).
- **Records:**
  - `lret-instruments/r2/lret-2.diff` (`git diff 7952712`)
  - `lret-instruments/r2/lret-2-full.diff` (`git diff 73326c7`)
  - `lret-instruments/r2/lret-2-status.txt`
- **Shared-file patches:** none.
