# Audit verdict — unit breaking-template

Bench: Sol dark; objective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` and `verifier` on Sonnet. Subject: commit `50da0d2` (`units/template.diff`,
`units/template-report.md`). The subjective lane did not run: three rows in one manager, below
the wide-unit trigger.

| Claim | Objective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- |
| 1 rows (s17-16, s17-17, s17-18) | CONFIRMED | CONFIRMED | — | stands |
| 2 no old name (`Map.prototype.size` on a `#` field survives by design); `count` and the `undefined` accessor in `types.ts` | CONFIRMED | CONFIRMED | — | stands |
| 3 ruled form (`count`; `template` returns `undefined` with the `NOTFOUND` throw interned in `#require`; the no-argument overload dropped) | CONFIRMED | — | — | s17-18 reversed by rule authority, see F3 |
| 4 no alias or shim | CONFIRMED | — | — | stands |
| 5 guide rows, preamble, fence; `INTERNAL` empty; the `undefined` claim asserted | — | CONFIRMED | — | stands |
| 6 only owned files (the `tmp/` probe outside the status, see F1) | CONFIRMED | CONFIRMED | — | stands |
| 7 gates | UNRESOLVED (no shell) | NOT-EVIDENCED by the brief's construction | GREEN (123 src) | stands |
| 8 nothing hidden | CONFIRMED | — | — | stands |

Findings outside the claims. **F3, ruled by the Orchestrator:** the s17-18 ruling contradicts
`.claude/rules/patterns.md` § Managers § Batch operations as written ("`method(): void` … No
argument applies to all"), a brief cannot repeal a rule, and console, interpret, and table keep
the same `clear` plus no-argument `remove()` pair; the rule wins. s17-18 closes **refused** by
that rule text and the builder fix-up `2eccc62` (`units/template-fixup-brief.md`,
`units/template-fixup-report.md`; failing first 2 of 125, then 125; full chain green) restores
the overload, its branch, its TSDoc, its two tests, and the guide rows. The `clear`-versus-
remove-all tension is a question for the user, recorded in the findings file; the fleet keeps
the pair until ruled. **F2** closed by the same fix-up: the stale `AGENTS §9.2` citations on
the `remove` doc and guide row are dropped; every other `§` citation is pre-existing and
recorded. **F1** recorded: the unit built its type probe under the checkout's `tmp/` (off-limits)
and removed the directory; no live lane used it, and the brief template now directs probes to the
system temporary directory.

Terminal lines: objective PASS; checker PASS on its claims (7 by construction); verifier GREEN.
**Verdict: PASS after the fix-up.** The unit closes **applied** for s17-16 and s17-17,
**refused** for s17-18. Tip packed: `template-2eccc62.tgz`.

## Addendum — template-fixup-2 (after the workspace unit's audit)

The workspace unit's objective lane found the L2 fix-round row "align template's `remove(ids)` to
partial-apply-and-report and state the one batch meaning in `guides/template.md`" uncarried: the
tip `2eccc62` pre-checked every id and returned `false` before removing anything, and its guide
said "all-or-nothing". `units/template-fixup-2-brief.md` (`builder`, Sonnet;
`units/template-fixup-2-report.md`) landed the rule's meaning — each present id removed, `remove`
emitted per instance, `true` only when every id was present — with the red-then-green proof
recorded, at `8fdc167` with the full chain green (`instruments/land-fixup.mjs`, log
`land-fixup.log`). Interpret, template's only fleet dependent, re-stages on
`template-8fdc167.tgz` after its own fix-up lands. **Verdict stands: PASS.** Tip packed:
`template-8fdc167.tgz`.
