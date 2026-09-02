# Audit verdict — unit breaking-workflow

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so; `checker` and `verifier` on Sonnet. Subject: commit `bcf8ab4`
(`units/workflow.diff`, `units/workflow-report.md`, `units/workflow-report.json`), then the
fix-up at `9f00455` (`units/workflow-fixup-brief.md`, `units/workflow-fixup-report.md`,
`units/workflow-fixup.diff`, `units/workflow-fixup.status`, checker lane
`units/workflow-fixup-audit-checker-brief.md`; the cycle probe `units/workflow-probe-cycle.mjs`
with its recorded output). The subjective lane ran: a settle retype, four interned classes, a
persisted-field rename, and a new construction path, above the wide-unit trigger.

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s06-01, -03, -04, -09, -11, -16, -17, -22, -23, -24; the carry) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name; `RunHolderInterface`, `IdleInterface` in `types.ts` | BROKEN (`run` in a published remark, a comment, an assertion, and fixtures) | — | CONFIRMED | — | closed by the fix-up |
| 3 ruled form | UNRESOLVED (s06-11 on `Workflow`) | CONFIRMED (the derivation ruled compliant) | — | — | the derivation stands: the derive-state law governs where the value already lives |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, `INTERNAL`, executed assertions | — | BROKEN (the guide taught the interned handle names; the dead `'run' in snapshot` assertion) | CONFIRMED | — | closed by the fix-up |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | — | — | CONFIRMED as quoted | GREEN (861 src; policy 111; config 46; setup 27; guides 88) | stands |
| 8 nothing hidden | BROKEN (the sweep reported clean by omission) | — | — | — | closed by the fix-up and this record |

Rulings of record: `Workflow.description` derives from the frozen `#context` (both lanes
recommend it); s06-16 is amended to `scanSnapshotContext` (`locate*` is not a table prefix and the
helper walks the snapshot and returns the first inconsistent node's context); the s06-17
carrier's shape is amended to `createWorkflowTree(definition, captured)` reading `captured.bail`
(a required `bail` every caller derived from the bag could contradict it); the `RunHolder` class
is interned with `RunHolderInterface` published (nothing accepts or returns the interface); the
`IdleScheduler` privates take the family form (`#idle` the boundary, `#idleCallback` the
detector); the guide names `ControllerInterface` and `TaskControllerInterface` where a reader
reaches for the handle and keeps `Phase` and `Task` as tier nouns; the Runner fences' sample
handler is `compile`; the stored-snapshot break is stated in the guide's persisting section; the
version bump the serialized change earns is taken at release; the s06-17 module cycle is proven
non-fatal by the retained probe (84 core exports in ESM and CJS, interned classes absent, a mint
and an execute through the built artifact).

Fix round (`builder` on Sonnet, `9f00455`): findings 1–12 closed as the brief rules them; the
finding-4 assertion went red under a planted unconditional `behavior` emission (1 failed | 159
passed, `expected true to be false` at `helpers.test.ts:688`) and green with the plant restored
(160 passed); the parity test required the `hold` example on the interned class, so it stays with
a relative import. Landed with the full chain green (`instruments/land-fixup.mjs`, log
`land-fixup.log`). Checker on the fix-up: `FAIL 5` because the retained report omitted the
red-then-green command text the writer had returned; the Orchestrator restored it in the retained
report.

Recorded for the next change: `RunnerValue` still boxes each settled value beside the `Result`
discriminant; the `README.md` link to `guides/src/workflow.md` (the `readme-links` sweep); the
`Phase` and `Task` tier nouns in the guide, for a later voice pass.

Terminal lines: objective `FAIL 2, 3, 8` and subjective `FAIL 5` closed by the rulings and the
fix-up; checker PASS on the unit and `FAIL 5` on the fix-up closed by the report correction;
verifier GREEN. **Verdict: PASS.** The unit closes **applied** for every row. Tip packed:
`workflow-9f00455.tgz`.
