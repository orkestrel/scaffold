# System One, Mica, and the desk

Research record for `@orkestrel/agent`, written 2026-10-05. It exists so a later change does not fold a decision distribution into `ProviderResult`. The chat provider stays a generator. A decision client, if one is built, stays a sibling.

Two kinds of sentence appear in the files that follow.

- A measured fact names the page, file, command, or test it came from.
- A design conclusion is a ruling for this codebase. It is not a claim that a model or a package already behaves that way.

TypeSafe pages were fetched from the index at [https://docs.typesafe.ai/llms.txt](https://docs.typesafe.ai/llms.txt) on 2026-10-05. Mica sources were fetched the same day from [the Hugging Face card](https://huggingface.co/sky7350/Mica-v0.1-4B) and [the GitHub tree](https://github.com/akivet/Mica-v0.1-4B). Local claims cite the desk, agent, and ollama checkouts, or a command run that day.

## Index

- [System One and Jev](system-one.md) records the hosted model, the three question types, the published confidence formulas, the jaggedness list reviewed 2026-10-02, and the open models that are similar and are not Jev.
- [Mica on this machine](mica.md) records the 4B readout, the official server contract, and the Ollama path the desk actually calls.
- [Why this stays outside ProviderInterface](provider.md) records the agent and ollama contracts and the desk split between `qwen3.5:2b-q4_K_M` and Mica.
- [The desk application](desk.md) records the Vue app, the stream, the policy phases in the current source, and the fixture outcomes measured from that source.
- [How the other packages fit](packages.md) records each package boundary in the guide's own terms, then the desk fixtures as use cases.
- [What would improve the agent](agent.md) records recommendations. None of them are implemented in `@orkestrel/agent`.
- [Refactor the agent, and stage the living context by consumer](context.md) rules, on 2026-10-07, that the agent package is refactored in place rather than split into a context package, and stages the living-context capability by consumer.
- [The judge and the selection seam](refine.md) rules, on 2026-10-07, how the System One decision model enters the agent as a judge contract with an Ollama logprob wire, how a conversation records judgments with provenance, and how a selection seam and a stock selection refine the context without a toggle or a package; it records the Mica probes, the two blind design lanes, and the plan. Its § Scope at dispatch records the loop defect the small-model campaign found the same day (a scoped-out tool was callable) and the rule agent 0.0.28 ships, which the selection round keeps.
