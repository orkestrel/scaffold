# Unit PD4-FIX report

## Touched files

- `/home/user/orkestrel/probe/src/server/Probe.ts` — `#admit` now compares the case's and control's drafts and test byte for byte instead of through `computeDigest`; the comment states the true property.
- `/home/user/orkestrel/probe/src/core/types.ts` — reworded the `prove` remark (the false "before any stage runs" claim) and the `Control`/`Claim` remark.
- `/home/user/orkestrel/probe/tests/src/server/Probe.test.ts` — added the normalization-collision control to the refusal pin; corrected two comments carrying the same false claim.

## The comparison form, with materialization evidence

**Ordered, positional byte comparison.** Draft order changes what the stages materialize.

The rule the code has: nothing refuses two drafts sharing one `path` upstream — `isDraft` (`src/core/validators.ts:61`) constrains one path's shape and never compares across drafts. Every stage materializes drafts into an `Overlay`, which is a `Map` keyed by the normalized absolute path (`src/server/Overlay.ts:42-44`), and each stage writes them in list order: `TypeStage.#inspect` at `src/server/stages/TypeStage.ts:159` and `RuntimeStage.#inspect` at `src/server/stages/RuntimeStage.ts:165-167`. A later draft therefore overwrites an earlier one at the same path.

Run, against the built `dist/src/server/index.js` (`Overlay` unchanged by PD4):

```
forward : [["/srv/checkout/src/core/x.ts","export const VALUE = 2\n"]]
reversed: [["/srv/checkout/src/core/x.ts","export const VALUE = 1\n"]]
```

The same run reproduced the analyst's collision, confirming the finding before the fix:

```
digest a: 799d1177141bc634b27fa8a03dd3d73d   // text "//srv/checkout/x"
digest b: 799d1177141bc634b27fa8a03dd3d73d   // text "///srv/checkout/x"
equal   : true
```

Because reordering a list that shares a path materializes different bytes, a reordered draft list is not identical in effect, so positional pairing is correct. `#admit` compares `test.path`, `test.text`, `files.length`, and then each `files[index]` pair's `path` and `text`.

## Red then green

Command, both runs:

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server \
  -t 'refuses a control that repeats the whole case'
```

Red (collision control added, digest equality still in place):

```
 FAIL  |src:server| tests/src/server/Probe.test.ts > probe > refuses a control that repeats the whole case, and admits one a byte apart
AssertionError: expected ProbeError: The control must differ from … { …(3) } to match object { origin: 'instrument', …(2) }
-   "code": "malformed",   "origin": "instrument",
+   "code": "refused",     "origin": "claimant",
 ❯ tests/src/server/Probe.test.ts:345:6

 Tests  1 failed | 154 skipped (155)
```

Green (after the byte comparison):

```
 Tests  1 passed | 154 skipped (155)
```

The pin now carries, in this order: the whole-case repeat refused `claimant`/`refused`; the reason-and-stage-only variation refused; one byte apart in the candidate draft admitted (reaches the arming failure); one byte apart in the test admitted; the collision pair `/${scratch.path}/anchor` vs `//${scratch.path}/anchor` — spelling `//…/anchor` and `///…/anchor` — admitted.

## Gate tails

```
oxfmt --check src/core/types.ts src/server/Probe.ts tests/src/server/Probe.test.ts
  All matched files use the correct format.    (exit 0)
oxlint --deny-warnings <same three files>      (exit 0, no diagnostics)
npm run check   (root + check:src:core + check:src:server + check:src:bin)   EXIT=0
npm run test:src:server   Test Files 7 passed (7) | Tests 155 passed (155) | 122.05s   EXIT=0
npm run test:guides       Test Files 1 passed (1) | Tests 13 passed (13)              EXIT=0
```

`test:guides` was run as blast-radius evidence for the changed refusal message, not as an owned criterion.

## Diffstat and status

```
 src/core/types.ts              |  22 +++++-
 src/server/Probe.ts            |  31 ++++++++
 tests/src/server/Probe.test.ts | 175 ++++++++++++++++++++++++++++++++++++-----
 3 files changed, 204 insertions(+), 24 deletions(-)
```

```
 M src/core/types.ts
 M src/server/Probe.ts
 M tests/src/server/Probe.test.ts
```

No commits. `src/server/helpers.ts` untouched; `computeDigest` keeps its normalizing semantics and is still used for `Verdict.digest` (`src/server/Probe.ts:143`) and the type stage's project digest.

## Shared-file finding (report-only, `guides/probe.md`)

PD4 added a refusal the guide does not document. Two patches, for a carrier unit that owns the guide:

`guides/probe.md:519-520`, replace:

```markdown
- **The control's candidate text differs from the case's.** A control byte-identical to its case
  cannot break, so it never produces the `origin: 'claimant'` issue a receipt requires.
```

with:

```markdown
- **The control's candidate text differs from the case's.** A control byte-identical to its case
  cannot break, so it never produces the `origin: 'claimant'` issue a receipt requires, and `prove`
  refuses it with `origin: 'claimant'`, `code: 'refused'` without letting a stage inspect the claim.
  The comparison reads the bytes of each side's candidate drafts and test, so varying the control's
  `stage` or its `reason` alone does not admit it.
```

`guides/probe.md:331`, the `claimant`/`refused` row: insert `a control repeating the case's candidate drafts and test byte for byte, ` before `a candidate naming no scoped project`. That cell is the table's widest, so the carrier repads every row of the table at lines 329-339 to the new width.

## Deviations

One, decided and carried on from under the ancillary clause of the deviation contract. The brief's finding 3 names the collision vector, and I pinned it with the `prove`-level admission assertion alone rather than also asserting `computeDigest(caseSide) === computeDigest(controlSide)` inside `Probe.test.ts`. Simulating both platforms showed the pair collides under POSIX and under `path.win32` only when the host cwd carries no drive letter, so a digest-equality assertion would be a platform-dependent pin on a helper another test file owns (`tests/src/server/helpers.test.ts:568-581`). The admission assertion is the true property and is platform-independent; the collision is recorded here as the measured evidence that made it red.

Nothing else diverged. The `failed to load config from /tmp/orkestrel-test-*/vite.config.ts` line in the suite output is an expected stderr note from the pre-existing `RuntimeStage` recycling test, present on the committed baseline.