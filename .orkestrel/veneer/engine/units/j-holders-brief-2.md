# Unit J-HOLDERS, round 2 — only the last holder removes an emptied attribute, pin Isolation's order, and the reviewer's prose

Successor of `j-holders-brief.md` and its decision `j-holders-decision-1.md`. Their sections stand except where this brief replaces them.

**What the audit found** (`units/j-holders-audit-verdict.md`, which reconciles `units/j-holders-audit-objective-verdict.md` from `analyst` on Astra and `units/j-holders-audit-subjective-verdict.md` from `reviewer` on Opus 5.5):
- **A presence defect.** `HostSnapshot`'s `#leave` returns `!record.present` whether or not other holders remain. So a restoration that is not the last holder removes an emptied `class` or `style` attribute another snapshot still holds. The objective lane's witness: a body with no `class` attribute, two modals shown, `modal-open` removed by other code, then the first modal hidden. The subject removes the empty `class` attribute while the second modal still holds the record.
- **Isolation's reordered destruction is ruled intended.** The restoration comes after every hand-off, so the page ends restored. It needs a case that pins the order.
- **Five prose changes** from the reviewer, findings 3, 5, 8, 9, and 11, each with its exact text.

The branch `unit/holders` now carries a merge of Veneer `main` `8bc940d` over your commit `ef320ca`. Work on that tip, and run no merge yourself.

## The obligations

- **P1: only the last holder removes an emptied attribute.** A restoration removes an emptied `class` or `style` attribute only when it leaves that presence record as its last holder. Give it two cases, each read red first on `ef320ca`'s sources:
  - two snapshots that save tokens on an element with no `class` attribute. After the tokens are removed by other code, the first snapshot's restoration leaves `class=""`, and the last holder's restoration removes it. Add the same for `style` if the path differs;
  - the objective lane's Modal witness.
- **P2: Isolation restores after every hand-off.** Add a case with a custom element whose synchronous `inert` reaction rewrites another claimed element. It proves that destruction's restoration comes after every hand-off, so each element ends at the value its first claim found. It must be killed by a mutation that restores inside each release.
- **P3: the reviewer's prescriptions, verbatim.** Apply findings 3, 5, 8, 9, and 11 exactly as written in `units/j-holders-audit-subjective-verdict.md`, in the TSDoc and in the guide alike. Keep the § Surface rows equal to their TSDoc for parity.
- **The instrument.** Add a row per obligation of P1 and P2, and keep the positive assertion rule. A passed case reads held only when its file reports no suite-level error. Re-run every row.

## Scope

As round 1, with round 1's owned files, and with `tests/src/browser/Isolation.test.ts` and `tests/src/browser/HostSnapshot.test.ts` added.

## Output

Your final message holds:
- the files touched;
- P1's and P2's cases with their red and green readings, verbatim;
- the mutation table from the log;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it.
