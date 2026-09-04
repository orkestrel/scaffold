# Unit conform-worker fix round 4 — the added `(§8)`, the `legacy` comment, the report's guide pointers, the strip-types sentence

## Role and engine

`implementer` on Claude Opus 5 (native Claude Code subagent; the Sol bench is dark on the Cursor account's API-model usage limit, recorded in the campaign ledger), the sole writer in `/home/user/fleet/worker`, also owning the unit's report file `/home/user/scaffold/tmp/units/conform/conform-worker-report.md`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-4 objective lane's findings O1 to O4 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/worker-objective-r4.md`; the round-4 checker passed every claim). The referrals are ruled: R1, the landing run is the Orchestrator's full gate chain; R2, the Orchestrator regenerates the evidence after this round; R3, the Orchestrator records the pre-existing bare `§` citations as a successor row. None of the three is this unit's work.

## Context

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Claims and time (claim only what the reader can check) and § Code tokens, references, and links; `/home/user/scaffold/.claude/rules/typescript.md` § TSDoc; `/home/user/scaffold/.claude/rules/documentation.md` § Parity.

Standing conditions: the checkout carries the conform-worker unit's uncommitted edits (28 paths under `git status --short`). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits, and so is every line of `src/**`, `tests/**`, and `guides/**` this brief does not name. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. The host runs Node 22.22.2, which strips types unflagged, so no run on this host can settle what an earlier Node version does. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/handlers.test.ts`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rnE <pattern> <paths>`, `ls`, `cat`, `sed -n`, `node --version`.

## Sites and edits

- **O1** — `src/server/types.ts:76`: delete the ` (§8)` parenthetical, so the line reads `` * - `on` — the reserved {@link EmitterHooks} key: initial listeners for the worker's ``. Touch no other `§` site: the pre-existing ones at `src/core/types.ts:21,62`, `src/core/factories.ts:15`, `src/core/Worker.ts:28,36,50`, and `tests/src/server/handlers.test.ts:14` belong to a successor brief.
- **O2** — `src/server/handlers.ts:85`: delete `legacy or`, so the comment states the condition the code at `:87` tests: a malformed envelope without a string `job`, or without an `input` at all, fails closed with no reply.
- **O3** — the report: re-derive from the tree every `guides/worker.md` and `guides/README.md` pointer the report carries (the objective lane's table under O3 lists the drifted ones with the report lines `:160`, `:183`, `:198`, `:204`, `:214-216`, `:223`; sweep the whole report for `guides/worker\.md:[0-9]` and `guides/README\.md:[0-9]` and check every hit, including ones the table does not list), and replace the sentence at report `:473` ("Each rewrite holds its file's line count, so every `file:line` pointer elsewhere in this report stays valid.") with the statement of which pointers this round re-derived and from what.
- **O4** — `guides/worker.md:560-562`, ruled by the Orchestrator: state what the configuration does. The Vitest projects supply no flag; the `src:server` and `guides` suites load the raw `.ts` fixtures through Node's unflagged type stripping, so those suites run on Node 22.18+ and Node 23.6+, a narrower floor than the package's `>=22.12.0` engine range in `package.json`. Delete the claim that the `src:server` project supplies `--experimental-strip-types`. Do not claim what the flag would do for the suites on an earlier Node version: no run on this host can check it. Leave `guides/worker.md:246-247` and `src/server/types.ts:58-59` as they are; they state Node's own documented behaviour for a consumer's script, not a claim about this package's test configuration.
- **Report** — append `## Fix round 4` naming the verdict file, each edit with `file:line` before and after, the pointer re-derivation, and the O4 ruling.

## Scope

Owned: `src/server/types.ts:76`; `src/server/handlers.ts:85`; `guides/worker.md:560-562`; the report. Shared: none. Off-limits: every other line, every other edit the unit made, and the vendored set named under Standing conditions.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each edit with `file:line`, before and after; the list of report pointers re-derived (old → new); the O4 sentence as written; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, and the scoped `handlers.test.ts` run. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens or when a named site does not read as this brief quotes it. Decide, record, and carry on for an ancillary question: the exact wording of a rewritten sentence.

## Acceptance criteria

1. `grep -n '§' src/server/types.ts` returns no hit at line 76; `grep -n 'legacy' src/server/handlers.ts` returns nothing.
2. Every `guides/worker.md:N` and `guides/README.md:N` pointer in the report opens on the text it names.
3. `grep -n 'experimental-strip-types' guides/worker.md` returns only line 247 (the consumer-script statement); the fixtures paragraph names the `src:server` and `guides` suites and the Node 22.18+ and 23.6+ floor.
4. The gates and the scoped run exit 0; `git status --short` lists the unit's 28 paths and nothing new.
