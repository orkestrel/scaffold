# Audit round A1-R1 — falsify the `AgentProvider` base landed in `@orkestrel/agent`

## Role and lane

Three blind lanes on this one brief; your launch message names yours:

- **Subjective lane:** `reviewer` on Claude Opus 5, native, read-only (Read, Grep, Glob; no shell).
  The deciding lane: the subject was written by GPT 6 Astra, so Opus is the engine that did not
  write it.
- **Objective lane:** `analyst` on GPT 6 Astra inside `codex exec --sandbox read-only` rooted at
  `C:/Users/mikes/WebstormProjects/agent`. Your own engine wrote this subject; attack it harder for
  that reason. You may run read-only commands: `npm.cmd run test:src:core -- <file> -t '<name>'`,
  `npm.cmd run test:setup`, `npm.cmd run check`, `npm.cmd run lint:check`, `git diff`, `git show`,
  `git log`. You cannot write a probe file; where a claim needs an attack you cannot run, name the
  exact vector — the fixture, the interleaving, the expected observation — under `UNRESOLVED` and
  the Orchestrator runs it before ruling.
- **Mechanical lane:** `checker` on Sonnet, native, read-only.

Perform the assignment directly and spawn nothing. Edit nothing. Do not hedge toward an imagined
consensus; you never see the other lanes.

## Subject

The chain: baseline `337390c` (main, gates GREEN) → unit A1 first run stopped on a deviation (the
brief required wire-shape `Infer` to equal domain types; ruled as assignability; report at
`tmp/units/a1-report.md`) → unit A1 second run landed and the Orchestrator converged lint and
format → commit `cef565d` "feat: add the AgentProvider base, wire contracts, and provider errors".
The unit's report is `tmp/units/a1-report-2.md`; its brief is `tmp/units/a1-brief.md` plus the
successor `tmp/units/a1-brief-2.md`; the ruled design is
`../scaffold/.orkestrel/campaign/design-reconciliation.md` and
`../scaffold/.orkestrel/campaign/plan.md` § "The ruled contract".

## What the round decides

Whether `cef565d` is accepted as the base every provider in the line will extend, and whether unit
A2 (the relay) may build on it. A defect found now costs one fix unit; a defect found after
`@orkestrel/ollama` is rebuilt on it costs the rebuild.

## Already established — do not re-run

Verified by the Orchestrator directly on the host, not taken from the writer's report:
`npm run format:check`, `lint:check`, and `check` exit 0; `npm run build` exits 0 and
`dist/src/core/index.d.ts` carries `AgentProvider`, `ProviderError`, `relayFrameContract`, and
`readChunks`; `npm run test:src:core` 21 files / 674 tests pass; `npm run test:setup` 54 pass;
`npm run test:guides` is red on the rows unit A3 owns (undocumented exports and method tables) and
is out of this round's scope. The working tree is clean at `cef565d`.

## Review evidence

The actual diff: `tmp/units/a1-diff.txt` (`git diff 337390c cef565d`, 2056 lines) and its stat
`../scaffold/tmp/units/a1-diffstat.txt`; the status after commit is empty. The source itself is in
the tree at `cef565d` — read `src/core/AgentProvider.ts`, `src/core/types.ts`, `src/core/errors.ts`,
`src/core/constants.ts`, `src/core/helpers.ts`, `src/core/validators.ts`, `src/core/shapers.ts`,
`src/core/contracts.ts`, `src/core/index.ts`, `tests/setup.ts`, `tests/setup.test.ts`, and
`tests/src/core/{AgentProvider,helpers,validators,shapers,contracts}.test.ts`. The substrate the
claims depend on: the installed `@orkestrel/timeout`, `@orkestrel/contract`, `@orkestrel/tool`
declarations under `node_modules/@orkestrel/*/dist/src/core/index.d.ts`, and
`src/core/Agent.ts:434-500` and `:729-765` (the runtime that consumes a provider).

Law for the mechanical lane and for every rule citation: `../scaffold/AGENTS.md`,
`../scaffold/.claude/rules/{names,typescript,architecture,patterns,tests,quality,documentation}.md`.
The verdict shape is fixed by `../scaffold/.agents/skills/orkestrel-falsify/SKILL.md`
§ "Verdict shape"; the conduct is `../scaffold/.claude/rules/quality.md` § Falsification.

## Numbered falsifiable claims

`CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is
`UNRESOLVED`, not `CONFIRMED` — say what would settle it. A claim whose only evidence is the
writer's report is `UNRESOLVED`.

1. **Contract fidelity.** The additions to `src/core/types.ts` equal the ruled contract in
   `plan.md` § "The ruled contract" member for member (names, optionality, types), every member is
   `readonly`, and the diff contains no `any`, no `as` other than `as const` on a literal field,
   no `!`, no suppression directive, no `public`/`protected`/`private`, and no parameter property.
2. **Seam ownership.** A concrete provider fills only `name`, `frame`, `body`, `read`, and
   `finish`; the base owns the id, `format`, the deadline and `AbortSignal.any` fold, the bound
   default transport, the raced `headers` hook, the JSON POST to `url + path`, the bounded non-OK
   read, the null-body refusal, decoding, framing, `read` folding, splitting, `strict`, result
   assembly, partial-on-abort, and cleanup. Nothing a subclass must do is missing from the seams,
   and nothing the base does depends on a subclass override of `generate` or `stream`.
3. **Cancellation is total.** A cancel of the caller's signal or of the deadline at any point —
   before the request, while the `headers` hook is pending, while `fetch` is pending, while body
   bytes are awaited, between two records, and between the content and thinking deltas of one
   record — surfaces to the caller as `ProviderAbortError` whose `partial` carries every content
   delta already yielded (joined), the thinking so far, the tools so far, and the last usage; and
   afterwards the timeout is cleared, the reader is cancelled, and no abort listener remains.
   Attack the identity test in the catch (`error === combined.reason`): a transport that rejects
   with its own `AbortError` `DOMException` when its signal aborts, rather than with
   `signal.reason`, is a legitimate `fetch` implementation.
4. **Remote abort passes through.** A `ProviderAbortError` thrown by `read` while the local
   combined signal is not aborted propagates unchanged with its own partial; the base neither
   re-wraps it nor swallows it, and still clears the timeout and cancels the reader.
5. **Deadline hygiene.** The `Timeout` is cleared on every exit: success, `strict` failure,
   non-OK response, `headers` hook rejection, transport rejection, `read` throw, early `return()`
   on the generator after the first delta, and abort. A recorded transport's signal stays
   unaborted after the deadline would have fired on a completed call.
6. **Bounded error read.** On a non-OK status at most `MAX_ERROR_BODY_LENGTH` bytes are pulled
   from the error body before the stream is cancelled; the thrown `ProviderError` has code `HTTP`,
   the status, and the excerpt in its message; a body that throws mid-read yields code `HTTP`, the
   status, `(error body unavailable)`, and the `cause`; a null error body yields an empty excerpt.
7. **Framing and end of input.** A record split across two chunks is reassembled by the
   parser; a multi-byte UTF-8 character split across two chunks decodes correctly; `finish(parser)`
   records are folded after the last chunk; the splitter's held tail is yielded as the final
   content delta; `parser.clear()` runs even when `read` throws.
8. **Think splitting.** With `split: true`, an in-content `<think>…</think>` span never appears in
   a yielded content delta and lands in `result.thinking`; the qwen3 implicit-open case (a bare
   `</think>` with no open) yields the documented transient over-report while the returned
   `content` is clean; with `split: false`, a literal `<think>` passes verbatim through both the
   deltas and the result.
9. **Result semantics.** An increment carrying `result` ends the stream returning exactly that
   object with no re-assembly and no double count, and the remaining body is cancelled; with
   `strict: true` and no `result` by end of input the base throws `ProviderError` with code
   `PROTOCOL`; a present `usage` replaces the running usage and an absent one keeps it; tools
   accumulate in record order.
10. **`generate` is the drained stream.** `generate` deep-equals a drained `stream` on the same
    input, calls no wire seam twice for one record, and rejects with the same error the stream
    would throw.
11. **Concurrency isolation.** Two concurrent `stream` calls on one instance share no parser,
    splitter, timeout, or accumulator; interleaving their records never leaks a delta or a tool
    across calls.
12. **Transport binding and headers.** With no `fetch` option the global `fetch` is invoked with
    `globalThis` as its receiver; with a `fetch` option the option receives `url + path`, method
    `POST`, the merged headers, the stringified body, and the combined signal; the `headers` hook's
    entries merge over `Content-Type: application/json` and may replace it only by returning a
    `Content-Type` entry; a hook that never resolves rejects with the deadline's reason and leaves
    no listener.
13. **`readText` and `readChunks`.** `readText` stops at the byte limit (a partial trailing
    character included), cancels the remainder, releases the lock, and returns what it decoded; an
    omitted limit reads to completion; `readChunks` yields decoded chunks with a final flush and
    releases the stream on normal completion, on a consumer `return()`, and on a throw; neither
    throws when cancellation itself fails.
14. **Shapes and contracts.** Each wire shape's `Infer` is assignable to its domain type
    (`Message`, `ProviderRequest`, `ProviderResult`, `RelayFrame`) and the assertion is typechecked
    by `npm run check`; `parseJSONAs(JSON.stringify(v), contract.is)` returns a deep-equal value for
    a valid `v`; `contract.explain` names the path of a malformed field; the wire refuses a
    function-valued `arguments`; `caller` is refused by the guard and dropped by the parser as the
    shape's TSDoc states.
15. **`isMessage`.** It rejects a role outside the `MessageRole` union and a non-string image
    element, accepts a message whose `calls[0].arguments` holds a function value, accepts every
    value the compiled message contract accepts, and returns `false` rather than throwing on a
    throwing getter or a revoked proxy.
16. **`joinThinking` widening is behaviour-preserving.** No existing caller in `src/core/Agent.ts`
    passes an empty string on either side, and no pre-existing test expectation changed except the
    lenient-role assertion the `isMessage` repair reversed.
17. **Placement and kind purity.** `src/core/AgentProvider.ts` holds imports and one class, no
    module-scope declaration, no nested function declaration or assignment (an anonymous callback
    passed directly as an argument is allowed); `shapers.ts` holds only `*Shape` values;
    `contracts.ts` holds only compiled contracts; every new export is reachable from
    `src/core/index.ts`; TSDoc first sentences are third-person `-s` verbs that do not repeat the
    symbol's name; no dependency's symbol is re-exported.
18. **Test adequacy.** Every new test file is collected by the `src:core` or `setup` project;
    each red-then-green record in `tmp/units/a1-report-2.md` names a test that exists and that
    would fail if the guarded line were reverted (the bounded read, the hook race, the
    between-channels cancel, the `isMessage` cases, the `joinThinking` case); no `.skip`, `.todo`,
    conditional skip, or retry was added; no assertion re-derives its expectation from the code
    under test.
19. **The design ruling holds in the artifact.** `generate` does not send a non-stream request
    and no subclass hook exists for one; there is no public `request` member; `body` returns
    `object` for the reason the reconciliation records; `split`, `strict`, `url`, and `path` are
    constructor input and `name`, `frame`, `body`, `read`, `finish` are abstract members — the
    reconciliation's row 1 shape, not the rejected wire-object shape.

## Unknowns

- Whether Node 24's `fetch` and `pipeThrough` reject with `signal.reason` itself on abort in every
  path (claim 3). The Orchestrator has not measured it; a lane that can run a probe reports the
  reading, a lane that cannot names the vector.
- Whether the `Timeout` from `@orkestrel/timeout` aborts its signal with a reason object that
  survives identity comparison after `AbortSignal.any` (claim 3, claim 5).

## Threshold

A substantiated finding is worth more than a clean pass: the alternative is `@orkestrel/ollama`
rebuilt on a defective base and the defect reaching every consumer of both packages. An
unsubstantiated attack is not a finding; name it under "Attacked and held" or as an `UNRESOLVED`
vector for the Orchestrator.

## Output

Return exactly the `orkestrel-falsify` verdict shape: `Lane:` first; numbered verdicts 1–19 in
order, each `CONFIRMED` (with the attack that failed), `BROKEN` (with the exact input, state, or
interleaving and the smallest correct fix), or `UNRESOLVED` (with what would settle it); findings
fitting no claim, substantiated to the `BROKEN` standard; "Attacked and held"; and one terminal
line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`.
No process diary. The objective lane returns it as the exec's final message; the native lanes
return it as their final text.
