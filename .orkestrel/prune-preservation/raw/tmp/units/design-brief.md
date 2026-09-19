# Design round — the journey skill, its tools, and what scaffold propagates

## Role and engine

Two lanes read this one brief blind to each other. The lane file that dispatched you names which
lane you hold:

- **Subjective lane:** `planner` on Opus 5, a native Claude subagent, read-only.
- **Objective lane:** `analyst` on GPT-5.6 Sol, reached through `codex exec` in the `read-only`
  sandbox with `-C` set to the scaffold checkout.

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing. Edit nothing. Run only non-mutating commands.

## Objective

Return a design for taking the `orkestrel-prove-journey` skill, the journey layer
`@orkestrel/test` publishes, the statechart tooling, and what `@orkestrel/scaffold` propagates to a
browser workspace from their present state to production grade: a capability/defect matrix whose
every row ends implement, repair, retain, or intentionally exclude with evidence; the public
contracts each implementing row adds or changes, as `types.ts`-level declarations; the unit
decomposition with owners, order, and acceptance criteria; and the risks.

## Context

### The subject and what it is for

`orkestrel-prove-journey` is the workflow every browser workspace in the fleet follows to prove an
application the way a person uses it. It rests on the journey layer in `@orkestrel/test/browser`
(resolvers, verbs, readers, capture portfolio, journal), the statechart table and runner in
`@orkestrel/test` core (`StateTransition`, `StateScenario`, `executeScenario`, `executeScenarios`,
`STATECHART_ATTRIBUTES`, `STATECHART_STATUSES`), and the workspace shape `@orkestrel/scaffold`
generates and vendors (`vite.config.ts` project factories, `tests/setupBrowser.ts`,
`configs/browsers.ts`, the vendored `tests/policy.test.ts` sweep, and the skill files themselves
under `dist/host/agents/skills/`).

The owner's instruction, verbatim: "use what we have learned from journey and improve it
accordingly, especially what was deferred to ROADMAP.md, I want to refine it to enterprise grade and
production ready. We need to nail down the configuration, setup, instructions, and tools, in the
skill, the tools we provide in the test package, what is propagated by scaffold, we really need to
improve on the use and tools of state charts and tests."

### Files to read, in this order

All paths are absolute. Scaffold is `C:/Users/mikes/WebstormProjects/scaffold`, the test package is
`C:/Users/mikes/WebstormProjects/test`, and the consumer is
`C:/Users/mikes/WebstormProjects/roughnotes`.

1. `scaffold/AGENTS.md`, `scaffold/.claude/rules/tests.md`, `scaffold/.claude/rules/quality.md`
   (§ Production hardening, § Instruments, § Rounds and verdicts), `scaffold/.claude/rules/documentation.md`
   (§ Workflow skills), `scaffold/.claude/rules/workspace.md` (§ Configuration authority, § Test
   project matrix).
2. The skill: `scaffold/.agents/skills/orkestrel-prove-journey/SKILL.md` and every file under its
   `references/` directory (`layer.md`, `captures.md`, `styles.md`, `statechart.md`, `decide.md`).
3. The journey layer's contract: `test/guides/test.md` § Surface → Browser, § Voices, § Contract
   rules 13–18, § Limits (the candidate table and § Bounds a shipped helper carries), and the
   patterns § Drive a statechart table, § Drive an interface the way a person does, § Record a
   browser journal, § Place a capture portfolio. Then `test/src/browser/types.ts`,
   `test/src/core/types.ts` lines 215–271, `test/src/core/constants.ts` lines 1–70, and the export
   names in `test/src/browser/helpers.ts` and `test/src/browser/factories.ts`.
4. The consumer's evidence: the G1 distillate at `scaffold/tmp/units/g1-distillate.md` (a Grok
   absorption of `roughnotes/tests/app/browser/setup.ts`, `integration.test.ts`, and
   `styles/theme.test.ts`), then those files directly wherever a row of the matrix turns on them.
   Also `roughnotes/vite.config.ts` lines 39–60 and 340–390 (the per-variant project fan-out the
   consumer hand-rolled), `roughnotes/guides/README.md` § Proving the surface, and the empty
   generated `roughnotes/tests/setupBrowser.ts`.
5. What scaffold generates: `scaffold/src/core/templates.ts` — the `appBrowser`, `appShowcase`,
   and `setup` project factories (lines 300–400 and 455–470), `ARTIFACT_TEMPLATES.tests.setup` at
   line 1157 (it is the empty string, so a generated `tests/setupBrowser.ts` is empty), and
   `scaffold/src/core/compilers.ts` lines 1180–1200 (which blueprints receive it). The vendored
   skill sweep: `scaffold/tests/setupPolicy.ts` functions `inspectSkill` (line 964) and
   `extractSkillReferences` (line 889), and `scaffold/tests/policy.test.ts` lines 502–590.
6. The plan of record: `scaffold/ROADMAP.md`. Items 1, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21,
   30, 31, and 34 name this subject. Items 25, 26, 32, and 33 do not and are out of scope.
7. The retained record of what the last campaign learned, at these git objects in the scaffold
   checkout (read with `git show <commit>:<path>`):
   - `bebf4d31:.orkestrel/campaign/field-pass-journey-skill.md` — the tiered field pass over the
     skill, its contamination, and the product findings it surfaced.
   - `bebf4d31:.orkestrel/campaign/debrief-verdict.md` — the debrief's finding table.
   - the commit message of `94200507` — what the last tightening of the skill changed and why.
   And in the roughnotes checkout: `43f9429:.orkestrel/roughnotes/journey-readiness-verdict.md` —
   the eight-lens readiness pass and its ruling that the statechart family was not owed.

### Measurements the Orchestrator took (verified directly, not from a writer's report)

- **Consumers.** A grep over every checkout under `C:/Users/mikes/WebstormProjects` for the
  journey layer's symbols, excluding `node_modules`, `dist`, `tmp`, `guides`, and every
  instruction directory, finds `createPortfolio`, `createJournal`, `traverseAccessible`,
  `clickAccessibleWithin`, `readStates`, and `expandCaptures` used in
  `roughnotes/tests/app/browser/integration.test.ts` and `setup.ts` and nowhere else.
  `executeScenarios`, `executeScenario`, `STATECHART_ATTRIBUTES`, and `STATECHART_STATUSES` have
  **no consumer in the fleet** outside the test package's own suite and the guide. No statechart
  harness exists anywhere. `readPerception` and `readHit` have no consumer either.
- **The generated browser setup module is empty.** `ARTIFACT_TEMPLATES.tests.setup` is `''`
  (`scaffold/src/core/templates.ts:1157`); the roughnotes copy is five lines the consumer wrote
  (Bootstrap, its icons, the app stylesheet). The generated `setup` project runs `tests/setup*.test.ts`
  in Node with the browser disabled (`templates.ts:458-470`), so a `tests/setupBrowser.ts` proof
  cannot run in a browser today. That is ROADMAP item 1.
- **The per-variant fan-out is the consumer's.** `roughnotes/vite.config.ts` declares `VARIANTS`
  (light-1280, dark-1280, light-390, dark-390), a `journey(variant)` project factory providing
  `variant` and `variants` through Vitest `provide`, and spreads one project per variant
  (`vite.config.ts:53-60, 364-387`). Scaffold generates none of it, so the consumer's
  `vite.config.ts` is permanently stale to `scaffold audit` and a `repair` over the `configs`
  group would delete the fan-out. Every other browser workspace that adopts the skill must
  hand-roll the same thing.
- **The gate renders chromium only.** `vite.config.ts:212` in roughnotes declares one instance.
- **`prove` still cannot serve a browser project at `@orkestrel/probe` 0.0.16.** The installed
  runtime stage pins `pool: "threads"` and creates its specification with `"threads"`
  (`roughnotes/node_modules/@orkestrel/probe/dist/src/server/*.js:1462,1539`), and the probe guide
  in `scaffold/guides/probe.md` never mentions a browser. `decide.md` states the limit against
  0.0.11. That is ROADMAP item 12.
- **`pressKeys` is gone.** `grep -rn pressKeys scaffold/.agents/skills/orkestrel-prove-journey/`
  matches nothing. ROADMAP item 21 is closed by commit `94200507` and stays listed.
- **The skill sweep proves file existence, not API existence.** `inspectSkill` reads
  `extractSkillReferences` (backticked paths and `references/*.md` links) and checks each resolves
  (`scaffold/tests/setupPolicy.ts:889-1150`). Nothing reads a backticked symbol against an
  installed package's entry. That is ROADMAP item 16, and the sweep is vendored
  (`dist/host/tests/setupPolicy.ts`), so closing it moves published bytes.
- **The test package proves the runner, not a harness.** `test/tests/src/core/helpers.test.ts:941-1095`
  drives `executeScenario` and `executeScenarios` through every documented refusal. No test
  mounts anything carrying a `data-statechart-*` attribute; the attributes and statuses are
  asserted as constants in `tests/guides.test.ts` only.
- **Retained verdict clause landed.** `SKILL.md` already states "Treat a retained readiness verdict
  as evidence to re-verify against the current tip, never as a plan to resume", closing the
  debrief's Field-2.
- **The shadow-tree boundary is documented on `readHit` alone.** `test/guides/test.md:1445-1448`
  and `test/src/browser/helpers.ts:140-143` state it under `readHit`; the `isRendered` and
  `isReachable` doc blocks do not. That is ROADMAP item 31.
- **Release shape.** `@orkestrel/test` is at 0.0.16 on the registry; `@orkestrel/scaffold` at
  0.0.73; scaffold pins `@orkestrel/test@^0.0.16` and vendors that package's guide as a mirror,
  and the skill files are vendored under `dist/host/agents/skills/`. A change to the test
  package's public surface publishes 0.0.17 first; scaffold then re-pins, refreshes the mirror,
  carries the skill edits, and publishes; every target then re-pins and runs `repair`. A change
  to a vendored test file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `configs/policy.ts`)
  moves `dist/host` on its own.

### Installed primitives

`@orkestrel/test` 0.0.16 (guide: `scaffold/guides/test.md` § Surface) and `@orkestrel/contract`
0.0.17 (guide: `scaffold/guides/contract.md`). A helper, guard, wait, recorder, or deferred whose
job an installed export already does is a defect wherever it is declared. The test package's own
§ Limits states its admission gate: a reusable mechanism, a real consumer, inside the environment
boundary, duplicating no native or declared primitive; `src/browser` imports `vitest/browser` and
DOM globals and nothing else; `dependencies` stays empty; no exported signature names an
`@orkestrel/*` type.

### Host

Windows 11, Git Bash for the Orchestrator's commands; PowerShell for the owner. Playwright
Chromium is the installed browser provider. A bench sandbox denies a grandchild process, a
listening socket, and a nested install, so a lane reads and reasons; it does not run a browser
suite.

## Unknowns

- **Whether a fleet package carries a browser entity with a real state and event vocabulary** that
  a harness could render. The Orchestrator found no harness and no `executeScenarios` consumer.
  Report what you find in `C:/Users/mikes/WebstormProjects/browser/src` (the `@orkestrel/browser`
  package) or elsewhere, or report that none exists and design for that.
- **What the G1 distillate rules generic.** Take its instrument table as evidence, verify against
  the source any row your matrix turns on, and name any row you overturned.

## The questions this round answers

Answer each with a ruling and its evidence. Where the lanes' perspectives differ, argue your
lane's.

1. **The matrix.** Build the capability/defect matrix over four surfaces — skill instructions,
   test-package tools, statechart tooling, scaffold propagation. One row per capability, each row
   ending implement, repair, retain, or intentionally exclude, with the evidence site. Carry every
   in-scope ROADMAP item and every retained finding onto exactly one row.
2. **What the test package should publish.** From the consumer's hand-rolled instruments and the
   ROADMAP items 18, 19, 20, and 31: for each candidate, apply the package's § Limits gate and
   propose the export as a `types.ts`-level declaration — name, signature, the voice it throws,
   where it lives (`core` or `browser`), and which consumer site adopts it. Rule explicitly on:
   a keys-only keyboard verb; a text-convergence wait; a refusal reader against `captureError`;
   inert configurable `Storage` implementations for the transport family (quota refusal,
   permission refusal, failing writes, stalled reads); an animation-settle wait; a census reading
   that reports its population; the negative-control fixture builders the style instruments need.
   Refuse a candidate that is one suite's policy, and say why.
3. **Statechart tooling.** The published contract is a table, a runner, and attribute names; the
   skill instructs each workspace to build a watched harness from nothing, and no harness exists.
   Rule on the shape that makes the family usable: a published harness builder in
   `@orkestrel/test/browser` that mounts framework-free markup, writes every attribute from the
   map, and exposes `run`; a published gate reader that polls `STATECHART_ATTRIBUTES.status` and
   names failing rows; a scaffold-generated harness page; or a worked example alone. State what
   each costs against the package's boundary (a test package cannot be imported by app code) and
   against `AGENTS.md` § Design laws. Give `statechart.md` its worked `StateTransition` example
   (ROADMAP 10) and name the observable trigger from `pending` to `idle` (ROADMAP 13).
4. **What scaffold propagates.** Rule on generating the per-variant journey fan-out (a
   `JOURNEY_VARIANTS` declaration, an `appJourney(variant)` factory providing `variant` and
   `variants`, one project per variant, the capture flag) so a consumer's `vite.config.ts` is no
   longer stale by design; on giving the generated `tests/setupBrowser.ts` a paired proof that runs
   in a browser project (ROADMAP 1); on a browser matrix wider than chromium in
   `configs/browsers.ts`; and on the skill-API-existence sweep in the vendored policy set
   (ROADMAP 16). Name what each obliges: a vendored byte moves, a template moves, a blueprint
   axis is added.
5. **The skill's instructions.** For each retained lesson, name the instruction that carries it:
   the reach-past sites the consumer committed (a read of `app.dark.value` in the transport
   family, `#site-menu` resolved by id, Bootstrap's `show`/`showing`/`hiding` classes, a
   `document.elementFromPoint` beside a published `readHit`); the mutation an executor performs
   against a journey assertion and a refusal assertion (ROADMAP 11); the `prove` limit stated
   against the installed version rather than a pin (ROADMAP 12); the accessible-name collision
   rule (ROADMAP 34); and the arrival, unknown-route, miss-screen, document-title, and render-error
   journeys the field pass found missing. Rule on whether any of these is product policy the skill
   must stop before, per `AGENTS.md` § Design laws → Mechanism, not product policy.
6. **Units.** Decompose into units by required context and independently verifiable acceptance,
   one writer per checkout, with the dependency order the release shape forces (test package
   first, scaffold second, consumer last). Name each unit's role and engine, owned files, and
   acceptance criteria. Name the exit criterion: the enumerated capabilities whose closure ends the
   campaign.
7. **Risks.** What this design can get wrong, and the probe that would catch it early.

## Output

Return a Markdown report, no process diary, with these sections in order: `Ruling summary` (ten
lines at most), `Matrix` (one table), `Contracts` (fenced `ts` declarations per proposed export),
`Statechart ruling`, `Propagation ruling`, `Skill instructions`, `Units` (one table plus the exit
criterion), `Risks`, `Unknowns overturned or confirmed`.

A native lane returns the report as its final message. A bench lane returns it as its final
message and the driver writes it beside the journal.

## Deviation contract

Stop and report — expected, found, exact evidence — where a file named here does not resolve or
where the G1 distillate contradicts a measurement in this brief. Decide, record, and carry on on
every question of ordering, naming, and where a section sits.

## Acceptance criteria

1. Every in-scope ROADMAP item and every retained finding named in this brief appears on exactly
   one matrix row.
2. Every proposed export carries a signature, a location, its failure voice where it throws, and
   the consumer site that adopts it.
3. Every unit names its role, engine, owned files, order, and an acceptance criterion the
   Orchestrator can check without the writer's report.

## Review evidence

This is a design proposal. The canon it must satisfy is `AGENTS.md`, the rule files named earlier,
the test package's § Limits gate, and the skill-writing rules in
`scaffold/.claude/rules/documentation.md` § Workflow skills. The record of what motivated it is the
retained field pass, debrief verdict, and readiness verdict named earlier.
