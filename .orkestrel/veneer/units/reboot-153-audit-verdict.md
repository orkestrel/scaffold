# REBOOT-153 audit — verdict

The Orchestrator's reconciliation of the audit over REBOOT-153 (`reboot-153-audit-claims.md`): the objective lane,
`analyst` on GPT-6 Astra (`reboot-153-audit-objective-verdict.md`, thread `01a0d7ab-0d11-7982-a279-9073482a1e58`), and
`checker` on Sonnet (`reboot-153-audit-checker-lane.md`). The Items were written by the Orchestrator on Opus 5.5 and
applied by `builder` on Sonnet, so Astra wrote none of it. The subjective lane did not run: the code is a fixed Item
the Orchestrator named, and its judgment is whether its claims are true, which is the objective lane's.

**Verdict: FAIL 2, 3, 5.** The Items, the proof's red, and the gates hold (claims 1, 4, 6; checker PASS on every
Item).

- **Claim 2, UNRESOLVED.** The mechanism holds, and the Orchestrator's probe settles the Chromium 141 half: that build
  computes an outline width and each border width whose style is `none` or `hidden` at `0px`, and keeps a solid width
  (`r153-instruments/probe/probe-141.log.txt`, `probe.mjs`, asserted), so the normalization leaves every Chromium 141
  reading unchanged. The Chromium 153 half rests on the engine session's reading, which records the differing
  `outline-width` and no raw widths; the engine's re-read after the landing, already requested in `plan.md`, settles
  it.
- **Claims 3 and 5, BROKEN, the Orchestrator's text.** The doc block and the guide sentence say Chromium 153 computes
  such a width "at its declared length" for borders as well as outlines. Nothing measured a Chromium 153 border width,
  and CSS Backgrounds Level 3 gives a `none` or `hidden` border width a computed `0px`. The same recurring defect: a
  build claim wider than its measurement.
- **Claim 4, a gap in a CONFIRMED claim.** Removing the `border-top-width`, `border-right-width`, or
  `border-bottom-width` mapping alone survives the case, because none of those inputs has a non-painting style and a
  nonzero width.

## Carriers

`reboot-153-brief-2.md` (`builder` on Sonnet, over the checkpoint `4574c58`) carries claims 3 and 5 (Items 1 and 2,
which state the reason without a build claim) and the claim 4 gap (Item 3). Claim 2's Chromium 153 half is carried by
the engine session's re-read in `plan.md`.
