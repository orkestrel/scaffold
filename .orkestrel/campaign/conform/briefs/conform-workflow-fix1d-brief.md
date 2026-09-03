# Unit conform-workflow fix round 1d — every Surface description a noun phrase

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/workflow`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the re-run round-1 checker's refutation of claim 1 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/workflow-r1c-checker-luna.result.md`): `guides/workflow.md:245`, `:249-253`, and `:256-257` still describe Surface rows in the imperative ("Find", "Convert", "Project", "Flatten", "Reposition", "Schedule"), which workflow-subj-4 rewrites as noun phrases. Fix rounds 1 to 1c stand; do not re-edit their sites.

## Context

`/home/user/scaffold/.claude/rules/documentation.md` § Parity (a guide tagline and a Surface-row description are noun phrases); the unit brief row workflow-subj-4 in `/home/user/scaffold/tmp/units/conform/conform-workflow-brief.md`. `## Methods` tables keep their form.

Standing conditions: the checkout carries the conform-workflow unit's uncommitted edits (59 paths). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json guides/workflow.md`, `git status --short`, `git diff -- guides/workflow.md`, `grep -nE <pattern> guides/workflow.md`, `cat`.

## Sites and edits

- `guides/workflow.md`: in every Surface table (the Factories, Environment-backend, Errors, Helpers-and-guards, Entities, Types, and Constants tables — every table whose rows describe a symbol, as opposed to a `## Methods` table), rewrite each description that opens with an imperative verb as a noun phrase naming what the symbol is or returns. Sweep every such row afterwards with `^\| \x60[^\x60]+\x60 +\| [^|]+\| (Find|Convert|Project|Flatten|Reposition|Schedule|Create|Build|Run|Start|Stop|Return|Read|Write|Compile|Derive|Resolve|Check|Narrow|Validate|Compute|Emit|Produce|Wrap|Register|Remove|Add|Bind|Drive|Hold|Persist|Load|Save|Serialize|Restore|Watch|Wait|Yield|Report|Format|Parse|Scan|Walk|Filter|Map|Fold|Merge|Split|Sort|Count)\b` and rule every hit.
- Report `/home/user/scaffold/tmp/units/conform/conform-workflow-report.md` — append `## Fix round 1d` naming the checker's file, every rewritten row with `file:line`, and the sweep.

## Scope

Owned: the Surface-row descriptions in `guides/workflow.md`, the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: every rewritten row with `file:line`, before and after; the sweep's result; `git status --short`; the exit codes of `npm run format:check` and `npm run test:guides`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens. Decide, record, and carry on for an ancillary question: the exact noun phrase.

## Acceptance criteria

1. The sweep returns no imperative-first Surface description.
2. `npm run format:check` and `npm run test:guides` exit 0; `git status --short` lists the unit's paths and nothing new.
