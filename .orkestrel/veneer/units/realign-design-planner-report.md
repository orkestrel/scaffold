<!-- Design round, subjective lane: `planner` on Opus 5 (native subagent), returned 2026-09-22. Brief: units/realign-design-brief.md. Blind report, retained verbatim. -->

# Unit REALIGN-DESIGN — subjective lane

I held the **subjective** lane (`planner` on Opus 5, native Claude subagent, read-only). `Constraints`, `Refusals`, and `Measurements` are the objective lane's and are left empty.

## Design

**The ruling in one line.** Replace `plan.md`, then run a bounded foundation-realignment phase (units R1 to R11) that repairs self-containment, the accounting direction, the capture grammar, the selector parser, and the Tailwind contract *before* any of the six later families opens — because each of those defects costs 104 keys and 2771 selectors more to retrofit than it costs to fix at 31 (`units/remaining-surface.md:9-16`, `:24-26`).

### 1. Plan shape — replace

Replace it. `plan.md` is 2190 lines of which the executable plan is about 640 (brief § Measurements), and `tenets.txt:57-58` requires plans "direct, concise, actionable, and useful to another LLM". The re-baseline diary from `plan.md:645` to `plan.md:2190` is a record of decisions already taken; `.agents/orchestration.md` § Where campaign artifacts live says git history is the archive and the working tree is the workspace.

The replacement carries only what a unit reads:

- Authority and routing (from `plan.md:22-52`, with the Astra pin corrected to `gpt-6-astra` and the `gpt-5.6-sol` references struck).
- Standing conditions (from `plan.md:74-90`), re-measured on this host: the Chromium receipt is 141 here, not 151 (`units/event-target-probe.md:3-5`).
- The product decision table (`plan.md:98-116`), with its Vue row and its Runtime row rewritten to the ruling in item 8.
- The exit criterion, restated per item 14.
- The family queue with each family's key set, absorbing `research/ledger.md:15-30`'s unit-to-key table.
- The open-question register with a named carrier per row (item 13).

Everything else moves to git history through the prune. `handoff.md` goes with it: every path it states is a Windows path (`handoff.md:20-23`) that resolves to nothing on this host, and its debris list (`handoff.md:126`) names `The`, `journey`, `records,` while the tree carries `This` and `TypeScript`. A handoff file whose facts are stale is worse than none, because the next session reads it as current.

**Do not record status in the plan.** `.agents/orchestration.md` § Where campaign artifacts live says prefer a mechanism that recomputes a fact. "Which keys ship" is recomputed by `tests/conformance.test.ts` reading the guide's Compatibility rows (`tests/setupConformance.ts:761-799`). The plan states the queue and the criterion; the run states the status.

### 2. Foundation self-containment — fix it first, in this order

Veneer is red from its own lockfile (`check` exit 2, `test` exit 1, brief § Measurements). That fails the first tenet: a package that cannot install and pass from its committed lockfile is not a proper Orkestrel package.

Order: **R3** repairs the Test tip's lockfile (`@types/node` `26.6.1` against `26.6.2`, `units/test-tip-vendor.md:13-15`) → **R4** the user publishes Test `0.0.19` on a one-time code → **R5** Veneer re-pins to `^0.0.19`, runs `npm ci` from the lockfile alone, and proves the chain green.

Until it lands, Veneer stays on the vendored tarball with the replaced range recorded (`units/test-tip-vendor.md:8-12`), and three things are barred: `tests/distribution.test.ts` as evidence of anything, any publish, and any new family. A family opened against a red baseline produces gate readings nobody can interpret.

**Both branches of the Unknown.** If the user publishes before the next unit, R5 runs and the standing condition disappears from every later brief. If the user does not, R6 through R10 still run on the vendored tarball, R5 holds, and every brief carries "`npm ci` is red; install is the tip tarball" as a standing condition — and R5 must re-run the whole chain afterwards, so the interim gate evidence is provisional. Publish first: it is one mechanical unit plus one approval window, and it removes a false condition from every brief that follows.

### 3. Host-varying assertions — one rule, one recorder

The two failures are instances of a class: **an assertion reads a property the host environment is free to reset after the observation window closes.** `event.target` is `null` after `dispatchEvent` returns on a detached host in Chromium 141 and was the host in 151 (`units/event-target-probe.md:7-10`).

The rule that closes the class, stated so a run can check it:

> Every browser proof mounts its specimen in the document, and observes an event's `target`, `currentTarget`, `relatedTarget`, or `composedPath()` only inside the listener, asserting on the recorded snapshot.

Mechanism: one recorder in `tests/setupBrowser.ts` that captures those fields during dispatch and returns them. A recorder is an explicitly permitted instrument (`AGENTS.md` § Non-negotiable rules), unlike a spy. Route every event assertion through it, and prove the recorder itself against both an attached and a detached host, so the case that catches the regression exists rather than being asserted.

**Second half of the same class.** The receipts are unpinned in practice: Playwright `1.63.0` resolves `chromium-1243` and the host carries `chromium-1194` (brief § Host). Add to each recorded receipt the browser build that produced it, and rule that a reading which changes across builds is a defect in the assertion until proved a defect in the cascade.

### 4. The selector grammar — retire its judging half

`tests/setupStyles.ts` carries a hand-written CSS selector reader: `readEscape`, `walkSelector`, `readIdentifier`, `extractSelectorIdentifiers`, `findGroupEnd`, `splitTopLevelList`, `splitTopLevelCompounds`, `extractCompoundTags`, `extractSelectorCompounds`, `scanUnreadForm`, `matchesLooseTagPair` — roughly `tests/setupStyles.ts:1979` through `:2553`. `AGENTS.md` § Project model bars a second parser that duplicates CSS, and `tenets.txt:54-55` treats an AST as an aid rather than a requirement to build a parser.

Split it by what each part produces:

- **Keep the normalizer.** `normalizeComplexSelector` canonicalizes whitespace and escapes so a recorded name and an emitted name compare equal. `tests/setupConformance.ts:27` already imports it and applies it to `rule.selectors`, which **postcss** produced (`tests/setupConformance.ts:25`, `:762-764`). That is a string normalizer over a parser's output, not a parser. Move it to `tests/setupConformance.ts` beside its only consumer.
- **Retire the rest.** Its entire product is one boolean: `matchesLooseTagPair`, consumed by `tests/src/styles/index.test.ts:23-26`. Replace the judgment with the rendered proof the plan already owes: mount each styled bare tag alone and inside every other styled tag with equal inherited inputs, and assert equal computed styles. That is `plan.md:566`'s own Semantics/classes closing row and `tenets.txt:38` and `:55` ("Keep final rendered and interactive browser evidence decisive").

**What each option costs the accounting proofs.** The presence scan, the deferral refusal, and the breakpoint bindings compare *selector strings*; they need the normalizer and nothing else, so retiring the parser leaves them untouched. The only proof that loses machinery is the tag-pair one, and it gains reach: `scanUnreadForm` refuses `:has()`, `:is()`, `:where()`, and `nth-of` clauses by throwing (`tests/setupStyles.ts:2503-2508`), so a loose pair written in a form it refuses is unreadable today. A rendered proof reads every form, including a pair emitted only inside a media block.

**Cost against it:** the rendered proof is O(tags × tags) mounts. Bound it to the tags Veneer styles crossed with the tags a Bootstrap contextual Reboot rule names, which is a fraction of the full square, and it stays inside a browser project's normal budget.

### 5. Value accounting — yes, first, and here is its machine-checkable shape

It is the first cross-cutting unit and it runs before any family opens. The user's standing ruling requires every selector a key carries to end shipped, excluded with a reason, or recorded as a departure, in the machine-checkable form. Today nothing compares declaration values at all, and nothing rejects an unrecorded selector outside the keys the comparison's tuple names (`units/value-accounting-finding.md:20-38`). The finding's own recommendation was "after the Content/layout family closes" (`:84-86`). The family has closed (`plan.md:2156`), so the trigger has fired.

Shape:

- A **`### Departures` table in `guides/veneer.md`**, read by a `readDepartures` function in `tests/setupConformance.ts` the way `readDeferrals` is read (`guides/veneer.md:307-310`), with columns `Component`, `Selector`, `Property`, `Recorded`, `Emitted`, `Departure`.
- A **`departure` discriminant** as a real domain union naming the axis that varies, per `AGENTS.md` § Design laws — never `kind` or `type`. Its members come from the measurement's own classes (`units/value-accounting-finding.md:41-51`): `tokenized`, `aliased`, `declared`, `fallback`, `dropped`.
- A **value gate**: every emitted declaration under a recorded key's selectors equals its recorded value, or equals the `Emitted` cell of a departure row that names it. A departure row whose emitted value no longer matches reddens.
- An **extra-name refusal**: every selector the compiled cascade emits maps to a recorded key, or to a row in the same table carrying `addition`. Neither, and it reddens. This generalizes what CL8's fix round retains for the grid keys (`units/value-accounting-finding.md:25-26`).
- **Compile unminified.** The built artifact is minified, so comparing against it asserts the minifier's rounding rather than the code (`units/value-accounting-finding.md:6-8`).

The authored table is the cost: five keys alone carry 294, 103, 99, 34, and 18 differing declarations (`units/value-accounting-finding.md:32-37`). That cost is the argument for doing it at 31 keys rather than at 135.

### 6. The ledger's home — the guide, and only the guide

**`guides/veneer.md` § Compatibility + § Deferred selectors + the new § Departures is the definition of done.** It is already the machine-read artifact: `readCompatibility` and `readDeferrals` parse its rows and `tests/conformance.test.ts` asserts them (`tests/setupConformance.ts:761-799`, `guides/veneer.md:896-899`, `:307-310`).

The other two get fixed roles:

- `research/inventory.json` (mirrored at `tests/fixtures/oracle/inventory.json`) is the **pinned upstream record** — an input the comparison reads, never a status anyone edits.
- `research/ledger.md` is **deleted**. It is prose, and it has been false since U7: every row other than Button reads `open` (`research/ledger.md:10-11`) while 31 keys ship. Its only non-derivable content is the unit-to-key assignment table (`research/ledger.md:15-30`), which moves into the replacement plan's family queue.

The plan keeps exactly one by keeping no status of its own: the queue names which family owns which keys, and the run names which of them ship.

### 7. What the plan owes Elements — and the grid gap, named

**Elements has no grid.** G3 mapped Elements' style tree and found `components/_body.scss`, `_nav.scss`, `_article.scss`, `_aside.scss`, `_form.scss` and an `elements/src/styles/index.scss:18-26` entry with no grid partial; its layout mechanism is `body:has(main)` becoming a grid and `main > section` zeroing padding (`g3-references-report.md:45`). There is no `.row`/`.col` specimen to judge against. So the open question "the grid judged against Bootstrap's page rather than an Elements specimen" (`handoff.md:322`) is not a deferral — it is **closed as unreachable**, and the plan records it with that evidence rather than carrying it forward.

What Elements does owe layout, and what each later family takes from it: the spacing scale, the container widths, the section rhythm, and the motion tokens (`--set-transition-duration: 150ms`, `--set-motion-duration: 250ms`, `cubic-bezier(0.32, 0.72, 0, 1)` — `g3-references-report.md:21`). Those are measurable from Elements' rendered specimens and belong in each family's calibration record.

**The evidence that closes each rendered-appearance question** (`handoff.md:303-313`) is one shape, not eight answers: a side-by-side capture of the same specimen at the same viewport and mode — Veneer, Elements, and Bootstrap — with the measured value printed beside each frame, ruled through `orkestrel-polish-surface`. For the contrast row the packet must additionally print the measured ratio and the ratio of the alternative, because the user is choosing between Elements fidelity and the 4.5:1 floor and cannot choose from one number. R11 assembles that packet; R6 must land first, or the frames are unreadable (item 4 of § Refusals is the objective lane's; the reason here is that the grammar inverts).

### 8. Vue — refuse the optional peer; recommend the injected adapter. **The choice is the user's.**

`tenets.txt:17` forbids hiding a forbidden runtime behind a peer dependency, and `tenets.txt:20` requires a Vue adapter over the owned engine without making Vue a runtime dependency. The plan's deferred design declares `vue` under `peerDependencies` with optional meta (`plan.md:625-627`). A peer dependency is a declared runtime requirement of the `./vue` entry, so that delivery reads against the tenet's letter.

Veneer is in a better position than either reference for this. Elements and Mailbox both declare `@vue/reactivity` as a runtime dependency because their factories import `ref`, `computed`, and `effectScope` (`g3-references-report.md:39`, `:41`). Veneer's engine holds `#` fields and derives its state from the DOM — `Button.pressed` reads the class on every access, `ColorMode.mode` reads the attribute (`g2-veneer-report.md:128`, `:132`) — so it needs no reactivity at all.

Options, each with cost:

| Option | Cost | Ruling |
| --- | --- | --- |
| **Injected adapter** — `src/browser` gains one adapter that takes the consumer's reactive setter and returns a release function; it imports nothing | Manifest unchanged, `FORBIDDEN_RUNTIME` sweep unchanged, no new entry, no new environment, no scaffold prerequisite. The consumer writes three lines of `vue` glue. Slightly less ergonomic than a ready-made composable | **Recommended** |
| `./vue` entry treating `vue` as an undeclared external | Breaks the import-closure control (`plan.md:100`) and the `FORBIDDEN_RUNTIME` sweep (`tests/setupConformance.ts:215-221`), which name `vue` outright. An undeclared import is also an unresolvable one for a consumer without Vue | Refused |
| Separate package | Clean under the tenet, and the layering cost is a whole release lane plus a catalog row for a surface with no consumer yet | Available; the user's call |

Whichever the user picks, the proof is the same and it is required: a real Vue consumer mounting a real component that drives the real engine, executed in `tests/`. `vue` `^3.5.43` and `@vitejs/plugin-vue` are already devDependencies and the `app:browser` project already loads the Vue plugin (`g2-veneer-report.md:190`, `:236`), so the wiring exists.

**A foundation defect this exposes.** `bindEventMap` is named as a general binder and is hard-wired to `ButtonHooks` and `BUTTON_TOGGLE` (`src/browser/helpers.ts:33-48`). With Collapse, Dropdown, Modal, Offcanvas, Tooltip, Popover, Toast, and Carousel still to come, it will be copied per entity or generalized under pressure. Generalize it now, in R10, while one entity consumes it — that is the same edit as the adapter surface, so they are one unit.

### 9. Tailwind — move it forward of Passive

`plan.md:592` opens the Tailwind unit after Button and Card. Card sits in the Passive family, which has not opened. Move it into the foundation phase (R9), directly after the accounting unit.

The reason is the layer contract. The order is declared once, in `src/styles/_tokens.scss:4` (`@layer theme, reset, base, elements, components, utilities`), and every family emits into it. What Tailwind co-existence tests is Preflight against Veneer's tag defaults and utility precedence between Tailwind's utilities and Veneer's `utilities` layer — both fully exercisable today against the shipped `utilities/_gap.scss`, the element partials, and `.btn`. Waiting for Card buys no additional coverage and risks discovering a layer-order change after six families have emitted into the current one.

`styles-axis-design-verdict.md:20` already holds `tests/setup.css` for this unit, so the wiring is designed and unexecuted.

### 10. Semantic tags and class control — both answers, with the second qualified

**No published selector infers a component from tag position.** The combinator hits in `src/styles/` all have a class as the subject's anchor: `.table > tbody`, `.table-striped > tbody > tr:nth-of-type(odd) > *`, `.table-hover > tbody > tr:hover > *`, `.table > :not(caption) > * > *` (`g2-veneer-report.md:159-179`). The one bare-tag positional rule in the tree, `header button`, is in `app/browser/styles/_shell.scss:25`, which is the showcase shell and ships in no published entry. Element partials style each tag as its own rule, with `fieldset`/`legend`, `dl`/`dt`/`dd`, `figure`/`figcaption`, and `table`/`caption` written as separate rules rather than combinators (`g2-veneer-report.md:152`). The contextual tag pairs Bootstrap ships are refused with recorded reasons (`guides/veneer.md:314-321`).

That is the tenet satisfied — but it is satisfied by a *scan* today, and the scan is the parser item 4 retires. R8's rendered proof is what keeps it satisfied after the parser goes.

**Class override is proved for the utilities layer, and the proof is the opposite of what a reader expects.** A consumer's unlayered rule loaded after the cascade loses to the utility, which sits in the last layer and carries important priority (`plan.md:1941-1943`). That is Bootstrap-faithful — Bootstrap's utilities are `!important` too — and it means a consumer escapes a Veneer utility with their own `!important`, not with specificity. Record that as the contract in the guide rather than leaving a reader to discover it, because `tenets.txt:29` promises no specificity battles and this row is the one place the promise needs its exact wording.

**The gap:** no equivalent proof exists for a *component* class overriding a tag default at equal or lower specificity against an unlayered consumer rule. R8 owns adding it, because the same rendered harness answers it.

### 11. The engine's shape for the remaining families

Adopt, each with its source and its reason:

- **Explicit construction, no import-time scan.** Both references construct through an explicit entry point and neither scans `data-bs-toggle` in `src/` (`g3-references-report.md:13`, `:15`). Veneer already separates the data API into `Delegate`, which keeps `./browser` pure (`plan.md:107`).
- **The cancelable/non-cancelable event split.** Elements splits `dispatch` (cancelable) from `emit` (non-cancelable) (`g3-references-report.md:13`). Veneer ships only the non-cancelable `emitEvent` (`src/browser/helpers.ts:17-19`). Bootstrap's `show.bs.*` contract is cancelable, so Collapse, Dropdown, Modal, and Offcanvas cannot be built without the other half. Add it in R10, one word, one concept.
- **`createFocus` as a shared focus primitive with Tab trapping and focus restore** (`g3-references-report.md:13`), consumed by Modal and Offcanvas as Mailbox does. `plan.md:110` already rules that a native popover supplies no modal containment, so this is required rather than optional.
- **Native-first placement and disclosure**: `<dialog>.showModal()`, `showPopover`/`hidePopover`, `<details>`/`::details-content`, `anchor-name` and `position-area`. All are used by both references and available in Chromium (`g3-references-report.md:33`, `:35`).
- **Reduced-motion gating in JavaScript, not only in CSS**: Mailbox skips carousel autoplay and drag autoscroll under the query (`g3-references-report.md:23`).
- **`IntersectionObserver` for Scrollspy** (`g3-references-report.md:33`, `:35`).
- **Transition completion on `transitionend`**, which satisfies `AGENTS.md` § Design laws "No polling architecture".

Refuse, each with its reason:

- **`@vue/reactivity` in the engine.** Both references declare it as a runtime dependency (`g3-references-report.md:5`, `:7`). `tenets.txt:17` forbids it and Veneer's derived-state classes do not need it.
- **The `create*` factory idiom.** Veneer ships classes with `#` fields; `AGENTS.md` § Design laws fixes one concept to one term, and mixing factories with classes breaks it.
- **The fixed 400 ms `transitionend` fallback** both references use (`g3-references-report.md:21`, `:23`). Mailbox's own record says carousel motion exceeds it on purpose (`mailbox/src/styles/_tokens.scss:1615-1617`), which makes the fallback a silent truncation. Read the element's resolved `transition-duration` and use a bounded ceiling only as a refusal, not as a completion.
- **Mailbox's `visibility: visible !important` workaround for Tailwind's `.collapse`** (`g3-references-report.md:53`). An `!important` in a component layer is the specificity battle `tenets.txt:29` bars. R9 rules it as a named constraint of the Tailwind profile instead.
- **Post-`destroy()` DOM mutation.** Mailbox records that its popover's `show`/`hide` still mutate after `destroy()` (`g3-references-report.md:53`). Veneer's `Button.toggle` already returns state without writing after destruction (`g2-veneer-report.md:128`); make that the fleet rule for every entity and prove it per entity.
- **Position-based bare-tag rules.** Elements' `body:has(main)` grid, `body:has(main) > nav` rail, and `main > section` padding reset (`g3-references-report.md:45`) are barred by `tenets.txt:26` — and Elements' own `ROADMAP.md:13-23` records them as due for removal, so refusing them follows the reference rather than departing from it.
- **`@starting-style` entry transitions as a default.** Both references record a Chrome regression that stuck the first open at opacity 0 (`g3-references-report.md:51`, `:53`). Carry the recorded regression into the Overlays design round as a known-defect input and prove the entry frame on a capture; do not copy either workaround blind.

### 12. Process cost — the protocol, and where rounds go that no rule requires

Per family: one `grok` terrain record; one design round on one brief with both lanes; one `verifier` gate run at the family's close; one portfolio verdict round.

Per unit: a brief file that restates no measurement and points at the terrain record; one writer; one audit round with both lanes on one claims file; `checker` only where a criterion is mechanical; a landing through one shared parameterized script; one verdict file; one plan queue line.

Rounds the current protocol spends that the rules do not require:

- **A `grok` scope read per unit.** `.agents/orchestration.md` § Check the brief before you send it makes the check the Orchestrator's, not a dispatched unit's. Where the family terrain record already covers the unit's files, the scope read duplicates it. Keep a scope read only for a unit touching files no earlier unit in the family touched.
- **A full `verifier` gate chain per unit.** Step 6 of § Execution loop runs one independent verifier per loop pass, and a family is one pass. Scoped checks over owned files stay the unit's own criterion; the authoritative chain runs at the family's close and at any landing that moves the manifest or a config.
- **A `checker` on every round.** Step 5 says "in addition when the acceptance criteria are mechanical — never in place of a lane". A unit whose criteria are all behavioural needs no checker.
- **Fix rounds on prose findings.** The user's standing ruling already bars them and names the mechanism — a claims file carries no guide-row claim (`handoff.md:170-177`). Enforcement, not a new rule.
- **A landing script per unit.** One parameterized script taking the allowlist as an argument replaces the per-unit copies, and it is one retained instrument rather than a growing set.

That is the shape the measurement argues for too: utilities are many keys of few selectors sharing one mechanism, components are few keys of many selectors each needing their own (`units/remaining-surface.md:60-69`). **Size the Helpers/utilities family by mechanism, not by key** — one unit for the step-times-breakpoint ramp covering the whole spacing set, one for the display and flex set, and so on — or that family alone reproduces the Content/layout unit count over a larger surface.

### 13. Carriers

Every `no carrier named` row in `g1-record-report.md` § D, resolved. Carriers are units in § Units.

| Row | Carrier |
| --- | --- |
| Outline ghost; dark primary contrast; latched `.active`; repaired control; heading scale; mark highlight; link colours; link-styled button colour; older highlight token pair | **R11** decision packet |
| Grid judged against Bootstrap's page | **R11**, with the ruling of item 7: no Elements grid specimen exists |
| Build dropping vendor prefixes | **R11**, as an accepted difference needing no action |
| `::-moz-focus-inner` exclusion | **Drop from the open list.** It is closed, recorded at `guides/veneer.md:322` with its reason |
| Two deferral grammars | **R1**, which unifies them in the replacement plan and the guide |
| Container navigation combinators | **N0**, the Disclosure/navigation design round, which deletes those deferral rows |
| Registry later majors; `pool: 'forks'` pin | **R11** |
| Forced-colours axis | **R3** (the Test unit), landing in `0.0.19` |
| Chrome receipt open | **R11** for the install decision; **R2** for pinning the build into each receipt |
| U1-del legacy tree in the working tree | **Drop.** `fc36cec` is reachable in git history; keeping a working-tree copy contradicts § Where campaign artifacts live. **R1** carries the deletion |
| Cross-cutting reconciliation | **R7**. No longer open |
| CL8b gap-triple (`gap`, `column-gap`) | **H-gap**, the Helpers/utilities gap unit. Proposed ruling: leave them there. Pulling two keys into a closed family re-opens its exit criterion, which is a rescope |
| U7c paint calibration readings | **R11** |
| Frame grammar; unaligned stems; one-sided palette gap; accessibility comparability; link key's single anchor; pixel guard under the capture flag; sampler origin pixel; mirror instrument's base-name comparison | **R6**. Moved out of "the next family's capture work" (`cl13-verdict.md:155`) into the foundation: it corrupts the reading method for every family including the landed Button family |
| Caption opt-out | **R1** for the recorded consequence in the guide; **R6** for the specimen the class-redundancy half needs |
| Portfolio findings 5 and 7 | **Keep the existing drop.** `cl13-verdict.md:160` states the reason: neither changes what the tree does |
| Helper key with no subject region has no showcase home | **H0**, the Helpers/utilities design round |
| Normalizer regression case's local inventory literal; token-table completeness gate and its named trap | **R7**, which owns `tests/setupConformance.ts` and the gates |
| "specimen" term collision on the browser setup module's public surface; stripe light-scope assertion; shell's document-global `main` id; description-list case field's name | **R2**, which owns the test-surface realignment. "The next unit that owns each file" is a condition, not a unit |
| `visitBreakpoint` bare `finally`; hold's uncased refusals; `resolveButton` rename; `driveOracle` root scoping | **Drop as satisfied.** `plan.md:2080` records them closed by CL11; `handoff.md:143` and `:287` are stale. **R1** removes the stale text |
| Guide bounds | **Drop as satisfied** per `plan.md:2120`; **R1** confirms while rewriting |

### 14. The exit criterion, enumerated and closable

The campaign ends when each capability ends implemented, repaired, retained, or intentionally excluded on evidence the user has seen.

1. **Self-containment.** `npm ci` from the committed lockfile, then the gate chain, exits 0 with no `--no-save` install. [R5]
2. **Accounting closure.** Every selector and every declaration the compiled cascade emits maps to a recorded key at its recorded value, to a departure row whose class and emitted value match, or to an addition row; and every recorded name ships or holds a deferral row naming its owner. [R7, then each family]
3. **Compatibility coverage.** Each of the 135 recorded keys (`units/remaining-surface.md:11`) ends `shipped`, deferred with an owner, or excluded with a reason. [families]
4. **Rendered acceptance.** Every shipped key carries capture evidence at its declared states and variants, read through a grammar whose two sides align, ruled through `orkestrel-polish-surface`. [R6, then each family]
5. **Semantic independence.** Every bare tag Veneer styles renders identically alone and inside every other styled tag, proved by run rather than by scan. [R8]
6. **Class control.** Every component class overrides its tag default at equal or lower specificity through layer order, and every utility's priority against an unlayered consumer rule is proved and documented. [R8, then families]
7. **Tailwind co-existence.** The standalone profile and each supported Tailwind profile are proved in the browser against a real Tailwind build. [R9]
8. **Runtime independence.** No runtime `dependencies` outside `@orkestrel/*` and no `peerDependencies` naming a forbidden runtime, proved by the manifest sweep, the import closure, the rolled-up declarations, and the installed-consumer proof. [standing, R10]
9. **Framework adapter.** A real Vue consumer drives the owned engine through an executed recipe, with Veneer's manifest unchanged. [R10]
10. **One ledger.** The guide is the single machine-read artifact; `research/ledger.md` is deleted; the plan records no status a run recomputes. [R1, R7]
11. **Receipts.** Each recorded receipt names its browser build. [R2]
12. **Record discipline.** The campaign folder is pruned per `orkestrel-debrief/references/retention.md`, and every fact the plan states is derived by a named command or cited to a retained verdict. [R1]

Vue delivery beyond item 9's proof, and publication, stay separate user-directed tasks.

## Alternatives

**Alternative A for the plan (item 1): split the diary out, keep `plan.md`.** Move `plan.md:645-2190` to `.orkestrel/veneer/rebaselines.md` and leave the spine. Cost: the spine still carries per-unit status the conformance run recomputes, the Windows paths survive, and the routing block still names `gpt-5.6-sol`. It is cheaper by one unit and leaves every defect item 1 names, so the next session re-derives them. The replacement wins because the diary is not the only stale part.

**Alternative B for the selector grammar (item 4): move it to the CSSOM.** The browser already parses the cascade and `tests/src/styles/index.test.ts` already reads it through `readCascadeSheet` and `collectLayer` (`g2-veneer-report.md:194`). Cost: `CSSStyleRule.selectorText` is a *string*. The CSSOM does not decompose a selector into compounds and combinators, so it removes the file read and keeps the parser. It is a partial move presented as an answer, and it leaves `walkSelector` and `extractSelectorCompounds` in the tree. The rendered proof wins because it deletes the parser rather than relocating its input.

**Alternative C for the selector grammar: `postcss-selector-parser`.** It is the right tool and it is not installed — no `node_modules/postcss-selector-parser` resolves in the Veneer checkout — so adding it needs the user's explicit request under `AGENTS.md` § Non-negotiable rules. Cost if the user grants it: one devDependency, the parser deleted, `matchesLooseTagPair` rewritten over a real selector AST, and the tag-pair judgment stays a static scan that a media-block or `:is()` emission can still evade. The rendered proof wins on reach even where the package is granted; grant the package only if a later family needs selector decomposition for something a render cannot answer.

## Constraints

*(Objective lane's section.)*

## Refusals

*(Objective lane's section.)*

## Measurements

*(Objective lane's section.)*

## Units

Writers serialize per checkout. R1 (scaffold) and R3 (Test) run beside the Veneer chain. R2 → R5 → R6 → R8 → R7 → R9 → R10 is one Veneer writer at a time.

**R1 — Plan replacement and record prune**
Role and engine: `opus` on Opus 5 (native). Checkout: scaffold.
Owns: `.orkestrel/veneer/plan.md` (rewritten whole), `.orkestrel/veneer/handoff.md` (deleted), a prune list file naming every `.orkestrel/veneer/**` path to delete and every promotion target. Shared, report-only: `.orkestrel/veneer/tenets.txt`. Off-limits: every retained verdict and report; the Orchestrator commits and deletes.
Depends on: nothing.
Acceptance: the replacement is under 400 lines; it carries no re-baseline entry and no per-unit status a run recomputes; every path in it resolves from `/home/user/scaffold`; the routing block names `gpt-6-astra` and no `gpt-5.6-sol`; the family queue absorbs `research/ledger.md:15-30`; the open-question register carries a named unit per row per item 13; the prune list names `research/ledger.md`, `handoff.md`, and each swept path, and names the durable artifact each promotion lands in.

**R2 — Host-varying assertions and the test-surface realignment**
Role and engine: `sol` on GPT-6 Astra. Checkout: Veneer.
Owns: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/src/browser/Button.test.ts`, `tests/src/browser/helpers.test.ts`, `tests/setupStyles.ts` (the description-list case field only), `tests/src/styles/components/table.test.ts` (the stripe light-scope assertion), `app/browser/Showcase.ts` and `tests/app/browser/Showcase.test.ts` (the document-global `main` id). Off-limits: `tests/setupPolicy.ts`, `tests/policy.test.ts` (restored by `scaffold repair`), `src/**`.
Depends on: nothing (runs on the vendored tarball).
Acceptance: an event recorder exists in `tests/setupBrowser.ts` capturing `target`, `currentTarget`, `relatedTarget`, and `composedPath()` inside the listener; `tests/setupBrowser.test.ts` proves it against an attached host and a detached host; no file it owns reads a mutable event field off a stored event; `npm run test:src:browser` exits 0; the "specimen" term collision on the browser setup module's public surface is resolved to one term; each receipt the owned files record names its browser build. Observation, not a criterion: the whole-suite reading.

**R3 — Test lockfile repair and the forced-colours axis**
Role and engine: `builder` on Sonnet (native; lockfile generation needs network, which a bench sandbox denies). Checkout: `/home/user/orkestrel/test`. The Orchestrator runs `npm install` as a tracked command.
Owns: `package.json`, `package-lock.json`, and the `MediaOptions` forced-colours axis with its proof and guide row.
Depends on: nothing.
Acceptance: `npm ci` succeeds from the committed lockfile; `format:check`, `lint:check`, `check`, `build` exit 0; the forced-colours axis is exported, proved, and documented in `guides/test.md`.

**R4 — Publish `@orkestrel/test` 0.0.19**
Role and engine: **user action** on a one-time code; the Orchestrator prepares and surfaces the approval.
Depends on: R3.
Acceptance: the registry serves `0.0.19` carrying `stageMedia`, `releaseMedia`, `holdAccessible`, `hoverAccessible`, `releasePointer`, `sendProtocol`, `POINTER_HOLD`, `MEDIA_STAGE`, and the forced-colours axis.

**R5 — Veneer re-pin and self-containment proof**
Role and engine: `builder` on Sonnet (mechanical). Checkout: Veneer. The Orchestrator runs `npm ci`.
Owns: `package.json`, `package-lock.json`, `node_modules/.orkestrel-lock.sha256`.
Depends on: R2, R4.
Acceptance: `@orkestrel/test` is `^0.0.19`; `npm ci` from the lockfile alone with no `--no-save` install; then `format:check`, `lint:check`, `check`, `build`, `test` each exit 0, run by an independent `verifier`.

**R6 — Capture registry and frame grammar**
Role and engine: `opus` on Opus 5. Checkout: Veneer.
Owns: the capture registry and portfolio layer in `tests/setupBrowser.ts` and `tests/app/browser/integration.test.ts`, and the retained harness instruments.
Depends on: R5.
Acceptance: a frame's filename names what rendered, not the project that shot it, and the two sides of a comparison use one grammar, proved by a case that reddens on the inverted grammar; stems align so both directories sort into matching rows; a multi-element specimen's frame shows the whole specimen; accessibility artifacts are per-specimen on both sides; the pixel guard runs outside the capture flag; the sampler reads a declared region rather than the origin pixel; the Button family's retained frames are re-shot under the repaired grammar.

**R8 — Retire the selector parser**
Role and engine: `opus` on Opus 5. Checkout: Veneer.
Owns: `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/index.test.ts`, `tests/setupConformance.ts` (the `normalizeComplexSelector` move only), and a new rendered position-independence proof under `tests/src/styles/`.
Depends on: R6.
Acceptance: `walkSelector`, `readEscape`, `readIdentifier`, `extractSelectorIdentifiers`, `findGroupEnd`, `splitTopLevelList`, `splitTopLevelCompounds`, `extractCompoundTags`, `extractSelectorCompounds`, `scanUnreadForm`, and `matchesLooseTagPair` are gone from the tree; `normalizeComplexSelector` lives in `tests/setupConformance.ts` and applies to `rule.selectors` as postcss returns them; a rendered proof mounts each styled bare tag alone and inside each other styled tag and asserts equal computed styles with equal inherited inputs; a planted contextual rule reddens it, and the plant is removed in the same unit; a component class overriding its tag default at equal or lower specificity is proved against an unlayered consumer rule; `npm run test:src:styles` and `npm run test:conformance` exit 0.

**R7 — Value accounting: departures and the extra-name refusal**
Role and engine: `sol` on GPT-6 Astra. Checkout: Veneer.
Owns: `tests/setupConformance.ts`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `guides/veneer.md` (§ Departures and the departure rows). Off-limits: `src/styles/**` — this unit records what ships and changes nothing that ships.
Depends on: R8.
Acceptance: `guides/veneer.md` carries a `### Departures` table with `Component`, `Selector`, `Property`, `Recorded`, `Emitted`, `Departure`; `readDepartures` reads it the way `readDeferrals` reads its table; the `departure` union names `tokenized`, `aliased`, `declared`, `fallback`, `dropped` and no decorative member; a case compiles `src/styles/index.scss` unminified and asserts every emitted declaration under a recorded key equals its recorded value or its departure row's `Emitted` cell; a second case asserts every emitted selector maps to a recorded key or an `addition` row; each case reddens on a planted changed value and on a planted extra selector, and both plants are removed in the same unit; the normalizer regression case reads the shared inventory rather than a local literal; the token-table completeness gate lands with its named trap closed; `npm run test:conformance` exits 0.

**R9 — Tailwind profiles**
Role and engine: `sol` on GPT-6 Astra. Checkout: Veneer.
Owns: `tests/setup.css`, a Tailwind test project wrapper under `configs/`, its proofs under `tests/src/styles/`, and `guides/veneer.md` § Styles' Tailwind rows.
Depends on: R7.
Acceptance: the standalone profile and each supported Tailwind profile are each proved in the browser against a real Tailwind build; normal and important precedence are proved separately; Preflight's effect on each styled bare tag is read and recorded; Veneer's layer order is unchanged or its change is recorded as a departure with the reason; no `!important` is added to a component layer; `npm run test:src:styles` exits 0.

**R10 — Engine adapter surface**
Role and engine: `opus` on Opus 5. Checkout: Veneer.
Owns: `src/browser/types.ts`, `src/browser/helpers.ts`, `src/browser/index.ts`, their tests, `tests/app/browser/` Vue consumer proof, `guides/veneer.md` § Methods and § Examples.
Depends on: R9, and on the user's ruling from R11 on the Vue delivery.
Acceptance: the event helper carries a cancelable half and a non-cancelable half under one-word names; the hook binder is entity-neutral and `Button` consumes it unchanged in behaviour; the adapter imports nothing from `vue` and `package.json` gains no `dependencies` and no `peerDependencies`; a real Vue component mounts, drives the engine, reads its state, and releases on unmount in an executed proof; `tests/conformance.test.ts`'s `FORBIDDEN_RUNTIME` case exits 0 unchanged; `npm run test:src:browser` and `npm run test:app:browser` exit 0.

**R11 — Decision packet**
Role and engine: **Orchestrator**, no dispatch; a report to the user, not a writing unit.
Depends on: R6 (the frames must be readable).
Acceptance: each rendered-appearance row carries a side-by-side capture of Veneer, Elements, and Bootstrap at the same specimen, viewport, and mode, with the measured value printed beside each frame; the contrast row additionally prints both candidate ratios; the Vue delivery is presented as the three options of item 8 with cost and the recommendation; the dependency-major rows and the Chrome install row are presented as decisions; the grid row is presented as closed with the evidence that no Elements grid specimen exists.

**Family units.** Each family opens with one `grok` terrain record, one design round on one brief with both lanes (`N0`, `H0`, and their siblings), and its units sized by mechanism for the utilities and by key for the components (item 12).

## Tensions

Named for the objective lane to challenge.

1. **Retiring the selector parser.** I read `AGENTS.md` § Project model's ban on a second CSS parser as reaching a test-only selector reader. The objective lane can argue the ban addresses the build pipeline, that the rendered proof and the scan cover different populations, and that deleting `scanUnreadForm` loses a refusal that today makes an unreadable selector loud rather than silent.
2. **Moving Tailwind ahead of Passive**, against `plan.md:592`. I argue the layer contract is what Tailwind tests and it is stable today. The counter is that the unprefixed profile's conflicting-utility analysis needs the utilities family's own keys to be meaningful.
3. **Refusing the `vue` optional peer.** I read `tenets.txt:17` literally. The objective lane can argue an optional peer with `peerDependenciesMeta` installs nothing for a consumer who never imports `./vue`, so it is not a runtime requirement in the sense the tenet bans.
4. **Making value accounting a blocking foundation unit.** `units/value-accounting-finding.md:70-74` calls it a rescope that moves the exit criterion, and `.agents/orchestration.md` § Re-baselining is not rescoping says a rescope needs the user. I am recommending it, not ruling it. If the user declines, R7 is struck and the accounting stays one-directional for 104 more keys.
5. **Replacing `plan.md` wholesale.** The diary carries rulings that no other artifact states. I claim R1's prune promotes each into a durable home first; a lane can argue that promotion is where rulings get lost.
6. **Moving the capture-grammar repair into the foundation** rather than the carrier `cl13-verdict.md:155` names. That re-shoots the Button family's frames, which is work a closed family's criterion did not require.
7. **Keeping `gap` and `column-gap` with the utilities family.** I refuse the pull-forward as a rescope of a closed family.
8. **Ruling the Elements grid specimen absent.** G3 mapped Elements' style tree and reported no grid partial (`g3-references-report.md:5`, `:45`), and G3 § I records its own sampling limits. That is absence of evidence read as evidence of absence; the objective lane must check it.
9. **Sizing the Helpers/utilities family by mechanism.** No unit has yet proved that the spacing set's steps share one emission mechanism; `units/remaining-surface.md:60-69` reads it from key shapes, not from the emitted cascade.

## Risks

1. **The departures table is authored by hand and goes stale silently.** Five keys carry 294, 103, 99, 34, and 18 differing declarations (`units/value-accounting-finding.md:32-37`). Evidence that settles it: R7's gate must redden on a departure row whose emitted value no longer matches, proved by a plant. Without that mutation proof, the table is prose with a test beside it.
2. **The rendered position-independence proof might not fit a browser project's budget.** Evidence: run the bounded cross product over the shipped element partials once and read the wall clock before R8 commits to it. If it does not fit, Alternative C (`postcss-selector-parser`, the user's grant) is the fallback and R8's brief must name it.
3. **R6 re-shooting the Button family's frames can surface a real Button defect.** That defect would sit outside a closed family's exit criterion. Handle it as a finding recorded against the capability that owns it, per `AGENTS.md` § TTTDD, and surface it to the user rather than reopening the family inside R6.
4. **The Vue adapter might not be ergonomic enough to be used.** Evidence: R10's proof must be a real component a developer would write, not a harness. If the injected shape reads as ceremony, the separate-package option becomes the honest answer and the user rules again.
5. **Tailwind co-existence might force a layer-order change** after 31 keys have emitted into the current order. That is exactly why R9 runs at 31 rather than at 135, and the risk is real either way. Evidence: R9's first reading is Preflight against each styled bare tag, before any profile is designed.
6. **The re-pin chain depends on a user action with no deadline.** If R4 stalls, every Veneer gate reading between R2 and R5 is against an unpublished dependency. Mitigation: R6 through R10 are written so their criteria close on owned files under the vendored tarball, and R5 re-runs the authoritative chain when it lands.
7. **`bindEventMap`'s generalization touches `src/browser` under an audit regime that has only ever audited styles units.** Evidence that settles the shape before the code: R10's design is checked against the hosted guides' `## Surface` tables per `.claude/rules/names.md` § Fleet name ownership, the way `plan.md:594-597` already requires, because a one-word event helper name is the kind another package already owns.
