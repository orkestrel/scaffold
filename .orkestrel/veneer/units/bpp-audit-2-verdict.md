# Audit verdict — B-PASSIVE-PROSE (`bpp`), round 2, the fix round (2026-09-23)

Subject: `bpp-2.diff` against `87ff1d0` in `/home/user/veneer-bpp`, `bpp-2-status.txt`, the report `b-passive-prose-report-2.md`; claims `bpp-audit-2-claims.md`; effective brief `b-passive-prose-brief-3.md` (successor of `-brief-2.md`, the fix-round brief, after the container restart). Lanes: the objective lane on `reviewer` on Opus 5.5 (`bpp-audit-2-objective-verdict.md`), substituted for `analyst` on Astra because the Codex bench is dark on quota (ROADMAP § Standing conditions), and `checker` on Sonnet (`bpp-audit-2-checker-verdict.md`), blind on one claims file. The writer was `builder` on Sonnet; the objective lane ran on an engine that did not write it. The subjective lane was not run: the subject is doc-comment noun insertion over the fixed D42 vocabulary and a report, with no API shape, name, or design fit for that lane to argue; round 1 ran the same lanes for the same reason.

| Claim | Objective (Opus) | Checker | Reconciled |
| --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 F1 closed | CONFIRMED on the claim's terms; O1 outside it | — | CONFIRMED as claimed; O1 carried by round 3 |
| 3 F2 closed | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 F3 closed | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 The `engine` field | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 The split unchanged | CONFIRMED (mutation distinguished; green run UNRESOLVED for the verifier) | — | CONFIRMED; the landing gates take the run |
| 7 F5, F6, F7 in the report | CONFIRMED | CONFIRMED; counts listed | CONFIRMED; the report's counts recorded (O4) |
| 8 Law and gates | BROKEN: counts in two rewritten lines (`setupStyles.ts:3960` "the three rules"; `setupServer.ts:1987` "hundreds") | — | BROKEN: round 3 deletes both |

Findings outside the claims (the objective lane): O1 bare `{@link}` tags ruled "permitted" by position, which no rule grants — round 3 gives each its D42 noun; O2 the sweep pattern cannot cross a doc-comment continuation — round 3 records the corrected pattern with a planted positive control; O3 the ledger marks untouched lines as rewritten and one rewritten line as permitted — the round-3 report ledgers only the lines round 3 changes, correctly; O4 counts and O5 banned terms and an elided command in the report — the report is retained as returned with the faults on record, and the round-3 report states no count, no banned term, and no elided command; the `renderRuleKey` two-noun observation — round 3 rewrites "this function" to "this helper" at `setupServer.ts:1395`. The lane's referrals (nested relative clauses at `setupStyles.ts:255`, `:432`, `:465`, `:488`, `:1046`; comment line length) are recorded and take no fix round (ROADMAP § Protocol: no fix round on a prose finding); the nouns and counts are code-token conformance the unit exists to close, so round 3 runs as the same unit's third round on `builder`.

Carrier: `b-passive-prose-brief-4.md` (round 3). Landing: after CLOSE-GUIDE, with the § Tests patch applied to the landed guide at integration.

VERDICT: FAIL 8; outside the claims: O1, O2, O3, O4, O5 — carried by round 3
