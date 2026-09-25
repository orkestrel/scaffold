# Unit J-RELEASE-CORE, round 4 — `join`'s remark separates an aborted foreign signal from a later abort

**What changed from `j-release-core-brief-3.md`, and why.** Round 3 (`8b4e9d6`) ruled FAIL 6 (`units/j-release-core-audit-3-verdict.md`). `join`'s remark says that for a foreign signal, the class's `destroy` runs in an abort listener. That holds for a signal that aborts later. For a signal that has aborted already, `join` calls `destroy` directly, so an error it throws propagates from `join`. This round adopts the objective lane's correction and changes nothing else.

## Role and engine

`builder` on Sonnet, a native Claude Code subagent writing in the J-RELEASE-CORE worktree. This is a fully specified prose edit.

## Objective

`join`'s `@remarks` in `src/browser/Lifetime.ts` state the foreign branch's two cases truly.

## Context

**Evidence.** In `src/browser/Lifetime.ts` at `8b4e9d6`, `join`'s `@remarks` end with this passage:

> Any other signal destroys the class when it aborts, and at once when it has aborted already. The class's `destroy` method then runs in an abort listener, so the platform reports an error it throws and the abort does not propagate it.

Replace those two sentences with these three, verbatim:

> Any other signal destroys the class when it aborts, and at once when it has aborted already. When it has aborted already, the class's `destroy` method runs inside this call, so an error it throws propagates from this call. When it aborts later, the method runs in an abort listener, so the platform reports an error it throws and the abort does not propagate it.

Then check whether `guides/veneer.md` § Ownership and restoration (around line 1036) says the same thing. Its sentence begins "… destroys the class in an abort listener when it aborts". The objective lane ruled the guide's narrower statement true. Change it only if it also covers the already-aborted case, and report either way.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md`. Skill: none. Guide: `guides/veneer.md`.

**Installed primitives.** None apply.

**Host.**
- Windows 11 with Git Bash.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core`, on `unit/release-core` at `8b4e9d6`, with `node_modules` installed.
- Use no heredoc, no `python -c`, and no `node -e`.

**Measurements.** None.

**Control identifiers.** None.

**Standing conditions.** None.

## Unknowns

None.

## Scope

**Owned.** `src/browser/Lifetime.ts`, `join`'s `@remarks` only. `guides/veneer.md`, the one sentence named, only if it is false.

**Shared (report-only).** None.

**Off-limits.** Every other file and every other line.

**What asserts the state this change ends.** No test reads the remark.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format the file with `npx oxfmt --config .oxfmtrc.json --write src/browser/Lifetime.ts`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the remark, before and after;
- the guide sentence, and whether you changed it;
- the output of `npm run lint:check`, `npm run format:check`, and `npm run test:guides`;
- `git diff --stat`;
- `git status --short`.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when the passage is not found verbatim. You decide only the re-wrap.

## Acceptance criteria

1. `npm run lint:check`, `npm run format:check`, and `npm run test:guides` exit 0.
2. The remark carries the three sentences.
3. `git diff --stat` shows only comment and prose lines.

**Observations, not criteria.** None.

## Review evidence

The Orchestrator reads the diff and commits it.
