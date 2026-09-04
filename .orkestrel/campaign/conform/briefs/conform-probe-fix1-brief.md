# Unit conform-probe fix round 1 — a marker that lands after the close, the sweep records, one parity row, one recorded decision

## Role and engine

`implementer` on Claude Opus 5 (the Cursor bench being dark), the sole writer in `/home/user/fleet/probe`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutations of claims 2 and 4 and its findings O-1 to O-3 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/probe-objective-r1.md`); R-2 folds into the claim-2 item; R-1 is ruled (no addendum exists for probe: its one fleet dependency, mcp, renamed nothing probe imports, so the rulings against the brief stand); R-3 is the landing's deciding run under `ALLOW_RED_TEST=probe`. The round-1 Grok checker passed with one referral on the sweep-path record, folded into the claim-4 item.

## Context

`/home/user/scaffold/.claude/rules/tests.md` § Shared test infrastructure › Delay (wait until a named condition holds; the condition names the event it waits for) and § Test contract; `/home/user/scaffold/.claude/rules/documentation.md` § Parity (a `## Methods` table's rows exactly match the interface's call-signature members); the unit report `/home/user/scaffold/tmp/units/conform/conform-probe-report.md`.

Standing conditions: the checkout carries the conform-probe unit's uncommitted edits (14 paths). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a plant by editing the line back. The probe MCP server cannot arm in this container, so `npm test` carries the standing arming failure the unit brief names; run scoped files, never the whole suite. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server <file>`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup <file>`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rniE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/probe-proofs/<name>.txt 2>&1`.

## Sites and edits

- **Claim 2 and R-2, the marker** — the lint fixture at `tests/setupServer.ts:148-151` creates the `closed` marker with `openSync` before `closeSync(0)`, so the condition polled at `tests/src/server/stages/LintStage.test.ts:1302-1306` (`scratch.read('closed') !== undefined`) can hold before the close it names. Take the lane's first form: poll the record's contents, `() => (scratch.read('closed') ?? '') !== ''`, and reword `tests/setupServer.ts:62-63` and the row comment at `LintStage.test.ts:1299-1301` to say the record's contents land after the close. Then re-plant probe-obj-5's control at the shipped budget (`10_000`): plant the fixture to never write the record, run the scoped `LintStage.test.ts` command, capture `probe-obj-5-planted-red2.txt` reading the condition's own description in the failure, restore by editing, capture `probe-obj-5-green2.txt` under the same command. Replace the report's obj-5 captures.
- **Claim 4 and O-3, the sweep records** — add to the report's § Sweeps: the probe-subj-6 row (`taken on 2026-08-20` over `guides/probe.md`, `guides/README.md`, `README.md`: one hit at `guides/probe.md:1003`, the Cost measurement the row leaves, the receipt paragraph empty); case-insensitive inflection rows for `isProcessLive` and `#destroyed` (`\b(isProcessLive|isProcessLives|isProcessLived|isProcessLiving)\b` over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md`; `#destroyed` over `src`); and the paths every existing sweep row covered, so each row names its population.
- **O-1** — `guides/probe.md:258`: delete the `destroy` row from the `LintStageInterface` methods table (`src/server/types.ts:240-250` declares `inspect` alone; `destroy` is inherited and tabled under `StageInterface` at `:244`), matching the `TypeStageInterface` table; run `npm run test:guides` green.
- **O-2** — record under the report's § Decisions that probe-obj-4's `spawn` clause was not factored: the two callers spawn different programs with different stdio and readiness signals, and a leaf parameterized over those would be the superfluous wrapper `AGENTS.md` § Design laws refuses; `readChildEnding` carries the shared exit reading.
- **Report** — append `## Fix round 1` naming both lanes' files, each item, the sites, and the captures; state R-1's ruling (no addendum exists).

## Scope

Owned: `tests/setupServer.ts` (`:62-63`, `:148-151` as the claim-2 item needs), `tests/src/server/stages/LintStage.test.ts` (`:1299-1306`), `guides/probe.md:258`, the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the reshaped condition and the two reworded sentences with `file:line`; the red and green counts with capture paths, quoting the red's condition description; the sweep rows as recorded; the O-1 deletion; the O-2 decision text; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, and the scoped `LintStage.test.ts` and `setupServer.test.ts` runs.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when the planted control cannot be made to fail by the condition's own description, or when a gate reddens on a file outside Owned. Decide, record, and carry on for an ancillary question: the exact wording of a reworded sentence.

## Acceptance criteria

1. The polled condition reads the record's contents; `probe-obj-5-planted-red2.txt` names the condition's description at the shipped budget and `probe-obj-5-green2.txt` passes the same command.
2. The report's § Sweeps carries the probe-subj-6 row, the two inflection rows, and a population per row.
3. `guides/probe.md` tables `LintStageInterface` with `inspect` alone; `npm run test:guides` exits 0.
4. The gates and scoped runs exit 0; `git status --short` lists the unit's 14 paths and nothing new.
