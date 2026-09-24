# LABEL (`lc`) round 4 report

Round 4 replaced the § Color modes sentence in `guides/veneer.md` with the brief's text, and both checks
pass. The proof sentence after it is unchanged, and nothing is committed.

- **Before:** "A `color-scheme` value you set apart from the attribute can move the label and the endpoint
  the hover and active fills mix toward, wherever a browser reads `light-dark()` natively or your own build
  lowers that declaration the same way, and it never moves the resting fill, so set the `data-bs-theme`
  attribute instead."
- **After:** "The published stylesheet keeps the label and every fill under a `color-scheme` value you set
  apart from the attribute, so set the `data-bs-theme` attribute instead. Where your own build lowers that
  declaration into the same two variables, the label and the endpoint the hover and active fills mix toward
  move with it, and the resting fill does not."

| Command | Exit | Result | Log |
| --- | --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md` | 0 | "All matched files use the correct format." | `lc4-gate-1.log.txt` |
| `npm run test:guides` | 0 | `Tests  20 passed (20)` | `lc4-gate-2.log.txt` |

`.orkestrel/veneer/units/lc-4.diff` holds rounds 2 to 4 against `7852481`, and `.orkestrel/veneer/units/lc-4-status.txt` holds the
working-tree status.
