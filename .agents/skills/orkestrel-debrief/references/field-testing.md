# Field testing an agent-facing surface

The method for producing the live evidence a debrief judges by. It ports to any surface a
model consumes.

## The tier ladder

Test from the top down, and do not stop at the tier that passes. Map each tier to an engine
per `.agents/orchestration.md` § Roles and name the map in the dispatch.

1. **Frontier** (the harness's default engine) — proves the surface works at all.
2. **Mid tier** — proves the surface survives a harness's schema abbreviation and an engine
   that reads less carefully.
3. **Small native** (the mechanical roles' engine) — the acceptance tier: it must walk the
   surface unaided, or the surface is not done.
4. **Local floor** (a small quantized model through a real tool-calling client) — not an
   acceptance gate; a stochastic probe that exposes teaching gaps nothing else hits. Its
   residual failures must be provably consumer-floor (malformed emission, attention loss),
   never surface darkness — every refusal it received must have named the fix.

## The pass discipline

- **Goal-only prompts.** State the outcome, never the shape: no field names, no schema
  hints, no tool names beyond the surface's own. The teaching surface must carry
  everything else. Identical wording across models; only identifiers vary.
- **Fresh state per round.** New workflow/resource ids each round; a fresh server on the
  exact build under test. Never let a model inherit a sibling's residue.
- **No coaching, no retries by hand.** The transcript ends when the model finishes or its
  cap fires. A human nudge invalidates the pass.
- **Caps and journals.** Every pass runs as a tracked background command under a hard
  time cap with its transcript journaled; the journal is the evidence of record.

## Capture the reasoning, not the calls alone

Where the runtime exposes thinking (local runtimes expose it directly; harness stream
formats carry interstitial text), record it. The call log shows WHAT failed; the trace
shows WHY — and the why is what the fix targets.

## The confusion-signature catalog

Read every trace against these; each maps to a class of surface fix:

| Signature               | What it looks like                                                     | The fix class                                                                                              |
| ----------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Rationalized silence    | The model meets an anomaly, invents a plausible cause, reports success | A silent path must refuse loudly; false affordances removed                                                |
| Guess loop              | Repeated invented shapes with no reading between attempts              | The critical shape belongs in the description text, stated early                                           |
| Abbreviation blindness  | The model names what it cannot see ("the abbreviated schema")          | Teaching moved to the surface every harness shows intact                                                   |
| One-correction-per-step | A refusal names two defects; the model fixes one and keeps the other   | Refusals name ALL missing and unexpected items every time                                                  |
| Opaque-wall regression  | A correct structure abandoned after an unnamed refusal                 | Every refusal names the subject, path, expectation, and candidates                                         |
| Repetition fixpoint     | The identical failing call repeated verbatim                           | The refusal must change the caller's information state; if it already does, the residual is consumer-floor |

## Judge the fix

Rule each fix against `.claude/rules/documentation.md` § Agent-facing surfaces.

## The scoreboard

Report each round as a table: model, harness, calls, failed calls, outcome, and the
delta from the prior round. A tier passes when its models complete the goal with zero
failed calls and no out-of-band reading (no source excavation, no filesystem search —
watch for it in the transcript; it means the surface leaked its teaching job to the
repository).

A re-film that drives the surface with live models is a field pass: it carries the
scoreboard and each lane's journal path like any other round.
