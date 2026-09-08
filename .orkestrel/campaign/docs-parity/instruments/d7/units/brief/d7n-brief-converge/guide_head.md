# Brief

> The specification compiler: a synchronous, deterministic pipeline that resolves a rough
> request into a `Brief` — a closed, content-hashed execution contract another agent can run
> with no interpretation left to do — gated by a traceable reasoner and projected into every
> downstream artifact.

You cannot make a model's sampling deterministic from a prompt, but you can make the task
deterministic: resolve every implicit decision ahead of time and pin the result with
mechanical proofs, so any correct execution is equivalent under the contract. The `Brief`
is that resolution as plain data, and the module is deliberately mechanism, never policy.
The judgment calls — which files, which outcomes, which proofs — belong to the caller,
whether a human or an agent. This module supplies the closed vocabularies, the exact-record
validation, the fail-closed gate, the deterministic pinning, and the lossless projections.
Separating the _what_ from the _how_ is the whole design: `outcomes` and `proofs` pin the
result's shape and its transcript-provable evidence, while the method stays free unless the
method itself is the requirement.

The forward path: raw text runs through an injected `@orkestrel/interpret` pipeline, its
`Interpretation` is drafted into brief sections (intent to `task`, entities to `givens`,
ambiguities to `gaps`), caller-supplied sections merge over the draft, the fail-closed gate is
evaluated as a reasons `LogicalDefinition` — a traceable verdict, never an ad-hoc `if` — and a
passing brief is pinned, with `trace` and `hash` derived rather than authored. The reverse
path: `briefToMarkdown`, `briefToGoal`, and `briefToDispatch` project the pinned brief into
its downstream views, each derived from the one contract rather than written beside it.

Nothing here is an LLM, provider, or agent: the markdown a projection renders is for an
external model, never consumed internally. A brief with blocking gaps yields a visible
incomplete `Briefing` carrying the questions, because a half-specified brief is worse than a
question.

Every discriminant names its axis, never `kind` or `type`: `stage` splits the pipeline
phases, `severity` splits risks, and `code` splits coded errors. A record whose container
already fixes what it is, like a referenced path, or whose candidate vocabulary was neither
closed nor disjoint, like a cited source, carries no discriminant at all.

Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
