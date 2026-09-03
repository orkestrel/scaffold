# Audit verdict: unit conform-markdown

Subject: the uncommitted unit in `/home/user/fleet/markdown` (brief `briefs/conform-markdown-brief.md`, audit brief `briefs/conform-markdown-audit-brief.md`, fix brief `briefs/conform-markdown-fix1-brief.md`, report `reports/conform-markdown-report.md`, evidence `units/conform-markdown.diff.txt` and `units/conform-markdown.status.txt`), implemented by a direct Opus `implementer` (`units/l2a/markdown-implement-direct.md`) from the Luna-reconciled rulings (`units/l2a/markdown-reconcile-luna.md`, the `MarkdownHandlers` → `MarkdownHandlerMap` rename breaking with no source consumer), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l2a/markdown-r1-distillate-luna.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l2a/markdown-r1-checker-luna.md`) | PASS; F-setup-agents, F-readme-count, F-vendored-tsdoc, F-sanitizer-fence outside the claims |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l2a/markdown-objective-r1.md`) | FAIL 4 on the record (the report's missing sweep row for the deleted `guides/src` row); F1 to F3 on the report; four referrals |
| 2 | checker | `checker` on GPT-5.6 Luna, behind the fourth lock (`units/l2a/markdown-r2-checker-luna.md`), after fix round 1 | PASS; F-vendored-tsdoc and F-sanitizer-fence carried |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung, because Grok 4.6 exhausts within minutes of a real lane today (session ledger). The round-2 objective lane did not run: the fix round changed the report and three prose lines and no code, and the round-2 checker's re-run sweeps and its reading of the report against the diff are the evidence claim 4 asked for.

Fix round 1, a `builder` on Claude Sonnet (`units/l2a/markdown-fix1-result.md`): the report's § Sweeps row for `guides/src|Dependency mirrors` (claim 4), the guide package's vendored mirror named under § Breaking (F1), the corrected fence-helper sentence, class names, gate commands, and sibling-table sentence (F2, F3), and the three package-owned prose sites both lanes referred — `tests/setup.ts:3` naming no `setupBrowser.ts`, `tests/setup.ts:54` without its `AGENTS §` citation, `guides/README.md:20` without its count.

## Rulings on the referrals and the findings carried

- The sanitizer prose at `guides/markdown.md:424-438` under no executable fence: a follow-on after landing (`ledgers/followons.md`, `briefs/followon/markdown-sanitizer-brief.md`), with the canonical html guide's twin as an html follow-on row.
- The `@param … Whether` block at the vendored `tests/setupPolicy.ts:583`: the scaffold host-inventory row.
- The vendored mirror `/home/user/fleet/guide/guides/markdown.md` still carrying `MarkdownHandlers`: refreshed from the published bytes at guide's landing after `@orkestrel/markdown` releases, never rewritten.
- Both lanes' smaller record notes (the abbreviated gate commands, the "byte-for-byte" sentence): applied by the fix round.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/markdown`, recorded in `units/land-conform.log` and `units/conform-markdown.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1 checker; round 1 objective's record refutation closed by fix round 1; round 2 checker), pending the deciding run at landing.
