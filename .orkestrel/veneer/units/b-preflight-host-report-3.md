# PREFLIGHT-HOST (`pl`) round 3 report

`pl-shared-3.patch` replaces `pl-shared-2.patch` in full. It changes one sentence and nothing else.

- **Before:** "The rest of the rows are the form controls and the document root, which preflight resets to inherit the page's own font, color, and background."
- **After:** "The rest of the rows are the form controls, whose font and color the reset sets to inherit, whose background it clears, and whose border width and padding it zeroes; the document root's font family, line height, and tap highlight color; the `iframe` and `svg` display and the `iframe` vertical alignment; and the `table` border colors, which resolve to the text color."

I ran these checks in a scratch copy made by `.orkestrel/veneer/units/pl-instruments/pl-scratch-3.sh` with the patch applied. Each log ends with its exit status:

- `git apply --check .orkestrel/veneer/units/pl-shared-3.patch` (worktree): exit 0.
- `npm run test:guides`: exit 0, `Tests  20 passed (20)` (`pl-test-guides-3.log.txt`).
- `npx oxfmt --check guides/veneer.md`: exit 0, "All matched files use the correct format." (`pl-guide-format-3.log.txt`).
