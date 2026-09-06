# Verdict — U3 declaration-rollup, audit round 2 (over U3-fix)

Lanes that ran, each in a clean context on `u3-fix-audit-brief.md`: subjective (`reviewer`, Opus 5), objective (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet); `verifier` (Sonnet) ran the scaffold gate chain separately after probe's idle-host readings were taken (`u3-fix-verify-report.md`). Every lane returned.

## Per-claim reconciliation

| Claim | Subjective | Objective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | PASS | PASS | PASS | PASS |
| 2 | PASS | PASS | PASS | PASS |
| 3 | PASS / CANNOT RULE on the gate | CANNOT RULE on the gate | PASS | PASS. The verifier's `npm test` is green (`test:src:core` 385 passed), which is the gate clause both reviewer lanes lacked. |
| 4 | PASS | PASS | PASS | PASS |
| 5 | PASS | PASS | PASS | PASS |
| 6 | PASS | PASS | PASS | PASS |
| 7 | PASS | PASS | PASS | PASS |
| 8 | PASS | PASS | PASS | PASS |
| 9 | FAIL | FAIL | PASS | FAIL. The waiver names `configs/helpers.ts` but hangs off "Because it may import nothing", which is false of that file, sits in the `configs/policy.ts` bullet, and tallies "either vendored leaf". The checker read the letter (named, wrapped). Carried to U3-fix-2 edit 1: the leaves bullet carries the waiver for every leaf with its reason (no `configs/types.ts` exists for a leaf to import), and the policy bullet loses its restatement. |
| 10 | PASS / CANNOT RULE on the rollup | CANNOT RULE on the rollup | CANNOT RULE on the rollup | PASS. The Orchestrator's own reading after the verifier's build (`orchestrator-measurements.md` § The core rollup against U1's): the server rollup is byte-identical (`cmp` exit 0); the core rollup differs only inside the seed literals and by the deleted `nameToRewrite` declaration, both by design. The verifier's report read the second hunk backwards; the grep counts settle the direction. |
| 11 | PASS | PASS | PASS | PASS |
| 12 | PASS | PASS | PASS | PASS |

## Findings outside the claims

Carried, each to one U3-fix-2 edit:

- A (subjective, required): the browser and server seeds spell the rewrite in two vocabularies, and the parity assertion straddles the difference → edits 2 and 3.
- B (subjective, required): the roll-up proof hand-rolls a scratch under the repository's `tmp/` while the file imports `createPolicyScratch` → edit 5, with the fixture-root unknown named.
- C (subjective, required): `extractorResolved` beside `extractorPath = ''` is a derived flag and an empty-string sentinel → edit 4.
- Objective: the scratch's removal is unproven (deleting the `finally` breaks no assertion) → edit 6.
- Objective: the `isExtractorModule` true case cannot tell `Reflect.get` from an own-property read → edit 7.

Carried to U6 (`ts6-u6-scaffold-seeds-brief.md` § Carried): D, `DECLARATION_DEV_DEPENDENCIES` still pins `vite-plugin-dts` (`src/core/constants.ts:510`) with the fixture manifests, the compilers and CLI tests, and `guides/scaffold.md:121` derived from it; and the `config` project's timeout rationale in the seeded `vite.config.ts` names the linter's caps while the project now carries a two-face real build (an observation for U6's budget sizing under `.claude/rules/tests.md` § Expensive proofs).

Recorded, no carrier: E (subjective observation), the omnibus case `reads the compiler scope and fixed extractor override a declaration roll-up requires` now covers more than its name says; a later unit may split it by subject. The subjective referral on `Reflect.apply` with a partial config literal under Vite's hook typing is settled by the verifier's green `check`.

## Gate reading

`u3-fix-verify-report.md`: `GATES: GREEN` — format, lint, `check`, `build` (`host.json` regenerated), and `npm test` green over every project. The fix-2 round closes with `checker` and `verifier` because every edit adopts a lane's prescription verbatim.

VERDICT: FAIL 9 — fix round U3-fix-2 dispatched; A, B, C, and the two objective findings carried with it

## Closure — U3-fix-2 (checker and verifier)

`u3-fix-2-checker.md`: PASS on every claim over the interdiff `u3-fix-2.diff.txt`; the fixture root under `os.tmpdir()` was accepted by Vite and the extractor, so the roll-up proof runs through `createPolicyScratch`. `u3-fix-2-verify-report.md`: `GATES: GREEN` — the `npm test` chain exited 0 (its `&&` chain proves each project ran green; the excerpt's tail shows the bin, policy, config, setup, and guides summaries), the server rollup byte-identical to U1's, the core rollup differing only by the seed literals and the deleted `nameToRewrite`, and no `orkestrel-declarations-` entry left under the temporary directory. U3 is accepted and lands with its records.

VERDICT: PASS — U3 accepted after U3-fix-2
