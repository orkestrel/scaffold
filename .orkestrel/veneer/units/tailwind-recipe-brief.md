# Unit TAILWIND-RECIPE — the preflight recipe consumers copy is compiled, and component classes are read under it

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, reached through the harness's Agent tool. It is the sole writer in
`/home/user/veneer-twr` (branch `unit/twr`, cut from the Veneer session branch at `LANDING_HEAD`, `node_modules`
hardlinked from `/home/user/veneer`). The service project compiles Tailwind and drives Chromium, which a bench sandbox
cannot measure (`.agents/orchestration.md` § Bench laws, rule 5), so the unit runs on the native writing lane. The
harness may name another directory as the primary working directory; start every shell command with
`cd /home/user/veneer-twr &&` and give every file tool an absolute path under it.

## Objective

The `preflight` recipe in `guides/veneer.md` § Tailwind is held line for line to a compiled fixture. Every Veneer
component class that shares a property with Tailwind's preflight resolves the same under that recipe as under the
cascade alone. The garbled § Tailwind prose reads whole. These close claim 11 and finding F2 of the tenets audit.

## Context

**Evidence.** Measured at the landing tree (`/home/user/veneer`, `a29fef7`):

- `tests/fixtures/tailwind/preflight.css` writes `@import 'tailwindcss' source(none);`, scans
  `tmp/tailwind/candidates.txt` with `@source`, and has no `@import '@orkestrel/veneer/styles';` line. The guide's
  `preflight` fence (search `The following recipe is the \`preflight\` profile`) writes `@import 'tailwindcss';`, the
  Veneer import, `@source './src';`, and the exclusion line.
- `tests/service/tailwind/consumer.test.ts`, case `executes the recipe the guide ships, apart from the markup line each
  one names`, reads only fences containing `@import 'tailwindcss/theme.css'`. It holds the `tailwind` fence to
  `tests/fixtures/tailwind/consumer.css`. No case holds the `preflight` fence to any fixture.
  `profiles.test.ts` compares only the exclusion line.
- `tests/service/tailwind/preflight.test.ts` mounts only `NEUTRAL_MARKUP`, which carries no `class` attribute. So no
  case reads a Veneer component class under preflight.
- The tenets audit's rendered lens (`/home/user/scaffold/.orkestrel/veneer/units/tenets-styles/tenets-styles-rendered-verdict.md`,
  claim 11 and F2) names the mutation that no test tells apart: deleting the fence's layer-order line leaves every test
  green, and a consumer following the recipe then gets Tailwind's own order first.
- The same verdict's F2 names the garbled § Tailwind prose: a line opening "cover it.", a line ending "The proof asserts
  that" followed by "cover it.", and a repeated sentence about the `gap-3` name. Locate each by that text.
- `package.json` runs `test:service` as `vitest run --config vite.config.ts --no-cache --reporter=dot --project service`.
  The `test` script omits it.

Re-take each reading in the worktree before editing, and report any that differ.

**Law.** `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,workspace,names,typescript,architecture,documentation,writing,quality}.md`;
Veneer's `ROADMAP.md` § Tenets, which asks that the supported Tailwind combinations be proved in the browser; the guide
`guides/veneer.md` § Tailwind. No skill applies.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/test/browser`, and the installed `tailwindcss` and
`@tailwindcss/*` packages. Read the test guide's `## Surface` section at `/home/user/scaffold/guides/test.md`. The
service stage and fence readers already used by `consumer.test.ts` are the pattern to copy. A reader or compiler
wrapper whose job an installed export does is a defect.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` (Chromium 141). The service project reads the built package, so run
`npm run build:src` before `npm run test:service`. Other worktrees run suites at the same time.

**Measurements.** The unit takes every resolved value it asserts in its own worktree.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.** `node_modules` is hardlinked. Never run `npm install` or `npm ci`.

## Unknowns

- Which component longhands Tailwind's preflight also writes. Derive the list from the installed
  `tailwindcss/preflight.css` and the built cascade. Never write it by hand, and report it.
- Whether a component class loses any longhand to preflight under the recipe. If one does, stop and report it with the
  reading. That is a defect for a successor unit, not one this unit repairs.

## Scope

**Owned.** `tests/fixtures/tailwind/**` (a fixture equal to the `preflight` fence apart from its markup `@source` line,
beside `consumer.css`); `tests/service/tailwind/**`; `tests/setupService.ts` if a reusable reader belongs there;
`guides/veneer.md` (§ Tailwind, its garbled paragraphs and the sentences naming these proofs, and § Tests entries for
the changed cases).

**Shared (report-only).** `tests/setupStyles.ts` and `tests/setupBrowser.ts`. Return an exact patch for any helper they
need.

**Off-limits.** `src/**`, `tests/src/**`, `tests/setupServer.ts`, `tests/setup.ts`, `tests/app/**`, `app/**`, the
vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `vite.config.ts`,
`package.json`, and `ROADMAP.md`.

**What asserts the state this change ends.** `consumer.test.ts`'s recipe case, which filters to a single recipe. The
`preflight.test.ts` fixture reads. `profiles.test.ts`'s exclusion-line comparison. Re-derive the set by running
`npm run test:service` after the fixture change.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format only with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src` is
allowed. Plant only in owned files or in the guide, and restore each plant byte-identically.

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings, then answer the Unknowns.
2. Add the preflight consumer fixture. Hold it line for line to the guide's `preflight` fence, apart from the markup
   `@source` line, the way the `tailwind` fence is held to `consumer.css`.
3. Compile it. Mount the component classes that share longhands with preflight, including at least these:
   - `.btn`;
   - `.form-control` on an `input`;
   - `.form-select`;
   - `.form-check-input`;
   - `.btn-close`;
   - `.nav-link`;
   - `.page-link`;
   - `.table`.
   Assert that every longhand each component rule declares resolves the same with the cascade alone and with the
   compiled recipe.
4. Repeat the shared-name equality that `consumer.test.ts` runs, under this profile.
5. Restore the garbled § Tailwind paragraphs so each sentence reads whole. Delete the repeated sentence.
6. **Mutations.** Log each to `tmp/units/twr-plant-<name>.log.txt`:
   - delete the fence's `@layer` order line in the guide;
   - swap `elements` and `base` in that line;
   - drop the Veneer import from the fence.
   Each must fail a case with an `AssertionError`. Restore byte-identically.
7. Run each gate named in Acceptance, logged to `tmp/units/twr-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/twr-report.md` and return the same text. It holds:

- the Evidence re-readings;
- the Unknowns' answers, with the derived longhand list;
- the cases, by title;
- the mutation table (plant, command, failing assertion, restored);
- the gate table;
- the shared-file patches, if any;
- `tmp/units/twr.diff` (`git diff LANDING_HEAD`) and `tmp/units/twr-status.txt` (`git status --short`).

State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.

- **Stop and report** when:
  - a component longhand resolves differently under the recipe;
  - the fence cannot be compiled as written;
  - a change needs a file outside Owned;
  - a gate reads red outside the change's reach.
- **Settle yourself:** the fixture's name, the case titles, where the cases sit, and the restored prose's wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt leaves the owned files unchanged.
2. After `npm run build:src`, `npm run test:service` exits 0 with the new cases.
3. Each mutation in Execution step 6 fails a case with an `AssertionError`, per the logs.
4. `npm run test:guides` and `npm run test:policy` exit 0.

**Observations, not criteria.** None beyond the gates. The Orchestrator runs the authoritative chain at landing, with
`test:service` in it.

## Review evidence

The unit's diff (`tmp/units/twr.diff`), its status output, the mutation logs, and the gate logs. The audit runs
`analyst` on GPT-6 Astra (objective lane) and `reviewer` on Opus 5.5 (subjective lane).
