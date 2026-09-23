# Unit T4 TEST-CLIP — successor brief 3: the round-2 audit's finding

Supersedes `t4-test-clip-brief-2.md` for the unit's third round; the earlier briefs stay in place unedited. What changed and why: the round-2 audit (`t4-audit-2-verdict.md`) broke the cap's geometry: the clip margin expands from the selected visual box, not from the border box, so a bordered or padded frame with a clip margin caps too low by its border or padding.

## Role and engine

The Orchestrator writes this round itself in `/home/user/test` (the working tree carries rounds 1 and 2, committed on the branch `claude/inspiring-allen-t4qzv1` as the handoff commit named in `plan.md`); the auditor is `analyst` on GPT-6 Astra with `checker` on Sonnet, on a claims file `t4-audit-claims-3.md` derived from `t4-audit-claims-2.md` with claim 1 restated for the clip edge, claim 3's "drop clipping" reading corrected to 600 under either pane, and claim 5 narrowed to the matrices this unit moved.

## The edits

- **E9.** `readClipEdge(element)` in `src/browser/helpers.ts`, exported before `readClipMargin`: the element's overflow clip edge in document coordinates, the border-box bottom plus the scroll offset less the bottom border width (the padding box), less the bottom padding as well where the computed `overflow-clip-margin` value carries the `content-box` keyword, or the border-box bottom itself where it carries the `border-box` keyword, plus `readClipMargin(element)`; `measureContent` caps a descendant at `readClipEdge(frame)` for every clipping ancestor; the TSDoc remarks of `measureContent` and the guide's § Capture sentence say the clip edge is read from the selected box.
- **E10.** Cases in `tests/src/browser/helpers.test.ts` over tables in `tests/setupBrowser.ts` (`CLIP_EDGE_CASES`, `{ style, edge }`, the edge as rows from the frame's top): a `hidden` overflow over a 400-row height with a 20-row bottom padding and a 3-row bottom border reads 420; a `clip` overflow with a 100-row margin reads 520; the `content-box` keyword with the margin reads 500; the `border-box` keyword with the margin reads 523; and a `measureContent` case with a bordered `clip` frame and a 100-row margin over a 600-row child reads 500 under both panes (not 503), which distinguishes the box selection.
- **E11.** The guide's Surface row for `readClipEdge` before `readClipMargin`'s; the pattern sentence names the three helpers.

## Acceptance criteria

`t4-gates.sh` (the scoped pattern extended to `readClipEdge`) and `t4-full-gates.sh` exit 0; the round-3 audit passes; `t4-headstart-2.sh` re-run over the round-3 tarball settles every frame (the census readings are the UTIL-PLACEMENT landing's, ruled in `upl-landing-capture-note.txt`).
