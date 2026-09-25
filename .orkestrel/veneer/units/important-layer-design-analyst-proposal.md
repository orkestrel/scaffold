Adopt **(a), unlayered importance**. Keep normal declarations in their existing layers and emit important declarations in Bootstrap’s order. This restores the consumer override promised by the [roadmap rulings](/home/user/veneer-probe/ROADMAP.md:137) while retaining layered defaults and Tailwind composition.

The consequences below are derived from the inspected source, proofs, and CSS specification. No modified build or browser run was performed in this design lane.

For author stylesheet rules, importance precedes layer order; important layers reverse precedence; specificity and source order decide within a layer. Consequently, an unlayered important declaration beats layered normal declarations but loses to layered important declarations. A later unlayered consumer override wins against unlayered Veneer importance at equal or higher specificity. See [cascade sorting](https://www.w3.org/TR/css-cascade-5/#cascade-sort).

The supported profiles have these consequences; see the [profile definitions and exclusion contract](/home/user/veneer-probe/guides/veneer.md:3325).

| Surface | (a) Unlayered importance | (b) Layered importance |
|---|---|---|
| Standalone | Later qualifying consumer importance wins. | Unlayered consumer importance loses. |
| `tailwind` profile | Veneer importance beats Tailwind’s normal utilities. | Same winner. |
| `preflight` profile | Veneer importance beats Tailwind’s normal utilities; preflight’s own important rules require separate treatment. | Same utility winner; existing important-layer relationships remain. |
| Exclusion line | Retain its exact longhand-coverage rule. | Retain unchanged. |

The exclusion line remains necessary for normal or partially covered shared names. Moving declarations changes neither their importance nor their covered longhands. Names fully covered by Veneer importance remain eligible for Tailwind generation; excluded names remain withheld. The [consumer proof](/home/user/veneer-probe/tests/service/tailwind/consumer.test.ts:119) already derives this distinction. Tailwind utilities made important would beat option (a)’s unlayered importance; that configuration is outside the documented profiles.

**Hidden elements require an explicit profile boundary.** Under (a), `<div hidden class="d-flex">` displays as flex in standalone and the `tailwind` profile, matching Bootstrap. Under `preflight`, it remains hidden: Tailwind declares layered `display: none !important` on `[hidden]:where(:not([hidden='until-found']))`. Under (b), it remains hidden throughout. See [Bootstrap’s rule](/home/user/veneer-probe/node_modules/bootstrap/dist/css/bootstrap.css:598), [Veneer’s reset](/home/user/veneer-probe/src/styles/_reset.scss:7), and [Tailwind’s rule](/home/user/veneer-probe/node_modules/tailwindcss/preflight.css:396). The class exclusion line cannot remove an attribute reset.

**Responsive offcanvas regains Bootstrap’s override behavior under (a).** A later equal-specificity unlayered important background paints the panel below and at its breakpoint. A layered important override also paints it. A shipped background utility paints the inline panel when its later release order wins. The more-specific body selector still defeats a single unlayered utility class. Under (b), the panel retains its clear inline background against the existing utilities-layer and unlayered overrides. See the [offcanvas proof](/home/user/veneer-probe/tests/src/styles/components/offcanvas.test.ts:272) and [documented difference](/home/user/veneer-probe/guides/veneer.md:5797).

**Build option (a) through Sass.** Inside an existing selector, place only important declarations within `@at-root (without: layer) { … }`. This removes enclosing layer blocks while retaining selector and conditional ancestry; ordinary `@at-root` does not remove layers. Centralize repeated emission in `_mixins.scss`. Keep locals, variable-only utilities, and offcanvas resets layered. See [Sass’s selective escape](https://sass-lang.com/documentation/at-rules/at-root/#beyond-style-rules). Validate expanded and minified output against Bootstrap’s important-declaration order, including responsive and print conditions. Supersede [R5’s placement rationale](/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md:61), preserving helper-before-utility precedence. Option (b) requires no emission change.

**Neither option changes declaration-priority parity.** The [priority case](/home/user/veneer-probe/tests/conformance.test.ts:375) compares flags by selector, property, and condition; it does not compare layers. The [departure ledger](/home/user/veneer-probe/guides/veneer.md:7394) compares values. Preserve those checks. Under (a), add an independent invariant rejecting layered important declarations, and verify split rules retain ledger attribution and declaration coverage. Under (b), add a machine-read cascade-departure record in the guide, covering the important population and its behavioral witnesses. Ordinary value-departure rows cannot represent this difference; unsupported rows would be stale.

**Reject (b).** It serves consumers relying on protected hidden content and component importance, but breaks Bootstrap consumers’ ordinary overrides and retains the special layer knowledge the direct-control tenet rejects. Option (a) serves those Bootstrap consumers and the documented Tailwind pairings. It breaks reliance on Veneer’s stronger hiding and inline-panel protection. Existing layer-based overrides still work, though their precedence becomes stronger relative to Veneer.

The implementation must carry every existing pin, rather than changing only the examples in the brief:

- Reverse the unlayered-important escape expectations throughout [utility proofs](/home/user/veneer-probe/tests/src/styles/utilities), including visually-hidden; retain normal-override rejection.
- Update [tokens](/home/user/veneer-probe/tests/src/styles/tokens.test.ts:569), [reset](/home/user/veneer-probe/tests/src/styles/reset.test.ts:20), and offcanvas outcomes.
- Replace shadow/opacity layer-membership expectations and widen navbar/offcanvas selector and condition readings to include unlayered rules.
- Extend the [mixin fixture](/home/user/veneer-probe/tests/src/styles/fixtures/mixins.scss:94) with layered callers; verify split locals, priorities, conditions, and naming.
- Retain helper precedence, navbar expansion, swatch, calendar-picker, normal-layer order, and Tailwind exclusion proofs. Under (b), retain all existing outcomes and add departure-record falsification.

Execute these units serially where ownership overlaps:

| Unit | Role and engine | Owned files | Acceptance |
|---|---|---|---|
| IMPORTANT-EMIT | `sol`, GPT-6 Astra | `src/styles/**`; `tests/src/styles/**`; authored `tests/setupBrowser*`, `tests/setupStyles*`, `tests/setupServer*`; `tests/conformance.test.ts` | Every important declaration unlayered; normals retain layers; Bootstrap priorities and order preserved; changed outcomes proved against Bootstrap; re-layering and lost-condition controls fail. |
| IMPORTANT-PAIR | `opus`, Opus 5.5 | `tests/service/tailwind/**`, `tests/fixtures/tailwind/**`, `tests/setupService.ts`, `tests/setup.css` | Supported recipes render shared-name winners, consumer overrides, hidden/profile differences, and offcanvas boundaries; exclusion derivation and copies agree. Coordinate with TAILWIND-RECIPE. |
| IMPORTANT-CONTRACT | `opus`, Opus 5.5 | `guides/veneer.md`, `tests/guides.test.ts`; roadmap and R5 amendments report-only | Guide states executed behavior and migration consequences; Orchestrator integrates the approved ruling. |
| IMPORTANT-ACCEPT | Objective audit: `analyst`, Opus 5.5; subjective audit: `reviewer`, GPT-6 Astra; gates: `verifier`, Sonnet/Terra | Read-only | Independent mutation review, required gate chain, and explicit `test:service` evidence; host browser runs where sandbox restrictions prevent measurement. |

The user must approve (a)’s changed hiding and offcanvas behavior, supersede R5’s layered-importance requirement, and accept preflight’s hidden-element boundary. Choosing (b) instead requires expressly amending the roadmap’s consumer-override promises.

Risks are lost conditions during extraction, changed important source order, split-rule omissions in readers, and stale expectations. A consumer wrapping the entire stylesheet in an import layer also defeats the unlayered contract; keep the documented plain import.