Lane held: checker qualifier

**Claim 1 — scope honesty.** PASS. `d7n-qualifier-converge-fix.status.txt` lists exactly `README.md`, `guides/qualifier.md`, `src/core/Qualifier.ts`, `src/core/constants.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `tests/guides.test.ts` — matching the diff's file list and the brief's owned-files scope. The report's item-1 acceptance evidence (`git diff -U0 -- src | grep ... exit 1`) shows no non-comment line changed in `src`, confirmed by direct read of `src/core/factories.ts:1-63`, `src/core/Qualifier.ts:40-54`, and `src/core/constants.ts:1-15`: every edit sits inside a `@remarks`/description comment, no code token moved.

**Claim 2 — citations and no count in prose.** PASS. Every cited site in item 1 (`factories.ts:17`, `Qualifier.ts:49`, `helpers.ts:39,42,114,144,217,413`) matches the live tree read directly (`/home/user/fleet/qualifier/src/core/helpers.ts` at those offsets, `factories.ts:17`, `Qualifier.ts:49`). No prose sentence in the report states a count of a growable set; the only numerals are line numbers (evidence locators) and quoted command/test output inside code fences (durations, exit codes, pass/fail totals from an actual run), which the writing rule exempts.

**Claim 3 — each QF item present as asked.**
- QF1: PASS. `grep -rnE '\b(OWNS|OWNED|UNRESOLVED|EMPTY|SAME)\b' src` reading (exit 1) and direct reads of the six named `helpers.ts` sites plus `factories.ts:17` and `Qualifier.ts:49` confirm all lowered; guide/README all-caps hits are ruled code tokens, abbreviations (`JSON`, `ESM`, `API`), or `MIT`/`LICENSE`.
- QF2: PASS. `guides/qualifier.md:346-348` carries the lead-in sentence under `#### Create a qualifier` naming the difference from the quickstart.
- QF3: PASS. `guides/qualifier.md:150` reads "In a guard table a `Shape` cell holds the type the guard narrows to." alone; the interface sentence is struck.
- QF4: PASS. `src/core/factories.ts:101` and `guides/qualifier.md:342` both read "Creates a fresh `Ruling` from the rule it reacts to and the effect it applies." — equal.
- QF5: PASS. `guides/qualifier.md:350-381` and `src/core/factories.ts:29-58` (stripped of ` * `) are byte-identical, carry `message`/`rulings` inputs and the fresh-value/absent-key contract, and `tests/guides.test.ts:385-414` (live tree) executes the case `returns what the titled factory fence claims` with behavioral assertions paired to presence guards on every claimed line.
- QF6: PASS. `tests/guides.test.ts:1-3` (live) equals the pilot's lines 1-3 verbatim; the manifest-loop region (lines 57-268 live) mirrors the pilot's structure with the package's own case appended after in `describe('flagship fences')`.
- QF7: PASS. `src/core/constants.ts:9-13` reads "Names `'qualification'`, the reserved internal projection namespace…" — literal first; guide's Constants row (`guides/qualifier.md:102`) matches.
- QF8: PASS. `README.md:11-15` (live) links `@orkestrel/reason`'s repository in the form `/home/user/fleet/rater/README.md:11` uses; the pitch blockquote (`README.md:3-7`) is unchanged, a plain noun phrase.
- QF9: PASS. Fence-lead-in sweep confirmed by direct read: `### Conditions do not block downstream work` (line 641), `### Referral blocks downstream work` (line 662), `### Observing` (line 707) each carry a lead-in sentence before their fences; no table carrying `Shape` (`### Types`, `### Constants`, `### Validators`) has an empty cell, and `### Errors`/`### Helpers`/`### Factories`/`### Classes` correctly carry no `Shape` column per Ruling 20/26/28's trigger ("a table that carries `Shape`"), consistent with the pilot and rater's guide structure the report cites.

**Findings outside the claims.** None — no scope or naming drift found beyond what the claims cover.

**Referrals.** None. Every claim was independently checkable against the live `/home/user/fleet/qualifier` tree and the retained evidence files, with no judgment call left open.

VERDICT: PASS
