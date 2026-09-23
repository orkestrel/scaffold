# T4 TEST-CLIP audit round 5: claims

Subject: the round-5 fix `0c2c626` over `11054f2` in `/home/user/test` (`t4-5.diff`, `t4-r5-brief.md`, `t4-r5-prose.py`).

1. **The `clipsOverflow` summary.** The `clipsOverflow` Surface summary in `guides/test.md` and the TSDoc summary in `src/browser/helpers.ts` read "Reports whether an element clips its descendants' overflow." verbatim, and neither places the clip at any box.
2. **Token nouns.** No list of code tokens that the T4 delta (`git diff 936bc4a..0c2c626 -- src guides tests`) adds leaves a token without its own noun, on one line or across a line end.
3. **The clip-edge statements.** After the rewording, the guide's § Capture paragraph, the "Measure a document's content edge" pattern, the `readClipEdge` remarks, and the `readClipMargin` remarks each still state the padding edge for the `hidden`, `auto`, and `scroll` keywords and the selected box plus the margin for the `clip` keyword and a paint containment over a `visible` overflow, matching the `readClipEdge` and `readClipMargin` source.
4. **Law and scope.** The diff changes documentation text only, in `guides/test.md` and `src/browser/helpers.ts`, and carries no banned term and no count. `t4-r5-gates.log.txt` records `format:check`, `lint:check`, `check`, and `test:guides` exiting 0.
