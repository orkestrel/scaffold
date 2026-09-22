# CL11 audit verdict — round 2, the fix round

Subject: CL11's fix round, written by `sol` on Astra over the authored CL11 tree from `0e0b055`.
Claims: `cl11-audit-2-claims.md`. Report: `units/cl11-report-2.md`.

**Verdict: accept.** Both judgment lanes accept, the checker confirmed every mechanical claim, and the
one limit each lane could not reach was closed by the Orchestrator first-party.

## Lanes

| Lane | Role and engine | Outcome |
| --- | --- | --- |
| Objective | `reviewer` on native Opus 5 | accept; all claims confirmed, two non-forcing findings |
| Subjective | `analyst` on gpt-6-astra, journal `tmp/codex/cl11-audit-2-analyst.jsonl` | accept; all claims confirmed with named mutations |
| Mechanical | `checker` on the native cheap tier | all its claims confirmed, one limit stated |
| Gates | `verifier` on the native cheap tier | taken after both judgment lanes exited |

**The lanes swapped back**: Astra wrote this fix round, so the Opus reviewer held the objective lane
and Astra the subjective one — the reverse of round 1. Every required lane ran.

## What closed, and the reading that decides it

All four forcing findings from round 1 closed, and the decisive evidence is a retained log rather than
report prose.

**The frame guard is real.** The capture-only case reads the portfolio's own accumulated absolute paths
and samples every pixel of each written image against the first, refusing a uniform frame by name. Run
against round 1's own defeating mutation — place the offscreen specimen instead of the lifted copy —
the retained red log shows the pixel assertion failing on a named path **while the property comparison
that round 1 relied on stayed green**. That is the reading round 1's guard could not produce.

**The installed contract could not have answered it, and the subjective lane proved why.** It decoded
the painted control itself and found its **bottom row uniform** while whole-image variation measured
`0.301`. The installed frame reader samples the bottom row alone, so reusing it would have reported a
painted frame as blank. Round 1 recorded this whole capability as unreachable; it was reachable, and it
also could not have been reached the obvious way.

**The controls are the real frames.** The Orchestrator closed the one limit both the checker and the
objective lane named: neither holds a shell, so neither could byte-compare the inline base64 against
the retained probe files. Extracted and compared first-party — both are exact matches. A first probe
appeared to show the blank sourced from a different file than the report names; the two blank probe
frames are byte-identical (`0dacd9b1190746ab8545bb91c9a23a4d`, 125 bytes each), so the report is
correct and the apparent discrepancy was the probe's iteration order.

**The viewport leak was reproduced and closed.** The restoration moved into `finally`, and the proof
isolates the leak rather than coinciding with it: with a planted wrong expectation still live, the
following case passes after the fix and failed before it.

**The state assertion stopped forbidding a legitimate key** while specimen, selector, and full-state-name
uniqueness all survive, and no key or state moved.

**Three false statements were withdrawn and the state table's doc block corrected** where a reader meets
it. This round's own artifacts falsify the original byte-identity claim independently: the two frames
report different variation fractions, and two files with different readings are not byte-identical.

## Non-forcing findings, carried

1. **The pixel guard is unreachable in the ordinary gate chain**, because it runs only under the capture
   flag. Inherent rather than introduced — it reads written files that exist only in a capture run — and
   the report names the skips. A later change that broke placement would leave `npm test` green.
   Carried by the unit that next owns the portfolio layer. **The Orchestrator's verifier runs the
   capture path explicitly**, so this round's acceptance does not rest on the gated case being skipped.
2. **The sampler measures against the origin pixel rather than against uniformity.** A frame blank
   everywhere except its origin pixel would pass, and a frame and its mode twin can report the identical
   fraction. No producer exists in this harness, and a genuinely uniform frame returns zero whichever
   pixel is the reference. Closing it means counting distinct values rather than differences from one
   reference — a successor's choice, not a defect shipped here.
3. **No pre-fix red log was retained** for the viewport leak, so that half exists only in the report.
   The objective lane derived it from round 1's own source shape instead, which is stronger evidence
   than a log would have been. Recorded so the next fix round retains both halves.

## Carried from round 1, unchanged

- **The "specimen" term collision** — two concepts on one module's public surface. Closing it renames
  call sites outside this unit's ownership. Carried by the unit that next owns the browser setup module.
- **The Button-family duplicate frame** — a Button-family subject this unit does not own. Carried into
  CL13's portfolio assessment.
- **The fluid container reading** — it asserts a value any unclassed element reads, and the shipped rule
  declares no maximum inline size, so it cannot fail for any change to that rule. It works as a control
  on the capped container's cap. A bound; no change owed.

## What the round proves about method

Round 1 shipped a guard that could not fail and a record saying the real guard was unreachable. Both
lanes caught it, they disagreed only on whether it forced a round, and the Orchestrator sided with the
lane that said it did. The fix round then produced, against the same mutation, the exact red the first
guard was blind to.

The two diff renderings supplied this round — cumulative and round-isolating — let the checker settle by
git blob identity which files the fix round touched, a claim a previous round's checker had to refuse
for want of the second rendering.

## Gate evidence

`units/cl11-gate-2.log.txt` carries the Orchestrator's distribution reading, taken when the registry
answered, which closed the fix round's one open item. The authoritative whole-chain run, including the
capture path that evaluates the new guard, is recorded beside it.
