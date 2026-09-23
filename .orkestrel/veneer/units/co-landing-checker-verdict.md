# Landing check verdict — COLLAPSE (`co`) round 2 (`checker` on Sonnet)

**Claim 1 — BROKEN.** The file list (`co-2-measurements.txt:6-17`, twelve `+++` paths) equals the Shared row of `co-brief-3.md`, with no other file; no § Showcase hunk; the region-order paragraph is absent at the landing base (`co-2-measurements.txt:38-39`) and no criterion names it. Broken on "no hunk removes a line outside the sites the round-2 report names": `co-shared-2.patch:302-318` (`tests/conformance.test.ts`) replaces a three-line comment ("The release names the passive partials…") with a four-line comment, and the round-2 report names no site in that file.

**Claim 2 — CONFIRMED.** § Surface at `co-shared-2.patch:88-95`; § Tailwind at `:128-133`; `### Collapse classes` at `:141-179` directly before `### Button group classes` (`:181`), without the cut clause, with "A panel carries the `collapsing` class while it opens or closes." (`:153`) and the closing sentence verbatim (`:175-179`); the Files row (`:103`); the `collapse | selector` and `collapsing | selector` rows (`:188-189`); the plugin row ending "Owner: J-ENGINE." (`:197`); the R8 sentence (`:199`); both recipe fences (`:112`, `:121`); the § Tests link (`:207`).

**Claim 3 — UNRESOLVED.** The case title, position, wrapper, and assertion hold at `co-2.diff:409-418`; the mutation (`calc(0.35s * var(--vn-factor-motion))` resolving to `0.7s`) is distinguished by `toBe('0.35s')`. "Nothing else changed" cannot be read from `co-2.diff`, a diff against `87ff1d0` that renders every owned file whole; isolating round 2's delta needs round 1's artifact, which the brief did not name.

**Claim 4 — CONFIRMED.** `co-2-status.txt` equals the `git status --porcelain` block in `co-2-measurements.txt:20-27` line for line; the four untracked owned files read `??` in both; the forbidden sequence is recorded at `b-collapse-co-report-2.md:117-124` with nil effect.

**Claim 5 — BROKEN.** No banned term. The report states a count: `b-collapse-co-report-2.md:104-105` "carries the twelve shared files the Shared row names". The Files row (`co-shared-2.patch:103`) and the `collapse | selector` and `collapsing | selector` rows (`:188-189`) end on the bare path `tests/src/styles/components/collapse.test.ts`, mirroring the table's pre-existing rows (for example the `pagination | variable` row at `:187`).

Findings outside the numbered claims: none.

VERDICT: FAIL 1, 3, 5; outside the claims: none
