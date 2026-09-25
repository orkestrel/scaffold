**Lane held:** subjective. I ran as `planner` on Opus 5.5 in a clean context, without seeing the objective lane. I read the code and ran nothing.

## Design

**Ruling 1: decide a retune by resolving the value, not by inferring it.** A retune is a fact about the value at one site, not about where the token came from.
- A rule keyed on the Source cell gets it wrong. `--vn-space-8` has Source `elements` and still resolves to Bootstrap's `1rem` (`guides/veneer.md` § Space, border, radius, and elevation, around line 7122).
- Textual substitution gets it wrong too. It cannot equate `color-mix(in srgb, var(--vn-palette-blue) 25%, transparent)` with `rgba(13, 110, 253, 0.25)` (the `accordion` table, around line 7425).
- So Chromium decides, the same way `tests/src/styles/tokens.test.ts` already resolves the § Reference map.

The design for Ruling 1:
- The `Departure` union (`tests/setupServer.ts`, around line 94) becomes a single "why the text differs" axis: `retuned | tokenized | aliased | fallback | restated | dropped`.
  - `retuned` means the emitted value resolves, in the row's mode at the default factors, to something other than the release value. It outranks every member except `dropped`.
  - Every other member then means "same resolved value, different text". The guide's sentence that `tokenized` "routes the release value through a Veneer token" (around line 7413) becomes true.
  - `declared` is renamed `restated`. After the split, the old word reads as the retune it no longer covers.
- Rows stay textual. A row exists because the text differs, so rows that differ only in notation stay recorded (§ Departures preamble, around line 7405).
- The pipeline in `tests/setupServer.ts` has three steps:
  - `collectValuePairs(blocks, inventory, shipped)` is the textual walk, pulled out of `collectValueGaps` (around line 2483).
  - `readRetunedSites(cascade, pairs): Promise<ReadonlySet<string>>` loads the expanded compile into the Chromium that `recordButtonOracle` already launches from Node (around line 3331). It sets each pair on its own property; a custom property goes through registered typed probes. It compares colors as painted, and throws naming every pair it cannot decide.
  - `classifyDeparture(recorded, emitted, retuned: boolean)` takes that answer. `collectLedger` takes the retuned set as an input and stays pure.
  - The `describe('cascade ledger')` setup moves to an awaited setup step.

**Ruling 2: source provenance follows from Ruling 1.**
- The `theme` table already records every `--bs-*` alias the theme scopes declare, as a departure row (§ Outside the ledger, around line 10213). Every alias-less token replaces a release literal at some consumer row.
- A new pure scan, `scanProvenance(departures, references)`, reads the Source cells through `collectReferenceRows` (`tests/setupStyles.ts`, around line 751). `tests/conformance.test.ts` already imports that module in Node. The scan returns:
  - each `retuned` row where every `--vn-*` token it reads is `bootstrap`-sourced;
  - each `bootstrap` token that no departure row reads.
- The gate expects the scan to return nothing.
- `RETAINED_COLOR_ALIASES` and `RETAINED_LENGTH_ALIASES` (`tests/setupStyles.ts`, around lines 4135–4198) become a second record of the same fact. They retire, together with their `tokens.test.ts` cases (around lines 202–233) and their pins in `setupStyles.test.ts`.

**Ruling 3: § Additions records a value.**
- § Additions gains a `Veneer` column. That is the name § Departures already uses for the emitted value, so one concept keeps one term.
- `Addition` gains `emitted: string | undefined`, matching `DepartureRow`.
- Each row holds a single declaration:
  - a `selector` row names the rule and carries `—` in `Veneer`;
  - each declaration under it follows as its own `declaration` row with its value;
  - a custom property the vocabulary lacks takes a `property` row instead, also with its value.
- The value joins `describeAddition` and the de-duplication key, and uses `describeValueCell` and `readValueCell`.

**Ruling 4: refuse an unattributed rule.**
- `collectAdditions` (around lines 2619–2622) stops skipping two kinds of rule: a rule `attributeSelector` answers `undefined` for, and a rule whose key has no vocabulary.
- It collects every such site and throws once, naming them all. This matches how it already refuses an unrecorded animation.
- No guide table records such a rule.

**Ruling 5: derive the shipped key list from the inventory.**
- Delete the hand-written list (`tests/conformance.test.ts`, around lines 118–254).
- Assert that `scanLedgerDrift(Object.keys(inventory.components).sort(), shipped, (key) => key)` returns empty `unrecorded` and `stale`. That is the existing scan; no new helper is needed.
- Deferring a whole key has no consumer yet. The unit that defers the first key adds that branch.

## Alternatives

- **A separate resolution column beside `Departure`.** It keeps the mechanism on every row. The cost is a new cell on every row of every departure table, and one reason split across two cells. The member already answers "why", so the union wins.
- **A Source-keyed `retuned` member (the identity lens's proposal).** It needs no browser. It is false for `--vn-space-8`, cannot classify `derived` tokens such as `--vn-link-base`, and proves nothing about a `bootstrap` label. Resolution wins.

## Constraints

## Refusals

## Measurements

## Units

**LEDGER-ADDITIONS runs first.**
- **Role and engine:** `opus` on Opus 5.5, native.
- **Owns:**
  - `tests/setupServer.ts`: `Addition`, `collectAdditions`, `describeAddition`, and `readAdditions`.
  - `tests/setupServer.test.ts`: the addition cases and their fixture markup.
  - `tests/conformance.test.ts`: the shipped-components case and the `describe('cascade ledger')` block.
  - `guides/veneer.md`: § Additions and the § Tests entries for the changed cases.
- **Off-limits:** `tests/setupPolicy.ts` and `tests/policy.test.ts` (both restored by `scaffold repair`), `src/core/**`, `tests/setup.ts`, and `tests/setupBrowser.ts`.
- **Acceptance, cheapest first:**
  1. A scoped typecheck and lint over the owned files pass.
  2. The addition cases in `setupServer.test.ts` pass.
  3. Plant `97px solid currentColor` on `blockquote`'s `border-left`. The drift names the row as unrecorded and as stale.
  4. Plant `@layer components { .audit-unrecorded { color: red } }`. `collectLedger` throws naming `.audit-unrecorded`; the unplanted cascade does not throw.
  5. Plant an inventory with an extra `audit-key` key. `unrecorded` equals `['audit-key']`; the real inventory gives empty lists.
  6. The ledger cases pass against the regenerated rows, and `test:guides` and `test:policy` pass.
- **Rows made false:** every § Additions row gains a cell. Take the added rows from the `additions.unrecorded` lines that `test:conformance` prints after the change.

**LEDGER-RETUNE runs after LEDGER-ADDITIONS lands.**
- **Role and engine:** `opus` on Opus 5.5, native. It stays native because Playwright launched from a vitest worker is a grandchild process, which a `codex exec` sandbox denies (`.agents/orchestration.md` § Bench laws, "A bench sandbox spawns a child").
- **Owns:**
  - `tests/setupServer.ts`: `Departure`, `classifyDeparture`, `collectValueGaps` and `collectValuePairs`, `readRetunedSites`, `collectLedger`, and `scanProvenance`.
  - `tests/setupServer.test.ts`.
  - `tests/conformance.test.ts`.
  - `tests/setupStyles.ts` (the retained-alias lists) and `tests/setupStyles.test.ts`.
  - `tests/src/styles/tokens.test.ts`: the retained-alias cases.
  - `guides/veneer.md`: the § Tokens `Source` legend, the § Departures preamble and rows, § Outside the ledger, and § Tests.
- **Acceptance:**
  1. The unit cases cover every member, including `classifyDeparture('1rem', 'var(--vn-size-2)', true)` returning `retuned`.
  2. Against the unplanted cascade:
     - `.accordion` `--bs-accordion-btn-padding-y` reads `tokenized`;
     - `.btn` `--bs-btn-font-size` reads `retuned`;
     - the `theme` row for `--bs-primary` reads `retuned`.
  3. Plant a doubled `--vn-radius-base`. Its consumer rows flip to `retuned` and the drift is not empty.
  4. Plant `--vn-gray-600: #6c757e`. `scanProvenance` names that token. As a control, plant a change to `--vn-size-2`: it gives retune drift and no provenance line.
  5. Plant a pair the resolver cannot decide. The resolver throws naming it.
  6. The scoped gates pass. The unit reports how long the resolver took as an observation, not as a criterion.
- **Rows made false:**
  - every departure row whose member changes, and every `declared` row. Take these from the add and strike lines the gate prints.
  - the `setupServer.test.ts` expectations around lines 1940, 2013, 2070, 2124, 2154, 2354–2379, and 2678–2685.

**Audit for each unit:** `analyst` on GPT-6 Astra (it wrote neither unit) and `reviewer` on Opus 5.5. Add `checker` for guide-row parity.

## Tensions

- **Word clash:** `retuned` collides with the guide's existing "retunes by mode" sense. The alternative is `repainted`, which is too color-bound.
- **Separable rename:** `declared` to `restated` can be dropped to limit churn, at the cost of a misleading word.
- **Throw or list:** throwing for unattributed rules matches the keyframes refusal. A failure then hides all ledger cases behind one error. A named `unattributed` list with its own case would print more clearly.
- **Retiring the retained-alias lists:** exit criterion 12 favors it. The objective lane may want them kept as a second check.
- **Readings the design needs that the dispatch did not supply:**
  - the unattributed set over the current expanded compile;
  - the `bootstrap` tokens that no departure row reads;
  - the resolver's cost inside the conformance project;
  - whether every custom-property pair can be decided by the typed probes.

## Risks

- **The ledger gate gains a browser dependency.** It relies on the host's Chromium 141 (the Playwright standing condition in `ROADMAP.md`). Evidence to settle it: the same project already launches Chromium for the Button oracle.
- **Some pairs may not resolve.** Shadows, font stacks, and transitions might not resolve on a probe. The resolver's throw surfaces them, and the unit must add probes until none is refused.
- **Mode is inferred from the selector.** Only dark-scope rows resolve in a dark island. A plant on a dark `theme` row settles whether this holds.
- **The guide will churn in `guides/veneer.md`.** § Tokens belongs to the baseline session. Run `test:guides` and `test:policy` on each merge result.
- **§ Additions will grow.** Every declaration under an added selector gets its own row. That keeps failures precise, and the tables get long.