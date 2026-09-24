# Audit round 1 — BARE-BUTTON (`cb`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the BARE-BUTTON unit (`opus` on Opus 5.5 in `/home/user/veneer-cb` from `a9dff19`), claims file
`cb-audit-claims.md`. Lanes that ran, blind to each other: the objective lane, `analyst` on GPT-6 Astra
(`cb-audit-objective-verdict.md`, thread `01a0d191-c692-7e11-a246-f317d05b18e4`, journal
`tmp/codex/cb-audit-analyst.jsonl`); the subjective lane, `reviewer` on Opus 5.5
(`cb-audit-subjective-verdict.md`); and the checker on Sonnet (`cb-audit-checker-verdict.md`, claims 1,
5, and 8). The reviewer and the checker ran in workflow `wf_19d09be7-986`.

## Per-claim rulings

1. **CONFIRMED** by every lane.
2. **CONFIRMED** by both adversarial lanes.
3. **BROKEN (objective lane), on the report's accounting.** Both adversarial lanes agree that no
   button form loses a declaration its release rule writes. The report's "every value that moved was
   a Veneer addition supplied by the bare rule" is false for the close control's padding, which moves
   from 3.5px to 5px because the release's own `.25em` padding follows the inherited font size, and the
   report's table omits that movement and the indicators' disabled pointer-events movement
   (`cb-matrix.txt`). Carrier: C-c.
4. **CONFIRMED.** The reviewer left the restored-build clause unresolved because the mutation script
   compares the partial alone. The objective lane read the stylesheets' SHA-256 digests as equal, and
   the Orchestrator's own reading agrees: `dist/src/styles/index.css` in the worktree and
   `cb-instruments/cb-after-index.css` share the digest that begins `f349fac5ba515e8e`.
5. **CONFIRMED** by every lane.
6. **CONFIRMED** by both adversarial lanes.
7. **BROKEN (subjective lane).** The § Files row says the calibrated surface sits "on a button no class
   claims", which is false for a `<button class="">` and for a resting carousel indicator, both of which
   the unit's own cases prove take no surface, and which adds a third term for one concept. The
   § Styles list says a classed button takes the reboot "and nothing more" while the reboot's enabled
   `cursor: pointer` also reaches it. The `data-bs-target` sentence chains three ideas. The § Showcase
   line is not wrapped. Carrier: C-b.
8. **BROKEN** by every lane, on the report alone: code tokens without nouns, paraphrased result lines,
   and a diff-stat tally. The report is the round's record, not product; round 2's report corrects its
   own form. No separate carrier.

## Findings outside the claims

- **B6-LIST-GROUP (objective lane) and F1 (subjective lane), one finding.** B6 requires the list-group
  proof to read the disabled button against its anchor on font metrics and the focused forms on
  outline and shadow. The extended case reads neither, and the retained font-inheritance and
  unscoped-focus mutations leave it green. Carrier: C-a.
- **LIST-GROUP-COMMENT (objective lane).** The comment in the list-group state case says a button host
  carries the elements layer's color transition; its class excludes it from that rule. Carrier: C-a.
- **F2 (subjective lane).** The comments in the elements and nav cases say the wrapper's `20px/30px`
  metrics match no shipped token. The `--vn-size-5` token is `1.25rem`, 20px at the 16px root, and the
  `--vn-line-body` token is `1.5`, 30px at that size, so a universal rule writing those tokens would
  read the same as `inherit` and pass. Carrier: C-a.

## Carrier

Round 2 on the same `opus` subagent (`b-cross-cb-brief-2.md`) carries C-a to C-c. Its audit runs the
objective lane on Astra and the checker; the subjective lane is not run for round 2, because C-b adopts
the subjective lane's wording and the checker verifies the letters, while C-a closes on retained red
runs the objective lane reads.

VERDICT: FAIL 3, 7, 8; outside the claims: B6-LIST-GROUP, LIST-GROUP-COMMENT, F2
