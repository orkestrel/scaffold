# Routing amendment: Claude budget constraint

Recorded 2026-08-22 on the user's standing instruction: Claude-model tokens are
scarce, so route to GPT-5.6 Sol and Cursor Grok wherever a unit can run there, and
spend Opus 5 only where nothing else can do the work. The user's current instruction
outranks this file set's default engine split, and this amendment records the
substitution rather than letting it happen silently.

## What changes

| Unit | Planned engine | Amended engine | Note |
| --- | --- | --- | --- |
| fetch-U4, the verbs | Opus 5 | Opus 5 | In flight at the amendment; stopping it discards unwritten work. Unchanged. |
| fetch-U5, guide narrative and release note | Opus 5 | GPT-5.6 Sol | Documentation-voice work moves to Sol under the constraint. Its brief already carries the writing rules by reference and a sweep criterion with a firing control, which is what keeps voice checkable without the subjective engine writing it. |
| audit fetch-correctness | GPT-5.6 Sol | GPT-5.6 Sol | Unchanged. |
| audit fetch-design-fit | Opus 5 `reviewer` | GPT-5.6 Sol | The subjective lane keeps running; only its engine changes. |
| verifier gates | native cheap tier | native cheap tier | Command running and exit-code reporting; no reasoning spend. |
| absorption and scouting | Grok | Grok | Unchanged, and preferred wherever a question is answered by reading. |

## The adversarial pass under one engine

Both lanes still run. Per `.agents/orchestration.md` § Engine assignment, when one
engine is unavailable the remaining engine runs every lane — still separate subagents,
still clean contexts, still blind to each other, each told which perspective it holds.
A cost constraint is treated the same way as an unavailable engine here: the lanes are
not collapsed, and neither lane's absence is absorbed into the other. The design-fit
lane's brief states its perspective explicitly and forbids it from duplicating the
correctness lane, so a single engine holding both perspectives still argues them
separately.

## What does not change

The Orchestrator still reconciles and still accepts. No lane is dropped. No writer's
self-report establishes green. The verifier still runs the authoritative gates
independently.
