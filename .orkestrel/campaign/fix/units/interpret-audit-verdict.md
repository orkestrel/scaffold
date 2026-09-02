# Audit verdict — unit breaking-interpret

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so; `checker` and `verifier` on Sonnet. Subject: commit `8c00711`
(`units/interpret.diff`, `units/interpret-report.md`), then the fix-up at `738bb5b`
(`units/interpret-fixup-brief.md`, `units/interpret-fixup-report.md`, `units/interpret-fixup.diff`,
`units/interpret-fixup.status`, the two retained probes, checker lane
`units/interpret-fixup-audit-checker-brief.md`). The subjective lane ran: a registry verb
reshape, an option regrouping, and the removal of a stage's aggregate emission, above the
wide-unit trigger.

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (s12-25, -26, -29, -30, -34, -35, -37, -38, -39, -42, -43, -45; s12-21 carrier) | CONFIRMED | — | CONFIRMED | — | stands |
| 2 no old name; `RecordOptions`, the `add`/`remove` overloads, `InterpretEventMap.add`, `InterpretOptions.narrator` in `types.ts` | CONFIRMED (F1 on inflected prose) | — | CONFIRMED | — | closed by the fix-up |
| 3 ruled form | CONFIRMED (R1 referred) | CONFIRMED | — | — | stands; R1 accepted |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, `INTERNAL` empty, executed assertions | — | CONFIRMED | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | CONFIRMED as quoted | — | CONFIRMED as quoted | GREEN (281 src, 111 policy, 46 config, 30 setup, 73 guides) | stands |
| 8 nothing hidden | CONFIRMED (F2 on disclosure) | — | — | — | closed by the fix-up |

Fix round (`implementer` on Opus 5): the registry act reads `added` everywhere and `registry`
stays the collection noun (objective F1, subjective R1); the `{field}.{index}` binding's remark
states the known-length reach, and the guide's `ComputedField` row, `clarify` row, and a new
`ClarifierInterface` fence carry the convention and its limit (objective F2, subjective R2, R3);
the binding-key precedence is stated (objective F5); the owned-context teardown half is stated as
unobservable (F3); the `RecordOptions` sentence parses and `since` is `because` (R4); the
validators fixture drops the empty-string intent (R5); the README links the guide and the stale
mirror path in `types.ts:433` moved with it (F4, R6); the import lists are sorted (R7). The
writer returned the off-limits `Narrator.test.ts:116` title as a patch, applied by the
Orchestrator before landing. Two probes against the built entry corroborate the fence and the
precedence sentence. Landed at `738bb5b` with the full chain green
(`instruments/land-fixup.mjs`, log `land-interpret.log`: format:check 0, lint:check 0, check 0,
build 0, test 0), then re-staged on `template-8fdc167.tgz` with check 0 and test 0. Checker on
the fix-up: PASS, claim 6 UNRESOLVED on the report's bare script labels and settled by the
landing log.

Referrals ruled: the `{field}.{index}` addressing is accepted as ruled surface for this wave with
the honest prose; the unledgered `INVALID_TEMPLATE` and `deriveAggregateField` removals are
accepted and carried in `breaking-radius.json` with no fleet consumer; the private `-1`
accumulators are outside s12-30; the `add`/`remove` verbs, the `GeneratorOptions` and
`createTemplate` removals, and the rewritten README fence are retained; the variable-length
aggregate gap is accepted for this wave.

Recorded for the next change: `InterpretEventMap` publishes `add` without `remove`; `via` at
`src/core/stages/Clarifier.ts:35,194`, `e.g.` at `src/core/types.ts:425,427`, and `...` in the
pre-existing fence at `guides/interpret.md:593` for the voice wave; the two overload-forced
statements at `src/core/Interpret.ts:336-337`.

Terminal lines: objective PASS; subjective PASS with R1–R7 closed; checker PASS on both rounds;
verifier GREEN. **Verdict: PASS.** The unit closes **applied** for every row. Tip packed:
`interpret-738bb5b.tgz`.
