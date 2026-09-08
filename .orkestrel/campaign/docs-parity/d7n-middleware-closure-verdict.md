# Closure verdict — middleware

`wf_d42aef3d-68c`, 2026-09-08: a `checker` (Sonnet) over the fix round's diff on `d7n-middleware-check-brief.md` and a `verifier` (Sonnet) over the whole chain against the final guide tarball (`dist/src/core/index.js` sha256 `2b76b363…`) on `d7n-middleware-verify-brief.md`, blind and clean. Lanes retained as `d7n-middleware-closure-{checker,verifier}-middleware.md`. Sol dark; the checker and verifier are native Sonnet lanes.

| Package | Tip | Checker | Verifier | Ruling |
| --- | --- | --- | --- | --- |
| middleware | `5747e3f` | VERDICT: FAIL 2 (report prose alone: counts stated in the fix report; every item MF1 to MF11 and every citation verified against the diff and the tree, the `SessionCursors plus` reading and the node-face `createCompression` row confirmed under the standing conditions) | GATES: GREEN, no timing red | closed; the fix report annotated |

Findings carried outside this campaign, against middleware's own test coverage (the fix report § 7): no case drives `createBearer({ secret: [] })` (acceptance bar claim 16), and no limiter case drives an `x-forwarded-for` header without `createForwarded` (claim 17). Recorded in `d7-fleet-plan.md` § Findings carried to the packages.

middleware pushes to the branch and `main` at `5747e3f`.
