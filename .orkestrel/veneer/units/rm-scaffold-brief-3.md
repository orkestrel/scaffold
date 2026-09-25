# Unit RM-SCAFFOLD round 3 — the parser's name, one comment's term, and one TSDoc sentence

Successor to `rm-scaffold-brief-2.md`. What changed: the round-2 audit (`rm-audit-2-verdict.md`) confirmed every claim
and accepted three findings outside the claims, F1, F2, and F3. This round applies each one verbatim and nothing else.

## Role and engine

`builder` on Sonnet, a native Claude subagent reached through the harness's Agent tool, the sole writer in
`/home/user/scaffold-rm`, which holds rounds 1 and 2 uncommitted over `392aa1e0`. The edits are fully specified and
carry no judgment. The harness may name another directory as the primary working directory; start every shell command
with `cd /home/user/scaffold-rm &&` and give every file tool an absolute path under it. Read
`/home/user/scaffold-rm/AGENTS.md`, the rules `/home/user/scaffold-rm/.claude/rules/{names,tests,writing}.md`, and
`/home/user/scaffold/.orkestrel/veneer/units/rm-audit-2-subjective-verdict.md` § Findings outside the claims. No skill
applies.

## Objective

F1, F2, and F3 of the round-2 audit are applied exactly as the following Items write them, and the named gates exit 0.

## Context

**Evidence.** Measured in `/home/user/scaffold-rm` at the round-2 tree:

- `grep -rn readVitestReport --include=*.ts --include=*.md . | grep -v node_modules | grep -v '^./tmp'` returns
  `tests/setupServer.ts` (the TSDoc `@example` and the declaration), `tests/setupServer.test.ts` (the import and three
  calls), and `tests/distribution.test.ts` (the import and two calls).
- The `readVitestReport` TSDoc opens `Reads the test files a Vitest JSON report records.`, and its `@remarks` reads
  `The whole report is refused rather than the malformed entry dropped, so a reader never reports a partial file list as
  the run's. The reader narrows only the structure it walks; every verdict field stays the reporter's value.`
- The `buildReleaseScenarios` TSDoc `@remarks` ends `Each rival rewrites the workspace for its own run, and the caller
  restores the generated text after it.`
- The comment in the case `declares every emitted project factory with the override parameter` in
  `tests/src/core/templates.test.ts` opens `Vitest calls a project row with its own environment record, so a factory
  that declares a parameter receives those fields in the override position.` and contains `so a value carrying the pair
  returns the base in the record's mode and carries none of its other fields.`
- The case in `tests/setupServer.test.ts` `describe('the release-mode fixtures')` is titled `reads every test file a
  Vitest report records, and refuses a text that is not a report`.

Re-take each reading before editing, and stop if one differs.

**Law.** `AGENTS.md`; `.claude/rules/names.md` § Standalone helpers (`read*` returns or throws; `parse*` produces
`T | undefined`); `.claude/rules/writing.md` § Voice and actor.

**Installed primitives.** None bear on a rename.

**Host.** Linux, bash. Put
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin` first on `PATH`.
Other units run suites on this 4-CPU host, so a timeout under load is an observation to report, not to diagnose.

**Measurements.** None beyond the Evidence re-readings.

**Control identifiers.** F1, F2, and F3 are this brief's labels. They name no test.

**Standing conditions.** `tests/config.test.ts` and `guides/scaffold.md` are changed by rounds 1 and 2 and stay as they
are.

## Unknowns

None.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/distribution.test.ts`, and
`tests/src/core/templates.test.ts`, for the edits in Items only. `host.json` if `npm run build` regenerates it.

**Shared (report-only).** None.

**Off-limits.** Every other path, and every other line of the owned files.

**What asserts the state this change ends.** The call sites the Evidence names, all owned.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No git command that writes, no install, and no
`npm run format`. Format with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <files>`.

## Items

1. **F1.** Rename `readVitestReport` to `parseVitestReport` at its declaration, its `@example`, and every import and call
   site the Evidence names. In its TSDoc, replace `Reads the test files a Vitest JSON report records.` with
   `Parses the test files a Vitest JSON report records.` Replace the `@remarks` text with
   `The whole report is refused rather than the malformed entry dropped, so a caller never receives a partial file list
   as the run's. The parser narrows only the structure it walks; every verdict field stays the reporter's value.`
   Retitle the case `reads every test file a Vitest report records, and refuses a text that is not a report` to
   `parses every test file a Vitest report records, and refuses a text that is not a report`.
2. **F2.** In the comment of the case `declares every emitted project factory with the override parameter` in
   `tests/src/core/templates.test.ts`, replace `its own environment record` with `its own invocation record`, and replace
   `so a value carrying the pair returns the base in the record's mode and carries none of its other fields.` with
   `so \`mergeOverride\`, given a value carrying the pair, returns the base in the record's mode and carries none of its
   other fields.` Let oxfmt rewrap nothing but the comment's lines.
3. **F3.** In the `buildReleaseScenarios` TSDoc, replace `Each rival rewrites the workspace for its own run, and the
   caller restores the generated text after it.` with `Each rewriting rival writes its \`files\` for its own run alone,
   and the caller restores the generated text after it; the \`timeout\` rival runs the workspace as generated and differs
   only in its timeout.`

## Execution

Perform the assignment directly and spawn nothing.

1. Re-take the Evidence readings.
2. Apply Items 1 to 3.
3. Run each gate in Acceptance, logged to `tmp/units/rm-3-<gate>.log.txt` with `echo "exit=$?"` appended.

## Output

Write `tmp/units/rm-report-3.md` and return the same text: the Evidence re-readings, each Item's before and after text,
the gate table, `tmp/units/rm-3.diff` (`git diff 392aa1e0`), and `tmp/units/rm-3-status.txt` (`git status --short`).
State no count in prose.

## Deviation contract

Follow § Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. Stop and report when an Evidence reading
differs, when an Item's text does not fit the line it replaces, or when a gate reads red outside a timeout under load.
Nothing in this round is the unit's to settle.

## Acceptance criteria

1. `npm run check` and `npm run lint:check` exit 0, and `npm run format:check` exits 0.
2. `grep -rn readVitestReport --include=*.ts --include=*.md . | grep -v node_modules | grep -v '^./tmp'` returns
   nothing.
3. `npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts -t "the release-mode fixtures"`
   passes.
4. `npx vitest run --config vite.config.ts --no-cache --project src:core tests/src/core/templates.test.ts -t "override parameter"`
   passes.
5. `npm run build` and `npm run test:policy` exit 0.
6. `npm run test:distribution -- -t "fails the release run of a generated distribution proof"` passes.

**Observations, not criteria.** None. The Orchestrator runs the Vue SFC case and the whole `npm test` on the host after
the unit exits.

## Review evidence

The diff and status, the gate logs, and a `checker` read of each Item's text against the diff.
