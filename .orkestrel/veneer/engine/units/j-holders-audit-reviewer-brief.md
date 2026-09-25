# J-HOLDERS audit — the subjective lane

## Role and engine

`reviewer` on Opus 5.5, a native read-only Claude subagent with a clean context (Read, Grep, and Glob). Perform the assignment directly and spawn nothing. You hold the subjective lane: shape, naming, and design fit.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, especially the design laws on centralizing by kind, minimal public API, single-word members, and superfluous wrappers.
- `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md`, `.claude/rules/architecture.md`, and `.claude/rules/typescript.md`.
- The claims file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-holders-audit-claims.md`, and the writer's report `units/j-holders-report.md` beside it.

## Subject

The snapshot of Veneer `ef320ca` at `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-holders-ef320ca/`, with the diff `j-holders.diff` and the status `j-holders-status.txt` beside it. The status is:

```
M	guides/veneer.md
M	src/browser/HostSnapshot.ts
M	src/browser/Isolation.ts
M	src/browser/Modal.ts
M	src/browser/ScrollLock.ts
M	src/browser/types.ts
M	tests/src/browser/ColorMode.test.ts
M	tests/src/browser/Modal.test.ts
M	tests/src/browser/ScrollLock.test.ts
```

## Focus

- **H4's public surface.** The kind rule put `HostSnapshot`'s private record shapes (`HostSnapshotEntry`, `HostSnapshotRecord`, `HostSnapshotHolding`, and `HostSnapshotPresence`) in `types.ts`, which the barrel exports. So they are now public API, each with a § Surface row. Rule whether that fits "Minimal public API" and "Centralize by kind" together, or whether the repository has a placement for a private shape that keeps it out of the barrel. Search `src/browser/types.ts` and its barrel for existing precedent: a type exported only because a class uses it internally. Rule on each name under `names.md`.
- **H1 and H2's shape.** Rule whether `Modal`'s `#open` snapshot and `Isolation`'s split between a claims list and a snapshot read as one concept each. Rule whether ScrollLock's stated reason for staying is the right reason.
- **The guide.** Rule on the § Engine sentences the unit changed, and on the four § Surface rows' voice.

Rule on no behaviour; the objective lane holds that.

## Output

Give numbered findings, each with its `file:line` and a verdict: CONFIRMED-FIT, CHANGE with the exact prescription, or REFUSE with the reason. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <findings>`.
