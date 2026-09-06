# Unit brief — U7-fix-c: the resident-engine generalizations U7-fix-b could not reach (probe)

Follows `u7-fix-b-brief.md`, whose report § Deviations names these sites as outside its scope. Every edit here is one sentence, fully specified.

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in `/home/user/fleet/probe` for the life of this unit.

## Objective

Make the package's remaining generalizations over "resident engines" true of a probe whose type stage holds a mirror and spawns the compiler, and whose lint and runtime stages hold resident tools.

## Context

- Read first: `/home/user/fleet/probe/AGENTS.md` § Writing, `.claude/rules/writing.md`, `.claude/rules/typescript.md` § Comments and API documentation.
- The tree is dirty with U7, U7-fix-a, and U7-fix-b, uncommitted; commit nothing.
- Host: Linux, Node 22.22.2. Scoped commands only.

## Scope

Owned: `src/server/Probe.ts` (one string literal, edit 1), `src/server/types.ts` (the `ProbeServerInterface` TSDoc, edits 2 and 3), `src/core/types.ts` (the `ProbeInterface` TSDoc, edits 4 and 5). Off-limits: every other file and every other line of those three files.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no tree-wide `format` or lint `--fix`.

## Edits

1. `src/server/Probe.ts` (about line 300): the control reason `'the imported type changed after the resident type host cached it'` becomes `'the imported type changed on disk between the two inspections'`. Change no other reason string.
2. `src/server/types.ts` (about lines 346 to 347): "which is why there is no verb that stops serving and leaves the resident engines running: a probe nothing is reading from holds its resident tools for nobody." becomes "which is why there is no verb that stops serving and leaves the stages standing: a probe nothing is reading from holds its tools and its mirror for nobody."
3. `src/server/types.ts` (about line 383): "@returns A promise that settles after the probe releases its resident engines" becomes "@returns A promise that settles after the probe releases every stage's tool and mirror".
4. `src/core/types.ts` (about line 460): "the refusal answers before the resident stages are awaited" becomes "the refusal answers before any stage is awaited".
5. `src/core/types.ts` (about line 476): "Tears down the resident engines and releases the processes they hold." becomes "Tears down every stage and releases the processes and the mirror they hold."

Re-wrap each edited paragraph at the width the file uses. Change nothing else.

## Output

Write `tmp/units/ts6-u7-fix-c-report.md` with the five sentences before and after, with their lines; every criterion below with PASS or FAIL and its evidence; and any deviation.

## Deviation contract

Stop and report — expected, found, exact evidence — when a sentence is not where the brief says or reads differently from the quoted text. Wrapping is yours.

## Acceptance criteria (cheap first)

1. `npx oxfmt --config .oxfmtrc.json --check src/server/Probe.ts src/server/types.ts src/core/types.ts` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/server/Probe.ts src/server/types.ts src/core/types.ts` exits 0.
3. `grep -n "resident type host\|resident engines\|resident stages" src/server/Probe.ts src/server/types.ts src/core/types.ts` prints nothing.
4. `npx tsc --noEmit --project tsconfig.json` exits 0.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` exits 0 (the guide's fences read these TSDoc blocks through the built surface's names only; a red row names the sentence to repair).

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you exit; write nothing under `.orkestrel/`.
