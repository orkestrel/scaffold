# Audit verdict — slice 4a (timeout, tool), over each package's P.1 and P.2

## Round 1 (2026-09-07, Workflow `wf_7a5febfc-2ed`)

Lanes: subjective `reviewer` (Opus 5), objective `reviewer` (Opus 5, the recorded substitution for the dark Sol bench), `checker` ×2 (Sonnet). Brief: `d7n-slice4a-audit-brief.md` (generated before Rulings 11 and 12 and the examples-binding wording reached the template). Returns: `d7n-slice4a-audit-{subjective,objective,checker-timeout,checker-tool}.md`.

### Rulings per claim

- **Claims 2 (timeout) and 15 (tool) — FAIL.** The mapped `examples` binding sits inside the `it`; the brief's own wording. Carried to the fix rounds.
- **Claims 12, 25 — FAIL, annotated.** Counts in prose ("the three cases", "Both H3-documented classes"), one stale line in tool's report, and tool's report describing the pin in words the file does not carry.
- **Claim 20 (tool) — FAIL.** `README.md:10-11` restates the tagline's isolation and correlation clauses. Carried to tool's fix round.
- **Claim 22 (tool) — FAIL on the old scope, ruled PASS under Ruling 11.** The `@returns` rewrite on `ToolManagerInterface.tool` is true and inside the doc block.
- **Claim 9 (timeout, the checker) — read as claim 4's `Shape` split (subjective F1); ruled under Ruling 12.** Carried to timeout's fix round.
- **Claims 21, 24 (tool, the checker) — the pin's wording (Ruling 11) and the writer-only gate evidence (the `verifier`).**
- **Claims 11, 24 — CANNOT RULE**, referred to the per-package `verifier` after the fix rounds.
- **Every other claim — PASS.**

### Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| timeout's `Shape` column renders two idioms | subjective F1, checker 9 | timeout fix (Ruling 12) |
| tool's README restates the tagline | subjective F2, claim 20 | tool fix |
| tool's report quotes a pin form the file lacks | subjective F3, objective F2 | annotated |
| timeout: `clear()` as an English verb; `CLEARS` in capitals | subjective F4, F5, objective F3 | timeout fix |
| timeout: `GUIDE_SPEC` placed after `ROOT_FILES` | subjective F6 | timeout fix: the pilot's constant order |
| tool: `count`'s meaning lost from the guide | subjective F7 | tool fix: the sentence names what `count` reports |
| tool: descriptions restate their remarks (`toolToDefinition`, `ToolManagerInterface`); `createToolManager`'s `@returns` repeats its description | subjective F8, objective F4 | tool fix |
| timeout's `## Contract` section shape | subjective F9 | observation; no change |
| The pin's two forms in the brief | objective F1 | Ruling 11 (already) |
| Displaced facts landing in guide prose beside the table | objective F5 | ruled permitted: the guide prose beside the table is a third destination for a fact a cell carried, recorded in the template |
| timeout: "Surface rows, earlier" names rows that are `Shape` members | objective F6 | timeout fix: the sentence names the `Shape` members |

Round 1 closes as `VERDICT: FAIL 2 12 15 20 22 25` reconciled: 22 passes under Ruling 11, 12 and 25 are annotated, the rest carry into `d7n-{timeout,tool}-converge-fix`, each closed by `checker` and the package's `verifier`.
