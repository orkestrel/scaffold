# AP-TYPE audit, round 4 — the Orchestrator's reconciliation (2026-09-24)

Claims: `apt-audit-4-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`apt-audit-4-objective-verdict.md`, thread `01a0d58f-bf55-7ff1-958b-88e2e5d6127b`); the
subjective lane, `reviewer` on Opus 5.5 (`apt-audit-4-subjective-verdict.md`); and `checker` on Sonnet
(`apt-audit-4-checker-verdict.md`). The unit was written by `builder` on Sonnet, so both lanes ran on engines that did
not write it.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | UNRESOLVED | CONFIRMED, cascade clause UNRESOLVED | Held. The objective lane ran `cmp` and read exit 0; the Orchestrator's logged run reads the same (`apt-instruments-4/apt-4-cmp-orchestrator.log.txt`, equal SHA-256 digests). The edit scope held in every lane. |
| 2 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 3 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 4 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |

## Findings outside the claims and carriers

| Finding | Source | Ruling | Carrier |
| --- | --- | --- | --- |
| N1: § Text utilities opens "The partial writes every entry" after a sentence naming `_text-truncation.scss`, and brief 4 declared that sentence unchanged | subjective S1 | Holds; the same class as J2 and L2. | AP-TYPE round 5 (`ap-type-brief-5.md`), as a sweep of every such sentence |
| N2: the font context keeps "responsive" for the breakpoint infix at `_font.scss` (the cap-block comment) and in the `FONT_ENTRY_CASES` TSDoc | subjective S2 | Holds. | AP-TYPE round 5 |
| N3: the round-4 report, brief 4, and the round-4 claims state counts | objective F1, subjective S3, checker F1 | Holds. The report copied the brief's own title, so the brief is the Orchestrator's defect. | AP-TYPE round 5's report, which supersedes the round-4 report's prose; the Orchestrator's successor artifacts state no count |
| N4: the failing-first erratum names neither the mutations nor their logs | subjective S4 | Holds. | AP-TYPE round 5's report |
| N5: the `cmp` row had no log | checker F2, subjective referral | Closed by the Orchestrator's logged run. | Closed |
| N6: the retained report named launch paths | subjective referral | Closed: the retained report names retained paths. | Closed |

## The seam ruling

This is the fourth AP-TYPE round, and every finding since round 2 is prose; the source hunks have held since round 2.
The class recurs through new sites, so round 5 sweeps the class rather than the sites:

- **Invariant.** In `guides/veneer.md`, every sentence that opens "The partial" or "This partial" describes the
  partial its nearest preceding partial path names; in the font context, the breakpoint-infix walk is called "takes a
  breakpoint infix" and never "responsive"; a report cites the log behind every reading it relies on and states no
  count.
- **Bound.** Change only a sentence the invariant finds false; name the partial rather than rewriting the paragraph.
- **Interface.** The guide's "The partial" and "This partial" sentences, the font partial's comments, the
  `FONT_ENTRY_CASES` TSDoc, and the round-5 report.

VERDICT: FAIL none; outside the claims: N1, N2, N3, N4
