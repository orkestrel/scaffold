# B-CROSS design proposal: objective lane (`reviewer` on Opus 5.5, substituted for `analyst` on Astra: Codex bench dark on quota)

I held the objective lane as `reviewer` on Opus 5.5. I stand in for `analyst` on GPT-6 Astra because the Codex bench is dark on quota. I read the tree at `/home/user/veneer`, the terrain record, and both sibling verdicts, and I edited nothing.

Where the brief and the tree disagree, I ruled on the tree:
- **Close and carousel triples.** The brief says the carousel triples are B-MODAL's. The pinned inventory records the close-filter triple and the carousel triple (on `:root`, `[data-bs-theme=light]`, and `[data-bs-theme=dark]`) under `theme` alone. Their ledger rows are therefore theme rows. The carousel key records only `.carousel-dark`.
- **Dark component rules.** The brief assigns the four dark component rules to their component partials. Their source is theirs, but `theme` is their only recorder. `attributeSelector` returns `undefined` for them today, so those rules are outside the ledger until `theme` ships.

## Units

Every unit uses `opus` on Opus 5, because the alias serves `claude-opus-5` (ROADMAP § Routing), unless the unit says otherwise. Each unit is audited by three lanes:
- the objective lane, on `reviewer` on Opus 5.5 while the bench is dark (standing condition);
- the subjective lane, on `reviewer` on Opus 5.5;
- `checker` on Sonnet, where the criteria are mechanical.

B-CROSS starts where ROADMAP § Phases and units places it, after B-UTILITIES. At that point no B-COLLAPSE, B-MODAL, or B-UTILITIES writer is live, so the owned sets are disjoint in time. None of these units edits `_mixins.scss`, `_tokens.scss`, or `_theme.scss`, which UTIL-SPACER and NAVBAR own.

| Unit | Keys and groups | Wave |
| --- | --- | --- |
| CROSS-LEDGER (`cl`) | the keyframes group gates; compound-condition normalization only if R4 lands it here | 1, from the B-UTILITIES close commit |
| CROSS-FADE (`cf`) | `transition` | 1, parallel worktree |
| CROSS-THEME (`ct`) | `theme`; the media and keyframes group statements in the guide; the breakpoint token group under exit item 6 | 2, after CROSS-LEDGER and CROSS-FADE land |
| D5-RESIDUE (`dr`) | the inventory's leftover RTL digest (only if R6 says remove) | after CROSS-LEDGER; `builder` on Sonnet |
| CROSS-VERIFY | the assembled family | last; `verifier` on Sonnet runs the landing chain, then one capture-portfolio verdict round |

**CROSS-LEDGER**
- **Owns** `tests/setupServer.ts` (`scanCompatibilityPresence`, the keyframes loop in `collectAdditions` and its TSDoc, and `normalizeMediaCondition` if R4 lands here) and `tests/setupServer.test.ts`.
- **Acceptance 1, keyframe presence.** For a key with a shipped selector row, `scanCompatibilityPresence` must require every name in that key's `keyframes` vocabulary to be defined by a `@keyframes` rule, and must return `Shipped component <key> is missing keyframes <name>` when one is absent.
  - Proof: a scratch inventory records `keyframes: ['btn-pulse']` for a shipped `btn`. With `@keyframes btn-pulse {}` in the fixture the scan returns `undefined`; without it the scan returns the message.
  - Mutation: delete the loop. The missing-keyframes assertion then reads `undefined` and fails.
- **Acceptance 2, unattributed keyframe.** `collectAdditions` must throw, naming the keyframe, when `matchShippedKey` gives it no shipped key. Today the loop's `continue` drops such a name silently, which leaves a hole in exit item 2.
  - Proof: `collectLedger(LEDGER_CASCADE + '@keyframes orphan-spin { to { opacity: 1 } }', LEDGER_INVENTORY, LEDGER_SHIPPED)` throws with `orphan-spin` in the message.
  - Control: `LEDGER_CASCADE` alone still yields `btn | btn-pulse | — | keyframes`.
  - Mutation: restore the `continue`. The throw assertion fails.
- **Acceptance 3, compound conditions (only under R4's alternative).** `normalizeMediaCondition` must normalize each feature of a compound condition. Proof: `normalizeMediaCondition('@media (max-width: 575.98px) and (prefers-reduced-motion: reduce)')` equals `normalizeMediaCondition('@media (width < 576px) and (prefers-reduced-motion: reduce)')`, and the single-feature cases keep their current results. Mutation: remove the per-feature branch; the equality fails.
- **Acceptance 4.** A scoped run of the conformance presence and ledger cases stays green with the progress, spinner, and placeholder keyframes read.

**CROSS-FADE**
- **Owns:**
  - the partial that carries `.fade` (R3), plus its `@use` line in `src/styles/index.scss` if R3 creates a partial;
  - the mirrored proof under `tests/src/styles/components/`;
  - a fade case table in `tests/setupStyles.ts`, if the proof needs one;
  - the showcase specimen files under `app/browser/`, and the specimen rows in `CASCADE_KEYS` in `tests/setup.ts`.
- **Report-only patches:**
  - `guides/veneer.md`: the section, the § Files row, the `transition` row in § Compatibility, the `#### transition` table, and the § Tests link;
  - `tests/conformance.test.ts`: `transition` added to `listed`, plus the `transitions` mapping in the order case if R3 creates a partial;
  - the Tailwind exclusion line and its copies, only if the measurement shows `fade` is a shared name.
- **Precondition.** B-MODAL has shipped or deferred `.modal.fade .modal-dialog`, `.modal-backdrop.fade`, and `.offcanvas-backdrop.fade`. A B-MODAL deferral row already satisfies `transition`'s presence check, because the scan applies a shared name's deferral to every key that records it.
- **Acceptance a, the `.fade` rules.** `.fade` writes its transition through the `transition` mixin as `opacity var(--vn-motion-feedback) linear`, and `.fade:not(.show)` writes `opacity: 0`. The browser proof must read:
  - opacity `0` on `.fade` and `1` on `.fade.show`;
  - transition property `opacity`, duration `150ms`, and timing `linear`;
  - duration `0s` under `stageMedia({ motion: false })`;
  - `300ms` under a wrapper that sets `--vn-factor-motion: 2`. This is the exit-item-6 reading for the motion group.
- **Mutations for acceptance a:**
  - Declare the `transition` property directly instead of through the mixin. The reduced-motion reading fails, and the ledger row `transition | .fade | transition | @media (prefers-reduced-motion: reduce) | none | — | dropped` is unrecorded.
  - Write `0.15s` literally. The factor reading fails.
  - Delete the `:not(.show)` rule. The opacity reading fails, and so does the presence check.
- **Acceptance b, presence case.** Add a conformance case that replaces `.fade:not(.show)` in the built cascade; the scan must name it. The unchanged control is the main presence case, which reads `undefined`.
- **Acceptance c, ledger.** `#### transition` records the `.fade` departure exactly as the gate measures it. The modal and offcanvas fade combinators stay under `modal` and `offcanvas`: the class tiers in `attributeSelector` send them there, and `matchesRecording` skips `transition`'s duplicate pass over them.
- **Acceptance d, captures.** Register resting rows for a `.fade` specimen and a `.fade.show` specimen, and write their frames. The blank `.fade` frame is the recorded measurement, as with the existing blank specimens.
- **Acceptance e, Tailwind.** The report records the Tailwind measurement for `fade`.

**CROSS-THEME**
- **Owns:**
  - in `guides/veneer.md`: the `theme` row in § Compatibility, the `#### theme` table, the theme rows in § Additions, the Reason cell of the reboot `:root` addition, the canonical-token paragraph in § Outside the ledger, and the media and keyframes group statements;
  - in `tests/conformance.test.ts`: `theme` added to `listed`, plus a presence case;
  - the theme-layer sentence in the remark of `collectAdditions` in `tests/setupServer.ts`, after CROSS-LEDGER lands;
  - the breakpoint case (R5) in `tests/src/styles/tokens.test.ts`.
- **Preconditions:** NAVBAR has retired `$assets`, ACCORDION and NAVBAR ship their dark rules, and B-UTILITIES has landed. This must be the last cascade change before the theme rows are generated.
- **Acceptance a, the shipped row.** Add `theme | selector | … | — | shipped` and no variable row. The key's official `properties` are empty, so `collectShippedComponents` ships it on the selector row alone. Mutation: set the status to `accepted`; the `listed` equality fails.
- **Acceptance b, presence.** Add a conformance case that replaces the built `[data-bs-theme=dark] .form-switch .form-check-input:not(:checked):not(:focus)` selector; the scan must name it.
- **Acceptance c, ledger.** Departures and additions show nothing unrecorded and nothing stale. Take the rows from the `collectLedger` output. Mutations:
  - **Dark component rules.** Plant a different `switch-knob` SVG in `tokens.$dark`. The row `theme | [data-bs-theme=dark] .form-switch … | --bs-form-switch-bg | … | declared` is unrecorded. Run the same plant on the tree before this unit as a control: its ledger gates stay green, which proves these rules entered the ledger with this unit.
  - **Scroll rule.** Delete the scroll rule from `_reset.scss`. `theme | :root | scroll-behavior | @media (prefers-reduced-motion: no-preference) | smooth | — | dropped` is unrecorded, and the reboot `:root` addition goes stale.
  - **Breakpoint alias.** Write `--bs-breakpoint-sm: 576px` literally. The `tokenized` row goes stale.
- **Acceptance d.** The breakpoint case per R5.
- **Acceptance e.** Every sentence listed under "Files the result makes false" reads true.

**D5-RESIDUE (if R6 removes the digest)**
- **Owns** the `bootstrap.rtl.css` entry in the `digests` map of `tests/fixtures/oracle/inventory.json`, and one assertion in the case "pins the copied inventory release and digests and reads its component vocabulary" in `tests/setupServer.test.ts`.
- **Acceptance:** `expect(Object.keys(inventory.digests)).toEqual(['bootstrap.css'])`. Mutation: re-add the entry; the assertion fails.

## Family rulings

1. **`theme` can only close as `shipped`.** Exit item 3 lists deferred and excluded as alternatives, but `scanCompatibilityPresence` refuses a Deferred or Excluded name that is present in the cascade. Every theme selector is present, so no deferral or exclusion row can hold `theme`. Shipping it puts every theme record into `collectValueGaps` and `collectAdditions`.
2. **The ledger attributes a rule by the key that records it, never by the partial that writes it.**
   - Under `theme`: `:root`, both mode selectors, the four dark component rules, and the close and carousel triples, because `theme` is their only recorder.
   - Under `transition`: `.fade` and `.fade:not(.show)`.
   - Under `modal` and `offcanvas`: the modal and offcanvas fade combinators.
   - Under `reboot`: the reset `:root` scroll rule, through `LAYER_COMPONENTS.reset`. That rule is also value-compared under `theme` and matches there.
3. **How the theme additions are categorized.** The theme vocabulary's `properties` field is empty. So every custom property on a theme-attributed block that its matched records do not declare is a `property` addition. That covers the `--vn-*` registry and each `--bs-*` name re-declared per mode. `[data-bs-theme=light] { color-scheme }` is a `declaration` addition, because the release records `color-scheme` only on its dark record. Most `--bs-*` values are written as `var(--vn-*)`, so a later token value change moves no theme row; only a rename does.
4. **No `media` or `keyframes` row, in § Compatibility or § Deferred selectors.** Neither is an inventory key. A shipped `media` row would fail with "Shipped component media has no official inventory".
5. **Each media condition closes through the keys that record it:**
   - the breakpoint ramp, through every responsive key, and through `theme` for `--bs-breakpoint-*`;
   - `reduce`, through each key's twin rule;
   - `no-preference`, through `theme` via the reset rule;
   - the compound `max-width`-and-`reduce` conditions, through `offcanvas`;
   - `print`, through `d`, which UTIL-DISPLAY owns.

   Refuse a group proof over the inventory's top-level `media` list. The condition-keyed match in `collectValueGaps` already fails on a dropped or changed condition.
6. **Keyframes.** The five names are pinned per key by the `findKeyframes` reads in the progress, spinner, and placeholder proofs, and by the ledger's keyframes loop. What CROSS-LEDGER adds is the missing presence gate and the refusal of a silent skip. Reduced-motion handling on animated rules is already value-gated per key, so refuse a group reduced-motion proof.
7. **The engine rows are J-ENGINE's (D41).** The accepted initialization row records Bootstrap's jQuery registration through `onDOMContentLoaded`, and the paragraph after the table already excludes plugin registration. No row claims that Veneer initializes itself automatically, so the `./browser/auto` refusal needs no edit.
8. **Order.** Keep B-CROSS after B-UTILITIES, as ROADMAP § Phases and units states. Refuse the option to run before B-MODAL with deferral rows: it contradicts the plan of record and leaves deferral rows for B-MODAL to retire.

## Rulings needed

- **R1: theme ledger shape.**
  - **Option A:** ship `theme` under the current gates, with a large `#### theme` table and theme addition rows. The rows are mechanical and stay stable afterwards.
  - **Option B:** change the reader so that § Reference map rows count as the theme key's addition record and alias record. This costs a reader mechanism and a reading of exit item 2's "addition row" that its text does not state.
  - **Recommendation: A.** It meets exit item 2 as written.
- **R2: where the scroll rule sits.**
  - **Keep** it in `_reset.scss` and rewrite the reboot `:root` Reason cell. This matches the release's `_reboot.scss` source and leaves the proof mirrored in `reset.test.ts`.
  - **Move** it into the theme layer. The reboot addition then goes stale and is deleted, and the reset case moves to `theme.test.ts`.
  - **Recommendation: keep.**
- **R3: which partial carries `.fade`.** The subjective lane settles the name; these are the objective costs:
  - Put it in the partial that the release's `transitions` stem maps to (COLLAPSE's `_collapse.scss`). No mapping changes, but that file's name then describes only one of the keys it carries.
  - Give it a partial of its own. The order case must then map one release stem to two partials, which has no precedent; `FORM_PARTIALS` maps two release stems to one partial.
  - Rename `_collapse.scss` to `_transitions.scss`. This renames `collapse.test.ts` under the mirror law and changes the order mapping and the § Files row.
- **R4: carrier for compound-condition normalization.** B-MODAL's offcanvas unit records the only compound conditions and meets the mismatch first. `normalizeMediaCondition` anchors its patterns, so `(max-width: 575.98px) and (prefers-reduced-motion: reduce)` never equals a Veneer `(width < 576px) and …` block. **Recommendation:** send it to the running B-MODAL design round now, and carry it in CROSS-LEDGER only if that round declines it.
- **R5: breakpoint tokens under exit item 6.** The breakpoints are fixed at compile time by `breakpoints()`. A runtime override of `--vn-breakpoint-md` moves the resolved `--bs-breakpoint-md` and no media condition. **Recommendation:** accept the alias as the consumer. The proof reads the alias moving and, as a control, a `breakpoint-up(md)` declaration not moving. The guide states that limit. The alternative is an item-6 exclusion that the user sees.
- **R6: the leftover RTL digest.** `digests["bootstrap.rtl.css"]` remains in the fixture. No test reads it (search of `tests/**/*.ts` for `rtl` and `digests`), but carrier row 415 records the RTL digest and the `rtl` fields as removed.
  - **Option 1:** run D5-RESIDUE.
  - **Option 2:** amend row 415 to record the entry as unread upstream provenance.
  - **Recommendation:** D5-RESIDUE, provided no provenance record outside this tree hashes the fixture. That is unknown to me.
- **R7: unattributed keyframes.** The choice is to throw (CROSS-LEDGER's acceptance 2) or to leave the silent skip. **Recommendation: throw.**
- **Referral to J-ENGINE design.** The `transition` engine row accepts `TRANSITION_END` emulation after the duration plus `5` ms. The design rulings refuse the fixed transition fallback. Rule the row's status there; B-CROSS takes no action.

## Files the result makes false

These searches found them: `tests/**/*.ts` for `theme`, `keyframes`, `rtl`, `digests`, `scroll-behavior`, and `listed`, and `guides/veneer.md` for `does not ship` and `theme`.

- **`tests/conformance.test.ts`:**
  - the `listed` literal in "carries every shipped component selector and custom property in the built cascade";
  - the order case's `transitions` mapping, under R3's own-partial option.
- **`guides/veneer.md`:**
  - the § Additions reboot `:root` Reason cell ("…under the `theme` key this package does not ship");
  - the canonical-token paragraph of § Outside the ledger ("…a difference this ledger never reads, because the theme scopes … belong to the release's `theme` vocabulary rather than to a shipped component");
  - the § Compatibility table, which has no `theme` or `transition` row;
  - § Departures and § Additions, which have no theme or transition rows;
  - § Files and § Tests, for the fade partial and its proof.
- **`tests/setupServer.ts`:**
  - the remark of `collectAdditions` ("the theme layer's own scopes are the release's `theme` vocabulary, which this release does not ship as a component");
  - the TSDoc of `scanCompatibilityPresence` and the keyframes loop of `collectAdditions`.
- **Inventory and its proof:** the `digests` map in `tests/fixtures/oracle/inventory.json` and its pin case in `tests/setupServer.test.ts` (R6).
- **Only if R2 moves the rule:** the scroll case in `tests/src/styles/reset.test.ts`.
- **Not made false:** the fixture proofs of `scanCompatibilityPresence` and `collectLedger` in `tests/setupServer.test.ts` (their inventories carry `keyframes: []`) and `tests/src/styles/{tokens,theme}.test.ts`.
- **Risk to watch:** a shipped key whose property fallback in `collectValueGaps` reaches a theme site makes the gate throw `Components <key> and theme both claim <site>`. None does today: the carousel reaches `.carousel-dark` and `btn-close` reaches `.btn-close-white`. CROSS-THEME's run must report a throw rather than work around it.

## Exit criterion

B-CROSS ends when every one of these holds:

1. `theme` and `transition` are in `listed`, each with a shipped selector row. The presence, ledger (both directions), deferral, and priority gates are green, and no `Deferred` row names either key.
2. `#### theme` and `#### transition` record every measured departure. The theme additions and the reboot `:root` Reason cell read true, and the dark component rules have been shown to be inside the ledger by the before-and-after plant.
3. The presence gate reads keyframes, an unattributed keyframe is refused, and each has a plant that turns it red.
4. Every condition form in the inventory's top-level `media` list normalizes to the form the mixins write, and the unit named by R4 proves it. `d` ships with its print pass.
5. The `.fade` proof turns red on each named mutation, and the motion override moves it.
6. The breakpoint group is closed per R5.
7. R6 is ruled, and its unit has landed or row 415 is amended.
8. The engine rows are unchanged, with the J-ENGINE referral recorded.
9. The guide states each group. § Outside the ledger and the `collectAdditions` remark read true.
10. The fade specimens are registered and their frames written. The capture verdict rules the mode variants as the `theme` key's frames.
11. The `verifier` chain is green.
