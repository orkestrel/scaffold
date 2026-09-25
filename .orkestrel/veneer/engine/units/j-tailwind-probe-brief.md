# Unit J-TAILWIND-PROBE — every engine scenario, read under Tailwind's preflight

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing a probe in its own worktree. It is native because the probe drives Chromium, which the Astra bench sandbox cannot start.

## Objective

A reading of every J-ORACLE plugin scenario, run on Veneer under a consumer's Tailwind preflight profile, compared with the same scenarios on Veneer alone. The reading decides whether an engine unit follows. Veneer ROADMAP § Tenets asks Veneer to "work with Tailwind and without it", and no engine proof reads it yet (`units/rebaseline-0925.md`, the Tailwind tenet).

## Context

**Evidence.** The machinery exists on `main`, and the probe composes it.
- `tests/setupServer.ts` (J-ORACLE-RECORD):
  - `PLUGIN_SCENARIOS`, every plugin's scenario;
  - `compileVeneerRuntime()`, which returns Veneer's `PluginRuntime` `{ library, script, stylesheet }`;
  - `recordPluginOracle(scenario, runtime)`, which records a scenario's state after each step;
  - `collectEngineDepartures(a, b)`, which lists every difference between two recordings.
- `tests/setupService.ts` (the styles session's TAILWIND-RECIPE):
  - `compileProfile(path)`, which compiles a Tailwind profile through the installed plugin;
  - `TAILWIND_PATHS.consumer.preflight`, which is `tests/fixtures/tailwind/consumer-preflight.css`. That fixture is the preflight recipe a consumer writes: the layer order, `@import 'tailwindcss'`, `@import '@orkestrel/veneer/styles'`, and its `@source` lines.
- The round-3 census instrument, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-record-census-3.test.ts`, shows how the recorder runs across scenarios in the `probe` project.

**The probe.**
1. Build the styles, as `npm run build:src:styles` does. The profile imports `@orkestrel/veneer/styles`, which resolves to the built cascade.
2. Compile `TAILWIND_PATHS.consumer.preflight` with `compileProfile`.
3. Build two runtimes from `compileVeneerRuntime()`:
   - **alone:** unchanged;
   - **tailwind:** the same `script`, with the compiled profile as the `stylesheet`.
4. Record every scenario under both runtimes. Collect the departures of **tailwind** from **alone**.
5. Before relying on step 4, run a control that proves the tailwind runtime changes something. Read one computed style the preflight is known to set on an element in a scenario's markup, for example `border-style` on an element the reset treats. Show that the two runtimes differ there. A probe that cannot show the profile took effect proves nothing.
6. Classify each departure by plugin, element, facet, and step.

The probe is a file under `tmp/probe/`, run through the `probe` project, or through a workbench config if it needs the service project's stage. It is not committed.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md` § Probes, and `.claude/rules/quality.md` § Probes before arguments.
- `engine/decisions.md` § E28 with every amendment, which governs the oracle reader.
- Skill: none. Guide: `guides/veneer.md` § Tailwind, read-only.

**Installed primitives.** `@orkestrel/test` for every wait. The recorder and the compiler exist; write neither again.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tailwind-probe`, on `unit/tailwind-probe`, cut from Veneer `main` at `b867c96`, with `node_modules` installed.
- A foreground call is capped at 10 minutes. The full scenario set under two runtimes can exceed it, so run it in slices by plugin, through an environment variable as the census instrument's `ORACLE_PLUGINS` does.
- Write each program to a file under `tmp/j-tailwind-probe/` or `tmp/probe/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.

**Measurements.** The control in step 5, before the full run.

**Control identifiers.** None.

**Standing conditions.**
- The styles session's four button-reboot cases read red on `main` on this host (`units/host-chromium-153-reading.md`, fourth reading). They are not this unit's.
- This unit changes no tracked file.

## Unknowns

- Whether the recorder's page loads a stylesheet that imports Tailwind's layers the same way it loads Veneer's own cascade. Report how the compiled profile is served, and any compile or load error, before you work around it.

## Scope

**Owned.** `tmp/j-tailwind-probe/` and `tmp/probe/` in the worktree.

**Shared (report-only).** None.

**Off-limits.** Every tracked file. The vendored files, which the `scaffold repair` command restores, are among them: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** Nothing; the probe changes no tracked file.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the control's reading, which is the computed style that differs;
- how the compiled profile is served to the recorder's page;
- the departures table: plugin, element, facet, name, value alone, value under Tailwind, and steps;
- for each departure, your reading of its cause, as a hypothesis with the evidence;
- the commands you ran and their exit codes;
- `git status --short`, which should show no tracked change;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when the profile will not compile or load, or when the control shows no difference. You decide the probe's file layout and how to slice the run.

## Acceptance criteria

1. The control shows the tailwind runtime differs from the alone runtime in at least one computed style the preflight sets.
2. Every scenario in `PLUGIN_SCENARIOS` is recorded under both runtimes, or its failure is reported with the error.
3. The departures table is complete for the scenarios recorded.
4. No tracked file changes.

**Observations, not criteria.** None.

## Review evidence

The Orchestrator reads the report and the probe, and rules on each departure: a defect, a departure to document, or the consumer's to handle.
