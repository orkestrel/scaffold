# Judge: consumer

## Ranking

1. consumer-proof
2. tuned-build
3. thin-layer

## Scores

Lens: the consumer and the showcase. Scores run from 1 to 5.

| Criterion | thin-layer | tuned-build | consumer-proof |
| --- | --- | --- | --- |
| Fidelity to R1 to R4 | 3. Tailwind wins on the shared names. The important counters also override Bootstrap utilities that conflict with nothing (`text-md-start`, `border-primary`), which breaks R3 without any check seeing it | 4. Bootstrap yields by withholding, which is clean. The compatibility work moves into the Bootstrap face, leaving `./tailwindcss` as a statement and an exclusion, against "tailwindcss to be the compatibility layer" (brief:9). `until-found` is deferred to P5 | 5. `./tailwindcss` is the whole layer, which matches brief:9 and the user's override of the "folding" refusal (brief:18). `[hidden]` is withheld under R1. Three faces |
| Bootstrap-only invariance | 3. The first statement of `./bootstrap`, `./styles`, and the themes gains `compatibility`, so every digest changes. Computed values stay the same. The change is stated and bounded | 4. `./bootstrap` stays byte-identical (SHA `7932f7a5…`). The barrel forwards `$tailwind`, an additive change that the proposal states | 5. The `./bootstrap` bytes and the `@forward … show $layered` API stay the same. U2 checks the SHA first |
| Minimal mechanism | 3. One layer is appended across every sheet. It adds 192 counters, an `@source inline` that forces 192 utilities into every consumer build, the `html body` projection, and a textual specificity proof | 3. One boolean switch, but it adds an export, a build target, a Vite wrapper, and two scaffold rule amendments that need a release (U1) | 4. No added export, build, or layer. It adds four switches and four mixins, plus one cross-face Sass dependency |
| Provability | 4. A Node derivation covers every byte. Attribution through `Element.matches` is deterministic. The host filter carries a typo guard. The partition labels compatibility-layer overrides `utility`, so it cannot fail on them | 4. A four-part "nothing else" derivation in Chromium, a stripped-curation control, a keys-only preflight case, and a reboot case that reads no record. One host-bound title remains | 4. Four pins, including the recipe compile against the tuned sheet with a one-row rewrite record, and a dead-clause check. The portable preflight case checks one direction only and drops the live-to-record direction |
| Consumer clarity | 2. Under the layer, a consumer's unlayered normal or `!important` rule loses on any element that carries one of the 192 names (M1 b.1 to b.4, e.3). Under Tailwind alone, that rule wins. A consumer `@layer base` rule loses to the reboot | 4. A complete case table: an unlayered important wins, Tailwind absent is stated, and `dark:` is stated. Nothing pins the misuse of linking `./bootstrap` in place of `./bootstrap/tailwind` | 5. A table of three compositions for each case, with `d-flex hidden!` and `dark:` included. The recipe is complete in three lines. Linking `./bootstrap` beside the recipe is refused and pinned. The bundler limit is stated |
| Curation | 4. The own-cause definition is measurable. The provisional table covers the named candidates through rows or class specificity. It omits the `form-check-input` color rows (m3 rows 377 to 384) | 5. A definition in buckets, a four-step derivation from M3, and rows for every named candidate, the input colors, and the admitted `height` | 3. The definition is sound, but the `context` kind excuses every longhand when the parent departs in `font-size`. The seed omits `placeholder-glow` (named in measurements.md:52), `accordion-header`, `lead`, `display-*`, `list-unstyled`, and the `alert-link` and input color rows |
| Showcase coherence | 2. The proposal keeps chrome invariance through `readShowcaseChrome` with zero departures. That cannot hold: M3 reads every element departing in `tab-size`, and the banner carries `gap-3 py-3` (`factories.ts:767`). It also uses `col-12` as a chrome width | 4. Three faces, a 9-row face table, a 6-row pair table, and a partition with a positive control and a stripped control. The captions are coherent. Its census of "no drifting shared name on chrome" cannot pass for `py-3`, `px-4`, and `py-5` (`factories.ts:767`, `:793`), which have no equal non-shared class | 4. Three faces, host-independent readings, a partition with a dead-clause check and two controls, and the chrome read through the partition. It claims that no Bootstrap-only replacement exists, which is false for `gap-3` (`row-gap-3 column-gap-3`), `border`, and `rounded` (`rounded-2`) |
| Unit boundedness and order | 4. Eight serial units with clear owners, cheap checks first | 3. Bounded units, but a scaffold amendment, a release, and a re-pin gate U2 | 3. U5 sits in the subjective lane yet owns `Showcase.ts` and its tests. No unit amends scaffold `AGENTS.md:28` or writes the promised cross-face policy case |
| Use of the measurements | 3. The chrome invariance claim contradicts M3 on `tab-size`. It cites M1 § c for the 0px reading with Tailwind absent, but § c was measured with Tailwind present | 5. Every citation checks: M1 c and e.1, M2 B=D, M2 § 4 counts, and M3 4568 and 1988 (m3-summary.md:90) | 4. Citations are correct, including the form-control confinement (m2-bare.md:560). The 12 rows that move live with no record row (m2-bare.md:589-600) are left unchecked |

## Objections

- thin-layer: the `compatibility` counter overrides Bootstrap's own non-shared utilities on the same element, not only the conflict. Each counter declares every property of Bootstrap's `.NAME` rule as `revert-layer !important` in a layer that follows `utilities`. A layered important beats every unlayered important (M1 b.1 to b.4, m1-cascade.md:18), so on `text-center text-md-start` the counter on `.text-center` beats Bootstrap's unlayered `.text-md-start !important` at md. The text stays centered. Likewise `mb-3 mb-md-0` keeps 12px at md. On `border border-primary`, the `border` shorthand counter wipes `.border-primary`'s color and rolls back to preflight's currentColor. On `border border-top-0`, the top border comes back. The partition labels each of these `utility`, because a compatibility-layer rule declares the longhand, so no assertion can fail. Separately, the claim that chrome invariance through `readShowcaseChrome` stays contradicts M3: every element departs in `tab-size` (measurements.md:49), and the banner carries `gap-3 py-3` (/home/user/veneer/app/browser/factories.ts:767).
- tuned-build: the compatibility work moves into the Bootstrap face. The target is `src/bootstrap/tailwind`, and the curation lists are `tune` arguments in `src/bootstrap/_reset.scss`. That leaves `./tailwindcss` as an order statement and an exclusion, against the user's "I still want tailwindcss to be the compatibility layer" (brief.md:9). Every unit after U1 waits on a scaffold release that amends `workspace.md:38` and `styles.md:72-74`. A consumer who follows the guide's existing line (`guides/veneer.md:1508-1510`) and links `./bootstrap` in place of `./bootstrap/tailwind` silently keeps Bootstrap's authority on all 192 names, and no case pins that misuse. Its chrome acceptance, a census with no drifting shared name on chrome, cannot pass for `py-3` (factories.ts:767) or `px-4 py-5` (factories.ts:793), because Bootstrap ships no non-shared class of equal value.
- consumer-proof: the design needs `src/tailwindcss` to `@use` the `src/bootstrap` partials. Scaffold `AGENTS.md:28` forbids that ("No extension face imports ... another extension's face"). That line is a contract law, not a rule file. No unit amends scaffold or writes the policy case the proposal promises in § 10 item 1, so U2 would land against the contract. Its curation is also loose. The `context` kind excuses a departure in any longhand when the parent departs in `font-size`. The predicted seed omits `placeholder-glow`, which measurements.md:52 names, and also `accordion-header` (m3 rows 538 to 540) and the `form-check-input` color rows (m3 rows 377 to 384). Its chrome section says no Bootstrap-only replacement exists, which is false for `gap-3` (`row-gap-3 column-gap-3`), `border` (the four side classes), and `rounded` (`rounded-2`).

## Synthesis

## Verdict

I judged in the consumer and showcase lens. `consumer-proof` is the base, with grafts from the other two proposals:

- **From `tuned-build`:** the curation derivation, the member split, the derivation that shows the sheet holds nothing else, and the preflight case that reads no record.
- **From `thin-layer`:** deterministic attribution and the host-filter guard.
- **Refused:** the counter mechanism of `thin-layer`, because its layered important counters override Bootstrap's own non-shared utilities on the same element.

## Base: consumer-proof

`./tailwindcss` becomes Bootstrap for Tailwind and the three-line recipe is complete. The consumer links no `./bootstrap` beside it, and `./bootstrap` stays byte-identical.

This best serves a Tailwind developer and the user's words. The user wrote "I still want tailwindcss to be the compatibility layer" (brief:9) and lifted the earlier refusal of folding Bootstrap into `./tailwindcss` (brief:18).

## Grafts

1. **Curation table rows (from tuned-build § 4).** Seed the fixed point with every M3 candidate that tuned-build derived:
   - `modal-title` and `accordion-header` on the heading rules.
   - `card-text`, `lead`, `display-1` to `display-5`, and `placeholder-glow` on `p`.
   - `pagination` and `list-unstyled` on the list rules.
   - The link classes on `a`: `alert-link`, `card-link`, `icon-link`, `stretched-link`, `focus-ring`, and the `link-*` classes.
   - On `.bi`: restore `vertical-align` and revert `display`. On `figure-img`: revert `display`.
   - `form-check-input`, `btn-check`, and `form-range`: revert `color`.
   - Admit `height` on an image with a `height` attribute.

   Reason: the seed in consumer-proof misses `placeholder-glow`, which measurements.md:52 names, and the input color rows (m3 rows 377 to 384).
2. **Member split.** Emit the element members of each reboot rule in `reset`, and emit only the class members (`.h1` to `.h6`, `.small`, `.mark`) plus the curated copies in `bootstrap`. Build the copy selector with consumer-proof's `selector.unify` `restrict` function, so `*::before` gets the class test before the pseudo-element. Reason: consumer-proof emits `.h1` in both layers. The split removes the duplicate, and `unify` keeps pseudo-element selectors valid where tuned-build's `selector.append` does not.
3. **Deterministic attribution (from thin-layer § 4).** Add `attributeDeparture` to `tests/setupStyles.ts`. It labels a departure `utility` when a rule in Tailwind's `utilities` layer matches the element (`Element.matches`) and declares the longhand. It labels it `preflight` when a `base` rule does, and `inherited` otherwise. Rules under `@media` or `@supports` count only while their condition holds. This replaces two kinds in consumer-proof: `context`, which excuses every longhand when the parent's `font-size` departs, and `preflight by tag`. Reason: the partition then cannot hide a component break behind a heuristic.
4. **A derivation that shows the sheet holds nothing else (from tuned-build § 3).** Add a fourth clause to consumer-proof's sequence pin: every record of the tuned sheet is withheld, moved, curated, or unchanged. Reason: an unexplained rule then fails the pin.
5. **Preflight rows in both directions.** Keep consumer-proof's portable record case. Add thin-layer's guard: every longhand the filter skips is absent from the host's enumeration. Add tuned-build's reboot case, which reads T (recipe), D (the raw composition), and R (T with the `reset` blocks deleted) and reads no record. Reason: the live-to-record direction of `pins the live moved rows in both directions` comes back without a stored value.
6. **Chrome mapping.** Replace a chrome class wherever a Bootstrap-only class gives the same Bootstrap-alone value:
   - `h-100` becomes `d-flex` on the `.col` and `flex-fill` on the card.
   - `gap-3` becomes `row-gap-3 column-gap-3`.
   - `rounded` becomes `rounded-2`.
   - `border` becomes `border-top border-end border-bottom border-start`.

   Keep `py-3`, `px-4`, `py-5`, `mt-5`, `pt-4`, and `mb-4`, and read them through the partition. Reason: tuned-build's census cannot pass for those spacing names, and consumer-proof's claim that no replacement exists is false for gaps, borders, and radii.
7. **Two extra consumer readings (from thin-layer § 2).** Read `--spacing: 0.3rem` (`mt-3` at 14.4px) and `bg-white dark:bg-black` under a class-based `@custom-variant dark`. Also read `text-center text-md-start` at 768 px under the recipe, expecting `start`. This witness is the one that refuses the counter mechanism.
8. **Sass refusal (from tuned-build).** `_tokens.scss` refuses `$reset: true` with `$layered: false` through `@error`. Add tuned-build's P4: compile `collapse!`, `container!`, and `mt-3!` against the exclusion.

## Rulings

**R1. Shared utility names.**
- Under the tuned configuration, Bootstrap withholds the exact `.NAME` rule of each of the 192 shared utility names: 199 rules, of which 192 are unlayered and 7 are the layered `--bs-*-opacity` halves (verify.md:33). The rules come from the same `$utilities` map through `$withhold`. Breakpoint and state forms stay.
- Refuse candidate (b). M1 c reads 0px from every statement layer. A trailing layer reads 12px, but as a layered important it beats every unlayered important (M1 b.1 to b.4). That includes Bootstrap's own `.text-md-start` and `.border-primary` and the consumer's own rules.
- Refuse candidate (c) under brief:56.

**R2. The 17 shared component names.** Bootstrap keeps them, and the exclusion withholds Tailwind's rule for each: `collapse` is written by the engine, `container` and `col-*` carry the grid, and `table` carries the table component. `caption-top` stays excluded with its category, because both rules declare `caption-side: top`. The user confirms this reading of "every conflict".

**R3. The exclusion.**
- `@source not inline` names the 1833 names: `CLASS_NAMES.bootstrap` minus the 192.
- Consumer-theme limit: a token or `@utility` named for a Bootstrap class generates nothing, and `@apply` of such a name fails. A token that retunes a shared name (`--spacing`) retunes Tailwind's rule for it.
- Refuse naming only the 17, because `@utility btn` would restyle `.btn`. Refuse naming nothing under R2.

**R4. Preflight authority.**
- The mirror goes. Under the tuned configuration, the reboot's element members emit in `reset`. The class members and curated copies emit in `bootstrap` at the reboot's position.
- Preflight in `base` wins where both declare (M1 f.1). The reboot supplies body color, background, and font, plus heading `line-height` and color (M2 § 6).
- Withhold `[hidden]` so preflight's `until-found` exemption holds. Keep the datalist picker rule unlayered; it has no witness on Chromium 141.
- Refuse dropping the reboot, because the body color and background would go. Refuse moving `base`, because the order statement is shared.

**R5. Curation.**
- An element that carries a `CLASS_NAMES.bootstrap.components` name is broken in longhand L when L under the layer face differs from L under `./bootstrap` alone on the same host, variant, and markup, and `attributeDeparture` names `preflight` as the cause. Not broken: the invisible set, box and used-value geometry, and a `utility` cause.
- The layer repairs on the class in one of two ways. A reboot row is a curated copy at the reboot's specificity. A restore row is `TAG:where(.CLASS) { L: revert }`.
- A bare element is Tailwind's.
- The table lives in the guide and is pinned three ways: against the tokens in Node, against the sheet in Chromium, and against the journey partition with a stripped control.

**R6. Surface.**
- `./tailwindcss` → `dist/src/tailwindcss/index.css`, built from `src/tailwindcss/index.scss`. That file configures `../bootstrap/tokens` with `$withhold`, `$reset`, `$curated`, and `$restored`, then loads the Bootstrap partials.
- `./tailwindcss/scss` keeps its path. `files` keeps both SCSS globs. `src/tailwindcss/_reset.scss` is deleted.
- `./bootstrap` and `./bootstrap/scss` stay the same.
- The derivation pins are the Sass round trip, the name sets, the sequence transform, the compile equality with M6's one-row rewrite record, and the "nothing else" partition.
- The cross-face Sass dependency needs the user's grant under scaffold `AGENTS.md:28`.

**R7. Showcase.**
- Three faces: `bootstrap`, `unexcluded` (the unexcluded compile before `./bootstrap`), and `tailwindcss` (the recipe compile alone).
- `FACE_SCENARIOS` has 9 rows. `assertFace` reads the witness pair `px-8` padding and `mt-3` margin: (12px, 16px), (32px, 16px), and (32px, 12px).
- `TAILWIND_READINGS` takes consumer-proof's table of 21 rows.
- A departure partition replaces invariance in every variant. The chrome is read through the same partition.
- The `unexcluded` face is the failing control (`visibility: collapse`). The layer face with every curated rule stripped is the curation control.

**R8. Records.**
- `oracle.min.json`, `comparison.json`, and `similar.json` keep their meaning.
- `incompatible.json` keeps its rows, re-read under `[built, unexcluded]` as what Tailwind breaks without the layer.
- `preflight.json` keeps its rows as the bare-element baseline Tailwind sets, read through the portable case with the guard and the record-free reboot case.
- Both `recipe.json` files keep their shape.
- The curation table replaces the exemption table.

**R9. Guide and roadmap.**
- Rewrite consumer-proof's § 7 list. Add the misuse refusal: never link `./bootstrap` beside the recipe.
- Tenet: "Tailwind wins at every conflict with Bootstrap; `./tailwindcss` is Bootstrap for Tailwind, built from the same source with the shared utility rules withheld, the reboot's element rules in `reset`, and the curation the guide's table names."

**R10. Units.** The units run serially on one checkout:
1. U0: probes.
2. U1: scaffold grant and policy case, in the scaffold checkout, gated on the user.
3. U2: sheet.
4. U3: records.
5. U4: integration.
6. U5a: copy and labels (Opus, no tracked file).
7. U5b: showcase code and journeys (objective).
8. U6: guide (Opus).
9. U7: gates and showcase rebuild (verifier).

## Open points

- The user grants the cross-face Sass dependency (scaffold `AGENTS.md:28`). The fallback is tuned-build's `./bootstrap/tailwind` target, which needs the `workspace.md:38` and `styles.md:72-74` amendments.
- The user confirms that the 17 component names stay Bootstrap's.
- The user rules on curation coverage of documented markup the page does not render, such as a bare `h5.offcanvas-title`.
- The user accepts the page weight of a second Bootstrap copy inside the recipe face.
- The user accepts that the bundler path (Lightning CSS) stays unproven without a package.
- The Orchestrator rules on the writer form for the records (Vitest under `tmp/units/`, or Node).

## First probe

Run P1 and P2 of consumer-proof as one probe:
1. Compile `src/bootstrap/index.scss` with `$layered: false` and with the defaults, before and after the hook, and compare SHA-256.
2. Compile the tuned configuration with `$curated` set to (`modal-title`, `card-text`).
3. Pass the result through `compileRecipe`.
4. In Chromium, read that the recipe holds `@layer properties;` first and no `collapse`, `container`, `table`, or `col-1` in `utilities`. Read `mt-3` at 12px, `h1` at 16px and weight 400, `h1.h1` at 40px, `h4.modal-title` at weight 500, and `p.card-text` at a 16px bottom margin.
5. Read `text-center text-md-start` as `start` at 768 px.
6. Read the flattened rows equal to the tuned sheet except M6's one rewrite.
