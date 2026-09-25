# STATES audit round 2 — verdict

The Orchestrator's reconciliation of the second audit round over STATES round 2, on one claims file
(`sts-audit-2-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`sts-audit-2-objective-verdict.md`, journal
`tmp/codex/sts-audit-2-analyst.jsonl`), and the subjective lane, `reviewer` on Opus 5.5
(`sts-audit-2-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so the objective lane ran
on an engine that did not write the work. No checker ran: no claim is a mechanical count or path.

**Verdict: FAIL 7; outside the claims: F1.** Claims 1 to 6, 8, and 9 are CONFIRMED by both lanes.

- **Claim 7, both lanes BROKEN, one fix.** `guides/veneer.md` § Form range classes says the gated rule "declares
  `transition-property: none` and a `0s` duration and nothing else". The mixin emits the shorthand `transition: none`
  (`src/styles/_mixins.scss`, the `transition` mixin, around line 360), which also sets the delay and the timing
  function, and the assertion admits every `transition-*` longhand. Both citations resolve. The sentence becomes the
  reviewer's text, which states the one declared property and matches the three declaration assertions.
- **F1 (subjective), accepted.** On exhaustion, `retryUntil` renders the last value through `JSON.stringify` and cuts
  it, so the producer's `frame` bytes, listed first, push out the `started` and `held` readings the refusal exists to
  report. The producer returns `{ started, held, frame }`.
- **R1 (subjective referral), dropped on the record.** The `readCentre` proof compares device-pixel arithmetic with
  `toStrictEqual`. This container's ratio is 1, where both sides are integers; the proof runs only in the `setup:browser`
  project on this host and the engine session's host, and a fractional-ratio host is not in the fleet's receipts.
- **R2 (subjective referral), dropped on the record.** The unit's gate script recorded the Vitest status of a
  build-then-run group. The authoritative landing chain runs `npm run test:src:styles`, which stops on a failed build.

## Carrier

STATES round 3 (`states-brief-3.md`, `builder` on Sonnet): the claim-7 sentence and F1, verbatim; then a `checker` read.
