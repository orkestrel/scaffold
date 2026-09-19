# Design round — reconciled verdict

Round of record: round 2 on `design-brief-2.md`. Lanes: subjective `planner` (Opus 5, native;
report `.orkestrel/campaign/design-planner-report-2.md`) and objective `analyst` (Codex bench, `gpt-6-astra` as the
owner's standing substitution for `gpt-5.6-sol`; report `.orkestrel/campaign/design-analyst-report-2.md`, thread
`01a0b041-fffe-74c2-ab96-45f3db181016`). Round 1 ran on the superseded `design-brief.md`; its
subjective report (`.orkestrel/campaign/design-planner-report.md`) is evidence only, and its objective lane stopped on
the stale Contract rule 9 sentence the successor brief corrected.

The Orchestrator reconciled the three reports against the source. Every ruling below names the
lane it follows and the evidence that decided it. Where the lanes answered different questions,
both answers are taken.

## Facts the Orchestrator verified after the round

- The test package's browser build already externalizes core: `test/vite.config.ts:137-141`
  declares `external: id === '@src/core' || id.startsWith('@orkestrel/') || peers…` and rewrites
  `@src/core` to `../core/index.js`; `configs/helpers.ts:618` rewrites core specifiers in the
  declaration roll-up to the package name. A browser module importing `@src/core` therefore ships
  as an import of the core entry, not as a second copy. The planner's inlining risk is already
  closed by the build; the only bar is the guide's Contract rule 13 sentence.
- The showcase wrapper `configs/app/vite.showcase.config.ts` is `ownership: 'content'`
  (`src/core/compilers.ts:1043-1050`), so it cannot be the precedent for an adopter-edited variant
  list. A journey wrapper carrying the adopter's variants must be `ownership: 'birth'`, the way
  `tests/setup.ts` and `tests/setupBrowser.ts` are.
- ROADMAP item 30's site: `scaffold/tests/src/core/compilers.test.ts` case "refuses the Vitest
  invocation record a project row is called with" duplicates the vendored
  `scaffold/tests/config.test.ts` case "keeps Vitest invocation fields out of project
  configurations"; the vendored case runs in every target and carries the planted-factory control.
- The roughnotes menu trigger (`app/browser/App.vue:123-130`) authors no `aria-expanded`; no
  `aria-expanded` appears anywhere under `app/browser`. An announced-state wait cannot replace the
  Bootstrap class poll there until the application announces the state.
- A Codex bench exec cannot launch a browser (a grandchild process is denied), so a unit whose
  proof runs in Playwright cannot run its own tests on the bench. That routes every browser-suite
  writing unit to the native `opus` lane, recorded per unit below.

## Rulings

| Id | Question | Ruling | Follows | Why |
| -- | -------- | ------ | ------- | --- |
| D1 | Browser entry importing core | Strike the "no `src/core` import" clause from Contract rule 13; keep no-framework, no-`node:*`, no-`import.meta.env`. Browser modules import core through `@src/core`. | planner-2, analyst-2 | `AGENTS.md` § Project model sanctions browser→core; the build already externalizes it |
| D2 | Contract rule 9 | Rewrite: `dependencies` holds exactly `@orkestrel/contract`, whose outcome triple and guards core and server reuse; `vitest` is a peer; no exported signature names an `@orkestrel/*` type. Fix the "zero-dependency" phrasing in rules 10 and 13 too. | analyst-2 | `test/package.json`; runtime imports; Limits row `An outcome triple` |
| D3 | Statechart tooling | Publish `createHarness` in the browser entry: mounts framework-free markup, one row per scenario, writes every attribute from `STATECHART_ATTRIBUTES`, drives rows with `executeScenario` one by one, records each row's `result`, continues past a failing row, exposes `status`, `total`, `passed`, `failed`, `failures`, `execute()`, `destroy()`. Refuses an empty table. No separate gate reader (the object carries the tally). No deep-linked application page and no generated page. Runner stays in core. `StatechartStatus` named union in core types. | planner-2, with analyst-2's executable-example requirement and planner-1's observable `pending`/`idle` | A page cannot import a devDependency that imports `vitest/browser`; the attribute contract is one every consumer would otherwise implement identically (the same admission that shipped the journey layer) |
| D4 | `pending` → `idle` | `pending` from construction until every declared row has rendered its `scenario` element and `total` carries the row count; `idle` after, with `passed` and `failed` at zero and nothing in flight; `running` while `execute` is in flight; `passed`/`failed` terminal. Doc block, guide, and skill all move; the tuple's members do not. | planner-1, planner-2 | Observable from the attributes a gate already reads |
| D5 | Worked example (ROADMAP 10) | The test package's own browser suite mounts `createHarness` over a real native `<details>` disclosure driven with `clickDisclosure` (`'closed' \| 'open'`, `'toggle'`), including a row whose event leaves the state unchanged where the entity has one. The guide's fence and the skill's `statechart.md` fence transcribe that executed table. | analyst-2 (executable), planner-2 (fence in the skill) | A fence that runs is the parity gate's subject |
| D6 | Keyboard verb (ROADMAP 18) | Publish `pressKeys(keys)`: sends to the focused element and refuses when nothing but the document body holds focus. The skill stops teaching `userEvent.keyboard`. | planner-2; ROADMAP 18 ("the gap is real") | The nothing-focused refusal is an invariant `userEvent.keyboard` lacks, which is what separates it from a rename; a key sent to the body is the guarded-step false green |
| D7 | Text wait (ROADMAP 19) | Core `waitForText(description, read, text, options?)` with `TextWaitOptions extends WaitOptions { exact?: boolean; absent?: string }`, returning the matching reading; empty `text` refused. The skill instructs arrival waits to read a named region through `readPerception` where one exists and to carry the replaced sentence in `absent`. | analyst-2 (core, reader-parameterized), planner-2 (`absent` arm) | The mechanism is host-independent; the region scoping and the replacement negative are instructions, not a second helper |
| D8 | Announced-state wait | Browser `waitForState(name, state, options?)` and `waitForState(role, name, state, options?)` with `StateOptions extends WaitOptions { absent?: boolean }`, resolving afresh each poll through `resolveRendered`, reading `readStates`, returning the states at resolution; timeout names the control, the state, and the last observation. | planner-2 (shape), analyst-2 (diagnostics, re-resolution) | Closes the Bootstrap class poll where the surface announces the state; where it does not, the finding is the surface's |
| D9 | Animation wait | Browser `waitForAnimations(element, options?: WaitOptions)`: awaits every finite animation on the element and its subtree (`getAnimations({ subtree: true })`), excludes infinite-iteration animations, re-reads after each completion or cancellation, refuses a disconnected subject, times out naming the subject and the still-running animations. | analyst-2 (name, event-based, re-read), planner-2 (subtree, infinite excluded) | A spinner that runs forever is a finding about the reading, not a wait to lengthen |
| D10 | Refusal reader (ROADMAP 20) | Browser `readRefusal(name)` and `readRefusal(role, name)`: drives `resolveRendered`, returns the thrown `Error` message or `undefined`, rethrows a non-`Error`. Ruled not superfluous: it fixes the resolver, translates `unknown` to `string \| undefined`, and rethrows what is not a refusal. | planner-1, planner-2 | The wrapper law admits a translation and a narrower contract; the consumer's thirteen call sites and every refusal family in the skill are its consumers |
| D11 | Storage fixture | Browser `createStorage(options?)` returning `StorageInterface extends Storage { permit(): void }`, with `StorageOptions { values?: Readonly<Record<string, string>>; reads?: boolean; writes?: boolean; quota?: number }`: reads and writes default permitted; a withheld operation throws a `DOMException` named `SecurityError` reading `Access is denied for <detail>`; `quota` is the count of accepted `setItem` calls, exhaustion throws `QuotaExceededError` reading `No room is left for <key>`; `permit()` lifts permission refusals and never replenishes quota; a non-integer or negative quota is refused. Backed by its own map; patches nothing. No stalled read. | analyst-2 | Covers the consumer's two classes and its `permit` consumers with one inert implementation; `Storage` is synchronous, so a stall is not expressible |
| D12 | Census | Browser `readCensus(root): CensusReading { elements: number; tokens: readonly string[]; undeclared: readonly string[] }`, `tokens` and `undeclared` sorted; refuses a walk that reads no element. | planner-1, planner-2 (refusal), analyst-2 (population reported) | An empty population passes every difference check |
| D13 | Control fixture builders | Publish `buildContrast(bar): ContrastFixture`, `buildEscapes(permitted): EscapeFixture`, `buildCensus(): CensusFixture`. Each returns detached nodes the caller appends to the surface root it is reading and removes after; none mounts. `buildContrast` refuses a bar its stack cannot straddle. | planner-2 (publish, parameterized), planner-1 (detached) | An instrument is not evidence until its control has failed, and every workspace owes the same control; readiness R4 and R6 found the consumer's controls never failing. Overrules analyst-2's exclusion: the bar and the permitted id keep the policy with the consumer |
| D14 | `isPainted` | Exclude. The skill names `element.checkVisibility()` and a non-zero `getBoundingClientRect()` as the native door for a painted population. | analyst-2, planner-2 | Native primitive exists |
| D15 | `JourneyVariant` | Core `JourneyVariant { name; width; height }`; browser `CaptureVariant extends JourneyVariant { apply?: () => void }`. Scaffold's generated configuration imports `JourneyVariant` from `@orkestrel/test`. | planner-1 | Lets a generated configuration and a consumer's test agree by type |
| D16 | Shadow-tree boundary (ROADMAP 31) | State on `isRendered` and `isReachable` what each does at a shadow boundary, proven with a shadow-root fixture; do not copy `readHit`'s hit-test sentence onto predicates that hit-test nothing. | analyst-2 | Each predicate's own behaviour, not a borrowed remark |
| D17 | Journey fan-out | Scaffold emits `appJourney(variant, variants)` (or an equivalent the unit settles) in the content-owned root `vite.config.ts` for every blueprint with `app` including `browser`, and a **birth-owned** `configs/app/vite.journey.config.ts` wrapper that declares the adopter's `JourneyVariant[]` and registers one Vitest project per variant, providing `variant`, `variants`, and `capture` through `provide`. The journey axis is inferred from that wrapper's presence, the way `showcase` is inferred from its wrapper. `test:journey` runs that config and joins the `test` chain. The ordinary `app:browser` project excludes the journey suite. | analyst-2 (recoverable adopter data), planner-1 (axis), planner-2 (template shape) | Root `vite.config.ts` is content-owned, so adopter data cannot live there; a birth-owned wrapper survives `repair` |
| D18 | Setup proof runtime (ROADMAP 1) | Scaffold registers a browser-enabled `setup:browser` project collecting `tests/setupBrowser.test.ts` when that exact-case file exists, excludes it from `setup`, emits `test:setup:browser` into the `test` chain, and generates no vacuous proof. `.claude/rules/tests.md` and `.claude/rules/workspace.md` move in the same change. The blueprint states which setup runtimes a workspace has, derived from sibling proof paths. | analyst-2 (no vacuous proof), planner-1 and planner-2 (project and rule edits) | A generated empty proof is a template TODO |
| D19 | Browser engines | Hold at Chromium. State the limit in the emitted `configs/browsers.ts` doc block and the skill's Accept list; name the reopening condition (a second Playwright engine launching on the host and a `captureFrame` reading back at the declared size there, or one recorded divergence). Record analyst-2's engine-selection design as the shape to adopt when reopened. | planner-1, planner-2 | No recorded divergence; each engine multiplies every target's gate |
| D20 | Skill API sweep (ROADMAP 16) | Vendored `inspectSkill` reads every fenced `import { … } from '@orkestrel/<package>[/<environment>]'` in a skill's Markdown and refuses a named symbol the installed package's declaration entry does not export, resolving the entry through the TypeScript API over the installed `.d.ts` (never importing the browser entry). Coverage and blind spot (prose and table cells) stated beside the rule; a planted fence is the negative control. The skill gains one import fence per reference naming the verbs it teaches, so the sweep has a population. | planner-2 (fenced imports), analyst-2 (compiler-backed resolution) | A prose matcher reports on sentences; the fences make the taught vocabulary the population |
| D21 | ROADMAP 30 | Delete the local `compilers.test.ts` invocation-record case after confirming the vendored `config.test.ts` case drives the same population with its planted control. | analyst-2 | The vendored copy runs in every target |
| D22 | Skill laws | The journey laws bind every declared family. A matrix population resolves by role and name first; a selector is admitted only where the population carries no role, declared in the setup module with the reason beside it. Route and theme changes in the matrix and transport families go through the interface; an entity or storage read is corroboration beside a rendered assertion, never in its place. Named bans in `layer.md` with the published replacement: id and class resolution of a target, a class-list read standing in for a settle (`waitForState`, `waitForAnimations`), `elementFromPoint` (`readHit`), `element.focus()` (`traverseAccessible`, `pressKeys`), store and router calls (`readPerception`, `readValue`, `readStates`, `waitForText`). | planner-1 (role-first with declared selector), analyst-2 (corroboration), planner-2 (bans) | Planner-2's absolute selector ban over-refuses paragraph populations that carry no role |
| D23 | Mutations (ROADMAP 11) | Journey assertion: omit the act the journey performs, keeping collection valid, and confirm the destination assertion reddens. Refusal assertion: make the withheld control reachable (or present) without changing its name and confirm the asserted voice changes. Record the command and failing count, restore, and record green. | planner-1, analyst-2 | Omitting the act is the mutation that catches readiness R3; changing reachability catches R2 |
| D24 | `prove` limit (ROADMAP 12) | Drop the pin; instruct reading the installed runtime stage's pool pin and the probe guide, recording the version read. | all lanes | — |
| D25 | Intents every surface owes | Arrival at the entry, an unknown route, a query matching nothing, the document title per screen, a render failure — each conditioned on the surface having the state, with the product guide supplying the expected outcome; the skill invents no copy, redirect, or title scheme. | all lanes | Mechanism, not product policy |
| D26 | ROADMAP 34 | Skill half retained; the application repairs the collisions and authors `aria-expanded` on the menu trigger. | all lanes | — |
| D27 | ROADMAP 17 | Restate the item against `.agents/skills/orkestrel-debrief/references/field-testing.md`, which exists, and run the clean pass last from a roughnotes worktree carrying no `.orkestrel/` folder. | planner-1, planner-2 | The path was wrong, not the rule |
| D28 | Product findings | Metadata, canonical, privacy statement, brand fixture data, and truthful-acceptance copy stay the owner's decisions; the consumer units report them and invent nothing. | analyst-2 | — |

## Routing

| Unit | Checkout | Role | Engine | Reason |
| ---- | -------- | ---- | ------ | ------ |
| T1 test mechanisms | test | `opus` | Opus 5, native | The unit's proofs run in Playwright; a Codex exec cannot launch a browser (grandchild denied), so the objective route cannot run its own tests. Recorded as a bench-limit substitution; the audit's objective lane runs on `gpt-6-astra` |
| T2 statechart harness | test | `opus` | Opus 5, native | Same limit; also API-shape and documentation-voice work |
| A1 audit | — | `analyst` + `reviewer` | `gpt-6-astra` + Opus 5 | Sol did not write T1/T2, so both lanes qualify; the Orchestrator runs every executed attack the bench cannot |
| S1 configuration | scaffold | `sol` | `gpt-6-astra` (standing substitution for `gpt-5.6-sol`) | Constraint-heavy mechanical work in Node |
| S2 policy sweep | scaffold | `sol` | `gpt-6-astra` | Same |
| S3 skill instructions | scaffold | `opus` | Opus 5, native | Documentation voice |
| A2 audit | — | `analyst` + `reviewer` | swapped per writer: S1/S2 (Sol-written) audited objectively by `reviewer` on Opus and subjectively by `analyst`; S3 by the default lanes | Writer-engine rule |
| R1 adoption | roughnotes | `opus` | Opus 5, native | Browser suites |
| R2 product semantics and entry journeys | roughnotes | `opus` | Opus 5, native | Browser suites plus app edits |
| A3 audit | — | `analyst` + `reviewer` | `gpt-6-astra` + Opus 5 | — |
| Verification | each | `verifier` | Sonnet | Gate evidence after each integration |
| Field pass | roughnotes worktree | Opus, Sonnet, Haiku tiers | native | ROADMAP 17 |

## Exit criterion

The campaign ends when each capability below is implemented, repaired, retained, or excluded on
recorded evidence, the gates are green in every checkout, `@orkestrel/test` and `@orkestrel/scaffold`
are published, roughnotes has adopted both, and the clean field pass has ruled:

1. Test package: D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D15, D16 landed with
   Surface, Voices, Limits, and Patterns parity and executed fences; D14 excluded with its Limits
   row.
2. Scaffold: D17, D18, D20, D21 landed; D19 excluded with its stated limit; the rule files moved
   with D18; the generated workspace proofs green.
3. Skill: D22–D27 landed; every symbol the skill teaches appears in a fence the D20 sweep checks;
   `ROADMAP.md` reconciled.
4. Consumer: every published export adopted where the matrix names a site; no reach-past site
   remains under `tests/app/browser/`; D26 repaired; D25 journeys present where the product has
   the state; the storage-failure leg's permission half driven.
5. Field pass: run from a clean worktree; the statechart trigger ruling recorded.
