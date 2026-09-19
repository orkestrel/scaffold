# Unit R2 audit — the claims under test

The subject is the uncommitted change in the **roughnotes** checkout at
`C:\Users\mikes\WebstormProjects\roughnotes`, against the clean baseline `b432653`. Unit R1 ported
a hardened merge from `@orkestrel/scaffold`; unit R2 closed the defects an adversarial round found
in the prose and instruments R1 wrote around it.

Both lanes of that round confirmed the ported bodies are byte-identical to scaffold's committed
copies, and neither found a fault in the merge itself. **Audit R2's delta.** The merge's design was
settled in scaffold across four rounds and is out of scope.

Evidence:

- `tmp/audit/r2-diff.patch` — the complete diff.
- `tmp/audit/r2-status.txt` — `git status --short` at dispatch.
- `.orkestrel/roughnotes/r2-brief.md` — what R2 was asked to do.
- `.orkestrel/roughnotes/r2-report.md` — its own account. A claim, never evidence.
- `.orkestrel/roughnotes/r1-audit-objective-report.md` and `r1-audit-subjective-report.md` — the
  findings R2 exists to close.
- `.orkestrel/roughnotes/r1-instruments/` — the retained red scripts and logs.

Re-derive every number you rule on.

## The claims

Rule on each: `CONFIRMED`, `REFUTED`, or `UNSETTLED`, with the evidence that decides it.

1. The `@returns` line is true of the merge, and a reader applying it to base `[alpha, alpha]` with
   override `[alpha]` predicts `[replacement, repeated]`. Walk that case through the delivered
   sentence yourself rather than accepting the report's walk.
2. The `@returns` line adds a clause beyond the wording the audit supplied — that an override entry
   replaces one base position at most. State whether that clause is necessary, sufficient, and true.
3. The discriminant case's control now builds the rival and depends on the subject: it fails when
   the subject is mutated to the rival. Read the control and state what mutation makes it fail.
4. The isolation script for that control removes one of the case's own assertions so the control
   runs. State whether that is legitimate instrument construction or a weakened proof.
5. Every helper R2 added is folded into a single caller or exported from the workspace's own test
   setup module, and the setup module is genuinely not vendored.
6. `selectByName` names what it returns, and the rival mechanism it models is the one the first
   draft used.
7. The nested case states its coverage truthfully: the count reads top-level entries, and a nested
   override entry does reach the resolved configuration beside the base entry sharing its name.
8. The `tests/config.test.ts` sentence is now true of this workspace's vendored file. Read that file
   and check what it actually does.
9. `mergeOverride` and `isNamedPlugin` are still byte-identical to scaffold's committed bodies, and
   R2's comparison instrument carries a control that fails.
10. Every red R1 recorded still re-runs after the helper move and the rename.
11. No vendored file changed, and nothing outside R2's owned list moved.
12. The added code carries no `any`, no `as`, no non-null assertion, and no suppression comment.

## Where to look hardest

- **The control's dependence on the subject.** The old control was vacuous because it read a
  property absent under every implementation. State precisely which implementations make the new
  control pass and which make it fail, and whether any implementation other than the rival makes it
  fail.
- **The removed assertion in the isolation script.** A script that deletes an assertion to reach a
  later one is one step from a script that deletes the assertion that would have failed. State
  whether this one crosses that line.
- **`tests/setup.ts` gained exports with no dedicated proof.** R2 reports it could not add one
  without registering a project the brief placed off limits. State whether the exports are
  adequately proved through their consumers, and what a dedicated proof would add.
- **`selectByName` keys a `Map<unknown, Plugin>`.** State whether the `unknown` key is honest for a
  non-string name or hides a defect the rival would otherwise show.
- **The setup module is shared with browser and journey projects.** R2 reports it kept its `vite`
  imports type-only so a browser suite does not pull Vite's Node entry. Verify that claim against
  the file, and state what would break if it were wrong.

## Out of scope

The merge's design. The nested residual, which is scaffold's committed contract. The release: no
version bump and no publish. Whether this workspace's other factories should take overrides — that
is recorded as a successor and is not this unit's.
