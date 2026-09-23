# B-FORMS-CONTROL round-3 audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bfo-3-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bfo-3-audit-analyst-verdict.md`, session `01a0cce4-3059-7983-8983-e4b4d456f71d`, journal swept
at acceptance; FAIL 2, 3 with REPORT-TRAIL-START outside the claims), `reviewer` on Opus 5.5
(`bfo-3-audit-reviewer-verdict.md`, FAIL 3, 5 with R1 to R3), and `checker` on Sonnet
(`bfo-3-audit-checker-verdict.md`, PASS). Every lane ran; none empty. The writer was `builder` on
Sonnet, so both Opus and Astra are auditors that did not write the work.

## Rulings per claim

1. **CONFIRMED** (all three lanes; the analyst's reconstruction and the checker's byte comparison
   close the reviewer's R3).
2. **BROKEN** (the analyst): "for a `declared` or `compiled` one" leaves the two rung tokens on a
   pronoun. Carrier: round 4 (`b-forms-control-brief-4.md`, the analyst's text "for a `declared`
   reading or a `compiled` reading"). The reviewer's R1 (the `overflow`, `clip`, `!important`, and
   `var()` tokens stand without a noun by the letter) is ruled for the family: a CSS property,
   value, function, or `!important` token that names the thing itself is the noun of its phrase
   and takes no further noun, as the house text uses them; an identifier for a symbol, a file, a
   class name, a rung, or a map takes one. Carrier: P1 SCAFFOLD-PROPAGATE lands that sentence in
   `.claude/rules/writing.md` § Code tokens (a vendored rule file, so it lands with the D14 and D18
   sentences); recorded in `ROADMAP.md` at CONTROL's landing.
3. **BROKEN** (both lanes, in different directions, reconciled on the analyst's measurement): the
   sentence "an empty map separates a rule holding Bootstrap's own values from one this package
   routed onto tokens" claims more than the Node case proves, because an added literal declaration
   (`outline-offset: 123px`, the analyst's in-memory mutation) still yields `{}`; the reviewer's
   reading that CONTROL's "map" is the precise term and GROUP's "row" and bare `reads` are the
   faults stands. Carrier: round 4 rewrites CONTROL's sentence to state what the map proves and
   leave the literals to the value assertions; B-FORMS-RENAME rewrites GROUP's remark to the same
   voice ("The `reads` map is keyed by property, across every rule the selector heads" and the same
   two sentences) on the session branch after CONTROL lands, so B-FORMS-CLOSE copies one wording
   into the `FORM_RANGE_CASES` remark.
4. **CONFIRMED** (both lanes; the comment matches the prescribed text, the installed
   `driveTraversal` break, and the retained trail).
5. **CONFIRMED** (the analyst's `npm run check` exited 0; the reviewer's UNRESOLVED is the claims
   file addressing the run to the objective lane, dropped on the record; the checker's reading
   holds).

## Findings outside the claims and referrals

- **REPORT-TRAIL-START** (the analyst) and **R2** (the reviewer): the round-3 report's evidence
  statement conflates the failed walk from the document's start with the repaired walk from the
  readonly control and names "the date control's own field" where the element reached twice is the
  date control. The settled reading is this verdict's: the failed walk started at the document's
  start, crossed the date control, and stopped there because `document.activeElement` stays on the
  date control while Tab steps through its fields; the repaired walk starts at the readonly control.
  The journey logs are retained as `bfo-journey-1-<variant>.log.txt`. The round-4 report restates
  the evidence in these terms.
- **R1**: ruled under claim 2. **R3**: closed under claim 1.

Every finding has a carrier; nothing dropped without record.

VERDICT: FAIL 2, 3; outside the claims: REPORT-TRAIL-START
