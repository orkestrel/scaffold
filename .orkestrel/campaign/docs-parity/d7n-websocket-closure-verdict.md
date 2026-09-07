# Closure verdict — websocket

Workflow `wf_2d2cbae0-0ba`, 2026-09-07, 3 minutes: a `checker` (Sonnet) over the fix round's diff and its W4 successor's diff, a `verifier` (Sonnet) over the whole chain, blind and clean, on `d7n-websocket-closure-brief.md` (amended to carry the successor pair). Lanes retained as `d7n-websocket-closure-{checker,verifier}-websocket.md`.

| Package | Tip | Checker | Verifier | Ruling |
| --- | --- | --- | --- | --- |
| websocket | `d8ff4ee` | FAIL 2 (a count in the fix report's prose alone; every fix item and the successor's rename verified against the diffs) | GATES: GREEN, `test:distribution` present and green, no timing red | closed; the report annotated |

The successor `d7n-websocket-frame` (builder, Sonnet) landed W4 as `d8ff4ee`: `frame` is `encodeTestFrame` at its declaration and every call site under `tests/**`, the `tests/guides.test.ts` callback parameter named `frame` untouched. The checker's observation that the successor's report carries no engine or tip header is recorded here: the builder brief names both.

websocket pushes to the branch and `main` at `d8ff4ee`; the closing sweep re-installs the final guide tarball and re-runs the verifier before `main` moves past it.
