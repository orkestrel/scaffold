# Campaign record: publish wave, 2026-08-18

Published `@orkestrel/scaffold@0.0.41` and `@orkestrel/browser@0.0.11`, then re-pinned and
re-propagated the whole fleet onto that release. Exit criterion: every package whose published
surface moved is released, every other package proven unmoved, all 44 targets green on the released
host and pushed. Met.

## What decided the publish set

Two bump triggers, both measured rather than inferred.

| Trigger | Instrument | Result |
| --- | --- | --- |
| Runtime dependency set differs from the published packument | `publish-trigger2.sh` / `trigger2.results.txt` | 44/44 SAME — fires for nobody |
| Rebuilt artifact differs materially from the published tarball | `publish-trigger1.sh` / `trigger1.results.txt`, classified by `publish-classify.cjs` | 3 real moves, 36 devDependency-only, 5 unmoved |

The comparator was certified before use: identical published tarballs report `material=0`, two
different packages report `material=4`. Both sides are `npm pack` output, so the package's own
`files` rule filters them identically and a repo-only build output cannot read as a difference.

`publish-cascade.cjs` derived the downstream obligation from runtime dependencies **and**
peerDependencies, and verified alignment in both directions: 0 peer/runtime conflicts, 0 divergent
ranges fleet-wide. That check exists because a peer range left naming the previous release while the
runtime graph moves is exactly how a consumer installs two copies of one package.

Rulings taken:

- **`browser` publishes.** Declaration-level change: `send` gained `timeout?`, `assert` and `update`
  became public, `request` and `raw` were removed.
- **`console` does not.** Its only change was a TSDoc sentence. The release-wave law defines a
  material diff as tokens, declarations, or logic; prose is none of them, and publishing it would
  have cascaded to `terminal` and `toolbox` for a comment. The user ruled it rides the next release.
- **`test` does not.** Its apparent move was a build defect, not a surface change — see the next
  section. After the fix its rebuild is materially identical to published `0.0.6`.
- **`scaffold` publishes** on its own account: both `dist/src` and `dist/host` moved.

## The defect the wave surfaced

`@orkestrel/test` declares `vitest` as a `peerDependency`, and the generated build externalized only
`@src/core` and `@orkestrel/*`. So the peer was bundled.

The first diagnosis was wrong and both design lanes caught it. `vitest/browser` resolves fine — to a
deliberate static-analysis stub exporting `page = null`, which Vitest replaces with a virtual module
at test time. Bundling inlined that stub and tree-shook away its guard `throw`, so the published
helpers would have called `null.getByRole(...)` and failed silently.

`peer-external-reconciliation.md` records the two-lane pass: Sol ruled Fork A (externalize declared
peers), Opus ruled Fork B (externalize every bare specifier). Both emit identically today — measured:
`test` is the only package importing any non-`@orkestrel`, non-`node:`, non-`@src` bare specifier, and
both of its imports are the declared peer. Fork A was taken on the creation gate, extended to all four
published faces on Opus's argument that `bin` has the same hole with a worse artifact.

Its acceptance criterion doubled as the negative control on the whole ruling: after the fix, `test`'s
rebuilt pack must be materially identical to published `0.0.6`. It is — consumer contract identical,
sole delta two devDependency re-pins.

## Audit and its closure

An Opus review of the peer change returned FAIL on one claim plus five findings
(`peer-audit-fix.md`). The load-bearing one: the browser-without-core predicate was asserted by
nothing — deleting its peer clause left the suite green, proven by counterfactual (55/55 pass with
the mutation in place on the pre-fix suite). The fix also exposed a second stale generated artifact,
`configs/src/vite.server.config.ts`, carrying a narrower rewrite pattern than `nameToRewrite` emits.

Both closed with mutation probes red-then-green rather than a second audit round, per the falsify
law's verbatim-prescription clause. Landed as `911e5c0`.

A separate referral — whether the array-to-function `external` form change altered scaffold's own
emit — was settled by building the pre-fix commit in a worktree: `dist/bin/main.js` externalizes an
identical set of seven specifiers before and after, and core gains only template text. Inert.

## The propagation

`fleet-wave5.sh` runs the canonical release-wave visit: assert clean, re-pin the devDependency,
install, `overwrite` from the **installed published package** rather than a local build, install,
five gates. Running it from the installed package is what proves the released artifact works instead
of a local build that resembles it.

Piloting on one target first caught a real ordering defect: the re-pin dirties the tree, so
`overwrite` refused its own input. Fixed by asserting clean *before* re-pinning, which keeps the
`--dirty` waiver bounded to dirt the wave itself caused while a genuinely dirty tree still reports as
a finding.

Results: `wave5.results.txt` 44/44 PASS, `commit-pass-5.results.txt` 44/44 LANDED. Verified after:
44/44 targets at `^0.0.41`, 44/44 root configs export the `peers` binding, 38/38 core faces carry the
clause.

## Deliberately not closed here

- `guides/scaffold.md` moved in `911e5c0`, which is a vendored byte and by the letter obliges a
  scaffold bump. Measured: exactly one vendored file moved and `dist/src/core` is materially
  unmoved. The paragraph rides scaffold's next release rather than spending an approval, and the
  fleet was propagated from published `0.0.41` so every target stays byte-consistent with the version
  it installs.
- `@orkestrel/browser`'s `BROWSER_HAR_CREATOR.version` was corrected to `0.0.11` in the release, but
  nothing enforces that it tracks the package version — it had drifted two releases. Recorded for
  browser's next change.
- Opus's U7, a manifest-agreement gate proving every bare specifier an emitted chunk imports is
  declared, is the unit that closes the whole class. Excluded as scope creep inside a defect fix.
