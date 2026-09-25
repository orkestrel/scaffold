# E-ID-BUTTON-CLASSES audit round 2 — verdict

The Orchestrator's reconciliation of the audit round over E-ID-BUTTON-CLASSES round 2, on one claims file
(`ebcl-audit-2-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`ebcl-audit-2-objective-verdict.md`, thread
`01a0d730-03c6-7320-9050-279dedc66dfa`), and the subjective lane, `reviewer` on Opus 5.5
(`ebcl-audit-2-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so the objective lane
ran on an engine that did not write the work. No checker ran: no claim is a count or a path the lanes did not read.

**Verdict: FAIL 7, 8; outside the claims: none.** The oracle is real: the release maps equal the removed list, every
reboot and `.btn` proof compares whole maps, and the adjusted default plant separates a default that moves one cascade
from one that moves both. Round 3 fixes one TSDoc sentence the code does not guarantee and one term used for two
concepts. This is the unit's third round, so the Orchestrator rules the fix (`e-id-button-classes-brief-3.md`).

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 The release maps | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The reader | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 The `.btn` proof | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 The reboot proofs | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 The default-moving plant | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 R3 | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 F1, F2, and claim 10 | CONFIRMED | BROKEN | BROKEN |
| 8 Shape and law | CONFIRMED | BROKEN | BROKEN |
| 9 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 7 (subjective).** The reader's remark says, with no condition, that the rest reading is taken with motion
  allowed. The code stages reduced motion at the first state that is not `rest` and keeps it staged until the `finally`
  block, so `readFormDifferences(subject, ['hovered', 'rest'], holder)` reads `rest` with motion reduced and reports
  nothing. The `@param states` text states the `disabled`-last obligation and omits this one, and the code enforces
  neither. The Orchestrator rules that the reader refuses both orders rather than documenting them: a refusal is an
  executed guarantee, and a documented obligation on an exported reader is the defect the lane found.
- **Claim 8 (subjective).** One value is a "case" in the table names (`BUTTON_FORM_CASES`, `BUTTON_REBOOT_CASES`) and in
  the refusal strings, and a "pair" in the type (`FormPair`), the reader's parameter, and every binding; and "pair"
  also names the release's pairing of a `:disabled` rule with a `.disabled` rule (`paired`, the `FORM_ENTRIES` keys).
  The Orchestrator rules: the type is `FormCase`, after `SanitizerCase`; the reader's parameter and every binding of a
  case row are `subject`, because `case` is a reserved word and `entry` already names the entry selectors of
  `FORM_ENTRIES`; every TSDoc "pair" that means a case says "case"; and `paired`, its TSDoc, and the `FORM_ENTRIES` keys
  keep "pair" in the release's sense alone.
- **Claim 5, the subjective note.** The stand-in moves two longhands where the Chromium 153 row moves one. The oracle
  compares whole maps, so the count does not change what the plant proves. The row closes on the engine session's
  Chromium 153 run after the landing.

## Referrals

- **`as const` on a declared contract (subjective to objective), dropped.** `BUTTON_FORM_STATES`,
  `BUTTON_REBOOT_STATES`, and the proof's `states` carry no declared type; `as const` fixes each literal tuple, which
  `.claude/rules/typescript.md` permits.
- **A negative control for the release-map extraction (subjective to objective), dropped.** The extraction is the
  unit's measurement for claim 1, not a shipped proof. The shipped proof's own plants (`btn-leak`, the document-alone
  default) show the equality separates a difference from none.

## Observations taken

- The guide says "A counterpart cannot be disabled"; the TSDoc's "cannot be `:disabled`" is the true statement, since a
  counterpart takes the `disabled` class. Round 3 carries it.
- `FormComparison.veneer` names the package for the document's cascade. The subjective lane ruled it taste; it stays.

## Carrier

E-ID-BUTTON-CLASSES round 3 (`e-id-button-classes-brief-3.md`, `builder` on Sonnet), then a check by `analyst` on
GPT-6 Astra of the Orchestrator-ruled refusal and a `checker` read of the rename.
