# Unit J-ORACLE-FIX-OFFCANVAS, round 4 — the press observes the focus move instead of comparing focus state

**What changed from `j-oracle-fix-offcanvas-brief-3.md`, and why.** Round 3 (`43fa73d`) closed its residual input but found two more moves that no comparison of focus state can see: one inside a closed shadow root, and one outside a shadow root that holds the panel. This is the seam's third round, so the Orchestrator switched the strategy (`units/j-oracle-fix-offcanvas-round-3-ruling.md`). The press now observes a composed `focusin` during the synchronous hide. The round removes `readFocusedElement`, which would have no consumer.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium.

## Objective

A dismissing backdrop press cancels its default action exactly when its hide moved focus, at any shadow depth, closed roots included. Every sentence states that without a limit the code does not keep.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- The ruling `units/j-oracle-fix-offcanvas-round-3-ruling.md`.
- Round 3's report `units/j-oracle-fix-offcanvas-report-3.md`, with its residual probe `units/j-oracle-fix-offcanvas-3-residual-probe.sh`, `-3-residual.block.ts.txt`, and `-3-residual-probe.log.txt`.
- The code at `43fa73d`: `src/browser/Offcanvas.ts` `#press`, and `readFocusedElement` in `src/browser/helpers.ts`.

**The obligations.**
1. **Measure first.** In a probe under `tmp/probe/`, record whether a capture `focusin` listener on the panel's document fires during a synchronous `hide()` that returns focus to the trigger, in each placement:
   - the light tree;
   - one open shadow level;
   - two open levels;
   - a closed shadow root the panel carries, holding the trigger and the focused element;
   - a panel inside a shadow root, with a light-tree trigger;
   - a panel inside a shadow root, with focus on a light-tree element outside it.

   Also record that no `focusin` fires when the hide moves no focus: a prevented hide, and a trigger that takes no focus. If any placement contradicts the mechanism, stop and report the reading.
2. **The press.** `#press` adds a capture `focusin` listener on the panel's document, runs `void this.hide()`, removes the listener, and cancels the default action when the listener fired. It stores nothing past the call, and the listener's lifetime is the call alone.
3. **The proofs.**
   - Keep every case from rounds 1 to 3, and adapt any that reads through `readFocusedElement`.
   - Add the two round-3 probe inputs as cases, red at `43fa73d` by an assertion and green after: the closed root the panel carries, and the panel in a shadow root with an outside focus.
   - The guard rows must hold: no cancellation when the hide moves no focus.
4. **Remove `readFocusedElement`,** with its tests, its export-list entry, and its Surface row. No other consumer reads it: search the tree to confirm.
5. **The prose.** The class TSDoc, the `#press` comment, § Offcanvas, and its Bootstrap-difference bullet must state three things:
   - the press cancels its default action when the hide moved focus;
   - the press sees the move through the focus events the move dispatches, so every shadow depth counts, closed roots included;
   - a press whose hide moves no focus keeps its default action.

   Keep the round-3 sentence on a trigger inside the panel losing focus when the panel's visibility turns hidden, if it still holds.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, in particular § Minimal public API and "No polling architecture".
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `typescript.md`, `browser.md`, `tests.md`, `documentation.md`, and `writing.md`.
- `engine/decisions.md` § E24 and § E35.
- Skill: none. Guide: `guides/veneer.md` § Offcanvas and the Surface table.

**Installed primitives.** `@orkestrel/test` for every wait and recorder.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`, on `unit/oracle-fix-offcanvas` at `43fa73d`. The instruments are under its `tmp/j-oracle-fix-offcanvas/`: `red-3.sh`, `mutate-6.sh`, `accept-3.sh`, and `compare-3.py`.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-oracle-fix-offcanvas/` or `tmp/probe/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** Obligation 1, before any source edit.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.**
- The styles session's four button-reboot cases read red on Veneer `main` on this host. They are not this unit's.
- J-RELEASE-CORE also changes `helpers.ts` and `index.test.ts`, in its own worktree. Removing `readFocusedElement` touches only this unit's own additions. The landings merge by hunk.

## Unknowns

- Whether a focus return that `Isolation` makes during the hide dispatches `focusin` in every placement. Obligation 1 answers it.

## Scope

**Owned.**
- `src/browser/Offcanvas.ts` and `src/browser/helpers.ts`: the removal of this unit's own `readFocusedElement` only.
- `tests/src/browser/Offcanvas.test.ts`, `helpers.test.ts`, and `index.test.ts`.
- `guides/veneer.md`: § Offcanvas and the reader's Surface row.
- `tmp/j-oracle-fix-offcanvas/` and `tmp/probe/`.

**Shared (report-only).** None.

**Off-limits.**
- Every other file, including `Isolation.ts` and `Modal.ts`.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** The `readFocusedElement` suite, its export-list entry, its Surface row, and every sentence that states a depth the press misses.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- obligation 1's readings, per placement;
- `#press`, verbatim;
- the files touched;
- the red-first proofs: each new case's title, its red reading at `43fa73d` naming the assertion, and its green reading;
- each corrected sentence, before and after;
- a mutation table:
  - no listener, so the press never cancels;
  - a bubble-phase listener on the panel itself;
  - the listener kept past the call;
  - the earlier rounds' rows, through a successor script;
  - each red reading names an assertion;
- the census for `offcanvas` and `modal`, compared with round 3's;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when obligation 1 contradicts the mechanism in any placement, or when the fix needs an off-limits file. You decide the case titles, the probe's layout, and each sentence's wording.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:policy`, `npm run test:guides`, and `npm run test:setup:browser` exit 0.
3. `Offcanvas.test.ts`, `Isolation.test.ts`, `Modal.test.ts`, `helpers.test.ts`, and `index.test.ts` pass in scoped runs.
4. Both round-3 probe inputs read red at `43fa73d` by an assertion and green after, and every guard row holds.
5. `readFocusedElement` exists nowhere in the tree.
6. No sentence names a depth the press misses, and no sentence promises a cancellation the guard rows refute.
7. The census matches round 3's reading.
8. Every mutation reddens its proof by an assertion.

**Observations, not criteria.** `npm run test:app`.

## Review evidence

The Orchestrator commits your work, replays the proofs, the mutations, and the census, and gives the audit lane rounds 3 and 4, with the diff, the status, both reports, and its replay.
