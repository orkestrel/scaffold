# Unit b1-survey — fleet adoption probe for Track F (B1) and recorder counts (B4)

Role and engine: `grok` (Cursor Grok bridge). Read-only.

## Objective

One distilled adoption matrix across the fleet answering: which packages still hand-roll what
`@orkestrel/test` already exports, and the current `fences()`/`findUnlisted` and `createRecorder`
populations.

## Context

- Clones: `/workspace/<name>` for every fleet package; `/home/user/scaffold` is the scaffold clone.
- **supervisor is excluded** — user-owned; do not read it. Also exclude every `node_modules/` and
  `dist/`.
- Authority for the helper inventory: read `/workspace/test/src/core/index.ts` and
  `/workspace/test/src/server/index.ts` (and the `types.ts` files they export) FIRST, and take the
  actual export list from there. Expect names like `createRecorder`, `waitForDelay`,
  `createScratch`, `fences`, `findUnlisted` — but the barrel is the authority, not this list.
- The questions come from B1 and B4 in `/home/user/scaffold/.orkestrel/fleet/BACKLOG.md`.
- Host: Linux, bash, ripgrep available. Trees may carry uncommitted wave state — read them as they
  are.

## Unknowns

Whether any test-helper adoption happened during the wave's visits (overwrite does not touch
`tests/`, so likely none) — the matrix answers this; no need to reconcile git history.

## Scope

Read-only. No Edit, no Write, no installs, no builds, no test runs.

## Execution

Perform the survey directly; spawn nothing.

## Output (distillate, never raw dumps)

1. Export inventory of `@orkestrel/test` (core + server barrels), one line per export.
2. Per-package matrix, one row per fleet package:
   `package | imports @orkestrel/test? | helpers imported | local near-duplicates (recorder/delay/scratch/fence-walk) with file:line | guides.test.ts uses fences()/findUnlisted?`
3. Fleet totals: packages importing `createRecorder`; packages using `fences()`/`findUnlisted`;
   local duplicate implementations by kind.
4. The five highest-debt packages (most duplication), one line of evidence each.
5. The exact directories and patterns searched, so the matrix's coverage is explicit.

## Deviation contract

Stop and report on unreadable clones or a dark bench, naming what was completed. Ancillary
formatting choices are yours to decide and record.

## Acceptance

Every matrix claim carries `file:line` or a count with its search scope named; totals derive from
the matrix rows, not estimates.
