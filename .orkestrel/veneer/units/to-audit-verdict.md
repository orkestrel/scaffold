# Audit round 1 — TOAST (`to`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the TOAST unit's round 1 (`opus` on Opus 5.5 in `/home/user/veneer-to` from `2a3f223`),
claims file `to-audit-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`to-audit-objective-verdict.md`, thread
`01a0d0f0-4d70-7192-8c7c-fb20beeb1224`, an engine that did not write the unit), the subjective lane,
`reviewer` on Opus 5.5 (`to-audit-subjective-verdict.md`), and the checker on Sonnet
(`to-audit-checker-verdict.md`, claims 1, 6, and 8), the last two through workflow `wf_c5d7606f-0b0`
(`to-audit-workflow.js`). The Orchestrator's settling run (`to-audit-settling.sh` over the unit's own
mutation scripts with only the copy's path changed, `to-audit-settling.log.txt`) staged a validation
copy in its scratchpad from `2a3f223`, the owned files, and `to-shared.patch`, and re-ran every control.

## Per-claim rulings

1. **CONFIRMED.** The objective lane ran `git apply --check` and reconstructed the owned files byte for
   byte; the settling run applied the patch to a fresh extract with exit 0. The subjective lane and the
   checker held every clause they could read and left only the apply check unresolved, which those two
   runs settle.
2. **CONFIRMED** by both lanes: the partial writes the inventory's selectors, the departures equal the
   `#### toast` rows, and the `--vn-gutter-x` spacing follows the release's `$toast-spacing` source.
3. **CONFIRMED.** Both lanes named each mutation and found the assertions distinguish it; the objective
   lane held the claim unresolved for want of an executed record. The settling run supplies it: the
   unmutated proof reads 17 passed, and every style control reads red as the report states (no partial
   17 failed; the literal `1090`, the dropped `.toast` slot, and the full-radius corners 1 failed each;
   the `:not(.show)` rule and the body inset 3 failed each; the `.showing` rule, the qualifier, the
   combinator, the literal colour, and the density gap 2 failed each), and every section control reads
   red as stated (the frame removed and the off-center placement 3 failed each; the role, the missing
   `show`, the inline style, and the unnamed close control 1 failed each).
4. **CONFIRMED** by both lanes.
5. **BROKEN.** Both lanes: the `TOAST_SPECIMENS` TSDoc never names the `me-auto` class and never records
   the missing colored toasts. The objective lane's further reading, that the section copy owes the M3
   sentence, is dropped: M3's sentence belongs to the guide section, where the subjective lane found
   it, and M14 holds the copy to one imperative sentence. Carrier: T1.
6. **CONFIRMED** by all three lanes.
7. **BROKEN.** Both lanes: the guide's rung sentence and the variable row say a retune moves every
   toast, and the `.toast` rule declares the slot and applies no stacking level (the section proof's
   own `position: static` reading and a fixed toast under a retuned rung computing `z-index: auto`).
   The subjective lane: the Toast `plugin` row omits the `show` and deprecated `hide` class obligations
   `js/src/toast.js` writes, and drops the closing negative the landed Alert row carries ("no key,
   focus, or ARIA handling"); a toast pauses on focus, so its row ends "no key or ARIA handling".
   Carriers: T2, T3.
8. **BROKEN.** The objective and subjective lanes cite code tokens with no following noun across
   `### Toast classes` and the plugin row, and the subjective lane an unbackticked `showing` in the
   `CASCADE_KEYS` TSDoc; the citations resolve (`to-shared.patch` around the `### Toast classes` hunk
   and the plugin row). The checker's CONFIRMED on this claim rests on a sample of the compliant
   sites, so its reading of the claim is discarded, and its other readings stand. The objective lane:
   the framed-geometry case in `ToastSection.test.ts` iterates an inline list of specimen names, a case
   matrix `.claude/rules/tests.md` places in a setup file at any size. Carriers: T4, T5.

## Findings outside the claims, ruled

- **F1 (subjective lane): BROKEN.** The `_toast.scss` opening comment repeats the rung overclaim and says
  the engine writes the `showing` class only while a toast fades in, where `hide()` writes it too.
  Carrier: T3.
- **REPORT-COUNTS and the report's prose (objective lane).** The report is the round's record, not
  product; its tallies of specimens, a cross-reference `below`, a position name, and a temporal word
  are recorded here, and the round-2 report follows the writing rule. No carrier.
- **The subjective lane's referral on `TOAST_SLOT_CASES`: ruled in.** The binding case restates the
  tokens as a literal list, which fails only on a divergent edit; the Alert precedent derives its
  token. Carrier: T6.
- **The subjective lane's referral on the `fade` sentence.** "The engine also sets the `fade` class,
  which no Veneer rule reads" is true at `2a3f223` and goes false when `.fade` ships. Carrier: B-CROSS
  FADE (`cf`), whose brief rewrites that sentence with the rules it ships.
- **The subjective lane's referral on the landed sections' bare tokens.** `### Alert classes` and
  `### Carousel classes` carry the same form. Carrier: CLOSE-OUT (`cl`), beside its token-noun sweep.
- **The landed section proofs' inline populations.** `CarouselSection.test.ts` and
  `AccordionSection.test.ts` iterate inline specimen-name lists, the class T5 fixes. Carriers: CLOSE-OUT
  (`cl`) for the carousel proof, BCF (`bcf`) for the accordion proof.

## Carrier

Round 2 on the same `opus` subagent carries T1 to T6 (`b-modal-to-brief-2.md`). Its audit runs the
objective lane on Astra and the checker; the subjective lane is not run for round 2, because T1 to T4
adopt that lane's verbatim wording and the checker verifies the letters, while T5 and T6 close on their
retained red runs.

VERDICT: FAIL 5, 7, 8; outside the claims: F1
