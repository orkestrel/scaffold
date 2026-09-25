# J-RELEASE-CORE round 3 — audit claims (2026-09-25)

**Subject.** Veneer `8b4e9d6` on `unit/release-core` over `03526bc`. Read the files at `8b4e9d6` with `git -C C:/Users/mikes/WebstormProjects/veneer show 8b4e9d6:<path>`, or in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core`, which holds `8b4e9d6` clean.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The brief `j-release-core-brief-3.md` and the report `j-release-core-report-3.md`.
- Round 2's verdict `j-release-core-audit-2-verdict.md`, with § The seam, and its objective verdict.
- `j-release-core-3.diff` and `-3-status.txt`.
- The instruments `-3-mutate-3.mjs`, `-3-build-mutations-3.mjs`, `-3-mutations-3.json`, and `-3-accept-3.sh`.
- The log `-3-mutations-3.log.txt`.
- The Orchestrator's replay: `j-release-core-replay-3.log.txt` (the instrument is `../tools/replay-release-core-3.sh`).

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/typescript.md`, `tests.md`, and `documentation.md`.
- `../decisions.md` § E35 with its amendment.

## Claims

1. **`join`'s owner branch uses no event listener.**
   - After `owner.hold(resource, …)` returns `true`, `join` holds, in the class's own lifetime, a record `{ owner, resource }`. That record's release calls the owner's private `#end(resource)`.
   - `#end` removes the holding by record, runs no release, and throws nothing.
2. **A joined child's release error propagates.** The cases "rethrows a joined child's release error from the owner's destruction …" and "… from the child's own destruction …" read red at `03526bc` by assertions, with the errors reported as unhandled there. They read green at `8b4e9d6`.
3. **An ended class lifetime leaves the owner nothing.** When the class lifetime has ended before `join`, its `hold` returns `false` and runs the ending at once. The case reads red at `03526bc` and green after.
4. **Reach stays whole.**
   - The ending is the class lifetime's oldest holding, so it runs last in that drain.
   - An owner destruction nested in the child's drain, before the ending, still reaches the child and returns with every holding given back. So does the `Button` restoration-reaction case.
   - Rule the precondition the report names: the ending is oldest only when the class lifetime holds nothing before `join`. Say whether any shipped class, or any adopting class E35 plans, violates it, and whether the remark that states it is enough.
5. **The mutations bind.**
   - Every `mutate-3.mjs` row fails its named cases by `AssertionError`.
   - The one recursive row, `ending-releases`, also fails by `RangeError`, and its non-recursive twin `ending-releases-once` fails by assertion alone.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
6. **The prose is true.** `join`'s TSDoc and the guide's § Ownership and restoration sentences hold for the code. They cover:
   - the ending and its position;
   - error propagation;
   - the ended lifetime;
   - the precondition;
   - the foreign branch, whose `abort` listener the platform reports a throw from.
7. **Scope and shape.**
   - The changed paths are `guides/veneer.md`, `src/browser/Lifetime.ts`, `tests/src/browser/Button.test.ts`, and `tests/src/browser/Lifetime.test.ts`.
   - `types.ts` is unchanged, and `LifetimeInterface` gains no member.
   - No compatibility path remains.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `8b4e9d6`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
