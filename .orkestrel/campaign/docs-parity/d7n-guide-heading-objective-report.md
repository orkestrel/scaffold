Lane held: objective.

CONFIRMED: reader defect. The packed guide artifact at hash 2b76b363 returns the
neutral table row with summary, but the otherwise identical document with an embedded
Widget code token in a demonstration heading returns the class without summary.
Evidence: tmp/pass/d7n-guide-heading.log.txt:1. The assertion fails on that lost field
at the log's line 8. The instrument changes only the heading text and proves the neutral
case first: C:/Users/mikes/WebstormProjects/mcp/tmp/d7n-guide-heading/probe.mjs:13.

The contract does not document this trigger as a limitation. It admits backticked H3
entity headings, defined as classes documented outside a table, and says table rows
carry their Summary cell. Evidence: C:/Users/mikes/WebstormProjects/guide/guides/guide.md:110
and line 320. The parity contract requires a guide Summary cell to equal its export's
description paragraph: .claude/rules/documentation.md:31.

The implementation is broader than that contract. It registers any H3 containing a
code span as a summary-less class and records the key in seen:
C:/Users/mikes/WebstormProjects/guide/src/core/helpers.ts:1525. The later table row is
skipped when that key is already present at line 1513. SurfaceSymbol.summary being
optional represents a side that carries no text; it does not authorize dropping text
that a table row carries: C:/Users/mikes/WebstormProjects/guide/src/core/types.ts:21.

Earlier retained guide work does not cover this trigger. It placed Guide, Source,
and SourceManager rows before their intentional code-only entity H3 headings so the
summary-bearing row wins first-seen deduplication. Evidence: d7-guide-converge-brief.md:33,
d7-guide-converge-audit-objective.md:12, and d7-guide-converge-report.md:92.
Those records do not admit an embedded demonstration heading as an entity heading
or change the reader. The mcp wording change at
C:/Users/mikes/WebstormProjects/mcp/guides/mcp.md:1868 removes this input from that
guide but leaves the reader unchanged.

Release implication: Ruling 8 requires a reader defect found by a package to be fixed
in guide before 0.0.18 publishes: rulings.md:30. Guide publication remains blocked
despite the mcp workaround. The handoff fixes the head start at tip 1d5afa3 and hash
2b76b363, and requires stopping on a different hash. This assessment does not authorize
substituting another artifact or claiming a replacement hash. Publishing remains
subject to the owner's explicit authorization.

Attacked and held: a genuine code-only entity H3 remains documented behavior, and
the retained row-before-entity-H3 ordering works for that case. That behavior does
not make an embedded demonstration heading part of the documented population.

VERDICT: PASS

The Orchestrator retained the returned assessment with prose-only normalization.
The substantive verdict and cited evidence remain unchanged.
