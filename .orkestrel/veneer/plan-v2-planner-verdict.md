I held the **subjective** lane.

# Part A — verdicts

## 1. Every tenet has a carrier and every unit has a tenet — CONFIRMED

Attacks that failed: I walked every product tenet and execution constraint in `C:/Users/mikes/WebstormProjects/scaffold/tenets.txt` against the plan's decision rows and unit lines. The three I expected to orphan all held. "Remain compatible with Tailwind CSS without requiring it" is carried by the Tailwind unit line in § Component queue, thin but present. "Use ASTs only where they help answer a concrete question" is carried by U4's `research/inventory.mjs` PostCSS inventory plus U3's reading of `research/tokens.md`, even though the new plan dropped every Markdown/HTML provenance sentence the old plan carried. "Make any proposed incompatibility explicit and reconcile it with the user's requirements before accepting it" is carried by § Exit criterion's "intentionally excluded with a recorded reason", U4's ledger assignment line, and § User decisions pending — that is a carrier, though a weak one, and I name the weakness under Tensions rather than as a break.

Every unit serves a named tenet: U1 the Orkestrel-package and runtime-boundary tenets, U2 the Elements-reference tenet, U3 the token-contract and semantics tenets, U4 the compatibility and parity tenets, U5 and U6 the rendered-result tenet and the "inspect `@orkestrel/test`'s real helpers" constraint, U7 most of them, the Tailwind unit the Tailwind tenet, the component queue the incremental-build constraint.

## 2. Dissolving the old "Journey pilot" loses nothing the tenets require before Button — BROKEN

**Orphaned proof.** The old plan's Journey pilot opened with "Register the journey and browser-setup projects in the real gate chain" (`superseded/plan-2026-09-19.md:113`). No line of U1, U3, U5, or U7 registers the journey axis.

The journey axis is selected by the presence of `configs/app/vite.journey.config.ts`: `src/core/compilers.ts:1086` plans the wrapper from `blueprint.journey`, `:359-361` emits the `test:journey` script only under `blueprint.journey && blueprint.app.includes('browser')`, and `:324` puts it in the `test` chain under the same condition. `.agents/skills/orkestrel-prove-journey/SKILL.md:88-95` gives the exact activation procedure for a workspace born before the axis: write the wrapper, run `scaffold repair`, then add `npm run test:journey` to `test` yourself. U1's eight steps write the manifest, the barrels, the styles axis, the conformance controls, and the distribution stage, and never that file. Without it Veneer has no `appJourney` factory, no variant `provide`, no `test:journey` script, and no `journey:<variant>` projects — which is what U7's capture and matrix rows consume.

Two further orphans, smaller: "invalid **or cyclic** consumer behavior" — U3 covers the invalid value and nothing covers a `var()` cycle, which `research/platform.md:5` names as a distinct computed-value-validity class; and "portfolio membership with capture disabled" and "preserved failure diagnostics without passing" are carried only by the blanket skill binding in § Authority and routing, not by any named line.

**Smallest correct fix.** Add to U1, as a new step between the present steps 4 and 5:

> 5. Unit: write `configs/app/vite.journey.config.ts` with the Veneer variant list — each name pairing a theme with a viewport, such as `light-1280` and `dark-390`. Orchestrator: re-run `repair` so the root configuration defines `appJourney` and the manifest gains `test:journey`, then add `npm run test:journey` to the `test` script after `npm run test:app`. Declare the `ProvidedContext` augmentation in `tests/setupBrowser.ts`.

And add to U3's test line, after "sets an invalid value and reads the consumer's fallback": `declares a two-token cycle and reads the consumer's guaranteed-invalid result`.

## 3. Live CSSOM parity replaces the generated inspection data without losing a drift class — BROKEN

**Falsifying reading.** The design contradicts itself before any browser question arises. U3 orders two things into the same scope:

- "`src/core/constants.ts` declares the frozen grouped map whose leaves are `--vn-*` names";
- "Declare the `--bs-*` root compatibility scope in `_tokens.scss` as aliases of `--vn-*`, covering every `:root` variable Bootstrap 5.3.8 declares, including the `-rgb` triplets".

Then `tokens.test.ts` "reads the `:root` custom-property names from `document.styleSheets` and asserts **bidirectional equality** with the name map's leaves". The `:root` scope carries every `--bs-*` alias and the map carries none of them, so the equality is false on the first green build. An executor meeting this reddens on its own contract and will repair it by whichever guess it makes first — filtering the read to `--vn-`, or widening the map to a second `--bs-*` group. Those are different public contracts and the plan must choose.

**Second falsifier, same line.** "the `:root` custom-property names" presumes one rule. `_tokens.scss` as U3 specifies it declares factors, palette, semantic roles, surface and text tiers, spacing, type, radius, border, elevation, motion, focus ring, the z-index ladder, and the `--bs-*` alias block; `index.scss` barrels that with `_theme.scss`. Several `:root` rules is the normal emission. The published reader the plan should be using returns only the first match: `findRule` is documented as "The first matching rule in `readRules` order" and matches its argument as a substring (`scaffold/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:948-970`). The test must union every `:root` rule from `readRules()`, and the plan does not say so.

**A drift class the live test cannot see and the compiled-CSS sweep could.** The CSS decision row ships "compiled standalone LTR and RTL CSS". The `src:styles` project loads one document, so a `--vn-*` name declared only in the RTL output drifts unobserved. The old plan's PostCSS pass over compiled CSS could read both files.

**Smallest correct fix.** Replace U3's `tokens.test.ts` sentence with:

> `tokens.test.ts` collects every `:root` rule from the published `readRules()` walk, unions their custom-property names, partitions them on the `--vn-` and `--bs-` prefixes, asserts bidirectional equality between the `--vn-` partition and `TOKENS`' leaves and between the `--bs-` partition and the Bootstrap 5.3.8 `:root` inventory U4 records, and refuses a name in neither partition; it runs the same union over the built `dist/src/styles/index.rtl.css` loaded into the tester document.

**The Chromium sub-question stays unsettled.** I could reach no primary source in this tree stating whether `CSSStyleDeclaration.item()` over a rule obtained from `document.styleSheets` enumerates custom properties in Chromium. `research/platform.md` covers resolved values, Typed OM, and geometry, and says nothing about declaration-block enumeration. The probe that settles it: in a `src:styles` browser test, mount `<style>:root{--vn-probe-a:1px}</style>`, take `findRule(':root')`, read `Array.from(rule.style)` and assert it contains `--vn-probe-a`; the negative control is a second property declared on `.x` rather than `:root`, which must be absent. Run it on managed Chromium and Edge and record both. This belongs in U5, not in U3, because U3's whole test design rests on it.

## 4. The styles wrapper is repair-safe — UNRESOLVED

Half of it I can decide and it holds: the author-written scripts survive `scaffold repair`. `blueprintToWritableScripts` (`scaffold/src/core/compilers.ts:458-472`) admits only `test:*` names other than `test:src` and `test:app`, plus `prepack` and `prepublishOnly`, into the region a repair may replace. `test:src:styles` is a `test:*` name the blueprint never generates, so it is not in that set; `build:src`, `check:src`, and `test` are not `test:*` direct rows at all, so a chain entry added to any of them is not region-written.

The other half I cannot decide without running the verb. Whether `scaffold audit` reports a `scripts` question for a `build:src` and a `check:src` whose text carries a member the plan's own composition (`compilers.ts:300-303`, `:378-381`) does not, and whether it reports a `projects` question for a `test:src:styles` naming a configuration with no `--project`, are readings of the audit's own output. Settle with `node ../scaffold/dist/bin/main.js audit --target ../veneer` after U1 step 5 lands, and record the exact question text.

## 5. Deleting the legacy tree at U1 loses no evidence the campaign needs — CONFIRMED

Attacks that failed. I took each fact the campaign draws from Veneer's tree and looked for a plan step that reads it from the working directory after step 1.

- The itemized Bootstrap CSS (`veneer/src/styles/bootstrap/**`): U4's inventory parses the installed `bootstrap/dist/css/bootstrap.css`, and U1 step 2 declares `bootstrap` as a development dependency before step 8 installs. No step reads the itemized copy.
- The `--bs-*` to `--vn-*` binding table in `base/_variables.css`: U3 says "Take the list from the U4 inventory when it lands", so the source is the official package.
- The derived shade and table-accent formulas in `src/styles/helpers.ts`: U7's CSS row derives hover and active tints "from the variant fill as Elements does", and Elements is read through U2's calibration, not through the deleted file.
- The statechart suites in the legacy `tests/**`: `research/testing.md:217` classifies them as the anti-path, and U7 builds its table from Button's real states.
- `demo/showcase.html`: `research/motion.md` is the retained receipt and U2 rebuilds Elements' showcase instead.

The failures I found around this step are the reverse of what the claim asks — files the list should include and does not — and they are under claim 12.

## 6. The U1 runtime-boundary controls bind against every listed vector — BROKEN

**Vector one passed: a runtime `import 'vue'` and a bundled copy of `@vue/reactivity`.** U1 step 6 says "Make the build's external predicate externalize every bare specifier so a foreign import surfaces as a specifier the proof can read." That predicate has no package-owned home. It is written into the root `srcBrowser` factory from `compilers.ts:746-750` and into the target wrapper, as `configs/src/vite.core.config.ts:24-27` shows for the core face. Both are `content`-owned (`compilers.ts:920-935`, `:960-968`), and U1's own off-limits line names "the root `vite.config.ts` and `tsconfig.json`, and every `configs/src/*.config.ts` and `configs/app/*.config.ts` Scaffold plans". The step instructs the unit to edit a file the same unit is forbidden to touch, and `repair` reverts it if it does.

With the shipped predicate — `node:`, `@orkestrel/`, declared peers — a runtime `import 'vue'` is **bundled into `dist/src/browser/index.js`**, not emitted as a specifier. The `dist/src/**/*.js` specifier sweep therefore reports clean on exactly the vector it exists for, and so does the isolated installed-consumer stage, because a bundled copy resolves and runs. The manifest check does not see it and the `src/**` import sweep is the only control left standing.

**Vector two passed: a test that resolves a sibling checkout by relative path.** The claim's vector reads "a **test or** source that resolves a sibling checkout by relative path". The plan's sweep is scoped to `src/**` in both halves ("no `src/**` import names one and no `src/**` relative import escapes `src/`"). A `tests/src/browser/Button.test.ts` importing `../../../../elements/src/browser/helpers.js` clears every listed control.

**Vector that holds.** The `Ref`-leak control is sound. `declarationRollup` passes `bundledPackages: []` to API Extractor (`scaffold/configs/helpers.ts:704`), so an external package stays an external import specifier in the rolled `index.d.ts`, and the `.d.ts` specifier sweep reads it. That settles the brief's second Unknown in the plan's favour; say so in the plan rather than leaving it open.

**Smallest correct fix.** Replace U1 step 6's external-predicate sentence with a control that needs no configuration edit:

> Add a closure control: resolve every relative import reachable from `src/core/index.ts`, `src/browser/index.ts`, and `src/styles/index.ts`, transitively, and fail on a resolved file outside `src/`. A bundled foreign runtime can enter only through a `src/**` import, so the closure is the door, and the built bundle needs no predicate change to prove it. Extend the specifier sweep's population from `src/**` to `src/**`, `app/**`, and `tests/**` for the escaping-relative-import half. Record in the plan that `bundledPackages: []` in `configs/helpers.ts` keeps a leaked `vue` type as an external specifier in the rolled declarations, so the `.d.ts` sweep is the control for that vector.

## 7. The oracle design is independent, isolated, and placeable — BROKEN

**The outcome class it cannot record, at the position the plan puts it.** The oracle drives official markup "through the published journey verbs". `research/testing.md:107-113` establishes that the published barrel has no hover verb, no press-and-release pair, no pseudo-element `readStyle`, and no media-emulation helper — and those are precisely what U5 probes and U6 adds. The plan orders U4 before U5 and U6. So the fixtures the oracle commits cannot carry Bootstrap's `:hover` and `:active` class and style expectations, or its transition-completion ordering under reduced motion, and U7's Lifecycle row — "Compare ordered events, cancellation, completion, dismissal, and cleanup against the oracle's recorded expectations; prove zero-duration and **reduced-motion** completion" — has nothing to compare against. The plan schedules no refresh after U6 lands.

**The instrument has no control that could disagree with it.** `.claude/rules/quality.md` § Instruments requires a control drawn from outside the population the instrument covers, and `.claude/rules/tests.md` forbids asserting an implementation against itself. The plan's only control is "the missing-fixture control red then green", which proves the file-absence branch and says nothing about whether a recorded expectation is Bootstrap's behaviour rather than the fixture's. U4 produces both an independently derived contract (`research/obligations.md`, from the official sources) and a recorded behaviour (`tests/oracle/__fixtures__/<component>.json`), and never cross-checks one against the other — which is the second mechanism that could disagree, already in the unit.

**Smallest correct fix.** Move the oracle's per-component recording to sit after U6, and add the cross-check. Replace U4's oracle bullet's closing clause with:

> Record Button's fixture only after U6's verbs land, and re-run every earlier component's recording under `ORACLE_REFRESH=1` in the same step. Assert each recorded fixture against the rows `research/obligations.md` derived from the official sources for that component — event types, cancelability, keyboard behaviour, dismissal — and fail on a row the recording contradicts or omits. Keep the missing-fixture control beside it.

## 8. The routing ledger is consistent with orchestration and the user's 2026-09-20 instruction — BROKEN

**Misrouted line one.** U4: "Grok: read each `bootstrap/js/src/*.js` and the 5.3 documentation pages ... and **write** `research/obligations.md` per component." `.agents/orchestration.md` § Tedious work goes to Grok states: "Grok is read-only, so a writing unit never routes there." U2 gets this right — Grok maps and the Orchestrator writes `research/calibration.md` — and U4 does not.

**Misrouted line two.** U7: "`sol` on Astra implements, then the audit round (`analyst`, `reviewer`, `checker`)." `analyst` is Astra, the engine that wrote the work. § Engine assignment: "where Sol wrote the work under audit, give the objective lane to Opus 5 and the subjective lane to Sol, and reverse that where Opus 5 wrote it. Both engines still run, so this is a lane swap rather than a substitution. Record which engine held which lane in the routing ledger." The plan's U7 audit leaves the objective lane on the writing engine.

**Unrouted line three.** U4 says "Builder: write `research/inventory.mjs`, which parses the installed `bootstrap/dist/css/bootstrap.css` ... and writes `research/inventory.json`". Writing the instrument is not running it, and U4 names no runner. The run reads Veneer's `node_modules`, so it is an Orchestrator-tracked command under the plan's own § Authority and routing line. U2 names its runner; U4 must too.

**Smallest correct fix.** In U4, change "Grok: read ... and write `research/obligations.md`" to "Grok: read ... and return the per-component obligation rows as its distillate. Orchestrator: write `research/obligations.md` from them." Add "Orchestrator: run `inventory.mjs` after `npm ci`, and record the Bootstrap identity it read." In U7, change the audit line to "then the audit round — the objective lane to `reviewer` on Opus and the subjective lane to `analyst` on Astra, swapped because Astra wrote the work, plus `checker` — then `verifier`."

## 9. Button's scope is complete and does not block on U6 — BROKEN

**Siting defect.** "Journeys, in `tests/src/browser/integration.test.ts` and the styles suite: ... captures of every variant by state by theme placed from the journeys that reach them". `tests/src/browser/integration.test.ts` is collected by the `src:browser` project (`scaffold/src/core/templates.ts:210`), which provides nothing. The variant, variant list, and capture flag come from `appJourney`'s `provide` block, which exists only on the app axis (`roughnotes/vite.config.ts:197-217`), and `.agents/skills/orkestrel-prove-journey/SKILL.md:103-105` fixes the journeys at `tests/app/browser/integration.test.ts`: "Each variant project collects that file alone ... so a journey written anywhere else runs in no variant." As written, U7's capture portfolio, per-variant matrix, and theme-by-viewport frames cannot be produced, and the plan's own exit criterion ("the accepted appearance and motion carry captured acceptance against Elements' specimens") cannot close.

**Omitted official obligation.** `bootstrap/js/src/button.js`'s `toggle()` toggles the `active` class on the host and writes `aria-pressed` from the result of that toggle. U7's Engine row gives the class "a readonly `pressed` state, `toggle()`, and `destroy()`", and the Journeys row reads "`aria-pressed` read through `readStates`". Nothing binds the engine to mutate `.active`. The CSS row styles `.active`, which is the other half and not the same half. An implementation that expresses `pressed` through `aria-pressed` alone passes every row U7 lists while breaking any consumer whose stylesheet or script targets `.btn.active` — which is the drop-in contract the compatibility tenet names.

**Second omission.** The `./browser/auto` row names "one delegated listener and its removal" and omits the two behaviours that listener has in `button.js`: `event.preventDefault()`, and resolving the host through `closest('[data-bs-toggle="button"]')` so a click on a child element inside the toggle still toggles. A delegated listener that reads `event.target` directly passes the plan's row and fails on a button containing an icon.

**The U6 half holds.** U7 depends on U6's verbs and U6 precedes it in the foundation order, and U5's closing sentence — "A negative answer for hover, pseudo-elements, or media emulation leaves the Button motion and pseudo rows open rather than passing them" — is the on-the-record open the claim asks for.

**Smallest correct fix.** In U7's Journeys row, replace "in `tests/src/browser/integration.test.ts` and the styles suite" with "in `tests/app/browser/integration.test.ts`, run through the journey axis U1 registered, driving the showcase's Button section; the same-environment engine proofs stay in `tests/src/browser/Button.test.ts` and the resolved-style proofs in the styles suite". In the Engine row, after "a readonly `pressed` state", insert "whose only representation on the host is the `active` class and the `aria-pressed` attribute the class's toggled result writes, as `js/src/button.js` writes them". In the Compatibility boundary row, after "one delegated listener and its removal", insert "which calls `preventDefault` and resolves its host through `closest('[data-bs-toggle=\"button\"]')`, proven from a click on a child element".

## 10. Parallel units do not collide, and U3 cannot start early — BROKEN

**The collision.** U4 "Run beside U3". U3 writes `src/styles/**`, `src/core/types.ts`, `src/core/constants.ts`, `guides/tokens.md`, and `tests/src/styles/**` in the Veneer checkout through `opus`. U4 writes `tests/conformance.test.ts`, `configs/src/vite.oracle.config.ts`, `tests/setupOracle.ts`, and `tests/oracle/**` in the same checkout through `sol` on Astra. The files are disjoint; the checkout is not. `.agents/orchestration.md` § Permission floor: "Run one writing role per checkout, on disjoint checkouts, each dispatched from a clean committed baseline and each owning disjoint files. **In a single checkout that is one writer at a time.**" Disjoint ownership is the second condition, not a substitute for the first.

**A second collision inside U1.** U1 interleaves Orchestrator write steps (1, 4, 8) with unit write steps (2, 3, 5, 6, 7) in the Veneer checkout. That is three dispatches with three brief files under § Dispatch anatomy's successor rule, and the plan presents it as one unit with one brief.

**U2 beside U1 holds.** U2 touches the Elements checkout and `scaffold/.orkestrel/veneer/research/`; U1 touches Veneer. No shared checkout writer, no shared `node_modules` mutation beyond Elements' own install, which U2 names as Orchestrator-owned.

**The U3 dependency holds.** U3 reads `research/calibration.md` in its Read line and "Take every value from `calibration.md`" in its first bullet. Its close ties every foundation token to a calibration row. U3 cannot start before U2 closes.

**Smallest correct fix.** Change U4's opening from "Run beside U3; it writes only tests, setup, and research" to: "Run U4's Grok discovery and `builder` instrument beside U3, both of which write only under `scaffold/.orkestrel/veneer/research/`. Run U4's conformance and oracle authoring in the Veneer checkout after U3 closes; one writer at a time per checkout." And split U1 explicitly into `u1a` (unit, steps 2-3), the Orchestrator repair, `u1b` (unit, steps 5-7), and the Orchestrator gate run, each with its own brief file.

## 11. The name-map placement satisfies the rules and the fleet name check — UNRESOLVED

`TOKENS` itself clears. A frozen grouped map as an UPPER_SNAKE_CASE module-scope constant in `src/core/constants.ts` is exactly what `.claude/rules/architecture.md` § Kind purity prescribes: "Module-scope constants live only in `constants.ts`, use UPPER_SNAKE_CASE, and freeze object/array data with `Object.freeze`." It is a qualified constant, which `.claude/rules/names.md` § Entity-scoped names explicitly places outside the one-word rule. I searched `scaffold/dist/host/guides/*.md` for a `TOKENS` claim and found none, so the `surface` rule reports no collision on that name.

The claim's other subject does not exist. U3 says "`src/core/types.ts` declares the token-name type and the map's shape" and names neither type. `.claude/rules/names.md` § Fleet name ownership requires "Check a public name against the fleet's published guides before adding it", and a name nobody has written cannot be checked. An executor will invent two public type names inside U3 and discover a collision at `lint:check`.

**What settles it.** Write both names into U3, then run the `surface` sweep against `scaffold/dist/host/guides/`. My proposed names are in Part B.

## 12. The plan is coherent as a whole — BROKEN

Seven contradictions an executor holding only the plan meets in U1 and U3.

**12a. `index.scss` over `_mixins.scss`.** U1 step 5: "an `index.scss` barrel over `_tokens.scss`, `_theme.scss`, and `_mixins.scss` stubs". `.claude/rules/styles.md:24`: "Never load `mixins` from `index.scss`." And `:25`: "`index.scss` is the sole compilation barrel; it loads `tokens`, `theme`, and output partials with `@use`." Fix: strike `_mixins.scss` from the barrel list and write "consumers load `_mixins.scss` with `@use '../mixins' as *`; `index.scss` never loads it".

**12b. The external-predicate edit against the off-limits list.** Under claim 6.

**12c. The private application is left running Bootstrap JavaScript against deleted stylesheets.** U1 step 1 deletes `src/styles/index.css` and `src/styles/tailwindcss.css`. U1 step 3 says "keep `app/browser/` with `index.html`, `main.ts`, and `index.ts`". `veneer/app/browser/styles/main.css:15-16` imports both deleted files, so `main.ts:1` breaks the app build. `veneer/app/browser/main.ts:2` reads `import 'bootstrap'` and `veneer/app/browser/helpers.ts:1` reads `import { Popover, Tooltip } from 'bootstrap'`, re-exported through `app/browser/index.ts:3`. `veneer/app/browser/index.html` is a full legacy Bootstrap showcase driving `data-bs-toggle="collapse"` through that runtime. That is official Bootstrap JavaScript making a demonstration work, which the tenet "Ship Veneer's own JavaScript" forbids and which the plan's own oracle rule — "runs official JavaScript nowhere else" — forbids. U1's close requires `check`, `build`, and `test` green, and this state reaches none of them. Fix: name `app/browser/helpers.ts`, `app/browser/styles/main.css`, and the legacy body of `app/browser/index.html` in step 1's deletion list, and have step 3 author a minimal empty showcase shell that imports `@src/styles` and nothing else.

**12d. `src/styles/types.ts` survives its own retirement.** Step 1 deletes `src/styles/tokens.ts`, `helpers.ts`, `constants.ts`, and leaves `veneer/src/styles/types.ts`, which declares `TokenGroup` — the exact symbol the plan's § Build this product says it dropped. `veneer/src/styles/index.ts:7-10` re-exports from three files step 1 deletes; step 5 rewrites `index.ts` and never mentions `types.ts`. Fix: add `src/styles/types.ts` to step 1's deletion list.

**12e. U5's probe cannot be collected where U5 puts it.** U5: "Answer each question ... with a temporary test inside `tests/src/browser/`". `scaffold/tests/setupPolicy.ts:260` collects `tests/{app,src}/**/*.test.ts` for the mirror rule, `:439-444` exempts only `integration.test.ts`, and `:452-462` resolves a stem through `.cts/.mts/.ts/...`, a leading-underscore `.scss`/`.css` partial, and a `setup*` tests-axis module. A `tests/src/browser/hover.test.ts` requires `src/browser/hover.ts`, which does not exist at U5's position. The plan's own § Standing conditions row states this rule and the U5 line contradicts it. Fix: "with a temporary `tests/src/browser/integration.test.ts`, which the mirror rule exempts by name, deleted after the readings are recorded".

**12f. U3 never names which stylesheet `tokens.test.ts` reads.** The Vite-served source cascade and the built `dist/src/styles/index.css` are different artifacts and the token contract's whole point is the shipped one. `.claude/rules/workspace.md` § Setup assets says "Styles setup loads `setup.css` and the compiled cascade", which settles it — but U1 step 3's only instruction for `tests/setupStyles.ts` is "declare only what `@orkestrel/test` does not export", which does not carry the loading obligation. Fix: add to step 3, "and load `tests/setup.css` and the built `dist/src/styles/index.css` per `.claude/rules/workspace.md` § Setup assets, so every styles test reads the shipped cascade".

**12g. The `--bs-*` alias scope is left half-shipped with no owner.** U3: "Take the list from the U4 inventory when it lands; until then ship the palette, body, link, border, focus-ring, and font groups." U4 runs beside U3 and closes on its own evidence. No line of any unit completes the remaining groups. Fix under F-1.

---

## Findings outside the claims

**F-1. No unit owns completing the `--bs-*` root alias scope.** U3 ships a named partial set "until then"; U4 produces the inventory; nothing closes the gap. `AGENTS.md` § Non-negotiable rules: "**ALWAYS** finish the requested implementation: no empty stubs, deferred logic, or concealed follow-up work." The tenets add "Avoid broad unfinished implementations that defer correctness to a later campaign." Fix: re-order U4's inventory bullet ahead of U3 as an Orchestrator-run step inside U2's window — it needs only the installed `bootstrap` package and `postcss`, both available after U1 step 8 — and strike U3's "until then" clause so U3 declares the complete inventory in one pass.

**F-2. `configs/src/vite.styles.config.ts` has no composition the plan's own words admit.** U1 step 5 says the wrapper "compos[es] the root exports into the `src:styles` browser project". The repaired root config exports factories only; `resolve` and `browserOptions` are module-local (`roughnotes/vite.config.ts:14`, `:34-40`). The one browser factory it does export, `srcBrowser`, carries `outputBoundary('dist/src/browser')` and `environmentBoundary('src/browser')`, and `mergeOverride` concatenates arrays, so composing it yields a project that also collects `tests/src/browser/**` and enforces the wrong output path. `environmentBoundary`'s owner parameter (`scaffold/configs/helpers.ts:845-847`) accepts `'src/core' | 'src/browser' | 'src/server' | 'app/core' | 'app/browser' | 'app/server'` and no `'src/styles'`, so the styles axis has no environment boundary available to it at all. Fix: Part B, Design.

**F-3. Two readings of the managed Chromium build disagree and the plan's receipt rests on one.** § Standing conditions: "Playwright's managed `chromium-1234` is installed under `$LOCALAPPDATA/ms-playwright`." `research/platform.md:19`: "The installed Playwright module resolved its managed Chromium executable under chromium-1243, but that executable was absent." The digits are transposed and the absence is the opposite reading. One of the two receipts the plan takes depends on which is right. Settle with a directory listing of `$LOCALAPPDATA/ms-playwright` and record the exact build name in the row.

**F-4. `tests/setupStyles.ts` carries an unnamed obligation.** Covered as 12f; recorded here because it is a rule obligation rather than an internal contradiction.

---

## Attacked and held

- **Claim 5's deletion list, on every fact the campaign draws from Veneer's tree.** Listed under the verdict. The adjacent behaviour that looks like the defect and is correct: U3 says "rewrite `guides/tokens.md`" and U7 says "`guides/styles.md` gains the button partials" after U1 deleted both. That is loose wording, not a dependency — neither step reads the old content.
- **`tests/distribution.test.ts` replacement surviving repair.** I expected U1 step 7's replacement to be reverted by the next `repair`. It is not: the artifact carries `ownership: 'presence'` (`scaffold/src/core/compilers.ts:1336`), and the comment at `:1326` states "Presence ownership never rewrites the file". The brief's "plan-owned" phrasing is loose; the substance holds.
- **`tests/conformance.test.ts` against the mirror rule.** I expected U1 step 6's root conformance proof to need a `src/conformance.ts` mirror. It does not: `POLICY_TEST_GLOB` is `tests/{app,src}/**/*.test.ts` (`scaffold/tests/setupPolicy.ts:260`), which does not reach a root `tests/` file.
- **U3's four styles tests against the mirror rule.** `tokens.test.ts`, `theme.test.ts`, `mixins.test.ts`, and `index.test.ts` under `tests/src/styles/` each resolve through the leading-underscore partial branch (`setupPolicy.ts:457-459`) against `_tokens.scss`, `_theme.scss`, `_mixins.scss`, and through the direct branch against `src/styles/index.ts`. All four clear.
- **The `--vn-*` canonical decision and the `data-bs-theme` island decision.** I looked for a conflict with the tag-only-semantics tenet and found none: the theme selector is an attribute on an arbitrary element, not a tag pairing.
- **U3's `index.test.ts` cascade walk as the semantics gate.** Attacked it as unimplementable and it held — `readRules()` expands grouping rules level by level including layers (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2008-2035`), so a walk over the elements layer rejecting a two-bare-tag selector is reachable with the published reader and needs no new parser.

---

VERDICT: FAIL 2, 3, 4, 6, 7, 8, 9, 10, 11, 12; outside the claims: F-1, F-2, F-3, F-4

---

# Part B

## Design

Five amendments. Each names the plan section, the line, and the replacement.

### D-1. § Foundation units, U1 — register the journey axis, and split the unit at its writer boundaries

U1 is the only place the journey axis can be registered, because `appJourney` reaches the root configuration through `scaffold repair` and every later unit's browser evidence consumes it. It is also three writers in one checkout wearing one unit's name. Rewrite U1's step list as four dispatches:

- **U1a (unit).** Present steps 2 and 3, plus: author `configs/app/vite.journey.config.ts` with Veneer's variant list — `light-1280`, `dark-1280`, `light-390`, `dark-390` — and declare the `ProvidedContext` augmentation for `variant`, `variants`, and `capture` in `tests/setupBrowser.ts`. Extend step 3's `tests/setupStyles.ts` instruction with "load `tests/setup.css` and the built `dist/src/styles/index.css`, per `.claude/rules/workspace.md` § Setup assets".
- **Orchestrator.** Present step 1's deletion, extended with `src/styles/types.ts`, `app/browser/helpers.ts`, `app/browser/styles/main.css`, and the legacy body of `app/browser/index.html`; then present step 4's `repair`; then add `npm run test:journey` to the `test` script after `npm run test:app`, and `npm run build:src:styles`, `npm run check:src:styles`, `npm run test:src:styles` to their chains.
- **U1b (unit).** Present steps 5, 6, and 7, with step 5's `index.scss` barrel loading `_tokens.scss` and `_theme.scss` only, step 6's external-predicate sentence replaced by the closure control under D-4, and step 3's showcase shell authored as an empty `app/browser/index.html` importing `@src/styles` and `app/browser/main.ts` importing nothing else.
- **Orchestrator.** Present step 8.

Add to U1's close: "`npm run test:journey` runs four `journey:<variant>` projects, each collecting `tests/app/browser/integration.test.ts` and no other file."

### D-2. § Foundation units, U1 step 5 — name the styles wrapper's actual shape

The composition the plan gestures at does not exist. Replace "composing the root exports into the `src:styles` browser project and the `dist/src/styles/index.css` build" with:

> declaring the `src:styles` project directly rather than composing a root factory: no `environmentBoundary`, which publishes no `'src/styles'` owner; `outputBoundary('dist/src/styles')` imported from `../helpers.js`, the same leaf import the generated `configs/src/vite.core.config.ts` uses; the browser provider built from `resolveBrowser` in `../browsers.js`; `include` set to `tests/src/styles/**/*.test.ts` and `setupFiles` to `./tests/setup.ts`, `./tests/setupBrowser.ts`, `./tests/setupStyles.ts`, both written as replacements rather than merged, because `mergeConfig` concatenates arrays; and a `lib` build over `src/styles/index.ts` renaming the emitted asset to `index.css`, plus a second output for the RTL cascade.

### D-3. § Foundation units, U3 — fix the token contract's test and name its public types

Replace the `tokens.test.ts` sentence with the union-and-partition form under claim 3. Replace "`src/core/types.ts` declares the token-name type and the map's shape" with:

> `src/core/types.ts` declares `TokenName`, the union of every `--vn-*` name `TOKENS` carries, and `TokenMap`, the readonly grouped record whose leaves are `TokenName` values. Check both names against `node_modules/@orkestrel/scaffold/dist/host/guides/` before writing them; `.claude/rules/names.md` § Fleet name ownership decides a collision.

Both names are single qualified nouns in the `{Entity}{Noun}` form `.claude/rules/names.md` § Type-level identifiers fixes, and neither is a word another `@orkestrel` guide claims in the copy I read.

Strike "Take the list from the U4 inventory when it lands; until then ship the palette, body, link, border, focus-ring, and font groups" and replace with "Take the complete list from `research/inventory.json`, which lands before this unit opens."

### D-4. § Foundation units, U1 step 6 — a runtime boundary that needs no configuration edit

Replace "Make the build's external predicate externalize every bare specifier so a foreign import surfaces as a specifier the proof can read" with:

> Add a closure control: resolve every relative import reachable transitively from `src/core/index.ts`, `src/browser/index.ts`, and `src/styles/index.ts`, and fail on a resolved file outside `src/`. A foreign runtime can be bundled only through a `src/**` import, so the closure is the door the shipped predicate leaves open. Widen the escaping-relative-import sweep's population from `src/**` to `src/**`, `app/**`, and `tests/**`. The rolled-up declarations need no change: `declarationRollup` passes `bundledPackages: []`, so a leaked `vue` type stays an external specifier the `.d.ts` sweep reads.

### D-5. § Foundation units, U7 — site the journeys on the axis that provides variants

Replace "Journeys, in `tests/src/browser/integration.test.ts` and the styles suite" with "Journeys, in `tests/app/browser/integration.test.ts`, driving the showcase's Button section through the journey axis U1 registered". Move the engine-only proofs — repeated construction, destruction during work, detached hosts, attribute restoration — to `tests/src/browser/buttons/Button.test.ts`, and the resolved-style and contrast readings to the styles suite. Add the `.active` mutation to the Engine row and `preventDefault` plus `closest` to the Compatibility boundary row, as under claim 9.

## Alternatives

**Alternative A — keep U7's journeys on `tests/src/browser/integration.test.ts` and hand-roll the variant loop.** The `src:browser` project is already a Playwright project and the Button engine lives in `src/browser`, so the journeys would sit beside their subject. Cost: every mechanism the journey skill makes free must be rebuilt — the per-variant project fan-out, the `provide` block, the capture destination, the `CAPTURE` flag — and `.agents/skills/orkestrel-prove-journey/SKILL.md:103-105` forbids the placement outright. Worse, a hand-rolled variant loop inside one project renders every variant in one document, which is exactly the split `captures.md` refuses. D-5 wins because the axis already exists and costs one file to turn on.

**Alternative B — abandon the styles axis and fold the cascade into `src/browser`.** This removes F-2 entirely: no unplanned wrapper, no missing `environmentBoundary` owner, no `scripts` question, nothing for `scaffold audit` to ask about. Cost: `src/browser` builds a JavaScript library with `declarationRollup` and a `lib` entry, so the CSS would emit as a side asset of the engine bundle and `./styles` would no longer be a standalone export — which breaks the tenet "Ship standalone CSS ... Require no Sass, Tailwind, Vue, external stylesheet, or consumer build system to render the published CSS", because a consumer wanting CSS alone would pull the engine. `.claude/rules/workspace.md:24` and `:99` name `src/styles/` and `dist/src/styles` as first-class, and `:122` declares the `src:styles` project in the standard matrix; the axis is sanctioned and only its generator is missing. D-2 wins, and the plan's standing condition already reached the same conclusion for the same reason.

## Units

Amendments to the plan's unit list. Each names role and engine so the routing ledger is derivable.

| Unit | Subject | Role / engine | Owns | Depends on | Acceptance |
| ---- | ------- | ------------- | ---- | ---------- | ---------- |
| U1a | Manifest, barrels, setup modules, journey wrapper | `sol` / Astra | `package.json`, `src/{core,browser}/{types,index}.ts`, `tests/setup*.ts`, `configs/app/vite.journey.config.ts` | Orchestrator deletion commit | `configs/app/vite.journey.config.ts` present with four variants; `tests/setupBrowser.ts` declares `ProvidedContext`; `tests/setupStyles.ts` loads `setup.css` and the built cascade |
| U1-del | Legacy deletion, extended | Orchestrator | the deletion list plus `src/styles/types.ts`, `app/browser/helpers.ts`, `app/browser/styles/main.css`, the legacy `index.html` body | clean `fc36cec` | one commit naming `fc36cec`; `rg "from 'bootstrap'" app src` returns nothing |
| U1-rep | `repair`, `audit`, chain wiring | Orchestrator | vendored files, `test`/`build`/`check` chain entries | U1a | `repair` report read and committed; `npm run test:journey` present in `test`; `audit` questions settled and recorded |
| U1b | Styles axis, boundary controls, distribution stage | `sol` / Astra | `src/styles/**`, `configs/src/vite.styles.config.ts`, `configs/src/tsconfig.styles.json`, `tests/conformance.test.ts`, `tests/setupConformance.ts`, `tests/distribution.test.ts`, `app/browser/index.html`, `app/browser/main.ts` | U1-rep | closure control red then green on a planted `src/browser/probe.ts` importing `vue`; escaping-relative-import control red then green on a planted `tests/` import of `../../../elements/src`; `.d.ts` specifier sweep red then green on a planted `Ref` return type |
| U1-gate | `npm ci`, `check`, `build`, `test`, `audit` | `verifier` / Sonnet | nothing | U1b | each reading recorded with its command |
| U2 | Visual calibration | `grok` / Cursor Grok 4.6 for the specimen map; `builder` / Sonnet for `calibration.mjs`; Orchestrator for the runs and `calibration.md` | `scaffold/.orkestrel/veneer/research/calibration*` | Elements at `3b41900` | unchanged from the plan |
| U4a | Inventory and obligations | `builder` / Sonnet writes `inventory.mjs`; Orchestrator runs it and writes `obligations.md` and `ledger.md` from Grok's distillate; `grok` / Cursor Grok 4.6 returns the distillate and writes nothing | `research/inventory.mjs`, `research/inventory.json`, `research/obligations.md`, `research/ledger.md` | U1-gate | every Bootstrap 5.3.8 `:root` variable and every Button obligation row present; every row assigned to a unit or a recorded exclusion |
| U3 | Token contract | `opus` / Opus 5; objective audit to `analyst` / Astra | `src/styles/**`, `src/core/{types,constants}.ts`, `guides/tokens.md`, `tests/src/styles/**` | U2, U4a | union-and-partition parity test red on a planted name in each partition and green restored; both receipts green |
| U5 | Instrument probes | Orchestrator | one temporary `tests/src/browser/integration.test.ts`, deleted after | U1-gate | each answer recorded in `research/instruments.md` with its command, browser, and reading; the CSSOM enumeration probe from claim 3 added to the question list |
| U4b | Conformance extension and oracle | `sol` / Astra | `tests/conformance.test.ts`, `configs/src/vite.oracle.config.ts`, `tests/setupOracle.ts`, `tests/oracle/**` | U3 closed, U6 closed | accepted-list control red then green; missing-fixture control red then green; each recorded fixture cross-checked against `research/obligations.md` and failing on a contradicted row |
| U6 | Test gaps | `sol` / Astra in the Test checkout; Orchestrator packs and installs | Test's `src/browser/**`, `guides/test.md`, its own tests | U5 | unchanged from the plan |
| U7 | Button | design round `planner` / Opus 5 and `analyst` / Astra; `sol` / Astra implements; audit round `reviewer` / Opus 5 on the **objective** lane and `analyst` / Astra on the **subjective** lane, swapped because Astra wrote it, plus `checker` / Sonnet; then `verifier` / Sonnet | as the plan lists, with journeys moved to `tests/app/browser/integration.test.ts` | U4b | as the plan lists, plus a journey asserting the `.active` class beside `aria-pressed`, and a data-API journey clicking a child element inside the toggle host |

## Tensions

Choices my lane made on judgment. Name each for the other lane or for the Orchestrator's ruling.

1. **I ruled claim 3 `BROKEN` rather than `UNRESOLVED`.** The brief told the lanes to rule `UNRESOLVED` when the Chromium enumeration question cannot be settled from a readable primary source, and I could not settle it. I broke the claim on a different conjunct — the `--bs-*` against `--vn-*` equality contradiction — because a claim false on any conjunct is false. If the Orchestrator reads the brief's instruction as fixing the verdict value regardless of other grounds, re-read my verdict as `UNRESOLVED` with the equality contradiction carried as a finding outside the claims. The plan edit is the same either way.

2. **I ruled claim 11 `UNRESOLVED` on an unwritten name.** An alternative reading is that the plan implies `TOKEN_NAMES` and `TokenGroup` closely enough to check. I declined that reading because `TokenGroup` is the name the plan says it dropped and the fleet `surface` rule reads bare names, not intentions. If the Orchestrator would rather see a `CONFIRMED` on `TOKENS` alone with the type gap as a finding, the outcome is unchanged: U3 must write both names before it dispatches.

3. **I treated "one writer at a time per checkout" as binding on U3 and U4.** The permission floor's sentence is unambiguous, but a reasonable reading is that disjoint file ownership plus git checkpointing is the real protection and the sentence targets formatter and build races. I refused that reading because U3 and U4 both run `check` and `build` scoped to their own files and both read a `dist/` the other's build rewrites. The Orchestrator may rule the other way and keep the parallelism with a rule that neither unit runs a build.

4. **I moved the oracle's recording after U6 rather than leaving it at U4.** That costs the plan its "U4 beside U3" parallelism twice over and pushes the oracle to the far side of the instrument work. The alternative is to record at U4 what the present verbs reach and schedule an explicit `ORACLE_REFRESH=1` pass inside U6's close. I prefer the move because a committed fixture that silently omits the hover and reduced-motion rows reads identical to one that covers them, and U7 compares against it without knowing.

5. **I scoped the app showcase to an empty shell at U1 rather than converting it.** Deleting Veneer's existing Bootstrap showcase markup discards a large hand-written specimen page. The alternative is to keep `index.html` and strip only the `bootstrap` imports, leaving markup for components Veneer has not built. I prefer the shell because U7's showcase row says "the showcase's first section renders every button specimen", which reads as a page built component by component, and because a page full of classes with no cascade behind them poisons `readCensus` for every journey that runs against it.

6. **I did not break claim 1 on the "reconcile it with the user's requirements" clause.** The plan lets the Orchestrator record an exclusion in `research/ledger.md` without a user decision, and § User decisions pending carries only two items. If the tenet means "ask the user", claim 1 has a carrier gap. I read it as "reconcile against `tenets.txt`", which the ledger step does.

## Risks

1. **The journey axis may not activate cleanly on an adopted workspace.** `.agents/skills/orkestrel-prove-journey/SKILL.md:88-95` describes activating it on a workspace born before the axis, but Veneer is not a Scaffold-born workspace at all — it is being adopted. Evidence that settles it: run `node ../scaffold/dist/bin/main.js repair --target ../veneer` after U1a writes the wrapper, and read whether the repaired root config defines `appJourney` and the manifest gains `test:journey`. Take that reading before U1b, because U7's whole evidence model rests on it.

2. **The `src:styles` wrapper may produce a `scaffold audit` question no plan edit can silence.** Claim 4's audit half is unresolved and F-2 shows the wrapper cannot be written as the plan describes. Evidence: `audit` output after U1b, quoted verbatim. If it reports a `projects` or `scripts` question the target cannot settle, the fallback is to collect the styles tests in the `src:browser` project under `tests/src/styles/**` through an include widening in a package-owned wrapper, and to build the CSS from `build:src:browser`'s own emit — a worse design, and the reason to take the reading early.

3. **Chromium may not enumerate custom properties from a stylesheet rule's declaration block.** If it does not, U3's entire parity mechanism must fall back to a Node-side read of the built `dist/src/styles/index.css`, which is a different test in a different project with a different setup. Evidence: the probe named under claim 3, run in U5 before U3 dispatches. Do not dispatch U3 on the present design without that reading.

4. **The `.active` compatibility contract may conflict with the owned engine's `pressed` state.** Bootstrap's `toggle()` writes `aria-pressed` from the result of the class toggle, so the class is the state and the attribute is derived. A Veneer engine holding `pressed` in a `#` field and writing both is deriving neither from the other, and a consumer's stylesheet toggling `.active` directly desynchronizes them. Evidence: a journey that adds `.active` through the interface and reads `pressed` and `aria-pressed`, run in U7. The design ruling belongs in U7's design round, not in this plan, but the plan must name the row.

5. **Deleting `app/browser`'s legacy markup removes the only specimen inventory Veneer has.** If U2's calibration map turns out to need a Veneer-side rendering of the legacy showcase for a departure comparison, the page is gone from the working tree. Evidence: it stays at `fc36cec`, and U2 reads Elements rather than Veneer, so I judge the risk low. Confirm by checking that no U2 or U3 line reads a Veneer specimen before approving the deletion.
