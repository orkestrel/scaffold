# Unit J-SAMEWAY-ENGINES-B — E24 in Dropdown, Tooltip, and Popover, and the platform's close of a promoted overlay

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree.

## Objective

`Dropdown`, `Tooltip`, and `Popover` follow E24 as `Modal` and `Offcanvas` do after J-SAMEWAY. In each engine, a close the platform makes of an overlay the engine promoted with `popover="manual"` either completes the engine's hide with its events, or the engine refuses it with the reason recorded. A consumer's `hide-popover` or `toggle-popover` invoker, or a `hidePopover()` call, makes such a close.

## Context

**Evidence.**
- The carried rows in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md` § Carried findings:
  - the E24 row naming `Collapse`, `Toast`, `Dropdown`, and `Tooltip`;
  - the external-close row: J-NATIVE-PROBE's risk row on Chromium 153 reads `openBefore=true openAfter=false` (`units/j-native-probe-153.log.txt`), and E17 bridges the hint tip's platform close.
- The J-SAMEWAY design lanes inventoried the doors at `4b62bca`: `units/j-sameway-design-planner-proposal.md` § 1, "The other engines", and `units/j-sameway-design-analyst-proposal.md` § Units, the table rows for Tooltip and Dropdown. The line numbers there are stale, so locate each door by its code:
  - **`Tooltip`**: the doors on the tip it built, and the `hide` door. E18 governs them.
  - **`Dropdown`**: the `show` re-read, the doors around placement, focus, and ARIA, the `hide` re-read, and the `hide` door.
  - **`Popover`**: inherits `Tooltip`'s constructor and doors.
- J-NATIVE-PROBE round 3 (`units/j-native-probe-report-3.md`) measured that a manual popover stays open on Escape. It also measured that a fully clipped reference leaves the promoted overlay open and its engine `shown`, which is out of scope here.
- The pattern to follow is `src/browser/Modal.ts` and `src/browser/Offcanvas.ts` at `8bc940d` (J-CASCADE's landing), together with J-SAMEWAY's round-3 report `units/j-sameway-report-3.md` § D1's table, which is the enumeration this unit must produce for its own engines. Tooltip's E17 bridge is the model for observing a platform close.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- The rules `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`, and `.claude/rules/browser.md`.
- `engine/decisions.md` § E13, § E17, § E18, § E22, § E24 (every amendment, including 2026-09-25's), § E25, § E27, and § E30.
- Skill: none. Guide: `guides/veneer.md` § Engine.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/contract`. Reuse `src/browser/helpers.ts` rather than a new wait or listener helper.

**Host.** Windows 11 with Git Bash. The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b` on branch `unit/engines-b`, cut from Veneer `main` at `8bc940d` (J-CASCADE's landing). The browser is Chromium 153. A foreground call is capped at 10 minutes. Write each program to a file under `tmp/j-engines-b/` and run it: no heredoc, no `python -`, no `node -e`. Drive a consumer's invoker with trusted `userEvent` clicks.

**Control identifiers.** B1 is the agreement. B2 is the takeover return. B3 is the platform close. B4 is the enumeration. Name each test for what it proves.

**Standing conditions.**
- J-SAMEWAY-ENGINES-A writes `Collapse`, `Toast`, `Tab`, and `Carousel` in another worktree.
- J-HOLDERS writes `Modal`, `Isolation`, `ScrollLock`, `HostSnapshot`, and `types.ts`.
- The styles session writes `src/styles/**` and `tests/setup*`.

## Unknowns

- Whether each engine can observe a platform close of its manual popover. The `toggle` and `beforetoggle` events fire on the promoted element. Report how.
- Whether completing the hide or refusing the close is the right answer for each engine. Report the choice with its reason under E24's rule that the host's chosen state stands.

## Scope

**Owned.** `src/browser/Dropdown.ts`, `Tooltip.ts`, `Popover.ts`, and `Placement.ts`; `tests/src/browser/Dropdown.test.ts`, `Tooltip.test.ts`, `Popover.test.ts`, and `Placement.test.ts`; and `tmp/j-engines-b/`.

**Shared (report-only).** Return an exact patch, and edit nothing, for each of:
- `src/browser/types.ts`, these engines' `@returns` and contract sentences;
- `guides/veneer.md`, the sentences in § Dropdown, § Tooltip, § Popover, and § Placement that state a door, a takeover, a return, or a platform close;
- `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`.

**Off-limits.** Every other source and test. `src/styles/**`. The vendored files: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** Every case in the owned test files that expects a refusal, or a `false` resolution, when the host moved the token toward the change's end. Also every case that assumes the engine keeps `shown` after a platform close. Find them by running each owned file after each change.

**Tools and limits.** Read, Grep, Glob, Edit, Write, and Bash. Commit nothing. Install nothing. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the files touched;
- the B4 table: for each engine and direction, every write, its entry, its return, or its rule, and the case that reads it;
- B3's choice per engine, with its reason;
- the cases with their red readings on `8bc940d`'s sources and their green readings, verbatim;
- the mutation table from the instrument's log;
- the report-only patches;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Stop and report when a change needs an off-limits file or a public type change, or when a platform close can be neither observed nor refused. You decide and record the entry names, the case order, and B3's choice per engine within E24.

## Acceptance criteria

1. `npm run check:src:browser`, `npm run lint:check`, and `npm run format:check` exit 0.
2. **B1 and B2.** As J-SAMEWAY-ENGINES-A's A1 and A2, for `Dropdown`, `Tooltip`, and `Popover`. Each case reads red on `8bc940d`'s sources.
3. **B3.** For each engine, a trusted click on a consumer's `hide-popover` invoker aimed at the promoted overlay leaves one of two outcomes. Either the engine completes its hide and dispatches its hide events, with `shown` reading `false`, or the engine keeps the overlay open and the case asserts that outcome. Each case reads red on `8bc940d`'s sources.
4. **B4.** The B4 table names no write without an entry or a rule.
5. **The instrument binds.** It works as J-SAMEWAY-ENGINES-A's instrument does, for these engines and for B3's observation.
6. The four owned test files pass in a scoped run.

**Observations, not criteria.** The whole `npm run test:src:browser` reading, which the Orchestrator takes after you exit.

## Review evidence

The Orchestrator commits your work on `unit/engines-b` and gives the lanes the commit's diff, `git status`, your report, and its own replay with each killed case's failure message.
