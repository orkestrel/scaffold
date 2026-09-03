# Addendum to the conform-ollama brief — incoming consumer edits, taken first

The closure staged for this unit carries the landed tips of its `@orkestrel` dependencies, guide included. Apply the following edit first, exactly as given, and record it under a `## Consumer edits taken` section of the report with the line now. A vendored `guides/<dep>.md` mirror is never edited by hand: it refreshes at the wave.

1. **guide's `symbol.kind` → `symbol.keyword`** (`reports/conform-guide-report.md:154-163`): `tests/guides.test.ts:120` reads `.filter((symbol) => symbol.keyword === 'function')`.

Router's landed renames oblige no ollama edit (`reports/conform-router-report.md:176-178`). Mirrors refreshed at the wave, not here: `guides/agent.md`, `guides/workspace.md`, `guides/queue.md`, `guides/guide.md`, `guides/contract.md`.
