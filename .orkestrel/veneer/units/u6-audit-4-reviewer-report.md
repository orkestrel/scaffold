# U6 audit round 4 — objective lane (reviewer, native Opus 5, 2026-09-20, 497 s)

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | CONFIRMED | `constants.ts:198-205` `MEDIA_STAGE` in place with the bit-string remark; `helpers.ts:2629-2638` records before the first send under a `hasAttribute` guard; `:2717` parses it back in the same order; marker retention across a second stage driven at `helpers.test.ts:3487-3511`. |
| 2 | CONFIRMED | marker path `:2716-2739` (explicit-emulation send, per-axis wait, remove after agreement); no-marker path `:2741-2753` (baseline captured after the awaited reset); the voice on both paths; no pre-reset seed. |
| 3 | CONFIRMED | colour scheme `:3430-3446`, forced colours `:3448-3464`, all-axis `:3482-3512`, stable-after-unstaged `:3551-3567`; the fence and its transcription clear first. |
| 4 | CONFIRMED | `:2624-2625` are the only option reads; no accessor fixture; `guides/test.md:1626-1628` states the bound. |
| 5 | CONFIRMED | `:2670-2685` inner `try`/`catch`; the refusal is the only voice either path produces; the two budgets stated. |
| 6 | CONFIRMED | marker set after the awaited press `:592-600`; release-on-miss kept; the remark corrected; the case `:945-968` discriminates (`[[false]]` against the red control's `[[true]]`); `AggregateError` carries the release rejection. |
| 7 | CONFIRMED | every bound stated; parity read by hand for each changed row; the voice row; `test:guides` green in the writer's log. |
| 8 | CONFIRMED | red and green logs per control on one command each; the case populations match the tree; no plant survives; status lists the six files. |
| 9 | CONFIRMED | one `cdp()` site; every prior contract intact; six files with `types.ts` and `tests/setup.ts` each one unchanged hunk; no forbidden syntax; every added declaration exported. |
| 10 | UNDECIDABLE | no round-4 verifier report in this lane's inputs (the Orchestrator's `units/u6-gate-report-4.md` closes it). |

## Findings outside the claims

11. `helpers.ts:602-605`: the missed-press `releasePointer()` sits outside a `try`, so a release
    rejection replaces the missed-press voice. A bound.
12. `:2735-2739` with `guides/test.md:1630-1632`: an exhausted release keeps `MEDIA_STAGE` for a
    retry and no sentence says so. A bound.
13. `:608-623`: `releasePointer` carries no `@throws` after this round changed its failure shape.
    A bound.
14. `helpers.test.ts:962`: an assertion runs before any hold and cannot fail, under a case name
    that promises a rejected press through `holdAccessible`. A bound.
15. `helpers.test.ts:1127`, `:3581`: sentinel strings carry the unit identifier `U6`. A bound.

Verdict: accept.
