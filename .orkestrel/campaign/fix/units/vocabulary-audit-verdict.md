# Audit verdict — unit vocabulary (names.md)

Bench: Sol dark (`codex` absent); every lane on the writer's engine (Opus 5) in a clean context,
told so; `checker` on Sonnet. Round 1 subject: commit `766c3dc` (`units/vocabulary.diff`,
`units/vocabulary-report.md`).

## Round 1

| Claim | Objective lane (Opus reviewer) | Checker (Sonnet) | Orchestrator |
| --- | --- | --- | --- |
| 1 one directive per prefix, one home | CONFIRMED (`names.md:91-104`; no other section defines the prefixes) | CONFIRMED | stands |
| 2 external-mirror pair in § General vocabulary | CONFIRMED (`:119-120`) | not held | stands |
| 3 every added line a directive, no count, no `should` | CONFIRMED | CONFIRMED | stands |
| 4 the text alone decides the cited rulings | BROKEN: `rgba → resolveColor` not licensed by `resolve*`; `describe*` and `render*` overlap; `build*` not separated from `create*` and `*Of` | not held | upheld; see rulings |
| 5 gates as reported | not held | UNRESOLVED (no shell) | CONFIRMED by the Orchestrator's own re-run: `format:check` 0, `lint:check` 0, `test:policy` 0 (111 passed) |
| 6 only the owned file changed | CONFIRMED (one file header in the diff) | CONFIRMED | stands |
| outside claims: `read*` restates the `parse*` contract owned by § Fixed forms | finding | — | upheld |

Terminal lines: objective lane `FAIL 4`; checker `FAIL 5` (procedural: no shell).

**Rulings.** Claim 4's three findings and the duplicate-home finding are real. `rgba`'s target
changes to `parseCSSColor` (the `parse*` contract fits; `resolve*` is left as written); the
`describe*`/`render*` triggers are made disjoint by input; `build*` names its `create*` and `*Of`
exclusions; `read*` refers coercion to § Fixed derivation/construction forms. Fix round:
`vocabulary-2-brief.md` (Opus implementer), audited by the objective lane on the diff.
