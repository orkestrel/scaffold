Lane held: **subjective** (`planner` on Opus 5.5, clean context, read-only). I ran nothing and edited nothing. My evidence is file reads plus `Grep` over the named files. Every claim that needs a browser run is listed under **Readings the Orchestrator must run**.

The dispatch fixes the shape: the brief's Output headings, and nothing else. So my role's Units sit under Rulings Q6 (the carrier paragraph) and its Tensions sit under Risks. No dispatch defect.

## Invariant

The `ValueResolver` class decides a pair **alike** only where both of these hold:
- Every unit, function, and keyword either side reads after substitution lies inside one declared model, the `RESOLVER_MODEL` constant.
- Both sides compute to one text in every reading that model declares.

It decides a pair **apart** wherever any declared reading computes the two sides apart, whatever terms they read. Every other pair gets an `Indecision` that names what the model does not decide.

The invariant is three rules, each breakable by a test:

1. **Alike needs coverage.** An alike pair is undecided if it reads a term whose context no reading varies. `1cqw` against `1vw` on `width` becomes undecided. Today it reads `12.7969px` twice (`referrals.log.txt:8`).
2. **Apart needs only one reading.** Each declared reading is a page a reader can open, so one differing reading is a witnessed difference. `1ex` against `0.5em` stays decided apart (`7.34375px` against `8px`, `referrals.log.txt:9`) even though `ex` is outside the model. The model gates the alike verdict only.
3. **Construction gates both verdicts.** The pair is undecided whatever it computes when:
   - the built elements miss their compounds;
   - the selector's alternatives place the target in more than one mode;
   - no probe types a custom-property pair;
   - the parent reading finds no parent value for an inheriting side.

   In each case the substituted values themselves are unproven.

The readings are:
- `RESOLVER_MODEL.base`;
- each entry of `RESOLVER_MODEL.settings`, each changing one context against `base`;
- for a regular property, the parent reading over `RESOLVER_MODEL.parents`.

The claim is exact for a value that is affine in its contexts. The guide states that each reading changes one context at a time.

**Mutation that breaks it:** skip the term scan in `resolve`. The added case expects `1cqw`/`1vw` to be an `Indecision` naming `cqw`. The mutant returns `{ recorded: '12.7969px', emitted: '12.7969px' }`, and the case fails with an `AssertionError`.

## Constraint

- **Units, functions, and selector parts fail closed.** A term absent from the model leaves an alike pair undecided. This holds for every unit, every function, and every pseudo-class not listed under `states`, so an unreached attack class lands as undecided by construction. No later round has to enumerate it.
- **The model never gates an apart reading.** No `retuned` row can turn undecided. A row turns undecided only when every reading agrees and one side reads an out-of-model term. By `reachability.txt` and my greps, no real row does.
- **This ruling adds no setting.** Container, line-height, orientation, font family, and joint settings are all refused (Q1).
- **Widening belongs to the unit that brings the row.** A future row outside the model fails with the term named in its line. The existing gate cases catch it: `decides every measured value difference …` (`tests/conformance.test.ts:266-268`), `decides every repainted value difference …` (`:270-272`), and the canonical and witness cases, which write undecided lines. The unit that brings such a row:
  - adds the term to the model table;
  - where no reading varies the term's context, adds a setting that changes that context and nothing else;
  - does both in the same change, with the pin in Proofs P8.
  
  No unit widens the model for an input no real row reaches.
- **Every real pair stays decided.** Rulings Q1 to Q3 give each reached pair and the reason. Readings R1 to R5 confirm this before the round-3 brief is written.

## Interface

All names are in `tests/setupServer.ts`, per `.claude/rules/names.md`.

- **Added: `ResolverModel`**, a plain data interface in the `{Entity}` form. It declares the whole boundary in one place:

  ```ts
  export interface ResolverModel {
  	readonly base: ResolverSetting
  	readonly settings: Readonly<Record<string, ResolverSetting>>
  	readonly parents: readonly string[]
  	readonly units: Readonly<Record<string, readonly string[]>>
  	readonly functions: Readonly<Record<string, readonly string[]>>
  	readonly keywords: Readonly<Record<string, readonly string[]>>
  	readonly states: readonly string[]
  }
  ```

  - `base` is found by name. This settles the design note: the code no longer relies on `pass === 0` (`:4160`), `scopes[0]` (`:4040`), or `hosts[0]` (`:4070`).
  - `settings` maps each other setting to the one context it changes.
  - `units`, `functions`, and `keywords` map each term the model decides to the readings that vary its context. A reading is named by its `settings` key, or by `parent` for the parent reading. An empty list means the term reads no context.
  - `states` lists the pseudo-classes a built element stands for in its resting state.
  - Every member is one word.
- **Added: `RESOLVER_MODEL`**, the constant of that type. It retires `RESOLVER_SETTINGS` (`:858`), `PARENT_VALUES` (`:917`), and `UNVARIED_FUNCTIONS` (`:942`). The denylist becomes the model's absence rule. Each table lists only what real pairs and the proofs read (reading R1), following the minimal-API law.
- **Added: `Indecision`**, carrying `readonly reason: string`.
  - `ValueResolver.resolve` returns `ReadonlyArray<Resolution | Indecision>`. Callers narrow with `'reason' in`, so no guard and no `as`.
  - `classifyValueGaps` and `scanCanonicalValues` append the reason as a final ` | reason` cell on each undecided line.
  - `classifyDeparture` keeps its signature. Its caller passes `undefined` for an `Indecision`.
  - Reason texts name the term: `reads cqw`, `branches over font and root`, `matches no element for .card:has(> span)`, `places the target in light and dark`, `types through no probe`, `varies no parent for font-feature-settings`.
- **Added: `scanUndecidedTerms(recorded: string, emitted: string): readonly string[]`**, following `scan*` = walks and returns findings. It walks both substituted values with the existing `walkSelector` and `readIdentifier` walkers (`tests/setupStyles.ts:392`, `:435`), so it adds no parser. It returns:
  - each unit and function either side reads that the model does not map;
  - each keyword one side reads and the other does not, where the model does not map it;
  - each `min()`, `max()`, or `clamp()` whose arguments read more than one reading.
- **Changed: `inferScopeMode` becomes `collectSelectorModes(selector): readonly string[]`.** It returns the modes the selector's ancestry pins, one per alternative that pins one, or an empty list where none does. This settles the design note that the helper "returns a mode, not a scope". The resolver answers `Indecision` where the list holds more than one mode. The canonical scan reads an empty list as "applies in each mode".
- **Changed: `extractMatchedCompound`.** It leaves out only pseudo-elements and the pseudo-classes under `RESOLVER_MODEL.states`. It keeps `:not()`, `:has()`, `:is()`, `:where()`, `:root`, and every structural pseudo-class.
  - Exception: a compound that is `:root` alone still writes `*`, because a `:root` site is read on an element inside the page's root.
  - Its example `a:not([href]):not([class])` then returns itself (`tests/setupServer.test.ts:4099`).
- **Changed: `PROBE_SYNTAXES`.** It gains `'<custom-ident>': ['alpha', 'beta']`, ordered after `<color>`. The TSDoc sentence claiming identifier equivalence under `font-family` (`:810-814`) is deleted.
- **Changed TSDoc:**
  - `Resolution` (F1, `:212-222`): "the two values of the first reading the sides compute apart in — the `base` setting, each other setting in order, then the parent reading for a regular property — or the `base` setting's two values where every reading computes alike".
  - `ContextElement` and `collectContextElements`: each pair side builds its elements inside a wrapper of its own, and each element is followed by a sibling of its own.
  - `scanCanonicalValues`: the `inherit` clause is removed.
- **Unchanged:** `ResolverSetting`, `ValuePair`, `ContextElement`, `DepartureLedger`, `classifyDeparture`, `scanWitnesses`.

The guide sentences that replace round 2's false ones (claim 8, plus F-notes):

- **§ Departures preamble, in place of "one per compound and each matching its compound" (`guides/veneer.md:7551`):** "… one per compound. Each element must match its whole compound, a `:not()` or a `:has()` included. It leaves out only the pseudo-elements and the states the `RESOLVER_MODEL` constant lists, such as `:hover` and `:checked`, which it stands for at rest. Each element is followed by a sibling of its own, so a `:not(:last-child)` compound matches. A row whose elements miss their compounds is undecided."
- **§ Departures, in place of the settings sentence and the `env()` sentence (`:7554-7559`, `:7563-7564`):** "The twins compute in every reading the `RESOLVER_MODEL` constant declares:
  - its `base` setting;
  - one setting each that changes the `font` size, the containing `block`, the `color`, the `direction`, the `root` font size, or the `viewport`, and nothing else;
  - for a regular property, a parent that sets the property itself, so an `inherit` reads a second parent value.

  A row whose sides compute apart in any reading is `retuned`, because each reading is a page a reader can open. A row whose sides compute alike in every reading takes a text-only member only where the model maps every unit, function, and keyword either side reads after substitution. A value reading anything else leaves the row undecided, and the gate names the term. Examples: a container unit, an `lh`, a `vmin`, an `ex`, an `env()`, or a `max()` whose arguments read different contexts. Each reading changes one context, so a value is compared at the declared value of each context and not at every value between or beyond them."
- **§ Departures, custom-property sentence (`:7567-7569`):** "… a registered syntax such as `<length-percentage>+`, `<color>`, or `<custom-ident>`, which keeps an identifier's case, and after every syntax, a standard property such as `box-shadow` or `font-family`, which reads a comma list of names as a font stack."
- **§ Departures, witness sentence (`:7591-7593`):** "… and whose release value the token alone resolves to at the row's site. The row's own arithmetic plays no part. A row writing `calc(var(--vn-radius-pill) * 1.25)` witnesses nothing where the token alone resolves elsewhere. A row writing `calc(var(--vn-container-sm) * 1)` witnesses its token where the token alone resolves to the release value."
- **§ Reference map preamble (`:7040-7043`):** "… through the `scanCanonicalValues` function, at every declaration of the token in each mode that declaration applies in.
  - A `:root` declaration applies in the light mode even where the `[data-bs-theme=light]` scope also declares the token. It applies in the dark mode where the dark scope does not declare the token.
  - A declaration inside a mode scope applies in that mode, and any other declaration applies in both modes.
  - A declaration whose `:is()` or `:where()` alternatives place it in more than one mode is undecided, and the gate names it."
- **§ Reference map comparison paragraph (`:7060-7061`), and the same sentence in the `scanCanonicalValues` TSDoc (`:4382-4383`):** "A stated value and a declaration that both resolve to nothing, as an `initial` does, compare as the text they write."
- **§ Outside the ledger (`:10618-10621`):** "The `scanCanonicalValues` function resolves every declaration of a `--vn-*` token against its § Reference map cell in each mode the declaration applies in. That covers any selector or condition, and a `:root` declaration that a mode scope redeclares. The function names a declaration whose selector places it in more than one mode undecided. …"

**Carrier (Units).** LEDGER-RETUNE round 3 implements this ruling:
- **Writer:** `opus` on Opus 5.5, native, the sole writer in `/home/user/veneer-lret`. Chromium launches from a vitest worker, a grandchild process that a bench sandbox denies (`ledger-values-design-verdict.md:90-92`).
- **Owned files:** the four files the brief names.
- **Depends on:** readings R1 to R5, which fix the model tables and the Tension rulings before its brief is written.
- **Acceptance:** Proofs P1 to P11 each fail with an `AssertionError` under their mutation and pass when restored. After `npm run build:src`, `npm run test:conformance` exits 0 with no member drift beyond what R6 and R7 rule. `test:guides` and `test:policy` pass.
- **Audit:** `analyst` on GPT-6 Astra (objective lane, an engine that did not write the unit), `reviewer` on Opus 5.5 (subjective lane), and `checker` for guide-row parity.

## Rulings

**Q1: the claim.** Bound the claim to the declared model. Do not widen.
- **Refused: widening the settings** (container, line-height, portrait, font family, joint changes). Each widening admits the next context nobody varied. The audit record shows this seam recurring through a new input every round (`lret-audit-2-verdict.md` § The seam).
- **Refused: extending the `UNVARIED_FUNCTIONS` denylist** to units and keywords. It fails open, which is the same chase.

The round-2 inputs, one by one:
- **Container units** (`cqw`, `cqh`, `cqi`, `cqb`, `cqmin`, `cqmax`): outside the model, because no reading establishes a query container. Undecided when alike, with the reason naming the unit. No real pair reads one (`reachability.txt:4`). Neither the built cascade nor the release sheet writes one: a grep over `dist/src/styles/index.css` and `node_modules/bootstrap/dist/css/bootstrap.css` matches only the `.lh` class names.
- **`lh` and `rlh`:** outside, because no reading varies a line height. The reachability hit is a false match: the pattern `[0-9.]r?lh\b` (`reachability.txt:5`) matches the selector `.lh-base`. The pair itself, `1.5` against `var(--vn-line-body)` (`:23`), reads no `lh`, and `--vn-line-body` is `1.5` in the built cascade. So `lh` is unreached.
- **`vmin` and `vmax`:** outside, because every viewport reading is landscape, so orientation is never varied. `sv*`, `lv*`, `dv*`, `vi`, and `vb` are also outside. All unreached (`reachability.txt:6`).
- **`ex` and `ch`** (also `cap`, `ic`, `rex`, `rch`): outside, because no reading varies the font family's metrics. `1ex` against `0.5em` stays decided apart by rule 2. Unreached (`:7`).
- **`min()` and `max()` over terms that read different readings:** outside. Undecided when alike, with the reason naming both readings.
  - A branch whose arguments read a single reading is inside the model.
  - Every real `max()` reads the root size alone inside the branch, for example `max(var(--vn-size-3) * 0.9 - 1.125rem, 0px)` (`reachability.txt:27-51`). So every real `max()` pair is decided: apart pairs by their witnessing reading, alike pairs by the readings.
  - The alike ones are `fs` `.fs-6`, `h6` `.h6`, and `reboot` `h6`, whose release value is `1rem` (`:38`, `:44`, `:50`). With `--vn-size-3: 1rem` in the built cascade, the branch is `max(-0.225rem, 0px)`, which is `0px` at every nonnegative root size. By that arithmetic the rows are alike everywhere. Reading R3 confirms it.
  - No real pair writes `min()` or `clamp()` (`reachability.txt:54-56`).
- **`:not()` and `:has()`:** kept in the match (Q3). `:has()` then fails the match and the pair is undecided. Unreached.
- **A custom-property identifier that differs only in case:** decided apart through the restored `<custom-ident>` probe (Q5).
- **Custom-property `currentColor`:** inside the model. The `keywords` table maps `currentcolor` to `color`, and the color setting's host color reaches the probe twin. Decided (reading R10). The real regular-property pair `hr` `border-top` (`reachability.txt:24`) is decided alike: the release's colorless `1px solid` takes `currentcolor` as its initial color, so both sides compute alike under the color setting too.

**Q2: the constraint.** See **Constraint**.
- The ruled model decides every real pair `reachability.txt` lists under `:not(`, `lh`, `currentColor`, and `max(`, each with the reason Q1 or Q3 states.
- The model never gates an apart reading, so the gate's apart decisions are unaffected.
- A future row outside the model fails the gate's undecided cases, named by term. The unit that brings that row widens the model.

**Q3: selector construction.** Each built element must match its full compound, `:not()` included, apart from pseudo-elements and the `states` pseudo-classes. `states` holds the user-action, form, and validity states the real selectors use (`selectors.txt`): `:hover`, `:focus`, `:focus-visible`, `:active`, `:checked`, `:indeterminate`, `:disabled`, `:valid`, `:invalid`, `:-webkit-autofill`.

The structure is fixed so the match check reads the same whatever the batch holds:
- Each pair side builds its elements inside a wrapper of its own. Today every item's first element is appended to `body`, so items are siblings across the batch (`tests/setupServer.ts:4203-4218`). A `:last-child` check therefore depends on batch order.
- Each element is followed by a sibling of its own.

A miss is undecided (`:4213`). The real `:not()` rows, all decided, with unchanged substitution because their values read `:root` tokens:
- `.form-floating > .form-control:not(:placeholder-shown)`, `padding-top` and `padding-bottom`: a `div` is never `:placeholder-shown`, so the element matches.
- `.form-floating > .form-control-plaintext:not(:placeholder-shown)`, `padding-top` and `padding-bottom`: same reason.
- `.form-floating > textarea:not(:placeholder-shown) ~ label::after`, `inset`: a `textarea` without a `placeholder` attribute is never `:placeholder-shown`, the `label` sits beside it, and `::after` is left out.
- `.form-select[size]:not([size="1"])`, `padding-right`: the element carries `size=""`, which matches `[size]` and not `[size="1"]`.
- `.list-inline-item:not(:last-child)`, `margin-right`: it matches only because of the trailing sibling. Built as a last child, it would be undecided and redden the gate.

**Q4: the canonical scan.** It compares every declaration of a canonical token as its own site.

The sites and the modes each is compared in:
- **The `:root` declaration:** compared with the light cell, whether or not `[data-bs-theme=light]` redeclares the token. It is also compared with the dark cell where the dark scope does not declare the token (`declared.get(dark) ?? root`, as at `:4424`). Today the `light ?? root` choice drops it (`:4410-4418`, `:4429`).
- **Declarations in `[data-bs-theme=light]` and `[data-bs-theme=dark]`:** compared with their own cells.
- **Any other site:** compared in each mode `collectSelectorModes` returns, or in each mode where it returns an empty list. A dark reading is built with the `[data-bs-theme=dark]` prefix, as today (`:4437`). A selector that returns more than one mode is undecided.

Which shapes occur in the shipped cascade (grep over the minified `dist/src/styles/index.css`; the scan reads the unminified compile, so reading R5 confirms):
- **`:root` redeclared by `[data-bs-theme=light]`: occurs.** `--vn-color-primary-base` is declared in the `:root`, `[data-bs-theme=light]`, and `[data-bs-theme=dark]` rules.
- **A selector naming both modes in one `:is()`: does not occur.** There is no `:is(` and no `:has(`.
- **Other shapes present:**
  - `:where(button.dropdown-item)` and the other single-compound `:where(button.…)` forms;
  - `:where(button.carousel-control-prev,button.carousel-control-next)`, which pins no mode;
  - `:where(.carousel-indicators [data-bs-target])`, a complex alternative the builder cannot build, so it is undecided if it declares a canonical token;
  - `.navbar-dark,.navbar[data-bs-theme=dark]`, split into one block per selector, where the target pins dark itself;
  - `[data-bs-theme=dark] .form-switch .form-check-input:not(:checked):not(:focus)`, in dark mode, where a resting element matches;
  - `[data-bs-theme=dark] .form-select`, `[data-bs-theme=dark] .navbar-toggler-icon`, and `[data-bs-theme=dark] .accordion-button:after`.
- **No `--vn-*` declaration sits under an at-rule.** The grep `@(media|supports)[^{]*\{[^{}]*\{[^}]*[{;]--vn-[a-z0-9-]+:` returned nothing. Its bound: one rule, nested one level inside the at-rule.

**Q5: the probe syntaxes.** `<custom-ident>` returns to `PROBE_SYNTAXES`, ordered after `<color>`.
- Chromium 141 keeps case under `<custom-ident>` and folds generic families under `font-family` (`custom-ident.log.txt:1-6`). A single identifier in a custom property is case-sensitive by CSS, so the engine's own identifier type is the faithful reading. `SERIF` against `serif` then reads apart.
- Placing it after `<color>` keeps `red` against `RED` alike through `<color>`, because color keywords are case-insensitive.
- A comma list of names is read as a font stack under `font-family`, and the guide says so.

I prefer this to making the pair undecided: the engine answers the question, so the model has no reason to refuse it.

**Q6: the interface.** See **Interface**.

**Q7: the proofs.** See **Proofs**.

## Proofs

Each case lives in `describe('ValueResolver')` in `tests/setupServer.test.ts` unless another place is named. Each mutation must fail its case with an `AssertionError`.

| Rule | Case (named for what it proves) | Mutation that must fail it |
| --- | --- | --- |
| P1 coverage gates alike | "leaves undecided a pair alike in every reading that reads a term outside the model, naming the term". Pairs: `width` `1cqw`/`1vw`, `margin-left` `1lh`/`1rlh`, `margin-left` `1vmin`/`1vh`, `--vn-sample` `calc(2 * 1ex)`/`calc(1ex + 1ex)` | M1: skip `scanUndecidedTerms`. `cqw` reads `{12.7969px, 12.7969px}` |
| P2 apart is never gated | Same case, with control `width` `1ex`/`0.5em` expected as `{ recorded: '7.34375px', emitted: '8px' }` | M2: gate apart readings too. The control becomes an `Indecision` |
| P3 branches over more than one reading | "leaves a branch over different contexts undecided, and decides a branch over one". `margin-left` `max(0px, min(1em - 16px, 1rem - 16px))`/`0px` expects an `Indecision` naming `font` and `root`. `font-size` `calc(1rem - max(1rem * 0.9 - 1.125rem, 0px) * (1 - 100vw / 1200px))`/`1rem` expects `{16px, 16px}` | M3: drop the branch rule, so the first pair reads alike. M4: treat every branch as undecided, so the second pair turns undecided. M4 guards against over-correction |
| P4 full-compound match | The emitted sheet gains `.list-inline-item:not(:last-child) { --vn-sample-not: 4px }` and `.card:has(> span) { --vn-sample-has: 5px }`. `padding-top` `4px`/`var(--vn-sample-not)` resolves `{4px, 4px}`, placed both first and last in one batch. `5px`/`var(--vn-sample-has)` expects an `Indecision` naming the compound. The `extractMatchedCompound` expectations update | M5: restore the dropping of `:not()` and `:has()`, so the `:has()` pair resolves. M6: omit the trailing sibling, so the `:not()` pair turns undecided. M7: append items to `body` with no wrapper, so the last-in-batch copy reads differently |
| P5 modes per alternative | `collectSelectorModes` returns `['light', 'dark']` for `:is([data-bs-theme=light], [data-bs-theme=dark]) .btn`, `['dark']` for `[data-bs-theme=dark] > .btn`, and `[]` for `[data-bs-theme=dark] + .btn`. The resolver returns an `Indecision` for the first selector | M8: take the first alternative's mode |
| P6 canonical `:root` and multi-mode sites | The canonical sheet declares `:root { --vn-sample: red }` with `blue` in both mode scopes and cells of `blue`. It expects a line naming `:root` against the light cell, plus undecided lines for an `:is()` site naming both modes | M9: skip `:root` when the light scope redeclares (the round-2 behavior). M10: read one mode for the `:is()` site |
| P7 case-sensitive identifiers | Probe-syntax case (F2 retitle: "decides through each probe syntax a pair no other probe decides the same way"). `<custom-ident>`: `SERIF`/`serif` expects `{SERIF, serif}`. Control: `red`/`RED` expects `rgb(255, 0, 0)` on both sides | M11: remove `<custom-ident>`, so the first reads alike. M12: order `<custom-ident>` before `<color>`, so the control reads apart |
| P8 model pin | Every reading a term table names is a `settings` key or `parent`. Every `settings` key is named by some term. Each setting changes one context against `base`. Each unit's list equals the readings that change `1<unit>` on `margin-left` and on `font-size`, measured in Chromium | M13: add `settings.joint`, which changes font and root. M14: map `rem` to `font` |
| P9 `base` by name | Existing contexts case: `0.5em`/`calc(1em / 2)` reads `8px` | M15: read `settings.font` as `base`, so it reads `10px` |
| P10 custom-property `currentColor` | `--vn-sample` `currentColor`/`#000` resolves apart | M16: drop the `color` setting (P8 also fails) |
| P11 reasons on the record | The conformance `undecided` plant and the `names each pair the resolver cannot decide` case expect lines ending in their reason | M17: drop the reason cell |

The `parents` list carries round 2's R3 finding: no retained case binds a parent value other than `1px`. Keep only the entries a real inheriting pair or a proof uses (reading R1). Give each kept entry a pair only it decides. The mutation "drop the entry" turns that pair undecided.

## Readings the Orchestrator must run

Run each through the unit's resolver at `23b659b` in Chromium 141, the way `referrals.probe.test.ts` does, unless another place is named.

- **R1, term census.** For every pair the departure, repaint, canonical, and witness scans resolve, print both substituted values, then every unit, function name, and identifier in them, and the parent value each inheriting pair used.
  - Expected units: `px`, `rem`, `em`, `%`, `vw`, and time or angle units only.
  - Expected functions: `calc`, `max`, `rgb`/`rgba`, `color`, `color-mix`, `oklch`, `linear-gradient`, `cubic-bezier`, and `url`, and no `attr`, `env`, or `counter` in any pair.
  - The identifiers present on one side only decide Tension T2.
- **R2, the `lh` reach.** The substituted `line-height` pair at `.lh-base` is `1.5` against `1.5`, and no `lh` unit appears on either side.
- **R3, `max()` rows.** Each branch's substituted arguments read `rem` alone.
  - Resolve the `fs` `.fs-6`, `h6` `.h6`, and `reboot` `h6` pairs under root sizes `8px`, `12px`, and `40px`, and viewports `400×800` and `1920×1080`. Expected alike at each.
- **R4, the `:not()` rows under full-compound matching with a trailing sibling.** Every row listed at `reachability.txt:16-22` is decided with an unchanged member.
  - `.list-inline-item:not(:last-child)` reads alike whether it is resolved first or last in a batch.
- **R5, canonical shapes.** Over `readCascadeBlocks(compileExpandedCascade())`, list:
  - every token both `:root` and `[data-bs-theme=light]` declare, with whether the `:root` value resolves to the light cell (expected equal for each; a difference is a real finding);
  - every canonical-token block whose selector returns more than one mode (expected none);
  - whether `:where(.carousel-indicators [data-bs-target])` declares a canonical token (expected no).
- **R6, restored `<custom-ident>`.**
  - Gate member drift: expected none.
  - `--vn-sample` pairs: `SERIF`/`serif` apart, `Monospace`/`monospace` apart, `red`/`RED` alike, and the control `serif`/`monospace` apart.
- **R7, unscoped departure pairs in dark mode.** Resolve every real pair whose selector pins no mode a second time under a `[data-bs-theme=dark] ` prefix. List each pair whose dark reading differs from its light one. Expected: unknown. This decides Tension T4.
- **R8, state-keyed variables.** List every custom-property declaration in either sheet under a selector carrying a `states` pseudo-class. Then list every real pair at a site naming that state whose substituted value reads that property. Expected empty. If so, the guide documents the limit.
- **R9, conditions.** List every real pair under an at-rule condition whose member is `retuned` only through a setting the condition excludes. An example is the `800×600` viewport reading under `(width>=1200px)`. Expected none.
- **R10, custom-property `currentColor`.** `--vn-sample` `currentColor` against `#000`: expected apart. `currentColor` against `currentcolor`: expected alike.

## Risks

Tensions for the objective lane, or for the Orchestrator to rule:

- **T1, the sampling limit.** A branch over a single reading, and a product across readings (the `max(…) * (1 - 100vw / 1200px)` rows), are decided by the readings, not proven.
  - A crafted `max(1rem - 25px, 0px)` against `0px` reads alike at root `16px` and `20px`, but not at `30px`.
  - The sound alternative: take a single-reading branch's winner from the sign of its argument difference, extrapolated from the base reading and the setting reading to root `0` and to root sizes without bound; call it undecided where the sign can flip.
  - I chose the documented limit because R3 shows every reached branch is sign-definite. The objective lane rules whether the sound rule is required.
- **T2, keywords fail open.** Only the context keywords (`currentcolor`, the CSS-wide keywords, the direction keywords) and the keywords R1 finds on one side only are mapped.
  - An absolute-size keyword such as `medium` against `16px` reads alike, because no reading varies the reader's default font size.
  - The alternative is a full allowlist of every identifier that differs between the sides. Choose it if R1's list is short.
- **T3, `Indecision` churn.** Every `undefined` expectation for `resolve` and every undecided line changes. The gain: each proof binds the rule it proves, and the gate tells the widening unit which term to add.
- **T4, unscoped pairs in dark mode.** The departure resolver reads an unscoped pair in light mode only. The case at `tests/setupServer.test.ts:3747` pins `light-dark(#fff, #000)` as `restated`. The canonical scan reads the same kind of site in both modes. Aligning them follows "one concept, one term", but it can move rows. If R7 shows drift, it is a rescope, and a rescope needs the user.
- **T5, `<custom-ident>` apart against undecided (Q5).** I rule apart. The rival reading: a case-only difference is invisible to a `font-family` consumer.
- **T6, states.** A variable declared only under a state is not read at a site naming that state (R8).
- **T7, conditions.** The readings ignore the pair's at-rule condition (R9).
- **T8, the parser law.** `scanUndecidedTerms` walks Chromium's serialization with the existing selector walker. The objective lane rules whether that counts as "a second parser" under `AGENTS.md` § Project model. The Typed OM alternative reifies `box-shadow` and colors poorly in Chromium, so it would make real pairs undecided.

Design-fit risks:

- **A fifth round finds a false alike through a fail-open part** (T1, T2, T6, T7). What settles it: R3, R8, and R9 empty, each limit stated in the guide, and an executed case beside each stated limit per `.claude/rules/documentation.md`.
- **The model tables grow into a second vocabulary nobody reads.** What settles it: P8 measures each unit's list in Chromium rather than asserting it, and the tables hold only what R1 and the proofs use.
- **The guide's § Departures preamble gets longer again.** Round 2's reviewer already found it hard to scan (`lret-audit-2-subjective-verdict.md`, voice note 1). Split it into three paragraphs: the mechanism, the readings and model with the row rationales, and the site and probe rules.

Files that matter: `/home/user/veneer-lret/tests/setupServer.ts`, `/home/user/veneer-lret/tests/setupServer.test.ts`, `/home/user/veneer-lret/tests/conformance.test.ts`, `/home/user/veneer-lret/guides/veneer.md`, `/home/user/scaffold/.orkestrel/veneer/units/lret-instruments/audit-2-probe/reachability.txt`, `/home/user/scaffold/.orkestrel/veneer/units/lret-audit-2-verdict.md`.
