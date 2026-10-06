# What would improve the agent

None of this is implemented. Do not change `C:\Users\mikes\WebstormProjects\agent` from this record. The contracts that force the split are in [provider.md](provider.md).

## Sibling decision client

Add a sibling decision client, not a change to `ProviderResult`. The client is a core face: host-independent, `fetch` only, contract guards on the JSON, abort and timeout around the call, and `TokenUsage` from `@orkestrel/budget` when the response reports token counts.

Two transports sit behind that face.

- System One HTTP for Jev (`POST https://api.typesafe.ai/v1/systemone`) and for Mica's own server (`POST /v1/systemone`). Recompute the published confidence formulas from `probabilities`. Do not trust Mica's `confidence` field or its integer `score`. See [Mica](mica.md).
- Ollama logprobs for this machine. Set `num_ctx` to 8192, `think` to false, sampler temperature to 1, and `num_predict` to 1. Apply 1.1244734010661372 to the label gaps, then softmax over the candidates only. Fail the question when a candidate label is outside the top 20. Do not invent the missing logit.

Do not put logits on `ProviderResult`. Do not extend `OllamaProvider` so that logprobs pretend to be chat content. `WireChatRequest` has no logprob field, and `generate` / `stream` return text, optional thinking, tool calls, and usage. That contract matches a generator. Mica's contract is a distribution.

## Where the loop may call it

The agent loop can call the client from a tool handler, or from a step before `generate`. The desk's first experiment showed a tool works with `qwen3.5:2b-q4_K_M`: the model called `judge` on the first attempt. The same experiment showed the hazard. The handler judged a fixed ticket even when the model shortened the argument, and the reply named billing while also saying it could not process the refund. A handler must use the actual argument, or the tool description must say that the handler judges a fixed ticket.

The desk's shipping path does not use that tool. It calls Mica before the agent loop and hands the agent a brief task. Either call site can be right. The distribution still must not be stuffed into `content`.

## What stays in the application

Confidence thresholds are product policy. Keep them out of the client. The desk's team-confidence referral uses the `below` comparison at 0.5. That cutoff, the refund gates, and the task sentences live in `app\core\policies.ts`. A client that baked in 0.5 would freeze one product's cutoff into the framework.

Online learning does not belong in the loop. Mica's weights are frozen. The [Models](https://docs.typesafe.ai/models.md) page says Jev is not fine-tuned or LoRA-adapted with customer data, and is not trained on customer requests. Record corrections. Change thresholds and criteria in code. Train another LoRA offline only as a batch, on rows collected for that purpose. Refit temperature on rows the training run did not see. The Mica card says the published temperature was fit on a calibration set, and the held-out set was written after the training data was frozen.
