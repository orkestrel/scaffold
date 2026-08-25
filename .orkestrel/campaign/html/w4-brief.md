# Unit W4 — html entity membership against the vendored WHATWG set

## Role and engine

`sol` on GPT-5.6 Sol, reached as the journaled codex CLI. This brief is read by the bench engine
inside its own CLI.

## Objective

Replace the size-plus-spot membership instrument with set equality against the vendored WHATWG
set, with mutation controls, in `/home/user/orkestrel/html`.

## Context

**Evidence.** The fixture is staged at `tests/src/core/fixtures/entities.json` — the WHATWG
`entities.json` fetched 2026-08-24 from https://html.spec.whatwg.org/entities.json; 2231 names,
2125 semicolon-terminated, and each value carries `codepoints` and `characters`. Its import
under this workspace's own config was probed green (a `probe`-project run read one entry). The
assertions to replace: `tests/src/core/helpers.test.ts:61-63` (`decodes every
semicolon-terminated WHATWG named entity exactly` — `toHaveLength(2_125)`) and `:90-93` (the
entity audit's size guard). `NAMED_ENTITIES` is declared at `src/core/constants.ts:378-2504` as
a frozen record.

**Law.** `AGENTS.md`; the vendored `.claude/rules/tests.md` (never assert an implementation
against itself; membership over totals), `quality.md` § Instruments, `writing.md`,
`documentation.md`. Guide: `guides/html.md` where it states a total about the entity table.

**The ruling to implement (fixed).**

1. `tests/setup.ts` (host-independent) loads the fixture through a static JSON import and
   exports the semicolon-terminated reference subset in a comparable shape (name → characters).
   Record the source URL and the fetch date 2026-08-24 in a comment beside the loader; the
   fixture is fetched bytes — never retype or renormalize an entry.
2. The exhaustive-decode proof asserts set equality between `NAMED_ENTITIES` and the reference
   subset — by name and by value, in a form whose failure names the differing entries rather
   than a total. Both `toHaveLength(2_125)` lines leave; the audit case keeps its `controls` and
   `punctuation` equality assertions and takes its population from the same reference.
3. Mutation controls, run once each against a COPY of the loaded reference inside the test run
   (never against the fixture file): one altered name and one altered value must each fail the
   equality with the differing entry named. Report the failing lines and leave no control in the
   committed state.
4. `guides/html.md`: where the prose states the table's total or the size-guard mechanism, it
   states the reference-set equality instead.

**Host.** POSIX bash at `/home/user/orkestrel/html`, sandbox `workspace-write`, network denied
(the fixture is already on disk). The suites this unit runs are in-process.

**Measurements.** `npm run test:src:core` green at HEAD after the 0.0.52 re-pin (installed
moments ago).

**Control identifiers.** The altered-name and altered-value mutations. Tests are named for what
they prove.

**Standing conditions.** `package.json` and `package-lock.json` are dirty from the wave's
scaffold re-pin — not yours; do not diagnose or revert them. `tmp/` holds bench journals.

## Unknowns

Whether the audit case's population read needs the full record or the reference's key set —
settle from the case's own structure and record it.

## Scope

**Owned.** `tests/setup.ts`, `tests/src/core/helpers.test.ts`,
`tests/src/core/fixtures/entities.json` (present; do not modify), `guides/html.md` (the total's
prose only).

**Off-limits.** `src/**`, `package.json`, `package-lock.json`, `vite.config.ts`.

**What asserts the state this change ends.** The two replaced assertions and `tests/guides.test.ts`
if the guide prose names a mechanism (`npm run test:guides` proves it). Owned.

**Tools and limits.** Your sandboxed shell: `npx tsc --noEmit -p configs/src/tsconfig.core.json`,
scoped lint and format checks, `npm run test:src:core`, `npm run test:guides`. No installs, no
git state changes, no commit.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## Output

Your final message is the report: the reference loader as landed, the equality assertions'
shape, both mutation controls' failing lines, the guide prose change, validation results, and
any claim you could not close. The Orchestrator captures your journal.

## Deviation contract

Stop and report if `NAMED_ENTITIES` and the reference subset genuinely differ (a product defect
to surface with the differing entries, never to patch silently in either direction).

## Acceptance criteria

1. Scoped typecheck green; scoped lint and format green on owned files.
2. `npm run test:src:core` green with the equality in place and both size lines gone.
3. Both mutation controls reported red with the differing entry named, and reverted.
4. `npm run test:guides` green.

**Observations, not criteria.** The whole `npm test` is the Orchestrator's run after you exit.

## Review evidence

The Orchestrator captures the diff and status after your exit; your report plus that diff is the
audit's subject.
