Lane held: checker rater

**Claim 1 — scope honesty.** PASS. `git status --short` in the report (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-rater-converge-fix-report.md:179-184`) and the standalone status file `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-rater-converge-fix.status.txt:1-4` both list exactly `README.md`, `guides/rater.md`, `src/core/types.ts`, `tests/guides.test.ts` — the four paths the fix brief names (`d7n-rater-converge-fix-brief.md:22-24`) and no other path. The diff (`d7n-rater-converge-fix.diff.txt`) touches only those four files.

**Claim 2 — citations and no-count prose.** FAIL. The report's citations match the tree (verified directly: guide line 128 "In a guard table a `Shape` cell holds the type the guard narrows to." at `/home/user/fleet/rater/guides/rater.md:128`; `grep -n 'documented on the guard'` empty; `rate` doc block at `/home/user/fleet/rater/src/core/types.ts:175-177`; README link at `/home/user/fleet/rater/README.md:11`; test name at `/home/user/fleet/rater/tests/guides.test.ts:379`; header lines 1-3 identical to the pilot's). But the report states a count in prose twice: `d7n-rater-converge-fix-report.md:7` ("the two domain rules moved into § Surface") and `:46` ("the two domain rules land in the § Surface paragraph"). `AGENTS.md` § Writing: "**NEVER state a count.** ... Name the members, or write the sentence without the number." The report names the members earlier in its own item 2 heading (`LineResult amount` and `RatingResult success` rules) but then collapses them to a bare count ("two") in both the diffstat description and the item-2 prose, which is exactly the substitution the rule forbids.

**Claim 3 — each named correction present.** PASS on every sub-item, evidenced directly against the live tree at `/home/user/fleet/rater` (tip after the fix):
- RT1: `guides/rater.md:128-141` — `Shape` header present, convention sentence "In a guard table a `Shape` cell holds the type the guard narrows to." sits between the section's prose (ending `:126`) and the table (`:130`); the old declaration-pointing sentence is absent (`grep -n 'documented on the guard'` returns nothing).
- RT2: `guides/rater.md:60-63` — `LineResult`/`RatingResult` rules sit in the § Surface paragraph with the trailing clause closed ("...is `true` only when every line's `worksheet.success` is `true`."); `:89-91` — Types table note keeps only the `emitter`/`[Methods](#methods)` sentence.
- RT3: lead-ins confirmed at `guides/rater.md:103-104` (Errors fence), `:128-143` (Validators fence), `:270` (`Create a rater` fence), `:304` (Methods fence); the report's awk scan for any other bare fence returns nothing (`d7n-rater-converge-fix-report.md:222-223`).
- RT4: `src/core/types.ts:175-177` reads `{@link RatingDefinition}`; guide Methods cell at `guides/rater.md:301` reads "Rates an array of lines, or a `RatingDefinition`, against one subject over the shared quantitative engine." — equal under `findDrift`'s `{@link}`-to-code-token collapse.
- RT5: `README.md:11` links `[`@orkestrel/reason`](https://github.com/orkestrel/reason)`.
- RT6: `tests/guides.test.ts:379` reads exactly "returns equal results from the array-of-lines and rating-definition `rate` overloads".
- RT7: `tests/guides.test.ts:1-3` in `/home/user/fleet/rater` is byte-identical to `/home/user/fleet/abort/tests/guides.test.ts:1-3` (both read verbatim in this audit). The manifest region: spot-checked both files' anchor blocks (`abort:40-69` vs `rater:62-91`, and `abort:195-259` vs `rater:217-281`) — content is identical at a constant 22-line offset, corroborating the region-equality claim beyond the writer's self-reported `region.py` diff.

**Findings outside the claims.** None beyond the count-in-prose defect already charged to claim 2.

**Referrals.** None — the count-in-prose defect is a mechanical writing-rule violation, not a judgment call.

VERDICT: FAIL 2
