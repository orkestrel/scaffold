# Closure verdict — contract

Two rounds, 2026-09-08. First: the closing sweep's `verifier` over the closing unit (GREEN) and a `checker` over its retained diff, which raised the findings `d7n-contract-close-2` closed (see `d7n-contract-closure-checker-contract.md`). Second, `wf_262f806f-f55`: a `checker` (Sonnet) over the successor's diff on `d7n-contract-close-2-check-brief.md` and a `verifier` (Sonnet) over the whole chain against the final guide tarball (`dist/src/core/index.js` sha256 `2b76b363…`) on `d7n-contract-verify-brief.md`, blind and clean. Lanes retained as `d7n-contract-closure-{checker,verifier}-contract.md` and `d7n-contract-closure-{checker,verifier}-contract-2.md`.

| Package | Tip | Checker | Verifier | Ruling |
| --- | --- | --- | --- | --- |
| contract | `2320ccd` | VERDICT: FAIL 2 (report prose alone; every item and citation verified against the diff and the tree) | GATES: GREEN, no timing red | closed after `d7n-contract-close-2`; the report annotated |

contract pushes to the branch and `main` at `2320ccd`.

The push to `main` was refused: the remote `main` carried the owner's `1792823` (a reentrant-validation fix with regression tests) and its merge commit `e5edd79` on top of the fix-round tip. The Orchestrator merged `origin/main` into the branch as `fd3fce2` (no conflict; the merge brought `src`, `tests/setup.ts`, and `tests/src/core/ShapeValidator.test.ts`), re-read `npm run docs` at zero, `test:guides` green, `check` and `lint:check` green, and the whole `npm test` green (every project passed), then pushed the branch and `main` at `fd3fce2`.
