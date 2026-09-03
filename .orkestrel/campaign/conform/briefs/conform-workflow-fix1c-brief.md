# Unit conform-workflow fix round 1c — the whole substitution table, swept once over the unit's prose

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/workflow`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the re-run round-1 checker's refutation of claim 1 and its F1 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/workflow-r1b-checker-luna.result.md`: `currently` at `guides/workflow.md:673`, `via` at `:1376`) and every other banned-table hit in the unit's prose in one pass, so the round stops surfacing them one at a time. Fix rounds 1 and 1b closed `now` at nine sites; do not re-edit those.

## Context

`/home/user/scaffold/.claude/rules/writing.md` § Substitutions, applied case-insensitively across inflections and ruled by sense, and § Claims and time (`new`, `latest`, `currently`, `now`, `soon`; `ensure`, `guarantee`); `/home/user/scaffold/AGENTS.md` § Writing (no counts over growable sets; no positional list references). The vendored `guides/<dependency>.md` mirrors are outside the population.

Standing conditions: the checkout carries the conform-workflow unit's uncommitted edits (58 files); `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`.

## Sites and edits

- Sweep, case-insensitive, over `guides/workflow.md`, `guides/README.md`, `README.md`, and the doc comments and prose in `src` and `tests` (never a code identifier): `\b(should|simply|easy|easier|just|currently|now|new|latest|soon|utilize|utilizes|leverage|leverages|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity check|dummy|blacklist|whitelist|ensure|ensures|guarantee|guarantees)\b`, plus `\bsince\b` (causal sense only) and `\bonce\b` (temporal sense only). Rule every hit by the sense its row bans; rewrite each banned hit with the table's replacement; record every permitted hit with its reason (a code token such as `Date.now()` or a `new` in `new Workflow(...)`, `new` naming a value rather than dating one, `once` meaning one time, `just` in "just before the next paint" ruled earlier). The two named sites: `guides/workflow.md:673` (`currently`, delete or recast) and `:1376` (`via` → `through`).
- Report `/home/user/scaffold/tmp/units/conform/conform-workflow-report.md` — append `## Fix round 1c` naming the checker's file, the sweep's pattern and paths, every rewrite with `file:line`, and every permitted hit with its ruling.

## Scope

Owned: prose lines in `guides/workflow.md`, `guides/README.md`, `README.md`, `src/**`, and `tests/**` that the sweep names; the report. Off-limits: every code identifier, every other line, and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the sweep's pattern and paths; every rewrite with `file:line`, before and after; every permitted hit with its ruling; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens. Decide, record, and carry on for an ancillary question: the exact wording of a rewrite.

## Acceptance criteria

1. The sweep over the population returns only hits recorded as permitted with a reason.
2. The gates exit 0; `git status --short` lists the unit's paths and nothing new.
