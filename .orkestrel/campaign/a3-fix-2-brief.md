# Unit A3-fix-2 — the agent guide made true where audit round A3-R1 broke it

The Orchestrator fills § Measurements at dispatch, after unit A2-fix-r2 commits.

## Role and engine

`implementer` on Claude Opus 5, native, with Read, Grep, Glob, Edit, Write, and Bash. Perform the
assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\agent` for the life of this unit. The auditor is the Astra
`analyst` (objective lane, executed probes) plus a `checker`.

## Objective

Close claims 3, 4, 7, and 10 and findings F1–F8 of audit round A3-R1 in `guides/agent.md`, its
transcriptions, the index, and the source doc blocks parity mirrors, so every sentence a consumer
would act on states what the code does, every flagship fence is executed as written, and
`npm run test:guides` stays green.

## Context

**Record.** `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\a3-audit-objective.md`
and `a3-audit-subjective.md` (read both in full: each names lines at `c052711` and the required
change), `design-reconciliation.md` § "Audit round A3-R1", `a2-fix-r2-report.md` (the relay
example consolidation and the three guide sentences it corrected — your baseline already carries
them). Product truth: `src/core/**` at HEAD and its tests.

**Law.** `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md` (§ Writing);
`C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\documentation.md` (parity; "falsify a
prose claim"; a titled `@example` equals the guide fence under that heading), `writing.md`,
`tests.md` § Cross-cutting proofs, `typescript.md` (TSDoc voice).

**Host.** Windows 11, Git Bash. `node_modules` holds the packed `@orkestrel/guide` from its
commit `9863e77` (`--no-save`), which admits `export abstract class`. Never `npm install`,
`git add`, `commit`, `stash`, `checkout`, `restore`, `reset`, `clean`, or `git mv`.

**Measurements.** The agent HEAD is `611e24e` (A2-fix-r2 committed 2026-09-14), tree clean apart
from `node_modules`. Host gates at that commit (`../scaffold/.orkestrel/campaign/a2-fix-r2-gates.log.txt`):
`format:check`, `lint:check`, `check`, `build` exit 0; `test:src:core` 23 files / 753 tests;
`test:setup` 54 tests; `test:guides` 39 tests, all passing. The line numbers the two verdicts
cite are at `c052711`; A2-fix-r2 moved `guides/agent.md` (the relay fence's `connectRelay`
signature and three corrected sentences), `src/core/factories.ts`, and
`src/core/providers/RelayProvider.ts` after that — re-locate each site by its text.

**Rulings you build on.** A guide fence may import a package the consumer installs
(`@orkestrel/ndjson`, `@orkestrel/router`) when the prose beside it says the consumer installs
it; the transcription in `tests/guides.test.ts` may import only what `package.json` declares, so
the parser stays a stand-in and the dispatcher route is not executed through `@orkestrel/router`
in this unit (that declaration is the user's decision, pending). The record type parameter is
`TRecord`, the record type `frame`'s parser emits and `read` consumes, defaulting to
`Readonly<Record<string, unknown>>`.

**Control identifiers.** D1–D17 name the items here; a test is named for what it proves.

## Items

**D1 — the bounded error read (claim 3).** Rewrite the overshoot sentence in the engine clause:
the bound counts bytes handed to the decoder; a source may deliver one chunk larger than the
remaining budget; the read admits that chunk's leading bytes up to the budget and cancels the
remainder, so the decoded excerpt never exceeds `MAX_ERROR_BODY_LENGTH` bytes while the read may
have pulled one whole source chunk from the network. Check it against `readText` and the
single-chunk overshoot test.

**D2 — identity (claim 3).** Where the clause says an id is minted per call, say it is minted at
construction and shared by every call on the instance, with the per-call resources named apart.

**D3 — the `502` refusal (claim 3).** Where the relay clause says every refusal leaves the upstream
unentered, restrict the statement to the authorization and body refusals (`401`, `400`, `413`),
and say that `502` is answered after the provider's `stream` was entered and threw before
returning its iterator.

**D4 — `OVERSIZED_RELAY_STATUS` (claim 3).** Change the source description paragraph in
`src/core/constants.ts` to name the status a relay answers for a request body at or above its
byte budget, and let parity carry it into the Summary cell.

**D5 — the substitution sentence (claim 4).** State every substitution the transcription makes:
the parser stand-in from the test infrastructure in place of `@orkestrel/ndjson`, and the handler
driven directly in place of the dispatcher route; drop "equivalent" and say what the stand-in does
differently (the published parser skips a malformed line; the stand-in throws).

**D6 — the route facts (claim 4).** In the relay transcription, assert what the fence's route
declares against what the browser side sends: the request the handler receives has method `POST`
and a URL whose pathname equals the fence's route path. Assert it from the `Request` the
transcription's `fetch` receives, not from prose.

**D7 — the engine-configuration fence (claim 4).** Transcribe and execute the fence in § The HTTP
provider engine that shows the engine's configuration (`timeout`, `fetch`, `headers`, `format`),
asserting the values its comments claim; after D14 it declares its ambient values.

**D8 — prose hits (claim 7).** Fix the token-noun slips at `README.md` line 12 and
`guides/README.md` line 11 as the analyst names them, and rewrite the count "One guide" in
`guides/README.md` so no growable set is counted.

**D9 — the relay pattern's shape (claim 10, F5).** Split the Patterns fence into a server half and
a browser half under two sub-headings ("The server", "The browser"), each a fence a reader copies
into that process: the server half mounts `createRelay` on the `@orkestrel/router` dispatcher
and states in prose the adapter a server runtime supplies — turn the runtime's request into a
`Request`, hand the dispatcher's `Response` back, and abort the inbound signal when the client
disconnects — naming `@orkestrel/server` as the package that does it in this line; the browser
half is `createRelayProvider({ url, parser, headers })` with real `fetch`. Keep parity: the
`createRelay` source `@example` is titled and must equal the guide fence under its heading — give
the server half that title on the source example and the guide sub-heading, and either title the
browser half on `createRelayProvider`'s example with the browser sub-heading's title or leave that
half untitled on both sides. Transcribe both halves in `tests/guides.test.ts`: the server half
driven through the handler with D6's route assertions, the browser half through a `fetch` that
delivers a scripted relay body.

**D10 — the record type parameter (claim 10).** In § The HTTP provider engine, one sentence
naming `TRecord`, what it ranges over, and its default; beside the subclass fence, one sentence
saying why that fence writes `AgentProvider<string>`.

**D11 — the abstract sentence (F1).** The sentence saying `AgentProvider` is documented through
its contract and carries no Surface row becomes: `AgentProvider` is `abstract`; the members a
subclass fills are listed under `## Methods`.

**D12 — constant values (F2).** Add each value to the source description paragraphs of the ten
constants A1 and A2 added (`DEFAULT_PROVIDER_TIMEOUT`, `MAX_ERROR_BODY_LENGTH`,
`DEFAULT_RELAY_LIMIT`, `RELAY_CONTENT_TYPE`, `RELAY_PROVIDER_MESSAGE`, and the four statuses,
plus `UPSTREAM_RELAY_STATUS`), in the form the older constant rows use, and let parity carry them.

**D13 — status summaries (F3).** Rewrite the four status constants' description paragraphs in the
"Names the status …" form.

**D14 — the engine fence's identifiers (F4).** Add the `declare` lines for `token`, `messages`, and
`abort` in the form the guide's other fences use.

**D15 — the receipt citation (F6).** Replace "the Chromium receipt this campaign records" with what
a reader can check: the browser and version (Chrome 148) and what was driven (the built core
entry and its `@orkestrel` closure loading as ES modules; a browser-side `RelayProvider`
round-tripping, cancelling with a partial, and receiving a refused token as `ProviderError`
`HTTP` 401).

**D16 — the wire-contract fence (F7).** Make the fence do what its introduction promises — show
`parse` projecting a record, or drop `parse` from the sentence — and replace the discarded
generator call with a call whose result is used.

**D17 — the concept cell (F8).** Backtick the class names in `guides/README.md`'s concept cell.

## Scope

**Owned.** `guides/agent.md`, `guides/README.md`, `README.md`, `tests/guides.test.ts`,
`src/core/constants.ts` (description paragraphs of the named constants only),
`src/core/factories.ts` and `src/core/providers/RelayProvider.ts` (the titled `@example` fences
and their titles only, for D9's parity), `tests/setup.ts` (additions only, if a transcription
needs a fixture the file lacks; report it).

**Shared (report-only).** None.

**Off-limits.** Every other `src/**` and `tests/**` file, `package.json`, `package-lock.json`,
configuration, the vendored set, `AGENTS.md`, `CLAUDE.md`, `.claude/**`, `scripts/**`, `dist/**`,
`node_modules/**`, the mirrored dependency guides.

**What asserts the state this change ends.** `tests/guides.test.ts` (yours).

**Tools and limits.** Bash for `format:check`, `lint:check`, `check`, `test:guides`,
`test:src:core`, `test:probe`; never `lint`, `format`, `build`, or the whole `test` chain; never
install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a3-fix-2-report.md` and
return the same text: `Touched files` with `git diff --stat`; per item D1–D17, the change in one
line each; `Fences` (each transcription and the assertion it carries); `Scoped validation` with
counts; `Observations`; `Deviation`; `Status` (`git status --porcelain` verbatim).

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when a
fence's claimed value does not match what the code returns (a code defect, not a prose fix), when a
Summary cannot satisfy both parity and the writing rules, or when a file outside Owned must
change. Decide, record, and carry on from wording, sub-heading names, and the fences' variable
names.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:guides` exits 0 and `npm run test:src:core` stays at its prior count.
3. D1–D4 and D11: `grep -n "admitted whole\|per call\|carries no Surface row\|exceeds its byte budget" guides/agent.md src/core/constants.ts`
   returns nothing.
4. D5–D7, D9: the relay transcription asserts method and pathname; the engine-configuration fence
   and both relay halves are transcribed and executed; the substitution sentence names both
   substitutions without "equivalent".
5. D8, D12–D17 as stated, by inspection.
6. No banned term from `writing.md` § Substitutions and no count of a growable set in the
   touched prose.

## Review evidence

A document and a code change: `git diff --stat` and `git status --porcelain` in the report; the
Orchestrator takes the full diff; the Astra analyst re-runs its probes against the new sentences.
