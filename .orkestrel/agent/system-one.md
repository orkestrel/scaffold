# System One and Jev

Jev is TypeSafe's hosted System One model. It returns typed decisions, not prose. The [Introduction](https://docs.typesafe.ai/introduction.md) states that claim, and the [System One](https://docs.typesafe.ai/concepts/system-one.md) page repeats it: a System One model understands natural-language input and returns typed decisions and probabilities rather than generated text.

## Identity, price, and context

The [Models](https://docs.typesafe.ai/models.md) page, fetched 2026-10-05, names the versioned id `jev-1.13.0`. The same page says the aliases `jev-latest` and `jev-preview` both point at `jev-1.13.0`, and that `jev-preview` has no separate preview build. An alias moves when a release ships, and confidence thresholds tuned against one version can shift with it. The response `model` field reports the versioned id that answered. Pin `jev-1.13.0` in production and move on a chosen schedule.

Every model on that page is served by `POST /v1/systemone`. The full URL in the [API reference](https://docs.typesafe.ai/api.md) is `POST https://api.typesafe.ai/v1/systemone`. Input tokens are about $0.042 per million ($42 per billion). Output tokens are free. Rate limits on that page are 100K tokens per second and 80 requests per second, and the page warns that those limits can change without notice. Context is 64k tokens per request, and 32k tokens for `state` plus the longest question. Jev ingests the state a single time and evaluates every question against it in parallel. The 64k budget covers the state plus all questions. The 32k budget applies to the state plus the single longest question.

Input is text only: a string, a JSON object, or an array of text values. Images, audio, and video are not accepted. English is the primary training language. Other languages, including CJK scripts, are accepted with lower accuracy. The same page says Jev is not fine-tuned or LoRA-adapted with customer data, and is not trained on customer requests or responses. The same weights serve every account.

Weights and parameter count are unpublished. The Models page lists price, limits, context, and input shape, and does not list a parameter count. The [architecture comparison](https://lilting.ch/en/articles/jev-clones-architecture-comparison) (2026-09-20) says Jev's mask layout, base checkpoint, and training data remain unpublished. Do not infer an architecture from a clone.

## Training

The [AI primer](https://docs.typesafe.ai/introduction/machine-learning-primer.md) names the training path RLCD, reinforcement learning for calibrated decisions. RLHF trains text people prefer. RLVR trains verifiable reasoning. RLCD trains decisions and calibrated probabilities instead of generated text. Calibration is a property of groups of predictions: outcomes assigned probability 0.2 occur about 20% of the time across that group. The primer says those rates are not a guarantee about any single answer. The System One page says the same thing about confidence.

## Primitives

The [primitives](https://docs.typesafe.ai/primitives.md) page names three question types. All three can sit in one call.

| Type | What the answer carries | Limit, from the [API reference](https://docs.typesafe.ai/api.md) |
| --- | --- | --- |
| `choice` | `choice`, `probabilities`, `confidence` | at most 255 options |
| `score` | fractional `score`, `legend`, `probabilities`, `confidence` | 2 to 10 ordered levels |
| `noul` | `noul`, a yes probability from 0 to 1 | no separate `confidence` field |

A `choice` answer's `choice` field is the highest-probability option. `probabilities` is a map of every option to a float, and those floats sum to 1. A `score` answer's `score` can land between levels. `legend` maps each level number back to its description. A `noul` answer is only the yes probability.

Question ids are caller keys. The API reference says the key is not sent to the underlying model and is not used in inference. The primitives page says the same thing: write the whole question in `instructions`, even when the id looks self-explanatory.

Questions in one call share one state, and each question is evaluated independently. Adding or removing a question does not change the other answers, because one answer is not hidden context for another. The Introduction says adding questions barely changes the response time. The Models page says the state is ingested a single time. Mica's own README uses the word prefill for that reuse; TypeSafe's pages fetched 2026-10-05 describe the same cost shape without that word. See [Mica](mica.md).

A later judgment that needs an earlier answer is a second request. The primitives page says the dependency is real only when code cannot build the second request until it has the first answer.

`instructions` and criteria accept a string, an object, or an array. The [advanced structure](https://docs.typesafe.ai/primitives/advanced.md) page and the API reference both say so. A structured instruction puts the question in one field and the data it names in others.

## Confidence

The [Confidence](https://docs.typesafe.ai/confidence.md) page says `confidence` collapses the shape of `probabilities` into one number from 0 to 1. It is a summary of the distribution, not a guarantee, and not the only summary. The formulas on that page are exact, so a caller can recompute them.

For a `choice` with `n` options, where `p_max` is the probability of the selected option:

```text
confidence = (p_max - 1/n) / (1 - 1/n)
```

Only the top probability counts. The page's example: `(0.6, 0.3, 0.1)` and `(0.6, 0.2, 0.2)` both have confidence 0.4.

For a `score` with levels numbered `0` to `n - 1`, where `m` is the most likely level:

```text
confidence = max(0, 1 - spread / MAD_unif)
spread     = sum(p_i * |i - m|)
MAD_unif   = (1/n) * sum(|i - (n - 1) / 2|)
```

`spread` is the probability-weighted distance from the peak level. `MAD_unif` is that distance for a flat distribution, measured from the middle. Probability on a neighbor lowers confidence less than the same probability on a distant level. The page's example: `(0, 0.5, 0.5)` has confidence 0.25, and `(0.5, 0, 0.5)` has confidence 0. The choice formula would give both 0.25.

A `noul` answer has no `confidence` field. The probability already carries the uncertainty. If a caller wants a number on the same scale, the page gives `|2p - 1|`. That is 0 at `p = 0.5` and 1 at `p = 0` or `p = 1`. The desk computes that quantity itself. See [the desk](desk.md).

## Jaggedness of jev-1.13

The [jaggedness page](https://docs.typesafe.ai/model-jaggedness/jev-1.13.md) applies to `jev-1.13` and was last reviewed 2026-10-02. The failure modes it names:

- Literal reading. The model answers the words written, including scoping words and negations.
- Weak counting and math. It does not count reliably, and score expectations are weak for reconstructing an exact number between levels. Keep arithmetic in code.
- Weak date order. Dates are read as text. Extract parts with a `choice`, then compare in code.
- Indirection. Double negatives and a property of a property cost accuracy.
- Irrelevant state. Unrelated detail acts as a distractor. Filter first.
- Adversarial notes inside the state. Injected instructions and text that argues for its own class can move the answer. State is data, and the model does not treat it as hostile by default.
- Contradictory instructions and criteria. A `noul` whose true criterion means no performs worse.
- `choice` option order. The model can lean toward the option that comes first. Reorder and check.
- It is not a generator. Chaining choices to force text is slow and weak. Use a generative model for prose.

The same page says to avoid hiding several judgments inside one question. The Introduction calls each question a gut-check: one judgment a knowledgeable person could make in a few seconds, composed in code when the real decision has several factors. The [how to build](https://docs.typesafe.ai/concepts/how-to-build-with-system-one.md) page says the same thing: ask independent questions together, combine them with deterministic rules or weighted sums, and route on uncertainty.

## Patterns and cookbooks

The [patterns](https://docs.typesafe.ai/patterns.md) index names speculative fan-out, confidence-gated routing, composite scoring, and intent routing. Fan-out, on the [fan-out](https://docs.typesafe.ai/patterns/fan-out.md) page, packs speculative questions into one call and lets code ignore the ones that do not apply. Confidence routing uses confidence as a second axis: the answer says what, and confidence says whether to act. Composite scoring breaks a judgment into atomic scores and combines them with weights owned by code. Intent routing classifies a request and sends it to deterministic logic, a specialist model, or a person.

The [cookbooks](https://docs.typesafe.ai/cookbooks.md) index groups worked recipes: self-consistency for `noul` and `choice`, parallel questions, re-ranking, line-by-line search, structure recovery, function calling, skill suggestion, entity alignment, RAG passage classification, citation checks, LLM guardrails, an extraction cascade, date extraction, pre-parsed value extraction, hierarchical classification, autoresearch feature discovery, and classification that falls back from a fine group to a broader division when confidence is low. Those pages are recipes for Jev. They are not measurements of Mica.

## Similar open models

These models answer typed questions and return probabilities. None of them is a reproduction of Jev. Jev's architecture is unpublished, as recorded earlier in this file. The comparisons that follow are what each project publishes about itself, plus the Mica card's accuracy table.

[Kev](https://github.com/jaredpalmer/kev) is a family on Qwen3.5 and Qwen3.8 bases (0.8B, 4B, 9B, and 27B in the README fetched 2026-10-05). The README says the API matches TypeSafe System One, questions share the text and cannot read each other, and each checkpoint ships a fitted temperature. The [architecture comparison](https://lilting.ch/en/articles/jev-clones-architecture-comparison) describes an attention mask: each question attends to the shared state and its own tokens, and does not attend to another question. That article dates the mask description to a smaller Kev-0.5B checkpoint. Treat the mask as that article's reading of Kev's code, not as Jev's mask.

[JevK5](https://github.com/allebee/jevk5) (README fetched 2026-10-05) is Qwen3.5-4B plus a merged LoRA, with a 9B sibling. The readout is SemIf's protocol: a softmax over the answer letters' next-token logits, with one temperature. The README says the model is English-only, answers up to 16 options in one pass and more in several passes, and refuses inputs over 16,384 tokens. The [landscape table](https://laya-ai.com/system-one-models) (checked by that page against project pages on 2026-10-02) describes the same letter readout and the 16-option pass split.

[Nimble 9B](https://lilting.ch/en/articles/jev-clones-architecture-comparison) is Bespoke Labs' fine-tune. The comparison says the Mac implementation caches a shared prefix that includes descriptions and choices for every question, so scoring one item can attend to another question's prompt. The CUDA path on that page processes full sequences per item. The Mica card's latency table lists Nimble 9B at p50 132 ms on an RTX 3090. Do not treat the leak as a property of every Nimble build. The article ties it to the Mac shared prefix.

[Laya](https://laya-ai.com/system-one-models) is an encoder plus decision heads (ModernBERT and mmBERT, 322M and 421M on that table), served through `laya-serve`. The architecture comparison says Laya builds a separate input sequence per question, so the document is encoded again for each question. The [Mica card](https://huggingface.co/sky7350/Mica-v0.1-4B) says Laya accepts up to 1,024 tokens, which is why many of Mica's long-input rows mark Laya as unsupported.

The Mica card's public table, cited again in [Mica](mica.md), is the accuracy comparison. It is Mica's own evaluation code against Jev 1.13, not a claim that any open model implements Jev.
