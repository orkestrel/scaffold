# Unit J-ENGINE-DESIGN — the engine's adversarial design round

## Role and engine

Two lanes, blind to each other, on this one brief:

- the **subjective lane**: `planner` on Opus 5.5, reached as a native Claude subagent (read-only), which records the model the `opus` alias served;
- the **objective lane**: `analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec --sandbox read-only -C C:/Users/mikes/WebstormProjects --skip-git-repo-check` from this file, journaled under `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-engine-design.jsonl`.

The executor that opens this brief is the engine itself. State in your first line which lane you hold. Fill the sections your lane owns per § Output, and leave the other lane's sections empty rather than renamed. Do not hedge toward an imagined consensus: the other lane's answer is unknown to you and the Orchestrator reconciles.

## Objective

One coherent design for Veneer's engine — the TypeScript replacement of Bootstrap 5.3.8's JavaScript on native browser systems — stated as the entity model, the shared mechanisms, the native system per plugin obligation, the `@orkestrel/*` candidate matrix with a recommendation per candidate, the unit split and order, the proof matrix per component, the rulings on the § Compatibility `engine` rows, and the exit criterion, so the Orchestrator can reconcile the two lanes into `j-engine-design-verdict.md` and dispatch types first.

## Context

**Evidence.** The terrain record is the one home for every measurement this round rests on; read it whole first: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-record.md` (host, benches, the platform readings the probe suite took on Chromium 153.0.8010.12, and the reads it indexes). Then, in this order:

1. The Grok distillate of the Elements and Mailbox mechanisms: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-distillate.md`.
2. The installed `@orkestrel/*` candidate map: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-orkestrel-2-map.md`, and the Orchestrator's spot checks appended to the terrain record.
3. The baseline's absorption records: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/j-engine-research-report.md` (§ A to § E), `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/b-collapse-terrain-report.md` (§ B, § C, § D), `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md` (§ B, § C).
4. The obligations at their source, as the terrains cite them: `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/*.js`, `util/*.js`, `dom/*.js` (read the file for any obligation you rule on; the terrains are an index, not the source).
5. The engine seed you inherit, whole: `C:/Users/mikes/WebstormProjects/veneer-engine/src/browser/{types,constants,helpers,validators,Button,ColorMode,Delegate,index}.ts`, `C:/Users/mikes/WebstormProjects/veneer-engine/src/core/{types,constants,errors,index}.ts`, and their proofs under `C:/Users/mikes/WebstormProjects/veneer-engine/tests/src/browser/` and `tests/src/core/`, plus `tests/setup.ts` and `tests/setupBrowser.ts` (shared, report-only) for the recorder and event helpers the proofs already use.
6. The guide's engine surface: `C:/Users/mikes/WebstormProjects/veneer-engine/guides/veneer.md` § Surface, § Methods, § Examples, and § Compatibility (every row of kind `engine`, the paragraphs after the table, and the absence of any `plugin` row as of `746d3e9`).
7. The Elements guides that rule appearance and structure (`C:/Users/mikes/WebstormProjects/elements/guides/styles.md`, `surfaces.md`, `components.md`, `elements.md`) where the distillate cites them.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (the non-negotiables and design laws bind every name and file you propose); `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md` (one-word entity members, the fixed lifecycle vocabulary, files and folders), `architecture.md` (the centralized files, one class per file, entity subfolders, barrels, the wrapper test), `patterns.md` (options, managers, the stateful-emitter law and its Browser/DOM variant, event maps, guards), `typescript.md`, `tests.md` (real browser, no mocks, the probe law, the regression form), `browser.md` (native platform APIs first), `documentation.md` (parity), `quality.md` (probes before arguments, falsification), `writing.md` (your prose). Skill: none for this round (`orkestrel-falsify` governs the audits that follow). Guide or spec: Veneer's `ROADMAP.md` § Tenets, § Rulings (the construction paragraph opening "Build every entity on explicit construction", the refusals of `./browser/auto`, `isRTL`, the fixed transition fallback, `@vue/reactivity`, the factory idiom, and post-`destroy` mutation, and the D41 and D43 bullets), § Protocol › § The engine session, and § Carriers (the rows naming J-ENGINE: the Button-shaped trio, release-on-removal, the container and navigation combinators); `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/decisions-round-2.md` § D41, § D42, § D43, § D44; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md` R7, R8, R9, R17 (the `--bs-position` sentence, the `plugin` row shape, centering as engine placement, the § Surface sentence); `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` E1 to E3; the kickoff brief `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/j-engine-session-brief.md` § Objective, § Design instructions, § Scope, and § Acceptance criteria.

**Installed primitives.** `@orkestrel/contract` `0.0.17` (the sole runtime dependency; guards and combinators, no DOM guard), `@orkestrel/test` `0.0.20` (`createRecorder`, `createRecorders`, `waitForCondition`, `waitForEvent`, `waitForAbort`, `waitForText`; `@orkestrel/test/browser`'s `build`, `mount`, `waitForAnimations`, the journey verbs), and the transitively installed candidates `emitter`, `abort`, `timeout`, `queue`, `html`, `template` — each with its declaration pointer in the map. A helper, guard, wait, or recorder whose job an installed export does is a defect; a runtime dependency enters only on the user's ruling, so the matrix ends in a recommendation, never in an import.

**Host.** The planner reads with `Read`, `Grep`, and `Glob` and runs nothing. The analyst reads the four checkouts under `C:/Users/mikes/WebstormProjects/` read-only through a Windows PowerShell exec with script execution disabled and no network; it runs no build and writes no file, and it names a probe it would need as an Unknown for the Orchestrator to run. The receipt host is Chromium 153.0.8010.12 (E3).

**Measurements.** None restated here. The terrain record holds them, with the run behind each.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The baseline session lands cascade families on `main` in parallel (its in-flight units at the marker: NAV, DROPDOWN, COLLAPSE, UTIL-SPACER, ALERT, CAROUSEL), so the cascade keys `collapse`, `dropdown`, `nav`, `navbar`, `accordion`, `modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`, and `carousel` will ship as static classes the engine sets; the guide carries no `plugin` row yet, and the baseline adds one per landed family with `Owner: J-ENGINE.` for the engine session to fill. `scrollspy` has no cascade at all. The seed's `emitEvent` dispatches a non-cancelable event, and `bindEventMap` and `Delegate` are shaped around Button; the first cancelable-event unit moves all three (§ Carriers). `showModal()` makes the document inert and does not lock scroll; a `<details>` fired no `beforetoggle` in the probe; a `0s` transition creates no animation; `@orkestrel/emitter`'s `emit` cannot be cancelled; `@orkestrel/contract` publishes no DOM guard. `app/**` (the showcase, whose entry constructs a `Delegate`) is off-limits to this session until the baseline closes: a change it would need is reported, never designed into a unit. Right-to-left support is refused (D5); no unit spends on it. The published surfaces are `.` (core) and `./browser` and `./styles`; no new subpath, side-effect entry, or wrapper is invented.

## Unknowns

The Orchestrator does not know these; rule on each with evidence, and name it under `Tensions` where your lane's answer is a judgment the other lane must challenge:

1. **The wire vocabulary.** Button dispatches `toggle.vn.button`; Bootstrap's contract is `show.bs.collapse` and its siblings, which consumers subscribe to by name, and the § Compatibility `event` rows accept the paired infinitive and past-participle events with `cancelable: true` as scope. Does the engine dispatch Bootstrap's names, Veneer's names, or both, and what does a `plugin` row's Proof cell then claim? Read the F6 precedent in the seed and the guide before ruling.
2. **Ownership and the static registry.** Bootstrap's `Data`, `getInstance`, and `getOrCreateInstance` rows are accepted scope; the seed refuses a second live owner with a `WeakSet` and offers no lookup. Does the engine carry a lookup, and through what surface, or refuse those rows with a recorded reason?
3. **Delegation.** Does one `Delegate` generalize over every `data-bs-toggle`, `data-bs-dismiss`, `data-bs-slide`, `data-bs-spy`, and `data-bs-ride` contract, or does each component own its own opt-in binder? Rule release-on-removal: today a removed host is restored and released only on the next click that reaches the root, or on destruction (§ Carriers, audit claim 4).
4. **The transition primitive.** Completion is read from the animation itself (`getAnimations()` and `finished`, per the terrain record). What does the primitive do when the element carries no `.fade` and no transition, under reduced motion (no animation is created), when a second show or hide arrives mid-flight (Bootstrap ignores a call mid-transition), and when `destroy()` arrives mid-flight? What does it return to the caller, given the accepted row "All API methods are asynchronous, return to the caller before the transition ends"?
5. **Overlays on the top layer.** Bootstrap's modal, offcanvas, tooltip, popover, and toast are ordinary elements the cascade paints with `z-index`, and the cascade ships `.modal-backdrop` and `.offcanvas-backdrop` as separate elements. Which of `<dialog>` semantics, the `popover` attribute set by script on the consumer's own element, `inert` on the document's other children, `CloseWatcher`, and the cascade's own backdrop element carries each of the modal's focus containment, its backdrop, its Escape and light dismiss, its scroll lock, and its stacking, and what departure does each choice record against the Bootstrap obligation?
6. **Placement.** Popper's `placement`, `offset`, `fallbackPlacements`, `boundary`, and `popperConfig` are accepted wire keys "with platform anchoring as an accepted difference". Which CSS anchor-positioning declarations does the engine write, on which element, through inline style or class, and how does the cascade's `.bs-tooltip-auto[data-popper-placement]` and `.dropdown-menu[data-bs-popper]` vocabulary get its attribute values? What of `display: 'static'` in a navbar?
7. **Sanitizer and template.** Bootstrap sanitizes tooltip and popover content against `DefaultAllowlist` with a `sanitizeFn` override and fills a template through `TemplateFactory`. Does the engine use `Element.setHTML` with a `Sanitizer` configuration derived from that allowlist, `@orkestrel/html`, or its own filter, and how is `sanitizeFn` honoured?
8. **Placement of the entity files.** The seed keeps `Button.ts`, `ColorMode.ts`, and `Delegate.ts` flat at `src/browser/`. With eleven more components and the shared mechanisms, do the classes stay flat, nest in one lowercase plural folder, or split by module with module-root centralized files, under `.claude/rules/architecture.md` § Environment/module placement and § Entity subfolders and `names.md` § Files and folders? Every proposal names the exact path of every new file.
9. **Options and data attributes.** Bootstrap merges `Default`, `data-bs-config`, `data-bs-*`, and the constructor object, then type-checks. Does the engine read data attributes for options at all, or only through the delegate, and how are Bootstrap's option names (`autoClose`, `popperConfig`, `smoothScroll`) reconciled with the one-word option law (group by entity noun; every leaf one word)?
10. **The `engine` rows.** For each `engine` row of § Compatibility, does the engine carry the obligation (the row's Status becomes `shipped` with a Proof cell), carry it with a recorded departure, or refuse it (the jQuery rows, `isRTL`, `defineJQueryPlugin`, the `TRANSITION_END` emulation the construction paragraph refuses)? Rule each row.

## Scope

**Owned.** None (read-only lanes).

**Shared (report-only).** None.

**Off-limits.** Every file. Neither lane edits, runs a build, or writes a probe.

**What asserts the state this change ends.** Not this round's; the verdict's units derive it.

**Tools and limits.** The planner: `Read`, `Grep`, `Glob`. The analyst: read-only file access in the exec sandbox, no network, no writes.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the assignment directly and spawn nothing.

## Output

Return the proposal as your final message (the planner) or as the exec's final message (the analyst, read from `--output-last-message`), in the `planner` role's section order and nothing else:

- `Design` (subjective lane): the coherent API, vocabulary, architecture, and consumer experience — for every one of Collapse, Dropdown, Tab, ScrollSpy, Modal, Offcanvas, Tooltip, Popover, Alert, Toast, and Carousel, the class name and file path, the `*/types.ts` contracts (`{Entity}Interface`, `{Entity}Options` with one-word keys grouped by entity noun, `{Entity}EventMap`, `{Entity}Hooks`, `{Entity}Detail`), each public member in one word with the fixed lifecycle vocabulary where a lifecycle verb applies and Bootstrap's contract verb where the obligation names one (state which and why), the wire event names, and the guide sections; for every shared mechanism (the cancelable pre-change event and the completed event, the entity-neutral binder that moves `emitEvent`, `bindEventMap`, and `Delegate` off the Button shape, the generalized delegation with release-on-removal ruled, the focus primitive, placement, transition completion, backdrop, scroll lock, swipe, sanitizer, template) its shape, its home file, and its first consumer.
- `Alternatives` (subjective lane): at most two real alternatives and why the design wins.
- `Constraints` (objective lane): for each obligation and each shared mechanism, the native system that carries it correctly with the terrain reading and the Bootstrap source line that bound the choice (`file:line`), what the code and contracts permit, the departure each choice records, and the `@orkestrel/*` matrix — one row per candidate (`contract`, `emitter`, `abort`, `timeout`, `queue`, `html`, `template`), each ending `reuse`, `compose over`, or `exclude`, with the declaration evidence and the runtime cost, and a recommendation the user rules on.
- `Refusals` (objective lane): the options a rule or ruling forecloses, with the text quoted and its path.
- `Measurements` (objective lane): the readings from the terrain record that bound the design, each named with its key in the record; a reading the design needs and the record lacks goes under `Tensions` as a probe for the Orchestrator to run.
- `Units` (both lanes): the bounded work in `.agents/orchestration.md`'s vocabulary — a types-first unit that lands every public contract in `src/browser/types.ts` and `src/core/types.ts` before implementation; one unit per shared mechanism landing with its first consumer; one unit per plugin obligation; each naming its role and engine (`opus` on Opus 5.5 by default; `builder` on Sonnet for a fully specified mechanical unit; `sol` on Astra only with a recorded reason), its owned files, its shared report-only files (the barrel, `constants.ts`, `helpers.ts`, `validators.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, the guide, the export-set proof in `tests/src/browser/index.test.ts`), its dependencies, its parallel wave, and its acceptance criteria — and, per component, the proof matrix: the lifecycle, cancellation, focus, motion, and cleanup proofs, each with the mutation it distinguishes, run in the real browser under `tests/src/browser/`.
- `Tensions` (both lanes): the judgment calls your lane made, named for the other lane to challenge, the Unknowns above each answered or carried here.
- `Risks` (both lanes): design-fit and correctness risks and the evidence that settles each.
- The exit criterion (both lanes, closing `Units`): the enumerated capabilities whose closure ends the campaign, each to end implemented, retained, or excluded on evidence, against the kickoff brief's § Acceptance criteria.

No process diary, no summary of what was read.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — when a file this brief names cannot be read or when a ruling in the law contradicts another. Decide, record, and carry on from every design question, including the ten Unknowns: they are yours to rule and record under `Tensions`.

## Acceptance criteria

1. Every one of the eleven plugin obligations and the six utilities has a home in `Design` or `Constraints`, with a file path and a native system named.
2. Every `@orkestrel/*` candidate the map names ends `reuse`, `compose over`, or `exclude` with a declaration pointer.
3. Every `Units` row names its role, engine, owned files, shared files, dependencies, wave, acceptance criteria, and (per component) its five-row proof matrix.
4. Every one of the ten Unknowns is ruled under `Tensions` or `Design`/`Constraints`, and every `engine` row of § Compatibility is ruled.
5. No proposal invents a surface outside `.`, `./browser`, and `./styles`, names an import outside `@orkestrel/*`, or reads completion from a timer.

**Observations, not criteria.** None.

## Review evidence

A policy, design, or process proposal: this brief is the proposal's frame; the canon it must satisfy is the law named above; the record of what motivated it is D41, D43, the kickoff brief, and the terrain record. Both proposals and the reconciled verdict are retained under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
