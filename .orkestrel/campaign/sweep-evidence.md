# The fleet sweep — 0.0.50 candidate across eleven targets

Run 2026-08-23 against the packed candidate at `dd3f986`. Two parallel slices of disjoint repos,
serial within each, reporting per target.

## What this sweep corrected over every earlier attempt

- **`--offline`**, so the vendored floor is the candidate's own `dist/host` rather than the published
  0.0.49 inventory.
- **The presence-owned proof deleted before the verb runs.** `overwrite` restores such a path only
  when absent, so without the delete the sweep measures the proof the target already had. Every
  earlier sweep did exactly that.
- **The delete committed before the verb runs.** The first attempt of this sweep committed a
  checkpoint and *then* deleted, leaving the tree dirty; `overwrite` refuses a dirty target, so all
  eleven reported `vendored=ok` with `regenerated=no`. That is a sweep that reads clean while
  measuring nothing, and it was caught on the first target rather than at the end.
- **`--mode release`** on the proof, which is how `prepublishOnly` invokes it.

## Result

| target | proof regenerated | vendored | five gates | release proof |
| ------ | ----------------- | -------- | ---------- | ------------- |
| indexeddb | yes | tip | green | PASS |
| abort | yes | tip | green | PASS |
| contract | yes | tip | green | PASS |
| router | yes | tip | green | PASS |
| console | yes | tip | green | PASS |
| mcp | yes | tip | green | PASS |
| process | yes | tip | green after the deciding re-run | PASS |
| test | yes | tip | green | PASS |
| ollama | yes | tip | green | PASS |
| terminal | yes | tip | green | PASS |
| supervisor | no, refused | stale | green | none planned |

## The two that needed adjudication

**`process` reported `test=RED` under load** — the same grandchild-readiness deadline as the earlier
sweep, missed by 4.65ms of 6000ms. Both slices had exited before the deciding re-run, per the rule
that a timing failure is re-run alone by the Orchestrator rather than diagnosed by the unit that hit
it:

```text
  concurrent runners: 1
 Test Files  1 passed (1)
      Tests  13 passed (13)
exit: 0            (2.63s, against a 6000ms deadline)
```

Contention, not a defect. Its full suite is green alone.

**`supervisor` is refused by `overwrite`** for a pre-existing reason: its manifest names Vitest
projects the planned `vite.config.ts` does not register, so the configs group blocks and the
invocation stops. It reproduces under the published 0.0.49 and is recorded from earlier rounds. Its
own five gates are green, and it plans no distribution proof because it publishes no `src` face.

So the candidate propagates to every target that accepts propagation, and the one refusal is not
this version's.

## A defect found in a neighbour, recorded not repaired

`supervisor`'s `tests/app/server/fixtures/claude.mjs` orphans itself on every run and never exits.
Recorded on `ROADMAP.md` against the package that owns it.

## The recast writing check

The old claim swept campaign prose and repriced on every round, because each round writes new prose.
`.claude/rules/quality.md` line 89 directs such a subject to be dropped or recast to the property the
tally stood in for. The property is **the bytes a target receives carry no banned term**, over a fixed
population — the vendored inventory — so it has a closing condition.

Result:

- **The emitted distribution proof is clean.** No banned substitution and no directional reference.
  That is the file that ships under presence ownership into every target and is never rewritten once
  written, so it is the surface that had to be clean.
- **The two vendored files this version touched added no directional reference.**
  `.agents/orchestration.md` and `guides/scaffold.md` each add zero lines containing `above` or
  `below`.
- Pre-existing directional references remain in vendored instruction files, and many are in permitted
  senses — `.claude/rules/writing.md` states the ban and must contain the words; `matchesEngines`
  describes a floor "at or above" a minimum, which is numeric comparison. These predate this version
  and belong to a later scope.

The check closes for what 0.0.50 ships and changes.
