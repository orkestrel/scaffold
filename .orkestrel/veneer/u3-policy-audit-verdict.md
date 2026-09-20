# U3-policy audit round 6 — verdict

Round of 2026-09-20 on `u3-policy-audit-claims.md` (8 claims) over the cumulative U3-policy diff
(`units/u3-policy-report-6.md`). Sonnet (`builder`) wrote the unit. Objective lane `reviewer` on
native Opus 5 (`units/u3-policy-audit-reviewer-brief.md`, report
`units/u3-policy-audit-reviewer-report.md`); subjective lane `analyst` on Astra through
`codex exec --sandbox read-only` rooted at the scaffold checkout
(`units/u3-policy-audit-analyst.sh`, report `units/u3-policy-audit-analyst-report.md`, thread
`01a0be8a-2885-7b91-a5b2-25aa541333eb`). Both lanes ran blind on the one claims file. Rounds 1 to
5 ran the objective lane alone (`units/u3-policy-review-report.md` through `-5.md`,
briefs `units/u3-policy-review-brief.md`), a deviation this round closes.

## Reconciliation

| Claim | Reviewer | Analyst | Ruling |
| --- | --- | --- | --- |
| 1, 2, 4, 6 | CONFIRMED | CONFIRMED | confirmed |
| 3 | REFUTED on the description (the remark says the angle branch alone admits a fragment; both do) | REFUTED on composition (`](<./x.md>)` refused; a fragment ending `.md` captured as a name; the fragment class admits a space and an unmatched `>`) | refuted; carried |
| 5 | CONFIRMED | REFUTED (`guides/absent.md` and the `other` assumption against the live root) | refuted; the analyst's reading wins and the reviewer's finding 11 records the same bound; carried |
| 7 | REFUTED (the ruling is false of the file that ships it: this index links every mirror in prose) | REFUTED (an index link is navigation, not authorship) | refuted; both lanes, from different evidence, reject the Orchestrator's round-3 ruling |
| 8 | UNDECIDABLE | UNDECIDABLE | the Orchestrator's readings stand (`test:policy` 117, `test:config` 173 after the rebuild); the verifier runs the chain at acceptance |

## Ruling

The round-3 ruling ("an index link is the workspace's own claim to author that guide") is
withdrawn. The Orchestrator surveyed every fleet index on the host: scaffold, Test, and Veneer map a
workspace directory to its guide in a directory-index table row and link mirrors only in prose;
Elements and Roughnotes carry no such rows. A directory-index row is the workspace's statement that
the guide documents that directory; a prose link is navigation. The accounting becomes: the
package's own guide, the map, a guide the directory index maps, or a catalog row. A mirror the
catalog stops registering is mapped by no row, so it reports as a stray again — one actionable
report naming the catalog. Successor brief 7 (`units/u3-policy-brief-7.md`) rewrites the reader to
read rows, carries the pattern corrections, moves the last two live-root assumptions into a
scratch root, gives every control row its expected `path`, unifies the vocabulary (map for the
file, index for the table), and proves the result in Veneer and Test before restoring their
vendored copies.

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| the ruling; the reader reads links, not rows | analyst 7, reviewer 7, 9 | brief-7 § 1, § 5 |
| pattern composition (`<./x.md>`, fragment `.md`, fragment class) | analyst 3 | brief-7 § 2 |
| the remark and case title on fragments | reviewer 3 | brief-7 § 5b |
| `absent.md` and `other` against the live root | analyst 5, reviewer 11 | brief-7 § 3 |
| control rows assert no `path` | analyst 9 | brief-7 § 4 |
| "map" versus "index" | reviewer 10 | brief-7 § 5b |
| the Node remark reversed | analyst 7 | brief-7 § 2 |

## Dropped, on the record

Nothing.

Ruling (round 6): fix round.
