# U3-policy audit round 6 — objective lane (reviewer, native Opus 5, 2026-09-20, 415 s)

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | CONFIRMED | `tests/setupPolicy.ts:2069-2073`; `isPolicyMirror` body `:2050-2053` unchanged; the four accountings agree across the message, the membership string, and `guides/scaffold.md:1153-1155`. |
| 2 | CONFIRMED | `:2005-2016`: absent-index guard, CRLF folded, `stripPolicyCode`, per-call matcher, first-link order with dedupe, `groups?.angled ?? groups?.bare`; remarks name the three limits; `POLICY_INDEX_FILE` derives at `:411`. |
| 3 | REFUTED | the pattern holds (distinct names, ES2018, accepted and rejected sets as claimed, no nested quantifier); the description does not: the remark at `:380-381` says the angle branch alone admits a fragment while the bare branch does too (`tests/policy.test.ts:705-707`), the case title at `:715` repeats it, and `:373` lists the `./` prefix with no branch attribution though `<./sample.md>` is refused. |
| 4 | CONFIRMED | each row named with the change that would redden it; each membership names the region its fixture writes. |
| 5 | CONFIRMED | every new assertion is checkout-independent; a fresh target's generated index (`src/core/templates.ts:2370-2385`) links only parent paths, so `readPolicyIndex` returns `[]` there; the `absent.md` control is a bound (finding 11). |
| 6 | CONFIRMED | optional chaining and `??` only; no inner function; every new declaration exported with a one-sentence description; banned terms only as fixture data; the count phrases name closed members. |
| 7 | REFUTED | the names fit, but "an index link is the workspace's own claim to author that guide" is false of the file that ships it: `guides/README.md:52-63` links every mirror and `:65-66` disclaims authoring them. The mechanism is right for the case it exists for (`veneer/guides/README.md:17,31` links `tokens.md`). |
| 8 | UNDECIDABLE | read-only lane; the gate readings are the Orchestrator's. |

## Findings

9. The ruling is false of the file that ships it and the drift sentence overclaims: a
   de-registered mirror the index still links is term-swept and, carrying no banned term,
   reports nothing where before it reported a stray. Forces the round.
10. Two words for one concept: the message says "the map" while every new remark, membership
    string, and export says "index". Carry into the round.
11. Bound: the `guides/absent.md` control against the live root also assumes the target's index
    links no guide named `absent`.

Verdict: fix round — claim 3, carrying findings 9 and 10.
