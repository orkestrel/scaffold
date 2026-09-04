# Unit conform-toolbox fix round 1 — the version numeral, the hyphenated tallies, the missing greens, the `fake` binding, the factory guard, the description, the record

## Role and engine

`builder` on Claude Sonnet (native Claude Code subagent; a fully specified record-and-prose unit with one added test case), the sole writer in `/home/user/fleet/toolbox`, also owning the unit's report file `/home/user/scaffold/tmp/units/conform/conform-toolbox-report.md`. Perform the assignment directly and spawn nothing.

## Objective

Close round 1: the objective lane's refutation of claim 4 with its findings O1 and O2 and referrals R1, R2, R4 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l56/toolbox-objective-r1.md`) and the Grok checker's referral on the `0.0.7` numeral (`/home/user/scaffold/.orkestrel/campaign/conform/units/l56/toolbox-r1-checker-grok.result.md`, the same site). Rulings by the Orchestrator: R1 — toolbox-obj-5's intent reaches the moved bridge suite, so its `fake` bindings become `timer`; R2 — adopt the factory-level guard; R3 — the `via` and `e.g.` sites outside every row are a prose follow-on unit after this landing, no edit here; R4 — the description follows the renamed axis.

## Context

`/home/user/scaffold/AGENTS.md` § Writing (never state a count; a tally in a describe title is a count) and § TTTDD (the failing proof's command runs green after the fix, the same command); `/home/user/scaffold/.claude/rules/writing.md` § Claims and time (a version numeral dates a claim; a dependency's behaviour is described without its release number); `/home/user/scaffold/.claude/rules/quality.md` § Instruments (a pattern-coverage gap is a defect in the instrument; the instrument that settled a claim becomes a test); `/home/user/scaffold/.claude/rules/tests.md`.

Standing conditions: the checkout carries the conform-toolbox unit's uncommitted edits (27 paths under `git status --short`; the evidence is `/home/user/work/evidence/conform-toolbox.diff` and `.status`). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits, and so is every line of `src/**`, `tests/**`, and `guides/**` this brief does not name. `node_modules` is the installed development closure; never run `npm install`, `npm ci`, or any command that rewrites it or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file> [-t <name>]`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rniE <pattern> <paths>`, `ls`, `cat`, `sed -n`. Capture files go under `/home/user/work/evidence/toolbox-proofs/`.

## Sites and edits

- **toolbox-subj-3 (claim 4) and the checker's referral** — `src/core/factories.ts:1452`: "`@orkestrel/contract` 0.0.7's `explain` mirrors the normalizing" → "`@orkestrel/contract`'s `explain` mirrors the normalizing" (rewrap the TSDoc paragraph at the file's width). Then record the sweep `0\.0\.[0-9]` over `src`, `tests` (minus the vendored set), `guides/toolbox.md`, `guides/README.md`, and `README.md` under the report's § Sweeps with every hit ruled (a `package.json` range is not in those paths; a version in a fixture is data).
- **toolbox-subj-8 (claim 4)** — `tests/src/core/shapers.test.ts:263` `'workspaceToolShape — the 13-op discriminated union'` → `'workspaceToolShape — the operation-discriminated union'`; `:382` `'databaseToolShape — the 11-op discriminated union'` → `'databaseToolShape — the operation-discriminated union'`; `:583` `'relationToolShape — the 5-op discriminated union'` → `'relationToolShape — the operation-discriminated union'`. Add `[0-9]+-(op|arm|operation|element|member|tool)s?\b` to the report's recorded tally pattern (`:130`), re-run it over the same paths, and record every hit with its ruling.
- **Claim 4, the missing greens** — after every edit in this brief, re-run each row's own red command and capture its green under the row's name: `toolbox-obj-4-green.txt` (`--project src:core tests/src/core/factories.test.ts`), `toolbox-obj-6-green.txt` (`--project src:core tests/src/core/validators.test.ts`, replacing the file that holds the `src:core`-wide reading), `toolbox-obj-8-green.txt` (`--project src:core tests/src/core/factories.test.ts -t "many executes with identical args return identical results"`). Update the proof table rows at the report's `:111`, `:113`, `:115` to cite those files and their readings.
- **R1** — `tests/src/server/terminals/TerminalBridge.test.ts`: every `fake` binding is `timer`: `const fake = createTestTimer()` at `:68`, `:225`, `:289`, `:384` → `const timer = createTestTimer()`, and every `fake.` reference in those blocks → `timer.` (`timer: fake.timer` → `timer: timer.timer`; `fake.fire(` → `timer.fire(`; `fake.armed` → `timer.armed`). Afterwards `grep -n '\bfake\b' tests/src/server/terminals/TerminalBridge.test.ts` returns nothing.
- **R2** — `tests/src/core/factories.test.ts`, after the case at `:2898-2907` (`a small \`limit\` option reports truncated:true and count == the effective limit`): add `it('a negative \`limit\` option floors the effective limit at 0 for find and links', ...)` that seeds the same three accounts, constructs `createRelationTool({ managers: { shop: manager }, limit: -1 })`, executes `'find'` on `accounts` with `include: []` and asserts `count` is 0, then executes the `'links'` operation the way the file's nearest `'links'` case does and asserts its reported count is 0. Run the file's project red first by replacing the `resolveLimit(REQUEST, CAP)` call at `src/core/factories.ts:1371` with the pre-fix form `Math.min(REQUEST ?? CAP, CAP)`, where REQUEST and CAP are that call's own two arguments (the leaf floors a negative at 0; `Math.min` of `-1` and `-1` is `-1`, and a `slice(0, -1)` drops one row instead of every row), capture `toolbox-obj-2-factory-red.txt`, restore the line exactly, and capture `toolbox-obj-2-factory-green.txt`.
- **R4** — `src/core/shapers.ts:404`: `description: 'Column name to its type.'` → `description: 'Column name to its primitive or its { primitive, optional } spec.'`.
- **O2** — the report's `:49`: "all 8 call sites now read `captureError(`" → "every call site now reads `captureError(`".
- **O1** — the report's `:137`: replace the order sentence with what the captures show (the `-final` gate captures were written after `gate-test-final.txt`; the landing chain takes the `AGENTS.md` order and reads each exit code), and add the exit code beside each gate's capture in this round by running each gate and writing `exit=<code>` as the capture's last line: `gate-format-check-fix1.txt`, `gate-lint-check-fix1.txt`, `gate-check-fix1.txt`, run in that order after your edits (no build, no full test: those are the landing's).
- **Report** — append `## Fix round 1` naming both lane files, each edit with `file:line` before and after, the captures with their readings, the recorded sweeps, and the rulings R1 to R4 as this brief states them.

## Scope

Owned: the lines named under Sites; the new test case in `tests/src/core/factories.test.ts`; `tests/src/server/terminals/TerminalBridge.test.ts` (the `fake` → `timer` renames only); `src/core/factories.ts:1371` (the plant, restored) and `:1452`; `src/core/shapers.ts:404`; `tests/src/core/shapers.test.ts:263`, `:382`, `:583`; the report; `/home/user/work/evidence/toolbox-proofs/*-fix1.txt`, `toolbox-obj-4-green.txt`, `toolbox-obj-6-green.txt`, `toolbox-obj-8-green.txt`, `toolbox-obj-2-factory-*.txt`. Shared: none. Off-limits: every other line, every other edit the unit made, `guides/**`, and the vendored set.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each edit with `file:line` before and after; each capture file with its failed and passed readings and exit code; the recorded sweeps with their patterns, paths, hits, and rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped vitest runs. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens after your edits, when a named site does not read as this brief quotes it, or when the R2 case cannot be written from the file's existing fixtures. Decide, record, and carry on for an ancillary question: the R2 case's exact title, the rewrap of the TSDoc paragraph.

## Acceptance criteria

1. `grep -n '0\.0\.7' src/core/factories.ts` returns nothing; `grep -nE '[0-9]+-op' tests/src/core/shapers.test.ts` returns nothing; `grep -n '\bfake\b' tests/src/server/terminals/TerminalBridge.test.ts` returns nothing; `grep -n "Column name to its type" src/core/shapers.ts` returns nothing.
2. `toolbox-obj-4-green.txt`, `toolbox-obj-6-green.txt`, `toolbox-obj-8-green.txt`, and `toolbox-obj-2-factory-green.txt` each report every test passed under the row's own command, and `toolbox-obj-2-factory-red.txt` reports at least one failed test; `git diff --stat src/core/factories.ts` shows only the `:1452` edit.
3. `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped runs exit 0; `git status --short` lists the unit's 27 paths and nothing else new.
