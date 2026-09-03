## Default form
`src/core/factories.ts:11` — “Default for the pool's `max`: the `concurrency` value, so resources match the jobs in flight.”

## Same-command greens
```shell
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/factories.test.ts -t "resolves a live thread and clones its \`workerData\` across at spawn"
```
`1 passed | 8 skipped (9)` — `/home/user/work/evidence/worker-proofs/obj1-createThread-green-isolated.txt`

```shell
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/factories.test.ts -t "wires the \`on\` hooks at construction and routes a listener throw to \`error\`"
```
`1 passed | 8 skipped (9)` — `/home/user/work/evidence/worker-proofs/subj2-green-isolated.txt`

## Worker-obj-10 paragraph
`conform-worker-report.md:144`:

> the row is a rule-driven rewrite — `performance.now()` for an elapsed interval per `.claude/rules/tests.md` — whose defect, a wall-clock adjustment during a fixture's spin, has no reachable test vector; its evidence is the `Date\.now` sweep over `src` and `tests` and the green run, and no negative control is owed.

## Pointer rewrites
- `tests/guides.test.ts:3` — “The following constants”
- `tests/guides.test.ts:195` — “Every preceding assertion”
- `tests/src/server/helpers.test.ts:19` — “The following round-trip suites”
- `tests/setupServer.test.ts:77` — temporal `now` deleted

## Sweeps and rulings
- `grep -rnE "defaults to|\(default " src` — no matches.
- `grep -rn "defaults to" src` — no matches.
- `grep -rnE "Date\.now" src tests` — no matches.
- `\b(above|below|now)\b` sweep:
  - Permitted code tokens: `performance.now()` at `slow.ts:10,12` and `identify.ts:13,14`.
  - Forbidden prose remains outside the brief-owned lines at `helpers.test.ts:203,206,273,505,804` and `Worker.test.ts:851`. Acceptance criterion 3 is therefore not met.

## Refreshed report pointers
- `conform-worker-report.md:70` → `tests/src/server/factories.test.ts:38,54,78`
- `conform-worker-report.md:107-109` → `tests/src/server/helpers.test.ts:239,275,727`
- `conform-worker-report.md:196` records deletion of the citation-only `guides/README.md` See-also section.

## Git status
```text
 M README.md
 M guides/README.md
 M guides/worker.md
 M src/core/Worker.ts
 M src/core/factories.ts
 M src/core/types.ts
 M src/server/Dispatch.ts
 M src/server/NodeWorker.ts
 M src/server/factories.ts
 M src/server/handlers.ts
 M src/server/helpers.ts
 M src/server/index.ts
 M src/server/types.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/Worker.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/server/factories.test.ts
 M tests/src/server/fixtures/abortable.ts
 M tests/src/server/fixtures/crash.ts
 M tests/src/server/fixtures/identify.ts
 M tests/src/server/fixtures/load-throw.ts
 M tests/src/server/fixtures/slow.ts
 M tests/src/server/fixtures/throw-async.ts
 M tests/src/server/handlers.test.ts
 M tests/src/server/helpers.test.ts
```

## Exit codes
- `npm run format:check`: `0`
- `npm run lint:check`: `0`
- `npm run check`: `0`
- Core factories: `0`, `2 passed (2)`
- Guides: `0`, `18 passed (18)`
- Setup server: `0`, `6 passed (6)`
- Server helpers: `0`, `48 passed (48)`