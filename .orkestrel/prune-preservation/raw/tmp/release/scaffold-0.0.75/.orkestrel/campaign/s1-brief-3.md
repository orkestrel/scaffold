# Unit S1 — the journey fan-out, the browser setup proof, and the engine limit scaffold propagates (successor 3)

## What changed from the brief this supersedes

`tmp/codex/s1-brief-2.md` stays in place unedited. Round 2 stopped, correctly, on an ownership gap:
the blueprint contract change reaches `tests/setup.ts` (`buildBlueprint` at line 178 constructs
the complete record with `setup: false` and `showcase: false` defaults) and `src/bin/CLI.ts:234`
(`#create` passes `setup: false` to `createBlueprint` outside the inference block). Both are now
owned. So is every other consumer a `Blueprint` member change reaches: `src/core/validators.ts`,
`src/core/factories.ts`, every test that constructs a blueprint under `tests/src/**`, and
`tests/setup.ts`'s example at line 175. Changing the type of the existing `setup` member is
permitted when every consumer moves in the same change (`AGENTS.md` § Design laws: no
compatibility shims); keeping `setup: boolean` and adding a single-word member for the runtime
split is permitted too. Choose, record the choice and why, and update every consumer.

Nothing else changed: the baseline stays `3fe781c9`, the tarball install stands, and every other
section of the superseded brief is restated below.

## Role and engine

`sol` on the Codex bench, model `gpt-6-astra` (the owner's standing substitution for the transport's
`gpt-5.6-sol` pin), reading this brief inside `codex exec` under the `workspace-write` sandbox with
`-C C:/Users/mikes/WebstormProjects/scaffold`. You are the sole writer in the scaffold checkout.
You open this brief yourself; every later section is written for you.

## Objective

Make `@orkestrel/scaffold` generate what every browser workspace that follows the
`orkestrel-prove-journey` skill has to hand-roll today: the per-variant journey fan-out, a browser
project for the `tests/setupBrowser.ts` proof, and the stated Chromium-only limit — with the two rule
files that fix the test-project matrix moved in the same change, and the generated-workspace proofs
green.

## Context

**Evidence.** Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/design-verdict.md` first;
rulings D15, D17, D18, and D19 are yours. The lane reports it reconciles sit beside it
(`design-planner-report-2.md` § Propagation ruling and `design-analyst-report-2.md` § Propagation
ruling), and `g1-distillate.md` § 5 describes the consumer's hand-rolled fan-out.

Measured directly by the Orchestrator:

- The consumer's fan-out: `C:/Users/mikes/WebstormProjects/roughnotes/vite.config.ts:39-60` declares
  `JourneyVariant` and `VARIANTS`; `:340-390` declares `journey(variant)`, which composes the
  browser project, replaces `include` with `tests/app/browser/integration.test.ts`, names the
  project `journey:<name>`, and provides `variant` and `variants` through `test.provide`; `:178-184`
  excludes that suite from `app:browser`. Its `test:journey` script runs
  `--project 'journey:*'`. Read that file for the semantics a real consumer needed; copy nothing.
- The root `vite.config.ts` scaffold emits is `ownership: 'content'` (`src/core/compilers.ts:894-898`),
  so adopter data cannot live in it: `scaffold audit` compares content and `repair` restores it.
  The showcase wrapper `configs/app/vite.showcase.config.ts` is content-owned too
  (`compilers.ts:1043-1050`), so it is the precedent for **inference from a wrapper's presence**
  (`src/bin/CLI.ts:960,980`; `SHOWCASE_CONFIG_PATH` in `src/core/constants.ts`) and **not** for
  adopter-edited content. Birth-owned artifacts exist (`tests/setup.ts`, `tests/setupBrowser.ts`,
  `tests/setupServer.ts` at `compilers.ts:1180-1200`, `tests/setupService.ts` at `:1211`,
  `tests/setupGlobal.ts` at `:1220`); a birth artifact is generated once and never repaired.
- The `showcase` axis end to end: `Blueprint.showcase: boolean` (`src/core/types.ts:227`),
  validated at `src/core/validators.ts:301`, defaulted at `src/core/factories.ts:71`, advised when
  absent by `blueprintToQuestions` (`tests/src/core/compilers.test.ts:1098-1117`), its factory
  filled through the `{{showcaseFactory}}` token (`compilers.ts:792-793`,
  `templates.ts:348-393`), its scripts emitted at `compilers.ts:395-396`, its wrapper at
  `compilers.ts:1043-1050`, its CLI inference at `CLI.ts:980`. The `setup` axis: `Blueprint.setup`
  inferred from any exact-case `tests/setup*.test.ts` (`CLI.ts:966-974`), the `setup` project
  template at `templates.ts:458-470` (Node, browser disabled, `include: ['tests/setup*.test.ts']`),
  `test:setup` emitted at `compilers.ts:351` and chained at `:318-323`.
- `ARTIFACT_TEMPLATES.tests.setup` is `''` (`templates.ts:1157`), so a generated
  `tests/setupBrowser.ts` is empty; the browser setup artifact is emitted at `compilers.ts:1185-1194`
  for a blueprint whose `src` or `app` includes `browser`.
- `configs/browsers.ts` is emitted from `CONFIG_TEMPLATES.browsers` (`templates.ts:806-1070`) and
  resolves Chromium layouts alone; the emitted `appBrowser` declares
  `instances: [{ browser: 'chromium', headless: true }]` (`templates.ts:341`).
- `.claude/rules/workspace.md` § Test project matrix and `.claude/rules/tests.md` § Cross-cutting
  proofs each fix the `setup` project as the sole home of every root `tests/setup*.test.ts` proof
  (`tests.md:62-64`); `workspace.md` § Configuration authority caps the leaves under `configs/`
  at `helpers.ts`, `browsers.ts`, and `policy.ts` — a `configs/app/*.config.ts` thin wrapper is
  not a leaf and is permitted.
- `tests/config.test.ts` is vendored and proves each `configs/(src|app)/vite.*.config.ts` wrapper
  it finds (`:446-490`, the showcase branch); `tests/setupPolicy.ts` and `tests/policy.test.ts` are
  vendored and belong to unit S2, not to you.
- `host.json` and `dist/host` are regenerated by `npm run build` (`build:host`, `build:inventory`),
  which the Orchestrator runs after you exit. A vendored or rule-file edit leaves `host.json` stale
  until then; a proof that reads it is an observation for you, not a criterion.
- `@orkestrel/test` is installed here from the packed tarball and exports `JourneyVariant` from its
  root entry (`node_modules/@orkestrel/test/dist/src/core/index.d.ts`). Emit the import as
  `import type { JourneyVariant } from '@orkestrel/test'`; the staged typecheck at
  `tests/src/core/templates.test.ts:1014` now resolves it.

**Law.** `AGENTS.md`; `.claude/rules/names.md` (a `Blueprint` member is a single word — a compound
such as `setupBrowser` is barred), `.claude/rules/typescript.md`, `.claude/rules/architecture.md`,
`.claude/rules/patterns.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`,
`.claude/rules/documentation.md`, `.claude/rules/writing.md`, `.claude/rules/portability.md`.
Skill: none. Guide: `guides/scaffold.md` (the blueprint, the axes, the generated projects and
scripts) and `guides/README.md`.

**Installed primitives.** `@orkestrel/test` 0.0.16 (`guides/test.md` § Surface),
`@orkestrel/contract` 0.0.17 (`guides/contract.md`), `@orkestrel/template` (the `fillTemplate`
door the templates already use). A helper whose job an installed export does is a defect.

**Host.** Windows 11. Your exec shell is PowerShell with script execution disabled: write
`npm.cmd run <script>` (never `npm run`), and never a `.ps1` control file. Write every multi-line
program to a file under `tmp/probe/` and run the file. The sandbox denies network, mounts `.git`
read-only, and denies a grandchild process and a listening socket. Vitest worker forks run.
`git status`, `git diff`, and `git log` work (a warning about `.config/git/ignore` is benign).
`npm run build`, `npm run format`, and `npm run lint` (the `--fix` form) stay with the
Orchestrator; run `oxfmt --config .oxfmtrc.json --check <files>` and `oxlint --config .oxlintrc.json
--deny-warnings <files>` over your own files instead. The `prove` MCP tool is blocked in an exec.

**Measurements.** The checkout is at `3fe781c9` with `package.json` and `package-lock.json` modified by
the tarball install and the untracked `.orkestrel/campaign/` folder and `tmp/`, all the Orchestrator's. `npm test` runs `test:src:core`, `test:src:server`,
`test:src:bin`, `test:policy`, `test:config`, `test:setup`, `test:guides`; `distribution` sits
outside it.

**Control identifiers.** `S1-C1` through `S1-C6` below. Name each test for what it proves, never for
the control label.

**Standing conditions.** `package.json` and `package-lock.json` are modified at the baseline by the
tarball install and stay off-limits. `host.json` reads stale after a vendored edit until the
Orchestrator's build; a `test:policy` or inventory proof that reads it may redden for that reason alone — report
the exact failing case rather than diagnosing it. Nothing else is known to fail.

## Unknowns

- **The blueprint member that states which setup runtimes a workspace has.** The design leaves the
  shape to you under the single-word law: derive it from the exact-case sibling proof paths
  (`tests/setup.test.ts` and `tests/setupServer.test.ts` run in Node, `tests/setupBrowser.test.ts`
  in a browser). Every consumer of the member is owned, so either shape closes; record the shape
  you chose and why.
- **Whether `vitest run --config configs/app/vite.journey.config.ts` with `test.projects` set in
  that file registers the variant projects the way the root does.** Probe it on a materialized
  workspace in `tmp/probe/` before committing to the shape; if it does not, register the variant
  projects from the root by importing the birth-owned wrapper's variant list, and record which.

## Scope

**Owned.** `src/core/types.ts`, `src/core/constants.ts`, `src/core/validators.ts`,
`src/core/factories.ts`, `src/core/templates.ts`, `src/core/compilers.ts`, `src/core/helpers.ts`,
`src/bin/CLI.ts` (whole file: the inference block and the blueprint construction in `#create`),
`tests/setup.ts` (the `buildBlueprint` fixture and its example), `tests/src/core/**`,
`tests/src/bin/**`, `tests/config.test.ts`, `.claude/rules/tests.md`, `.claude/rules/workspace.md`,
`guides/scaffold.md`, `guides/README.md`.

**Shared (report-only).** None; you are the only writer in this checkout. Unit T1 writes the
sibling `test` checkout and unit S2 follows you in this one.

**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/distribution.test.ts`,
`.agents/**`, `.claude/agents/**`, `.claude/skills/**`, `.codex/**`, `.cursor/**`, `configs/**`,
`vite.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`, `host.json`, `dist/**`,
`ROADMAP.md`, `src/server/**`, and every `guides/*.md` other than `scaffold.md` and `README.md`
(they are vendored mirrors).

**What asserts the state this change ends.** `tests/src/core/compilers.test.ts` (artifact paths,
scripts, questions per blueprint — the showcase cases at `:1098-1117` and the fixture blueprints
at `:616-690` are the shape), `tests/src/core/templates.test.ts` (the generated root configuration
loaded through `loadConfigFromFile` and its project rows), `tests/src/bin/CLI.test.ts` (target
inference), `tests/config.test.ts` (this checkout's own wrappers; the vendored branch that walks
`configs/(src|app)/vite.*.config.ts` at `:446-490` must admit a `journey` wrapper), and
`guides/scaffold.md` parity through `tests/guides.test.ts`. Derive the full set by running
`npm.cmd run test:src:core`, `test:src:bin`, and `test:config` after the templates land.

**Tools and limits.** The exec's shell and file tools. No commit, no push, no install, no git
command that takes the index lock. No tree-wide `format`, `lint --fix`, or `build`.

## Execution

A native subagent, or a bench engine reading this brief inside its own CLI: perform the assignment
directly and spawn nothing.

## The change

1. **The journey axis (D17).** A blueprint whose `app` includes `browser` and whose journey axis is
   on emits:
   - in the content-owned root `vite.config.ts`, beside `appBrowser` and `appShowcase`, an
     `appJourney(variant, variants)` factory (or an equivalent shape you settle) that composes
     `appBrowser`, replaces `test.include` with the browser environment's `integration.test.ts`
     alone, names the project `journey:<variant name>`, and provides `variant`, `variants`, and
     `capture` through `test.provide`, `capture` read once in the root from the environment and
     passed as a boolean so a test reads no environment record;
   - an `appBrowser` that excludes that suite from `app:browser` when the axis is on;
   - a **birth-owned** `configs/app/vite.journey.config.ts` wrapper, generated once, that declares
     the adopter's `readonly JourneyVariant[]` (seeded with a desktop and a compact viewport and no
     theme — the adopter renames and extends it) and registers one project per variant;
   - a `test:journey` script running that wrapper, chained into `test` after the app projects;
   - inference from the wrapper's presence, exact-case, the way `showcase` is inferred;
   - `blueprintToQuestions` advising an absent browser application the way it does for
     `showcase`.
   The type it imports is `import type { JourneyVariant } from '@orkestrel/test'`.
2. **The browser setup proof (D18).** When `tests/setupBrowser.test.ts` exists exact-case, emit a
   browser-enabled `setup:browser` project collecting exactly that path (Playwright provider,
   `setupFiles` `./tests/setup.ts` and `./tests/setupBrowser.ts`), exclude that path from the
   `setup` project, emit `test:setup:browser`, and chain it into `test`. Generate no proof file: a
   proof over an empty seed is a template TODO. The blueprint states which runtimes its setup
   proofs need, derived from sibling proof paths.
3. **The engine limit (D19).** State in the emitted `configs/browsers.ts` doc block that the
   resolver and the gate cover Chromium alone, and the condition that reopens it: a second
   Playwright engine installed and launching on the host with a `captureFrame` reading back at the
   declared size there, or one recorded journey or style divergence.
4. **The rules.** `.claude/rules/workspace.md` § Test project matrix gains the `setup:browser` and
   `journey:<variant>` rows with their files, environments, setup, and gate; the sentence fixing
   the `setup` project's registration extends to `setup:browser`; `.claude/rules/tests.md`
   § Cross-cutting proofs names the browser setup proof and its project. Write each as a directive
   per `AGENTS.md` § Instruction files.
5. **The guide.** `guides/scaffold.md` documents the journey axis, the wrapper the adopter edits,
   the `setup:browser` project, and the blueprint member you chose, with the summary cells equal to
   the doc blocks the parity gate compares.

## Output

Write `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/s1-report-3.md` and make your final message
its full text. The report holds, in this order: the shape you chose for the blueprint member and for
the wrapper, with the probe that settled the wrapper's project registration; every emitted artifact
and script with file and line; each control below with the command that ran it and the failing
count before and the passing count after; every gate command you ran with its exit code and totals
line; what you could not close and why; the claims of your own you flag as least certain. No
process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — where a criterion cannot close without an off-limits file, or where the vendored
`tests/config.test.ts` cannot admit the wrapper without a change to `tests/setupPolicy.ts`. Decide,
record, and carry on on: the blueprint member's name and shape, the seeded variant names and
sizes, the factory's exact signature, the order of rows in a table, and TSDoc wording.

## Acceptance criteria

1. `npm.cmd run check` exits 0.
2. `oxfmt --config .oxfmtrc.json --check` and `oxlint --config .oxlintrc.json --deny-warnings`
   over every file you touched exit 0.
3. `npm.cmd run test:src:core` exits 0 and includes:
   - `S1-C1` a blueprint with `app: ['browser']` and the journey axis on emits the wrapper, the
     `appJourney` factory in the root, the `test:journey` script chained into `test`, and an
     `app:browser` that excludes the journey suite; the same blueprint with the axis off emits
     none of them and the root's `app:browser` include is unchanged from today's.
   - `S1-C2` a blueprint with the journey axis on and no browser application emits nothing for it
     and `blueprintToQuestions` advises it, mirroring the showcase case.
   - `S1-C3` the materialized root configuration, loaded through `loadConfigFromFile`, registers one
     project per seeded variant named `journey:<name>`, each providing `variant`, `variants`, and
     `capture`, and the `app:browser` project's `exclude` carries the journey suite.
   - `S1-C4` a blueprint whose tests hold `tests/setupBrowser.test.ts` emits the `setup:browser`
     project with the browser enabled, the `setup` project excluding that path, and
     `test:setup:browser` in the chain; a blueprint holding only `tests/setup.test.ts` emits neither.
4. `npm.cmd run test:src:bin` exits 0 and includes `S1-C5`: target inference reports the journey
   axis on for a target carrying the exact-case wrapper and off for a target carrying a
   differently-cased or absent one, and reports the setup runtimes from the sibling proofs present.
5. `npm.cmd run test:config` exits 0, including `S1-C6`: the vendored wrapper walk admits a
   `journey` wrapper's shape (this checkout carries none, so the case proves the pattern against a
   planted name through the same branch the showcase uses).
6. `npm.cmd run test:guides` exits 0.

**Observations, not criteria.** `npm.cmd run test:policy` (it reads `host.json`, which the
Orchestrator regenerates), `npm.cmd run test:setup`, and the whole `npm.cmd test` chain, each with
your reading; the Orchestrator takes the authoritative runs after the build.

## Review evidence

The audit lane receives `git diff` and `git status --short` of this checkout, taken by the
Orchestrator after you return, plus your report.
