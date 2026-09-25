Lane held: subjective (`planner`, Opus 5.5).

## Design

**Recommendation: option (a), unlayered importance, with one emitter.** Of the options, only (a) makes all three tenets and the standing ruling true together. The cascade reverses layer order for important declarations and puts unlayered ones last. So no placement that keeps an important declaration in a layer can lose to a consumer's unlayered `!important`, and any option that keeps the layer keeps the incompatibility.

The recommended shape has three parts:

- **One emitter.** Add an `important` mixin to `_mixins.scss`. It takes a map of property to value and writes each entry with `!important` inside `@at-root (without: layer)`.
  - One call sets both the flag and the placement. An important declaration cannot stay in a layer, and a normal declaration cannot leave one.
  - The `utility` mixin (`_mixins.scss`, around line 566) routes `$properties` through the emitter and keeps `$locals` in the layer.
  - Every hand-written site calls the emitter: `_reset.scss`, `elements/_input.scss`, `_form-control.scss`, `_navbar.scss`, `_offcanvas.scss`, `_link.scss`, `_visually-hidden.scss`, `_color-bg.scss`, and `_font.scss`.
- **An invariant gate over the built cascade.** Every important declaration reads `layer === undefined`, and every normal declaration reads a layer. The `SheetReader` declarations reading already carries both facts (`tests/setupServer.ts`, around lines 1845–1870). A planted important declaration left inside a layer must turn the gate red.
- **The consumer contract** (guide § Styles). Load your sheet after the cascade. Your unlayered `!important` wins at equal or higher specificity, as in Bootstrap. A layered one wins at any specificity, so the escape the guide documents today keeps working.

### Consequences, derived and not yet run

- **Tailwind, normal utilities.** Importance is decided before layers, so Veneer's important declaration still beats a normal Tailwind utility of the same name.
  - This holds in the `tailwind` and `preflight` profiles.
  - The exclusion-line rule (guide, around lines 3422–3426) and the shared set derived from it stay unchanged.
- **Tailwind's important modifier.**
  - Today it lands in the same `utilities` layer, and the recipe loads Veneer later (guide, around lines 3375–3377). Veneer therefore wins at one-class specificity.
  - Under (a), Tailwind's layered important declaration beats Veneer's unlayered one, so the consumer's explicit class wins. This improves direct control.
- **Preflight and `[hidden]`.** Tailwind 4 preflight writes `[hidden]:where(:not([hidden='until-found'])) { display: none !important; }` in `base` (`node_modules/tailwindcss/preflight.css`, around lines 396–397).
  - Under (a), `<div hidden class="d-flex">` is hidden in `preflight` and shown in `standalone` and `tailwind`. The preflight result is Tailwind's own rule: Bootstrap paired with Tailwind 4 gets the same outcome.
  - Under (b), the element is hidden in every profile.
- **`[hidden]` against a display utility.** The reset loads first (`index.scss:3`) and the utilities load last (`index.scss`, around lines 91–112). Without layers, `.d-flex` wins at equal specificity, which is Bootstrap's result.
  - A search of `src/browser` and `app` found no `hidden` attribute set on an element that carries a `d-*` class.
- **Responsive offcanvas.** The fills at and above the boundary (`_offcanvas.scss`, around lines 119 and 130) leave `components`. A later important background utility or consumer rule then paints the inline panel, as it does in the release. This reverses the partial's comment (around lines 92–98).
- **Conformance priority case** (`tests/conformance.test.ts`, around lines 385–408). It compares importance by selector, property, and condition, and never by layer, so it stays green under both options.
- **Ledger.** With no layer, `attributeSelector` falls from `LAYER_COMPONENTS` to inventory membership (`setupServer.ts`, around lines 2406–2418). Whether `[hidden]` and the calendar-picker rule still attribute to `reboot` must be measured.
- **Build.** Sass documents `@at-root (without: <at-rule>)`. A probe must confirm three things:
  - Dart Sass keeps the enclosing `@media` and style rule when it hoists out of `@layer`.
  - It writes the hoisted rule at its source position, splitting the layer block.
  - Lightning CSS and the Tailwind compile keep that order.
- **Proofs that pin today's behaviour.** Under (a) each flips to Bootstrap's outcome, and each needs a control:
  - the escape case in `tokens.test.ts` (around lines 569–584);
  - the `[hidden]` case in `reset.test.ts` (around lines 20–39);
  - the responsive-panel case in `offcanvas.test.ts` (around lines 271–300);
  - the priority reading in `mixins.test.ts`;
  - every `collectLayer` or `collectLayerRules` reader that expects an important declaration inside a layer (for example `shadow.test.ts:163` and `opacity.test.ts:75`).
- **R5.** Its reason ("an important declaration in an earlier layer beats one in a later layer", `b-utilities-design-verdict.md:61`) no longer applies.

### Consumers each option serves and breaks

- **(a) serves** a Bootstrap migrant whose unlayered `!important` overrides keep working, and a Tailwind user who writes important modifiers.
- **(a) breaks** reliance on `hidden` beating `d-*`, and reliance on the inline panel staying clear under a background utility. Bootstrap offers neither.
- **(b) serves** no consumer beyond those Bootstrap already serves.
- **(b) breaks** every unlayered `!important` override a Bootstrap migrant brings, and Tailwind's important modifier.

## Alternatives

- **(b) Layered importance, recorded. Rejected.**
  - It keeps an incompatibility with the drop-in tenet.
  - It needs a new kind of record: the `departure` union keys value differences, not priority (`ROADMAP.md`, around lines 121–127).
  - It keeps Tailwind's important modifier losing to Veneer.
- **(c) Hybrid. Rejected.** This option unlayers the utilities and keeps `[hidden]` and the component flags layered. It gives two priority contracts, and it still leaves an incompatibility to record.

A dedicated important layer, placed first or last in the order, fixes nothing, because any layered important declaration still beats an unlayered one.

## Constraints

## Refusals

## Measurements

## Units

- **IMPORTANT-PROBE**
  - Role and engine: `builder` on Sonnet writes the instrument, and `verifier` on Sonnet runs it.
  - Owned files: scratchpad only.
  - Acceptance:
    - A fixture `@layer x { .a { --l: 1; @media (width >= 992px) { @at-root (without: layer) { … } } } }` compiles to an unlayered rule inside its media query, at its source position, and survives Lightning CSS and the Tailwind PostCSS compile unchanged.
    - A Chromium reading of Tailwind's important modifier against a Veneer utility at `0865c67` is recorded.
- **IMPORTANT-EMIT**
  - Role and engine: `sol` on GPT-6 Astra.
  - Depends on the user's ruling for (a), IMPORTANT-PROBE, and TAILWIND-RECIPE landing.
  - Owned files:
    - `src/styles/_mixins.scss` and every partial listed under Design;
    - `tests/src/styles/{tokens,reset,mixins}.test.ts` and `tests/src/styles/components/offcanvas.test.ts`;
    - each layer-reading proof the `collectLayer(` search returns;
    - `tests/service/tailwind/{consumer,preflight}.test.ts` and their markup fixtures;
    - the invariant gate.
  - Acceptance:
    - The gate is green, and its plant turns it red.
    - The priority case stays green with no edit.
    - `<div hidden class="d-flex">` resolves to `flex` in the standalone cascade.
    - An unlayered consumer `!important` loaded after the cascade wins, and one loaded before it loses at equal specificity.
    - The layered escape still wins.
    - A Tailwind important modifier beats a Veneer utility.
    - Preflight `[hidden]` hides a `d-flex` element.
    - The ledger attributes the rules that left the reset and elements layers to `reboot`.
- **IMPORTANT-PROSE**
  - Role and engine: `opus` on Opus 5.5.
  - Runs after IMPORTANT-EMIT and lands with it.
  - Owned files: `guides/veneer.md` (§ Styles important paragraph and its fence, the § Tailwind modifier and preflight sentences), the offcanvas partial comment, and a `ROADMAP.md` design-ruling line that closes R5.
  - Acceptance: the tokens proof executes the fence, guide parity is green, and the roadmap sentences stand as written.

## Tensions

- **What the user must rule.**
  - Adopt (a) and keep the roadmap sentences. `hidden` then loses to `d-*`, and the inline offcanvas takes a later important fill, both as in Bootstrap.
  - Or take (b) and amend the roadmap sentences.
  - Also rule whether the preflight profile's `[hidden]` result is recorded as Tailwind's own behaviour, with no Veneer departure.
- **Mixin name.** `important` is an adjective, and `styles.md` asks for verb or verb-noun names. Existing mixins such as `heading-text` and `cover-block` already break that form. The alternative is `unlayer`.
- **R5 placement.** Leave `_link`, `_visually-hidden`, and `_color-bg` in `utilities`, which avoids churn, or return them to `components` under their release filenames. I recommend leaving them and retiring R5's reason.
- **Routing.** IMPORTANT-EMIT needs browser and Chromium service proofs, and the bench sandbox's child stdio is unreliable. Either the Orchestrator takes those readings on the host, or the unit goes native to `opus`.

## Risks

- **Sass or Lightning CSS behaviour.** Either might refuse `without: layer`, reorder the hoisted rules, or merge the split blocks. IMPORTANT-PROBE settles this.
- **False green from layer readers.** A proof that reads `collectLayer('utilities')` passes on fewer rules. The invariant gate and a `collectLayer(` search bound this.
- **Pins that move.** The compiled-cascade digest pins and the size of the built CSS change. `distribution.test.ts` must be read.
- **Ledger attribution.** Unlayered rules from the reset and elements layers might attribute to a different key. This must be measured before landing.