# B-FORMS-CONTROL, round 4 (the two-sentence micro-round) — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-bfo` on 2026-09-23. The verdict text is the lane's handback verbatim.

Lane: subjective, held by `reviewer` on Opus 5.5 (native subagent, clean context, read-only). Subject: B-FORMS-CONTROL round 4 in `/home/user/veneer-bfo`, audited against `/home/user/scaffold/.orkestrel/veneer/units/bfo-4-audit-claims.md`.

## Numbered verdicts

1. **CONFIRMED.** The only change between round 3 and round 4 is the pair of edits the brief prescribed.
   - **Other files unchanged:** The `index` lines in `/home/user/scaffold/.orkestrel/veneer/units/bfo-4.diff` and `bfo-3.diff` have the same blob hashes for 18 of the 19 files. The one exception is `tests/setupStyles.ts` (`7615ca3..69bb76e` in round 3, `7615ca3..84399c1` in round 4, both diffs at line 1626). Every file header sits at the same diff line in both files.
   - **Inside `tests/setupStyles.ts`:** The single hunk (`@@ -3727,3 +3727,620 @@`) differs only at diff lines 1714–1718, which is the `values` paragraph rewrap, and 1721–1723, which is the `reads` paragraph.
   - **Text around the edit:** I re-read the untouched sentences of the `values` paragraph word for word against round 3. The rewrap changed no word outside the prescribed clause, and both paragraphs keep their line counts.
   - **Tree matches the diff:** `/home/user/veneer-bfo/tests/setupStyles.ts:3811` and `:3817-3820` carry the same text as the diff.
   - **Status:** `bfo-4-status.txt` and `bfo-3-status.txt` list the same 19 entries, with no untracked or added paths.

2. **CONFIRMED.** Both sentences match the text in `b-forms-control-brief-4.md` § Edits, and neither claims more than the tests prove.
   - **Edit 1:** `/home/user/veneer-bfo/tests/setupStyles.ts:3811` reads "`declared` reading or a `compiled` reading". Each rung token now has its noun, the same form as "`resolved` reading" at :3810. The ` !important` token is its own noun under the family ruling in `bfo-3-audit-verdict.md` claim 2.
   - **Edit 2:** `:3817-3820` matches the prescribed `reads` paragraph verbatim.
   - **Attack on the "reads no custom property" half:**
     - Mutation: add a `var(--vn-space-3)` declaration to a rule whose `reads` map is empty, such as `.form-control[type=file]`.
     - The Node case keeps every property whose declaration contains a `var()` (`/home/user/veneer-bfo/tests/setupStyles.test.ts:1803-1808`, filtered at :1832). That property would appear, and `toEqual({ selector, reads: {} })` at :1830-1833 would fail.
     - The assertion distinguishes the mutation from the passing case, so this half of the sentence is proved.
   - **Attack on the literals half:**
     - Mutation: add `outline-offset: 123px` to `.form-control:focus` or to `.form-control[type=file]`.
     - The Node case drops properties that read no name (:1832), so it still passes.
     - The value assertions read only `Object.keys(entry.values)` (`/home/user/veneer-bfo/tests/src/styles/components/form-control.test.ts:63-69` and `:102-112`), so they never read the added property.
     - Neither test distinguishes this mutation. An added literal on a `resolved` or `declared` rule therefore still falls outside both tests.
     - The one exception is the `compiled` rung. It compares the whole written declaration set for the Gecko swatch (`setupStyles.test.ts:1841-1855`), so an added literal there fails.
   - **The sentence no longer claims the added literal is caught:**
     - It states only the `var()` fact that the Node case proves, and hands the literals to the value assertions.
     - The `values` paragraph limits what those assertions read to "each recorded declaration" (`setupStyles.ts:3808`).
     - The round-3 claim, "separates a rule holding Bootstrap's own values from one this package routed onto tokens", is gone.
   - **Voice attack on `its`:** In "leaves its literals", `its` could attach to "an empty map" or to "the rule". Only the rule has literals, so the reader resolves it on the first read and the meaning does not change. The sentence is not broken.

3. **UNRESOLVED.**
   - **The half I could check by reading holds:**
     - A search of every added line in `bfo-4.diff` for ` as <identifier>`, `any`, `@ts-`, `eslint-disable`, `oxlint-disable`, and a postfix `!` returned prose only. The one code hit was `as const` (diff line 2313).
     - The tables in the round-4 hunk are all wrapped in `Object.freeze`, including every inner `reads` array (diff lines 1725–2249).
     - `FormControlCase` members are all `readonly` (diff lines 1673–1693).
     - Round 4 changed no file outside the owned doc block (see claim 1).
   - **The `npm run check` exit code for round 4 is not established.** The claims file assigns that run to the objective lane, and this lane cannot run commands. The only evidence in my hands is the writer's report (`b-forms-control-report-4.md` gate table: exit 0), which by charter cannot confirm a claim. The objective lane's own run of `npm run check` in `/home/user/veneer-bfo` settles it.

## Findings outside the claims

None.

## Attacked and held

- **The word "row" in "reads as a different row" (`setupStyles.ts:3820`):** I tested it against the round-3 ruling that "row" is a fault in GROUP's remark. Here "row" names the whole case entry, which the Node case compares as `{ selector, reads }`. That matches the test comment at `setupStyles.test.ts:1801-1802`. The sentence was carried unchanged and prescribed verbatim, so this is not a fault.
- **The same overclaim in `FORM_RANGE_CASES` (`/home/user/veneer-bfo/tests/setupStyles.ts:3314-3316`):** It still reads "which is what separates a site holding Bootstrap's own value from one this package routed onto a token". This looks like the round-3 defect but sits outside this unit's scope. `bfo-3-audit-verdict.md` claim 3 already assigns it to B-FORMS-CLOSE, which copies the settled wording there.

## Referrals

- **To the objective lane, claim 3:** Report the exit code of `npm run check` run in `/home/user/veneer-bfo` on the round-4 tree.

VERDICT: FAIL 3; outside the claims: none
