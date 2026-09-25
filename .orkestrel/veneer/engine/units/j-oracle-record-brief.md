# Unit J-ORACLE-RECORD — record Bootstrap 5.3.8's settled end states per plugin, and report Veneer's census against them

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the recorder launches Chromium.

## Objective

Every engine plugin has an independent Bootstrap 5.3.8 recording of its settled end states, captured through Bootstrap's own bundle by one recorder and one reader that drive both runtimes over the same markup with the same trusted verbs. The unit reports Veneer's census against those recordings. This is the E26 oracle, under the E28 design.

## Context

**Evidence.** The design is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E28. Read it whole, with both proposals it cites: `units/j-oracle-design-planner-proposal.md` and `units/j-oracle-design-analyst-proposal.md`. Where the proposals differ, E28 rules. The planner's § Units item 1 is this unit, and its item 4, J-ORACLE-GATE, is not.

These symbols exist at Veneer `origin/main` `0865c67`, read with `git grep`:
- `recordButtonOracle` at `tests/setupServer.ts`, around line 3327;
- `scanOracleObligation` around line 3226, and `isProofFile` around line 3199;
- `ORACLE_ACTIONS`, `ORACLE_EXCLUDED`, and `buildOracleComparison` in `tests/setupBrowser.ts`;
- the fixtures `tests/fixtures/oracle/button.json` and `tests/fixtures/oracle/inventory.json`.

Locate each by its name.

**The ruled points you implement.**
- **One recorder.** `recordPluginOracle(scenario, runtime)` in `tests/setupServer.ts` shares one launch scaffold with `recordButtonOracle`. `button.json` and Button's steps stay byte-identical.
- **One reader.** `readPluginState` reads each element's classes, its attributes other than `id`, `class`, and `style`, its visibility, and the focus and scroll-lock state. It normalises id references to labels. It drives Bootstrap's pinned bundle and Veneer over the same markup with the same trusted verbs.
- **Veneer from source.** Veneer runs from its current source, compiled at run time through the workspace's own Vite tooling, never from an existing `dist`, because a stale build reads green.
- **Fixtures and refresh.** Fixtures hold Bootstrap's observations alone. `ORACLE_REFRESH=1` replaces observations only, and never writes a departure.
- **Comparisons.** Compare settled end states, never event names, timing, or members (E9, E11).
- **Controls.**
  - The committed live controls use Veneer's public seams: a vocabulary override, a prevented pre-change event, `focus: false`, and a boundary control.
  - A retained per-plugin mutation run must make the comparison fail on each named difference. For example, a wrong expanded ARIA value on Collapse, `aria-current` left on the outgoing Carousel indicator, and `aria-hidden="true"` left on an open Modal.
  - Each control reads red before it counts.

**Not this unit (J-ORACLE-GATE's, after J-ROWS).** The guide's `### Departures` table, `readEngineDepartures`, the plugin rows' Proof, Obligation, and Status cells, `scanOracleObligation`'s plugin branch, and `isProofFile`'s deletion. Leave `scanOracleObligation` and `isProofFile` as they are.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md`, and `.claude/rules/workspace.md`, all under the scaffold checkout.
- `engine/decisions.md` § E9, E11, E26, and E28.
- Skill: none. Guide: `guides/veneer.md` § Compatibility and § Engine, read-only.

**Installed primitives.** `@orkestrel/test` (its `server` and `browser` entries) and `@orkestrel/contract`. Read the existing oracle and server helpers before adding any. A helper that duplicates one is a defect.

**Host.** Windows 11 with Git Bash. The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record` on branch `unit/oracle-record`, cut from Veneer `main` `0865c67`. Chromium 153 is installed for Playwright. A foreground call is capped at 10 minutes. Write each program to a file under `tmp/j-oracle/` and run it: no heredoc, no `python -`, no `node -e`.

**Control identifiers.** O1 is the recorder, O2 the reader, O3 the fixtures, O4 the controls, and O5 the census. Name each test for what it proves.

**Standing conditions.**
- The files this unit writes are the styles session's (E28). Your work lands only after that session agrees to each hunk, so write them fully in the worktree. The Orchestrator records each hunk under `plan.md` § Pending shared changes.
- J-SAMEWAY-ENGINES-A and -B are changing `Collapse`, `Toast`, `Tab`, `Carousel`, `Dropdown`, `Tooltip`, and `Popover` in other worktrees. The census reads Veneer at your base, and the Orchestrator re-runs it after they land.

## Unknowns

- Whether Bootstrap's load-time construction widens initial-state differences. Report it in the census.
- Whether passing a module-level function to `evaluate` breaks under an injected helper. Probe it first, in `tmp/probe/`.
- The settle timeout under contention. Size `PLUGIN_ORACLE_TIMEOUT` from a run you measure, and report the reading.

## Scope

**Owned (styles-owned and recorded as pending shared changes).**
- `tests/setupServer.ts`: the types, scenarios, recorder, reader, timeout, and the shared scaffold.
- `tests/setupServer.test.ts`: the helper cases, the pure controls, and the export list.
- `tests/conformance.test.ts`: each plugin's Bootstrap recording against its fixture, and the live controls.
- `tests/fixtures/oracle/<plugin>.json`, one per plugin.
- `tmp/j-oracle/` and `tmp/probe/`.

**Off-limits.** `src/**`, `tests/src/**`, `guides/**`, `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts`. If an owned change needs `tests/setupBrowser.ts`, stop and report the exact change. Also off-limits are the vendored files: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** The existing Button oracle cases in `tests/conformance.test.ts` and `tests/setupServer.test.ts`, which must stay green with `button.json` byte-identical, and the export list in `tests/setupServer.test.ts`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, and Bash. Commit nothing. Install nothing. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the files touched;
- the recorder's and the reader's signatures;
- one scenario list per plugin;
- **the census table**: per plugin, each state where Veneer differs from Bootstrap's recording, with the element, facet, Bootstrap's value, and Veneer's value;
- the controls with their red readings verbatim;
- the mutation table from the log;
- the timeout reading;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Stop and report when a change needs an off-limits file, or when a plugin cannot be recorded through Bootstrap's bundle on this host. You decide and record:
- the scenarios per plugin, within E28's rule that every non-refused step changes Bootstrap's state;
- the fixture layout;
- the case order and titles.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `tests/fixtures/oracle/button.json` is byte-identical, and the Button oracle cases stay green.
3. Every plugin has a fixture recorded through Bootstrap 5.3.8's bundle, and a conformance case that re-records Bootstrap and matches its fixture.
4. Every non-refused step in a scenario changes Bootstrap's recorded state.
5. Each live control reads red first. The per-plugin mutation run fails the comparison on each named difference. The instrument counts a kill only on an assertion, and reads a passed case as held only when the whole file run reports success, with no failed case and no unhandled error.
6. `npm run test:conformance` and `npm run test:setup` pass in a scoped run.
7. The report carries the census table.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work on `unit/oracle-record` and gives the lanes the commit's diff, `git status`, your report, and its own replay. The styles session receives each hunk before any landing.
