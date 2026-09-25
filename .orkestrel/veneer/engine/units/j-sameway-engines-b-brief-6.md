# Unit J-SAMEWAY-ENGINES-B, round 6 — the frame-wait comments claim no more than the measurements show

**What changed from `j-sameway-engines-b-brief-5.md`, and why.** Round 5's audit ruled FAIL 3 (`units/j-sameway-engines-b-audit-5-verdict.md`). The recorder measured each watched element's border box and read writes only synchronously, so it cannot show that no callback changes an observed content size. The four comments round 5 wrote say "although no callback changes an observed size", which claims that. This round removes that clause and changes nothing else. The cause the comments state is confirmed by the platform reproduction: an observation started during a delivery, at a depth no deeper than the delivered target, is deferred and reported.

## Role and engine

`builder` on Sonnet, a native Claude Code subagent writing in the ENGINES-B worktree. This is a fully specified mechanical edit.

## Objective

Each of the four frame-wait comments states the measured cause without claiming that no callback changes an observed size.

## Context

**Evidence.** The four comments at `4c9a7dd`, located by their text:
- `tests/src/browser/Tooltip.test.ts`, around line 2394: "The first call can settle inside the frame's ResizeObserver delivery, …"
- `tests/src/browser/Tooltip.test.ts`, around line 3148: "The show can settle inside the frame's ResizeObserver delivery, …"
- `tests/src/browser/Tooltip.test.ts`, around line 3378: "The stopped show settles inside the frame's ResizeObserver delivery, …"
- `tests/src/browser/Popover.test.ts`, around line 793: "The first call can settle inside the frame's ResizeObserver delivery, …"

Each contains the clause ", although no callback changes an observed size", split across a line break. Delete that clause from each, and keep the sentence around it grammatical. Then re-wrap the comment to the file's width, as the formatter does.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md`. Skill: none. Guide: none.

**Installed primitives.** None apply.

**Host.**
- Windows 11 with Git Bash.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b`, on `unit/engines-b` at `4c9a7dd`, with `node_modules` installed.
- Use no heredoc, no `python -c`, and no `node -e`.

**Measurements.** None.

**Control identifiers.** None.

**Standing conditions.** The worktree's `tmp/` holds round 5's probes. Leave them.

## Unknowns

None.

## Scope

**Owned.** `tests/src/browser/Tooltip.test.ts` and `tests/src/browser/Popover.test.ts`, the four comments only.

**Shared (report-only).** None.

**Off-limits.** Every other file and every other line.

**What asserts the state this change ends.** No test reads a comment.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format the two files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- each comment, before and after;
- the output of `npm run lint:check` and `npm run format:check`;
- `git diff --stat`;
- `git status --short`.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when a comment does not contain the clause. You decide only the re-wrap.

## Acceptance criteria

1. `npm run lint:check` and `npm run format:check` exit 0.
2. `grep -n "no callback changes an observed size" tests/src/browser/Tooltip.test.ts tests/src/browser/Popover.test.ts` prints nothing.
3. `git diff --stat` shows only the two files, with comment lines only.

**Observations, not criteria.** None.

## Review evidence

The Orchestrator reads the diff and commits it.
