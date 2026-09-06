# Verdict — U7 probe-typestage, audit round 1

Lanes that ran, each in a clean context on the brief `u7-audit-brief.md`: subjective (`reviewer`,
Opus 5), objective (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), `checker`
(Sonnet), and `verifier` (Sonnet) over the probe gate chain. Every lane returned. The Orchestrator
took the idle-host readings the lanes could not: `Probe.test.ts` alone (`u7-probe-solo.log.txt`)
and the cross-cutting projects alone (`u7-probe-rest.log.txt`).

## Per-claim reconciliation

| Claim | Subjective | Objective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | PASS | PASS | PASS | PASS |
| 2 | PASS | PASS | PASS | PASS |
| 3 | PASS | PASS | PASS | PASS |
| 4 | FAIL | FAIL | PASS | The claim is falsified, the code is not. The scratch extends the mirrored project in place, carries the printed `files` selection re-spelled relative to itself, and adds `incremental` and `tsBuildInfoFile`; nothing is re-rooted, because placement beside the mirrored project resolves the extended chain unchanged (`TypeStage.ts:475-513`, the report § Scratch project). The brief's wording named `instruments/mirror-scratch-tsconfig.json` as "the measured shape"; the shipped shape is the unit's recorded answer to the brief's named unknown. Corrected record, no code change. The checker's PASS read the claim's other conjuncts. |
| 5 | FAIL | FAIL | PASS | FAIL. The pinned shapes do not exist (`tests/src/server/helpers.test.ts:112-125` holds the two documented examples only); classification keys on the `.json` extension rather than on what the claim drafted (`TypeStage.ts:523`); any non-empty stderr is an instrument fault (`:458`). The checker's PASS read the mapping, not the tests. Carried to U7-fix-a edits 2, 3, and 6. |
| 6 | PASS | PASS | PASS | PASS |
| 7 | FAIL | PASS | FAIL | FAIL. The resident-service prose survives at `guides/probe.md:4-5,140,219,333,837-839,1079-1082`, `src/server/Probe.ts:44`, `src/server/types.ts:136-138,197-205`. The objective lane's PASS read the teardown and rename conjuncts, which hold. Carried to U7-fix-b edit 1. |
| 8 | CANNOT RULE | CANNOT RULE | PASS | PASS. `npm run test:guides` alone on 2026-09-06 at 11:07 UTC: 13 passed, exit 0 (`u7-probe-rest.log.txt`); that project executes the flagship fence carrying the receipt at `guides/probe.md:613`. |
| 9 | PASS | PASS | PASS | PASS |
| 10 | PASS | PASS | CANNOT RULE | PASS on the two reviewer lanes' full reads; the checker's partial sweep found nothing. |
| 11 | PASS | PASS | CANNOT RULE | PASS on the reviewer lanes; the checker confirmed the owned-file set. |
| 12 | CANNOT RULE | CANNOT RULE | CANNOT RULE | PASS. Patch exactness confirmed by every lane; the verifier's whole-suite run had `RuntimeStage.test.ts` green (`u7-verify-report.md` § 6 names the one red file, and it is `Probe.test.ts`), and the Orchestrator's earlier solo run of the runtime suite passed (`u7-integration-report.md`). |
| 13 | PASS | PASS | PASS | PASS |
| 14 | CANNOT RULE | FAIL | PASS | FAIL. `#configure` reads `execution.status === 0` (`TypeStage.ts:440`), the value the majors disagree on; measured on 2026-09-06 that 6.0.3 prints the fault diagnostic and no JSON for an unknown option (`orchestrator-measurements.md`), so reading the text alone gives the same outcome on 6.0.3 and a major-neutral rule. Carried to U7-fix-a edit 1, with the residual `resolve` divergence stated as the contract. The checker's PASS read the exit-code-free `#check`, not `#configure`. |
| 15 | CANNOT RULE | PASS | PASS | PASS on the idle-host reading: `Probe.test.ts` alone, 26 passed in 387 s, the retuned 15 s and 20 s rows included; the whole-suite red row at `:696` expired the queued claim's own budget under load, the timing class rule 10 of `.agents/orchestration.md` § Writing concurrency names. M5 over the rebuilt `dist` is the Orchestrator's reading after U7-fix-b. |

## Findings outside the claims

Carried, each to exactly one brief item:

- `#walk` duplicated across `TypeStage` and `RuntimeStage` (subjective F1) → U7-fix-a edit 4 (`collectWorkspaceFiles`).
- Classification by `.json` extension (subjective F2, objective claim 5) → U7-fix-a edit 3.
- `#clear` against the fixed lifecycle vocabulary (subjective F3) and `#build` against the class's own "builds" (F7) → U7-fix-a edit 9.
- The `Issue` `@example` range width (subjective F4) → U7-fix-a edit 11.
- `normalizeValue` remarks written for the parsed project (subjective F5) → U7-fix-a edit 10.
- The count in § Cost (subjective F6) → U7-fix-b edit 4.
- § Prerequisites lacks the warm's obligation (subjective F8) → U7-fix-b edit 3.
- The stale `configs/src/tsconfig.core.json` digest in `src/core/constants.ts`, `src/core/helpers.ts`, and the fixtures (subjective F9, objective) → U7-fix-b edit 6.
- `loadWorkspaceModule` ignores its specifier (subjective F10, objective) → U7-fix-a edit 8 (`loadWorkspaceVitest`; a dynamic `require` is what the lint gate refuses, so the parameter cannot be honoured and goes).
- Symbolic links never mirrored while the guide claims inspection through one (objective) → U7-fix-a edit 5, ruled: the mirror carries regular files inside the workspace only.
- Digest read with the workspace as the current directory while the check runs in the mirror (objective) → U7-fix-a edit 1 (`--showConfig` over the mirrored copy).
- Issue path projected from the mirror root only (objective) → U7-fix-a edit 3.
- Signal-ended child reported as `exited undefined` (objective) → U7-fix-a edit 2.
- `Diagnostic.code` consumed by nothing (objective) → U7-fix-a edit 7 (removed).
- The `Issue` Surface row states no point (objective note on claim 7) → U7-fix-b edit 2.

Dropped on the record, because no lane substantiated them and the objective lane did not take them
up: the `--showConfig` cache set after resolution (a duplicate spawn costs time and changes no
result), the `#place`/`#clear`/`#release` ordering against teardown (every step after a spawn runs
behind `#refuseDestroyed`), `filterUniqueIssues` collisions (its key is every value an issue
carries), and the hand-written option records in the digest test (a unit test of `computeDigest`;
the compiler-derived digest is pinned by `resolves every spelling of one project to one path and one
digest` and `moves the digest with the extends chain under a byte-identical project file`).

Settled without a carrier: `scanDiagnostics` stays in `helpers.ts` (the subjective lane ruled the
`scan*` walker correctly placed; the objective lane referred the question and did not contest it).

## Gate reading

`u7-verify-report.md`: format, lint, `check`, `build` green; `npm test` red on one `Probe.test.ts`
row under load and the chain stopped there. The Orchestrator's idle-host runs: `Probe.test.ts` alone
green (26 passed, 387 s), `test:policy` (111), `test:config` (46), `test:setup` (9), and
`test:guides` (13) green alone. The authoritative whole-suite reading is the U7-fix round's
verifier over the fixed tree.

VERDICT: FAIL 5, 7, 14 — fix round U7-fix-a and U7-fix-b dispatched
