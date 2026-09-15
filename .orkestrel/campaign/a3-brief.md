# Unit A3 — `@orkestrel/agent` guide, README, and parity for the provider base and the relay

Dispatched 2026-09-14 against the agent commit named under § Measurements.

## Role and engine

`implementer` on Claude Opus 5, native, with Read, Grep, Glob, Edit, Write, and Bash. Perform the
assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\agent` for the life of this unit.

## Objective

Bring `guides/agent.md`, `README.md`, `guides/README.md`, and `tests/guides.test.ts` into parity
with the surface units A1, A1-fix, and A2 landed — every new export documented in the guide's
voice, every changed contract clause rewritten to what the code now does, the two new patterns
written and their flagship fences transcribed and asserted — so `npm run test:guides` is green and
a developer reading the guide can write a provider for a new wire and relay a browser provider
through their own server without opening the source.

## Context

**Design record.** `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\design-reconciliation.md`
(the rulings, including § "Audit round A1-R1", § "Audit round A2-R1", and the A2-fix landing) and
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\plan.md` § "The ruled contract". The
audit lane's guide-facing findings you close: `a1-audit-subjective.md` F2 (the error taxonomy's
documentation) and F4 (the base's example teaches extension) — the TSDoc halves landed in
A1-fix; the guide halves are yours.

**Evidence.** The source you document, first-hand: `src/core/types.ts` (the added provider and
relay declarations), `src/core/AgentProvider.ts`, `src/core/providers/RelayProvider.ts`,
`src/core/RelayStream.ts`, `src/core/factories.ts` (`createRelay`, `createRelayProvider`),
`src/core/errors.ts` (`ProviderError`, `isProviderError`), `src/core/constants.ts`,
`src/core/helpers.ts` (`buildProviderResult`, `readText`, `readChunks`, `joinThinking`),
`src/core/validators.ts` (`isMessage`), `src/core/shapers.ts`, `src/core/contracts.ts`, and
`src/core/index.ts`. The reports: `tmp/units/a1-report-2.md`, `tmp/units/a1-fix-report.md`,
`tmp/units/a1-fix-report-2.md`, `tmp/units/a1-fix-report-3.md`, `tmp/units/a2-report-3.md`,
`tmp/units/a2-fix-report-2.md`. The tests that pin the behaviour you
describe: `tests/src/core/AgentProvider.test.ts`, `tests/src/core/providers/RelayProvider.test.ts`,
`tests/src/core/RelayStream.test.ts`, `tests/src/core/integration.test.ts`,
`tests/src/core/contracts.test.ts`, `tests/src/core/shapers.test.ts`.

**The guide as it stands.** `guides/agent.md` (1215 lines at baseline): § Surface (`:16`) with its
subsections Factories, Classes, Constants, Helpers, Validators, Errors, Types; § Methods (`:588`)
with one table per interface; § Contract (`:801`) with numbered clauses — clause 2 (`:806`) says
"This module defines only the contract — a concrete implementation is a host application's
responsibility", which is now false; clauses 3, 5, and 6 describe the provider boundary as a
contract without an engine; § Patterns (`:844`) opens with "Bounding any provider call"; § Tests
(`:1187`); § See also (`:1203`). `guides/README.md` indexes the concept and directory. `README.md`
carries the pitch that must equal the guide's tagline. `tests/guides.test.ts` drives
`@orkestrel/guide`'s `GuideCommand` with the package's inventory policy and transcribes the
flagship fences (read it before editing; it is authored, not vendored).

**Law.** `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md` (§ Writing binds every sentence);
`C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\documentation.md` (parity, the Surface
`Shape` cell form, Methods tables, guide examples through the published specifier, executed
flagship fences), `writing.md` (voice, substitutions, no counts), `tests.md` (§ Cross-cutting
proofs → `tests/guides.test.ts`), `names.md`, `typescript.md` (TSDoc voice — a Summary cell equals
the doc-block description paragraph). Skill:
`C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-harden-package\SKILL.md`
step 10. Governing guide: `guides/agent.md` itself.

**Host.** Windows 11, Git Bash. `node_modules` populated. Never `npm install`, `git add`,
`commit`, `stash`, `checkout`, `restore`, `reset`, `clean`, or `git mv`. Never edit a vendored file.

**Measurements.** The agent HEAD is `5d288d7` (A1-fix-2 and A2-fix committed 2026-09-14), tree
clean. `npm run test:guides` at that commit: 1 file failed, 3 tests failed and 27 passed; the full
output — every undocumented name, the two declarations without a method table
(`ProviderParserInterface`, `RelayProvider`), and the `isMessage` summary drift — is at
`C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a3-guides-before.log.txt`. The built barrel's
export names, one per line from `dist/src/core/index.d.ts` at that commit, are at
`C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a3-exports.txt`. `npm run test:src:core`
reports 23 files and 751 tests passing.

**Control identifiers.** None.

**Standing conditions.** The API Extractor notice is not a defect. `test:guides` runs in Node
through `node --experimental-strip-types tests/guides.test.ts`.

## Transformation

1. **Surface tables.** Add one row per new export in the correct subsection, its `Shape` cell in
   the form documentation.md fixes and its `Summary` cell equal to the export's TSDoc description
   paragraph (the parity test compares them through `findDrift`; fix drift by editing the guide to
   the source's sentence, never the reverse unless the source sentence breaks the writing rules,
   in which case fix the source TSDoc and say so in the report). Exports to add: every name in
   `a3-exports.txt` that has no Surface row — the parity gate's first failure enumerates them and
   is authoritative; the expected set is at least: `AgentProvider`, `AgentProviderInput`,
   `AgentProviderInterface`, `ProviderOptions`, `ProviderRequest`, `ProviderIncrement`,
   `ProviderParserInterface`, `ProviderError`, `isProviderError`, `ProviderErrorCode`,
   `ProviderErrorOptions`, `DEFAULT_PROVIDER_TIMEOUT`, `MAX_ERROR_BODY_LENGTH`,
   `DEFAULT_RELAY_LIMIT`, `RELAY_CONTENT_TYPE`, `buildProviderResult`, `readText`, `readChunks`,
   the shapes (`toolCallShape`, `messageShape`, `providerRequestShape`, `providerResultShape`,
   `relayFrameShape`), the contracts (`messageContract`, `providerRequestContract`,
   `providerResultContract`, `relayFrameContract`), `RelayProvider`, `RelayProviderOptions`,
   `RelayStream`, `RelayStreamOptions`, `RelayFrame`, `RelayHandler`, `RelayOptions`,
   `createRelay`, `createRelayProvider`, and the relay's constants. Update the `isMessage` and
   `joinThinking` rows to their new descriptions.
2. **Methods tables.** Add `AgentProviderInterface` (its call-signature members: `generate`,
   `stream`, `frame`, `body`, `read`, `finish`), `ProviderParserInterface` (`parse`, `clear`), and
   every other declaration the parity gate reports as declaring members without a method table
   (`RelayProvider` is one, read the log for the rest); `RelayStream` exposes only `response`, a
   data property, so it takes a Surface row and no Methods table unless the gate says otherwise.
3. **Contract clauses.** Rewrite clause 2 so the module defines the contract and the
   host-independent HTTP engine every provider repeats, leaving a vendor's wire to the concrete
   provider; rewrite clauses 3, 5, and 6 to distinguish raw-wire splitting from already-separated
   relay deltas, the base's own deadline from the caller's bound, and a locally recoverable partial
   from a remotely reported one. Add clauses for: the base and its seams (what the base owns, what
   a subclass fills, `split` and `strict`, the cancellation rule that the local cancel wins and a
   remote `ProviderAbortError` passes through, the bounded error read and its documented one-chunk
   overshoot, the reader-owned cancellation); the wire shapes and compiled contracts (JSON
   projections strictly narrower than the domain types, `caller` never crossing a wire, the round
   trip, the wire body as an owned JSON snapshot of what the guard saw); the relay protocol (the
   request body, the frame vocabulary with the error frame as `{ channel: 'error', message }`,
   `authorize` and its obligations — it must not consume the body, and the mechanism performs no
   origin or method check, so an ambient credential needs origin and CSRF middleware in front —
   `413` for a body at or above the limit, `401`, `400` for a missing, unreadable, or rejected
   body, `502` when the provider cannot be called, the fixed error message, abort in both
   directions, what a disconnected client cannot recover, and how a refusal reaches the browser as
   `ProviderError` with code `HTTP`); `ProviderError` and its codes, with the message form
   `provider error: <status>` and its ` - <excerpt>` suffix only when the body carried text.
   State the browser limit honestly: host
   independence is proven by the core scope's typecheck, the bound `fetch` receiver, and the
   Chromium receipt the campaign records, not by a browser test project.
4. **Patterns.** Add "Writing a provider for a new wire" (a minimal subclass fence: `name`,
   `super({ url, path })`, `frame`, `body`, `read`, `finish`) and "Relaying a browser provider
   through your own server" (the browser fence with `createRelayProvider({ url, parser, headers })`
   and the server fence with `createRelay({ provider, authorize })` mounted on an
   `@orkestrel/router` dispatcher). The source `@example` fences on `RelayProvider`,
   `createRelayProvider`, and `createRelay` (rewritten by A2-fix) are the compositions the guide
   teaches: where a guide fence mirrors one, give the source fence and the guide heading the same
   title so parity compares them, and keep them equal. Every fence imports through
   `@orkestrel/agent` and, for the parser, `@orkestrel/ndjson`, never an `@src/*` alias; the
   package declares no dependency on `@orkestrel/ndjson`, so the transcription in
   `tests/guides.test.ts` substitutes the test-infrastructure parser for that import and the
   guide's prose beside the fence states that substitution in one sentence. Keep "Bounding any
   provider call" and note the base arms its own deadline beside it.
5. **Tests section and See also.** List the new test files and what each pins; add
   `@orkestrel/timeout` and `@orkestrel/ndjson` (as the parser a relay browser app supplies) to See
   also where the guide keeps that list.
6. **`tests/guides.test.ts`.** Transcribe each new flagship fence and assert the values its comments
   claim (the subclass fence drives a real `Response` fixture; the relay fences drive
   `createRelay` in process through a `fetch` that calls the handler); keep every existing
   assertion; never weaken the parity gate.
7. **`README.md` and `guides/README.md`.** The pitch equals the guide's tagline; the concept index
   names the new classes beside `Agent`.
8. Run `npm run format:check`, `npm run lint:check`, `npm run test:guides`, and `npm run test:src:core`
   (read-only), and fix only what the guide and parity work broke.

## Unknowns

- Whether `@orkestrel/guide`'s `findDrift` accepts a `Shape` cell for an abstract class row; read
  `guides/agent.md`'s existing class rows and `tests/guides.test.ts` before choosing the cell form,
  and record the ruling.

## Scope

**Owned.** `guides/agent.md`, `guides/README.md`, `README.md`, `tests/guides.test.ts`, TSDoc
description paragraphs and `@example` titles in `src/core/**` only where a Summary cell or a
fence cannot otherwise satisfy parity and the writing rules (report each such edit), and
`tests/setup.ts` for additions only, if the transcription needs a parser stand-in that the file
does not already export (report the addition).

**Shared (report-only).** None.

**Off-limits.** Every other `src/**` and `tests/**` file, `package.json`, `package-lock.json`,
configuration, the vendored set, `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `scripts/**`, `dist/**`,
`node_modules/**`, the mirrored dependency guides under `guides/` other than `README.md` (they are
fetched bytes).

**What asserts the state this change ends.** `tests/guides.test.ts` (yours); nothing else.

**Tools and limits.** Bash for the read-only scripts named in step 8 and `test:probe`; never
`lint`, `format`, `build`, or the whole `test` chain; never install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a3-report.md` and return
the same text: `Touched files` with `git diff --stat`; `Parity` (the `test:guides` failing names
before and the green run after, with counts); `Clauses` (which clause numbers changed or were
added, one line each); `Fences` (each transcribed fence and the assertion it now carries);
`Observations`; `Deviation`; `Status` (`git status --porcelain` verbatim).

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
the parity test rejects a row form you cannot resolve from the existing rows, when a source TSDoc
sentence cannot be made to satisfy both parity and the writing rules, or when a fence's claimed
value does not match what the code returns (that is a code defect, not a prose fix). Decide,
record, and carry on from clause numbering, heading wording, and row ordering.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run test:guides` exits 0: every export has a row, every row resolves, every Summary equals
   its doc-block paragraph, every Methods table matches its interface's call-signature members,
   the README pitch equals the tagline.
3. Clause 2 no longer states that the module defines only the contract; the new clauses named in
   step 3 exist; the two patterns in step 4 exist with executed fences transcribed in
   `tests/guides.test.ts`.
4. `npm run test:src:core` exits 0 (the transcriptions live in the guides project, so this stays
   at its prior count).
5. No sentence in the touched prose contains a banned term from `writing.md` § Substitutions or a
   count of a growable set.

**Observations, not criteria.** `build` and the whole `test` chain (the Orchestrator's).

## Review evidence

A code change and a document: `git diff --stat` and `git status --porcelain` in the report; the
Orchestrator takes the full diff; the auditor reads the guide as a consumer would.
