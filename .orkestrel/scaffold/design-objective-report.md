I held the **objective lane**: correctness, constraints, and what the rules, the published packages, the Vitest browser runner, Bootstrap 5.3, and the skill-shape law actually permit. Every load-bearing fact below was read first-hand in this session; I ran nothing (read-only lane), and I mark each unexecuted reading as such.

# Design

## The constraint that decides the architecture

Three rules, read first-hand, fix where the new material can go. Every proposal that ignores one of them fails a gate rather than a taste argument.

1. **A skill directory is closed.** `.claude/rules/documentation.md` § Workflow skills: "limit each skill directory to `SKILL.md`, `agents/openai.yaml`, and the `references/*.md` files its `SKILL.md` names; add no other file or directory." So the skill-creator principle "bundle a tool" is unsatisfiable inside a skill. A reusable instrument must ship as published package code or not exist.
2. **`enterprise-bootstrap` keeps its unprefixed name only while it stays stack-free.** Same section: the exception holds because the skill "carries Bootstrap 5.3 craft, assumes no stack, and names the `.agents/orchestration.md` and `.claude/rules/quality.md` files only where they are present. Add no other exception." A line naming `@orkestrel/test`, `@orkestrel/form`, `.claude/rules/tests.md`, or `.claude/rules/styles.md` forfeits the exception and forces a rename across `host.json`, the Claude bridge directory, and every reference to the skill by name in the fleet.
3. **A skill edit is a scaffold publish.** `host.json:28-63` vendors every `enterprise-bootstrap` file to `dist/host`, so each skill file added or renamed is a scaffold bump plus a `repair` visit and a gate re-run per target.

The design therefore splits on one seam: **stack-free rules go in `enterprise-bootstrap`; the Orkestrel instrument that runs them goes in `@orkestrel/test/browser` and is wired by `orkestrel-prove-journey`.** No third skill.

## Objective 1 — the input catalogue, stack-free

New file `.agents/skills/enterprise-bootstrap/references/controls.md`, named from `SKILL.md`'s layer table. Permitted by rule 1 (it is a `references/*.md` file `SKILL.md` names) and by rule 2 (it names input *categories*, never `@orkestrel/form`).

It carries one table keyed by input category, giving the default Bootstrap 5.3 affordance and the ladder rung it sits on. The mapping is objective — every class in it appears in `components.md:30-38`:

| Category | Default affordance | Note the rule must carry |
| --- | --- | --- |
| Single-line text, password | `input.form-control`; password adds an `input-group` reveal button | Never block paste (WCAG 3.3.8, `bootstrap-reference.md:366`) |
| Long text | `textarea.form-control` | A rich editor is rung 4; Bootstrap ships none |
| Number | `input[type=number].form-control`; `input.form-range` only when a minimum, a maximum, and a step are all fixed | `.form-range` paints no value bubble, so a range needs a visible read-out beside it |
| Date, time, date-and-time | native `input[type=date|time|datetime-local].form-control` | Bootstrap ships no picker; work the native-first ladder before building one |
| Color | `input.form-control-color` | Shipped class, no substitute needed |
| One on/off answer | `.form-check`, or `.form-check.form-switch` with `role="switch"` | Take the switch when the change applies immediately, the checkbox when it commits on submit |
| One of a closed list | `select.form-select`; a radio group in `.form-check` or a `.btn-check` segmented group for a short list | A `.btn-check` group carries `role="radiogroup"` and one accessible name |
| One of an open list | `input` plus `<datalist>`, or the APG combobox | Attaching a list changes the computed role to `combobox`; re-target every journey naming that field |
| Several of a closed list | `fieldset` + `legend` + `.form-check` rows | Bootstrap ships no `.form-check` color variant; a danger state needs a token-backed custom class |
| File | `input[type=file].form-control` | A dropzone is rung 4 and the file input is its required non-drag path (WCAG 2.5.7) |

A second table gives the states every affordance must render: required, help, error with its message, read-only-but-submitted, disabled-and-not-submitted, hidden, pending, plus hover, focus-visible, active, and invalid. Two rules the fleet already proved and the file must state:

- "Render a read-only field in the same control the edit state uses, so leaving edit mode reflows nothing. Declare the chrome classes that neutralize the control's border and shadow, and record why `.form-control-plaintext` was refused where its zero horizontal padding breaks the alignment."
- "Give a field one visible label. Refuse a placeholder as the label."

A third section lists the affordances Bootstrap 5.3 ships no component for — date picker, time picker, combobox, tags input, data grid, tree, splitter, rating, stepper, upload dropzone — and routes each to the existing native-first ladder in `bootstrap-reference.md` → When not to hand-roll. **Correction against the evidence:** skeletons are not in that set; `components.md:654` documents `.placeholder`.

## Objective 2 — the inspections

New file `.agents/skills/enterprise-bootstrap/references/inspection.md`. The "Mechanical proof" paragraph at `SKILL.md:86-92` moves here and `SKILL.md` keeps one pointer, which is what keeps `SKILL.md` short. The file states each check as a property with a membership rule and a negative control, per `.claude/rules/quality.md` § Instruments — which the exception permits it to name.

The checks:

- **Authored class in the shipped cascade.** Collect every class token the rendered tree carries, subtract the tokens the loaded stylesheets define, and fail on a remainder. Control: a class the cascade lacks. Population floor so an extractor matching nothing cannot pass.
- **Declared class combinations.** A chrome string of several utilities is declared once with the invariant it holds, and the check fails a combination that is not declared. A heuristic here is wrong: `taverna`'s read-mode chrome is a legitimate multi-utility string chosen because the skin ships no `border-transparent`, and a heuristic flags the fleet's best example.
- **Style escapes.** Fail on a `style` attribute or a `<style>` element in the surface's own markup. **This check has a false-positive source that changes its design:** Bootstrap's own JavaScript writes inline styles onto Modal, Offcanvas, Collapse, and Dropdown elements, and Vue's `v-show` emits `style="display: none"` at mount. So the check runs against a freshly mounted, undriven tree and declares its exemptions by name. An escape check run after a journey drives the surface reports on Bootstrap.
- **Token discipline.** Fail on a literal color in an authored rule, and read every custom paint back as a `var(--bs-…)` resolution in each color mode.
- **Custom rule doing a utility's job.** For each authored selector, name the utility that would have expressed it, or record why none does.
- **One glyph, one meaning.** A frozen meaning-to-glyph map refusing a repeated meaning and a repeated glyph, plus a resolution check against the shipped icon set.

The file states the coverage of each check beside it, because `quality.md` § Instruments reads an unstated coverage claim as complete. The authored-class check proves authored ⊆ cascade and says nothing about a cascade rule nobody authored.

## Objective 3 — the proof

`orkestrel-prove-journey` grows the Orkestrel half. Three corrections, the first of which is a defect in the current skill.

**`references/layer.md` currently instructs a rule violation.** It opens "Implement the signatures below as a contract in the workspace's browser test setup module; never copy them as source", and `@orkestrel/test` 0.0.11 publishes every signature it lists (`test/src/browser/helpers.ts`, exports confirmed by reading the file). `AGENTS.md` requires inspecting declared `@orkestrel/*` capabilities before implementing overlapping logic, and `.claude/rules/tests.md` § Shared test infrastructure says "Write a helper of your own only where the package exports none for the job." `layer.md` must be rewritten to bind the published surface: keep the failure-voice table, the role-vocabulary warnings, and the traversal contract as the vocabulary a journey codes against, and replace every "implement" directive with an import directive plus the one rule that remains true — "Add a journey helper only where `@orkestrel/test/browser` publishes none, and place it in the workspace's browser test setup module."

**The families become the integration-test shape.** `SKILL.md` declares the families a browser `integration.test.ts` can carry, and the always-on proofs assert that every declared family is present. "Options" cannot mean a switch that changes what is proven, because that would let a workspace opt out of the acceptance criteria; it means which families the surface declares:

| Family | Always on | Proves |
| --- | --- | --- |
| Journey | yes | Each user intent reaches its outcome through the interface |
| Refusal | yes | Each surface's unreachable controls, one exact failure voice each |
| Matrix | where the surface ships more than one variant | Resolved styles and contrast under each declared theme-and-viewport variant |
| Statechart | where the surface declares transitions | Each `source × event → target` row, driven through the interface |
| Transport | where the surface persists or restarts | Persistence and failure through real store implementations |
| Capture | under the capture flag | The registry times the variants, read back non-empty |

**One variant type, used twice.** The matrix family reuses the published `CaptureVariant { name, width, height, apply? }` rather than inventing a second viewport-and-theme shape. A matrix run loops every variant in one run applying `apply` and the viewport; a capture run renders one. This removes `taverna`'s locally defined `DESKTOP`, `MOBILE`, and `viewport()`, and it satisfies the "one concept, one term" law.

**Statechart runs a person watches.** The Vue harness in `elements/app/browser/playgrounds/StatechartHarness.vue` cannot be published: `@orkestrel/test` declares zero runtime dependencies and ships no browser application surface, so adding a Vue SFC to it breaks the package. The skill prescribes the harness contract instead — the transition list with per-row and play-all controls, the `role="status"` announcer, the automation attributes, the deep link, and the demo state — and `@orkestrel/test/browser` publishes only the transition and scenario types, the runner, and the automation attribute names as constants, so the harness and the test that drives it cannot drift.

## What `@orkestrel/test/browser` gains

Each addition names a real first consumer, per the `AGENTS.md` creation gate.

| Addition | First consumer | Why the package rather than a workspace |
| --- | --- | --- |
| `readClasses(root)` — every class token the rendered tree carries | The authored-class check `enterprise-bootstrap/SKILL.md:91` already mandates | It pairs with the published `readCascade()`; today every workspace writes it inline |
| `extractEscapes(root)` — markup of every element carrying a `style` attribute, plus every `<style>` element | The style-escape check | Matches `extractOrphans`'s existing offender-markup convention |
| `StateTransition`, `StateScenario` in core; `runScenarios` in browser | `elements` and `veneer`, which today declare it twice with **different signatures** — `runScenarios(scenarios, build)` against `runScenarios(name, build, scenarios)` | `.claude/rules/tests.md`: "Any duplicate or near-duplicate helper is a defect; consolidate it into one general form" |

Struck under the creation gate and the no-superfluous-wrapper law: a target-size helper (`getBoundingClientRect` is the call), a computed-style matrix (one consumer, and `style()` already answers per property), and a report writer (name it in the skill; publish it when a second consumer exists).

## The fast decision loop

**`prove` cannot serve a browser claim today.** Two blockers, both read first-hand and neither executed:

- `probe/src/server/helpers.ts:534` maps `tmp/probe/**` to the `probe` project and `tests/{src,app}/<environment>/**` to `<axis>:<environment>`. `terrain/vite.config.ts:145-158` configures `probe` as `environment: 'node'`, `browser: { enabled: false }`, setup `./tests/setup.ts` only. The only browser-collecting path is the tracked `tests/app/browser/**` tree, and `.claude/rules/tests.md` § Probes forbids a probe living there.
- `probe/src/server/stages/RuntimeStage.ts:196` hard-pins the pool: `project.createSpecification(file, undefined, 'threads')`. A browser-mode project is not a `threads` project, and `@orkestrel/test/browser` imports `vitest/browser` at module scope, so it fails to load in a Node worker.

So the loop splits by what the question is about:

- **`prove` owns the non-rendered half** — the control-to-affordance table, the declared class allowlist, the variant expansion, the glyph registry. Each supplies a project, a case, and a control, which is exactly the trigger `.claude/rules/quality.md` § Instruments names.
- **A rendered artifact owns the rendered half.** One browser run writes a single text document under `tmp/` composing `describeTree`, `describeFocus`, the resolved-style rows, the journal steps, and the capture filenames. The model reads that document in one Read call and decides. This is what the user's "similar to how you use artifacts" asks for, and it needs no probe change.

If the `absorb-tooling` slice finds the runtime stage does serve a browser project, one section is added to `references/cascade.md` naming the path and unit U3 lands; nothing structural moves.

# Alternatives

**A third skill holding all the new material.** Rejected on cost and routing. It adds a canonical directory, a matching bridge directory the parity rule requires, new `host.json` rows and roots, and a third overlapping description a model must choose among at dispatch time. It buys nothing the reference split does not, because the split is forced by the naming exception regardless.

**Publish the checks as a runnable inspector in `@orkestrel/test/browser` and let the skills point at it only.** Rejected because a check's *rule* and a check's *instrument* have different audiences. `enterprise-bootstrap` must work in a project with no Orkestrel packages installed; a skill that can only say "call `inspectSurface()`" teaches nothing there. The chosen split publishes the primitives the checks need and keeps the properties as prose, which is what the portability clause at `SKILL.md:44` requires.

# Units

Routing note: the Codex bench is dark, so every objective implementation unit runs on the Opus `implementer` rather than the Sol `sol` bridge. Record the substitution.

**U1 — publish the browser primitives.** Role `implementer`, engine Opus 5 (Sol substitution recorded). Owned: `test/src/browser/{types,constants,helpers,index}.ts`, `test/src/core/types.ts`, `test/tests/src/browser/*.test.ts`, `test/guides/test.md`. Depends: nothing. Accept: types precede implementation; each new export documented and parity-green; a test per helper carrying a control from outside its population (a class absent from the cascade; a tree with no escape; a transition table whose target state is wrong); scoped `check`, `lint:check`, and the `src:browser` project green.

**U2a / U2b — consolidate the statechart contract.** Role `implementer`, engine Opus 5. Owned: `elements/tests/setup.ts` and `setupBrowser.ts` in U2a; the `veneer` twins in U2b. Depends: U1 published and re-pinned. Accept: no local `runScenarios` or `StateTransition` declaration remains; both suites green with the same counts; this is a development-dependency bump, so re-pin and commit without a version bump or a publish.

**U3 — route a browser claim through `prove`.** Conditional on Tension 2. Role `implementer`, engine Opus 5. Owned: `probe/src/server/helpers.ts`, `probe/src/server/stages/RuntimeStage.ts`, their mirrored tests, `probe/guides/probe.md`. Depends: the `absorb-tooling` finding. Accept: a claim whose case asserts a resolved style and whose control asserts a false one mints a receipt; an existing Node claim still routes to `probe` unchanged; the guide documents the path.

**U4 — `enterprise-bootstrap` rewrite.** Role `implementer`, engine Opus 5. Owned: `.agents/skills/enterprise-bootstrap/SKILL.md`, `references/controls.md` (new), `references/inspection.md` (new), and the `host.json` rows the new files need. Depends: nothing. Accept: the directory holds only `SKILL.md`, `agents/openai.yaml`, and named `references/*.md`; `SKILL.md` names every reference and stays under about 500 lines; the file names no `@orkestrel/*` package and no rule file except `.agents/orchestration.md` and `.claude/rules/quality.md`; the writing substitution sweep reports its pattern and paths.

**U5 — `orkestrel-prove-journey` rewrite.** Role `implementer`, engine Opus 5. Owned: that skill's `SKILL.md`, `references/layer.md`, `references/captures.md`, `references/cascade.md` (new), and its `host.json` rows. Depends: U1, so `cascade.md` names real exports. Serialize behind U4 — both write scaffold. Accept: every signature `layer.md` names resolves to a `@orkestrel/test/browser` export; no "implement the signatures" directive remains; the family table and the accept clause agree.

**U6 — `terrain` as the reference implementation.** Role `implementer`, engine Opus 5. Owned: `terrain/tests/setupBrowser.ts`, `terrain/tests/app/browser/styles/tokens.test.ts`, `terrain/tests/app/browser/integration.test.ts`. Depends: U1, U5. Accept: the inline luminance math is replaced by `contrast` and `readRing` with the existing under-3:1 negative control still red; no locally defined helper the package publishes remains; red-then-green recorded per removal; the `app:browser` project green.

**U7 — mechanical conformance.** Role `checker`, engine Grok (ladder step 1). Read-only. Depends: U4, U5. Accept: every backticked symbol in both skills resolves; each skill directory holds only permitted files; `host.json` rows match the tree; the substitution sweep names its pattern and paths.

**U8 — gates.** Role `verifier`, engine Sonnet. One run per touched repository, after that repository's units exit. Accept: the ordered gate chain green, read bare.

Parallel: U1, U4 (different repositories). Serial: U4 → U5 (shared checkout); U1 → U2a, U2b, U6.

# Tensions

**1. Where does the new material live?**
Options: (a) inside the two existing skills, split on the stack-free seam — costs two new reference files, two `host.json` rows, one scaffold bump; (b) all inside `enterprise-bootstrap` — costs the naming exception, forcing a rename across `host.json`, the bridge directory, and every by-name reference in the fleet; (c) a third skill — costs a canonical directory, a bridge directory, new roots, and a third overlapping description at dispatch time.
Recommendation: (a). Option (b) is refused by `.claude/rules/documentation.md` § Workflow skills as written, not by preference.

**2. Does `probe` gain a browser lane?**
Options: (a) fix `inferTestProject` and the pinned pool so `tmp/probe/browser/**` routes to a browser project — costs one unit in `@orkestrel/probe`, a new project per target's `vite.config.ts`, and a Playwright launch per claim; (b) leave `prove` to non-rendered claims and give the rendered loop a written artifact — costs nothing in `probe`, and a model asking a rendered question reads a file instead of receiving a receipt.
Recommendation: (b) now, (a) as a successor once the artifact loop has a measured shortfall. The artifact loop needs no package change and the receipt discipline is preserved where it applies. Reverse this only if `absorb-tooling` reports the runtime stage already serves a browser project.

**3. Where does the statechart harness live?**
Options: (a) publish it — refused, `@orkestrel/test` declares zero runtime dependencies and ships no browser application surface; (b) prescribe the contract in the skill and publish only the types, the runner, and the automation attribute constants — costs each app re-writing the harness component; (c) keep it in `elements` and have other apps import from it — costs a runtime dependency on an application package.
Recommendation: (b).

**4. Does the class-combination check use a declared allowlist or a heuristic?**
Options: (a) allowlist — each multi-utility chrome string declared once with its invariant; costs a declaration per string and a test that the declaration is used; (b) heuristic on utility count or category mixing — costs false positives against `taverna`'s read-mode chrome, which is the fleet's best worked example.
Recommendation: (a). A check that flags the best existing answer will be disabled within one round.

**5. Does `@orkestrel/form` gain a browser renderer?**
Options: (a) publish `form/src/browser` implementing the catalogue — costs a Vue dependency in a package that ships core only, and the guide's own concept inventory parks presentation hints on the renderer deliberately; (b) keep the catalogue as skill prose and let each application render it — costs each application re-deciding, which is the drift the user is reporting; (c) publish the mapping as data — a frozen control-to-affordance table with no markup — so applications share the decision and not the components.
Recommendation: (b) this round, and open (c) as a successor brief. (a) contradicts the package's stated boundary and needs the user, not this round.

**6. Do the journey run and the polish capture harness both survive?**
Options: (a) keep both — `capture-harness.md`'s spawned-script lifecycle plus the browser run's own portfolio; costs two instruments producing the same artifacts with different failure modes, and the preflight rule then has two subjects; (b) make the browser journey run the portfolio source for any surface a Vitest browser project can drive, and keep the spawned harness only for a surface it cannot — costs one rewrite of `capture-harness.md`'s opening scope sentence.
Recommendation: (b). `describeTree` and `describeFocus` already produce the accessibility snapshot the harness table requires, and `createJournal` produces the interaction and console logs.

**7. Does the escape check run before or after the surface is driven?**
Options: (a) before, on a freshly mounted undriven tree, with `v-show` and named component exemptions declared — costs missing an escape a component writes at runtime; (b) after, with a Bootstrap-owned exclusion list — costs maintaining that list against Bootstrap's internals, which are not a published contract.
Recommendation: (a). The check's subject is authored markup, and a runtime style is the framework's, not the author's.

# Risks

- **The `prove` runtime-stage reading is unexecuted.** I read `RuntimeStage.ts:196` and `helpers.ts:534` and inferred that a browser project cannot run there. I did not run a claim. Settle it with the `absorb-tooling` slice, or with one throwaway claim against a browser-enabled project before U3 is planned. Tension 2's recommendation does not depend on the answer; U3 does.
- **`readClasses` coverage is one-directional.** It proves authored ⊆ cascade. A cascade rule nobody authored, and a class a framework generates at build time, are both outside it. State that coverage beside the check or the conclusion will be read as complete.
- **`extractEscapes` against a driven tree reports Bootstrap.** Modal, Offcanvas, Collapse, and Dropdown write inline styles. The undriven-tree rule is the mitigation; a unit that wires the check into a journey rather than a mount will produce a red run that reads as a product defect.
- **The scaffold bump cascade.** U4 and U5 both move vendored `dist/host` bytes, so the fleet re-pins `@orkestrel/scaffold`, runs `repair`, and re-runs gates. `repair` restores `tests/setupPolicy.ts` and `tests/policy.test.ts`, so a vendored-only release can turn a green target red. Budget the target visits with the skill work, not after it.
- **Pending Grok evidence.** Three facts I did not settle: whether any fleet application ships status glyphs, which would gate the glyph registry's first consumer; whether `elements` or `veneer` has a consumer that the consolidated `runScenarios` signature cannot serve; and whether any target's `tests/config.test.ts` refuses an extra registered project label, which decides U3's per-target cost. Each is named as pending rather than guessed.
- **`SKILL.md` length.** `enterprise-bootstrap/SKILL.md` is at 241 lines and U4 adds table rows and checklist lines while moving the mechanical-proof paragraph out. The net must stay under about 500 lines; check it as an acceptance criterion rather than assuming the move pays for the additions.
