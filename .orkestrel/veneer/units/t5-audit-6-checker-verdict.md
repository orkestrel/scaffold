# Verdict — T5 audit round 6, checker (claims 1, 3, 5, 6)

## Numbered verdicts

**1. Scope and gates — CONFIRMED**
- `t5-6-status.txt:1-4` lists exactly `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/src/browser/helpers.test.ts` — matches the claim's list exactly.
- `t5-instruments-6/t5-6-types-unchanged.log.txt:1`: `types.ts hunk identical in t5-5.diff and t5-6.diff: True` — confirms `src/browser/types.ts` carries only its round-5 change.
- The "unit gate" is `t5-instruments-6/t5-6-gates.sh:5-15`, which writes exactly `t5-6-gate-format.log.txt`, `t5-6-gate-lint.log.txt`, `t5-6-gate-check.log.txt`, `t5-6-gate-file.log.txt`, `t5-6-gate-browser.log.txt`. Each ends `exit 0`: `t5-6-gate-format.log.txt:5`, `t5-6-gate-lint.log.txt:5`, `t5-6-gate-check.log.txt:21`, `t5-6-gate-file.log.txt:11`, `t5-6-gate-browser.log.txt:49`.
- `t5-6-criterion5.log.txt` (exit 1, no match, twice) is not written by the unit gate script and so is outside this claim's scope; it is a separate criterion check, not a "gate log ... that a unit gate wrote."

**3. The proofs bind — CONFIRMED**
- `t5-instruments-6/t5-6-mut-unbounded.log.txt:6-76`: 3 failed — the fractional-top, fractional-left, and already-ends-inside-fractional-window cases (the three new `computeOffset` cases) — 372 passed, matching the report's table (`t5-test-frame-report-6.md:105`).
- `t5-instruments-6/t5-6-mut-noceil.log.txt:6-56`: 2 failed — "rounds a fractional bottom edge up" and "moves the frame up and left for an element past both edges" (fractional-bottom and both-edges), 373 passed.
- `t5-instruments-6/t5-6-mut-nudge.log.txt:8-19`: first failure is "keeps the hover a resting pointer paints on the element it shoots" (the resting-pointer hover proof), among 7 failed, 368 passed.
- `t5-instruments-6/t5-6-mutations-summary.log.txt:1-73` (final series): every round-5 mutation (`origin`, `nomove`, `scrolltop`, `nooffset`, `nocomposite`, `widened`, `noscrollback`) reddens the proof named in the report's mutation table (`t5-test-frame-report-6.md:96-105`).
- `t5-instruments-6/t5-6-digest.log.txt:1-5`: before digest `bdad0a88…` equals after (`OK`), `check exit 0` — the final test file is unchanged across the final series.

**5. The rename (F2) — CONFIRMED**
- `t5-6.diff:1004-1023` (test file): the hover proof's title is "keeps the hover a resting pointer paints on the element it shoots"; it uses `hoverAccessible`, not `holdAccessible`, and holds no button.
- `t5-instruments-6/t5-6-criterion5.log.txt:5-8`: `holdAccessible('Held')` cases remain unchanged at lines 1003, 1005, 1011.
- `t5-6.diff:3706-3730` (guide hunk): the `computeOffset` coverage sentence enumerates all 11 new cases (inside window; touching/above origin; fills window; past bottom; fractional bottom rounded; fractional top; fractional left; already-inside fractional window; past right; past both edges; too large), and the `captureFrame` coverage sentences name every new case (panel, below, half/share, tall-element, over, scoped, unstyled, resting/scroll pairs, both-edges, origin, fill, clamped, shadow-svg, contained-svg) plus the renamed proof: "A hover placed after staging on an element at the tester's top-left corner stays in the frame."

**6. The consumer — CONFIRMED**
- `t5-instruments-6/t5-6-build.log.txt:78`: `build exit=0`.
- `t5-instruments-6/t5-6-guides.log.txt:11,15`: `Tests 51 passed (51)`, `exit=0` — the Test guide gate passes.
- `t5-instruments-6/t5-veneer-probe-6.log.txt:4-10`: tarball packed, installed over registry `0.0.23` at Veneer `3203369`, round-6 build markers present (`park outside 1, bounded move 1`), `journey:light-390 exit=0`, `62 passed (62)`, `journey:dark-1280 exit=0`, `62 passed (62)`.
- `t5-veneer-journey-6-light-390.log.txt:76-81` and `t5-veneer-journey-6-dark-1280.log.txt:76-81` corroborate both journeys' `Tests 62 passed (62)` and `exit=0`, with the probe script `t5-veneer-probe-6.sh:19-22` showing the Vite dependency cache was deleted and rebuilt from the swapped tarball before the journeys ran.

## Findings fitting no claim

None found in the read evidence.

## Attacked and held

- Claim 1: attacked on whether `t5-6-criterion5.log.txt`'s `exit 1` readings break the "each 0" clause. Held — `t5-6-gates.sh` (the unit gate) never runs those greps, so that log is outside the claim's scope; the logs the gate script itself wrote all end `exit 0`.
- Claim 3: attacked on whether `unbounded`'s 3 failures are exactly "each new case" rather than a subset or superset. Held — the 3 failing titles in `t5-6-mut-unbounded.log.txt` are exactly the 3 new cases named in the report.
- Claim 5: attacked on whether the guide's coverage sentence omits any new or renamed test title present in the diff. Held — every added `it(...)` title under `computeOffset` and `captureFrame`, and the renamed hover title, has a corresponding phrase in the guide hunk.

VERDICT: PASS
