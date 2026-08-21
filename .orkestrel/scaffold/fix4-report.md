# scaffold fix unit 4 report

## Site 1 — banned temporal words

`src/bin/types.ts:208`
- Old: `` * `entries` is the table as it now stands and `mirrors` is one verdict per``
- New: `` * `entries` is the table as it stands and `mirrors` is one verdict per``

`src/server/types.ts:178`
- Old: `` * of what a target looked like then, not an argument to a write now. The``
- New: `` * of what a target looked like then, not an argument to a fresh write. The``

`src/server/Materializer.ts:754-755`
- Old: `// Delete only the foreign findings the same plan and target derive now. The`
- New: `// Delete only the foreign findings the same plan and target derive. The`

`src/server/Materializer.ts:804-806`
- Old: `// taken now rather than derived from the observation, because a digest over` /
  `// bytes nobody re-read would only restate what the comparison already proved.`
- New: `// taken directly rather than derived from the observation, because a digest` /
  `// over bytes nobody re-read would only restate what the comparison already` /
  `// proved.`

`src/server/helpers.ts:1320`
- Old: `` * where the last one did. A path now holding nothing, a file, or a symlink``
- New: `` * where the last one did. A path holding nothing, a file, or a symlink``

`src/server/helpers.ts:1394`
- Old: `` * @returns `true` when re-reading the destination now produces that same state.``
- New: `` * @returns `true` when re-reading the destination produces that same state.``

`guides/scaffold.md:761`
- Old: `` | Workspace-owned | `WORKSPACE_OWNED_PATHS`, today `.gitignore`       | The target workspace  | Present bytes receive no later canonical ignore update. |``
- New: `` | Workspace-owned | `WORKSPACE_OWNED_PATHS`, which holds `.gitignore` | The target workspace  | Present bytes receive no later canonical ignore update. |``

`guides/scaffold.md:827`
- Old: `target holds now. The refusal is deliberate at `0.0.x` and there is no migration path.`
- New: `target holds. The refusal is deliberate at `0.0.x` and there is no migration path.`

`ROADMAP.md:19`
- Old: ``Nothing is outstanding. `rescue/proxy-outage-2026-08-17` on scaffold is now redundant — its``
- New: ``Nothing is outstanding. `rescue/proxy-outage-2026-08-17` on scaffold is redundant — its``

`ROADMAP.md:115`
- Old: ``  than bytes; today `repair` restores vendored bytes and operator grants live in``
- New: ``  than bytes; `repair` restores vendored bytes and operator grants live in``

`ROADMAP.md:124`
- Old: `` Banning it today imports a policy the canon does not carry.``
- New: `` Banning it imports a policy the canon does not carry.``

## Site 2 — derivation TSDoc

`src/server/helpers.ts:100-106`

Old:
```
 * The deletion deny-list, stated as a rule over paths rather than as a list of
 * directories. It is the inversion the contract asks for: the candidate set
 * comes from an audit's foreign findings narrowed by what git tracks, and this
 * is what that set is then measured against. Repository metadata is protected
 * because losing history is not a repair, and a target's own `src` and `app`
 * trees are protected because a workspace's source is the one thing scaffold
 * never plans and never owns, whatever an audit reports about it.
```

New:
```
 * The deletion deny-list, stated as a rule over paths rather than as a list of
 * directories. It is the inversion the contract asks for: the candidate set
 * is re-derived from the plan and narrowed by what git tracks, and the audit
 * must agree with that derivation rather than supply the set itself.
 * Repository metadata is protected because losing history is not a repair,
 * and a target's own `src` and `app` trees are protected because a
 * workspace's source is the one thing scaffold never plans and never owns. A
 * plan the compiler emits never maps a protected root, so this guard exists
 * for the caller-authored plan a consumer can still supply.
```

Verified against `src/server/Materializer.ts:remove` (line 404 onward): the candidate set is
`this.#derive(accepted, directory)` — `accepted` is the accepted `plan` — and the audit's preview
findings are reconfirmed against that derivation in `#reconfirmCandidates`, never the reverse.

## Site 3 — fixture annotation

`tests/src/server/Materializer.test.ts:1041-1051` (test `'deletes a tracked foreign file and never
a protected or untracked one'`): added a comment above the `plan` construction naming it the
caller-authored-plan seam — a plan shape no compiler emits (an artifact mapping the protected root
`src/core`) that the public contract still admits, which is why the protected-path guard is
exercised through it rather than through the derivation alone.

## Site 4 — successor record

`tmp/fix2-report-correction.md` written. It withdraws fix2's "Every assigned row closed" claim and
its "this unit carries no defect row" sentence, names the temporal sweep this unit completed, and
points at this report for the re-run sweep evidence. `tmp/fix2-report.md` left untouched.

## Site 5 — re-run sweep

Patterns run over `src/`, `guides/scaffold.md`, `guides/README.md`, `README.md`, `ROADMAP.md`
(case-insensitive, word-boundary; `e.g.`/`i.e.` matched only with no trailing character):

- `\bnow\b` — one hit: `ROADMAP.md:54`, `` `performance.now()` `` — a code token, permitted.
- `\btoday\b` — no hits.
- `\bcurrently\b` — no hits.
- `\bshould\b` — no hits.
- `\bsimply\b` — no hits.
- `\bjust\b` — two hits, both `src/server/Materializer.ts` (lines 725 and 804, "this call just
  made" / "this call just observed"): the temporal-adverb sense ("a moment ago"), not the banned
  filler sense ("merely"); permitted.
- `\beasy\b` — no hits.
- `\bvia\b` — no hits.
- `\bnewer\b` — no hits.
- `\bonce\b` — every hit is the quantity sense ("read once", "checked once", "declared once",
  "given once", "decided once", "read-once ownership") across `src/server/helpers.ts`,
  `src/server/WriteTransaction.ts`, `src/server/Upstream.ts`, `src/server/Materializer.ts`,
  `src/core/cloners.ts`, `src/core/helpers.ts`, `src/core/constants.ts`, `src/core/compilers.ts`,
  `src/bin/CLI.ts`, `src/bin/helpers.ts`, `src/bin/constants.ts`, `guides/scaffold.md`,
  `README.md`, `ROADMAP.md`; permitted. One further hit, `src/bin/CLI.ts:228` ("The host is
  load-bearing here where it once was not"), uses `once` to mean "formerly" rather than the banned
  temporal-conjunction sense ("once X, Y" replaceable by "after"); ruled permitted, since no `after`
  substitution reads correctly there.
- `e\.g\.(?!\S)` / `i\.e\.(?!\S)` — no hits.

No remaining banned-sense hit in the named population.

## Gates

- `npm run format` (converge), then `npm run format:check`: exit 0.
- `npm run lint:check`: exit 0.
- `npm run check`: exit 0.

## `git diff --stat`

```
 ROADMAP.md                            |  6 +++---
 guides/scaffold.md                    |  4 ++--
 src/bin/types.ts                      |  2 +-
 src/server/Materializer.ts            |  7 ++++---
 src/server/helpers.ts                 | 16 +++++++++-------
 src/server/types.ts                   |  2 +-
 tests/src/server/Materializer.test.ts |  4 ++++
 7 files changed, 24 insertions(+), 17 deletions(-)
```

(`tmp/fix2-report-correction.md` is untracked and does not appear in `--stat`; `tmp/fix4-report.md`
is this file.)
