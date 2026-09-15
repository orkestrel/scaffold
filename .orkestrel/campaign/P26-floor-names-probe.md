# P26 — what the scaffold 0.0.69 hosted-guide floor adds, and whether mcp collides with it

Orchestrator probe, 2026-09-15 ~18:45Z, read-only, before the mcp visit rather than discovered by
it. Instrument `p26-floor-names.mjs.txt`; the two published tarballs were unpacked into the session
scratchpad.

## The question

The `surface` policy rule compares a target's own exported names against every OTHER package's
hosted `## Surface` table. Scaffold 0.0.69 refreshed the hosted `guides/tool.md` and
`guides/agent.md` mirrors from their pushed mains. A name the refresh ADDS to another owner's table
becomes a new collision for any target that also exports it, the moment that target re-pins and
runs `repair`. mcp re-pins next, so the question is read first.

## The reading

Comparing every `## Surface` table in `dist/host/guides` of the published scaffold 0.0.68 against
the published 0.0.69, across every owner the floor carries:

| Owner | Names the refresh added |
| --- | --- |
| tool | `ToolManagerEventMap`, `ToolManagerOptions`, `ToolContext`, `ToolAnnotations`, `ToolErrorCode`, `ToolErrorContext`, `ToolError`, `isToolError` |
| every other owner | none |

Those are the tool 0.0.15 contract adoption's own names. The mcp guide's `## Surface` table claims
none of them, and neither do the mcp checkout's declarations: a grep for an exported declaration of
each name over `src/**` and `tests/setup*.ts` returns nothing.

So the 0.0.69 floor refresh adds no collision to mcp, and the visit's only expected change to the
policy reading is the one it exists for: the vendored reader accepting the exported function
overload at `src/core/helpers.ts:837` that the 0.0.68 reader refused.
