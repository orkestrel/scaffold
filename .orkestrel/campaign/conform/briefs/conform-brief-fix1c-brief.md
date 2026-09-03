# Unit conform-brief fix round 1c — every builder value the Builders fence documents, asserted

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/brief`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the re-run round-1 checker's refutation of claim 5 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/brief-r1b-checker-luna.result.md`): the fence at `guides/brief.md:380-439` executes `buildGiven`, `buildExample`, `buildCitation`, `buildGap`, and `buildRisk` with documented values, and the transcription at `tests/guides.test.ts:367-405` neither executes nor asserts them. Its claims 7 and 9 (the vendored `tests/policy.test.ts` edit) were closed by the Orchestrator's restore at 22:20 UTC; do not touch that file. Fix rounds 1 and 1b stand.

## Context

`/home/user/scaffold/.claude/rules/tests.md` § Cross-cutting proofs (transcribe each flagship fence and assert the values its comments claim); `/home/user/scaffold/.claude/rules/documentation.md` § Parity. Run each value through the real code before writing the assertion; where a documented value differs from what the code returns, stop and report it rather than changing the guide.

Standing conditions: the checkout carries the conform-brief unit's uncommitted edits (22 paths). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/brief-proofs/<name>.txt 2>&1`.

## Sites and edits

- `tests/guides.test.ts` (the `the guide fences, executed` block): for every builder call the Builders fence at `guides/brief.md:380-439` makes with a documented value — `buildGiven`, `buildExample`, `buildCitation`, `buildGap`, `buildRisk`, and any sibling the fence documents that the block does not yet assert — execute the call as the fence writes it and assert the value the fence's comment claims. Capture the block red with one asserted value planted wrong (`fix1c-red.txt`), restore, capture green (`fix1c-green.txt`), same command (`npm run test:guides`).
- Report `/home/user/scaffold/tmp/units/conform/conform-brief-report.md` — append `## Fix round 1c` naming the checker's file, each assertion with `file:line` and the value it pins, and the captures.

## Scope

Owned: `tests/guides.test.ts` (the fences block), the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each assertion with `file:line` and its value; the red and green counts with capture paths; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a documented value differs from what the code returns, or when a gate reddens. Decide, record, and carry on for an ancillary question: where an assertion sits in the block.

## Acceptance criteria

1. Every builder call the fence documents with a value has an executed assertion in the block; `fix1c-red.txt` reads one failing case and `fix1c-green.txt` the `guides` project passing under the same command.
2. The gates exit 0; `git status --short` lists the unit's 22 paths and nothing new.
