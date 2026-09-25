# J-SAMEWAY-ENGINES-A rounds 2 to 4 audit — the subjective lane

## Role and engine

`reviewer` on Opus 5.5, a native read-only subagent with a clean context. Perform the assignment directly and spawn nothing. You hold the subjective lane: API shape, naming, vocabulary, and design fit. Opus 5.5 wrote the rounds; the objective lane runs on GPT-6 Astra, so the round holds one lane on an engine that did not write it.

## Why this lane runs now

Rounds 2 to 4 added a public shape: `HostChange` and the leaves `readHostValue`, `readHostPriority`, `writeHostValue`, `recordHostChange`, and `rewindHostChanges` in `src/browser/helpers.ts`. Round 3's audit ran no subjective lane, because round 4 was going to change `HostChange` again. This lane audits the settled shape once.

## Read first

- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `architecture.md`, and `patterns.md`.
- The claims file, `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-audit-claims-4.md`.

## The evidence

Evidence is supplied because this lane cannot run git. Read these files, under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`:
- `j-sameway-engines-a-shape-2to4.diff`: `types.ts`, `helpers.ts`, `HostSnapshot.ts`, and the guide over `2760f7e`, which is the whole shape;
- `j-sameway-engines-a-4.diff`: the round-4 change over `dc2a1a7`;
- `j-sameway-engines-a-report-4.md`.

The subject files at the tip are identical to the worktree copies under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a/`, which the Orchestrator committed as `3f62d64` with a clean status. Read `src/browser/helpers.ts`, `src/browser/types.ts`, `src/browser/HostSnapshot.ts`, and `src/browser/Collapse.ts` there for context.

## Your claims

Rule claims 4 and 7 from the claims file, and these:

8. **The leaves read as one family.**
   - Each leaf's name follows `names.md`'s module-helper form, and the family uses one term per concept. Check value, priority, change, record, and rewind.
   - `writeHostValue`'s optional `priority` parameter is the right shape. Compare it with an options object, a required parameter, or a separate writer, and rule on each.
   - `HostChange`'s fields follow `HostSnapshotRecord`'s terms.
9. **No superfluous wrapper.** Each leaf adds a boundary, an invariant, or a translation that `AGENTS.md`'s wrapper rule admits. `readHostPriority` is not merely a rename of `getPropertyPriority`.
10. **The TSDoc and the § Surface summaries** state each leaf's contract in one plain sentence. Rule the voice only where it changes what a reader can rely on.

## Output

Give a per-claim ruling: CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence. Then list any shape defect outside the claims, with the change that repairs it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
