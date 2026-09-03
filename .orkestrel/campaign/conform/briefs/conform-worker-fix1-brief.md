# Unit conform-worker fix round 1 — isolated controls, the citations, nested callbacks, the `@param`, the report's pointers

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/worker`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutations of claims 3, 4, and 5 and its findings O1, O2, and O3 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/worker-objective-r1-sol.md`), and the round-1 checker's refutation of claim 5 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/worker-r1-checker-luna.result.md`). R3 is ruled: worker-obj-10 is a rule-driven rewrite whose defect (a wall-clock adjustment during a spin) has no reachable test vector; its evidence is the `Date\.now` sweep and the green run, and the report's paragraph at `:139-144` stands as written.

## Context

Read first: `/home/user/scaffold/AGENTS.md` § Design laws (no nested functions) and § Writing; `/home/user/scaffold/.claude/rules/architecture.md` § Functions and orchestration (the only in-body function expressions are an anonymous callback passed directly as an argument and an anonymous function returned directly); `/home/user/scaffold/.claude/rules/tests.md` § Test contract (the same command red then green; the revert reddens exactly the test that names the defect); `/home/user/scaffold/.claude/rules/documentation.md` § Authority and workflow (no competing instruction copies); `/home/user/scaffold/.claude/rules/typescript.md` § Comments and API documentation; the report `/home/user/scaffold/tmp/units/conform/conform-worker-report.md`.

Standing conditions: the checkout carries the conform-worker unit's uncommitted edits (26 files); leave every edit outside the Sites as it is. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a plant by editing the line back. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file> [-t "<test name>"]` with `<project>` one of `src:server`, `src:core`, `setup`, `guides`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/worker-proofs/<name>.txt 2>&1`.

## Sites and edits

- **Claim 5, the citations** — sweep `AGENTS[^\n]*§` (this pattern and no wider one: an RFC section pointer such as `RFC 6455 §5.2` is not a citation and stays) over `src`, `tests/src`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/guides.test.ts`, `guides/worker.md`, `guides/README.md`, and `README.md` (never a vendored `guides/<dependency>.md` mirror). At every hit — the lanes name `tests/src/core/Worker.test.ts:33`, `tests/guides.test.ts:3`, `src/server/helpers.ts:8,10`, `src/server/types.ts:16,79`, `src/core/types.ts:6`, `tests/setupServer.ts:3`, `guides/worker.md:20,127,155`, `guides/README.md:3` — delete the citation and keep the sentence's substance, or the sentence where the citation is all of it. Record each rewrite.
- **Claim 3, the sweep record** — re-run and record in § Sweeps: the case-insensitive inflection sweep for `spawnThread` and `dispatch` (`\b(spawnThread|spawnThreads|spawnThreaded|spawnThreading)\b`, `\b(dispatches|dispatched|dispatching)\b`) and the `\bQueueExecution\b` sweep, over `src`, `tests`, `guides/worker.md`, `guides/README.md`, and `README.md`, with every hit ruled (the English senses at `src/server/Dispatch.ts:10`, `src/server/types.ts:34`, `tests/src/server/helpers.test.ts:52,537`, `guides/worker.md:225,320` are permitted).
- **Claim 4, isolated controls** — worker-obj-7 and worker-obj-8: re-plant each defect the report names and run the narrowest command that collects the one test naming it, using `-t "<test name>"` where the file holds sibling cases the plant also reddens; capture `obj7-control-red-isolated.txt` and `obj8-control-red-isolated.txt` with one failing test each, restore by editing, and capture the same command green as `obj7-green-isolated.txt` and `obj8-green-isolated.txt`. Rewrite those rows in the report to cite the isolated pair; keep the earlier captures named as the broad readings they are. worker-obj-10: no edit; the report's paragraph stands under the ruling in Objective.
- **O1, nested callbacks** — `tests/guides.test.ts:200` (`isNumber` assigned in a `describe` body: import `isNumber` from `@orkestrel/contract` instead), `tests/setupServer.test.ts:89,136,151`, and `tests/src/server/factories.test.ts:153-159,185,212`: remove each function declared or assigned inside a test body. A callback passed directly as an argument stays anonymous in place; a recorder from `@orkestrel/test` (`createRecorder`) replaces an inert local handler; a callback that closes over test state and is reused moves to `tests/setupServer.ts` or `tests/setup.ts` as an exported factory returning the function (the returned-function form is permitted). Sweep `^\s+(const|let)\s+\w+\s*=\s*(async\s*)?(\(|function)|^\s+function\s+\w+` over `tests/guides.test.ts`, `tests/setupServer.test.ts`, `tests/src/server/factories.test.ts`, `tests/src/server/helpers.test.ts`, and `tests/src/server/handlers.test.ts` afterwards and rule every hit.
- **O2** — `src/server/factories.ts:104-106`: the `@param options` description names `on` and `error` beside the other optional keys.
- **O3** — refresh every `file:line` pointer in the report that no longer resolves to what it names (the lane's examples: `:84-88` → `src/server/types.ts:41-45`; `:150-156` → `src/server/types.ts:86-87`); sweep the report's pointers into `src/server/types.ts`, `src/server/factories.ts`, `tests/setupServer.ts`, and `tests/guides.test.ts` against the current tree.
- **Report** — append `## Fix round 1` naming both lanes' files, each item, the sweeps, and the captures.

## Scope

Owned: the citation sites in the files the sweep names; `tests/guides.test.ts`, `tests/setupServer.test.ts`, `tests/src/server/factories.test.ts`, `tests/setupServer.ts`, `tests/setup.ts` (the O1 edits), `src/server/factories.ts` (`:104-106`), the plant sites named in the report for obj-7 and obj-8 (restored after each capture), the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing. Take the two isolated controls before the O1 edits to their files.

## Output

Return, as your final message: each citation rewrite with `file:line`; the claim-3 sweeps with rulings; the two isolated control pairs (command, red count, green count, captures); each O1 site's new shape; the O2 sentence; the O3 pointers refreshed; the nested-function sweep with rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped runs over every file you touched.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when an isolated control cannot redden a single test, when an O1 rewrite needs a new seam in `src`, or when a gate reddens on a file outside Owned. Decide, record, and carry on for an ancillary question: which setup module takes an extracted factory, the exact wording of a rewritten sentence.

## Acceptance criteria

1. `grep -rnE "AGENTS[^\n]*§"` over the population returns no hit.
2. `obj7-control-red-isolated.txt` and `obj8-control-red-isolated.txt` each name one failing test; the green captures pass the same commands.
3. The nested-function sweep over the five test files returns only anonymous callbacks passed directly as arguments or functions returned directly.
4. `src/server/factories.ts` names `on` and `error` in the `@param options` description.
5. `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
