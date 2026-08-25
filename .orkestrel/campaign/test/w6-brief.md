# Unit W6 — test guide node fences, totality guard, directional word

## Role and engine

`implementer` on Claude Opus 5, native subagent.

## Objective

Execute every Node-runnable residue fence directly in `tests/guides.test.ts`, rebuild the
presence guard as a totality guard, and fix the guide's directional word, in
`/home/user/orkestrel/test`.

## Context

**Evidence.** The Node-runnable residue, heading lines in `guides/test.md`: the throw-capture
fence's `SyntaxError` and thrown-`undefined` claims (:1363); "Wait for a named condition"'s
`retryUntil` halves (:1469, fences at :1490 and :1526); "Copy a JSON value" (:1544); "Prove a
guard is total" (:1568); "Prove a wire fixpoint" (:1618); "Read a source inventory" (:1636);
"Own a temporary directory" (:1676, two fences); "Give everything back in one hook" (:1760);
"Answer a real request on a loopback port" (:1791); "Probe what the host supports" (:1869);
"Refuse an escaping path in your own fixture" (:1932). The guides project runs in Node with the
browser disabled and its setup is `tests/setup.ts`; server helpers import from
`@orkestrel/test/server` inside the fences themselves. The landed transcription pattern and
marker mechanism: `tests/guides.test.ts:160-186`. W5 landed the browser carriers with these
exact marker lines (read them): `tests/src/browser/helpers.test.ts:373`, `:995`, `:1111`,
`:1221`, `:1816`, `:1964`, and `tests/src/browser/factories.test.ts:256`.

The directional word: `guides/test.md:1089` carries `below`; the writing rule replaces it with
`later`.

W5's guide observation, carried to you as an ancillary item: the "Read the tokens and colors a
theme declares" fence's zero-width claim holds only for a box resolving `width` to `auto`; name
the element as inline in that fence's preamble.

**Law.** `AGENTS.md`; the vendored `.claude/rules/tests.md` (Cross-cutting proofs — the guides
project's subject), `documentation.md`, `writing.md`. Guide: `guides/test.md` is the subject.

**The ruling to implement (fixed).**

1. Every Node-runnable residue fence is transcribed and EXECUTED in `tests/guides.test.ts`,
   asserting the values its comments claim. The loopback fence binds `127.0.0.1` on an ephemeral
   port inside the test, per the fixture-server rule.
2. The presence guard becomes a totality guard: it reads every fence-bearing `###` heading in
   `guides/test.md` and asserts set equality between that population and the union of the
   transcribed headings and the routed headings, where the routed set is a data table in
   `tests/setup.ts` mapping each routed heading to its carrier file. A heading added with no
   carrier must fail; a routed heading whose carrier file lacks its marker line must fail.
3. `guides/test.md:1089` reads `later` in place of `below`, and the token-fence preamble names
   the inline element.

**Host.** POSIX bash at `/home/user/orkestrel/test`; loopback listeners work.

**Measurements.** `npm run test:guides` green at HEAD (22 tests).

**Control identifiers.** The guard's mutation control: remove one routed heading from the table,
the guard must fail naming it; restore. A test is named for what it proves.

**Standing conditions.** none.

## Unknowns

Whether the heading-discovery regex over `guides/test.md` needs to exclude fenceless headings —
derive the population from headings that have at least one `ts` fence beneath them before the
next heading, and report the discovered membership against the measured residue list.

## Scope

**Owned.** `tests/guides.test.ts`, `tests/setup.ts` (the routed-heading table only),
`guides/test.md` (the directional word and the token-fence preamble only).

**Shared (report-only).** none.

**Off-limits.** `tests/src/**`, `src/**`, `package.json`.

**What asserts the state this change ends.** The totality guard itself and the guides project.
Owned.

**Tools and limits.** Read, Grep, Glob, Edit, Bash scoped: `npm run test:guides`, scoped lint
and format checks on owned files. No git state changes, no commit.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/orkestrel/test/tmp/units/w6-report.md`: the discovered heading population
against the residue list, the transcribed-versus-routed split as landed, the guard's mutation
control with its failing line, validation. Return the same content as your final message.

## Deviation contract

Stop and report if a fence's claims are false as written when executed (a guide defect to
surface with the exact reading, not to silently fix). The guard's internal shape and the table's
form are yours.

## Acceptance criteria

1. `npm run test:guides` green with every named fence executing.
2. The guard's mutation control reported red at a named line and restored.
3. `guides/test.md:1089` reads `later`; the token-fence preamble names the inline element.

**Observations, not criteria.** The whole `npm test` is the Orchestrator's run after you exit.

## Review evidence

The Orchestrator captures the diff and status after your exit; your report plus that diff is the
audit's subject.
