# Unit conform-workflow fix round 1b — the successor to fix round 1: six `now` sites in `src`, the report, the gates

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/workflow`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## What changed and why

Fix round 1 (`/home/user/scaffold/.orkestrel/campaign/conform/briefs/conform-workflow-fix1-brief.md`) rewrote its three sites and stopped, correctly, because its `now` sweep found six prose hits in `src` outside its Owned scope and its first acceptance criterion required the sweep clean. The Orchestrator read the six and rules every one banned (temporal `now`; `:362` also carries a causal `since`). This successor widens Owned to those sites and carries the round's report section and gates. The three sites fix round 1 rewrote (`guides/workflow.md:105`, `tests/src/core/helpers.test.ts:206-210`, `tests/src/core/RunHolder.test.ts:41`) are done; do not touch them again.

## Sites and edits

- `src/core/WorkflowRunner.ts:466` — "sweep it `skip`ped now." → "sweep it `skip`ped."
- `src/core/factories.ts:49` — "the shared compiler now" → "the shared compiler" (keep the rest of the sentence's sense).
- `src/core/helpers.ts:544` — "`created` / `updated` are stamped now." → "`created` / `updated` are stamped at that point."
- `src/core/types.ts:362` — "since `bail` is now a" → "because `bail` is a".
- `src/core/types.ts:1708` — "the phase now starting" → "the phase that is starting".
- `src/core/types.ts:1938` — "is now the single control surface" → "is the single control surface".
- Re-run the `\bnow\b` sweep, case-insensitive, over `guides/workflow.md`, `guides/README.md`, `README.md`, and `src`, and record every surviving hit with its ruling (a code token such as `performance.now()` or `Date.now()` is permitted).
- Report `/home/user/scaffold/tmp/units/conform/conform-workflow-report.md` — append `## Fix round 1` naming the checker's file and this successor, the nine sites across both briefs, and the three sweeps (old names, nested arrow, `now`).

## Context and standing conditions

`/home/user/scaffold/.claude/rules/writing.md` § Substitutions (`now` deleted or dated; causal `since` → `because`). The checkout carries the conform-workflow unit's uncommitted edits (58 files); leave every edit outside the Sites as it is. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`.

## Scope

Owned: the six lines named, the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each rewritten line with `file:line`; the `now` sweep with rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens. Decide, record, and carry on for an ancillary question: the exact wording of a rewritten clause.

## Acceptance criteria

1. The `now` sweep returns only code tokens.
2. The gates exit 0; `git status --short` lists the unit's paths and nothing new.
