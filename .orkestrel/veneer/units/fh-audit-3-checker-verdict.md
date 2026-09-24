<!-- Retained from the checker on Sonnet (native subagent), FRAME-HELPERS audit round 3. Transcribed from its hand-back. -->

1. **N3** — CONFIRMED. `tests/setupBrowser.test.ts` (`fh-3.diff:4412-4586`) binds every focus reading in the split proofs as `focusReading` (lines 4412, 4469, 4488, 4551, 4570), each in its own test-function scope, so none shadows another. The lifted element is `specimen` throughout (lines 4410, 4436), and the detached copy is `copied` (line 4442). The `focus` TSDoc example in `tests/setupBrowser.ts` (`fh-3.diff:5086-5089`) binds `focusReading`. Each split proof keeps its unsplit original's assertions (lines 4472-4475, 4489-4491, 4554-4555, 4573-4582).
2. **W3** — CONFIRMED. The page-strip comment (`fh-3.diff:558-560`) names the Page 1 link and its relation to the previous-page arrow without an ordinal. `FocusOptions.worn` (`fh-3.diff:4881-4884`) writes the `worn` token with its noun.
3. **Scope and gates** — CONFIRMED. `fh-3-status.txt` lists exactly the six files round 1 owned; round 3's edits sit in its three owned files. Each gate log ends with `exit 0`: `fh3-format.log.txt`, `fh3-lint.log.txt`, `fh3-check.log.txt`, `fh3-setup-browser.log.txt` ("Tests 83 passed (83)"), `fh3-test-guides.log.txt` ("Tests 20 passed (20)").

No findings outside the three items.

VERDICT: PASS
