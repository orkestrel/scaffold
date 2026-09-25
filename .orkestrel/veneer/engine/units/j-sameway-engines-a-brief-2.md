# Unit J-SAMEWAY-ENGINES-A, round 2 — each returned target goes back to the value it held before the call first wrote it

Successor of `j-sameway-engines-a-brief.md` and the decision `j-holders-decision-2.md`. Their sections stand except where this brief replaces them.

**What the audit found** (`units/j-sameway-engines-a-audit-objective-verdict.md`, `analyst` on Astra, thread `01a0d683-b0bc-7a51-b7fc-2cd1d3f53aaf`; the checker, `units/j-sameway-engines-a-audit-checker-verdict.md`). The lane confirmed A1, A3, the proofs, and the scope. It failed A2, A4, A5, and A7 on three inputs that share one cause: a return entry that does not describe the change the call actually made to its target.
- **Tab records dropdown entries for writes that changed nothing.** `#selection` records the toggle, menu, and wrapper entries even when `toggle(token, false)` found the token absent, so a return adds tokens the swap never removed. The witness: an active outgoing tab inside a closed dropdown and an incoming tab outside it, with the incoming control's `active` removed on the outgoing `hidden.vn.tab`.
- **Tab's forward-order return breaks a shared target.** When both controls sit in one `.nav-item.dropdown`, the outgoing entries reopen the dropdown, and the incoming entries for the same targets then close it again.
- **Carousel's completion removes a pre-existing order or direction token with no entry.** The witness: the completing-write fixture with the incoming item initialized `carousel-item carousel-item-next`.

The checker also found Toast's `#arm()` write in a completed `show` missing from the A4 table.

The branch `unit/engines-a` carries a merge of Veneer `main` `0865c67` (J-HOLDERS) over your commit `9019d81` and the Orchestrator's integration `7511b82`. Work on that tip, and run no merge.

## The obligation

- **R1: one invariant for every return in the four engines.** A returning step restores each target the call changed to the value that target held before the call's first write to it.
  - A write that changes nothing records nothing.
  - A target the call writes more than once is recorded once, at its first changing write.
  - A token or attribute the call removes that it did not add, such as a completion's removal of a pre-existing order or direction token, is recorded with its prior presence and restored.
  - The return restores in reverse order of those first writes.

  Apply it to Collapse, Toast, Tab, and Carousel alike, wherever the current entries record something else, and state it once in each class's TSDoc.
- **Cases, each read red first on `7511b82`'s sources:** the lane's three witnesses. Add a case for any further input the invariant changes that you find.
- **The A4 table.** Redo it for the changed entries, and add Toast's `#arm()` in a completed show, which is not a return because a completed call takes no returning step.
- **The instrument.** Add a row per witness, keep the positive-assertion rule, and read a passed case as held only when the whole file run reports success, with no failed case and no unhandled error. Re-run every row.
- **Report-only patches.** Return exact patches for `src/browser/types.ts` and `guides/veneer.md`, against the tip you work on, for every sentence this makes false. That includes the Tab and Carousel return descriptions the lane found overstated (`guides/veneer.md` § Tab and § Carousel).

## Output

Your final message holds:
- the files touched;
- the changed A4 rows;
- the witnesses' red and green readings, verbatim;
- the mutation table from the log;
- the patches' paths, each checked with `git apply --check` against your tip;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
