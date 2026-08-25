# Unit W5 — test guide browser carriers

## Role and engine

`implementer` on Claude Opus 5, native subagent.

## Objective

Land the browser fence carriers for the residue headings of `guides/test.md`, each with its exact
marker line, in `/home/user/orkestrel/test`.

## Context

**Evidence.** The residue's browser set, with heading lines in `guides/test.md`: "Build and mount
a fixture" (:1952), "Drive an interface the way a person does" (:1987), "Drive a field the
component listens to" (:2018), "Read the tokens and colors a theme declares" (:2101), "Find a
rule in the cascade" (:2129), "Remove an IndexedDB database" (:2157), "Place a capture
portfolio" (:2221). The landed carrier pattern: a marker line of the exact form
`guides/test.md → <section> → "<heading>"` opening the carrier case — see
`tests/src/browser/helpers.test.ts:1398-1399` (`contrast`), `:1416-1417` (`readRing`), and
`tests/src/browser/factories.test.ts:469-470` (`createJournal`). The presence guard in
`tests/guides.test.ts:160-186` asserts named marker lines; a successor unit (W6) rebuilds it as
a totality guard — do NOT edit `tests/guides.test.ts` in this unit beyond nothing at all.

**Law.** `AGENTS.md`; `.claude/rules/tests.md` (Browser tests, Cross-cutting proofs),
`documentation.md`, `writing.md`, `typescript.md`. Skill: none. Guide: `guides/test.md` is the
subject — read each residue fence and transcribe it faithfully.

**Host.** POSIX bash at `/home/user/orkestrel/test`; Playwright Chromium preinstalled; the
browser projects run headless.

**Measurements.** `npm run test:src:browser` green at HEAD (its exact script name: read
`package.json` and use the script that runs the `src:browser` project).

**Control identifiers.** none.

**Standing conditions.** none.

## Unknowns

Which carrier file each heading belongs in — place each beside the helpers or factories its
fence drives, matching the landed pattern; report the placement map.

## Scope

**Owned.** `tests/src/browser/**` (the carrier additions only).

**Shared (report-only).** none.

**Off-limits.** `tests/guides.test.ts`, `guides/test.md`, `tests/setup*.ts`, `src/**`,
`package.json`.

**What asserts the state this change ends.** W6's totality guard (not yet written) will read
these markers; within this unit the carriers' own assertions and the browser project are the
asserting set. Owned.

**Tools and limits.** Read, Grep, Glob, Edit, Bash scoped: the browser project run, scoped lint
and format checks on owned files. No git state changes, no commit.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/orkestrel/test/tmp/units/w5-report.md`: the heading-to-carrier placement map
(exact marker lines as landed), what each carrier executes and asserts from its fence, and the
validation results. Return the same content as your final message.

## Deviation contract

Stop and report if a fence's behavior cannot execute in the browser project as documented (the
fence would be false as written — that is a guide defect to surface, not to silently fix).
Placement and case naming are yours.

## Acceptance criteria

1. Every named heading has exactly one carrier opening with its exact marker line.
2. Each carrier executes its fence's behavior and asserts the values the fence's comments claim
   — a transcription, not a paraphrase.
3. The browser project run is green; scoped lint and format checks on owned files are green.

**Observations, not criteria.** The whole `npm test` chain is the Orchestrator's run later.

## Review evidence

The Orchestrator captures the diff and status after your exit; your report plus that diff is the
audit's subject.
