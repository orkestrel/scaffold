# B-CROSS design proposal: subjective lane (`planner` on Opus 5.5)

Lane held: **subjective** (shape, naming, how the guide reads, design fit). Where a reading belongs to the objective lane, I list it as a risk for that lane to settle.

## Units

**Order.** ENGINE-ROWS runs first, alone. THEME and FADE run next, in parallel worktrees from the commit where B-UTILITIES and ENGINE-ROWS have landed. GROUPS runs after THEME and FADE land. VERIFY runs last.

- Every unit starts after B-UTILITIES has landed, as the roadmap's B-CROSS row requires. By then B-MODAL, the disclosure family's ACCORDION and NAVBAR, and UTIL-DISPLAY have landed, so no running unit owns any file named here.
- FADE depends on ruling N2.
- **Audit for every `opus` unit.** The objective lane is `analyst` on GPT-6 Astra when the bench round-trips at dispatch. Otherwise it is `reviewer` on Opus 5.5, told it holds the objective lane. The subjective lane is `reviewer` on Opus 5.5. `checker` on Sonnet runs as well.
- **Engine name.** For the `opus` role, write "Opus 5.5 per the B-CROSS row". Record the model the alias actually served, per ROADMAP § Routing.

### ENGINE-ROWS (`er`)
- **Scope:** the § Compatibility `engine` rows that the standing refusals and D41 touch. No inventory key.
- **Role and engine:** `builder` on Sonnet. The edit is fully specified prose. `checker` on Sonnet verifies it, and no lane audit runs, because the protocol refuses a fix round on a prose finding.
- **Owned:** `guides/veneer.md` § Compatibility: the `engine` rows and the paragraph after the table. The unit owns the guide because nothing else runs in this wave.
- **Shared, report-only:** `ROADMAP.md`.
- **Off-limits:**
  - `src/**`
  - `tests/**`, including `tests/setupPolicy.ts` and `tests/policy.test.ts`, which `scaffold repair` restores
  - `tests/fixtures/**`
  - every other guide section
- **Work:**
  - Strike the `util/index.js` initialization row, which covers `defineJQueryPlugin` after `onDOMContentLoaded`.
  - Delete `isRTL` from the `util/index.js` shared-utilities row.
  - Add a sentence after the table: Bootstrap registers each plugin after `DOMContentLoaded` and exports an `isRTL` helper, and Veneer carries no row for either. The reason is that Veneer refuses automatic initialization (the data API is `Delegate`) and ships no right-to-left support.
  - Add a second sentence: every `engine` row is J-ENGINE's obligation (D41). J-ENGINE reads completion from the transition itself and refuses the fixed fallback that the `transition` row records (the design ruling).
  - Change no cell. The table's rule that no cell states what Veneer's engine does stays true.
- **Acceptance, cheap first:**
  1. `grep -n "onDOMContentLoaded\|isRTL" guides/veneer.md` returns nothing.
  2. Both sentences are present.
  3. `npm run test:policy` exits 0.
  4. `npm run test:conformance` exits 0. The row reader still parses the table, and the Button obligation walk stays green.
- **Mutation:** none. The unit adds no proof, and the conformance walk over every row is the guard.
- **Risks:** a test that enumerates `engine` rows. My search of the tree for `onDOMContentLoaded`, `isRTL`, `TRANSITION_END`, and `Cross-cutting engine` found hits only in `guides/veneer.md`.

### THEME (`th`)
- **Key:** `theme`.
- **Role and engine:** `opus`, with the audit named under Order.
- **Owned:**
  - `tests/setupServer.ts`: the registry rule in `collectAdditions` and its `@remarks`, and the fallback-claim guard in `collectValueGaps`
  - `tests/setupServer.test.ts`: the proofs of both, and the export enumeration if an export is added
  - `app/browser/sections/ColorModeSection.ts`
  - `tests/app/browser/sections/ColorModeSection.test.ts`
- **Shared, report-only:**
  - `guides/veneer.md`: the `#### theme` table; the § Additions preamble sentence, the `theme` rows, and the rewritten Reason on the `reboot | :root` row; `### Outside the ledger`; the `### Bootstrap variables Veneer retains` sentence "no ledger row measures them"; the § Compatibility `theme | selector` row; `### Color modes`; § Showcase; § Tests
  - `tests/conformance.test.ts`: `theme` in `listed`, and the registry plant case
  - `app/browser/constants.ts`, `Showcase.ts`, and `index.ts`, with their proofs
  - `tests/setup.ts` and `tests/setup.test.ts` (the `CASCADE_KEYS` rows)
  - `ROADMAP.md`
- **Off-limits:**
  - `src/**`. THEME changes no cascade byte, because every `theme` record is already emitted. A unit that finds it needs a `src` edit stops and reports.
  - `tests/src/styles/**`
  - `tests/setupStyles.ts` (read only)
  - `tests/fixtures/**`
  - FADE's files, vendored files, `configs/`, and the package files
- **Acceptance, cheap first:**
  1. Typecheck and lint over the owned files.
  2. The scoped `setupServer.test.ts` cases for the registry rule and the fallback guard. Each is written red first, and the report records the command and the failing count.
  3. `npm run test:conformance`:
     - `listed` carries `theme`
     - `scanCompatibilityPresence` returns `undefined`
     - the departure and addition drift lists (`unrecorded` and `stale`) are all empty
     - the registry plant reports exactly the planted name
  4. The scoped Color modes section proof.
  5. `npm run test:policy`.
  6. The `CAPTURE=1` frames are the Orchestrator's observation, not a criterion.
- **Mutations:**
  - Registry rule: `collectAdditions` over `@layer theme { :root { --vn-palette-blue: #0d6efd; --vn-planted: 0 } }`, with `theme` shipped, returns only `theme | --vn-planted | — | property`. Deleting the registry check returns both names.
  - Conformance plant: append `@layer theme { :root { --vn-planted: 0 } }` to the cascade. `additions.unrecorded` must equal that one line, mirroring the `letter-spacing` plant.
  - Fallback guard: a fixture where the `btn` fallback and `theme` reach the same `--bs-btn-close-filter` site on a mode scope yields one row under `theme`. Reverting the guard throws `both claim`.
  - Presence: rewrite `[data-bs-theme='dark']` in the cascade text, and the scan names the missing `theme` selector.
  - Ledger: change one alias in `_tokens.scss` in a scratch copy, and `departures.unrecorded` names that row.
  - Section: drop the nested `data-bs-theme="light"` attribute, and the proof that reads the inner island's body background and the knob `background-image` reddens.
- **Risks:**
  - **Claim collision.** The close-filter site, which `btn` measures today through its fallback path, is claimed twice when `theme` ships. This is a hypothesis from reading `collectValueGaps`. The objective lane measures it.
  - **Table size.** `#### theme` is the largest table after `btn`. It is generated by `npm run build:src && npm run test:conformance`, and only the `theme` Additions Reasons take judgment.
  - **Dropped rows.** The light-scope `dropped` rows follow ruling R4.
  - **`.fade` attribution.** Settle whether `.fade` is recorded under `modal` too. If it is, it answers to the first recorder when neither key is one of its classes.

### FADE (`fd`), conditional on N2
- **Key:** `transition`. That covers `.fade`, its reduced-motion twin, and `.fade:not(.show)`. The dialog, backdrop, and drawer forms ship in the B-MODAL partials under D22, because their own classes name `modal` and `offcanvas`.
- **Role and engine:** `opus`, with the audit named under Order.
- **Owned:**
  - `src/styles/components/_fade.scss`
  - `tests/src/styles/components/fade.test.ts`
  - `app/browser/sections/FadeSection.ts`
  - `tests/app/browser/sections/FadeSection.test.ts`
- **Shared, report-only:**
  - `src/styles/index.scss`: `@use 'components/fade'` immediately before `components/collapse`, which is Bootstrap's `transitions` position
  - `tests/conformance.test.ts`: `transition` in `listed`, and the barrel-order expected list
  - `guides/veneer.md`: the § Files row, `### Fade classes`, the § Compatibility `transition | selector` row, § Showcase, § Tests
  - app constants, `Showcase.ts`, and `index.ts`, with their proofs
  - `tests/setup.ts` and `tests/setup.test.ts`
  - `ROADMAP.md`
- **Off-limits:**
  - `tests/setupServer.ts` and `tests/setupServer.test.ts` (THEME's)
  - every other partial
  - `tests/fixtures/**`. The exception is the Tailwind fixtures, and only if `fade` measures as a shared name. `grep -rn "caption-bottom caption-top" tests/` locates the list.
  - vendored files, `configs/`, and the package files
- **Partial:**
  - `.fade { @include transition(opacity 0.15s linear); }` and `.fade:not(.show) { opacity: 0; }` in `@layer components`.
  - Add a comment stating that the timing is the release's own, following the collapse and pagination precedent, and that E-IDENTITY rules motion.
- **Acceptance, cheap first:**
  1. Typecheck and lint.
  2. `fade.test.ts` reads:
     - `.fade.show` at opacity `1` and `.fade` at `0`
     - `transition-property` `opacity`, duration `0.15s`, timing `linear`
     - under `stageMedia({ motion: false })`, a duration of `0s`
  3. `npm run test:conformance`: presence passes, `listed` carries `transition`, and the ledger is empty for `transition`.
  4. The section proof.
  5. `npm run test:policy`.
- **Mutations:**
  - Delete the `:not(.show)` rule, and the opacity reading reddens.
  - Write a bare `transition:` in place of the mixin, and the reduced-motion reading reddens.
  - Write `ease` for `linear`, and both the timing reading and the ledger redden.
  - Rename `.fade:not(.show)` in the cascade text, and the presence scan names it.
- **Specimen:** a `Fade` region with a shown box (`fade show`) and a hidden box (`fade`). Each sits in a wrapper that reserves its box, so the hidden state photographs as a reserved empty frame (R1 reused).
- **Risks:**
  - If B-MODAL specimens carry `fade` without `show`, their frames change when this unit lands. Grep the B-MODAL specimens at launch.
  - `.fade` attribution between `transition` and `modal`.

### GROUPS (`gr`)
- **Scope:** the media conditions and the keyframes as groups, plus the duplicated importance fragment in § Styles (ruling N10).
- **Role and engine:** `opus`, with the audit named under Order.
- **Owned:**
  - `tests/setupServer.ts`: keyframes in `scanCompatibilityPresence`; the readers `readConditions` and `readKeyframes` with their row types; and the top-level `media` field in the inventory reader, if the reader lacks it
  - `tests/setupServer.test.ts`
  - `tests/conformance.test.ts`
  - `guides/veneer.md`: § Styles `### Media conditions` and `### Keyframes`, the duplicated fragment, the § Files role cell for `tests/setupServer.ts`, and § Tests. GROUPS is the only writer in this wave.
- **Shared, report-only:** `ROADMAP.md`.
- **Off-limits:** `src/**`, `tests/src/**`, `tests/fixtures/**`, vendored files, `configs/`, and the package files.
- **Media table:** columns `Condition | Bootstrap 5.3.8 | Written by`.
  - `(width >= {breakpoint})` against `(min-width: {breakpoint})`, written by `breakpoint-up` and `breakpoint-each`.
  - `(width < {breakpoint})` against `(max-width: {breakpoint} − 0.02px)`, written by `breakpoint-down`.
  - `(prefers-reduced-motion: reduce)`, written by `reduced-motion` and `transition`.
  - `(prefers-reduced-motion: no-preference)`, written by the reset's smooth scrolling.
  - `print`, written by the `d-print-*` utilities.
  - `(forced-colors: active)` against `—`, written by `forced-colors` and `forced-ring` (Veneer's addition).
  - `{breakpoint}` is a template over `sm` to `xxl` from the § Tokens breakpoint row, the same form as the `Tier` row.
  - A sentence states that `xs` writes no condition and that a color mode is the `data-bs-theme` attribute, never a `prefers-color-scheme` query.
- **Keyframes table:** columns `Name | Key | Reduced motion`, one row per recorded name:
  - `spinner-border` and `spinner-grow` under `spinner`, which slows to `1.5s`
  - `progress-bar-stripes` under `progress`, which `.progress-bar-animated` stops
  - `placeholder-glow` and `placeholder-wave` under `placeholder`, which take no rule, as the release writes it
- **Acceptance, cheap first:**
  1. Typecheck and lint.
  2. The `setupServer.test.ts` cases, each written red first.
  3. `npm run test:conformance`, with two cases:
     - The media case: the emitted conditions, normalized and split on ` and `, equal the table expanded over the ramp. Every Bootstrap cell normalizes to its Condition cell and belongs to the inventory's top-level `media` list. Every `—` cell equals a Condition cell in § Additions.
     - The keyframes case: the table names equal `collectKeyframeNames(cascade)` and equal the union of the shipped keys' inventory `keyframes`, and each Key cell names the recording key.
  4. `npm run test:policy`.
- **Mutations:**
  - Plant `@media (min-width: 600px) { .x { color: red } }`, and the media case names `(width >= 600px)`.
  - Drop the `print` row from a fixture table, and the case names `print`.
  - Make `breakpoint-down` write `(width <= N)` in a scratch copy, and the normalization check reddens.
  - Delete `@keyframes placeholder-wave` from the cascade text. The presence scan names it while all four ledger gates stay green, which is the control showing the gap this rule closes.
  - Set the Key cell of `placeholder-glow` to `spinner`, and the parity check reddens.
- **Risks:**
  - How the normalizer handles combined `max-width and reduce` conditions.
  - An `@supports` condition in either sheet.
  - The top-level `media` list carrying the condition of a deferred or excluded rule.

### VERIFY
`verifier` on Sonnet runs:
- the landing chain per landing
- `npm run test:service`
- one capture-portfolio verdict round over the Color modes and Fade frames

## Family rulings

These disclosure-family rulings carry over unchanged: R1 (states at rest), R16 (breakpoints through `visitBreakpoint`), R17 (guide wording: a section states no script behaviour), R18 (names), and R19 (proof matrix).

1. **The ledger follows the record.** A selector answers to the key the inventory records it under, by the D22 ladder, whatever partial writes it.
   - The dark rules in `_form-select.scss`, `_form-check.scss`, `_navbar.scss`, and `_accordion.scss` are measured under `#### theme`, and each partial keeps its code.
   - Rejected option: change the ladder to move these rows to the component tables. The reader would then contradict the record.
2. **What shipped means for `theme`:**
   - one `theme | selector | … | — | shipped` row, and no variable row, because the key records no component custom property
   - every recorded `theme` selector present in the cascade
   - every recorded declaration either matched or recorded in `#### theme`
   - every theme-layer name that neither the inventory nor the registry carries recorded in § Additions
   - the Obligation cell names the partials that write each record group
3. **The registry's record is § Tokens.** Every `TOKEN_NAMES` name is recorded by § Reference map, the Button states table, and the triplet law, and `tokens.test.ts` already gates their equality. `collectAdditions` treats a registry name as recorded, and § Additions holds only names that neither the inventory nor the registry carries.
   - Cost: one reader rule and its plant.
   - Rejected option: one Additions row per registry name, which means the same Reason repeated in every row.
4. **Mode scopes stay minimal.** The light scope re-declares only mode-dependent names.
   - `#### theme` records the mode-independent names on `[data-bs-theme=light]` as `dropped`.
   - The table's lead sentence states that a light island inherits them from `:root`, and the nested-island case in `theme.test.ts` reads that.
   - Rejected option: the release's full light closure. It changes the cascade to silence ledger rows.
5. **Smooth scrolling stays in the reset layer.** The release authors it in `_reboot.scss`.
   - The `reboot | :root` Additions row stays, and its Reason becomes: "The reset layer answers to `reboot`, whose vocabulary records no `:root` rule; the release records the same declaration under the `theme` key, whose comparison matches it."
   - Rejected option: move the rule into `@layer theme`. That puts document behaviour in the token layer.
6. **`.fade` ships as recorded.** It uses the release's timing through the `transition` mixin, and E-IDENTITY rules motion.
   - The partial is named for the class it styles: `_fade.scss`, following the `_close.scss` precedent.
   - The guide section is `### Fade classes`, the region `Fade`, and the constants `TRANSITION_COPY` and `TRANSITION_SPECIMENS`. Under R18, constants take the key's name, and the region takes the name a reader sees.
7. **Color modes region.**
   - A light surface holds a dark island, which holds a nested light island.
   - Each island carries body text, a button, a select, a switch, a navbar toggler, and an accordion button, so every dark rule the key records renders at rest. The switch shows the D28 limit.
   - Names: `ColorModeSection`, region `Color modes` (Bootstrap's page title), constants `THEME_COPY` and `THEME_SPECIMENS`.
   - `### Color modes` in the guide states the `:root` light closure, that any element opens an island, and how nesting works. It points at § Reference map and restates no value.
8. **Media conditions form a guide table, not a key.** No `media` row goes into § Compatibility: `media` is no inventory key, and the presence scan would refuse it. The table is the one statement of the vocabulary. Print's rules stay UTIL-DISPLAY's, the per-rule conditions stay the ledger's, and one case pins the group.
9. **Keyframes are a table and a presence rule.** Each keyframe a shipped key records is defined under its own name.
   - Reduced-motion handling follows the release per name, and the ledger's per-rule conditions pin it: dropping `.progress-bar-animated`'s reduce block adds a `dropped` row.
   - Placeholder takes no reduced-motion rule. E-IDENTITY can add one as an addition.
10. **Refusals are sentences, not rows.** § Compatibility records what Veneer accepts. No `refused` status member is added.
11. **D5 residue is retained.**
    - `digests["bootstrap.rtl.css"]` stays in the pinned fixture as upstream data. Veneer asserts only the `bootstrap.css` digest, and F5b removed Veneer's RTL pin.
    - The `dir="rtl"` mounts in `grid.test.ts` and `table.test.ts` are D11 physical-property proofs, not right-to-left support.
    - The family record states both, and neither needs a carrier.
12. **One term per concept.** The guide already uses "island" for a `data-bs-theme` subtree, and "scope" names the selector.

## Rulings needed

- **N1: What records a registry name (R3).**
  - Option: rows in § Additions, at the cost of a Reason repeated in every row.
  - Option: § Tokens as the record. This reads exit item 2 with § Reference map as one of its additions tables. The roadmap's design ruling says "an additions table", not the § Additions heading.
  - Recommendation: § Tokens. If you read item 2 strictly, take the rows instead.
- **N2: Who carries `.fade`.**
  - Option: B-CROSS carries it, as this brief frames it.
  - Option: B-MODAL carries it. `.fade`'s first real consumer is the overlays' markup, and AGENTS.md's minimal-API law adds a capability with its first consumer.
  - Recommendation: B-MODAL takes FADE whole, as specified here. If the B-MODAL verdict leaves `.fade` to B-CROSS, run FADE here in wave 1. Give it exactly one carrier, named in both verdicts.
- **N3: Dropped rows on the light scope (R4).**
  - Option: record the rows, at the cost of their volume.
  - Option: reshape the cascade to the release's light closure.
  - Recommendation: record.
- **N4: Where smooth scrolling lives (R5).** Recommendation: keep it in the reset layer and rewrite the Reason.
- **N5: Fade timing (R6).**
  - Option: literal release timing.
  - Option: `var(--vn-motion-feedback)`, whose 150ms resolves to the release's 0.15s. That adds a `tokenized` row and lets the motion factor reach `.fade`.
  - Recommendation: literal, because E-IDENTITY owns motion.
- **N6: How refusals are recorded (R10).**
  - Option: a `refused` status member, at the cost of a type change and a reader change.
  - Option: a sentence after the table.
  - Recommendation: the sentence.
- **N7: The D5 digest (R11).** Recommendation: retain it, with the reason in the family record.
- **N8: Group tables and proofs (R8, R9).**
  - Option: sentences only. The documentation rule says an ordered claim with no gate is no gate.
  - Option: tables with parity cases, at the cost of two readers and two cases.
  - Recommendation: tables.
- **N9: Order.** Recommendation: after B-UTILITIES, as the roadmap row says, with FADE after B-MODAL. No deferral rows are needed.
- **N10: A finding outside the brief.** `guides/veneer.md` § Styles repeats a broken fragment of the importance paragraph, starting around line 160 ("layer, the calendar-picker indicator rule … color swatch rules …"). Choosing which version is true takes judgment. Recommendation: carrier GROUPS, which already edits § Styles.
- **N11: Audit engine while the bench is dark.** With the Codex bench dark, both audit lanes run on the writer's engine, which breaks the Routing rule "objective lane to an engine that did not write the unit".
  - Option: record the deviation per round.
  - Option: hold the audits until Astra round-trips, which the bench states as 2026-09-26 17:53.
  - Recommendation: hold THEME's audit, which carries the ledger reader change, and record the deviation for the others.

## Files the result makes false

**ENGINE-ROWS:** `guides/veneer.md` § Compatibility, in the initialization row, the utilities row, and the paragraph after the table.

**THEME:**
- `tests/conformance.test.ts`:
  - the `listed` literal
  - the four ledger gates, until `#### theme` and the `theme` Additions rows are written
- `tests/setupServer.ts`: the `collectAdditions` `@remarks` sentence "the theme layer's own scopes are the release's `theme` vocabulary, which this release does not ship".
- `tests/setupServer.test.ts`: the export enumeration, if the registry rule adds an export. Its `attributeSelector` case uses `LEDGER_SHIPPED`, which is `btn`, `reboot`, and `table`, so it stays true. Re-derive by running it.
- `guides/veneer.md`:
  - the § Additions `reboot | :root` Reason ("… this package does not ship")
  - the § Additions preamble
  - `### Outside the ledger`: the canonical-token paragraph and the carousel sentence
  - `### Bootstrap variables Veneer retains` ("no ledger row measures them")
  - § Compatibility, which has no `theme` row
  - § Showcase and § Tests
- The app enumerations: `Showcase.test.ts`, `index.test.ts`, and the `CASCADE_KEYS` in `setup.test.ts`.

**FADE:**
- `tests/conformance.test.ts`: `listed` and the barrel-order list.
- `guides/veneer.md`: § Files, § Compatibility, § Showcase, and § Tests.
- The app enumerations and `CASCADE_KEYS`.
- The Tailwind shared-name list and the fixtures, only if `fade` measures as shared.
- Any B-MODAL frame whose specimen carries `fade` without `show`.

**GROUPS:**
- `tests/setupServer.ts`: the `scanCompatibilityPresence` `@remarks`, and the inventory type and reader if top-level `media` is absent.
- `tests/setupServer.test.ts`: the export enumeration and the inventory-reader case.
- `guides/veneer.md`:
  - the § Files role cell for `tests/setupServer.ts`
  - the duplicated § Styles fragment

## Exit criterion

B-CROSS ends when each of these conditions holds:

1. `theme` is in `listed` with a shipped selector row. The presence scan passes. `#### theme` and the `theme` Additions rows leave every ledger gate green. The registry plant reports only the planted name, and every theme-layer rule answers to a key.
2. `transition` is shipped by the unit ruled under N2. `.fade` is proved at rest in both states and under reduced motion. The dialog, backdrop, and drawer forms are measured under their own keys.
3. The media table equals the cascade's conditions and the inventory's top-level `media` list, together with the conditions § Additions records. Each named plant reddens the case.
4. Every keyframe a shipped key records is defined, and the keyframes table equals the cascade and the record. The deletion plant reddens only the presence scan.
5. The initialization and `isRTL` rows are gone. The refusal sentence and the J-ENGINE ownership sentence stand, and the transition fallback's refusal is stated.
6. The D5 digest and the `dir="rtl"` proofs are retained, with reasons in the family record.
7. The guide carries `### Color modes`, `### Fade classes`, `### Media conditions`, `### Keyframes`, and every rewritten sentence named in Files the result makes false, and each one is true of what shipped. The duplicated § Styles fragment is resolved.
8. The Color modes and Fade regions render every state at rest. Their frames are written and ruled in one capture verdict round.
9. The roadmap's B-CROSS row and family bullet record the closure. The `verifier` chain and `npm run test:service` are green.
