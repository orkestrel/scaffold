# U7f — the Button portfolio verdict (round 3, narrow: items 4 and 10)

## What changed and why

This brief supersedes `u7f-verdict-brief-2.md` for round 3; the round-1 brief's items
stand under their numbers and round 2's rulings are in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u7f-verdict.md`. Round 2 proved every
item except two on the Elements harness record: item 4 (the padded ring frame was shot while the
ring's `box-shadow` was still transitioning in, so its recorded alpha and width were transitional)
and item 10 (the `# Toggle` snapshot was taken at rest, after the restoring click). Harness brief 4
(`units/u7f-harness-brief-4.md`, report `units/u7f-harness-report-4.md`) settles the `box-shadow`
before the focus-ring shot and records the settled value, and appends the toggle section's
snapshot while the host is pressed (`# Toggle`) beside the rest snapshot (`# Toggle (rest)`).
Round 3 rules items 4 and 10 only, against the round-4 Elements portfolio under
`C:/Users/mikes/WebstormProjects/scaffold/tmp/capture/elements/` and Veneer's unchanged round-2
portfolio under `C:/Users/mikes/WebstormProjects/veneer/tmp/capture/`.

## Items

4. Focus: Elements' padded ring frames (`elements-button-primary-focus-ring--<variant>.png`) and
   the settled `box-shadow` in each `<variant>-steps.jsonl` against Elements' declared ring
   (`_focus.scss`: the fill at 45% in `oklab`, width `0.1875rem`; the scout's reading), and
   against Veneer's ring (one value on every specimen, `2.2797` light and `2.3587` dark in
   `tmp/capture/<variant>.txt`). Rule whether the settled reading now matches the declaration
   and whether the two rings are the same treatment.
10. The tree: Elements' `# Toggle` snapshot announcing the host pressed and `# Toggle (rest)`
    announcing it at rest, against Veneer's arrival tree and pressed-moment trees in
    `tmp/capture/<variant>.txt`. Rule whether the pressed and disabled announcements are now
    comparable on both sides.

## Lanes and output

The objective state-truth lane (`analyst` on Astra, the two focus-ring frames attached) rules
item 4 and refers item 10 with evidence; the mechanical inventory lane (`checker` on native
Sonnet) rules item 10 and refers item 4. Each returns the fixed shape: one line per item
(`RENDERED-PROVEN(<capture>)`, `REGRESSED(<capture>, <what>)`, or `NOT-EVIDENCED(<what the
portfolio lacks>)`), referrals, and exactly one terminal line, `CONVERGED` or
`ANOTHER ROUND(<items>)`. No process diary.
