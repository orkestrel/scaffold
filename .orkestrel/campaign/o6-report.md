# O6 report — the ollama guide made true after audit round O4-R1

Unit O6, `implementer` on Claude Opus 5, native, in `C:\Users\mikes\WebstormProjects\ollama` at
baseline `655ebec`. Claims 3, 4, 7, and 10 of `o4-audit-objective.md` are closed, with the
reviewer's findings F1–F7, F9, F10, and F12 from `o4-audit-subjective.md` carried by items M6–M14.

## Touched files

```text
 README.md            |  15 ++++--
 guides/README.md     |   4 +-
 guides/ollama.md     |  50 ++++++++++++-----
 tests/guides.test.ts | 150 ++++++++++++++++++++++++++++++++++++---------------
 4 files changed, 156 insertions(+), 63 deletions(-)
```

- `guides/ollama.md` — the streaming claim, the relay server half, the contract clauses, the
  receipt sentence, and the Tests bullets.
- `README.md` — the streaming sample and its new reading paragraph, and the Package paragraph.
- `guides/README.md` — M9 only: the timeout sentence's tense.
- `tests/guides.test.ts` — the reclassification case, the real-server relay transcription, the
  README guards, and the renamed presence guards.

## Per item

- **M1 (claim 3).** Verified, no edit: the refreshed mirror carries `AgentProvider`,
  `AgentProviderInterface`, `ProviderOptions`, `ProviderError`, `RelayProvider`, and `createRelay`,
  its `## Contract` clauses 5 and 6 (`guides/agent.md:971`, deadline and cancellation) back this
  guide's base-ownership clause, and its `#### Mounting the relay on your server` and
  `#### Reaching the relay from the browser` headings back the relay pattern; every pointer this
  guide makes into it is a file-level `agent.md` link that resolves, so no pointer needed changing.
- **M2 (claim 4).** The guide's driven-stream fence and the README's streaming sample now read
  `result.content` / `streamed.content` as the answer and `answer.join('')` as what arrived, with a
  paragraph under each stating that a reclassified `</think>` span leaves the join longer; the
  transcription asserts the plain turn and the reclassification turn side by side.
- **M3 (claim 7).** "The package publishes one entry" is now "publishes the `.` entry alone"
  (`guides/ollama.md` clause 13), and the test's "two content spans, one reasoning span" comment now
  names the `Hel`, `lo`, and `weighing it` spans.
- **M4 (claim 10).** § Relaying through your own server serves the dispatcher: the server fence adds
  `createServer({ dispatcher, state: () => ({}), host: '127.0.0.1', port: 8787 })`, `await
  server.start()`, the `url` it binds, and the `await server.stop()` shutdown line, with a paragraph
  stating what the runtime adapter does and that `@orkestrel/server` supplies it; the browser half
  dials that `url`.
- **M5 (claim 7, the rest of the touched prose).** Four fixes, each named: the intro's seam list
  gives every token its noun (the `frame` seam, the `body` seam, the `read` seam, the `finish`
  seam); the Methods lead does the same (the `frame` method … the `read` method); the README's
  "Published as a single core surface … one `.` entry" becomes "publishes the `.` entry alone"; the
  § Bounding a call fence declares the `messages` it passes.
- **M6 (reviewer F7 on possessives).** Clause 11 and § Context framing both read "the `AgentContext`
  build cascade".
- **M7 (F1, F2).** Clause 13 now states this package's own reading, checkable by date: on 2026-09-14
  in Chrome 148 the built `@orkestrel/ollama` core entry and its `@orkestrel` closure loaded as ES
  modules, `OllamaProvider` drove the local daemon directly for a settled answer with usage counts,
  a mid-stream cancel returned `ProviderAbortError` with its partial, and the same page reached that
  daemon through a `createRelay` server where a wrong bearer arrived as `ProviderError` `HTTP` 401.
  No campaign and no unopenable file is cited.
- **M8 (F3, F4).** The `tests/setup.test.ts` bullet restates that file's own header — the padding,
  the summarizers, and the workspace seeder from `tests/setup.ts`, plus the host-independent half of
  `tests/setupServer.ts` (guards, refusing and streaming transports, tool fixtures, scripted agent
  stream and driver, environment readers). The `tests/setupServer.test.ts` bullet scopes "real
  loopback sockets" to the proxy and the relay server, says the transport fixtures answer in memory,
  and names the wire tables `WEATHER_TOOL` and the insatiable tool's chunk line.
- **M9 (F5).** "any more" is gone from clause 2 and "after the rebuild" from `guides/README.md`;
  both sentences state the present fact.
- **M10 (F6).** A sentence under the Surface table names what `ProviderOptions` contributes to
  `OllamaOptions` — `timeout`, `fetch`, `headers`, `format` — with the `agent.md` link.
- **M11 (F7 on undeclared identifiers).** The relay browser fence declares `url`, `abort`, and
  `messages`; the routing fence declares `messages` and `mintToken`. The § Bounding a call fence had
  the same gap and is fixed with them (recorded under M5).
- **M12 (F9).** Clause 3 reads "with `tool_calls` added only on a turn that replays them" —
  `mapMessages` keys on `message.calls` (`src/core/helpers.ts:31-38`) and never reads `role`.
- **M13 (F10).** Clause 2 lists only what `src/core` imports, and a following sentence says the
  provider errors and `ToolDefinition` are owned by `@orkestrel/agent` and `@orkestrel/tool` and
  reach a caller through the base.
- **M14 (F12).** The README sample carries no `// true`; its two value comments are guarded in
  `tests/guides.test.ts` beside the guide's, through a new `README_SPEC` inventory read.

## Fences

- **§ Surface, driven stream (plain turn)** — `settles the content the stream fence reads, with the
  plain turn joining to it`: deltas `['Hel', 'lo']`, thinking `['weighing it']`,
  `answer.join('')` equal to the settled content, settled value
  `{ content: 'Hello', thinking: 'weighing it', usage: { prompt: 3, completion: 4, total: 7 } }`.
- **§ Surface, the paragraph under that fence (reclassified turn)** — `settles the reclassified turn
  to content the joined deltas no longer match`: records `reasoning` then `</think>answer` give
  `answer.join('') === 'reasoninganswer'`, no `thinking` delta, `answer.join('')` **not** equal to
  the settled content, and settled value `{ content: 'answer', thinking: 'reasoning', usage: {
  prompt: 3, completion: 4, total: 7 } }`.
- **§ Surface, both fence lines plus the README's** — `carries the stream fence lines the
  transcription copies`: the guide's `result.content` and `answer.join('')` comment lines and the
  README's `streamed.content` and `answer.join('')` comment lines.
- **§ Relaying through your own server, both halves** — `round trips the relay fences over a real
  loopback server the browser half dials`: the server half through `createRelayServer`
  (`tests/setupServer.ts:139`), which is that fence — `createRelay` over a real `OllamaProvider`, an
  `@orkestrel/router` dispatcher on `POST /inference`, and an `@orkestrel/server` listener started
  with `start` and stopped with `stop` — and the browser half `createRelayProvider({ url, parser:
  createNDJSONParser, headers })` over the real global `fetch` against the bound loopback url.
  Asserts the settled `{ content: 'Hello', thinking: 'weighing it', usage: { prompt: 3, completion:
  4, total: 7 } }`, `browser.name === 'relay'`, and the recorded server path `['/inference']`.
- **The refusal prose under the fences** — `refuses the relay hop with an HTTP 401 when the
  credential does not match` (unchanged): `ProviderError` with `{ code: 'HTTP', status: 401 }` and
  an empty daemon-transport call list. It drives the dispatcher directly, which is what lets it
  count the daemon calls.
- **The relay fence lines** — `carries the relay fence lines the transcription copies`: now also the
  `createServer` construction line, `const port = await server.start()`, and `await server.stop()`.
- **Unchanged transcriptions** — the seam fence, the browser fence, the error-narrowing fence, and
  the context-framing fence keep their cases and guards.

## Scoped validation

Baseline at `655ebec`, before any edit: `npm run test:guides` exit 0, 1 file / 32 tests.

Failing proof for claim 4, before the fix: a case asserting the guide's then-current claim
(`expect(answer.join('')).toBe(step.value.content)`) on the reclassification records —
`npm run test:guides`, 1 failed | 32 passed (33), `AssertionError: expected 'reasoninganswer' to be
'answer'` at `tests/guides.test.ts:229`. After the fix the same command is 33 passed (33).

Mutation check that the new relay case is live rather than vacuous: pointing the browser half at
`${server.url}/wrong` reddens exactly that case with `ProviderError: provider error: 404 - Not
Found` (1 failed | 32 passed); reverted, 33 passed.

| Command              | Exit | Result                       |
| -------------------- | ---- | ---------------------------- |
| `npm run format:check` | 0  | all matched files formatted  |
| `npm run lint:check`   | 0  | no finding                   |
| `npm run check`        | 0  | root and `src:core` projects |
| `npm run test:guides`  | 0  | 1 file / 33 tests            |
| `npm run test:src:core`| 0  | 4 files / 99 tests           |
| `npm run test:setup`   | 0  | 3 files / 96 tests           |
| `npm run test:policy`  | 0  | 1 file / 90 passed, 1 skipped |

`test:src:core` and `test:setup` hold their prior counts. `test:guides` rises by the
reclassification case, from 32 to 33.

Acceptance criterion sweeps:

- `grep -n "equal\|equals" guides/ollama.md README.md` → one hit, `guides/ollama.md:349`, the
  parity-gate bullet describing the `Summary` equality gate. No sentence claims joined deltas equal
  the settled content. `grep -n '// true' guides/ollama.md README.md` → two hits, both the seam
  fence's real boolean values (`request.stream`, `request.think`), each asserted in the
  transcription.
- Banned-term sweep over `guides/ollama.md README.md guides/README.md`, case-insensitive and across
  inflections (`should|simpl(y|e)|eas(y|ier|ily)|just |currently|utilize|leverage|via|in order
  to|e.g.|i.e.|etc.|performant|robust|allows you to|and/or|sanity check|dummy|blacklist|whitelist|
  slave|please`) → no hit. The permitted-sense rows (`now|new|latest|once|since|master`) hit
  `guides/ollama.md:16`, `:120`, `:125`, `:281` — every `once` is cardinal or frequency — and
  `:178`, which is the `new OllamaProvider` language syntax. `npm run test:policy` corroborates.
- Numbers in the added prose: every one is a value (`8787`, `127.0.0.1`, `2026-09-14`, Chrome
  `148`, `401`), and no added sentence counts a growable set.

Off-repository instrument, retained for the Orchestrator at
`C:\Users\mikes\WebstormProjects\ollama\tmp\o6\server-fence.mjs` (`tmp` is gitignored): it runs the
new server fence verbatim with a canned daemon transport, then the browser fence against it.
Output: `bound port: 8787`, `url: http://127.0.0.1:8787/inference`, `relayed:
{"content":"Hello","thinking":"weighing it","usage":{"prompt":3,"completion":4,"total":7}}`,
`stopped`. The fence composes and answers as written.

## Observations

- The brief lists `guides/README.md` in both Owned ("M9 only") and Off-limits. I read the specific
  grant as controlling and changed only the M9 sentence there; nothing else in that file moved.
- The lanes disagreed on the bare-token-as-subject pattern: the analyst named "`frame` returns",
  "`body` projects", and "`read` decodes" as `writing.md` violations, and the reviewer ruled the
  pattern the fleet guide set's voice and a question for the Orchestrator. M5 says to follow the
  analyst, so I gave every token a noun at both sites in this guide (the intro seam list and the
  Methods lead) rather than one, which keeps the guide internally consistent. The mirrors in
  `guides/` still write the other way, and the fleet-wide question stays open.
- § See also gains a `@orkestrel/router` and `@orkestrel/server` row linking `router.md` and
  `server.md`. The brief does not name reviewer F8, but the new server fence imports
  `@orkestrel/server` and a reader following it needs the destination; I decided this under the
  deviation contract's wording clause rather than stopping.
- `npm run test:policy` is outside the brief's named tool list. It is read-only and it is the gate
  that reads the authored-Markdown prose sweep my edits touch, so I ran it and report it above.
- `tests/setup.ts` and `tests/setupServer.ts` needed no addition: `createRelayServer` already
  supplies the real server fixture the M4 transcription required.
- The guide's browser relay fence now hands the url across as `declare const url`, so the two halves
  are linked by the value the server bound rather than by a literal a reader has to reconcile.

## Deviation

None. Every item M1–M14 landed inside the owned files, no off-limits file changed, and no fence's
claimed value disagreed with what the code returns.

## Status

```text
 M README.md
 M guides/README.md
 M guides/ollama.md
 M tests/guides.test.ts
```
