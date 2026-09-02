# Audit verdict — unit breaking-sqlite

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commits `02cabef` (the unit) and `90d3527` (the
Orchestrator's README engine-floor line), rendered as `units/sqlite.diff`,
`units/sqlite-report.md`. The subjective lane did not run: the unit is one member rename plus
two refusals, below the wide-unit trigger.

| Claim | Objective lane | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s18-11 applied; s18-10 and s18-12 refused with the rule text; s18-30 sibling applied) | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name in owned files (`exec` survives only on `node:sqlite`'s `DatabaseSync` receiver, `RegExp.prototype.exec`, and the vendored contract mirror); `execute` in `types.ts:139` | CONFIRMED | CONFIRMED | — | stands, with the residue below |
| 3 ruled form: `execute` on interface and class with the in-class callers; `foreignKeys` unchanged with the mirrored-pragma TSDoc sentence; `transaction` untouched | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows, fences, heading, README; parity list empty | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | — | CONFIRMED on the quoted commands | GREEN (235 tests) | stands |
| 8 nothing hidden (s18-10 tension disclosed with its revert; parity plant disclosed; out-of-scope items recorded) | CONFIRMED | — | — | stands |

Finding outside the claims, ruled and closed by the Orchestrator as a one-line fix-up
(`5a9340b`): `tests/src/server/SQLiteDatabase.test.ts:90` titled the case "execs DDL …", an
inflected spelling of the renamed member that the unit's bare word-boundary sweep for `exec`
could not match. Now "executes DDL …", the member's own verb, so it does not alternate with the
statement's `run`. Scoped gates after the edit: `format:check` 0, `lint:check` 0, `test:src`
51 passed. Carried forward: the brief template and the audit claim generator now require a
second, case-insensitive sweep over the inflected forms.

Ruling on the s18-10 tension the writer disclosed: the landed state is the ruled form. The
row's ruling directs the TSDoc sentence, and the rule the refusal rests on
(`names.md` § General vocabulary, "its TSDoc names the source it mirrors") requires it, so the
general "refused with no edit" clause yields to the row.

Referrals recorded for the next change, not reopened here: `SQLiteStatementInterface.run` is a
banned synonym for `execute` under § Fixed lifecycle vocabulary, and the guide describes
`run`/`get`/`all`/`iterate` with the prose verb "Execute"; the guide's `## Contract` preamble
names a `src/server/sqlite` directory that does not exist.

Terminal lines: objective PASS; checker PASS on its claims; verifier GREEN. **Verdict: PASS.**
The unit closes **applied** for s18-11 and the s18-30 sibling, **refused** for s18-10 and
s18-12. Tip packed: `sqlite-5a9340b.tgz`.
