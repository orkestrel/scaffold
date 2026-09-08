# Closure verdict — browser

Workflow `wf_cd8b56fe-674`, 2026-09-08, 5 minutes: a `checker` (Sonnet) over the fix round's diff and the closing unit's diff and a `verifier` (Sonnet) over the whole chain against the final guide tarball (`dist/src/core/index.js` sha256 `2b76b363…`), blind and clean, on `d7n-browser-check-brief.md` and `d7n-browser-verify-brief.md`. Lanes retained as `d7n-browser-closure-{checker,verifier}-browser.md`.

| Package | Tip | Checker | Verifier | Ruling |
| --- | --- | --- | --- | --- |
| browser | `15aab0e` | FAIL 4 (the drop-in's third header line still carried the clause Ruling 21 struck; the closing brief's criterion had named line 2 alone and the closing unit read the stale line as permitted; every other part of claims 1 to 4 PASS) | GATES: GREEN at `547bcef`, no timing red | closed after the Orchestrator's one-line canon fix (`15aab0e`, the header line only); `oxfmt --check` on the file and `test:guides` (201 passed) re-read green by the Orchestrator, a comment line reaching no other gate |

browser pushes to the branch and `main` at `15aab0e`.
