# Closure verdict — emitter

The closing sweep, 2026-09-08: a `verifier` (Sonnet) over the whole chain against the final guide tarball (`dist/src/core/index.js` sha256 `2b76b363…`) in the sweep workflow, and a `checker` (Sonnet) over the landed closing unit's retained diff in `wf_5edb472e-223`, blind and clean, on `d7n-emitter-close-check-brief.md`. Lanes retained as `d7n-emitter-closure-{checker,verifier}-emitter.md`.

| Package | Tip | Checker | Verifier | Ruling |
| --- | --- | --- | --- | --- |
| emitter | `045aaca` | VERDICT: FAIL 2 (a count in the closing report's prose alone; every item and citation verified against the diff and the tree) | GATES: GREEN, no timing red | closed; the report annotated |

emitter pushes to the branch and `main` at `045aaca`.
