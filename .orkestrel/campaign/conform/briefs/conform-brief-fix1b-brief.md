# Unit conform-brief fix round 1b — the remaining document pointers

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/brief`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the document pointers fix round 1's sweep found outside its scope (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/brief-fix1-sol-result.md` § `above|below` sweep): `guides/brief.md:208`, `:632`, `:1066`, `:1080`, the comment pointer at `src/core/BriefCompiler.ts:112`, and the comment pointers in `tests/src/core/*.test.ts` the sweep lists, before the round's distill and objective lanes read the tree. Fix round 1's edits stand; do not re-edit them.

## Context

`/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links (`preceding`, `following`, `earlier`, `later`, never `above` or `below` as a pointer; a rank comparison and an operator literal are not pointers). The vendored `guides/<dependency>.md` mirrors are outside the population.

Standing conditions: the checkout carries the conform-brief unit's uncommitted edits (22 files); `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`.

## Sites and edits

- Sweep `\b(above|below)\b`, case-insensitive, over `guides/brief.md`, `guides/README.md`, `README.md`, `src`, and `tests`; rewrite every document pointer with `preceding`, `following`, `earlier`, or `later`, or by naming the thing pointed at; record every hit that is a rank comparison or an operator literal as permitted.
- Report — append `## Fix round 1b` naming the sweep, every rewrite with `file:line` before and after, and every permitted hit with its reason.

## Scope

Owned: the pointer lines the sweep names in `guides/brief.md`, `src/core/BriefCompiler.ts`, and `tests/**`; the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: every rewrite with `file:line`, before and after; every permitted hit with its reason; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens. Decide, record, and carry on for an ancillary question: the exact wording of a rewrite.

## Acceptance criteria

1. The sweep returns only hits recorded as permitted with a reason.
2. The gates exit 0; `git status --short` lists the unit's paths and nothing new.
