# Unit TAILWIND-RECIPE round 3 — the guide says which scan a consumer's build runs, and the Tailwind test data moves to the setup module

Successor to `tailwind-recipe-brief-2.md`. What changed: the round-2 audit (`twr-audit-2-verdict.md`) failed claims 2 and
6 and accepted F1, F2, F3, and R1, and ruled that the recipe keeps automatic source detection and the prose states it.
This is the unit's third round, so the Orchestrator rules the fix. The Items are exact.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/veneer-twr`, which holds rounds 1 and 2 uncommitted over Veneer `21c821a`. The service proofs launch
Chromium, which a bench sandbox cannot drive. Start every shell command with `cd /home/user/veneer-twr &&` and give
every file tool an absolute path under it. Read `/home/user/scaffold/AGENTS.md`, the rules
`/home/user/scaffold/.claude/rules/{tests,names,typescript,writing}.md`, and the verdict
`/home/user/scaffold/.orkestrel/veneer/units/twr-audit-2-verdict.md`. No skill applies.

## Objective

§ Tailwind states that each recipe's import leaves automatic source detection on and that only the workspace roots it at
an empty directory. The one hard sentence reads once. The consumer's `preflight` recipe has its own local names, the
floor and fixture descriptions are true, the helper's proof catches a helper that reports one move per reading, and the
Tailwind proofs' constants live in `tests/setupService.ts`.

## Context

**Evidence.** Measured in the worktree. Re-take each reading before editing, and stop if one differs.
- `guides/veneer.md` § Tailwind has the paragraph beginning "Under the composable imports, Tailwind fills a layer only
  for the utilities it generates from the markup your `@source` rule names:" (around line 3344).
- The same section has "it names your own markup directory, which is what Tailwind scans to decide which utilities to
  generate." (around line 3365), "The compile roots the plugin's automatic source detection at an empty directory, so
  the markup line" (around line 3409), and "the markup's `px-8` utility is generated, a reading a recipe without its
  markup line fails;" (around line 3413).
- The § Files row for `tests/fixtures/tailwind/` contains "the executed consumer profile of each recipe, the markup
  those profiles scan,", and the row for `tests/setupService.ts` contains "the paths of the Tailwind profiles and
  fixtures and the floors and budgets of their proofs".
- `tests/setupService.ts` summarizes `COMPONENT_FLOOR` as "Lists the component classes the `preflight` recipe has to
  leave where the cascade puts them before a reading over the rest of the component rules means anything."
- `tests/service/tailwind/consumer.test.ts` declares `EXECUTED_SOURCE` and `SHIPPED_SOURCE` (around line 37), and
  `preflightSource` and `preflightProfile` from `TAILWIND_PATHS.consumer.preflight` (around line 48).
- `tests/service/tailwind/profiles.test.ts` declares `ORDER` and `CONTROL_VARIABLES` (around lines 16 and 22).
- `tests/setupServer.test.ts` holds `describe('collectMovedLonghands')`, whose cases give no reading two moved longhands.

**Shared files, told in advance.** `tests/setupServer.ts` and `tests/setupServer.test.ts` also change in other units;
this round touches only the `collectMovedLonghands` proof there. The landings merge by hunk.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`,
and set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Run `npm run build:src` before `npm run test:service`. Other
worktrees run suites at the same time; a timeout under load is an observation with its `/proc/loadavg` reading. Write
every log, backup, and script under this worktree's `tmp/units/`.

**Control identifiers.** None. Name each test for what it proves.

## Unknowns

None.

## Scope

**Owned.** `guides/veneer.md` (§ Tailwind and the two § Files rows the Items name); `tests/setupService.ts` and
`tests/setupService.test.ts`; `tests/service/tailwind/consumer.test.ts` and `tests/service/tailwind/profiles.test.ts`;
`tests/setupServer.test.ts` (the `collectMovedLonghands` proof only); `tests/setupServer.ts` only during the plant,
restored byte-identically; and `tmp/units/`.

**Off-limits.** `src/**`, `tests/fixtures/tailwind/**`, every other path, and every other line of the owned files.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`. `npm run build:src` is
allowed.

## Items

1. Replace the paragraph's first three sentences, from "Under the composable imports" through "whatever your markup
   uses.", with: "Under the composable imports, Tailwind fills a layer only for the utilities it generates from the
   files it scans: the `utilities` layer carries those rules and the `theme` layer carries the variables those rules
   read. Each recipe's Tailwind import leaves Tailwind's automatic source detection on, so your build scans the project
   it runs from as well as the directory your `@source` rule names. A build whose scanned files name no Tailwind utility
   therefore fills no layer at all. The bare import differs, because preflight is not generated from your files: it
   fills `base` and reads font variables of its own, so the `preflight` profile carries `theme` and `base` whatever
   your files use." Keep the paragraph's last sentence.
2. Replace "it names your own markup directory, which is what Tailwind scans to decide which utilities to generate."
   with "it names your own markup directory, which Tailwind scans beside the files its automatic detection finds to
   decide which utilities to generate."
3. Replace "The compile roots the plugin's automatic source detection at an empty directory, so the markup line" with
   "The compile roots the plugin's automatic source detection at an empty directory, which your build does not do, so
   the markup line".
4. Replace "the markup's `px-8` utility is generated, a reading a recipe without its markup line fails;" with "the
   markup's `px-8` utility is generated, and a recipe without its markup line fails that reading;".
5. In the § Files row for `tests/fixtures/tailwind/`, replace "the executed consumer profile of each recipe, the markup
   those profiles scan," with "the executed copy of each recipe, the markup those copies scan,".
6. Replace the `COMPONENT_FLOOR` summary with "Lists the component classes the `preflight` recipe's component reading
   has to reach, on a longhand Tailwind's reset also writes, before its equality means anything."
7. In `consumer.test.ts`, rename `preflightSource` to `consumerPreflightSource` and `preflightProfile` to
   `consumerPreflightProfile` at every use.
8. Move `ORDER` (renamed `LAYER_ORDER`), `CONTROL_VARIABLES`, `EXECUTED_SOURCE`, and `SHIPPED_SOURCE` into
   `tests/setupService.ts` beside `TAILWIND_PATHS`, each exported with its existing comment as TSDoc, and each array
   frozen. Import them where they were declared. Add them to the export-list case in `tests/setupService.test.ts` and
   its frozen checks, and add "the layer order, the control variables, and the source lines" to that case's title
   before "the proof budgets". In the § Files row for `tests/setupService.ts`, replace "the paths of the Tailwind
   profiles and fixtures and the floors and budgets of their proofs" with "the paths of the Tailwind profiles and
   fixtures, the layer order, control variables, and source lines their proofs read, and the floors and budgets of
   those proofs".
9. Add a case to `describe('collectMovedLonghands')`, titled `reports every moved longhand of one reading, in the
   reading's property order`, whose one standalone reading carries two longhands that both differ from its pair, and
   which expects both lines in order. Plant: make the helper stop after the first moved longhand of each reading; the
   case fails with an `AssertionError`. Log it to `tmp/units/twr-3-plant-first-only.log.txt` and restore
   `tests/setupServer.ts` byte-identically.

## Execution

Perform the assignment directly and spawn nothing. Re-take the Evidence readings, apply Items 1 to 9, run the plant,
then run each gate in Acceptance, logged to `tmp/units/twr-3-<gate>.log.txt` with the command echoed first and
`echo "exit=$?"` and `cat /proc/loadavg` appended.

## Output

Write `tmp/units/twr-report-3.md` and return the same text: each Item's before and after; the plant reading; the gate
table; `tmp/units/twr-3.diff` (`git diff 21c821a` plus the untracked fixtures' diffs) and `tmp/units/twr-3-status.txt`.
State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when an Item's text does not typecheck or lint as written, when a site an Item reaches lies outside the owned
set, or when a gate reads red outside a timeout under load. Settle nothing else yourself.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and oxfmt's `--check` leaves the owned files unchanged.
2. `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts tests/setupService.test.ts`
   passes.
3. After `npm run build:src`, `npm run test:service` exits 0.
4. The plant fails the new case with an `AssertionError`, per its log.
5. `npm run test:guides` and `npm run test:policy` exit 0.

## Review evidence

The diff and status, the plant log, and the gate logs. `analyst` on GPT-6 Astra checks the prose the Orchestrator ruled,
and `checker` on Sonnet reads the moves and renames.
