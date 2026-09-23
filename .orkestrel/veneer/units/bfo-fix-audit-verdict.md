# B-FORMS-CONTROL fix-round audit — round verdict (reconciled by the Orchestrator, 2026-09-23)

Lanes that ran on `bfo-fix-audit-claims.md`, blind to each other: `analyst` on GPT-6 Astra
(`bfo-fix-audit-analyst-verdict.md`, session `01a0ccd2-3f59-74d2-82b9-807962b3262e`, journal swept
at acceptance; FAIL 3, 5, 6, 7, 9), `reviewer` on Opus 5.5 (`bfo-fix-audit-reviewer-verdict.md`,
FAIL 6, 9 with MIXIN-READERS outside the claims and R1 to R4), and `checker` on Sonnet
(`bfo-fix-audit-checker-verdict.md`, FAIL 6). Every lane ran; none empty. The writer was Opus, so
the objective lane on Astra is the auditor that did not write the work.

## Rulings per claim

1. **CONFIRMED** (both lanes; the analyst's in-memory compile read `0` under the mutation where the
   row records `0 !important`).
2. **CONFIRMED** (both lanes). The reviewer's R1 (a literal declaration on a property the row
   neither reads nor values passes the Node case and the browser case) is upheld as a reading: the
   Node case proves token binding and the value assertions cover the recorded literals, and neither
   reads an unrecorded declaration. Carrier: B-FORMS-CLOSE plants a literal declaration on a
   shipped `.form-control` rule, records which gate reports it, and adds the reading where none
   does; recorded in `ROADMAP.md` at CONTROL's landing.
3. **CONFIRMED** (the reviewer opened `form-control-date--light-1280.png`, `--dark-1280.png`,
   `--light-390.png`, `--dark-390.png`, and `form-control-color--light-1280.png` and read the
   release's date and color controls; the analyst's UNRESOLVED named that reading as the settling
   one).
4. **CONFIRMED** (both lanes).
5. **CONFIRMED** (both lanes on the applied text; the analyst's UNRESOLVED on the isolated run is
   settled by the Orchestrator's probe in `/home/user/veneer-bfo`, retained as
   `bfo-validation-probe.log.txt`: the patch reversed reads 5 failed and 12 passed, the patch
   restored reads 17 passed, and the tree returned byte-identical).
6. **BROKEN** (all three lanes): the `!important` paragraph of `guides/veneer.md` (a 140-column
   line) and the file-button alias paragraph (a 101-column line) were rewritten without a rewrap;
   the `FORM_CONTROL_CASES` remark leaves its rung and map tokens without nouns and states that an
   empty `reads` map holds a rule to the release's own values where it holds it to no `var()`; the
   `form-control-text` token in the `tests/setup.ts` remark has no noun; the comment at the head of
   the driven cases in `form-control.test.ts` uses a temporal `once`; the report's D39 ROADMAP row
   is stale against D39a and superseded by fold 29 (L2 landed first). Carrier: round 3 on `builder`
   (`b-forms-control-brief-3.md`), the D39 row dropped at integration.
   The 100-column bar is carried here only because the round rewrote those guide paragraphs: oxfmt
   preserves prose wrap and does not reflow comments, base lines exceed the bar, and no rule states
   it, so the bar leaves the claims files from this round on and never opens a round by itself.
7. **CONFIRMED** (the reviewer on every plant; the analyst confirmed each mutation distinguished,
   the restored runs green, and the digests matching, which closes R4). The F reds under the
   reduced-motion plant are the plant's: the surviving transition is read mid-fade immediately after
   traversal, and at baseline the staged preference sets `transition-property: none`, so no timing
   condition reddens F unplanted. The analyst's request for immediate and completed-transition
   readings under the plant would measure the plant's fade, not the proof's binding; dropped on the
   record.
8. **CONFIRMED** (both lanes; the analyst's independent compile matched the retained after file
   byte for byte). The reviewer's R2 is ruled **D40a** (`decisions-round-2.md`): `control-type`
   and `control-border` become `input-text` and `input-border`. Carrier: B-FORMS-RENAME on
   `builder` after CONTROL lands; recorded in `ROADMAP.md` at CONTROL's landing.
9. **BROKEN** on the prose (both lanes): the range journey case still proves its title (Tab from
   the `Form control readonly` control reaches the range and `:focus-visible` holds), and the cause
   is consistent with the installed `driveTraversal` (`visited.has(focused)` breaks the walk); the
   comment's "it" has two candidate referents, and the report's trail-end statement is wrong (the
   trail continues past the select's embedded newline and ends at the date control, so the walk
   stops there as the source predicts). Carrier: round 3 rewrites the comment with the reviewer's
   text and its report corrects the evidence statement.
10. **CONFIRMED** (the analyst's `npm run check` exited 0; the reviewer's and the checker's
    readings hold the law and the scope).

## Findings outside the claims and referrals

- **MIXIN-READERS** (reviewer): the session branch's mixin comments name `.form-select` and
  `.input-group-text` as the readers. Carrier: the landing's integration script keeps the MIXIN
  copy's comments and adds `.form-control` to each reader list (`bfo-integration.py`).
- **R3** (reviewer): the FLOATING carrier's text-control half is bounded to "every floating
  text-control frame". Carrier: the same integration script.
- **R1**, **R2**, **R4**: carried under claims 2, 8, and 7.

Every finding has a carrier; nothing dropped without record.

VERDICT: FAIL 6, 9; outside the claims: MIXIN-READERS
