# Closure verdict — console

Two rounds, 2026-09-08. First: the closing sweep's `verifier` over the closing unit (GREEN) and a `checker` over its retained diff, which raised the findings `d7n-console-close-2` closed (see `d7n-console-closure-checker-console.md`). Second, `wf_262f806f-f55`: a `checker` (Sonnet) over the successor's diff on `d7n-console-close-2-check-brief.md` and a `verifier` (Sonnet) over the whole chain against the final guide tarball (`dist/src/core/index.js` sha256 `2b76b363…`) on `d7n-console-verify-brief.md`, blind and clean. Lanes retained as `d7n-console-closure-{checker,verifier}-console.md` and `d7n-console-closure-{checker,verifier}-console-2.md`.

| Package | Tip | Checker | Verifier | Ruling |
| --- | --- | --- | --- | --- |
| console | `4687fe7` | VERDICT: FAIL claim 2 (report prose alone; every item and citation verified against the diff and the tree) | GATES: GREEN, no timing red | closed after `d7n-console-close-2`; the report annotated |

console pushes to the branch and `main` at `4687fe7`.
