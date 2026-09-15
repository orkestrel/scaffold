# Unit U4l — `@orkestrel/mcp` browser face: the publication failure path is pinned, and the host records hold on any host

Successor to U4k (`.orkestrel/campaign/U4k-mcp-browser-fix-brief.md`; read it, the U4k report
`.orkestrel/campaign/U4k-mcp-browser-report.md`, and the chain first). This file carries the A4h
findings and the Orchestrator's rulings, and wins over any sentence it amends.

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. Your engine wrote the chain;
GPT-6 Astra audits this round with the reviewer and the checker.

## What A4h found

Analyst (`.orkestrel/campaign/A4h-audit-analyst.md`, GPT-6 Astra): claim 1 — the U4k pin covers a
failed registration inside a FOLLOWED change (`#sync`); no test exercises a failed registration
inside a PUBLICATION (`#publish`), so the `finally` prune in that caller, the caller's rejection,
and the protection of a carried name whose reconcile never ran are unpinned; claim 7 — two tests
assert the host's absence of `document.modelContext` unconditionally
(`tests/src/browser/factories.test.ts:1326-1332` `records that this real Chromium page exposes no
WebMCP registry`; `tests/src/browser/validators.test.ts:95-97` `refuses this page, because no
shipping browser exposes the registry`), so on a browser that ships the registry the suite reddens
while feature detection works and the gated native block at `ModelContext.test.ts:1113` runs.
Checker (`A4h-audit-checker.md`): PASS on the mechanical lane. The Orchestrator's probe P18
reproduced U4k carrier 2's red on the host (claim 2; `.orkestrel/campaign/P18-a4h-probe.md`).

## Carriers (close every one; each names its ruling)

1. **The publication failure path is pinned (analyst 1).** In `tests/src/browser/ModelContext.test.ts`
   under `publish — this page registering its tools with the document registry`, pin
   `prunes a failed publication and keeps the names it carries`:
   - publish manager A holding described tools `dropped` and `kept`; read the fixture's `kept`
     registration entry;
   - publish manager B holding `accepted`, `refused`, `kept` IN THAT ORDER (so `kept` sits after
     the refusal and its reconcile never runs), with `fixture.refuse('refused')` armed;
   - assert the publication rejects its caller with the fixture's message
     (`The registry refused to register 'refused'`);
   - assert the registry then holds exactly `accepted` and `kept`: `dropped` released by the
     `finally` prune (a publication prunes across managers), `refused` never registered,
     `accepted` registered before the throw, and `kept` the SAME registration entry the first
     publication made (identity, not only the name) — the carried name whose reconcile never ran
     is protected because `kept` is read from the projections;
   - clear the refusal and publish B again; assert convergence on `accepted`, `kept`, `refused`.
   Red first: mutate `#publish` on a byte copy of `src/browser/ModelContext.ts` to the
   reconcile-then-prune order (the loop, then `this.#prune(projections)`, no `finally`) and read
   the pin red; restore the copy; record the SHA-256 of the file before and after. Name the test
   for what it proves; the brief's identifiers stay in the brief.
2. **The host records hold on any host (analyst 7).** Ruling: a record of a host fact as an
   unconditional assertion is the defect A4 named; the isolated absence cases already prove the
   absence path on any host, and the gated native block at `ModelContext.test.ts:1113` records
   presence where it exists. Replace each host record with the RELATIONSHIP that holds on any
   host and reddens only when the host's shape diverges from what the bridge detects:
   - `factories.test.ts`: `builds a bridge exactly where this page exposes the registry` —
     `createModelContext()` is defined exactly when `'modelContext' in document`; destroy the
     bridge when one was built;
   - `validators.test.ts`: `detects the registry exactly where this page exposes the property` —
     `isWebMCPDocument(document)` equals `'modelContext' in document`.
   Keep the isolated absence cases (`reports undefined for a document exposing no registry`; the
   `createHTMLDocument()` cases in `validators.test.ts`) unchanged. Rewrite the comment in the
   factories record so it states what the relationship guards (a host that ships the property
   under a shape the validator refuses reddens here rather than skipping the native block
   silently) and where the dated host reading lives (the `## WebMCP parity` matrix in
   `guides/mcp.md`). Re-read the native block's comment at `ModelContext.test.ts:1108-1112` and
   keep its sentence about the absence assertion exact against what `factories.test.ts` holds
   after this change (the isolated case is the ordinary assertion it names). No `describe.runIf`,
   `skipIf`, or conditional test body anywhere in this carrier. Prove each relational assertion
   discriminating on a byte copy of its test file by forcing its expected value (record the
   reading; restore; SHA-256 before and after).

## Rulings that stand

Everything U4i, U4j, and U4k landed; the reviewer's R8 (`describeWebMCPTool`'s prefix) stays
carried to a design round; the transport recorder over `MessagePort` frames stays a nonblocking
follow-up; no source file changes in this unit.

## Context, law, host, and bench

As U4k (`.orkestrel/campaign/U4k-mcp-browser-fix-brief.md` → U4j). Load-bearing facts restated:
`AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/typescript.md`, `.claude/rules/writing.md`
in the scaffold checkout govern; `guides/mcp.md` is the spec. The mcp tree is dirty with the whole
U4 chain on checkpoint `b9ff0b9` (27 tracked paths in `git status --short --untracked-files=no`);
leave every one of them as you find it. Windows host: Git Bash for the Bash tool; write any
program to a file and invoke the file (no heredocs, no `node -e`). A scoped run is
`npm run test:src:browser -- tests/src/browser/<file>.test.ts -t "<name>"`; Chromium launches
natively here. The `prove` tool is unreachable; record the mutation readings instead. Run only
scoped Vitest projects and the non-mutating checks; never tree-wide `format` or `lint --fix`.

## Scope

**Owned.** `tests/src/browser/ModelContext.test.ts`, `tests/src/browser/factories.test.ts`,
`tests/src/browser/validators.test.ts`. **Off-limits.** Everything else, including
`src/browser/ModelContext.ts` (the carrier 1 mutation is on a byte copy and is restored;
report the SHA-256 before and after), `tests/fixtures/modelContext.ts` (its `refuse(name)` member
already exists), `guides/mcp.md`.

## Deviation contract

Stop and report (expected, found, evidence, done or not) if: the fixture's `refuse` member does
not throw the message named in carrier 1; the `kept` registration entry is replaced rather than
preserved after the failed publication (that would be a source defect, not a test defect — report
it, do not fix it); a relational assertion in carrier 2 is red on this host as written. Decide,
record, and carry on for wording, comment placement, and helper reuse from `@orkestrel/test`.

## Acceptance criteria

1. `npm run lint:check`, `check`, `format:check` exit 0.
2. `npm run test:src:browser` exit 0 with carrier 1's pin red first against the mutated
   `#publish` (recorded, file restored with matching SHA-256) and carrier 2's discriminating
   readings recorded; every existing pin green.
3. Only owned files changed; `git status --short --untracked-files=no` names the same 27 paths.

## Output

U4k's Output shape: touched files with line pointers, per-carrier closure, failing-first test
names with red and green readings, acceptance readings, baselines, shared-file patches (none
expected), deviation state.
