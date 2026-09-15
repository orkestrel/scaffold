# Unit A2-fix-r2 — the second fix round on the relay (audit round A2-fix-R1)

The Orchestrator fills § Measurements at dispatch, after unit A3 lands.

## Role and engine

`implementer` on Claude Opus 5, native, with Read, Grep, Glob, Edit, Write, and Bash. Perform the
assignment directly and spawn nothing. You are the sole writer in
`C:\Users\mikes\WebstormProjects\agent` for the life of this unit. The fix's auditor is the Astra
`analyst` (objective lane) plus a `checker` and the Orchestrator's mutation probes.

## Objective

Close the reviewer's claim-4 ruling and findings F1–F6 of audit round A2-fix-R1 on the relay,
each with a failing proof where behaviour changes, without widening any refusal into a regression,
and finish with every scoped gate green and the guide in parity.

## Context

**Record.** `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\campaign\a2-fix-audit-subjective.md`
(the verdict: read the whole file — the rulings name lines and the required change), the
Orchestrator's mutation record `a2-fix-probes.md` (its F11 row proves the clone alone strips a
synthetic serializer), `b1-receipt.md`, and `design-reconciliation.md` § "Audit round A2-fix-R1",
all in that folder. The ruled contract: `plan.md` § "The ruled contract" there.

**Law.** `C:\Users\mikes\WebstormProjects\scaffold\AGENTS.md`;
`C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\patterns.md` § Foreign contracts (own a
foreign value at arrival, validate the owned copy, read the foreign object exactly once),
`names.md` § General vocabulary (never alternate `abort`/`cancel`), `typescript.md` (TSDoc,
`@throws`), `tests.md` § Expensive proofs, `documentation.md` (parity: a titled `@example` equals
the guide fence under that heading), `writing.md`.

**Host.** Windows 11, Git Bash. `node_modules` populated. Never `npm install`, `git add`,
`commit`, `stash`, `checkout`, `restore`, `reset`, `clean`, or `git mv`. Never edit a vendored file.

**Measurements.** The agent HEAD is `c052711` (A3 and A3-fix committed 2026-09-14), tree clean
apart from `node_modules`, where the packed `@orkestrel/guide` from its commit `9863e77` is
installed (`--no-save`; it admits `export abstract class` in the parity grammar). Gates at
that commit: `format:check`, `lint:check`, `check`, `test:src:core` (23 files, 751 tests),
`test:setup` (54 tests), `test:guides` (green), `build` exit 0. A3 titled two source fences and
mirrored each in `guides/agent.md` under the heading of the same title: `AgentProvider`'s
`@example` is `Writing a provider for a new wire` and `createRelay`'s is `Relaying a browser
provider through your own server`; `createRelayProvider`'s and `RelayProvider`'s fences are
untitled and mirrored nowhere. So R5's consolidation keeps `createRelay`'s fence equal to the
guide fence under its heading (change both together if you change either), and the two short
fences it writes need no guide change.

**Control identifiers.** The labels R1–R9 name the items in this brief; a test is named for what
it proves, never for a label.

## Findings and their carriers

**R1 — the snapshot is the sole mechanism (claim 4).** Delete the callable-`toJSON` refusal in
`RelayProvider.body` (the check over `tools[].parameters` and `options.schema` before cloning).
The owned `cloneJSONValue` snapshot of the validated projection is what the base serializes, for
`arguments`, `parameters`, and `schema` alike, and a foreign object is read once. Restate the two
refusal tests as proofs that a synthetic serializer cannot reach the wire: for a `get` trap
supplying `toJSON` on `parameters`, on `schema`, and on a message's `calls[].arguments`, assert the
body the transport received equals the JSON of the guard's view and that the call did not throw.
Update the class remarks and `body`'s `@throws` so a consumer learns that a custom serializer is
ignored, never consulted, and that the refusal covers a projection the contract rejects or a
snapshot that cannot be taken. Failing first: the three wire-body assertions against the current
code (the current code throws `PROTOCOL` for two of them).

**R2 — the refusal carries its cause (F3).** `body`'s catch passes `{ cause }` into the
`ProviderError` (`ProviderErrorOptions` carries it), and `@throws` states what the boundary
covers. Test, failing first: a projection the contract rejects yields a `ProviderError` whose
`cause` is the thrown value when one was thrown.

**R3 — one guard (F1).** Delete the second `if (this.#signal.aborted) this.#abortProvider()` in
`RelayStream`'s constructor (the one after the listener registration); the first is pinned and
stays. No new test; the existing pre-aborted case holds.

**R4 — one word per concept (F2).** Rename the `#abort` field that holds the bound `#cancel` so
the class carries one term for the inbound cancellation across the field, `#cancel`,
`#abortProvider`, and `#release`; keep every member a single word.

**R5 — one composition, two short fences (F4).** Keep the full browser-and-server composition on
`createRelay`'s `@example`; give `createRelayProvider` and `RelayProvider` each a short fence
showing its own construction and one call, pointing at the composition with `{@link createRelay}`;
annotate the return type of the fences' `connectRelay` declarations so they agree with the
`RelayStream` fence. Parity: where A3 titled any of these fences and mirrored it in
`guides/agent.md`, change the guide fence and its transcription in `tests/guides.test.ts` in the
same edit so `test:guides` stays green; where the guide's relay pattern stands alone, leave the
guide untouched and say so.

**R6 — the boundary's own control (F5).** Restore, in the exact-limit relay refusal test, the
assertion that the encoded body's byte length equals `DEFAULT_RELAY_LIMIT`.

**R7 — a deadline sized for a contended run (F6).** Raise the stalled exact-bound 503 case's
provider deadline from 80 ms to 200 ms, keeping the binding: the transport signal's `aborted`
reads false and the rejection is `ProviderError` with code `HTTP`.

**R8 — the error arm on one line.** In `relayFrameShape`, write the error arm on one line like its
sibling arms.

**R9 — the undocumented hang, documented.** On `RelayStream`'s remarks, one sentence: after an
inbound abort the response body is neither closed nor errored, a server runtime cancels it on
disconnect, and a consumer that aborts the inbound signal must cancel the body rather than keep
reading.

## Scope

**Owned.** `src/core/providers/RelayProvider.ts`, `src/core/RelayStream.ts`,
`src/core/factories.ts` (the two `@example` fences only), `src/core/shapers.ts` (the error arm's
layout only), `tests/src/core/providers/RelayProvider.test.ts`, `tests/src/core/RelayStream.test.ts`,
`tests/src/core/factories.test.ts` (R6 only), `tests/src/core/AgentProvider.test.ts` (R7 only),
`tests/setup.ts` (fixture additions for R1's `arguments` case only), and, for R5's parity only,
`guides/agent.md` and `tests/guides.test.ts`.

**Shared (report-only).** None.

**Off-limits.** `src/core/AgentProvider.ts`, `helpers.ts`, `types.ts`, `constants.ts`,
`contracts.ts`, `errors.ts`, `validators.ts`, `index.ts`, `README.md`, `guides/README.md`,
configuration, the vendored set, `package.json`, `package-lock.json`, `AGENTS.md`, `CLAUDE.md`,
`.claude/**`, `scripts/**`, `dist/**`, `node_modules/**`.

**What asserts the state this change ends.** The two serializer-refusal tests in
`RelayProvider.test.ts` (they invert under R1); any guide fence mirroring a consolidated source
fence (R5); nothing else.

**Tools and limits.** Bash for the read-only scripts (`format:check`, `lint:check`, `check`,
`test:src:core`, `test:setup`, `test:guides`, `test:probe`); never `lint`, `format`, `build`, or
the whole `test` chain; never install, commit, or read a credential.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Write the report to `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\a2-fix-r2-report.md` and
return the same text: `Touched files` with `git diff --stat`; `Red then green` per item R1, R2,
R6, R7 (exact command, failing count, passing count); `Prose` for R5 and R9 (the doc blocks
changed and whether the guide changed); `Scoped validation`; `Observations`; `Deviation`;
`Status` (`git status --porcelain` verbatim).

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one short hypothesis — when
an item needs a file outside Owned or would change a behaviour the ruled contract fixes. Decide,
record, and carry on from test naming and ordering, the field's new name, and the fence wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:src:core`, `npm run test:setup`, and `npm run test:guides` exit 0 with every file
   collected.
3. R1: `grep -n "toJSON" src/core/providers/RelayProvider.ts` returns nothing; the three wire-body
   cases were red and are green.
4. R2: the `cause` case was red and is green.
5. R3: `grep -c "this.#abortProvider()" src/core/RelayStream.ts` counts the constructor's guard
   once (plus the calls in `#cancel` and the pull's error path).
6. R4: `grep -n "#abort\b" src/core/RelayStream.ts` returns nothing.
7. R5: the full composition appears once, on `createRelay`; the other two fences link to it.
8. R6 and R7 as stated; R8 by inspection; R9 present.
9. No `any`, assertion, non-null assertion, suppression, access modifier, parameter property, or
   nested function declaration in the diff.

**Observations, not criteria.** `build` and the whole `test` chain (the Orchestrator's).

## Review evidence

A code change and, where R5 touches it, a document: `git diff --stat` and
`git status --porcelain` in the report; the Orchestrator takes the full diff and runs a mutation
probe on R1 (bypassing the snapshot must redden the wire-body cases).
