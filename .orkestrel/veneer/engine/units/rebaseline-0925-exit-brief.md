# Grok lane EXIT-EVIDENCE — the evidence for each J-ENGINE exit item at Veneer main (read-only)

You are the Cursor Grok lane in ask mode. Read only; edit nothing; make no decision or recommendation. Return evidence with `file:line` pointers and no raw file dumps.

**Workspace.** The working directory is `C:/Users/mikes/WebstormProjects`. Veneer `origin/main` `0865c67` is checked out in `veneer/`. Never read `veneer/tmp/**`.

**The items.** Read these first:
- `scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` § Exit criterion (items 1 to 9) and its § Amendments line on the exit criterion;
- `scaffold/.orkestrel/veneer/j-engine-session-brief.md` § Acceptance criteria (items 1 to 6);
- `scaffold/.orkestrel/veneer/engine/decisions.md` § E26 (the J-ORACLE addition).

The design verdict's rulings R1 to R19 are in the same file. Read each one an item names.

**For each item**, find what in Veneer's tree or the engine records shows it holds, or does not. Look at:
- `veneer/src/browser/types.ts` and `veneer/src/core/types.ts`;
- `veneer/src/browser/**`, the mechanisms and their first consumers;
- `veneer/tests/src/browser/**`, the proofs per component for lifecycle, cancellation, focus, motion, and cleanup;
- `veneer/guides/veneer.md`: § Compatibility's `engine` and `plugin` rows, the § Engine sections, and every excluded or deferred entry, such as `./browser/auto`, jQuery, `isRTL`, `CloseWatcher`, `TRANSITION_END`, and fixed fallbacks;
- the design verdict's R14 candidate rulings and the user's recorded rulings;
- the seed's post-destroy defect (R16) and its repair;
- `scaffold/.orkestrel/veneer/engine/plan.md` § Landed, and the landing logs under `scaffold/.orkestrel/veneer/engine/units/*landing*.log.txt`, for gate evidence.

**Answer, per item:**
- `holds`, `partly`, or `open`;
- the evidence with `file:line`;
- for `partly` or `open`, the exact gap: the component, row, mechanism, or proof missing;
- for kickoff item 3, per plugin (Collapse, Dropdown, Tab, ScrollSpy, Alert, Carousel, Offcanvas, Tooltip, Popover, Modal, Toast, and Button if present): which of lifecycle, cancellation, focus, motion, and cleanup has a proof case, with the case's `file:line`.

**Return exactly:**
- `Question`
- `Evidence`: per item
- `Distillate`: the items that hold, and the gaps, one line each
- `Unknowns`
- `Journal`
- `Deviation`
