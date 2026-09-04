I'll read the brief in full first, then follow it exactly and stay read-only.Next I’ll read the landed example and the ollama conform report so the draft matches that shape.I’ll read the ollama report’s Rows, Breaking, and Consumer edits sections, plus the brief if any summary is too short.I’ll check other landed messages for the same voice, and scan the report’s Breaking and Consumer edits sections again.I’ll read a few landed messages with similar breaking-plus-prose changes so the ollama draft matches that voice.## ollama

```
Conform ollama to the fleet rules: buildResult, parseBody, fences

`assembleResult` leaves for `buildResult`, and `parseBody` returns `Promise<Readonly<Record<string, unknown>> | undefined>` (each breaking, no fleet consumer). The `OllamaProvider` class reads `(await parseBody(response)) ?? {}` and exposes an `id` getter over the `#id` field; the `OllamaHTTPError.code` member is `'HTTP'`; the `extractArguments` helper and the `parseRequestBody` helper read a JSON string through the `parseJSONAs` function; the `OllamaOptions.options` member carries a block naming the mirrored `/api/chat` `options` field and the verbatim carry of that field onto the `WireChatRequest.options` member; the `OllamaResponse` type is an open `POST /api/chat` response together with the deadline and the combined signal that bound the request; the `WireChatRequest` Surface row states `{ model; messages; stream; keep_alive; think; options?; tools?; format? }`; the guide's Surface function cells read as noun phrases; the guide's think Contract names the `think: true` flag when the caller displays reasoning separately from the answer; the guide states that the provider publishes no events and that each call is a pure function of its arguments; the README requirements bullet names the `service` project and states that the `src:server` project is hermetic; the `createRecordingSummarizer` factory, the `RECORDING_SUMMARIZER_DIGEST` constant, and the `FILLER_SENTENCE` constant live in the `tests/setup.ts` module; the `seedConversation` factory lives in the `tests/setupService.ts` module; deadline intervals read `performance.now()`; the guide's Surface and Context framing fences execute from `tests/guides.test.ts` and name the shape; the live value claims execute from `tests/service/factories.test.ts`; the guide parity filter reads the `symbol.keyword` property; the `AGENTS §` citations, the `via` sites, the `e.g.` abbreviations, the `above` sites, the `below` sites, the `H4` and `S2` control identifiers, the `we` sites, the `our` sites, the trailing `…` lists, the counts, and the positional pointers leave the package's prose.

AUDIT-PARAGRAPH

```

Sources: `conform-ollama-report.md` 5-13, 15-39, 119-128

## Unknowns

None.