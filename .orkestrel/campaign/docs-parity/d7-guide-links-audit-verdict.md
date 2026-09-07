# Audit verdict — U4 `d7-guide-links`

## Round 1 (2026-09-07, Workflow `wf_abe0dae7-4c2`)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet). Brief: `d7-guide-links-audit-brief.md`. Returns: `d7-guide-links-audit-{subjective,objective,checker}.md`.

### Rulings per claim

- **Claims 1 to 5 — PASS** on every lane; the checker's `VERDICT: PASS`.
- **Claim 6 — FAIL, annotated.** Counts in the report's prose ("four new cases"); every citation held.

### Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| The `#` alternative drops the owner of a member reference: `{@link TemplateInterface#fill}` renders `fill`, `{@link #nextId}` renders `nextId`; the fleet writes both forms (template, interpret, console, database, mcp, terminal, workflow, sse) and template's guide cells carry `` `Template#fill` `` | objective F1, measured by the Orchestrator over `/home/user/fleet/*/src` and `guides/*.md` | U4 fix: the module part before `#` is a package or path token (one carrying `/`, `@`, or `.`); a bare identifier before `#`, or nothing, is a member reference and travels as written |
| "declaration reference" as the name for the `#` form is asserted against no source | objective F2 | U4 fix: name it TSDoc's package-qualified form (`package#Name`) and cite `tsdoc.org/pages/tags/link` in the report, not in the prose |
| The test name says "package part" where the rule says "module part" | subjective F1 | U4 fix |
| The guide bullet drops the "outside a located span" qualifier and breaks the list's shape | subjective F2, F3 | U4 fix |
| The description's trailing modifier reads ambiguously over "label or target" | subjective F4 | U4 fix |
| The gate readings are the writer's own | objective F3 | the guide's `verifier` after U5 and the U4 fix land |

Round 1 closes as `VERDICT: FAIL 6` reconciled: the report annotated; the findings carried into `d7-guide-links-fix`, queued behind U5 in the guide checkout, closed by `checker` and the guide's `verifier`.
