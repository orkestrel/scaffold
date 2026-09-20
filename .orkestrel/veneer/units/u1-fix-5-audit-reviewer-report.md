# U1 round-5 audit report, objective lane (reviewer, native Opus 5, 2026-09-20, 338 s), Veneer `bd4284c..e9f2a2f`

**N8, N9, N10 — closed** (every module-scope declaration exported with a `matches*` predicate form and a third-person TSDoc; the splitter tracks quotes and clamps depth, proved on the three fixtures; the scanner's `@returns` and `@throws` match the code).

**The amended ruling — implemented to its letter**, R1 to R5 as ruled, with every brief-6 fixture present.

**Splitter — CONFIRMED** (limit, not a defect: an escaped quote inside a string re-opens quote state).

**TSDoc — partly confirmed** (N13, N14, N15).

## Findings

**N11 (required).** The value is never lowercased (`tests/setupStyles.ts:148-150`, `:160-168`): `text-align:RIGHT` and `float:LEFT` escape; `margin:0 1PX 0 1px` is flagged. A regression from `bd4284c`, which lowercased the value.

**N12 (required).** An unspaced `/` is not a radius side separator (`:114-116` uses `indexOf('/')` over tokens): `border-radius:1px 1px/2px 2px` is flagged though neutral; the built cascade is minified, so the form is real. Emit a top-level `/` as its own token.

**N13 (required, low).** `EDGE_KEYWORD_PROPERTIES` and `SIDE_KEYWORDS` route to identical branches while their docs claim different rules; `float` and `clear` are not edge properties. Merge them.

**N14 (required, low).** `matchesDirectionSensitive`'s `@returns` defers to a campaign brief instead of stating its condition.

**N15 (low).** The radius `@returns` two-token clause omits its arity.

**N16 (low).** The retained report keeps successor 5's deviation and the `undefined` reading for the fixture successor 6 flipped, without pointing to the correction; a count and a temporal `now` remain.

## Referrals

The `EDGE_KEYWORD_PROPERTIES` shape (ruled: merged); R6 — gradient directions, shadow offsets, transforms are outside the ruled property list (ruled: a recorded limit until U3).

Verdict: fix round — N11 and N12 force it, with N13 to N16 carried into the same successor.
