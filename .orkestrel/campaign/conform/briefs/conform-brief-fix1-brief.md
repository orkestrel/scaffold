# Unit conform-brief fix round 1 — the documented fence values asserted, the retained `above`

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/brief`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 checker's refutation of claim 5 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/brief-r1-checker-luna.result.md`: `guides/brief.md:438-439` documents `draft.output.format`, `draft.trace`, and `buildGateDefinition().rules.length` and the moved fences block in `tests/guides.test.ts:367-400` asserts none of them) and the `above` the unit retained at `guides/brief.md:352` as a successor edit (`/home/user/scaffold/tmp/units/conform/conform-brief-report.md` § Deviations, item 1), before the round's distill and objective lanes read the tree.

## Context

`/home/user/scaffold/.claude/rules/tests.md` § Cross-cutting proofs (transcribe each flagship fence and assert the values its comments claim); `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links (`preceding`, `earlier`, never `above`). Run each value through the real code before writing the assertion: the guide states what the code returns.

Standing conditions: the checkout carries the conform-brief unit's uncommitted edits (22 files); leave every edit outside the Sites as it is. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/brief-proofs/<name>.txt 2>&1`.

## Sites and edits

- `tests/guides.test.ts` (the `the guide fences, executed` block): add an executed assertion for each value the fence at `guides/brief.md:438-439` documents — `draft.output.format`, `draft.trace`, and `buildGateDefinition().rules.length` — with the value the code returns; where the guide's comment claims a value the code does not return, stop and report it under Deviations rather than changing the guide. Capture the block red with one asserted value planted wrong (`fix1-red.txt`), restore, capture green (`fix1-green.txt`), same command (`npm run test:guides`).
- `guides/brief.md:352`: "round-trips the exact-record validators above" → "round-trips the exact-record validators named earlier" (or the validators' table by name). Sweep `\b(above|below)\b` over `guides/brief.md`, `guides/README.md`, `README.md`, `src`, and `tests` afterwards and rule every hit.
- Report — append `## Fix round 1` naming the checker's file, the assertions with `file:line`, the captures, and the sweep.

## Scope

Owned: `tests/guides.test.ts` (the fences block), `guides/brief.md:352`, the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each assertion with `file:line` and the value it pins; the red and green counts with capture paths; the `:352` rewrite; the `above|below` sweep with rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a documented value differs from what the code returns, or when a gate reddens. Decide, record, and carry on for an ancillary question: where an assertion sits in the block.

## Acceptance criteria

1. `grep -n "draft.output.format\|draft.trace\|rules.length" tests/guides.test.ts` returns an assertion for each.
2. `fix1-red.txt` reads one failing case and `fix1-green.txt` the `guides` project passing under the same command.
3. `guides/brief.md` carries no `above` or `below` as a document pointer.
4. The gates exit 0; `git status --short` lists the unit's paths and nothing new.
