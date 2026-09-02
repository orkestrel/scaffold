# Audit verdict — unit scaffold-adopt

Bench: Sol dark. An Orchestrator-owned unit (the plan's L3 `scaffold-adopt` row): the fixture pin
and the host digests, committed as `4ccd61d`. Audited by a `checker` on Sonnet in a clean context.

| Claim | Checker | Orchestrator evidence | Ruling |
| --- | --- | --- | --- |
| 1 the fixture's contract pin equals the manifest's range and no other line changed | NOT-EVIDENCED (pin equality confirmed at `app-only-toolchain.txt:2` against `package.json:96`; no diff access) | `git diff --stat` before the commit: the fixture changed one line (`2s/^0.0.13/^0.0.15/`) | stands |
| 2 every changed `host.json` value is a digest | NOT-EVIDENCED (no prior version to diff) | `git diff -- host.json`: 4 insertions, 4 deletions, every line a `digest` field, for `claude/agents/orkestrel.md`, `claude/rules/names.md`, `claude/rules/tests.md`, and the root — the catalog regeneration, the vocabulary rule, and the W-DEV tests canon | stands |
| 3 `src/` imports none of the renamed or deleted upstream symbols | CONFIRMED (`align`, `strip`, `stripControls`, `width`, `renderTable`, `executeSync`, `fillTemplate` only; no `app/`) | `npm run check` 0 against the staged closure | stands |
| 4 the chain exits as recorded | CONFIRMED on the earlier `repin-scaffold-*` logs the lane found | the unit's own run, `/home/user/work/logs/scaffold-<gate>.log`: format:check 0, lint:check 0, check 0, build 0, test 0 (377, 431, 244, 111, 46, 17) | stands |

Scaffold's adoption debt against the accepted L0 to L2 tips is the fixture pin alone; the console
`succeed`/`fail` adoption the plan anticipated at `src/bin` does not arise (scaffold uses
`reporter.status`, `renderTable`, and the layout helpers, none renamed). Scaffold's vendored host
surface moved (names, tests, the catalog agent), so a scaffold bump and publish are owed at the
release, as recorded at W0.

**Verdict: PASS.** The unit closes **applied**.
