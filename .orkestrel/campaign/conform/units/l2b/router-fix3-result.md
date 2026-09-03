## Fix round 3

Closes the temporal `once` and document-pointer `below` hits fix round 2's widened sweep recorded
(`reports/conform-router-report.md:139`).

### Sites changed

- Temporal `once` → `after`: `src/server/handlers.ts:68` ("after headers are already sent, it
  destroys the connection outright"); `src/server/helpers.ts:121` ("A promise that resolves after
  `target` has been ended"); `src/core/helpers.ts:401` ("still widens each element's `Path` to
  `string` after collection into one array"); `src/core/types.ts:164` ("and — after no further `/`
  remains — resolves the final segment's own `SegmentParam`"); `guides/router.md:362` ("never
  leaking a hanging socket); after headers are already sent, it destroys the connection outright" —
  one line past the brief's named `:361`, within the three-line tolerance).
- Document-pointer `below` → `following`: `tests/guides.test.ts:54` ("the following second
  assertion fails when a name here stops being stranded"); `tests/src/browser/Navigator.test.ts:643`
  ("assigning it to the following declared guard type needs no `as`");
  `tests/src/core/Dispatcher.test.ts:318` ("assigning it to the following declared function-typed
  field needs no `as`"); `tests/src/core/Dispatcher.test.ts:333` ("assigned to the following
  declared `Method` type with no `as`"); `tests/src/core/Router.test.ts:69` ("assigning it to the
  following declared `string` type needs no `as`").
- No presence guard in `tests/guides.test.ts` quotes any of the five changed sentences; `test:guides`
  confirms it, 45 passed (45).

### Sweep

`grep -rniE "\bvia\b|e\.g\.|\bsimply\b|\babove\b|\bbelow\b|\bonce\b"` over `src`, the non-vendored
`tests/**` (excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts`), `guides/router.md`, `guides/README.md`, and `README.md`, re-run after
the fix-round-3 edits: no `via`, no `e.g.`, no `simply`. § Sweeps substitutions is rewritten so its
banned-sense list is empty and every remaining hit is ruled by sense:

- Permitted comparisons (`above`/`below`): `src/core/helpers.ts:324`, `:342`;
  `src/core/constants.ts:74`, `:75`; `guides/router.md:262`; `tests/src/core/Router.test.ts:159`
  ("ranks a literal above a param above a wildcard").
- Permitted frequency (`once`, meaning one time rather than `after`): `src/server/types.ts:31`;
  `src/browser/types.ts:5`, `:30`, `:47`, `:48`; `src/core/Router.ts:16`, `:26`, `:114`;
  `src/core/types.ts:214`, `:236`, `:295`, `:315`, `:326`, `:404`; `guides/router.md:114`, `:174`,
  `:310`; `tests/src/browser/Navigator.test.ts:726`.
- Permitted code tokens (Node's `once` API and the `{ once: true }` listener option, not prose):
  `src/server/helpers.ts:9`, `:73`, `:79`, `:156`, `:157`; `tests/setupServer.ts:87`;
  `tests/setupBrowser.ts:116`, `:140`; `tests/src/server/helpers.test.ts:204`, `:220`, `:240`,
  `:360`, `:361`, `:427`; `tests/src/browser/Navigator.test.ts:183`.
- Banned-sense hit found outside this round's Owned scope, not fixed here: the temporal `once` at
  `tests/setup.test.ts:20`, in the test title "reports a live pull total that grows as the stream is
  consumed, not only once fully drained." `tests/setup.test.ts` is not among the round's Owned files
  (the ten named sites, `tests/guides.test.ts`, and this report), so it stays report-only. The exact
  patch:

  ```diff
  --- a/tests/setup.test.ts
  +++ b/tests/setup.test.ts
  @@ -17,7 +17,7 @@
  -	it('reports a live pull total that grows as the stream is consumed, not only once fully drained', async () => {
  +	it('reports a live pull total that grows as the stream is consumed, not only after it is fully drained', async () => {
  ```

### Gates

Every gate ran from `/home/user/fleet/router` in the order the acceptance criteria fix.

| Gate                    | Exit code | Reading                                                                       |
| ------------------------ | --------- | ------------------------------------------------------------------------------ |
| `npm run format:check`  | 0         | `All matched files use the correct format.` on 73 files                      |
| `npm run lint:check`    | 0         | no output                                                                     |
| `npm run check`         | 0         | root project plus the three scoped isolation checks                          |
| `npm run build`         | 0         | core, browser, and server built; both `.d.cts` copies written                |
| `npm test`              | 0         | `src` 265/265, `policy` 111/111, `config` 46/46, `setup` 9/9, `guides` 45/45 |

`npm run test:guides` was also run standalone before the full `npm test`: 45 passed (45).

### Audit line

- `npx scaffold audit --offline` reports one drifted path: `configs/browsers.ts`, group `configs`,
  drift `stale` — the same baseline row named in § Findings outside the rows, unchanged by this
  round.
- `node /home/user/scaffold/tmp/work/evidence.mjs router` wrote
  `/home/user/work/evidence/conform-router.diff` (2931 lines) and
  `/home/user/work/evidence/conform-router.status` (37 entries).
- `git status --short` lists 37 files, every one inside this round's Owned scope
  (`tests/guides.test.ts`, `tests/src/browser/Navigator.test.ts`, `tests/src/core/Dispatcher.test.ts`,
  `tests/src/core/Router.test.ts`, `src/server/handlers.ts`, `src/server/helpers.ts`,
  `src/core/helpers.ts`, `src/core/types.ts`, `guides/router.md`) plus the fix-round-1 and
  fix-round-2 paths carried unchanged from those rounds.

### Deviations

None. The deviation contract did not fire. Every named site carried its `once` or `below` within
three lines of the line the brief named, and no gate reddened on anything the rows did not touch.
The `tests/setup.test.ts:20` hit the widened sweep found sits outside this round's Owned files, so
it is recorded here as report-only rather than a deviation, per the builder charter's off-limits
rule.
