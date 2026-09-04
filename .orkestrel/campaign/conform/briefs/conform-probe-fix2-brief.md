# Unit conform-probe fix round 2 — the false proof-form clause, the parser guard that a second parser satisfies, its re-planted control

## Role and engine

`builder` on Claude Sonnet (native Claude Code subagent; a fully specified unit: one assertion, one plant, two captures, and record edits), the sole writer in `/home/user/fleet/probe`, also owning the unit's report file `/home/user/scaffold/tmp/units/conform/conform-probe-report.md` and the capture directory `/home/user/work/evidence/probe-proofs/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 objective lane's findings O-1 and O-2 with its referral R-1 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/probe-objective-r2.md`; the lane passed every claim and the round-2 checker passed every claim). O-3 (a pre-existing inline exit promise at `tests/setupServer.test.ts:113-115`) and R-2 (the sibling checkouts' vendored `guides/probe.md` mirrors) are ruled outside this unit and recorded in the campaign ledger; touch neither.

## Context

`/home/user/scaffold/AGENTS.md` § TTTDD (a failing proof precedes the fix: the exact command and its failing count, then the same command green); `/home/user/scaffold/.claude/rules/tests.md` § Shared test infrastructure; `/home/user/scaffold/.claude/rules/writing.md` § Claims and time.

Standing conditions: as `/home/user/scaffold/.orkestrel/campaign/conform/briefs/conform-probe-fix1-brief.md` § Context states them — the checkout carries the conform-probe unit's uncommitted edits (14 paths under `git status --short`); the vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits, and so is every line of `src/**`, `tests/**`, and `guides/**` this brief does not name; `node_modules` holds the fleet closure and no command rewrites it or the lockfile; never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, and undo a plant by editing the lines back; the probe MCP server cannot arm in this container, so `npm test` carries the standing arming failure and is not a command of this unit. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rnE <pattern> <paths>`, `ls`, `cat`, `sed -n`, `tee`.

## Sites and edits

- **O-1** — the report at `:108-110` reads "The entry runs on import and ends the process it is loaded into, so its reporter cannot be called from a test." That clause is false: `tests/src/bin/main.test.ts:248-267` spawns the built entry and asserts the reporter's own stderr line. Replace the clause so the sentence states the operative reason: the reporter is reachable only as a spawned entry, and no refusal this package can construct carries a lone carriage return to it (the comment at `tests/src/bin/main.test.ts:235-240` states the same). Keep the rest of the paragraph.
- **O-2 and R-1** — `tests/setupServer.test.ts:35` reads `expect(fixture.program.split('const message = JSON.parse(').length - 1).toBe(1)`. A program carrying two parsers satisfies that count when the second is spelled differently (the unit's own capture `/home/user/work/evidence/probe-proofs/probe-obj-3-builder-planted-red.txt:44,63` shows one). Replace the line with `expect(fixture.program.split('JSON.parse(buffer.subarray(').length - 1).toBe(1)`, which reads 1 against the shipped builder (`tests/setupServer.ts:97` is the sole framing parse) and 2 against a second parse of the buffer. Re-plant the control so the strengthened assertion has a red of its own: in `tests/setupServer.ts`, inside the builder's program text, add one more line parsing the buffer — a copy of `:97` spelled `"\tconst request = JSON.parse(buffer.subarray(start, start + length).toString('utf8'))",` placed directly after `:97` — run `npm run test:setup` and capture its output with `tee` to `/home/user/work/evidence/probe-proofs/probe-obj-3-parser-planted-red.txt`; it must fail on `tests/setupServer.test.ts:35` with the strengthened count reading 2. Remove the planted line by editing it back out, run the same command, and capture it to `/home/user/work/evidence/probe-proofs/probe-obj-3-parser-green.txt`. Confirm with `git diff --stat -- tests/setupServer.ts` that the file's line delta after the restore equals its delta before the plant. Adjust the comment at `:32-33` only if it names the old spelling; it does not, so leave it.
- **Report** — append `## Fix round 2` naming the verdict file, the O-1 rewrite before and after, the O-2 assertion before and after, the control's command with both capture paths and their counts, and the rulings on O-3 and R-2 (outside this unit, recorded in the ledger).

## Scope

Owned: `tests/setupServer.test.ts:35`; `tests/setupServer.ts:97-98` for the plant only, restored byte-for-byte; `/home/user/work/evidence/probe-proofs/probe-obj-3-parser-*.txt`; the report. Shared: none. Off-limits: every other line, every other edit the unit made, and the vendored set.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the O-1 sentence before and after; the assertion before and after; the control command with the red count, the green count, and both capture paths; `git diff --stat -- tests/setupServer.ts` before the plant and after the restore; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:setup`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when the planted control does not fail on the strengthened assertion, when the restored run does not pass, when a gate reddens, or when a named site does not read as this brief quotes it. Decide, record, and carry on for an ancillary question: the exact wording of the O-1 sentence.

## Acceptance criteria

1. `sed -n 35p tests/setupServer.test.ts` reads the strengthened assertion; `grep -c 'JSON.parse(buffer.subarray(' tests/setupServer.ts` prints 1.
2. `probe-obj-3-parser-planted-red.txt` shows `npm run test:setup` failing at `tests/setupServer.test.ts:35`; `probe-obj-3-parser-green.txt` shows the same command passing.
3. `grep -n 'cannot be called from a test' /home/user/scaffold/tmp/units/conform/conform-probe-report.md` returns nothing.
4. The gates and `npm run test:setup` exit 0; `git status --short` lists the unit's 14 paths and nothing new.
