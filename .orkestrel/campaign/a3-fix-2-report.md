# Unit A3-fix-2 — report

All items D1–D17 landed. Every scoped gate exits 0. One scope decision is recorded under
§ Deviation: splitting the relay example (D9) falsified a `@remarks` sentence on two source
declarations, and I corrected those two sentences inside the owned files rather than shipping
false prose.

## Touched files

- `guides/agent.md` — the bounded-error-read, identity, and `502` clauses corrected; the record
  type parameter introduced; the abstract sentence cut back; the receipt citation made checkable;
  the engine fence given its declarations and a used result; the wire-contract fence made to show
  `parse`; the relay pattern split into a server half and a browser half with the adapter stated;
  the nine new constant Summary cells carrying their values; every `per call` reworded.
- `src/core/constants.ts` — the nine new constants' description paragraphs now state their values,
  and the four status paragraphs are in the `Names the status …` form.
- `src/core/factories.ts` — `createRelay`'s titled `@example` is the server half under the new
  title; `createRelayProvider`'s `@example` is the browser half, titled; its `@remarks` pointer
  corrected.
- `src/core/providers/RelayProvider.ts` — the class `@remarks` pointer corrected.
- `README.md` — the token-noun slip at the relay sentence.
- `guides/README.md` — the concept cell backticked, the paragraph's token-noun slips fixed, and
  the count rewritten.
- `tests/guides.test.ts` — the engine-configuration fence transcribed; the relay transcription
  split into both halves with the route asserted from the request the handler receives; the
  wire-contract transcription extended to `parse`.

`git diff --stat`:

```text
 README.md                           |   6 +-
 guides/README.md                    |  16 ++--
 guides/agent.md                     | 114 +++++++++++++---------
 src/core/constants.ts               |  50 ++++++++--
 src/core/factories.ts               |  63 ++++++------
 src/core/providers/RelayProvider.ts |   4 +-
 tests/guides.test.ts                | 185 ++++++++++++++++++++++++++++++++++--
 7 files changed, 330 insertions(+), 108 deletions(-)
```

`tests/setup.ts` is untouched. `createParser` and `createScriptedProvider` already carried every
fixture the new transcriptions need.

## Items

- **D1** — clause 34's overshoot sentence now reads: the bound counts bytes handed to the decoder,
  the read admits an oversized chunk's leading bytes up to the budget and cancels the remainder, so
  the decoded excerpt never exceeds `MAX_ERROR_BODY_LENGTH` bytes while the read may have pulled one
  whole source chunk from the network. Checked against `readText` (`src/core/helpers.ts:862`,
  `const bytes = step.value.subarray(0, remaining)`) and the single-chunk overshoot case in
  `tests/src/core/AgentProvider.test.ts`.
- **D2** — the same clause now says the instance owns the minted `id`, taken in the constructor and
  returned by every call it serves, and lists the per-call resources under "The base owns, for each
  call:". Checked against `src/core/AgentProvider.ts:87`.
- **D3** — the relay pattern's refusal sentence now restricts the no-entry statement to `401`,
  `400`, and `413`, and says the `502` is answered after `provider.stream` was entered and threw
  before returning its iterator. Checked against `src/core/factories.ts` (the `RelayStream`
  construction inside the `try`) and `src/core/RelayStream.ts:37`.
- **D4** — `OVERSIZED_RELAY_STATUS`'s description now names the status a relay answers for a request
  body at or above its byte budget, and parity carries it into the Summary cell.
- **D5** — the substitution sentence names the parser stand-in and the directly driven handler,
  drops "equivalent", and states the difference: the published parser skips a malformed line, the
  stand-in throws.
- **D6** — the relay transcription records the `Request` its `fetch` receives and asserts
  `request.method` is `POST` and `new URL(request.url).pathname` is `/relay`, the path the server
  half's route declares.
- **D7** — the engine-configuration fence is transcribed and executed: the appended path, the
  awaited `headers` value, the hook and transport sharing one unaborted bound distinct from the
  caller's signal, the `<think>` span routed to `thinking`, and the result assembled from a wire
  that carried no settled record.
- **D8** — `README.md` now reads "compose the `createRelayProvider` and `createRelay` functions";
  `guides/README.md` names the classes and the function after their tokens, and "One guide covers
  them because they share one module directory and one contract" became "The `agent.md` guide covers
  them together because they sit in the same module directory under the same contract".
- **D9** — the Patterns fence is split under `#### Mounting the relay on your server` and
  `#### Reaching the relay from the browser`; the server half mounts `createRelay` on the
  `@orkestrel/router` dispatcher and exports `serve`, with the adapter's obligations and
  `@orkestrel/server` stated in the prose beside it; the browser half is
  `createRelayProvider({ url, parser, headers })` with the real transport. Both titles are mirrored
  on `createRelay`'s and `createRelayProvider`'s `@example` blocks, and parity compares each pair.
- **D10** — § The HTTP provider engine gains "The engine is generic over `TRecord`: the record type a
  call's `frame()` parser emits and `read` consumes, defaulting to `Readonly<Record<string,
  unknown>>` …", and the subclass pattern's prose says the fence writes `AgentProvider<string>`
  because each decoded chunk is one raw-text record.
- **D11** — the sentence is now "`AgentProvider` is `abstract`; the members a subclass fills are
  listed under [`## Methods`](#methods)."
- **D12** — every one of the nine new constants states its value in its description paragraph
  (`120_000`, `2048`, `1_048_576`, `'application/x-ndjson; charset=utf-8'`, `'relay provider
  failed'`, `401`, `400`, `413`, `502`), and parity carries each into its Summary cell.
- **D13** — the four status constants read `Names the status a relay answers …`.
- **D14** — the engine fence declares `token` as a function over `AbortSignal`, and takes `abort`
  from `createAbort()` and `messages` from a literal, matching the guide's other fences.
- **D15** — the receipt citation is now a recorded Chrome 148 run of the built core entry: the entry
  and its `@orkestrel` import closure loading as ES modules with no console error, and a
  browser-side `RelayProvider` round-tripping a turn, cancelling mid-stream with its local partial,
  and receiving a refused bearer as a `ProviderError` with code `'HTTP'` and status `401`.
- **D16** — the wire-contract fence's introduction states what `parse` returns; the fence uses the
  `generate` result, projects it into a `result` frame through `parse`, writes that frame as one
  newline-delimited record, and closes with the `parse` reading that projects an extra member away.
- **D17** — `guides/README.md`'s concept cell is `` `Agent`, `AgentProvider`, `RelayProvider`,
  `RelayStream` ``.

## Fences

Every transcription lives in `tests/guides.test.ts` § `flagship fences`.

| Fence | Transcription | The assertion it carries |
| ----- | ------------- | ------------------------ |
| The engine configuration (§ The HTTP provider engine) | `answers the engine-configuration fence’s declared switches` | `https://api.example/generate` posted; `Bearer fixture` from the awaited hook on the request; the hook's signal identical to the transport's, distinct from the caller's, unaborted; `{ content: 'the answer', thinking: 'considering' }` from `<think>considering</think>the answer` |
| The engine configuration, lines | `carries the engine-configuration fence lines the transcription copies` | The `path`, `timeout`, `headers`, `split`, `strict`, and `token` lines are present verbatim |
| The relay, server half + browser half | `round trips both relay fence halves and carries the route the server half declares` | `{ content: 'relayed answer' }`, `browser.name` is `relay`, and the request the handler receives is `POST` with pathname `/relay` |
| The relay, browser half alone | `decodes a scripted relay body through the fence’s browser half alone` | The bearer reaches the request; deltas `thinking:considering ` then `content:relayed answer`; the settled result is the one the `result` frame carried |
| The relay, refusal | `refuses the relay fence’s hop when the bearer does not match` | `ProviderError` / `HTTP` / `401` / `provider error: 401`, with `upstream.started` at `0` |
| The relay, byte limit | `refuses a relay body at its byte limit and admits one below it` | `413` at the exact limit, admitted at one byte above it |
| The relay, lines | `carries the relay fence lines the transcription copies` | The route line, `dispatcher.handle(request, undefined)`, the annotated `browser` binding, and the fence's `url` and parser lines |
| The wire contract, guards | `answers the wire-contract fence’s guard and projection readings` | `is` true / false as the fence claims, and `parse` returning `{ channel: 'error', message: 'oops' }` for the record carrying `code` |
| The wire contract, projection | `projects a settled turn into the frame the wire-contract fence writes back` | The guarded body runs the turn and the written line is `{"channel":"result","result":{"content":"projected answer"}}\n` |
| The subclass fence, the instructions, tool-dispatch, helper, snapshot, and conversation-store fences | unchanged | unchanged |

The three new executed claims were each proved to bind by a planted mutation in the owned test,
removed in the next command:

```text
npm run test:guides
```

- Route: replacing the recorded request with `new Request('https://app.example/other', { method: 'GET' })`
  → `Tests 2 failed | 41 passed (43)`, failing `round trips both relay fence halves and carries the
  route the server half declares`.
- Engine configuration: changing the transcribed `path` to `/other` → the same run's second failure,
  `answers the engine-configuration fence’s declared switches`.
- Projection: asserting `parse` keeps `code: 'X'` → `Tests 1 failed | 42 passed (43)`, failing
  `answers the wire-contract fence’s guard and projection readings`.

With every plant removed the same command returns `Tests 43 passed (43)`.

## Scoped validation

Every command run at `C:\Users\mikes\WebstormProjects\agent`.

| Command                 | Exit | Reading                                              |
| ----------------------- | ---- | ---------------------------------------------------- |
| `npm run format:check`  | 0    | All matched files use the correct format (87 files)  |
| `npm run lint:check`    | 0    | no output                                            |
| `npm run check`         | 0    | no output                                            |
| `npm run test:guides`   | 0    | `Test Files 1 passed (1)`, `Tests 43 passed (43)`    |
| `npm run test:src:core` | 0    | `Test Files 23 passed (23)`, `Tests 753 passed (753)` |
| `npm run test:setup`    | 0    | `Test Files 1 passed (1)`, `Tests 54 passed (54)`    |

Acceptance criteria, each checked:

1. `format:check`, `lint:check`, `check` — exit 0, preceding table.
2. `test:guides` exit 0 at 43 tests (39 before: the relay block gained the engine-configuration pair,
   the browser-half case, and the route case, and the wire-contract block gained the projection case);
   `test:src:core` stays at 23 files / 753 tests, the count the baseline records.
3. `grep -n "admitted whole\|per call\|carries no Surface row\|exceeds its byte budget" guides/agent.md src/core/constants.ts`
   — no output, exit 1.
4. D5–D7 and D9 as stated under § Fences: both relay halves and the engine-configuration fence are
   transcribed and executed, the route assertion reads the `Request` the transcription's `fetch`
   receives, and `grep -c equivalent guides/agent.md` returns `0`.
5. D8 and D12–D17 by inspection, each named under § Items.
6. Sweep of the added lines for the `writing.md` § Substitutions rows that ban unconditionally —
   pattern `should|simply|easy|easier|easiest|just|currently|utilize|leverage|\bvia\b|in order
   to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|sanity check|dummy|blacklist|whitelist`,
   case-insensitive, over `git diff -U0` additions in `README.md`, `guides/README.md`,
   `guides/agent.md`, `src/core/constants.ts`, `src/core/factories.ts`,
   `src/core/providers/RelayProvider.ts`, and `tests/guides.test.ts` — no hit. The permitted-sense
   rows (`once`, `since`, `new`, `latest`, `now`, `master`) were swept over the same population and
   ruled by hand: over the prose files the only hit is the pre-existing idiomatic `at once` in clause
   34, and over `tests/guides.test.ts` every hit is the `new` operator, which is code syntax the
   table exempts. The count sweep over the prose additions found and removed three of my own:
   "one type parameter" (now `generic over \`TRecord\``), "copy the first … the second" (now the
   server half and the browser half, which also removes a positional reference), and "that one
   refusal" (now "that refusal"). The remaining `one` hits name their member and are pre-existing.

## Observations

- **`build` and the whole `test` chain were not run**, per the brief. They are the Orchestrator's.
- **`test:guides` green still rests on the packed `@orkestrel/guide` installed `--no-save`.** Nothing
  in this unit changes that, and a clean `npm ci` still reinstates the pre-G1 failure.
- **The route is asserted, not routed.** The user's `@orkestrel/router` devDependency decision is
  still pending, so the transcription drives the handler directly and asserts the method and path
  against the `Request` the browser half produced. That is the strongest proof available without the
  declaration: it fails when the browser half's `url` stops reaching the declared route. Executing
  the dispatcher itself needs `@orkestrel/router` declared.
- **The engine fence's transport is a third substitution, disclosed in the test rather than the
  guide.** The fence declares `createTextProvider` rather than defining it, so the transcription
  supplies both the concrete subclass that factory would return and a `fetch` the fence omits. The
  guide's substitution paragraph covers the relay fences, which is what D5 scopes; the engine fence's
  substitution is a consequence of its own `declare`, and the comment beside the transcription states
  it.
- **A probe settled `parse`'s projection before the fence claimed it.** `tmp/probe/a3-fix-2-parse.test.ts`
  read `relayFrameContract.parse({ channel: 'error', message: 'oops', code: 'X' })` and got
  `{"channel":"error","message":"oops"}`, and `providerRequestContract.parse` over a message carrying
  `caller` dropped that member. The file was deleted; `tmp/probe/` holds only the two pre-existing
  `.txt` files again.
- **`oxfmt` formats Markdown.** It re-padded the Constants table after my rewrite. I could not run
  `format`, so I copied `guides/agent.md` and `tests/guides.test.ts` plus `.oxfmtrc.json` into the
  session scratchpad, ran `oxfmt --write` against the copies, read the diff (table padding only for
  the guide, one quote style for the test), and applied it. No mutating command ran in the tree.
- **The sub-heading names are mine.** The brief offered "The server" and "The browser"; the deviation
  contract gives me sub-heading names, and each sub-heading's text becomes the `@example` title that
  ships in the source doc block. "The server" reads as nothing beside `createRelay` in a consumer's
  editor, so I used "Mounting the relay on your server" and "Reaching the relay from the browser",
  which carry the same meaning in both places.
- **The browser half is titled on both sides**, the option the brief's second branch offers, so both
  halves are mirrored and the parity gate compares each.

## Deviation

**One scope decision, carried rather than stopped on, because both files are inside Owned.**

D9 splits the composition that `createRelay`'s `@example` used to carry whole. Two `@remarks`
sentences pointed at that merged example and became false in the same edit:

- `src/core/factories.ts`, `createRelayProvider`: "{@link createRelay} mounts the server end, and its
  example composes the two." → "… and its example is the server half this one pairs with."
- `src/core/providers/RelayProvider.ts`, the class: "{@link createRelay} mounts the server end and its
  example composes the two." → "… and {@link createRelayProvider}'s example is the browser half of
  that pair."

The Owned list scopes those files to "the titled `@example` fences and their titles only". The
sentences are not fences, but each was made false by the fence edit the brief directs, and
`.claude/rules/documentation.md` is explicit — "Never suppress a parity failure. Correct the drift"
and "Re-read the prose last, against what actually shipped." Neither sentence is compared by the
parity gate, so leaving them would have shipped two false claims under a green gate. No description
paragraph changed on either declaration, so no Summary cell moved. Revert those two hunks if the
Orchestrator rules the scope tighter than its own law; nothing else depends on them.

**No other deviation.** No item needed a file outside Owned, no `tests/setup.ts` addition was needed,
no off-limits file was touched, and no fence's claimed value contradicted what the code returns.

## Status

`git status --porcelain`:

```text
 M README.md
 M guides/README.md
 M guides/agent.md
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/providers/RelayProvider.ts
 M tests/guides.test.ts
```
