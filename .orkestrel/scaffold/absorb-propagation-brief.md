# Absorption brief: absorb-propagation

## Read-only

You are read-only. Do not edit any file. Do not propose a decision or a design. Do not paste raw
file contents. Return distilled evidence only, every fact backed by a `file:line` pointer.

## Question

Verify PROPOSAL.md's mapped pointers against this checkout, and distill the full propagation
surface the migration (scaffold as single host for the instruction set; targets carry small
pointer files; instruction members leave the vendored-into-target set) touches.

## Evidence to gather (file:line pointers required, no dumps)

1. `src/core/constants.ts`: the `HOST_PATHS` constant (PROPOSAL.md claims lines 124-159). Report
   the exact member entries and the shape (fields) per entry. Find every consumer of `HOST_PATHS`
   across `src/` and `tests/`.
2. `src/server/helpers.ts`: `stageHost` and `stageInventory` (PROPOSAL.md claims 1382-1534). Report
   what each function stages, where `dist/host` and `host.json` are produced, and which entry
   fields the inventory records (digest, group, destination, or other).
3. `src/server/Materializer.ts` restoration behavior (PROPOSAL.md claims 291-314) and the `audit`
   and `repair` commands in `src/bin/CLI.ts`. Report how the inventory drives audit findings and
   repair writes. Confirm whether repair writes only missing and stale entries and never deletes an
   unmanaged file.
4. `src/core/helpers.ts`: `inferGroup` (PROPOSAL.md claims 216-227). Report the exact group labels
   and how each is derived.
5. `tests/config.test.ts` (PROPOSAL.md claims 594-686). Report what it pins about the committed
   `host.json` versus fresh generation.
6. `tests/setupPolicy.ts`: the skill-family inspection (PROPOSAL.md claims 1242-1434) and the
   provider-bridge inspection (PROPOSAL.md claims 1444-1561). Report what each requires, and what
   happens when the `.agents/skills` or `.claude/skills` tree is absent from a repository under
   inspection: does the inspection pass on absence, or fail?
7. `guides/scaffold.md` and `guides/guide.md`. Report which sections describe the host inventory,
   the vendored surface, `audit`, and `repair`, with section names and line pointers. Report any
   explicit member list that must change alongside `HOST_PATHS`.
8. `host.json`. Report the committed entry shape (top-level keys, one sample entry's fields) and
   the shape `tests/config.test.ts` compares it against.
9. Any other reader of `host.json`, `dist/host`, or the vendored path list, across `src/`, `tests/`,
   `scripts/`, and `package.json` (`files`, `bin`, scripts).
10. `src/core/types.ts`: the types describing host entries, inventory, and groups (names and
    fields, with line pointers).
11. `README.md` and `ROADMAP.md`: any row or section describing propagation or vendoring that this
    migration makes false.

## Output shape

Return exactly:

- **Question**: one line.
- **Evidence**: concise facts with `file:line` pointers, organized by the numbered item above.
- **Distillate**: the smallest context a design round needs to plan the migration.
- **Unknowns**: unresolved facts, not recommendations.

No process diary. No decisions. No design. No raw file dumps.
