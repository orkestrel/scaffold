## Invariant

Adopt a bounded declaration-value model.

A resolution is **alike** only when the selector context and value expressions belong to that model, substitution succeeds, and the normalized Chromium readings agree under every declared setting and applicable parent reading. A supported pair is **apart** when a reading differs. An unsupported or incomplete comparison is **undecided**, even when an incidental reading agrees.

The model compares declared values at default factors. It does not establish equivalence under arbitrary consumer overrides, every combination of context settings, or every browser state. At-rule conditions identify declaration sites; the comparison does not prove when those rules activate.

Admission precedes the same-text shortcut. Identical substituted text cannot bypass an unsupported selector, unit, function, or dependency combination.

A mutation that admits `width: 1cqw` against `1vw` must fail the case requiring an undecided result. The supplied `referrals.log.txt` shows why equality from the existing construction is insufficient.

## Constraint

Retain the measured and repainted undecided gates. A future row outside the model fails those gates, names its pair, and requires the introducing unit to widen the model with a distinguishing proof. Do not change a departure member, suppress a row, or add an exception to clear that failure.

Retain the existing context settings. Support the responsive font-size expression the shipped rows use without introducing arbitrary context combinations or a symbolic CSS equivalence engine.

The following real pairs are decided under this ruling. “Decided” states the required outcome after implementation; the requested Chromium readings remain acceptance evidence.

| Real pair from `reachability.txt` | Decision and reason |
|---|---|
| `.form-floating > .form-control:not(:placeholder-shown)`, `padding-top`: `1.625rem` against `calc(var(--vn-space-8) * 1.625)` | Alike. Preserve the negation and use the default density factor. |
| Same selector, `padding-bottom`: `0.625rem` against `var(--vn-space-5)` | Alike. The token supplies the same rem length. |
| `.form-floating > .form-control-plaintext:not(:placeholder-shown)`, `padding-top`: `1.625rem` against `calc(var(--vn-space-8) * 1.625)` | Alike, with the negation preserved. |
| Same selector, `padding-bottom`: `0.625rem` against `var(--vn-space-5)` | Alike. |
| `.form-floating > textarea:not(:placeholder-shown) ~ label::after`, `inset`: `1rem 0.375rem` against `var(--vn-space-8) var(--vn-space-3)` | Alike. Preserve the textarea predicate and sibling relationship. The pseudo-element projection is permitted only because the referenced spacing tokens do not depend on it. |
| `.form-select[size]:not([size="1"])`, `padding-right`: `0.75rem` against `var(--vn-space-6)` | Alike. Build a matching attribute value, such as `size="2"`. |
| `.list-inline-item:not(:last-child)`, `margin-right`: `0.5rem` against `var(--vn-space-4)` | Alike. Supply an explicit following sibling and verify the predicate. |
| `.lh-base`, `line-height`: `1.5` against `var(--vn-line-body)` | Alike. This is a unitless number comparison. The logged `lh` hit names the class; neither value contains an `lh` unit. |
| `hr`, `border-top`: `var(--bs-border-width) solid` against `var(--bs-border-width) solid currentColor` | Alike. Read the regular shorthand under the declared color settings, including its implicit color. |

Every `max()` pair in the log uses the responsive expression described in the Claim ruling. Its branch reads the root size; its outer expression also reads viewport width. The required decisions are as follows.

| Component and selectors, on `font-size` | Decision |
|---|---|
| `display`: `.display-1`, `.display-2`, `.display-3`, `.display-4`, `.display-5`, `.display-6` | Apart. The root reading distinguishes the responsive expressions. |
| `fs`: `.fs-1`, `.fs-2`, `.fs-3`, `.fs-4`, `.fs-5` | Apart. The emitted size tokens differ from the release values. |
| `fs`: `.fs-6` | Alike. Its token is `1rem`, and the supported `max()` branch contributes zero. |
| `h1`: `.h1`; `h2`: `.h2`; `h3`: `.h3`; `h4`: `.h4`; `h5`: `.h5` | Apart, for the corresponding size-token differences. |
| `h6`: `.h6` | Alike, for the same reason as `.fs-6`. |
| `reboot`: `h1`, `h2`, `h3`, `h4`, `h5` | Apart, for the corresponding size-token differences. |
| `reboot`: `h6` | Alike. |
| `reboot`: `legend` | Apart. The root reading distinguishes the viewport-dependent expressions. |

## Interface

Keep the resolver’s result protocol. `undefined` already means undecided, and the classifier already reports that result without assigning a departure.

Make the following exported contract changes in `tests/setupServer.ts`.

| Export | Contract |
|---|---|
| `ResolverScenario` | Add the union `'base' \| 'font' \| 'block' \| 'color' \| 'direction' \| 'root' \| 'viewport'`. |
| `RESOLVER_SETTINGS` | Type as `Readonly<Record<ResolverScenario, ResolverSetting>>`. Select `base` by name. Neither parent readings nor the same-text shortcut may depend on insertion order. |
| `ResolverMode` | Add the union `'light' \| 'dark'`. |
| `ValuePair` | Add `readonly mode?: ResolverMode`. An explicit mode lets the canonical scan compare an unchanged site in its required mode. Include it in the resolution cache key. |
| `Resolution` | Keep `recorded` and `emitted`. Document admission, normalization, the distinguishing setting or parent reading, and the named base reading when all readings agree. |
| `extractMatchedCompound` | Return `string \| undefined`. Preserve supported negations. Return `undefined` for unsupported structure instead of erasing it. |
| `collectContextElements` | Return `readonly ContextElement[] \| undefined`. Unsupported selector structure produces no construction. |
| `ContextElement` | Retain the existing shape. Define `compound` as the admitted selector projection, including supported negations. Document the special handling of the actual document root. |
| `inferSelectorMode` | Replace `inferScopeMode`; return `ResolverMode \| undefined`. Infer only from an admitted target ancestry. An unsupported selector must be rejected before an absent mode can mean the default. |
| `supportsValueContext` | Add `(property: string, values: readonly string[]) => boolean`. Check the admitted units, functions, keywords, and expression combinations after substitution, with corresponding checks on the declarations supplying dependencies. |
| `RESOLVER_UNITS`, `RESOLVER_FUNCTIONS` | Add frozen readonly admission lists. Unknown context-bearing syntax is unsupported. Replace the incomplete exclusion-only role of `UNVARIED_FUNCTIONS`. |
| `scanCanonicalValues` | Keep its signature. Change site enumeration and pass explicit modes without rewriting diagnostic site identity. |

Use the existing selector walkers, value-name collector, PostCSS reader, and Chromium parser. Keep construction and browser orchestration in `ValueResolver`. The installed `@orkestrel/test` declarations supply recorders, scratch resources, DOM construction, and style readers; they do not supply this ledger-specific admission or canonical-site comparison. Do not duplicate those primitives.

Replace the false guide claims with these sentences.

**Departures preamble:**

> The resolver compares declared values within a bounded context model at the default factors. It preserves the supported selector structure, including negations, and verifies the completed construction before substituting variables. It can project a state or pseudo-element onto its originating element only when that projection cannot change the variables the pair reads.

> A supported pair compares alike when its normalized Chromium readings agree under the `base`, `font`, `block`, `color`, `direction`, `root`, and `viewport` settings and the applicable parent reading. This comparison does not establish equivalence under arbitrary consumer overrides or combinations of settings. Unsupported syntax or context is undecided and fails the ledger gate.

**Departures legend:**

> A witness reads the token in a row that is neither `retuned` nor `dropped`, and the token alone must resolve alike to that row’s release value within the model. Arithmetic that compensates for a different token value cannot establish a witness. Identity arithmetic can.

**Reference map preamble:**

> The canonical scan compares each mapped token’s declaration at every supported site with the applicable reference cell. It checks the root declaration against the light cell independently of a light-scope redeclaration. Explicit mode scopes use their own cells; an unscoped component site uses each mode. Unsupported sites remain visible as undecided comparisons and fail the gate.

**Reference map comparison paragraph:**

> When a declaration and its reference cell each resolve empty, the scan compares their written text. An `inherit` value reads its parent’s custom property and is empty only when that inheritance supplies no value.

**Outside the ledger:**

> Canonical tokens sit outside the departure rows and inside the gate. The canonical scan applies the site and mode rules stated in the Reference map, and reports unsupported comparisons as undecided.

## Rulings

**Claim.** Bound the claim; do not keep adding settings in pursuit of every consumer context.

The admitted numeric model retains absolute units, numbers, percentages, `em`, `rem`, `vw`, and `vh`, with Chromium interpreting them under the declared settings. It retains supported color, image, shadow, font-stack, and easing forms through the existing typed comparison mechanism. Quoted strings and resource addresses remain literal content.

Rule the disputed inputs as follows.

| Input | Ruling |
|---|---|
| Container units | Undecided. The model establishes no query container. |
| `lh`, `rlh` | Undecided. Font-size variation does not supply independently controlled local and root line heights. |
| `vmin`, `vmax` | Undecided. The declared viewports do not model orientation changes. Small, large, dynamic, and logical viewport units remain outside the model. |
| `ex`, `ch` | Undecided. The model does not vary font metrics. The measured difference for `1ex` against `0.5em` does not establish general support. |
| `min()` and `clamp()` | Undecided until a real row requires them. |
| `max()` | Admit the shipped responsive expression. After substitution, its branch has the form `max(S * 0.9 - 1.125rem, 0px)`, where `S` is the row’s fixed rem size. Its surrounding expression is `calc(S - max(...) * (1 - 100vw / 1200px))`. Do not admit arbitrary mixed-context branching from this case. |
| Mixed-setting expressions | Undecided unless their combination is expressly admitted. In particular, reject `max(0px, min(1em - 16px, 1rem - 16px))` and unrelated products whose effect requires simultaneous font and root changes. |
| `:not()` | Preserve and satisfy the supported predicates. Unsupported negations are undecided. |
| `:has()` | Undecided. No shipped pair requires relationship construction for it. |
| Case-distinct custom-property identifiers | Preserve the distinction through `<custom-ident>`. Regular `font-family` retains its own keyword semantics. |
| Custom-property `currentColor` | Admit as a color dependency only through a reading that actually resolves the contextual color. If the registered probe retains the keyword, use a color-consuming property such as `background-color` after color admission. An unresolved keyword string is insufficient evidence. |

Check dependency declarations as well as the final substituted value. Otherwise a registered custom property could consume an unsupported contextual term before the admission check examines it.

Evidence: `tests/setupServer.ts:858`, `:942`, `:3995`, `:4102`; `referrals.log.txt`; `custom-ident.log.txt`; `reachability.txt`.

**Constraint.** The real-pair tables in this proposal fix the required population. Preserve the existing measured and repaint assertions, canonical failures, and token-alone witnesses. A model restriction is acceptable only when this population remains decided.

The `lh` exclusion leaves the logged `.lh-base` pair supported. The restricted responsive expression leaves every logged `max()` pair supported. No container, font-metric, mixed-mode `:is()`, or `:has()` implementation is required to close this round.

Evidence: `tests/conformance.test.ts:266`, `:270`, `:314`; `tests/setupServer.ts:4324`, `:4493`; `reachability.txt`. The declaration-value inspection of `dist/src/styles/index.css:1` confirms `--vn-line-body: 1.5`.

**Selector construction.** Do not require an ordinary element to match a pseudo-element selector. Require each constructed element to match its retained compound and the target to match the completed structural selector. Preserve `:not()`.

Permit a state or pseudo-element projection only when the referenced custom properties, including their transitive dependencies, cannot acquire a different value through the omitted predicate. Otherwise return undecided. This prevents the existing unconditional stripping from becoming the declared boundary.

Build each pair in an isolated construction. Append required relatives before checking matches. For `.list-inline-item:not(:last-child)`, append an explicit following element; do not let another pair in the batch accidentally satisfy the predicate.

For the floating-control rows, construct elements satisfying `:not(:placeholder-shown)`. Preserve the textarea-to-label sibling relationship. For the select row, supply a value satisfying `[size]:not([size="1"])`.

Treat `:root` as the document element. A descendant substitute cannot establish root inheritance semantics.

Evidence: `tests/setupServer.ts:3627`, `:3694`, `:4213`; `tests/setupServer.test.ts:4089`; the negation rows in `reachability.txt`. The shipped selectors also include state and vendor pseudo-element forms, so unrestricted full-selector matching in Chromium would over-correct the declaration-value gate.

**Canonical scan.** Enumerate declarations before selecting comparisons.

- Compare every root declaration represented by the cascade reader with the light cell, even when an explicit light scope redeclares the token.
- Compare explicit light and dark declarations with their corresponding cells.
- When the dark scope provides no declaration, compare the root fallback in dark context with the dark cell.
- Compare an unscoped component declaration in light and dark contexts.
- Preserve the original selector and condition in diagnostics.
- Report unsupported selector or dependency contexts as undecided. Do not omit them.
- Keep the cascade reader’s declaration granularity explicit: it retains the last declaration of a property within a rule. Do not claim inspection of every overwritten declaration token.

Reject a selector naming alternative modes inside `:is()` as undecided in this round. Choosing its first alternative is forbidden. A future row requiring that shape must add mode enumeration and its proofs.

The shipped canonical sites are `:root`, `[data-bs-theme=light]`, and `[data-bs-theme=dark]`, under the theme layer. Root/light redeclaration occurs. The shipped cascade contains `:not()` and `:where()`, but no `:is()` or `:has()`. Canonical declarations under component selectors or non-layer conditions do not occur in this artifact.

Evidence: `tests/setupServer.ts:2265`, `:4391`, `:4410`, `:4429`; `dist/src/styles/index.css:1`. The read-only PostCSS traversal inspected every rule and detected a planted nested multi-mode `:is()` control through the same traversal.

**Probe syntaxes.** Restore `<custom-ident>` after the more specific typed syntaxes and before the `font-family` fallback. Use distinct valid identifier initial values for its acceptance controls.

The ordered probe contract remains a declared interpretation of custom-property values. It does not infer every property in which a consumer might later use those tokens.

Evidence: `tests/setupServer.ts:816`, `:837`, `:4129`; `custom-ident.log.txt` shows `SERIF` and `serif` preserved distinctly by `<custom-ident>` and collapsed by `font-family`. `referrals.log.txt` shows the resolver taking the collapsing path.

**Interface.** Adopt the contracts and replacement sentences specified earlier. Naming the base setting fixes the positional dependency; `inferSelectorMode` names the returned value. Keep admission failure separate from an unscoped selector.

Update the existing export assertions and affected case titles inside the owned test files. Name the syntax case for preserving typed distinctions and detecting refused values; restoring `<custom-ident>` demonstrates that a later probe can decide a pair incorrectly rather than merely refuse it.

Evidence: `tests/setupServer.ts:205`, `:223`, `:3779`, `:4040`, `:4160`; `tests/setupServer.test.ts:543`, `:662`, `:3897`; `guides/veneer.md:7040`, `:7060`, `:7551`, `:7593`, `:10618`.

**Proofs.** Retain the existing mutation-backed cases and add the cases specified next. Each mutation must leave the test collectable and fail its distinguishing assertion with `AssertionError`. Compilation failure, timeout, and an uncollected case do not prove the rule.

Evidence: `tests/setupServer.test.ts:3937`, `:3982`, `:4222`, `:4300`; `tests/conformance.test.ts:266`, `:270`; `lret-audit-2-verdict.md`, Claim 6.

## Proofs

The following cases bind the added rules.

| Case | Mutation that must produce `AssertionError` |
|---|---|
| Unsupported container, line-height, font-metric, and viewport-relative units return undecided, including when supplied through a variable. | Remove each relevant admission check; assert that a returned resolution violates the expected undecided result. |
| Unsupported syntax cannot pass through the identical-text shortcut. | Move that shortcut ahead of admission. Use identical `1cqw` values and an unsupported selector. |
| Quoted text containing `1cqw`, `env()`, or selector-like text remains literal. | Apply admission matching inside quoted strings or resource addresses. |
| The shipped responsive expression is decided; the mixed font/root `min()` expression is undecided. | Admit arbitrary mixed branches, or refuse every `max()` expression. Separate assertions distinguish the mutations. |
| Negated local-variable declarations are read at matching elements. | Strip `:not()` before construction. Give the negated rule a value different from the root control. |
| A non-final list element reads its negated rule consistently across batch order. | Omit the following sibling, or use neighbouring batch subjects to satisfy the predicate. |
| Projecting a state-dependent variable is refused. | Remove the dependency check. Use a hover-only declaration supplying the variable being compared. |
| Root inheritance differs from descendant inheritance. | Replace the document root with a descendant `div`. Compare `inherit` with `initial` at the root, and with the inherited root value at `.btn`. |
| An unsupported `:has()` or multi-alternative `:is()` site remains undecided. | Erase `:has()` or select only the first `:is()` alternative. |
| Case-distinct custom identifiers remain apart; regular generic font-family keywords remain alike. | Remove `<custom-ident>` or place it after `font-family`. |
| A custom `currentColor` comparison changes with the host color. | Freeze the color context, or compare the unresolved keyword as its final reading. |
| Base and parent readings are independent of settings insertion order. | Select the first setting rather than `RESOLVER_SETTINGS.base`; reorder the settings in the mutation. |
| Explicit modes remain distinct in the resolver cache. | Remove `mode` from the cache key. Resolve the same `light-dark(red, blue)` pair in light and dark modes. |
| A root declaration survives an explicit light redeclaration in the canonical scan. | Replace the root comparison with the light declaration. |
| Root fallback and unscoped component sites receive their required dark comparisons. | Drop the dark comparison or substitute the light context. |
| Empty canonical readings retain written-text differences. | Remove the empty-reading text comparison. |
| Identity arithmetic can witness a token; compensating arithmetic cannot. | Reject every arithmetic row, or substitute the whole row expression for the token-alone reading. |
| Every measured and repainted pair remains accounted for. | Drop undecided results before the existing gate assertions. |

Retain a behavioral case for each `PARENT_VALUES` candidate the implementation needs. A candidate with no distinguishing use must not survive solely because it appears in the list.

## Readings the Orchestrator must run

Run the following through the real resolver after implementation, with the paired mutations.

| Exact input | Expected outcome |
|---|---|
| `.btn`, `width`: `1cqw` against `1vw`; `1ex` against `0.5em`; `1ch` against `0.5em` | Undecided. |
| `.btn`, `margin-left`: `1lh` against `1rlh`; `1vmin` against `1vh`; `1vmax` against `1vw` | Undecided. |
| `.btn`, `margin-left`: `max(0px, min(1em - 16px, 1rem - 16px))` against `0px` | Undecided. A separate browser control with local and root fonts at `20px` must read apart. |
| `.btn`, `width`: `16px` against `1pc`; `1em` against `16px` | Alike for the absolute-unit control; apart for the font-dependent control. |
| `:root`, `--vn-sample`: `SERIF` against `serif`; `Monospace` against `monospace` | Apart. |
| `.btn`, `font-family`: `SERIF` against `serif` | Alike. |
| `.btn`, `--vn-sample`: `currentColor` against `#000` | Equal under a black host, different under `rgb(1, 2, 3)`; the returned resolution is apart. |
| `.card:has(> span)`, `padding-left`: `5px` against `var(--sample)`, with `:root { --sample: 3px } .card:has(> span) { --sample: 5px }` | Undecided. |
| `.list-inline-item:not(:last-child)`, `margin-right`: `5px` against `var(--sample)`, with root `--sample: 3px` and the negated rule declaring `--sample: 5px` | Alike with an explicit following sibling. Removing that construction must fail the case. |
| `.btn:hover`, `padding-left`: `5px` against `var(--sample)`, with root `--sample: 3px` and the hover rule declaring `--sample: 5px` | Undecided if hover is projected. |
| Canonical fixture: root token `red`, explicit light and dark token `blue`, reference cells `blue` | Report the root mismatch. |
| Canonical fixture: root token `red`, light token `red`, dark token `blue`, corresponding reference cells | No mismatch. Do not compare the overridden root value as the dark declaration. |
| Canonical fixture adding `:is([data-bs-theme=light], [data-bs-theme=dark]) .btn { --vn-sample: red }` | Report that site as undecided. |
| Canonical fixture adding `.btn { --vn-sample: red }`, with light cell `red` and dark cell `blue` | Report the dark mismatch. |
| Every real pair listed in the Constraint section, using the exact values in `reachability.txt` | The listed decisions, with no undecided result. |

Also run the complete measured, repainted, canonical, and witness populations. The source review predicts that the bounded model can decide them; only that browser run establishes the result.

## Risks

The proposal rests on source inspection, a read-only structural scan, and the supplied Chromium logs. It does not include executed browser evidence for the proposed changes.

Finite readings can miss differences outside the declared settings. The guide must retain that boundary.

Selector projection requires a conservative dependency check. An uncertain dependency must become undecided rather than inherit the existing unconditional stripping behavior.

A custom property’s probe interpretation can differ from a consumer’s eventual use. The ordered syntax contract must remain explicit.

Matching construction and additional admission checks can change runtime cost. Re-measure the resolver under the recorded contention conditions before changing its timeout.