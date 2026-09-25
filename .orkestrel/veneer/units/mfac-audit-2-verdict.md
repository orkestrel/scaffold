# E-ID-MOTION-FACTOR audit round 2 — verdict

The Orchestrator's reconciliation of the audit round over E-ID-MOTION-FACTOR round 2, on one claims file
(`mfac-audit-2-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`mfac-audit-2-objective-verdict.md`, thread
`01a0d76f-8771-76a2-81af-929d0efe2f71`), and the subjective lane, `reviewer` on Opus 5.5
(`mfac-audit-2-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so the objective lane ran
on an engine that did not write the work.

**Verdict: FAIL 3, 7; outside the claims: F3, R1.** Every factor read stays in the tokens, the subtree cases and the
plants kill, the sweep reader and its proof hold, the routing changed no assertion but the tolerance, § Factors'
exception list is exact, the ledger rows hold, and the gates are green. This is the unit's third round, so the
Orchestrator rules the fix (`e-id-motion-factor-brief-3.md`), and Astra checks the Orchestrator's text.

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 Every factor read stays in the tokens | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The subtree cases | BROKEN (wording) | CONFIRMED | CONFIRMED |
| 3 The rounding tolerance | CONFIRMED | UNRESOLVED | BROKEN; round 3 closes it |
| 4 The sweep reader | CONFIRMED | CONFIRMED | CONFIRMED, with F3 |
| 5 The routed cases | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 § Factors | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 F2 and the prose | CONFIRMED | BROKEN | BROKEN |
| 8 The ledger rows | CONFIRMED | CONFIRMED | CONFIRMED |
| 9 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 2.** The claims file said the subtree cases compare with `toBe`; the progress case compares
  `toEqual([600, 600])`. Both comparisons are exact, and both lanes read each plant's kill, so the property holds. The
  claim's letter was the Orchestrator's error.
- **Claim 3 (subjective, derived).** The `closeTo` bounds reject a doubled duration and a whole-millisecond error, as
  Astra ran against the installed matcher. A zeroed resting duration never reaches them: the case narrows the resting
  reading through `requireValue`, which throws a plain `Error`. The declared-duration case still fails with an
  assertion, so the suite catches the mutation, but the claimed case does not. Round 3 asserts each reading's presence
  before it is narrowed, in every routed case that narrows one.
- **Claim 7 (subjective).** Four sentences fail the first read: the progress comment's and the form-floating comment's
  "it", which attaches to another noun; the § Factors clause "one § Departures records against the release, such as the
  `.icon-link` transform's", with an elided relative pronoun and a possessive with no noun; and the pagination
  comment, which states the easing fact a second way ("because `--vn-ease-standard` resolves to `ease`").

## Findings outside the claims

- **F3 (subjective), accepted.** The reader's `@throws` text says the scene is restored; the code clears it.
- **R1 (subjective referral), accepted as claim 3's fix.**
- **R2 (subjective referral), settled** by claim 2's ruling.
- **R3 (subjective referral), settled.** The type admits an async drive; the TSDoc states the drive runs synchronously,
  and every caller is synchronous. An async drive's readings would be promises, which each caller's assertions reject.
- **R4 (subjective referral), observation.** The reader's first proof case ran 7036 ms and 9378 ms alone under load
  against the 15000 ms browser default; the landing chain's `setup:browser` step reads it on the landing tree.
- **R5 (subjective referral), settled.** `mfac-instruments/r2/mfac-2-subtree-green.log.txt` is the interim run that led
  to the rounding tolerance, not a gate; `mfac-2-gates.sh` names the gates.
- **The subtree paragraph in § Factors (subjective, attacked and held).** "A subtree that sets a factor alone keeps the
  root's lengths" is true and names only lengths, although the round's subtree cases prove the same of durations.
  Round 3 names both.
