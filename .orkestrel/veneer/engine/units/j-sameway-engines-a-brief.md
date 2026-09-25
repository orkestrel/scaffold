# Unit J-SAMEWAY-ENGINES-A — E24 in Collapse, Toast, Tab, and Carousel

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree.

## Objective

`Collapse`, `Toast`, `Tab`, and `Carousel` each follow E24 as `Modal` and `Offcanvas` do after J-SAMEWAY:
- A host that moves the change's token toward the change's own end has made that write for the change, and the change completes.
- A host that moves the token against the change takes it over. The change then returns every write it made, each by its own entry, and dispatches nothing.

## Context

**Evidence.**
- The carried row in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md` § Carried findings reads: "`Collapse`, `Toast`, `Dropdown`, and `Tooltip` stop a change whose host moves the token toward its own end (…; the `Toast` hide door leaves `showing` set, and every later call is refused)".
- The J-SAMEWAY design lanes inventoried these engines at `4b62bca`: `units/j-sameway-design-planner-proposal.md` § 1, "The other engines", and `units/j-sameway-design-analyst-proposal.md` § Units, the table rows for Collapse and Toast. The line numbers there are stale, so locate each door by its code:
  - **`Collapse`**: the `show` re-read after the pre-change event, the `hide` re-read, and the `hide` size-write door that requires `show` to be present. The show write-stage doors read only `collapsing`.
  - **`Toast`**: the `show` fade door (animated, host started hidden), the `hide` re-read, and the `hide` transition door, which leaves `showing` set, after which `#refused()` refuses every later call.
  - **`Tab`**: the re-read after the pre-change event. Its write-stage doors read presence only.
  - **`Carousel`**: no `shown` token. The incoming item's `active` token plays that role, read at the re-read and at every door before the slide completes.
- The pattern to follow is `src/browser/Modal.ts` and `src/browser/Offcanvas.ts` at `8bc940d` (J-CASCADE's landing):
  - the call-local expected end;
  - one identity per change;
  - `#holds`, `#apply`, and `#revert`;
  - the returning steps `#rehide` and `#reshow`, each receiving its own entry per write.

  Read them, and J-SAMEWAY's round-3 report `units/j-sameway-report-3.md` § D1's table, which is the enumeration this unit must produce for its own engines.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- The rules `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`, and `.claude/rules/browser.md`.
- `engine/decisions.md` § E13, § E18, § E22, § E24 (every amendment, including 2026-09-25's), § E25, and § E30.
- Skill: none. Guide: `guides/veneer.md` § Engine.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/contract`. Reuse `src/browser/helpers.ts` (`settleAnimations`, `emitEvent`) rather than a new wait.

**Host.** Windows 11 with Git Bash. The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a` on branch `unit/engines-a`, cut from Veneer `main` at `8bc940d` (J-CASCADE's landing). The browser is Chromium 153 through the Vitest project `src:browser`. A foreground call is capped at 10 minutes. Write each program to a file under `tmp/j-engines-a/` and run it: no heredoc, no `python -`, no `node -e`.

**Control identifiers.** A1 is the agreement (the host moved the token toward the change's end). A2 is the takeover return. A3 is Toast's stuck `showing`. A4 is the enumeration. Name each test for what it proves.

**Standing conditions.**
- J-SAMEWAY-ENGINES-B writes `Dropdown`, `Tooltip`, `Popover`, and `Placement` in another worktree.
- J-HOLDERS writes `Modal`, `Isolation`, `ScrollLock`, `HostSnapshot`, and `types.ts`.
- The styles session writes `src/styles/**` and `tests/setup*`.

## Unknowns

For each engine: whether each door reached by a host write toward the change's end leads to completion, and whether each write the change makes has a return. Report both in the A4 table.

## Scope

**Owned.** `src/browser/Collapse.ts`, `Toast.ts`, `Tab.ts`, and `Carousel.ts`; `tests/src/browser/Collapse.test.ts`, `Toast.test.ts`, `Tab.test.ts`, and `Carousel.test.ts`; and `tmp/j-engines-a/`.

**Shared (report-only).** Return an exact patch, and edit nothing, for each of:
- `src/browser/types.ts`, the `@returns` and contract sentences of these four engines;
- `guides/veneer.md`, the sentences in § Collapse, § Toast, § Tab, and § Carousel that state a door, a takeover, or a return;
- `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, for any shared row table.

**Off-limits.** Every other source and test. `src/styles/**`. The vendored files: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** Every case in the owned test files that expects a refusal, or a `false` resolution, when the host moved the token toward the change's end. Find them by running each owned file after each engine's change.

**Tools and limits.** Read, Grep, Glob, Edit, Write, and Bash. Commit nothing. Install nothing. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the files touched;
- the A4 table: for each engine and direction, every write the call makes, its entry, its return, or its E13, E22, or host-move rule, and the case that reads it;
- the cases with their red readings on `8bc940d`'s sources and their green readings, verbatim;
- the mutation table from the instrument's log;
- the report-only patches;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Stop and report when a change needs an off-limits file, or when E24 cannot hold for an engine without a public type change. You decide and record the entry names, the case order, and whether a door becomes a lifetime-only read or keeps its token read after the token step, following E24's rule.

## Acceptance criteria

1. `npm run check:src:browser`, `npm run lint:check`, and `npm run format:check` exit 0.
2. **A1.** For each engine and each door before its token step, a host write toward the change's end leads to the change completing: the engine skips its own token write, completes every other write, dispatches its completed event, and resolves `true`. Each has a case that reads red on `8bc940d`'s sources.
3. **A2.** For each engine, a host write against the change after its token step leads to the change returning every write it made, each by its own entry, dispatching nothing, and resolving `false`. Each has a case.
4. **A3.** A Toast hide taken over at its transition door leaves no `showing` token, and a later `show()` and `hide()` are accepted. A case reads it red first.
5. **A4.** The A4 table lists every write in `show` and `hide`, or `slide` for Carousel, and names no write without an entry or a rule.
6. **The instrument binds.** `tmp/j-engines-a/mutations.py` plants, per engine, one mutation that restores the old refusal and one that drops an entry's return. It reads each case's failure message, counts a kill only when the failure names an assertion (`AssertionError` or the expect library's assertion message) and reads every other failure as refused. It reads a passed case as held only when its file reports no suite-level error, and it holds one control. It restores every source byte for byte.
7. The four owned test files pass in a scoped run.

**Observations, not criteria.** The whole `npm run test:src:browser` reading, which the Orchestrator takes after you exit.

## Review evidence

The Orchestrator commits your work on `unit/engines-a` and gives the lanes the commit's diff, `git status`, your report, and its own replay with each killed case's failure message.
