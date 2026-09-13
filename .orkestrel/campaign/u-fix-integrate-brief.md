# Integration brief — u-fix-integrate (Orchestrator-owned, recorded after the fact)

## Role and engine

Orchestrator, Opus 5, in `/home/user/scaffold`, after the U-fix implementer exited and before the
fix-round audit was dispatched.

## Objective

Integrate the U-fix unit: regenerate the vendored inventory the unit's guide edit invalidated, run
the authoritative gates, and commit the unit's code with its report.

## Scope

Owned: `host.json` (regenerated, never edited by hand). Off-limits: every file the U-fix brief owned.

## Acceptance criteria

1. `npm run build` exits 0 and rewrites `host.json`.
2. `npm run test:config` exits 0 — the inventory case reads the regenerated digest.
3. The gate chain in `evidence/linux-gate/final-verify2.sh` exits 0 on every row.

## Why this pair exists

The fix-round audit's claim 12 found the `host.json` change in `c2a42a1..373d29e` with no
brief-and-report pair on disk. `.agents/orchestration.md` § Dispatch anatomy requires the pair of
every Orchestrator-owned integration unit. This brief records the unit as it ran; the report beside
it records what it measured.
