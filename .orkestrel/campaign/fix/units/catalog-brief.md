# Unit catalog — regenerate the catalog table from the registry

## Role and engine

Orchestrator-owned command unit: the Orchestrator runs scaffold's own `catalog` command in the
scaffold checkout as a tracked command and reads the diff. Verdict by `checker` on Sonnet.

## Objective

`.claude/agents/orkestrel.md` carries the package table regenerated from the registry on the day
the breaking phase opens, so every wave reads a live `Layer` column and live versions.

## Scope

Owned: `.claude/agents/orkestrel.md` (the catalog table), and whatever else the command writes in
this checkout, each such file read and ruled on before commit. Off-limits: every other checkout.

## Acceptance criteria

1. The command's output is quoted with its exit code.
2. Every row's version matches the registry reading taken in the same run; the rows that moved
   since 2026-08-28 are named (contract and process are known stale).
3. The `Layer` column of the regenerated table is compared with the column the plan used, and any
   moved package is named.
4. `git status --short` after the run lists the files the command wrote, each ruled on.
