# Audit verdict — unit breaking-workspace

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `54de910` (`units/workspace.diff`,
`units/workspace-report.md`), then the fix-up at `e564c2d` (`units/workspace-fixup-brief.md`,
its successor `units/workspace-fixup-2-brief.md`, `units/workspace-fixup-report.md`). The
subjective lane did not run: two renames and an empty-batch pin, below the wide-unit trigger.

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s17-31, s17-32, empty batch, the cross-package template row refused) | CONFIRMED | CONFIRMED | — | stands; see F3 |
| 2 no old name; `base64` in `types.ts` | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows, executed assertions | — | CONFIRMED | — | stands |
| 6 only owned files | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | UNRESOLVED | GREEN (335 tests) | stands |
| 8 nothing hidden | CONFIRMED | — | — | stands |

Findings and their closure: F2 (the mutation probe proved two of the four vacuous-truth pins) —
closed by the fix-up: one case per batch form, each pin red under a seed scoped to the empty batch
and green restored, recorded in the report. The first dispatch stopped on its deviation contract
because the Orchestrator's seed `path.every → path.some` also reddened the multi-path `has` case;
the successor brief corrected the seeds and the acceptance wording (a proof binds when the pin's
own case went red; other cases a seed reddens are recorded). F1 (a snapshot persisted by 0.0.6 or
earlier holding a binary file reads as absent after the rename, text files included) — ruled: no
shim (`AGENTS.md` § Design laws); the fix-up commit message `e564c2d` records the break, and the
findings file carries it. F3 (the cross-package template row had no carrier) — confirmed: the
template unit had not carried it; `template-fixup-2` carries it now. F4 (the `createBinaryContent`
parameter rename was disclosed under the wrong grant) — a report defect; the authority is
`.claude/rules/names.md` § Rejected naming, recorded here. F5 (the predicate restates the binary
arm) — stands, `npm run check` binds the two. The `README.md` link to `guides/src/workspace.md`
closed inside the fix-up.

The fix-up landed at `e564c2d` with the full chain green (`instruments/land-fixup.mjs`, log
`land-fixup.log`: format:check 0, lint:check 0, check 0, build 0, test 0).

Terminal lines: objective PASS; checker `FAIL 7` (UNRESOLVED by construction, settled by the
verifier); verifier GREEN. **Verdict: PASS.** The unit closes **applied** for s17-31, s17-32, and
the empty-batch row, and **refused** for the cross-package template row, which its own unit now
carries. Tip packed: `workspace-e564c2d.tgz`.
