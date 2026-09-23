# B-FORMS-CONTROL round-5 audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bfo-5-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bfo-5-audit-analyst-verdict.md`, session `01a0cd15-9d5a-7182-951c-70a35e78dc15`, journal swept
at acceptance; FAIL 4 with STALE-GROUP-GUIDE outside the claims), `reviewer` on Opus 5.5
(`bfo-5-audit-reviewer-verdict.md`, FAIL 4, 5 with referrals), and `checker` on Sonnet
(`bfo-5-audit-checker-verdict.md`, PASS). Every lane ran; none empty. The writer was `builder` on
Sonnet, so both Opus and Astra are auditors that did not write the work.

## Rulings per claim

1. **CONFIRMED** (all three lanes).
2. **CONFIRMED** (both lanes on the walk path: the range's successor is disabled and the base
   select follows; the addons control is followed by non-interactive markup and then the grouped
   target; a start after the target rejects during the traversal, before the identity assertion,
   so the case as a whole distinguishes it, which both lanes read the same way). The rendered ring
   the reviewer could not resolve from the page frames is evidenced by the Orchestrator's crops at
   the ring box (`bfo-focus/form-select-base-focus-{light-1280,dark-390}.png`,
   `bfo-focus/input-group-button-focus-{light-1280,dark-390}.png`, the reading in
   `bfo-focus/crops-2.log.txt`): the ring paints on each target control in each mode.
3. **CONFIRMED** (both lanes; the analyst's in-memory compile read `100%` at baseline and no base
   width under the mutation; the reviewer named the unscoped `width: 1%` as a second distinguished
   mutation).
4. **BROKEN** (both lanes, on different sites): the guide's seam sentence concludes "paints one
   line" twice, the added clause restating the opening (the reviewer; the drop "wide, and the group
   squares" is the fix); the comment "The reading below uses the button's own border width" carries
   the cross-reference `below` the substitution table bans (the analyst; "The following reading"
   is the fix; the wording was the brief's). Carrier: round 6 on `builder`
   (`b-forms-control-brief-6.md`).
5. **CONFIRMED** (the analyst's `npm run check` exited 0; the reviewer's UNRESOLVED is the claims
   file addressing the run to the objective lane, dropped on the record).

## Findings outside the claims and referrals

- **STALE-GROUP-GUIDE** (the analyst): the unchanged § Input group classes paragraph says the
  cascade ships no rule for the text control, the select, or the floating label on its own and
  that a grouped control keeps the browser's own border and focus outline, which the shipped
  `.form-control`, `.form-select`, and `.form-floating` rules make false. Carrier: round 6.
- The reviewer's observations on the case family's voice (the preceding-focus reason stated in the
  range case and pointed to from the others) and on the layout comment naming the group's scoped
  `width: 1%`: carried by round 6 as exact text.
- The reviewer's dispatch note: the retained brief and the worktree copy are byte-identical
  (`cmp` at staging); no defect.

Every finding has a carrier; nothing dropped without record.

VERDICT: FAIL 4; outside the claims: STALE-GROUP-GUIDE
