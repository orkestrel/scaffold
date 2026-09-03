The report section is complete and all gates verified green.

## Fix round 2

Closes the round-2 objective lane's refutation of claim 4 and its findings F1 to F3
(`units/l2b/router-objective-r2.md`).

### Findings closed

1. **F1, the `below` pointer in the flagship-fence header comments.** `tests/guides.test.ts:193`
   reads "Each block that follows is one `guides/router.md` fence, run against the real barrel and
   asserting the value its comments claim." `tests/src/browser/Navigator.test.ts:791` reads "Each
   block that follows is one `guides/router.md` fence importing `@orkestrel/router/browser`, run
   against the real barrel and asserting what its comments claim." `test:guides` runs green after
   the edit: 45 passed (45).
2. **F2, the temporal `once` in the hash-mode fence comment.** `guides/router.md:531` reads
   "sets location.hash; `active` updates after the hashchange fires". The transcription at
   `tests/src/browser/Navigator.test.ts:822-826` asserts values, not comment text, so it needed no
   edit; `test:guides` confirms it, 45 passed (45).
3. **Claim 4, the sweep row.** The round-0 § Sweeps substitutions row is rewritten to list every
   hit by sense rather than naming only the surviving `below` comparisons, and to add `once` to the
   swept pattern. It records the permitted comparisons, the permitted frequency sense, the permitted
   code tokens (Node's `once` listener API), and the banned-sense hits the re-run sweep found
   outside this round's Owned scope, which stay unfixed and are carried to the next round rather than
   dropped.
4. **F3, the diffstat and the miscounted `git status --short` line.** § Files touched and § Diffstat
   each gained a head sentence stating that they record the round-0 tree and that § Fix round 1
   § Sites changed carries the fix-round paths. § Fix round 1 § Audit line's `git status --short`
   line is corrected from 35 to 37, the count `node /home/user/scaffold/tmp/work/evidence.mjs router`
   and a direct `git -C /home/user/fleet/router status --short` both report for the fix-round-1 tree,
   which fix round 2 leaves unchanged.

### Sweep

`grep -rniE "\bvia\b|e\.g\.|\bsimply\b|\babove\b|\bbelow\b|\bonce\b"` over `src`, the non-vendored
`tests/**` (excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts`), `guides/router.md`, `guides/README.md`, and `README.md`, re-run after
the F1 and F2 edits: no `via`, no `e.g.`, no `simply`. Every surviving `above`, `below`, and `once`
hit is ruled by sense in the rewritten § Sweeps substitutions row. The banned-sense hits the sweep
found sit outside this round's Owned files (`tests/guides.test.ts:193`,
`tests/src/browser/Navigator.test.ts:791`, and `guides/router.md:531` are the only owned sites), so
they are named there and carried to the next round rather than fixed here.

### Gates

Every gate ran from `/home/user/fleet/router` in the order the acceptance criteria fix.

| Gate                    | Exit code | Reading                                                                       |
| ------------------------ | --------- | ------------------------------------------------------------------------------ |
| `npm run format:check`  | 0         | `All matched files use the correct format.` on 73 files (converged once, `guides/router.md`) |
| `npm run lint:check`    | 0         | no output                                                                     |
| `npm run check`         | 0         | root project plus the three scoped isolation checks                          |
| `npm run build`         | 0         | core, browser, and server built; both `.d.cts` copies written                |
| `npm test`              | 0         | `src` 265/265, `policy` 111/111, `config` 46/46, `setup` 9/9, `guides` 45/45 |

`npm run format:check` failed once, on `guides/router.md`, after the F2 fence-comment edit shifted
the wrap. It was converged with `npx oxfmt --config .oxfmtrc.json guides/router.md` and re-run
clean.

### Audit line

- `npx scaffold audit --offline` reports one drifted path: `configs/browsers.ts`, group `configs`,
  drift `stale` — the same baseline condition named in § Findings outside the rows, unchanged by
  this round.
- `node /home/user/scaffold/tmp/work/evidence.mjs router` wrote
  `/home/user/work/evidence/conform-router.diff` (2893 lines) and
  `/home/user/work/evidence/conform-router.status` (37 entries).
- `git status --short` lists 37 files, every one inside this round's Owned scope
  (`tests/guides.test.ts`, `tests/src/browser/Navigator.test.ts`, `guides/router.md`) plus the
  fix-round-1 paths carried unchanged from that round.

### Deviations

None. The deviation contract did not fire. Every quoted sentence named in the brief was found
within three lines of its named line, and no gate reddened on anything the rows did not touch.
