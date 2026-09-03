# Unit conform-worker fix round 3 — literal commands, the inventory, the tallies, the pre-existing prose sites

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/worker`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-3 checker's refutation of claim 9 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/worker-r3-checker-luna.result.md`) and the round-3 objective lane's refutation of claim 4 with its findings O1 to O3 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/worker-objective-r3-sol.md`). R1 is ruled: claim 4's failing-first conjunct excludes a rule-driven rewrite with no reachable vector, and the audit brief carries that amendment from this round; the report's worker-obj-10 paragraph stands. R3 is ruled: this round carries O3.

## Context

`/home/user/scaffold/AGENTS.md` § Writing (never state a count; delete a count you find); `/home/user/scaffold/.claude/rules/tests.md` § Test contract (a regression test records the exact command); `/home/user/scaffold/.claude/rules/writing.md` § Claims and time (never `guarantee` as a claim about behaviour; state the property) and § Code tokens, references, and links (`preceding`, `following`, never `above` or `below` as a pointer; `now` deleted).

Standing conditions: the checkout carries the conform-worker unit's uncommitted edits (28 paths). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file>` with `<project>` one of `src:server`, `src:core`, `setup`, `guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rnE <pattern> <paths>`, `ls`, `cat`.

## Sites and edits

- **Claim 4, the commands** — in the report's rows for worker-obj-1, worker-obj-6, and worker-subj-2 (`:61`, `:91`, `:162`), replace every `…`-abbreviated command with the literal command that produced the capture (read each capture's head for it).
- **Claim 9 and O1, the inventory** — regenerate the report's Files touched table from `git status --short` (28 paths, including `tests/setup.ts` and `tests/src/core/factories.test.ts`), delete the "26 files changed" count (`:262`) and the false status statement (`:276`), and refresh the pointers at `:88-89` to `guides/worker.md:213` and `tests/src/server/helpers.test.ts:613-639`.
- **O2** — the tally words at report `:95`, `:105`, `:198`, `:310`: name the declarations or fences directly.
- **O3** — `tests/src/server/helpers.test.ts:203,206,273,505,804` and `tests/src/core/Worker.test.ts:851`: rewrite each `above`, `below`, or temporal `now`; `guides/worker.md:384-385` and `tests/src/core/Worker.test.ts:1207`: replace `guarantee` with the listener-isolation property stated as what the emitter does (one listener's throw never prevents a sibling listener, and the error reaches the emitter's error handler). Sweep `\b(above|below|now|guarantee|guarantees|guaranteed|ensure|ensures)\b`, case-insensitive, over `src`, `tests/src`, `tests/setup.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/guides.test.ts`, `guides/worker.md`, `guides/README.md`, and `README.md`, and rule every hit (`performance.now()` and `Date.now()` are code tokens).
- **Report** — append `## Fix round 3` naming both lanes' files, each item, and the sweep; state under the worker-obj-10 paragraph that claim 4 reads the row under the static-conformance exception from round 3.

## Scope

Owned: the prose lines named in `tests/src/server/helpers.test.ts`, `tests/src/core/Worker.test.ts`, and `guides/worker.md`; the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the three literal commands; the regenerated inventory's paths; each rewrite with `file:line`, before and after; the sweep with rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, and the scoped runs over the two test files.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens. Decide, record, and carry on for an ancillary question: the exact wording of a rewritten sentence.

## Acceptance criteria

1. No `…` remains in a report command; the inventory lists every status path; no count of a growable set remains in the report.
2. The sweep returns only permitted hits.
3. The gates and scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
