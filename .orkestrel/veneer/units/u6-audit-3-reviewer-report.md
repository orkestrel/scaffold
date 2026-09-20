# U6 audit round 3 — objective lane (reviewer, native Opus 5, 2026-09-20, 406 s)

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | CONFIRMED | `helpers.ts:2685-2697`; the all-axis case `helpers.test.ts:3503-3509`; the fence clears first `guides/test.md:2847-2848`. |
| 2 | CONFIRMED | per-query `waitForCondition` `:2642-2644`; exhaustion voice `:2653`. |
| 3 | CONFIRMED on the facts; the fixture is not a mock but is an illegitimate stub | the getter at `helpers.test.ts:3467-3470` is pinned to the number and order of `options.print` reads inside `stageMedia`; reading an option more than once is itself a defect (`:2608`, `:2629`, `:2634` read `print`; `:2608`, `:2630-2631`, `:2636-2637` read `motion`). |
| 4 | CONFIRMED | `helpers.test.ts:3400-3413`, `:3418-3431`: every load-bearing assertion is against the inverse or a value recorded before the change. |
| 5 | CONFIRMED | `helpers.ts:624-640`; real `Invalid parameters` rejection at `helpers.test.ts:1074-1082`; idle path silent. |
| 6 | CONFIRMED | `helpers.ts:2594-2597`; `guides/test.md:1618-1620`. |
| 7 | CONFIRMED | Summary cells equal `:2586`, `:2658-2661`, `:607`; Voices `:1092`; bounds `:1615-1625`; `test:guides` green in the retained log. |
| 8 | REFUTED on its final clause | `previous` is seeded from the pre-reset sample (`:2685`) and the streak counts against it (`:2692-2694`); only `print` is compared to a required value; the report's own polls show the axes clear on different polls (`u6-report-4.md:16`) and an idle release resolving on poll 2 having observed no change. |
| 9 | CONFIRMED | one `cdp()` site; every prior contract intact; six files; no forbidden syntax; no control identifier in a case name. |
| 10 | UNDECIDABLE | the two Chromium runs agree (347 passed); the round-3 verifier's Edge readings (`u6-gate-report-3.md`, 347 passed twice) were not in this lane's inputs. |

## Findings

11. `stageMedia` re-reads `options.print` and `options.motion` and can queue a read-back on one
    value while sending another. Read each once. Forces a round; the accessor fixture reddens
    with the fix and must be replaced.
12. The refusal restoration (`:2646-2653`) is unguarded: a restore wait that exhausts replaces the
    refusal with `Condition "pre-call media readings restored" did not hold`, so the documented
    voice is unreachable on that path. Wrap it; throw the refusal with the restore failure as
    `cause`. Forces a round.
13. `releaseMedia` can report settled while a non-print override is still reported (claim 8).
    Forces a round.
14. `constants.ts:202` still says the release removes the marker before sending the button up.
    Forces a round.
15. A rejected `mousePressed` send leaves the marker set with no button down; the next hold
    refuses about a hold that never happened. Set the marker after the send resolves, or remove it
    on rejection before rethrowing. Forces a round.
16. `releasePointer`'s `finally` park can mask the release rejection. A bound.
17. The refusal restoration pins the pre-call readings as explicit emulation. A bound.
18. The refusal path's wall-clock is two budgets (send read-back plus restore wait) against a
    documented one. A bound; close with the guide sentence when 12 is fixed.
19. The refusal fixture is coupled to the read count (carried by 11).

Verdict: fix round — claims 3, 8.
