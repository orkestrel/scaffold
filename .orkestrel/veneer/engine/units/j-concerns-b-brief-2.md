# Unit J-CONCERNS-B, round 2 — the P-CANCEL cases prove that nothing was written

**What changed from `j-concerns-b-brief.md`, and why.** Round 1 (`7ab04db`) ruled FAIL 2, 3 (`units/j-concerns-b-audit-verdict.md`). Its P-CANCEL cases read state after the prevented call, so a write followed by a write-back passes them. This round makes each case record every mutation during the prevented call. Claim 3's failure was the claim's wording, and needs no change.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium.

## Objective

Each P-CANCEL case asserts that the prevented call wrote nothing, as a mutation history, not only as the end state.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- The verdict `units/j-concerns-b-audit-verdict.md`, and the objective lane's claim-2 row in `units/j-concerns-b-audit-objective-verdict.md`.
- The two cases at `7ab04db` in `tests/src/browser/Popover.test.ts`: "writes nothing and dispatches no inserted or shown event when a listener prevents the show event …", around line 338; and "keeps the tip shown, open, and unchanged, dispatching no hidden event, when a listener prevents the hide event a hide call starts", around line 388.

**The obligation.**
- In each case, attach a `MutationObserver` for the duration of the prevented call only, and read its records at the call's end. It observes the trigger's attributes and the document's `childList` and attributes, with `subtree`.
- Assert that no record was taken, beside the existing assertions.
- Disconnect the observer before any write the case makes itself.
- Prove each assertion with a mutation that reddens it by that assertion: a prevented show that writes a trigger attribute and then writes it back, and a prevented hide that does the same to the tip.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/tests.md`, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`.
- `engine/decisions.md` § E9 and § E24.
- Skill: none. Guide: none.

**Installed primitives.** `@orkestrel/test`'s recorders, where one fits. A `MutationObserver` is the platform's own.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-b`, on `unit/concerns-b` at `7ab04db`.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-concerns-b/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Popover.test.ts`.

**Measurements.** None beyond each mutation's red reading.

**Control identifiers.** P-CANCEL names the cell. Keep it in this brief and your report.

**Standing conditions.** None.

## Unknowns

None.

## Scope

**Owned.** `tests/src/browser/Popover.test.ts`, the two P-CANCEL cases only, and `tmp/j-concerns-b/`.

**Shared (report-only).** None.

**Off-limits.** Every other file. Mutate `src/browser/Tooltip.ts` only to take a red reading, back it up first, and restore it byte for byte.

**What asserts the state this change ends.** Nothing else.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format the file with `npx oxfmt --config .oxfmtrc.json --write tests/src/browser/Popover.test.ts`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- each case's added assertion, verbatim;
- each mutation, its red reading naming the assertion, and the byte restore;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when the unmutated source reads a record during a prevented call, because that is a defect. You decide the observer's options, within the obligation.

## Acceptance criteria

1. `npm run lint:check` and `npm run format:check` exit 0.
2. `Popover.test.ts` passes in a scoped run.
3. Each mutation reddens its case by the new assertion.
4. `src/browser/Tooltip.ts` is byte-identical to `7ab04db` after the run.

**Observations, not criteria.** None.

## Review evidence

The Orchestrator commits your work and replays the mutations.
