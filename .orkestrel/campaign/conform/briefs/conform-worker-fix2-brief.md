# Unit conform-worker fix round 2 — the `Default:` form, same-command greens, the obj-10 ruling stated, three prose sites, the pointers

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/worker`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 objective lane's refutations of claims 2 and 4 and its findings O1 to O3 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/worker-objective-r2-sol.md`); R2 is answered by stating the worker-obj-10 ruling in the report; R3 is recorded in the ledger. The round-2 checker passed.

## Context

`/home/user/scaffold/.claude/rules/typescript.md` § Comments and API documentation (write a default as "Default: …"); `/home/user/scaffold/.claude/rules/tests.md` § Test contract (the same command red then green); `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links and § Substitutions; the report `/home/user/scaffold/tmp/units/conform/conform-worker-report.md`.

The worker-obj-10 ruling (state it verbatim in the report's obj-10 paragraph): the row is a rule-driven rewrite — `performance.now()` for an elapsed interval per `.claude/rules/tests.md` — whose defect, a wall-clock adjustment during a fixture's spin, has no reachable test vector; its evidence is the `Date\.now` sweep over `src` and `tests` and the green run, and no negative control is owed.

Standing conditions: the checkout carries the conform-worker unit's uncommitted edits (28 paths). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a plant by editing the line back. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file> [-t "<name>"]` with `<project>` one of `src:server`, `src:core`, `setup`, `guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/worker-proofs/<name>.txt 2>&1`.

## Sites and edits

- **Claim 2** — `src/core/factories.ts:11`: "The pool's `max` defaults to `concurrency`, so resources match the jobs in flight" → "Default for the pool's `max`: the `concurrency` value, so resources match the jobs in flight." Sweep `defaults to|\(default ` over `src` afterwards and record it.
- **Claim 4** — worker-obj-1 (`createThread`) and worker-subj-2 (the hooks): run the exact narrow red command of each against the restored tree, capture `obj1-createThread-green-isolated.txt` and `subj2-green-isolated.txt`, and cite them in the report's rows in place of the broad server run. worker-obj-10: state the ruling from Context in the report's obj-10 paragraph; no capture.
- **O1** — `tests/guides.test.ts:3,195` and `tests/src/server/helpers.test.ts:19`: `below` → `following`, `above` → `preceding` (or name the thing pointed at). **O2** — `tests/setupServer.test.ts:77`: delete the temporal `now`. Sweep `\b(above|below|now)\b`, case-insensitive, over `tests/guides.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src`, and rule every hit (`performance.now()` and `Date.now()` are code tokens).
- **O3** — refresh the report's pointers from the tree (the lane names `:70` and `:107-109` against `tests/src/server/factories.test.ts:38,54,78` and `tests/src/server/helpers.test.ts:239,275,727`), and replace the claim at `:196` that a `guides/README.md` See-also introduction exists with the record that fix round 1 deleted that citation-only section.
- **Report** — append `## Fix round 2` naming the objective lane's file, each item, the captures, and the sweeps.

## Scope

Owned: `src/core/factories.ts:11`, `tests/guides.test.ts` (the two pointer lines), `tests/src/server/helpers.test.ts:19`, `tests/setupServer.test.ts:77`, the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the `Default:` sentence with `file:line`; the two green commands with counts and capture paths; the obj-10 paragraph as it now reads; each pointer rewrite with `file:line`; the sweeps with rulings; the refreshed report pointers; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped runs over the files you touched.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a narrow command does not pass green, or when a gate reddens. Decide, record, and carry on for an ancillary question: the exact wording of a rewritten pointer.

## Acceptance criteria

1. `grep -rn "defaults to" src` returns nothing.
2. The report's obj-1 and subj-2 rows cite same-command greens; the obj-10 paragraph carries the ruling.
3. The pointer and `now` sweeps return only permitted hits.
4. The gates and scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
