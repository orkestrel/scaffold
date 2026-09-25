# Unit STATES — the range thumb's press, disabled, and reduced-motion states read from rendered results, and a disabled link button

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, reached through the harness's Agent tool. It is the sole writer in
`/home/user/veneer-sts` (branch `unit/sts`, cut from the Veneer session branch at `LANDING_HEAD`, `node_modules`
hardlinked from `/home/user/veneer`). The proofs drive Chromium with trusted input and screenshots, which a bench sandbox
cannot drive (`.agents/orchestration.md` § Bench laws, rule 5), so the unit runs on the native writing lane. The harness
may name another directory as the primary working directory; start every shell command with
`cd /home/user/veneer-sts &&` and give every file tool an absolute path under it.

## Objective

Every interactive state the `.form-range` class defines is read from the rendered result. A disabled `.btn-link` has
a rendered case. These close claims 7 and 12 of the tenets audit.

## Context

**Evidence.** Measured at the landing tree (`/home/user/veneer`, `a29fef7`):

- `src/styles/components/_form-range.scss` defines these rules:
  - `.form-range:disabled` (the host's `pointer-events: none`);
  - the thumb transition through the `transition` mixin, with its reduced-motion twin;
  - `.form-range#{$thumb}:active`, a `color-mix` of `--vn-palette-blue` 30% over `--vn-palette-white-base`;
  - `.form-range:disabled#{$thumb}`, painted with `--bs-secondary-color`.
- `tests/src/styles/components/form-range.test.ts` drives keyboard focus only. The case `gates the thumb transition on
  the reduced-motion preference and reads it from the motion tokens` reads the gated rule's declarations, because
  Chromium withholds the thumb part's computed style. So a more specific reduced-motion rule on the thumb goes unseen.
- The tenets audit (`/home/user/scaffold/.orkestrel/veneer/units/tenets-styles/tenets-styles-audit-verdict.md`, claims
  7 and 12, and `tenets-styles-rendered-verdict.md`, claim 12) names these gaps:
  - the press state and the disabled state have no rendered case;
  - the thumb's reduced-motion collapse is read from declarations;
  - a disabled `.btn-link` has no rendered case.
- `tests/src/styles/components/button.test.ts`, case `keeps the link surface transparent and follows link colors`,
  reads an enabled `.btn-link` at rest, under hover, and under a held pointer. No case reads it disabled.
- A painted-pixel reading already exists: `tests/src/styles/utilities/object-fit.test.ts` shoots a frame with
  `page.screenshot({ element, save: false })` under `stagePane`, and reads regions of the encoded image. Copy that
  pattern, and search `@orkestrel/test/browser` for the reader it uses before writing any pixel code.

Re-take each reading in the worktree before editing, and report any that differ.

**Law.** `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,typescript,architecture,documentation,writing,quality}.md`;
Veneer's `ROADMAP.md` § Tenets, which asks that interactive states be decided by the rendered result; the guide
`guides/veneer.md`. No skill applies.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/test/browser`. Read the guide's `## Surface` section at
`/home/user/scaffold/guides/test.md` or the declarations under `node_modules/@orkestrel/test/dist/src/browser/`. The
hover, hold, press, pane, and region helpers live there. A helper whose job an installed export does is a defect.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). Run `npm run build:src:styles` before each styles
test run and after each plant. Other worktrees run suites at the same time, so a timing failure under load is an
observation with its reading.

**Measurements.** The unit takes every painted and resolved value it asserts in its own worktree.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.** `node_modules` is hardlinked. Never run `npm install` or `npm ci`.

## Unknowns

- Whether Chromium 141 lists the thumb's transition in `document.getAnimations()` while the thumb's fill changes. If it
  does not, read the collapse from painted frames sampled during the change, and report which reading the case uses.
- Whether a held pointer on the thumb keeps `:active` long enough to shoot. Report the reading.

## Scope

**Owned.** `tests/src/styles/components/form-range.test.ts`; `tests/src/styles/components/button.test.ts` (a disabled
`.btn-link` case only); `guides/veneer.md` (the § Tests entries for the new cases, and the § Form range classes prose
if it states how a state is proved).

**Shared (report-only).** `tests/setupStyles.ts` and `tests/setupBrowser.ts`. If a case needs a reusable helper, return
its exact patch.

**Off-limits.** `src/**`, every other test file, `tests/setupServer.ts`, `tests/setup.ts`, `tests/app/**`, `app/**`,
the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`,
`package.json`, and `ROADMAP.md`.

**What asserts the state this change ends.** The reduced-motion case changes its reading. No other file asserts the
range states. Confirm with a search of `tests/` for `form-range` before editing.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.
`npm run build:src:styles` is allowed. Plant only in `src/styles/**`, and restore each plant byte-identically.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings, then answer the Unknowns.
2. **Press.** Hold the pointer on the thumb with a trusted press. Read the thumb's painted fill from a screenshot of the
   thumb's box, and compare it with the resolved `color-mix` value. As a control, read the resting fill the same way.
3. **Disabled.** Render a disabled range. Assert the host's `pointer-events: none`. Assert that
   `document.elementFromPoint` at the host's centre does not land on it. Read the disabled thumb's painted fill against
   the resolved `--bs-secondary-color`.
4. **Reduced motion.** Read the thumb's transition from the rendered result:
   - with motion allowed, a change of the thumb's fill runs a transition;
   - under `stageMedia({ motion: false })`, no transition runs and the fill lands at its end value at once.
   Keep the declaration reading only where it adds a fact the rendered reading lacks.
5. **Disabled link button.** Render `<button class="btn btn-link" disabled>` and its anchor twin
   `<a class="btn btn-link disabled">`. Read the resolved color, the opacity, and `pointer-events` against the enabled
   control.
6. **Mutations.** Log each to `tmp/units/sts-plant-<name>.log.txt`:
   - change the held thumb's mix to 60%;
   - change the disabled thumb's fill token;
   - delete the thumb's reduced-motion twin;
   - drop `.btn:disabled`'s opacity token read.
   Each must fail its case with an `AssertionError`. Restore byte-identically.
7. Run each gate named in Acceptance, logged to `tmp/units/sts-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/sts-report.md` and return the same text. It holds:

- the Evidence re-readings;
- the Unknowns' answers;
- the cases, by title;
- the mutation table (plant, command, failing assertion, restored);
- the gate table;
- the shared-file patches, if any;
- `tmp/units/sts.diff` (`git diff LANDING_HEAD`) and `tmp/units/sts-status.txt` (`git status --short`).

State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.

- **Stop and report** when:
  - a state cannot be read from the rendered result on Chromium 141, with the reading that shows it;
  - a case needs a file outside Owned;
  - a gate reads red outside the change's reach.
- **Settle yourself:** the case titles, the screenshot regions, and where each case sits in its file.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt leaves the owned files unchanged.
2. `npx vitest run --project src:styles tests/src/styles/components/form-range.test.ts
   tests/src/styles/components/button.test.ts` passes.
3. Each mutation in Execution step 6 fails its case with an `AssertionError`, per the logs.
4. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** `npm run test:src:styles` over the whole styles project. The Orchestrator runs the
authoritative chain at landing.

## Review evidence

The unit's diff (`tmp/units/sts.diff`), its status output, the mutation logs, and the gate logs. The audit runs
`analyst` on GPT-6 Astra (objective lane) and `reviewer` on Opus 5.5 (subjective lane).
