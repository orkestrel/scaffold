# Unit F0-BRIDGE — the scaffold bridge to the Veneer roadmap

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in the scaffold checkout at
`/home/user/scaffold` from commit `903962c` on branch `claude/inspiring-allen-t4qzv1`. Perform the
assignment directly and spawn nothing.

Do not commit, push, install a dependency, or run a destructive command. Do not run `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`. The Orchestrator lands the work.

## Objective

Replace `.orkestrel/veneer/plan.md` with the bridge text under § The bridge text, verbatim, and
delete `.orkestrel/veneer/handoff.md`, so the campaign folder points at the executable plan of
record in the Veneer checkout and carries no second plan.

## Context

**Evidence.** `wc -l .orkestrel/veneer/plan.md .orkestrel/veneer/handoff.md` → `2190` and `375`.
`git rev-parse --short HEAD` → `903962c`; that commit holds the full text of each file, so the
diary the bridge names resolves through `git show 903962c:.orkestrel/veneer/plan.md`.
`grep -rn 'plan.md\|handoff.md' .orkestrel/veneer/tenets.txt .orkestrel/veneer/research.md
.orkestrel/veneer/realign-design-verdict.md /home/user/veneer/ROADMAP.md` → `tenets.txt` line 3
and `research.md` line 3 link to `plan.md` (the bridge keeps that path resolving);
`realign-design-verdict.md` and `ROADMAP.md` state that `plan.md` becomes a bridge and
`handoff.md` is deleted. Nothing in either checkout links to `handoff.md` by a relative link.

**Law.** `/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`;
skill: none; spec: `/home/user/veneer/ROADMAP.md` § Records (the sentence naming `plan.md` as a
bridge).

**Installed primitives.** none apply (a Markdown edit).

**Host.** Linux, bash, working path `/home/user/scaffold`. Network is not needed.
`.prettierignore` excludes `.orkestrel/` from the formatter and `tests/setupPolicy.ts` excludes
`.orkestrel` from the prose sweep, so no scaffold gate reads the file; the writing rules still
bind its prose and § Acceptance criteria names the checks you run by hand.

**Measurements.** As under Evidence.

**Control identifiers.** none.

**Standing conditions.** The scaffold working tree is clean at `903962c`; `git status --short`
prints nothing before you start. `tmp/` is ignored by git and holds this brief.

## Unknowns

none.

## Scope

**Owned.** `.orkestrel/veneer/plan.md` (rewritten in full), `.orkestrel/veneer/handoff.md`
(deleted with `rm`, never `git rm`).

**Shared (report-only).** none.

**Off-limits.** every other path in `/home/user/scaffold`, including `.orkestrel/veneer/tenets.txt`,
`.orkestrel/veneer/research.md`, and everything under `.orkestrel/veneer/units/` and
`.orkestrel/veneer/research/`.

**What asserts the state this change ends.** No test reads either file (the prose sweep excludes
`.orkestrel`; search bound: `grep -rn 'plan.md\|handoff.md' tests/ src/ guides/` in
`/home/user/scaffold`, which returns nothing for these paths).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash for `wc`, `grep`, `rm`, `git status`,
and `git diff --stat`. No install, no commit, no push.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## The bridge text

Write exactly this as the whole content of `.orkestrel/veneer/plan.md`, ending with one newline:

```markdown
# Veneer execution plan

The executable plan of record is the `ROADMAP.md` file in the Veneer checkout at
`/home/user/veneer`, on branch `claude/inspiring-allen-t4qzv1` of
`https://github.com/mikesaintsg/veneer`. Read that file first. It carries the tenets verbatim, the
standing and design rulings, the routing, the standing host conditions, the exit criterion, the
phase queue with its family keys, the carrier register, and the open decisions.

This folder keeps the campaign's evidence beside that plan:

- `tenets.txt` is the judging standard for the design and every implementation unit.
- `realign-design-verdict.md` records the rulings the roadmap carries, and every other
  `*-verdict.md` file sits beside the `*-claims.md` file its round ran on.
- `units/` holds each unit's brief, report, instrument, and log.
- `research/` holds the dated readings that `research.md` indexes.

The unit diary this file carried until 2026-09-22, and the handoff that sat beside it, live in git
history at commit `903962c`: run `git show 903962c:.orkestrel/veneer/plan.md` and
`git show 903962c:.orkestrel/veneer/handoff.md` in the scaffold checkout to read them.
```

## Output

Return, as your final message and nothing else: the output of `git status --short` and of
`git diff --stat`, the line count of the rewritten `plan.md`, and the result of each acceptance
check, one line each. Write the same text to `tmp/units/f0-bridge-report.md`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — if `git status --short` is not empty before you start, or if `handoff.md` or
`plan.md` is absent. Decide, record, and carry on from nothing else: the text is fixed.

## Acceptance criteria

1. `git status --short` prints exactly ` M .orkestrel/veneer/plan.md` and
   ` D .orkestrel/veneer/handoff.md`.
2. `diff <(sed -n '/^```markdown$/,/^```$/p' tmp/units/f0-bridge-brief.md | sed '1d;$d') .orkestrel/veneer/plan.md`
   prints nothing (the file equals the fenced text).
3. `grep -n -i -E '\bshould\b|\bsimply\b|\beasy\b|\bjust\b|\bcurrently\b|\bvia\b|\be\.g\.|\bi\.e\.|\betc\.' .orkestrel/veneer/plan.md`
   prints nothing.

**Observations, not criteria.** none.

## Review evidence

The diff and the status output the Orchestrator takes after you return.
