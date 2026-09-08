### Types

A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.

| Type | Kind | Shape | Summary |
| --- | --- | --- | --- |
| `TaskOperation` | type | `'create' \| 'refactor' \| 'debug' \| 'extract' \| 'migrate' \| 'explain' \| 'review' \| 'optimize' \| 'audit' \| 'test' \| 'document' \| 'plan'` | Names the closed vocabulary of what a brief asks for. |
| `TaskDomain` | type | `'code' \| 'writing' \| 'research' \| 'analysis' \| 'design' \| 'data' \| 'ops' \| 'other'` | Names the closed vocabulary of the subject matter a brief operates on. |
| `OutputFormat` | type | `'markdown' \| 'json' \| 'code' \| 'diff' \| 'prose'` | Names the closed vocabulary of deliverable shapes. |
| `RiskSeverity` | type | `'low' \| 'medium' \| 'high'` | Names the closed vocabulary of risk severities. |
| `BriefStage` | type | `'interpret' \| 'draft' \| 'gate' \| 'pin'` | Names the fixed compilation phases, in pipeline order. |
| `BriefErrorCode` | type | `'INTERPRET_FAILED' \| 'DRAFT_FAILED' \| 'GATE_FAILED' \| 'PIN_FAILED' \| 'BLOCKED' \| 'INVALID' \| 'DESTROYED'` | Names the machine-readable reasons a `BriefError` carries. |
| `Task` | interface | `{ operation, domain, statement }` | States what the brief asks for, in one imperative sentence. |
| `Reference` | interface | `{ path, note }` | Represents one referenced path and why it is listed. |
| `Manifest` | interface | `{ read, edit, locked, forbidden }` | Represents the disjoint file partitions of a brief. |
| `Outcome` | interface | `{ rank, text, required }` | Represents one ranked outcome — a result, never a step. |
| `Given` | interface | `{ category, name, value }` | Represents one context fact handed to the executor — a convention, a version, a constraint value. |
| `Example` | interface | `{ input, output, note? }` | Represents one input to output exemplar — the ambiguity remover that leaves the least to interpret. |
| `Citation` | interface | `{ name, url, note }` | Represents one external source — what it is called, where it lives, and why it is cited. |
| `Gap` | interface | `{ field, question, blocking, candidates? }` | Represents one unknown the brief has not resolved. |
| `Risk` | interface | `{ severity, text, mitigation }` | Represents one pre-empted risk and the mitigation that answers it. |
| `Output` | interface | `{ format, sections?, include?, exclude? }` | Represents the closed shape of the deliverable. |
| `Proof` | interface | `{ text, command }` | Represents one mechanical, transcript-provable check. |
| `Brief` | interface | `{ task, authority, manifest, outcomes, rules, invariants, givens, examples, assumptions, citations, gaps, risks, output, proofs, trace?, hash? }` | Represents the closed execution contract — a rough request with every implicit decision resolved. |
| `BriefInput` | interface | `{ text?, interpretation?, task?, authority?, manifest?, outcomes?, rules?, invariants?, givens?, examples?, assumptions?, citations?, gaps?, risks?, output?, proofs? }` | Represents one `compile()` input. |
| `Briefing` | interface | `{ interpretation?, brief?, questions, verdict?, stages, failures, digest }` | Represents the full, replayable outcome of one `compile()` call. |
| `Dispatch` | interface | `{ prompt, authority, read, edit, locked, forbidden }` | Represents the subagent projection of a brief. |
| `InterpretStageRecord` | interface | `{ stage, input, output?, error? }` | Records the `interpret` phase snapshot — raw text in, an `Interpretation` out. |
| `DraftStageRecord` | interface | `{ stage, input, output?, error? }` | Records the `draft` phase snapshot — the caller's input in, an unpinned `Brief` out. |
| `GateStageRecord` | interface | `{ stage, input, output?, error? }` | Records the `gate` phase snapshot — the readiness `Subject` in, the reasoner's verdict out. |
| `PinStageRecord` | interface | `{ stage, input, output?, error? }` | Records the `pin` phase snapshot — the drafted `Brief` in, the pinned `Brief` out. |
| `BriefStageRecord` | type | `InterpretStageRecord \| DraftStageRecord \| GateStageRecord \| PinStageRecord` | Represents one pipeline phase, discriminated by `stage`. |
| `BriefStageFailure` | interface | `{ stage, code, message }` | Represents a visible marker for a phase that failed. |
| `BriefRecord` | interface | `{ id, brief, version, hash }` | Represents a versioned, content-hashed `Brief` inside a `BriefManagerInterface`. |
| `BriefCompilerEventMap` | type | `{ compile, block, error, destroy }` | Declares the `BriefCompiler`'s push observation surface. |
| `BriefCompilerOptions` | interface | `{ interpret?, reason?, actions?, domains?, on?, error? }` | Represents the input to `createBriefCompiler`. |
| `BriefCompilerInterface` | interface | `{ emitter, interpret, reason } plus compile, gate, destroy` | Declares the compilation orchestrator contract. |
| `BriefManagerEventMap` | type | `{ add, remove, destroy }` | Declares the `BriefManager`'s push observation surface. |
| `BriefManagerOptions` | interface | `{ briefs?, on?, error? }` | Represents the input to `createBriefManager`. |
| `BriefManagerInterface` | interface | `{ emitter, count } plus has, brief, briefs, add, remove, destroy` | Declares the brief registry contract. |
