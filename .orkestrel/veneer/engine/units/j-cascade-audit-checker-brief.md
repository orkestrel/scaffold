# J-CASCADE audit — the checker

## Role and engine

`checker` on Sonnet, a native read-only Claude subagent (Read, Grep, and Glob). Perform the assignment directly and spawn nothing.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, then the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-cascade-audit-claims.md`, then the writer's report `units/j-cascade-report.md` beside it.

## Subject

The snapshot of Veneer `a963585` at `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-cascade-a963585/`, with the diff `j-cascade.diff` and the status `j-cascade-status.txt` beside it. Read no other checkout.

## Focus

Rule mechanically on claims 1 and 8 only.

- **Claim 1.** In `tests/src/browser/Alert.test.ts`, `Tab.test.ts`, `Toast.test.ts`, and `Tooltip.test.ts`, search for these and report every hit:
  - `.fade {`;
  - the phrases `declares no fade`, `does not carry`, and `does not` near `fade`;
  - the constants `fade` and `FADE`.

  List every case that awaits a fade, meaning it uses `getAnimations`, `finished`, or the engine's completed event after a fade-token class. For each, state whether it loads `tokensCascade` (or the `_tokens.scss` import), `fadeCascade` (or `_fade.scss`), and the component's own sheet.
- **Claim 8.** Confirm the status lists exactly the six test files and `guides/veneer.md`. For each import and module-level constant in the six files, report whether it has a use.
- **The report's case titles.** Confirm that each title quoted under C1, C2, and C3 exists in its file.

Rule on no behaviour and no prose.

## Output

- Claim 1's hit list and its case table.
- Claim 8's reading.
- The titles not found.
- One terminal line: `CHECK: PASS` or `CHECK: FAIL <items>`.
