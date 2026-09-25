# LEDGER-BOUNDARY design verdict (2026-09-25)

The Orchestrator's reconciliation of the LEDGER-BOUNDARY design round on one brief (`units/ledger-boundary-design-brief.md`),
opened because LEDGER-RETUNE's round-2 audit (`units/lret-audit-2-verdict.md`) was the third round at the resolver's
faithfulness seam (`.claude/rules/quality.md` § Rounds and verdicts). The subjective lane was `planner` on Opus 5.5
(`units/ledger-boundary-design-planner-proposal.md`); the objective lane was `analyst` on GPT-6 Astra
(`units/ledger-boundary-design-analyst-proposal.md`; thread `01a0d801-1880-7ff3-9392-9637a969cc2e`, journal
`tmp/codex/ledger-boundary-design-analyst.jsonl`). They ran blind to each other. Both refuse a fourth repair and bound the
claim to a declared model; this verdict takes the planner's asymmetric rule and single model, and the analyst's
construction and projection rules, admission of dependencies, document-root reading, and homogeneous-branch bound.

## Invariant

The resolver decides a pair **apart** wherever any declared reading computes the two sides apart; a declared reading is
a page a reader can open, so one differing reading is a witnessed difference. It decides a pair **alike** only where
every term both sides read after substitution, and every custom-property declaration that substitution read, lies inside
the declared model, and both sides compute alike in every declared reading. It returns an **indecision naming its
reason** for every other pair, and for every pair whose construction fails, whichever way its readings fall.

Construction fails where a built element misses its compound, where the target's selector places it in more than one
mode, where no probe types a custom-property pair, where a state the model projects could change a variable the pair
reads, or where an inheriting side finds no parent value. The same-text shortcut runs only after construction succeeds,
and compares the substituted text in each mode the pair is read in; two sides that write the same text after
substitution in a mode compute alike in every context of that mode, so term admission does not apply to them.

The declared readings are the `base` setting, each other setting (each changing one context against `base`), the parent
reading for a regular property, and, for a site whose selector pins no mode, the dark mode beside the light one.

## Constraint

- **The model gates the alike verdict only.** No pair that reads apart today becomes undecided; a row can turn undecided
  only where every reading agrees and a side reads a term outside the model.
- **Terms fail closed.** A unit, a function, a keyword present on one side only, or a pseudo-class the model does not
  list leaves an alike pair undecided. This round adds no setting that changes a new context.
- **Comparison functions are admitted only when homogeneous.** A `min()`, `max()`, or `clamp()` is inside the model where
  every argument, after substitution, is a sum of terms in one length unit (a zero in any unit allowed), because its
  branch then cannot change with that unit's context. The shipped responsive branch `max(S * 0.9 - 1.125rem, 0px)` is
  homogeneous in `rem`. A branch mixing units, such as `max(0px, min(1em - 16px, 1rem - 16px))` or
  `max(1rem - 25px, 0px)`, leaves an alike pair undecided.
- **A product of terms read by different settings** leaves an alike pair undecided, unless the product reads zero in every
  reading. The shipped rows multiply a homogeneous branch by a viewport factor: where the branch is zero (the `.fs-6`,
  `.h6`, and `h6` rows) the product is zero everywhere; where it is not, the rows read apart at the `root` setting.
- **The gate stays.** The measured, repainted, canonical, and witness cases fail on any undecided line, which names its
  reason. A unit that brings a row outside the model widens the model in the same change, with a setting that varies
  the context the new term reads and a case that pins it; no unit widens the model for an input no real row reaches.
- **Limits stated, not closed:** each setting changes one context at a time; an at-rule condition identifies a declaration
  site and does not gate which readings apply. The implementation measures both limits against the real pairs first
  (Readings R8 and R9) and stops if either decides a real row.

## Interface

In `tests/setupServer.ts`, each name per `.claude/rules/names.md`:

- **`ResolverModel`** (interface) and **`RESOLVER_MODEL`** (frozen constant): the one home of the boundary. Members:
  `base` (the base `ResolverSetting`, found by name), `settings` (a `Readonly<Record<ResolverScenario, ResolverSetting>>`
  of the other settings), `parents` (the parent values the parent reading tries), `units`, `functions`, and `keywords`
  (each term the model decides, mapped to the readings that vary its context, an empty list for a term that reads none),
  and `states` (the pseudo-classes a built element stands for at rest). It retires `RESOLVER_SETTINGS`, `PARENT_VALUES`,
  and `UNVARIED_FUNCTIONS`. Each table holds only what a real pair or a proof reads.
- **`ResolverScenario`**: the union of the setting names (`font`, `block`, `color`, `direction`, `root`, `viewport`).
  **`ResolverMode`**: `'light' | 'dark'`.
- **`Indecision`**: `{ readonly reason: string }`. `ValueResolver.resolve` returns `ReadonlyArray<Resolution | Indecision>`;
  callers narrow with `'reason' in`. Each undecided line the scans write ends with its reason, which names the term, the
  compound, or the modes.
- **`scanUndecidedTerms(recorded, emitted): readonly string[]`**: the terms either side reads, and the custom-property
  declarations substitution read, that the model does not map, plus each non-homogeneous branch and each mixed product.
  It walks Chromium's serialization with the existing walkers in `tests/setupStyles.ts`; it adds no parser.
- **`collectSelectorModes(selector): readonly ResolverMode[]`**: replaces `inferScopeMode`; the modes the selector's
  alternatives pin through the target's ancestry, empty where none does.
- **`ValuePair.mode?: ResolverMode`**: an explicit mode, part of the resolution cache key.
- **`extractMatchedCompound`**: keeps `:not()`, `:has()`, `:is()`, `:where()`, and every structural pseudo-class; leaves
  out pseudo-elements and the `states` pseudo-classes. **`collectContextElements`** builds each pair side inside a wrapper
  of its own, gives each element a following sibling of its own, and builds whatever a kept predicate needs (a `size`
  value other than `1`, a `textarea` without a placeholder).
- **A `:root` site** is read at the document element of the side's own document, not at a descendant.
- **`PROBE_SYNTAXES`** regains `<custom-ident>`, after `<color>` and before the `font-family` rung.
- **Doc blocks:** `Resolution` names the reading order (`base`, each setting, the parent reading, the dark reading);
  `scanCanonicalValues` loses its `inherit` clause.

## Rulings

- **Q1, the claim.** Bounded. Container units, `lh` and `rlh`, `vmin` and `vmax` and the other viewport families,
  `ex`, `ch`, `cap`, and `ic`, `attr()`, `env()`, counters, `min()` and `clamp()` outside the homogeneous rule, and
  `:has()` are outside the model: undecided when alike, and decided apart when a reading differs (`1ex` against `0.5em`
  reads apart). No real pair reaches any of them (`units/lret-instruments/audit-2-probe/reachability.txt`; the `lh` hit
  there is the `.lh-base` selector, whose pair reads `1.5` against a token of `1.5`). A custom-property `currentColor`
  is inside the model through the `color` setting, read where the probe resolves the contextual color.
- **Q2, the constraint.** As stated. Every real pair `reachability.txt` lists under `:not(`, `lh`, `currentColor`, and
  `max(` stays decided, each with the member the gate prints; R3 and R4 confirm it before any other change.
- **Q3, selector construction.** Full-compound matching with the construction the Interface names. A `states` pseudo-class
  is projected at rest only where no custom property the pair reads, directly or through a dependency, is declared under
  a selector naming that state; otherwise the pair is undecided. The real `:not()` rows decide as both lanes list.
- **Q4, the canonical scan.** A `:root` declaration is compared with the light cell whether or not the light scope
  redeclares the token, and with the dark cell where the dark scope does not; a mode-scoped declaration with its own
  cell; any other site in each mode `collectSelectorModes` returns, or in both where it returns none; a site whose
  alternatives pin more than one mode is undecided. Diagnostics keep the original selector and condition.
- **Q5, the probe syntaxes.** `<custom-ident>` returns; `SERIF` against `serif` reads apart, and `red` against `RED` stays
  alike through `<color>`.
- **Q6, the interface.** As stated. The planner's `base`-by-position note and the `inferScopeMode` note close here.
- **The planner's tension T4 is inside the exit criterion, not a rescope.** LEDGER-RETUNE's objective decides a pair
  alike only where both sides compute alike in every context their terms read, and the color mode is such a context. A
  departure pair whose selector pins no mode is read in both modes; any member drift that follows is applied from the
  gate's output.
- **Tension T2 (keywords).** Keywords fail closed as the Constraint states; R1's census fills the `keywords` table.
- **Tension T8 (the parser law).** `scanUndecidedTerms` reuses the existing walkers and adds no tokenizer; that satisfies
  `AGENTS.md` § Project model.

## Proofs

Each case below fails with an `AssertionError` under its mutation and passes when restored. The implementing unit takes
the union of both lanes' tables (the planner's P1 to P11 and the analyst's cases), naming each case for what it proves:

- an out-of-model term, directly and through a variable, leaves an alike pair undecided with its reason (mutation: skip
  the term scan), while `1ex` against `0.5em` stays apart (mutation: gate apart readings);
- a non-homogeneous branch is undecided and the shipped responsive `.fs-6` form is decided alike (mutations: admit every
  branch; refuse every branch);
- a mixed product that reads non-zero is undecided (mutation: admit mixed products);
- `:not(:last-child)` reads the same first and last in a batch, and `:has()` is undecided (mutations: drop `:not()` from
  the match; omit the trailing sibling; share one wrapper across the batch);
- a hover-only variable is refused at a `:hover` site (mutation: project states without the dependency check);
- `inherit` at `:root` reads the document root, not a descendant (mutation: read `:root` at a descendant);
- `collectSelectorModes` returns both modes for a two-mode `:is()`, and the resolver and the canonical scan name it
  undecided (mutation: take the first alternative);
- the canonical scan reports a `:root` value a light redeclaration hides, and compares unscoped and root-fallback sites
  in dark (mutations: the round-2 `light ?? root` choice; drop the dark comparison);
- `SERIF` against `serif` reads apart and `red` against `RED` alike (mutations: remove `<custom-ident>`; order it before
  `<color>`);
- a custom-property `currentColor` pair reads apart under the `color` setting (mutation: freeze the host color);
- `base` is found by name (mutation: reorder the settings);
- the resolution cache keeps explicit modes apart (mutation: drop `mode` from the key);
- every undecided line ends with its reason (mutation: drop the reason);
- each `parents` entry decides a pair only it decides (mutation: drop the entry).

## Readings the implementation takes first

Before changing behaviour, the implementing unit runs these through the resolver at `23b659b` on Chromium 141 and stops
if one contradicts its expectation: R1, the term census over every departure, repaint, canonical, and witness pair (the
units, functions, and one-sided keywords, which fill the model's tables); R3, the `max()` rows under root sizes `8px`,
`12px`, and `40px` and viewports `400×800` and `1920×1080`; R4, the real `:not()` rows under full-compound matching; R5,
the canonical shapes (every token `:root` and the light scope both declare, and any canonical block with a two-mode
selector); R7, every unscoped departure pair read in dark (the resulting drift is applied); R8, state-keyed variables at
state sites (expected none); R9, rows whose member depends on a setting their at-rule condition excludes (expected none).
After the change, it runs the analyst's reading table and R6 (the restored `<custom-ident>`'s gate drift, expected none).

## Carrier

LEDGER-RETUNE round 3 (`units/ledger-retune-brief-4.md`), `opus` on Opus 5.5, native, the sole writer in
`/home/user/veneer-lret`, carrying claims 1, 2, 6, and 8, F1, F2, and the non-blocking notes of
`units/lret-audit-2-verdict.md` in this shape. Its audit runs `analyst` on GPT-6 Astra, `reviewer` on Opus 5.5, and
`checker` on Sonnet for guide-row parity.
