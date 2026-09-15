<!-- reviewer on Claude Opus 5, native, read-only, subjective lane, on the worktree ollama-audit at 2178171 with o4-diff.txt and o5-diff.txt; returned 2026-09-14 after 542 s; retained verbatim from the returned message -->

Lane: subjective (reviewer, Claude Opus 5)

Subject: `@orkestrel/ollama` at worktree `C:/Users/mikes/WebstormProjects/ollama-audit` (commit `2178171`), unit O4 (`o4-diff.txt`) plus the Orchestrator cleanup (`o5-diff.txt`). I am read-only with no shell: every ruling below is from source, the supplied diffs, the retained gate logs, and the installed `@orkestrel/agent` dist. Where a claim needed a run I could not take, I say so.

## Per-claim verdicts

**1. `npm run test:guides` exits 0; Surface rows, Summary equality, Methods table, README pitch — CONFIRMED**

- Bijection: `src/core/index.ts:1-5` re-exports `types.ts`, `constants.ts`, `helpers.ts`, `factories.ts`, `OllamaProvider.ts`. Their exports are `WireChatRequest`, `OllamaOptions`, `DEFAULT_OLLAMA_URL`, `DEFAULT_KEEP_ALIVE`, `OLLAMA_CHAT_PATH`, `mapMessages`, `extractContent`, `extractThinking`, `extractUsage`, `extractTools`, `extractArguments`, `createOllama`, `OllamaProvider`. The `## Surface` table at `guides/ollama.md:67-81` carries a row for each and no other row. Exhaustive both ways.
- Summary equality, read in `findDrift` form ({@link} as its target's token): `guides/ollama.md:69` ↔ `src/core/factories.ts:6-7`; `:70` ↔ `src/core/OllamaProvider.ts:20`; `:71` ↔ `src/core/types.ts:51`; `:72` ↔ `src/core/types.ts:4-5`; `:73/:74/:75` ↔ `src/core/constants.ts:4-5/10-12/20`; `:76-81` ↔ `src/core/helpers.ts:13/48/66/88/111/150`. Every cell equals its description paragraph.
- Methods table `guides/ollama.md:95-100` lists `frame`, `body`, `read`, `finish`, and `src/core/OllamaProvider.ts:60/70/100/116` declares exactly those. Each Summary equals its doc-block first sentence.
- The `generate` / `stream` ruling landed as the Orchestrator directed: `guides/ollama.md:89` names them in the Methods lead with `[agent.md](agent.md)`, and clause 15 at `:120` repeats it with the same link.
- Pitch ↔ tagline: `README.md:3-6` is byte-equal to `guides/ollama.md:3-6`.
- Exit 0 rests on `o5-gates.log.txt:72-85` (`test:guides`, exit=0, 1 file / 32 tests). I cannot bind that log to `2178171` myself; the brief asserts it, and `o4-report.md:46` reports the same figure. Provenance noted, not disputed.
- `o4-exports.txt` is not in `.orkestrel/campaign/`. I derived the export set from source instead — see F11.

**2. No removed export named; `OLLAMA_CHAT_PATH` has a row; no `process.stdout` / `process.stderr` — CONFIRMED**

A case-sensitive sweep for the removed exports and `process\.stdout|process\.stderr` over the worktree's Markdown returns no hit in `guides/ollama.md` or `README.md`. Every hit is in `guides/agent.md` and `guides/ndjson.md`, which are mirrors of other packages' own guides and out of scope. `OLLAMA_CHAT_PATH` has its row at `guides/ollama.md:75`.

**3. The contract clauses state what the code does — CONFIRMED**

I attacked each clause against source and the installed base. Every sentence a consumer would act on holds:

- Clause 2 (`:107`): the import set matches `src/core/OllamaProvider.ts:1-17`, `factories.ts:1-3`, `types.ts:1`, `helpers.ts:6-10`. No `src/` module imports `@orkestrel/timeout`. `package.json:90` declares it in `devDependencies`, and `guides/ollama.md:149` is the bounding fence that imports it. The cleanup's rewrite is true. Two imprecisions raised as F5 and F10.
- Clause 3 (`:108`): `stream: true` always, `think` override, `keep_alive`, conditional `options` / `format` / `tools`, and the tool projection all match `src/core/OllamaProvider.ts:70-92`. The `ProviderError` with code `'HTTP'` and the status is the base's and is proved executably at `tests/guides.test.ts:348-362`. One over-specification raised as F9.
- Clause 4 (`:109`): `OllamaProvider` passes no `split` to `super` (`OllamaProvider.ts:41-48`), and the base defaults `split` to `true` (`node_modules/@orkestrel/agent/dist/src/core/index.js:2732`). Correct.
- Clause 5 (`:110`): `frame()` returns `createNDJSONParser()` fresh per call (`OllamaProvider.ts:60-62`); the base calls `finish(parser)` at end of input (`index.js:2801`) and `finish` feeds `'\n'` (`OllamaProvider.ts:117`); the streaming `TextDecoder` with its tail flush is `readChunks` (`index.js:1197, 1214, 1217-1218`); `strict` defaults to `false` (`index.js:2733`, consumed at `:2814`). Correct.
- Clause 6 (`:111`): I attacked the dropped parenthetical specifically. `index.js:2808-2812` yields the splitter's flushed tail as a final content delta, so that case needs no exception and the trimmed sentence is both correct and simpler. This is a real simplification, not a lost caveat.
- Clause 7 (`:112`): `read` gates usage on `done === true` (`OllamaProvider.ts:101`) and `extractUsage` requires both counts to be numbers (`helpers.ts:104-107`). Correct.
- Clauses 8, 9 (`:113-114`): match `helpers.ts:127-168` exactly, including the minted `crypto.randomUUID()` id and the `{}` degradation.
- Clause 10 (`:115`): `timeout` defaults to `120_000` (`index.js:2728`); the parser and timer are released in `finally` (`index.js:2822-2828`) and the reader in `readChunks`'s own `finally` (`index.js:1219+`); the transport defaults to `globalThis.fetch.bind(globalThis)` (`index.js:2729`). Correct.
- Clause 11 (`:116`): `format` is passed to `super` (`OllamaProvider.ts:47`) and exposed by the base getter (`index.js:2740-2742`), and `tests/guides.test.ts:371-382` proves both the supplied and the omitted case. Correct.
- Clause 13 (`:118`): the typecheck claim is exact — `configs/src/tsconfig.core.json:4-5` is `"lib": ["ESNext", "WebWorker"]`, `"types": []`. The receipt sentence is supported by `b1-receipt.md` but is the wrong receipt and the wrong audience — F1, F2.
- Clause 14 (`:119`): `vite.config.ts:123-125` gives the `service` project `testTimeout: 120_000`, `hookTimeout: 120_000`, `fileParallelism: false`; `tests/setupService.ts:137,143,149` warms with `num_predict: 1` and throws; `scripts/ollama.sh` exists. The moved hermetic path and both relay suites exist. Correct.
- Clause 15 (`:120`): holds, per claim 1.

**4. The patterns — CONFIRMED**

Both lead fences are free of `process.stdout` (claim 2 sweep). `guides/ollama.md:240-258` keeps the transparent wire proxy and states what it cannot do at `:258`. `:207-236` composes `createRelay({ provider: createOllama({ model }), authorize })` on a `createDispatcher` route with `createRelayProvider({ url, parser: createNDJSONParser, headers })`. `:189-201` shows the same `createOllama` call in a browser module. `:282-306` uses `isProviderError` with `error.code` and `error.status` from `@orkestrel/agent`. Every fence imports a published specifier; no `@src/*` appears. Every changed or new guide fence is transcribed against the canned `createStreamingTransport` (`tests/guides.test.ts:175-202, 212-241, 257-264, 270-301, 303-334, 348-362`), with a presence guard beside each. `createStreamingTransport` pre-exists in `tests/setupServer.ts` and is itself proved (`tests/setup.test.ts:200-222`), so the transcriptions rest on tested infrastructure. One gap raised as F12.

**5. The five stale `helpers.ts` TSDoc lines — CONFIRMED**

`src/core/helpers.ts:50, 72, 90-91, 94, 117` now read "One parsed `/api/chat` NDJSON record" and "the stream's `done: true` line". A sweep for `non-stream` over the worktree returns no hit in `src/` or `guides/ollama.md`. All five edits are `@param` / `@remarks` lines; no description paragraph moved, so every Summary cell still equals its source (verified under claim 1). O2-R1 F1 is closed.

**6. README pitch; `guides/README.md` index and dependency paragraph — CONFIRMED**

`guides/README.md:8-10` carries the concept index over Concept / Spec / Source / Tests — the full set minus the showcase column this workspace lacks. `:26-32` names the runtime dependencies as `@orkestrel/agent`, `@orkestrel/ndjson`, `@orkestrel/contract`, `@orkestrel/tool`, `@orkestrel/budget`, which is exactly `package.json:74-80`. `:33-36` moves `@orkestrel/timeout` to the development side, matching `package.json:90`. Pitch equality verified under claim 1.

**7. Touched prose against `writing.md` — BROKEN**

Four of the five conjuncts hold, one does not.

- Holds: no `writing.md` § Substitutions term appears in `guides/ollama.md`, `README.md`, or `guides/README.md` (case-insensitive sweep over the table's banned rows returns nothing; the `once` hits at `:16`, `:115`, `:120` are all cardinal, the `still` hits at `:110`, `:258`, `:318` are all present-tense). Corroborated mechanically by `o5-gates.log.txt:86-99` (`test:policy`, 90 passed, exit 0, which runs the authored-Markdown prose sweep).
- Holds: no count of a growable set in the touched prose. Every number is a value — `Chrome 148`, `2026-09-14`, `120s`, `120_000`ms, `num_predict: 1`, `Node.js >= 22`. The member lists (`frame`, `body`, `read`, `finish`) are named rather than counted.
- Holds: addresses the developer as `you`; no `we`, `our`, or `let's`.
- Holds: no `should`; the modals are `must` / `can` / `might` or the imperative.
- **Fails**: `writing.md` § Code tokens, references, and links states "Never inflect, pluralize, or possessivize a code token." Two possessivized tokens sit in sentences O4 rewrote:
  - `guides/ollama.md:116` (clause 11) — "the provider-default level of `AgentContext`'s build cascade".
  - `guides/ollama.md:262` (§ Context framing) — "the **provider-default level** of `AgentContext`'s build cascade".

  Required change: write "the build cascade of `AgentContext`" or "the `AgentContext` build cascade" at both sites. Both sentences carry O4 edits, so the possessive is inside the touched prose whether or not O4 introduced it.

  What I attacked here and did not rule against: the bare-token-as-subject pattern ("`frame` opens the call's framing state", `guides/ollama.md:93`) is not followed by a noun either, but it is the voice of the whole `@orkestrel` guide set — `guides/agent.md` writes the same way throughout — so correcting it in `ollama.md` alone would make this guide inconsistent with the set it sits in. That is a fleet-wide convention question for the Orchestrator, not a defect of this unit. The pluralized `` `ProviderDelta`s `` (`guides/ollama.md:31`, `README.md:49`) and the possessive `` `stream`'s `` (`:320`) sit in paragraphs the O4 diff does not touch, so they are outside this claim.

**8. `test:src:core` reports the pre-O4 count; TSDoc edits named — CONFIRMED**

Pre-O4: `o2-fix-gates.log.txt:38-39` — 4 files, 99 tests. At `2178171`: `o5-gates.log.txt:38-39` — 4 files, 99 tests, exit 0. `tests/src/core/` holds exactly four test files. No source behaviour changed: the O4 diff's only `src/` hunks are the five `helpers.ts` doc lines, and the O5 diff touches no `src/` file. `o4-report.md:16` and `:163-164` name the TSDoc edits and record that no Summary cell quotes them; there is no TSDoc edit outside item 5 to name. Same provenance caveat as claim 1 on the log-to-commit binding.

**9. The diff touches only owned files — CONFIRMED**

`o4-diff.txt` touches `README.md`, `guides/README.md`, `guides/ollama.md`, `src/core/helpers.ts`, `tests/guides.test.ts` — nothing else, and the `helpers.ts` hunks are the five permitted TSDoc lines with no description paragraph moved. `o5-diff.txt` touches `guides/README.md`, `guides/ollama.md`, `package.json`, `package-lock.json`, `tests/conformance.test.ts`, which is the cleanup the brief names and rules on under claim 3. `tests/guides.test.ts` adds no helper of its own — `createStreamingTransport` is imported from the pre-existing `tests/setupServer.ts`.

**10. The guide is usable from the guide alone — CONFIRMED**

I walked both paths as a reader. Browser direct against the daemon: `guides/ollama.md:189-201` gives the whole call, and `:118` gives the honest origin limit. Browser through their own relay: `:207-221` gives the server half and `:225-236` the browser half, including the parser-supply note at `:223` and the refusal behaviour at `:238` with a link to `agent.md` for the frame vocabulary. `createRelay` returns a fetch-standard handler and the prose says "any fetch-standard router", so a reader on their own stack has everything.

The step a reader could not take from the guide alone, as the claim requires me to name: **serving the `@orkestrel/router` dispatcher.** `guides/ollama.md:218-221` builds `const dispatcher = createDispatcher({ routes })` and stops. The guide never shows the dispatcher mounted on a listening server, and it links neither `router.md` nor `server.md` — both of which sit in this same `guides/` directory. A reader following the demonstrated composition end to end must open another guide they were not pointed at, or `tests/setupServer.ts`. See F8.

## Findings outside the claims

**F1 — `guides/ollama.md:118`: a published guide cites a private campaign artifact.** Clause 13 reads "The campaign's Chromium receipt drove …". A consumer who installs `@orkestrel/ollama` has no campaign and no receipt, so the sentence asks the reader to trust a document they cannot open. Right looks like: state the measured fact and its date without the campaign reference, or point at the test that re-produces it.

**F2 — `guides/ollama.md:118`: the clause cites the weaker receipt and misattributes one reading.** The sentence describes `b1-receipt.md` — the built `@orkestrel/agent` closure at agent `5d288d7`, a scripted provider, a browser `RelayProvider` round-trip and cancel. `b2-receipt.md` drove **this package's** built `@orkestrel/ollama` core entry in Chrome 148 against a live daemon: direct generate with usage counts, direct stream cancel returning `ProviderAbortError` with its partial, relayed generate crossing the hop, and a `401` refusal. The guide's "a browser-side `RelayProvider` round-trips **and cancels with its partial**" attributes to the relay a cancel that `b2-receipt.md:24` records against the direct provider. Right looks like: state B2's reading — this package's built entry, direct and relayed, in Chrome 148.

**F3 — `guides/ollama.md:331`: the `tests/setup.test.ts` bullet is narrower than the file and names a kind the file does not export.** The bullet says "every helper, fixture, recorder, and guard `tests/setup.ts` exports, plus the narrowing guards and tool fixtures from `tests/setupServer.ts`". `tests/setup.ts:20-140` exports no guard. `tests/setup.test.ts:32-53` also proves `createRefusingTransport`, `createStreamingTransport`, `createScriptedAgentStream`, `driveAgent`, and `env` from `tests/setupServer.ts`, which "narrowing guards and tool fixtures" does not cover — and `createStreamingTransport` is the transport every new guide fence transcription runs on. Right looks like: the file's own header at `tests/setup.test.ts:1-6` already states the scope correctly; restate that.

**F4 — `guides/ollama.md:332`: the `tests/setupServer.test.ts` bullet contradicts the file.** The bullet claims "the recording proxy and relay server, the captured and open transports, the capture wait, and the provider-stream driver" run "against real loopback sockets". `tests/setupServer.test.ts:7-11` states the opposite for the transports: "The transport fixtures drive in-memory responses instead." The bullet also drops the shared wire tables that file proves. Right looks like: scope "against real loopback sockets" to the proxy and relay server, and name the wire tables.

**F5 — `guides/ollama.md:107` and `guides/README.md:33`: the prose dates the product against campaign history.** "No module under `src/` imports `@orkestrel/timeout` **any more**" and "after **the rebuild**" both ask the reader to hold a past state they never saw. Right looks like: "No module under `src/` imports `@orkestrel/timeout`; the base arms the deadline, and the manifest declares it as a development dependency for the bounding pattern, which imports it as a consumer would."

**F6 — `guides/ollama.md:71`: the `OllamaOptions` row hides four keys a caller uses.** `ProviderOptions plus { model, url?, keepAlive?, options?, think? }` is the right shape for the inheritance, but `timeout`, `fetch`, `headers`, and `format` now appear nowhere in the Surface section. Right looks like: one sentence under the table naming what `ProviderOptions` contributes, with the `agent.md` link.

**F7 — `guides/ollama.md:234` and `:255`: two fences use undeclared identifiers with no omission comment.** `const relayed = await browser.generate(messages, abort.signal)` and `const result = await provider.generate(messages, abort.signal)` reference `messages` and `abort`, which neither fence declares and neither import brings in. Right looks like: a `// messages and abort as in § Surface` comment, or declare them.

**F8 — `guides/ollama.md:218-221`: the relay server fence stops before the dispatcher is served, and the guide links no router or server guide.** `guides/router.md` and `guides/server.md` sit in the same directory and are named nowhere in `guides/ollama.md`; § See also at `:346-352` lists only `agent`, `ndjson`, `contract`, `AGENTS.md`, and the guides index. Right looks like: link `router.md` (and `server.md` where the reader needs a listener) from § Relaying through your own server or § See also.

**F9 — `guides/ollama.md:108`: clause 3 over-specifies the `tool_calls` condition.** "with `tool_calls` added only on an assistant turn that replays them" — `src/core/helpers.ts:32-38` keys on `message.calls` being defined and non-empty and never reads `role`. Right looks like: "with `tool_calls` added only on a turn that replays them".

**F10 — `guides/ollama.md:107` and `:12`: an imports clause lists symbols this package does not import.** Clause 2 is headed "Imports each boundary from its owner" and names "the provider errors" from `@orkestrel/agent` and `ToolDefinition` from `@orkestrel/tool`; `src/core` imports neither. Right looks like: split the sentence — "imports … ; the provider errors and `ToolDefinition` are owned by those packages and reached through the base."

**F11 — evidence gap in the dispatch, not in the subject.** The brief names `o4-exports.txt` in `.orkestrel/campaign/`; the file is not present. I derived the export set from `src/core/index.ts` and its re-exported modules and ruled claim 1 on that.

**F12 — `README.md:61`: a changed fence carries a value claim nothing executes.** `answer.join('') === streamed.content // true` is new in O4 and is asserted nowhere; `tests/guides.test.ts` executes the guide's twin fence (`:196`) but reads no README fence. Right looks like: add a presence guard for the README line beside the guide's, or drop the `// true` comment from the README copy.

## What I attacked and what held

- **Clause 6's dropped parenthetical.** `agent/dist/src/core/index.js:2808-2812` yields the splitter's flushed tail as a final content delta, so the trimmed clause is correct. Genuine simplification.
- **Every base-owned number and default.** `120_000` (`index.js:2728`), `split` default `true` (`:2732`), `strict` default `false` (`:2733`), the bound `globalThis.fetch` receiver (`:2729`), the `id` getter minted per instance (`:2725, 2736`), `generate` draining `stream` (`:2752-2757`). All match the guide.
- **The `ESNext` / `WebWorker` / no-ambient-`@types` claim.** Exact against `configs/src/tsconfig.core.json:4-5`.
- **The `service` project's stated configuration.** Exact against `vite.config.ts:123-125`, `tests/setupService.ts:137-149`, and `scripts/ollama.sh`.
- **The Tests section's file list.** Every one of the linked test files exists in the worktree, and no test file in the tree is unlisted.
- **The new transcriptions' ability to fail.** `o4-report.md:65-77` records four value mutations reddening exactly the four cases that own them, then a revert to 32 passed.
- **Removed-export leakage and `process.stdout`.** Clean across both files.
- **Count discipline and the Substitutions table.** Clean across all three touched files.
- **The Methods-table deviation.** The Orchestrator's ruling holds up: the parity engine resolves a class's group against this package's own declarations, `generate` and `stream` are declared in `AgentProvider`, and the guide states that fact in the Methods lead, in clause 15, and in the Surface prose, each with the `agent.md` link.

VERDICT: FAIL 7; outside the claims: F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12
