# Unit conform-server fix round 3 — no `AGENTS §` citation survives in a touched file

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/server`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-3 checker's refutation of claim 5 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/server-r3-checker-luna.result.md`): `AGENTS §` citations survive at `src/server/helpers.ts:126`, `:459`, `:512`, `src/server/constants.ts:4`, and `guides/server.md:11`, all files this unit touched.

## Context

Read first: `/home/user/scaffold/.claude/rules/documentation.md` § Authority and workflow (`AGENTS.md` and its linked rules are the sole convention source; guides carry no competing instruction copies) and `/home/user/scaffold/.claude/rules/writing.md`. The unit's row server-subj-1 removed the `AGENTS §22` citations from `guides/README.md`; the audit's claim 5 reaches every touched file, and every other package in this campaign removed such citations from its owned prose.

Standing conditions: the checkout carries the conform-server unit's uncommitted edits; leave every edit outside the Sites as it is. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`.

## Sites and edits

- Sweep `AGENTS[^\n]*§|§ ?[0-9]+` case-sensitively over `src`, `tests/src`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/guides.test.ts`, `tests/setupServer.ts`, `guides/server.md`, `guides/README.md`, and `README.md` (never a vendored `guides/<dependency>.md` mirror). At every hit, delete the citation — the parenthetical, the trailing "(AGENTS §N)", or the clause naming a section number — and keep the sentence's substance; where the citation is the whole sentence, delete the sentence. Record every hit and its rewrite.
- Report — append `## Fix round 3` naming the checker's file, the sweep, and each rewrite with `file:line`.

## Scope

Owned: `src/server/helpers.ts`, `src/server/constants.ts`, `guides/server.md`, and any other file the sweep names inside the population, at the citation sites alone; the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the sweep's pattern and paths, each hit with its before and after text and `file:line`, `git status --short`, and the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a citation carries a fact the sentence loses without it and no rule file states that fact, or when a gate reddens. Decide, record, and carry on for an ancillary question: the exact rewrite of a sentence.

## Acceptance criteria

1. The sweep over the population returns no hit.
2. `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides` exit 0; `git status --short` lists the unit's paths and nothing new.
