Report headings "Item 1", "Item 2", "Item 3" are identifiers, not counts. Prose text: "The pitch check was not named there before this edit, so the clause was added" — no count stated. No numeral count in prose found. Report names each item's hunk (diffs under Item 1/2/3 headings) and states no count in prose.

Lane held: checker guide

**Claims 8, 9, 10 (guide, this lane):**

8. PASS — the diff and status both show only `README.md` and `guides/guide.md` changed: status file `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-guide-pitch-row.status.txt:1-2` (`M README.md`, `M guides/guide.md`), diff `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-guide-pitch-row.diff.txt:1,14` (only these two `diff --git` headers).

9. PASS — tree evidence at `/home/user/fleet/guide/guides/guide.md:568` (EQ bullet) immediately followed by `/home/user/fleet/guide/guides/guide.md:576-581` (RQ bullet, same `- **RQ — ...**` shape), which states "The pair is outside `findDrift`" (line 577) and "the drop-in's README case is the gate" with a `Guard:` clause (lines 578-581). § Tests at `/home/user/fleet/guide/guides/guide.md:816-817` reads "...FI, SQ, MQ, EQ, and RQ" — RQ named after EQ.

10. PASS — report `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-guide-pitch-row-report.md:1-53` names each item's hunk under "Item 1" (lines 3-21), "Item 2" (lines 23-35), "Item 3" (lines 37-52); no numeral count appears in the report's authored prose (numerals present, e.g. `README.md | 2 ++` at line 59 and `54 passed (54)` at line 95, are quoted command output, not authored prose claims).

**Abort claims 1–7:** CANNOT RULE — outside this lane; the abort checker lane rules on these against `/home/user/fleet/abort`.

**Findings outside the claims:**
- None found in the guide diff, report, or tree scope reviewed.

VERDICT: PASS