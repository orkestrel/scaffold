# B-PASSIVE-PROSE (`bpp`) audit round 3 — `checker` on Sonnet verdict (claims 1 and 3)

**Claim 1 — Delta and scope: CONFIRMED.** Every line unique to `bpp-3.diff` (not in `bpp-2.diff`) for `tests/setupServer.ts` and `tests/setupStyles.ts` sits inside a `/** */` doc block on a `*`-prefixed comment line (sampled: `bpp-3.diff:5-13`, `16-26`, `119-128`, `147-153`, `160-164`, `185-190`, `264-267`, `334-341`, `388-393`); no line outside a comment differs. `bpp-3.diff:702-735` (`button-group.test.ts`) is byte-identical to `bpp-2.diff:475-507`. `bpp-3-status.txt:1-3` lists exactly the three files.

**Claim 3 — Claim 8 of round 2 and the observation closed: UNRESOLVED.** Three sub-facts confirmed from the diff: `bpp-3.diff:668-670` "the three rules" → "the rules"; `bpp-3.diff:264-267` "carries hundreds" → "carries many"; `bpp-3.diff:188-190` "this function renders" → "this helper renders". The fourth (the `grep -n "this function"` result over both whole files) rests on the writer's report alone (`b-passive-prose-report-3.md:71-75`), so the claim as a whole is UNRESOLVED.

Findings outside claims 1 and 3: none.

VERDICT: FAIL 3; outside the claims: none
