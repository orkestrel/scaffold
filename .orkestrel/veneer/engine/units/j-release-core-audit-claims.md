# J-RELEASE-CORE round 1 — audit claims (2026-09-25)

**Subject.** Veneer `d702bb8` on `unit/release-core` over `63eabbd`. Read the files at `d702bb8` with `git -C C:/Users/mikes/WebstormProjects/veneer show d702bb8:<path>`, or in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core`, which holds `d702bb8` clean.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The brief `j-release-core-brief.md` and the report `j-release-core-report.md`.
- `j-release-core.diff`, which covers the new files, and `j-release-core-status.txt`.
- The mutation instrument `j-release-core-mutate.mjs` with `j-release-core-mutations.json`, and the unit's logs: `-mutations.log.txt`, `-m1-policy-base.log.txt`, `-m1-policy-control.log.txt`, and `-m2-m3-button-red.log.txt`.
- The Orchestrator's replay: `j-release-core-replay-1.log.txt` (the instrument is `../tools/replay-release-core-1.sh`).
- The design record: the two proposals `j-release-design-3-planner-proposal.md` and `j-release-design-3-analyst-proposal.md`, and the sweep maps `j-release-sweep-s5-map.md` and `-s6-map.md`.

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, and `documentation.md`.
- `../decisions.md` § E13 with every amendment, § E24 with every amendment, § E25, and § E35.

## Claims

1. **`Lifetime` meets E35's contract.**
   - `destroy` aborts the signal once, then drains every pending holding, newest first, on every call.
   - A holding stays pending while its release runs, so a nested `destroy` runs that release again. An entry ends only while it is still the same entry.
   - `hold` on a lifetime whose destruction has begun runs the release at once and returns `false`.
   - A release that throws ends its holding. The drain gives back every other holding and then rethrows the first error.
   - Rule on the abort's own dispatch: listeners on the signal run before the drain. Say whether any of them can observe a state E35 forbids.
2. **`Lifetime.join`.**
   - With a lifetime's signal, it enrolls the class as a holding of that lifetime, with `destroy` as the release.
   - With a foreign signal, it destroys the class on abort, or at once when the signal has already aborted. That listener is removed when the class's own lifetime ends.
   - With no signal, it does nothing.
3. **A class destroyed directly stays enrolled in its owner** until the owner releases it or is destroyed. The unit documents this. Rule three things:
   - whether an owner that creates and destroys a joined child on every change would grow its ledger without bound once the J-RELEASE units adopt `join`, for example a dropdown whose each show builds a placement;
   - what rule an adopting owner must follow to avoid it, for example ending a joined child through `release(child)` and never through `child.destroy()`;
   - whether that rule belongs in E35 and in `LifetimeInterface`'s remarks.
4. **`HostSnapshot.write` meets E35's save moment.**
   - It resolves the target once.
   - At a write that changes the target, it saves, creating or joining the record, and then writes.
   - At a write that changes nothing, it writes nothing, and it joins the record only when another snapshot holds it or a restoration still has it to write back. Otherwise it records nothing.
   - Rule whether joining a record that a restoration still has to write back is within E35's narrowing ("joins the record a live holder holds"), and whether the unit's case for it is right.
5. **One predicate.** `matchesHostValue` in `helpers.ts` is the single comparison that `HostSnapshot.write`, `recordHostWrite`, and `rewindHostWrites` use. `recordHostWrite`'s signature is unchanged, and its callers' behaviour is unchanged.
6. **`Button` adopts both.**
   - It saves nothing at construction, and it toggles through `write`.
   - `destroy` releases the registry claim once, before the drain, and drains on every call.
   - B1, a button that wrote nothing restores nothing, reads red at `63eabbd` by an assertion. So does the nested drain, in which a reaction to the restoration's first write calls `destroy` and reads the host restored.
7. **The mutations bind.**
   - Every row in the replay reddens a named case by an assertion, and no row is skipped.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
8. **The contract and the prose are true.**
   - `LifetimeInterface`, `LifetimeHolding`, and `HostSnapshotInterface.write` in `types.ts` hold for the code, and so does the `ButtonInterface` and `ButtonOptions` wording.
   - The guide's `#### LifetimeInterface`, `#### HostSnapshotInterface`, `#### ButtonInterface`, and § Ownership and restoration hold for the code.
   - The Surface rows equal their TSDoc summaries.
9. **Scope and shape.**
   - The changed paths are the report's twelve.
   - `Lifetime` is one class flat at `src/browser/`, with no nested function and no type assertion.
   - `LifetimeHolding` is a reusable type in `types.ts`, and `matchesHostValue` is exported and tested.
   - No compatibility path remains: `save` stays because other engines still call it (E35).

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `d702bb8`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
