# U1 round-6 audit report, objective lane (reviewer, native Opus 5, 2026-09-20, 279 s), Veneer `bd4284c..b661142`

## N11 to N16 — all closed at their sites

N11: `tests/setupStyles.ts:171` lowercases the value once before splitting; `:194` emits `decl.value` in postcss's case; `text-align:RIGHT`, `float:LEFT`, `margin:0 1PX 0 1px` read as ruled (`setupStyles.test.ts:137-141`). N12: `:81-86` emits a top-level `/` as its own token after the quote branch (`:64-72`); `calc(1px/2)` stays whole; pinned at `:68-71`, `:142-147`. N13: one `SIDE_KEYWORD_PROPERTIES` (`:41-47`) and one branch (`:173`); `float` and `clear` gone from the longhands; fixtures kept. N14: `:164-167` states the full condition. N15: `:112` names the two-token side. N16: supersession notes at report `:294` and `:340`; no "now flags"; `## Successor 7` appended.

## The ruling of briefs 5 to 7 — implemented exactly

Every fixture traced by hand reads as ruled. Unlisted forms: `border-radius:1PX 2PX` flagged (case-insensitive compare, original-case output); `margin:0 1px 0 2px/` permitted (five tokens; no edge property takes a top-level slash); `border-radius:1px/` and `:/1px` permitted without throwing; `background:url("x/y.png") left` flagged (the quote branch precedes the slash branch); `inset:0 calc( 1px ) 0 calc(1px)` flagged by the ruling's textual comparison though neutral — N17.

## Names — no collision

A case-insensitive search over every hosted guide for the ten exported names returned nothing; the nearest ecosystem capabilities (`extractStyles`, `readStyle`, `readBrowserStyleCoverage`) scan no declaration text for direction sensitivity.

## New findings, non-blocking

N17 (low): the edge comparison is textual (`:100-105`). N18 (low): the limit sentence at `:185-186` understates the gap inside a covered family — a percentage or length background position escapes. N19 (cosmetic): a wrapped clause in the radius `@returns` (`:112-114`).

## Unresolved from this lane

The gate readings and the cascade case rest on the verifier (settled green, `u1-gate-report-6.md`); the name list and status confirm the unit wrote nothing outside its owned files.

## Referral

Round 6 at one seam: `quality.md` § Rounds and verdicts caps the depth search; N17 and N18 are unreachable while the cascade declares nothing — carry to U3 or open a ruling.

Verdict: accept — N11 to N16 are closed at their sites, the shipped guard implements the ruling of briefs 5 to 7 on every traced fixture and on every unlisted form, no exported name collides with a hosted guide, and N17 to N19 are non-blocking limits for U3 while the gate readings stand on the verifier.
