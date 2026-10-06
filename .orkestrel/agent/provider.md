# Why this stays outside ProviderInterface

Putting Mica in the agent provider slot throws away the distribution. The provider contract returns text. Mica's useful output is a probability over a fixed label set.

## What the agent package returns

Repository: `C:\Users\mikes\WebstormProjects\agent`, package `@orkestrel/agent`. Guide: `C:\Users\mikes\WebstormProjects\scaffold\guides\agent.md`.

`ProviderInterface` in `src\core\types.ts` has `generate` and `stream`. Both return a `ProviderResult`: `content` (string), optional `thinking`, optional `tools` (`ToolCall[]`), and optional `usage` (`TokenUsage`). `ProviderDelta` is `content` or `thinking` text. `ProviderStreamOptions` carries `think` and an optional JSON schema. There is no logprob field, no label distribution, and no question id.

The guide's opening says an `Agent` drives context, then the provider, then tools, then repeats until the model stops. The model itself is the one thing the package does not supply. A tool is loop machinery and is never rendered into the prompt. The loop advertises tool definitions and dispatches the calls that come back.

## What the Ollama provider sends

Repository: `C:\Users\mikes\WebstormProjects\ollama`, package `@orkestrel/ollama`. Guide: `C:\Users\mikes\WebstormProjects\scaffold\guides\ollama.md`.

`OllamaProvider.body` in `src\core\OllamaProvider.ts` always sets `stream: true`. `generate` drains that same NDJSON path. The guide says neither call can report content the other would not. `WireChatRequest` in `src\core\types.ts` is `{ model, messages, stream, keep_alive, think, options?, tools?, format? }`. It has no `logprobs` field and no `top_logprobs` field. `read` extracts content, thinking, tools, and usage. Logits never become a `ProviderResult`.

The guide's live model for the service tests is `qwen3.5:2b-q4_K_M`. That is a generator. It matches the contract.

## What the desk does instead

The desk keeps `qwen3.5:2b-q4_K_M` as the generative provider (`AGENT_MODEL` in `C:\Users\mikes\WebstormProjects\desk\app\core\constants.ts`). `ollama list` on 2026-10-05 also showed `qwen3.8:latest` installed. The desk does not select it. Mica is called beside the loop, by `fetch` to `POST /api/chat` inside `Desk.#readJudge`, with the logprob fields `WireChatRequest` does not have. Spoken turns go through `createOllama` and `createAgent` in `Desk.#speak`. That split is the point. The decision path needs the top-20 list. The speech path needs `content`.

The first live desk script was `C:\Users\mikes\WebstormProjects\ollama\tmp\mica\desk.ts`. That path is absent. `git log -- tmp/mica/desk.ts` in the ollama checkout returned no commits, which fits a file that lived under gitignored `tmp` and was later deleted. This writing pass did not re-run that script.

The campaign recorded what that script showed. The 2B model called a `judge` tool on the first attempt. The tool judged a fixed ticket even when the model shortened the argument. The reply named billing and also said it could not process the refund. That contradiction is why the decision, not the prose, is the stable part. Design conclusion: a tool handler that judges a ticket must use the argument the model actually passed, or the code must document that it judges a fixed ticket. A handler that ignores a shortened argument will answer a different question than the one the reply discusses.

## What not to change

Design conclusion, not a change to either repository. Do not extend `OllamaProvider` so that logprobs pretend to be chat content. Do not add logits to `ProviderResult`. A sibling decision client is the shape that keeps both contracts honest. The fields of that client are listed in [agent.md](agent.md). They are not implemented.
