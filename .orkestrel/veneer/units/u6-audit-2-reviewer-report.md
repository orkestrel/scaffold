# U6 audit round 2 — objective lane (reviewer, native Opus 5, 2026-09-20, 498 s)

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | CONFIRMED | `helpers.ts:581-582` are the first two statements, ahead of `resolveAccessible` `:583`; the marker is written `:590` before the press `:591-598`; the absent-second-name case `helpers.test.ts:1026-1032` reads the double-hold voice. |
| 2 | CONFIRMED | `helpers.ts:620-633` gates `mouseReleased` on the marker alone; idle release `helpers.test.ts:1069-1072`; hook cases `:1099-1109` green in `u6-3-test-src.log:44`. |
| 3 | CONFIRMED | `helpers.ts:2610-2624` re-sends the three features; cases `helpers.test.ts:3381-3401`, `:3403-3423`, `:3366-3379`; `u6-3-axes-green.log:10`. |
| 4 | CONFIRMED | every change-and-restore media case stages `motion: reduced` (`:3353`, `:3375`, `:3393`, `:3415`, `:3448`, `:3460`); see finding 14 for the host-dependence of the other axes. |
| 5 | CONFIRMED | description equals the `Summary` cell (`helpers.ts:2637-2638`, `guides/test.md:348`); `Bounds` names the cleared override `:1618-1619`; `stageMedia` `@returns` and `Limits` agree; the Bounds list is unbroken. |
| 6 | CONFIRMED | each control's red and green log carries the same command line: scale `u6-3-plant-scale-red.log:11-20` (mapped-hold rejection), pseudo `:12,17-20` (`expected '0px' to be '7px'`), release `:12,20-26` (`expected 32 to be 16`); no plant survives. |
| 7 | CONFIRMED | no `console.` in the suite; both sentinels carry the comment at `:1080` and `:3446`. |
| 8 | CONFIRMED | the four waits take the 1000 ms budget and name the awaited fact. |
| 9 | CONFIRMED | one `cdp()` site; every round-1 contract intact; six files; no forbidden syntax; `test:guides` green. |
| 10 | CONFIRMED | the independent verifier's `u6-gate-report-2.md`: chain green on Chromium, `344 passed | 2 expected fail` on Edge. |

## Findings

11. `releaseMedia` resolves before the cleared readings return; the description, the `Bounds`
    bullet, and the guide fence say otherwise, and this round's own log
    (`u6-3-axes-readings.log:16,24-28`) falsifies the promise.
12. `stageMedia`'s read-back is single-shot (`helpers.ts:2627-2633`), so the same lag reddens a
    correct stage.
13. `stageMedia`'s refusal path calls `releaseMedia` (`:2630`), destroying the provider overrides
    the same call carried forward.
14. The unnamed-axis cases stage a constant (`dark`, `active`) rather than the inverse of the
    probed reading, so they are vacuous on a host already in that state — the defect class round 1
    recorded on the motion axis.
15. `releasePointer` removes the marker before the release lands (`:621-632`), so a failed send
    leaves no record and the next hold presses again with the button down.
16. The guide fence (`guides/test.md:2831-2841`) instructs recording the engine's own preference
    "with no override in place" and clears nothing first.
17. `stageMedia`'s `@remarks` says "Omitted axes stay unchanged" while the call carries three
    features, so any other emulated feature is cleared.

Verdict: fix round — no claim refuted; findings 11, 12, 13, and 14 force it.
