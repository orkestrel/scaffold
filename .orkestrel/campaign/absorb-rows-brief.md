# Unit ABSORB-ROWS — measure every open ROADMAP row's exact sites

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached as the journaled Cursor CLI. This brief is
read by the bench engine inside its own CLI.

## Objective

Return the measured facts the design round needs for the open non-supervisor rows of
`/home/user/scaffold/ROADMAP.md` § 1, as `file:line` evidence with no raw dumps.

## Context

**Evidence.** The rows are at `/home/user/scaffold/ROADMAP.md:19-78`; read them first. The
repositories sit under `/home/user/orkestrel/<name>` (probe, html, mcp, test, brief, process,
middleware, and the wider fleet) and `/home/user/scaffold`.

**Law.** Read-only reconnaissance; no rule file governs your subject matter beyond accuracy.
Skill: none. Guide or spec: none.

**Host.** POSIX bash, working path `/home/user/scaffold`, full local filesystem read access, no
network needed.

**Measurements.** Take every reading fresh from the trees named; trust no summary.

**Control identifiers.** none.

**Standing conditions.** Every repository tree is committed clean at HEAD of `main`. `tmp/`
directories may be absent; that is healthy.

## Unknowns

The answers themselves. Report each finding with its `file:line` pointer.

## Scope

**Owned.** none — read-only.

**Shared (report-only).** Every file you read.

**Off-limits.** Writing anything anywhere; `.env*`, `.npmrc`, credentials, `CURSOR_API_KEY`.

**What asserts the state this change ends.** none — no change.

**Tools and limits.** Read, grep, glob equivalents only.

## Execution

A bench engine reading this brief inside its own CLI: perform the assignment directly and spawn
nothing.

## Output

For each numbered question, `file:line` pointers plus at most a sentence of reading. Deliver as
your final printed answer.

1. **Setup-project registration.** In `/home/user/scaffold/src/core` (the compiler that emits
   `vite.config.ts` and scripts): where does the emitted root `vite.config.ts` decide whether a
   `setup` project exists — is it computed at runtime from the presence of `tests/setup*.test.ts`,
   or baked per target? Where is `test:setup` emitted into scripts? Cite the compiler sites. Then
   confirm against one adopted target: does `/home/user/orkestrel/probe/vite.config.ts` (which
   has a setup proof) differ from `/home/user/orkestrel/abort/vite.config.ts` (which has none)?
2. **Fleet setup inventory.** For each of: abort agent brief budget csv emitter form html
   interpret markdown msg ndjson pool process program qualifier queue rater reason relation sse
   table template timeout tool workspace — confirm `tests/setup.ts` exists and `tests/setup.test.ts`
   does not, and name what `tests/setup.ts` exports (symbol names only, from its export lines).
   Name any package in the list whose setup module is somewhere else or already proven.
3. **Published surface per package.** From each `package.json` `files` array: what ships for
   test, mcp, brief, html, process, middleware? Cite the arrays.
4. **mcp send site.** `StdioServerTransport.send` in `/home/user/orkestrel/mcp/src`: the exact
   method, the `#output.write` call, any existing error handling on the output stream, and the
   types file rows for the transport's options. Also name every OTHER transport class in mcp with
   a `send` and how each handles write failure, and the existing tests covering `send`.
5. **brief constants site.** The array literal of `Interpretation` member names inside a
   `BriefCompiler` method in `/home/user/orkestrel/brief/src`: exact site, the `Interpretation`
   type's home, what `src/core/constants.ts` currently exports, and every consumer of the
   literal.
6. **process test sites.** In `/home/user/orkestrel/process/tests`: the `ProcessManager.test.ts`
   negative assertion the ROADMAP calls weak (cite the assertion and its comment), and the
   spawning proof sitting in the shared `src:server` project (which file, which project collects
   it, what it spawns).
7. **html sites.** In `/home/user/orkestrel/html`: `tests/setup.ts` exports; the `NAMED_ENTITIES`
   size assertions beside the entity audit and in the exhaustive-decode test (cite each), and how
   `NAMED_ENTITIES` is declared (its source site and shape).
8. **middleware sites.** `/home/user/orkestrel/middleware/tests/setupServer.ts`: the request-tally
   and closed-handle helper exports (cite), the consuming suites, and the current `test` script
   chain in its `package.json`.
9. **test guide residue.** In `/home/user/orkestrel/test/guides/test.md`: for each residue heading
   named at `/home/user/scaffold/ROADMAP.md:30-39`, the heading's line number and the fence
   count under it; the `below` occurrence near the Threat model cross-reference; and in
   `/home/user/orkestrel/test/tests/guides.test.ts` the current transcription pattern (how an
   existing carried fence is marked and asserted, one example site) plus
   `tests/src/browser/` guide-marker examples if any exist.
10. **test:guides planned value.** In `/home/user/scaffold/src/core`: the site where the planned
    `test:guides` script value is composed (the `--no-cache` presence), and the neighbouring
    planned `test:*` values for comparison.

## Deviation contract

Stop and report only an unreadable repository or a missing tree. Everything else is yours to
read and cite.

## Acceptance criteria

1. Every numbered question answered with `file:line` pointers, or named unanswered with the
   reason.
2. No file dumps, no decisions, no design.

## Review evidence

none — read-only distillate; the Orchestrator spot-checks pointers against the trees.
