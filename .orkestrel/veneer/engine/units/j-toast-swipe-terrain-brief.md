# Grok lane SWIPE-TERRAIN — how Elements and Mailbox dismiss a toast by swipe (read-only)

You are the Cursor Grok lane in ask mode. Read only; edit nothing; make no decision or recommendation. Return evidence with `file:line` pointers and no raw file dumps.

**Workspace.** The working directory is `C:/Users/mikes/WebstormProjects`, which holds `elements/`, `mailbox/`, `veneer/`, and `scaffold/`.

**Context.** The user ruled that Veneer's toast engine takes a swipe-to-dismiss, following the mechanism Elements and Mailbox already use (`scaffold/.orkestrel/veneer/engine/decisions.md` § E31). The J-ELEMENTS planner's adoption shape is in `scaffold/.orkestrel/veneer/engine/units/j-elements-design-planner-proposal.md` (search it for "swipe"). Veneer's existing gesture class is `veneer/src/browser/Swipe.ts`, which the carousel uses, and its toast engine is `veneer/src/browser/Toast.ts`.

**Find, in `elements/` and in `mailbox/` separately.** Search both trees for toast, swipe, drag, dismiss, and pointer handling.
1. The files and classes or functions that implement toast swipe dismissal.
2. The input: the pointer types it accepts (mouse, touch, pen), `touch-action`, pointer capture, and how it tells a swipe from a click or a text selection.
3. The geometry: the axis or axes, the direction or directions that dismiss, the distance threshold, any velocity threshold, and how each value is configured.
4. The writes during a drag: inline styles, custom properties, classes, or attributes, with the exact names, and whether its stylesheets read them.
5. The release: what happens under the threshold (snap back, and how) and over it (dismiss, and how). Whether an animation runs, and what event or callback it fires.
6. Cancellation: `pointercancel`, lost capture, focus loss, and a second pointer.
7. Accessibility: whether a keyboard or assistive path dismisses the toast without the gesture, and any ARIA it writes.
8. The tests that prove it, with their names and `file:line`.
9. **Veneer's `Swipe` class.** What it reports, per move or only at the end, its thresholds, and its pointer types. Say whether it could serve a toast as it is, or what it lacks, from its source.

**Return exactly:**
- `Question`
- `Evidence`: per item, for Elements and Mailbox separately, with `file:line`
- `Distillate`: the mechanism both share and where they differ
- `Unknowns`
- `Journal`
- `Deviation`
