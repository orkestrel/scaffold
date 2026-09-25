**X-TENETS-STYLES: structure lens verdict (`reviewer`, Opus 5.5, subjective lane)**

**Scope.** This verdict rules claims 1 to 4 of `/home/user/scaffold/.orkestrel/veneer/units/tenets-styles/tenets-styles-audit-claims.md`. It rules them against two tenets in `/home/user/veneer-probe/ROADMAP.md:35-39`: "Give semantic tags useful defaults without inferring components" and "Preserve direct control through classes". This lane is read-only: every reading comes from a file, and no probe was run. Where a verdict rests on a proof's behaviour, that proof is in the tree. The styles suite in `/home/user/scaffold/.orkestrel/veneer/units/eid-landing/eid-land-3.log.txt:8330` ran green (115 files, 1500 tests) with the dot reporter, so the log does not show individual case names.

## Numbered verdicts

**1. No component from tag structure: CONFIRMED.**
- **Attack.** I searched the compiled `/home/user/veneer-probe/dist/src/styles/index.css` for tag-combinator shapes the sweep's regex could miss. Four searches returned nothing:
  - `[{},][a-z][a-z0-9]*[ +~>]+[a-z*][^{};]*\{`, any tag compound followed by a combinator.
  - `[},][a-z]+[+~>][^{}]*\{`, a sibling or child combinator after a tag.
  - `:(is|where|has)\(`, which catches `:is(ul,ol) ul` shapes that `sweep.mjs:23`'s `isTagOnly` cannot see.
  - `:not\(\.` on a tag compound.
- **Tag-only rules outside `reset` and `elements`.** `sweep.mjs:26` exempts `html`, `*`, `:root`, and `::`, so I searched those separately:
  - Compiled: `[},](html|body|\*|::|:root)` finds only `body{` and the `::-webkit-*` and `::file-selector-button` rules.
  - Source: `src/styles/elements/_body.scss:2` and `src/styles/elements/_input.scss:12-38` put those rules in `elements`. `:root` sits only in `_tokens.scss`, `_theme.scss`, and `_reset.scss`. The `*` at `utilities/_visually-hidden.scss:25` is nested under a class.
- **Adjacent behaviour that is correct.** Bootstrap's `ul ul`, `ol ol`, `ol ul`, `ul ol`, and `legend + *` are excluded, with a reason, in `guides/veneer.md:6799-6806`. `tests/src/styles/elements/ul.test.ts:54-56` renders the nested list keeping its margin and `.mb-0` removing it.
- **Coverage bound.** `tests/src/styles/index.test.ts:76-95` scans the `elements` layer only, with a planted `p:not(h1 + p)` control. The rest of the cascade is covered by the compiled searches listed here.

**2. Class scoping on tags: CONFIRMED.**
- **Attack.** A search for `\[class` anywhere in a selector of the compiled cascade covers `[class*=`, `[class^=`, and `[class]` in a non-first `:not()` argument, which the sweep's `/:not\(\[class/` misses.
- **Result.** It matches only `a:not([href]):not([class]),a:not([href]):not([class]):hover` (Bootstrap's own) and the six `button:not([class],[data-bs-target])` rules that E-ID-BUTTON-CASCADE retires.

**3. Important declarations: BROKEN** (the first half holds; the guide half is false).
- **First half, which holds.** The `!important` declarations per layer are `reset` 1, `elements` 1, and `components` 54 (`sweep-0865c67.log.txt:17`). Each has a Bootstrap 5.3.8 twin:
  - `[hidden]` (`src/styles/_reset.scss:7-8`) is at `bootstrap.css:598-599`.
  - The calendar-picker rule (`elements/_input.scss:7-10`) is at `bootstrap.css:482-483`.
  - The swatches (`components/_form-control.scss:184-186`) are at `bootstrap.css:2293-2298`.
  - The navbar-expand collapse and offcanvas rules, 6 infixes × 7 declarations (`components/_navbar.scss:178-198`), are at `bootstrap.css:4080-4330`.
  - The responsive offcanvas panel and body fills, 5 breakpoints × 2 (`components/_offcanvas.scss:119,130`), start at `bootstrap.css:6351-6364`.
- **Second half, which fails.** Two parts of the guide are wrong:
  - **The escape it states is not a consumer's own `!important`.** `guides/veneer.md:3129-3132` says the opposite: "Override an important utility from inside that utility's own layer … an unlayered `!important` of your own leaves the shipped utility in place." `tests/src/styles/tokens.test.ts:574-584` executes this. A later unlayered `.row-gap-1 { row-gap: 2rem !important }` leaves `row-gap` at 4px, and only `@layer utilities { … }` moves it to 32px. Every utility partial has a matching "yields … to no unlayered one" case, for example `utilities/display.test.ts:136`. In Bootstrap 5.3.8, which ships unlayered, that same later rule wins. The contract Veneer ships therefore reverses the recorded ruling at `ROADMAP.md:139-141` ("the important-utility contract is Bootstrap's: state the escape in the guide, a consumer's own `!important`") and at `ROADMAP.md:150-153` ("a consumer overrides one with its own `!important`").
  - **Its list of non-utility important rules is incomplete.** `guides/veneer.md:3099-3102` names only `[hidden]`, the calendar picker, and "the color swatch rules in the `components` layer". It omits the navbar-expand and responsive offcanvas `!important` declarations, which are 52 of the 54 in `components`.
- **Why it matters.** "Every declaration has a twin" was taken to mean "the contract is Bootstrap's". Placing a twin inside a layer changes its priority: for important declarations, an earlier layer wins over a later one, and any layer wins over unlayered rules. So the twin premise does not support that conclusion.
- **What right looks like.** Choose one of these:
  - **(a) Match the ruling.** Emit every `!important` declaration outside the layers, in the release's source order. Keep each rule's normal declarations in their layers (utility `$locals`, the offcanvas `--bs-*` resets). A consumer's later `!important` then wins at equal or higher specificity, as it does in Bootstrap. Then rewrite `guides/veneer.md:3099-3144`, the per-utility "escape inside the utilities layer" sentences, and the "to no unlayered one" cases.
  - **(b) Keep layered importance.** Record it as an explicit incompatibility in § Departures and take it to the user to amend the ruling at `ROADMAP.md:141,151`, as the Bootstrap-compatibility tenet requires.

  Either way, make the sentence at `guides/veneer.md:3099-3102` name every non-utility important rule.

**4. Class control over tag defaults: BROKEN** (the normal-declaration half holds; "every layered rule under an unlayered consumer rule" is false).
- **What holds.**
  - **Layer order.** `src/styles/_tokens.scss:5` declares `theme, reset, base, elements, components, utilities`, and `tests/src/styles/index.test.ts:22-32` reads it from the live sheet. Mutation: swap `elements` and `components` at `_tokens.scss:5`. The `toEqual` then fails, so the case distinguishes it.
  - **A component class over a tag default.** `tests/src/styles/components/quote.test.ts:24-39` renders `blockquote.blockquote` beside a bare `blockquote`. The classed element reads 0px border, 0px padding, and `normal` style; the bare one reads 4px, 16px, and `italic`. Neither side uses `!important`. Mutation: drop the `.blockquote` resets, or order `components` before `elements`. The classed readings then equal the bare ones and the assertions fail, so the case distinguishes it.
  - **A consumer class over a component default.** `tests/src/styles/components/focus-ring.test.ts:186-216` uses a distinct `.consumer:focus` class, and `tests/src/styles/components/stacks.test.ts:71-89` also covers it. Mutation: add `!important` to `.hstack { flex-direction }`. The reading then stays `row` and the assertion fails, so the case distinguishes it. The stacks case also pins the layer membership, so it separates "layered" from "unlayered but earlier".
- **The failing state.** The counterexample is in the tree. `tests/src/styles/components/offcanvas.test.ts:276-309` loads an unlayered `[data-utility="plain"] { background-color: rgb(4, 5, 6) !important }` (specificity 0,1,0, the same as a consumer class) on `.offcanvas-lg`. At 992px the panel resolves `rgba(0, 0, 0, 0)`: the `components`-layer default holds against the consumer's `!important`. In Bootstrap, where `.offcanvas-lg` is also 0,1,0 and earlier, the consumer's rule paints the panel. `guides/veneer.md:5797-5805` records this and says "The ledger records no row for this difference." The utilities show the same inversion (`tokens.test.ts:574-584`), and so does `[hidden]` (`tests/src/styles/reset.test.ts:20-40`, "hides against … unlayered … important paint").
- **Why it matters.** A consumer class cannot override these component defaults by any unlayered means. The only escape is re-opening Veneer's own `components` layer by name. That is exactly the "exceptions to escape" the direct-control tenet refuses (`ROADMAP.md:38-39`).
- **Bound.** Every normal declaration in every layer does sit under an unlayered consumer rule. The break is confined to the 56 `reset`, `elements`, and `components` important declarations and the 1589 `utilities` ones (`sweep-0865c67.log.txt:17`).
- **What right looks like.** The same fix as claim 3, (a) or (b). Under (a), the offcanvas departure at `guides/veneer.md:5797-5805` goes away. Its proof, `offcanvas.test.ts:276-309`, and the reset case at `reset.test.ts:20-40` then flip to Bootstrap's result.

## Findings outside the claims

None. The breaks under this lens's tenets are carried by claims 3 and 4.

## Attacked and held

- **Claim 1.**
  - Attack: `:is()`, `:where()`, and `:has()` wrappers, and tag compounds with pseudo-classes before a combinator. None found in the compiled cascade.
  - Attack: `html`, `body`, and `*` rules outside `elements` and `reset`, which the sweep exempts. None found.
  - Adjacent behaviour that looks like a break and is correct: class-rooted descendant rules such as `.navbar-expand-lg .offcanvas` and `.table > :not(caption) > * > *`. They carry a class, so composition stays explicit.
- **Claim 2.** Attack: a `[class` token outside the first `:not()` argument, and attribute-substring forms. None found.
- **Claim 3.** Adjacent behaviour that is correct: the calendar-picker selector's quoting differs from the release (`[type='date']` against `[type=date]`), but the two are semantically identical.

## Referrals (to the objective lane)

- **`[hidden]` against a later important display utility.** On `<div hidden class="d-flex">`, Bootstrap 5.3.8 resolves `display: flex`: same specificity, and the later rule wins. Veneer resolves `none`, pinned by `tests/src/styles/reset.test.ts:20-40`. `guides/veneer.md:3100-3102` calls the rule "matching Bootstrap's own declaration", and no departure row records the behavioural difference. Rule whether this needs a § Departures row or goes to the user.
- **Fix constraint for option (a).** Moving the `!important` declarations out of their layers interacts with:
  - the Tailwind exclusion line (`guides/veneer.md:3423-3500`, claim 11);
  - the conformance priority case (`guides/veneer.md:3103-3107`);
  - the `R5 Layer by importance` ruling in `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md:61-69`, which places important helpers in `utilities` because of the layer inversion.

  Establish what over-correcting would break before briefing the fix.

VERDICT: FAIL 3, 4; outside the claims: none
