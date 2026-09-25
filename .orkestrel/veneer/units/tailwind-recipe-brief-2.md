# Unit TAILWIND-RECIPE round 2 — a load-bearing markup line, the fixtures and the comparison in the setup modules

Successor to `tailwind-recipe-brief.md`. What changed: the audit (`twr-audit-verdict.md`) confirmed the recipe cases and
failed claims 6, 7, and 9, with F1, F2, F3, and R1 to R5 accepted. Round 1's brief granted too little to fix claim 7;
this brief grants every file the fixes make false.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-twr`, which holds round 1 uncommitted over Veneer `21c821a`. The proofs launch Chromium, which a bench
sandbox cannot drive. Start every shell command with `cd /home/user/veneer-twr &&` and give every file tool an absolute
path under it. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,architecture,documentation,writing,quality}.md`; and
the verdict `/home/user/scaffold/.orkestrel/veneer/units/twr-audit-verdict.md` with both lane verdicts beside it. No
skill applies.

## Objective

The preflight recipe's markup `@source` line is load-bearing: a case fails when it is missing, and no reading depends on
repository text. Every Tailwind fixture path lives in `TAILWIND_PATHS`, every floor table in a setup module, and every
moved-longhand comparison goes through one exported, proved helper. The titles and the § Tailwind prose state what the
cases assert, in plain sentences.

## Context

**Evidence.** Measured by round 1 and the lanes:
- `tests/service/tailwind/consumer.test.ts` resolves `consumer-preflight.css` and `components.html` locally (around line
  40), declares `COMPONENT_FLOOR` (around line 46), and repeats the moved-longhand comparison inline in the consumer
  pairing's cases and the preflight recipe's shared-name case.
- `TAILWIND_PATHS` in `tests/setupService.ts` holds the `tailwind`, `preflight`, `consumer`, `instrument`, and `markup`
  keys; its case in `tests/setupService.test.ts` asserts the key population, and the export-list case lists the
  module's exports.
- `collectSharedNames` and `collectImportantNames` are exported from `tests/setupServer.ts` (around lines 2514 and 2594).
- The objective lane's probe: with `@source './markup.html';` removed from each recipe, `.px-8` is still generated,
  because `@import 'tailwindcss'` without `source(none)` also scans the working directory.
- `tests/service/tailwind/profiles.test.ts` holds the case `holds every written copy of the exclusion line equal to the
  profile that declares it`, which reads the guide fences, `preflight.css`, and `consumer.css`.
- `tests/service/tailwind/preflight.test.ts` declares `FLOOR_TAGS` locally (around line 19), a floor table of the same
  shape.

**Law.** `AGENTS.md` (Centralize by kind; Consolidation; one concept, one term; single-word names — change the shape
when one word is insufficient); `.claude/rules/tests.md` § Shared test infrastructure (reusable constants, data tables,
and helpers live in setup modules, exported, with proofs; tests are deterministic; an expensive proof's budget is sized
from a contended run); `.claude/rules/writing.md`; `AGENTS.md` § Writing on counts and `both`.

**Installed primitives.** Tailwind's installed compiler and scanner, as `tests/setupService.ts` already drives them.
Search that module for the compile and scan entry before adding one.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src` before `npm run test:service`. Other
worktrees run suites at the same time; record `/proc/loadavg` with every timing reading. Write every log, backup,
probe, and script under this worktree's `tmp/units/`, never in the scratchpad.

**Shared files, told in advance.** `tests/setupServer.ts` and `tests/setupServer.test.ts` also change in
LEDGER-ADDITIONS and in the engine session's J-ORACLE, each in another worktree. Add your helper, its proof, and its
export-list entry; change nothing else there. The landings merge by hunk.

**Control identifiers.** The claim, F, and R labels are this brief's. Name each test for what it proves.

## Unknowns

- How to compile a recipe so automatic source detection sees only the fixture markup. Candidates: point the compiler's
  and scanner's base at a scratch directory holding only the markup, or scan from the markup file's own directory. Read
  how `tests/setupService.ts` compiles first, choose, and report the mechanism with a reading that proves it: a class
  written only in repository text outside the markup is absent from the compiled output.
- The key names and shape for the two new fixtures. `components` fits `components.html`. `recipe` does not fit
  `consumer-preflight.css`, because `consumer.css` is a recipe too; if no single word names it, change the shape under
  `.claude/rules/names.md` and `AGENTS.md` § Design laws, and state the ruling in the report.

## Scope

**Owned.**
- `tests/service/tailwind/consumer.test.ts`, `tests/service/tailwind/profiles.test.ts`, and
  `tests/service/tailwind/preflight.test.ts`.
- `tests/setupService.ts` and `tests/setupService.test.ts`.
- `tests/setupServer.ts` and `tests/setupServer.test.ts`: the comparison helper, its proof, and its export-list entry
  only.
- `tests/fixtures/tailwind/**`.
- `guides/veneer.md`: § Tailwind, the § Files rows for the Tailwind fixtures and setup paths, and § Tests' Tailwind
  sentence.
- `tmp/units/`.

**Shared (report-only).** None.

**Off-limits.** `src/**`; every other test file; the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`); `vite.config.ts`; `package.json`; and every other path.

**What asserts the state this change ends.** The `TAILWIND_PATHS` case and the export-list cases in
`tests/setupService.test.ts` and `tests/setupServer.test.ts`; the profiles census; `npm run test:guides`. Search the tree
for `COMPONENT_FLOOR`, `FLOOR_TAGS`, and each fixture file name before editing, and own every site that comes back.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src` is
allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. **Claim 6 and R1.** Compile each recipe so automatic source detection sees only the fixture markup, per the Unknown.
   Then plant: remove `@source './markup.html';` from the preflight fixture alone; a case must fail with an assertion.
   Remove the plant. Rewrite any sentence or comment that states the markup line's effect so it states what the case
   now proves.
2. **Claim 7.** Add both fixtures to `TAILWIND_PATHS` and to its case's expected population; read them through the keys
   in every test; make the TSDoc, the case title, and the § Files row true. Export one pure helper from
   `tests/setupServer.ts` that returns the moved-longhand lines between two snapshot records, prove it in
   `tests/setupServer.test.ts` (equal records, a changed value, and a missing value), list it in the export-list case,
   and route every inline copy in `tests/service/tailwind/` through it, the copies that predate this unit included.
3. **Claim 9.** Move `COMPONENT_FLOOR` and `FLOOR_TAGS` into `tests/setupService.ts`, frozen and exported, with their
   export-list rows. Retitle the order case so it names the import, the scanned markup, the order, and the reset's
   layer; retitle the component case so it says each floor class moves on the control.
4. **F1.** Read `consumer-preflight.css` in the exclusion-line census through its new key, and name it in the guide's
   list of written copies.
5. **F2 and F3.** Write "compiles each recipe as written" for "compiles both recipes"; name "the importance branch" and
   "the rule for leaving the exclusion line" where the relocated `gap-3` paragraph refers to them; make the consumer
   pairing the actor that mounts the components fixture. Rename the stage manager that serves the compiled recipe to
   one word that is not `recipe`.
6. **R2 to R5.** Re-run one paired plant on the final `consumer.test.ts`. Time the component case under a contended
   `npm run test:service` and set its budget from that reading plus slack, recording both. Require the recipe's
   `@layer base` block to carry rules. Make the gate driver echo each command before it runs.
7. **Gates.** Run each gate in Acceptance, logged to `tmp/units/twr-2-<gate>.log.txt` with the command, `echo
   "exit=$?"`, and `cat /proc/loadavg`.

## Output

Write `tmp/units/twr-report-2.md` and return the same text. It holds: the source-isolation mechanism and its reading;
the key ruling; the helper's name, signature, and proof; the plant table with each plant's command, failing assertion,
and restore; the budget reading; the gate table; `tmp/units/twr-2.diff` (`git diff 21c821a` plus the untracked files'
diffs) and `tmp/units/twr-2-status.txt`. State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`.
- Stop and report when isolating the scan changes a reading beyond the markup line's own classes, when a comparison
  site cannot take the helper without changing what it asserts, or when a change needs a file outside the owned set.
- Settle yourself the isolation mechanism, the key names and shape, the helper's name and signature, the stage
  manager's name, the titles, and the prose wording.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. After `npm run build:src`, `npm run test:service` exits 0.
3. `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupService.test.ts`
   passes.
4. The markup-line plant and the re-run paired plant each fail a case with an assertion, per their logs.
5. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the plant logs, the isolation reading, and the gate logs. The audit runs `analyst` on GPT-6 Astra
and `reviewer` on Opus 5.5.
