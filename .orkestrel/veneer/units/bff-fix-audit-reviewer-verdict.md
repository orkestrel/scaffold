# B-FORMS-FLOATING, round 2 (the fix round) — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-bff` on 2026-09-23. The verdict text is the lane's handback verbatim.

# B-FORMS-FLOATING fix round: `reviewer` verdict (Opus 5.5, subjective lane)

**Lane:** subjective (API feel, naming, guide voice, and the shape a consumer meets). **Claims file:** `/home/user/scaffold/.orkestrel/veneer/units/bff-fix-audit-claims.md`. **Subject:** `/home/user/veneer-bff` at `2c10329` plus uncommitted writes.

**Dispatch defect:** claim 10 asks this lane to run `npm run check`. This lane has only Read, Grep, and Glob, so nothing was run. Every run-dependent reading below is marked as such.

**Source of three defects:** the defects in claims 3 and 6 came from the fix brief's own wording, which the writer followed exactly: `tmp/units/b-forms-floating-brief-2.md` lines 107–109 prescribe "≥ 0", and line 123 prescribes the title.

## Numbered verdicts

1. **CONFIRMED.**
   - **Barrel order:** `src/styles/index.scss:60-62` reads `form-range`, `form-floating`, `validation`.
   - **The case:** `tests/conformance.test.ts:212-245`.
   - **Plant:** move `validation` back to directly after `vr`. `forms` becomes `['validation','form-range','form-floating']`, while the release subsequence is `['form-range','form-floating','validation']`. Line 244 distinguishes the two.
   - **Negative control:** move `pagination` after `validation`. `pagination` is not in `release`, so the filter drops it and line 244 stays green.
   - **Removal mutation:** delete the `validation` line. A shorter list is still a subsequence, so line 244 alone would pass. Line 243 (`arrayContaining`) is the assertion that catches it.
   - **Writer's decision, which stands:**
     - Reading `node_modules/bootstrap/scss/_forms.scss` and pinning it to a literal gives two things. The literal documents the order, and the read turns a reordered release into a red case instead of a silent pass.
     - The `floating-labels` → `form-floating` mapping is the only rename, and the comment at 213–216 explains it.
     - Leaving `labels` and `form-text` to the filter is correct, because neither has a partial.
   - **Integrated order:** not evidenced in this tree, and it is an unknown rather than this claim. It is settled by this case run on the session branch after the merge.

2. **CONFIRMED.**
   - **Expected value:** `form-floating.test.ts:336` expects `font-size × 1.5 + root × 0.75`. That is `_validation.scss:45` `padding-right: calc(1.5em + 0.75rem)`, with `em` resolved against the control and `rem` against the root.
   - **Mutation (the barrel plant):** the floating shorthand's `var(--vn-space-6)` (12px) wins the tie at (0,2,0). The expected value sits near 33–36px, far from 12px, so `toBeCloseTo(…, 3)` distinguishes them.
   - **Other insets:** the checks at 341–343 hold the container's insets unchanged.
   - **Inline markup:** mounting the markup inline rather than in `FORM_FLOATING_MARKUP` fits. The pair is a validation-family host, and `validation.test.ts` does the same.

3. **BROKEN**, on the content-box assertion only.
   - **What holds:**
     - The partial values at `_form-floating.scss:25-26,68,77,82,87`.
     - The factor-2 height readings at `form-floating.test.ts:410-411`. Under the height plant, the computed height at factor 2 is at most 74px and `min-height` is 58px, never 114px, so these lines distinguish the literal height from the scaled one.
     - The frames at `light-1280`:
       - `form-floating-empty--light-1280.png` shows the label at rest.
       - `form-floating-filled--light-1280.png` and `form-floating-select--light-1280.png` show the floated label near the top edge, with the value line lower in a box as tall as the frame.
       - These are consistent with 58px, 26px, and 16px. No round-1 frame survives, so the pixel comparison is left to the landing's regenerated portfolio, diffed against a pre-D34 build.
   - **What breaks:** the "keeps the content box open" assertion at 414–426 cannot fail.
     - `_reset.scss:2-5` sets `box-sizing: border-box` on every element.
     - Under border-box, Chromium's computed `height` is the used border-box height. That height is never less than padding plus border.
     - So `height − padding-top − padding-bottom − borders` is always at least 0, and the `< 0` filter can never match.
     - **Failing state:** the height plant at factor 2. The floated control's used height becomes 74 (52 + 20 + 2), the difference is 0, and the filter stays empty. Only line 410 reddens.
   - **Why it matters:**
     - The case title at 368 names the "content box open" property, and the comment at 414–415 claims a guard that does not exist.
     - The guide's "at a factor of 2 each control keeps room for its text" (`guides/veneer.md:820-821`) is therefore held only by the exact readings, not by the assertion named for it.
   - **Fix:** compare against the line box, so a clamped box fails:
     ```ts
     const line = readPixels(empty, 'line-height')
     // …
     readPixels(control, 'border-bottom-width') < line
     ```
     This is 20px. The results are 48 at rest and 40 floated, which pass, and 0 under the plant, which fails. The select's own `line-height` reads `normal`, which is why the value comes from `empty`. Reword the comment to "the content box holds at least one line of the control's text". Alternatively, delete the assertion and drop "and keeps the content box open" from the title.

4. **CONFIRMED.**
   - **Ledger:** the `#### form-floating` ledger (`guides/veneer.md`, the rows the report lists) replaces the six `declared` height rows with `tokenized` rows. Each floated `padding-top` row sits directly before its selector's `padding-bottom` row.
   - **Case table:** `FORM_FLOATING_CASES` in `tests/setupStyles.ts` reads `--vn-space-8` on the select, focus, filled, and both autofill rows.
   - **Mutations:**
     - Drop `--vn-space-8` from the select row's `reads`. The untokenized sweep in `setupStyles.test.ts` ("binds every floating selector…") lists `.form-floating > .form-select --vn-space-8`, which is red.
     - Drop a `padding-top` ledger row. The ledger case prints it as missing, as the report's gate print shows.
   - **Green reading:** the Orchestrator's own `test:conformance` reading, red only on the presence reading, is independent evidence that the ledger cases pass.

5. **CONFIRMED.**
   - **Where:** `form-floating.test.ts:448` sets the override, and line 462 asserts `rgb(70, 80, 90)` on the disabled backdrop.
   - **Plant:** `#e9ecef` renders `rgb(233, 236, 239)`, which the assertion distinguishes.
   - **Why the resting case stays green:** the resting case at 276 compares against the light-mode token, which the plant matches.
   - **Title:** "both backdrop surfaces" names a fixed pair, body and secondary.

6. **BROKEN**, on the case title.
   - **What holds:**
     - The sentence "The installed browser exports offer no way to put a control into the autofilled state, so …" appears at `guides/veneer.md:843-844`, in the `FORM_FLOATING_CASES` TSDoc, and in `form-floating.test.ts:520-522`.
     - The rewrite comment is identical at `_form-floating.scss:73-75` and `form-floating.test.ts:540-541`, and it matches the round-1 analyst's compile.
     - One-rule-per-selector is distinguished: a grouped list compiles to `:-webkit-any(…)`/`:is(…)` text, so the count at 542–548 becomes 0, not 1.
   - **What breaks:** the title at `form-floating.test.ts:519`, "holds each autofill rule to the release's declarations", names the opposite of what the case enforces.
     - The release declares `padding-top: 1.625rem; padding-bottom: 0.625rem` (`node_modules/bootstrap/dist/css/bootstrap.css:2644-2645`).
     - The case expects `calc(var(--vn-space-8) * 1.625)` and `var(--vn-space-5)` (around line 566). These are Veneer's recorded `tokenized` departures in the ledger.
     - **Failing state:** write the release's own `padding-top: 1.625rem` on `.form-floating > .form-control:-webkit-autofill`. The case titled "to the release's declarations" goes red.
     - Only the label transform is the release's, and it is compared to the focus rule, not to the release.
   - **Fix:** retitle to "holds each autofill rule to the floated declarations of the focus and filled group, one selector per rule". This is also the relationship the comment at 526–529 already states.

7. **BROKEN**, on one changed sentence.
   - **What holds:**
     - "Veneer does not ship yet" (851) and the split opening list (782–785).
     - "the browser's autofill" (796).
     - The input-group sentence (790–792), the barrel sentence (785–788), and the § Compatibility row (3057).
     - The width decision stands. With the dropped clause added back, the cell runs past the 266-column widest cell and `oxfmt` re-pads the whole table. The § Files row for `_form-floating.scss` carries the list.
     - The `### Validation classes` patch applies to the tree's text: lines 486–487 match its `-` line and its context line exactly.
     - Banned-term sweep over 780–853: case-insensitive pattern `should|just|simply|now|new|once|since|via|ensure|currently|latest|above|below|etc|e.g.|i.e.` found no hit. Every `both` names its members.
   - **What breaks:** `guides/veneer.md:842-843` reads "is recorded in `tests/src/styles/components/form-floating.test.ts` beside the reading it bounds".
     - This is a code token with no noun after it (`writing.md` § Code tokens), in a sentence this round changed.
     - It also repeats the path the same paragraph already links at 834.
   - **Fix:** "Each limit that bounds what the proof can claim is recorded in the `tests/src/styles/components/form-floating.test.ts` file beside the reading it bounds."
   - **Same-form row:** the § Compatibility row at 3057 has the same bare form. It matches every sibling row in that column, so it goes to a table-wide carrier (referral R3), not to this unit.

8. **BROKEN**, on the prose. The carriers themselves hold.
   - **What holds:** each row names one carrier.
     - B-FORMS-CONTROL takes the six scenarios and the bare-controls sentence.
     - B-FORMS-SELECT takes `form-floating-select`, the `toBe('normal')` assertion and its comment, and the select line-height sentence.
     - No floor row and no D34 row appear.
     - B-PASSIVE-CLOSE names the range, select, pagination, progress, icon-link, and spinner proofs.
   - **What breaks:** the select row (`b-forms-floating-report-2.md:138`) says "reads it resolved once `.form-select` ships `appearance: none`".
     - This is a temporal `once`, which the `writing.md` substitution table replaces with `after`.
     - Its code tokens also carry no noun: "`line-height: 1.25` has", "`.form-select` ships", and in the row at 141, "`form-range.test.ts` and `form-floating.test.ts` each declare".
   - **Fix:** "B-FORMS-SELECT reads it resolved after the `.form-select` rule ships the `appearance: none` declaration". Apply the same noun repair ("declaration", "proofs") in the rows at 138 and 141 when the Orchestrator applies the patch.

9. **CONFIRMED.** Coverage is the whole `bff-2.diff` plus spot checks.
   - Added lines contain no `as`, `any`, postfix `!`, or suppression. Pattern: `^\+.*(\bas [A-Z{]|: any\b|<any>|\w!\.|\w!\)|@ts-|eslint-disable|oxlint-disable)`, 0 hits.
   - Callbacks are the only nested functions. Every table is frozen. Helpers come from `@orkestrel/test`.
   - The partial's only literal colour is `transparent`. The backdrop reads `var(--bs-secondary-bg)` at `_form-floating.scss`, around line 118.
   - No prose line in 780–853 exceeds 100 columns.
   - `bff-2-status.txt` lists the same 19 paths as round 1. `tmp/probe/` is absent.
   - For the off-limits files, the hunk extents match `bff.diff` file by file. The `setupStyles.test.ts` hunk was compared line by line and is identical.
   - Byte identity of the other off-limits hunks is the objective lane's reading.

10. **UNRESOLVED.** The only gate evidence is the writer's report plus the Orchestrator's `test:setup` and `test:conformance` readings. This lane runs nothing. The Orchestrator's independent chain at the landing settles it.

## Findings outside the claims

None.

## Attacked and held

- **"end padding" at 788 and 838, and "at the end of" in the title at 325**, name a physical `padding-right`. This matches the section's existing "start inset" for `padding-left` and Bootstrap's start/end naming. The guide says "physical" only where direction is the subject, as at 480 and 676. It holds.
- **"tie on one property" at 787** reads as intended beside the proof's "tie on specificity" at 330. It holds.
- **"The whole control scales with density"** overstates only if you read the transform as part of the geometry. The same bullet states that the transform stays the release's value. It holds.
- **The frames:** the select frame's native value inset and chevron are the bare user-agent select that the B-FORMS-SELECT row owns. This is not a D34 geometry change.

## Referrals

- **R1 (objective lane):** at `--vn-factor-density` below 1, for example 0.75, the height scales but the `1.25` line height does not.
  - The floated control's content box is 15px against a 20px line box.
  - The value's line box then meets the floated label's text by about 2px, from derived positions 18px and 20.4px.
  - The guide claims only factor 2. Decide whether this behaviour below factor 1 is a defect or an unstated limit.
- **R2 (Orchestrator):** check the landing order of CONTROL and SELECT. If B-FORMS-SELECT lands before B-FORMS-CONTROL, the bare-controls sentence (`guides/veneer.md:850-853`) goes false for the select at SELECT's landing, while its sole carrier is CONTROL.
- **R3 (Orchestrator):** every § Compatibility row writes "proved in `tests/…test.ts`" with no noun after the path. Name one table-wide carrier for the `writing.md` code-token rule rather than fixing a single row.

VERDICT: FAIL 3, 6, 7, 8, 10; outside the claims: none
