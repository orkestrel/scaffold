# U1-conform audit — verdict, 2026-09-20

Subject: the U1-conform tree on Veneer `d8b0e65` (`units/u1-conform-report.md`) with the
Orchestrator's manifest step (`units/veneer-manifest-tailwind.sh`), rendered as
`units/u1-conform-diff.patch.txt` and `units/u1-conform-status.txt`. Claims:
`u1-conform-audit-claims.md`. Lanes, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c038-5bc7-7dd2-a70a-ccec4e13bdc8`, exit 0 | `units/u1-conform-audit-analyst.sh`, `units/u1-conform-audit-analyst-report.md` |
| subjective | `reviewer` | native Opus 5 (the writer's engine, told so), workflow `wf_e0f49ac3-f9d` | `units/u1-conform-audit-reviewer-brief.md`, `units/u1-conform-audit-reviewer-report.md` |
| mechanical | `checker` | native Sonnet, same workflow | `units/u1-conform-audit-checker-brief.md`, `units/u1-conform-audit-checker-report.md` |
| gates | `verifier` | native Sonnet, same workflow | `units/u1-conform-gate-brief.md`, `units/u1-conform-gate-report.md` |

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 2 | CONFIRMED (helper bodies match `d8b0e65` after identifier normalization; the key change is the intended one) | CONFIRMED | PASS (the one `computeFileDigest` hit is the vendored scaffold guide mirror) | confirmed |
| 3 | CONFIRMED | CONFIRMED (`void` is what remains once `architecture.md` bars the binding) | PASS | confirmed |
| 4 | REFUTED: `styles.md` § Centralized files has the barrel load partials with `@use`; `meta.load-css` departs, and an order-only `@use` before `shell` compiles with the statement first | CONFIRMED on the output; bound 12 on the two ways the workspace now states an order | — | refuted on the mechanism: the app entry takes the shape the published side already has (the order statement as the first statement of the first-loaded partial, loaded with `@use`); carried (brief 2) |
| 5 | UNDECIDABLE (the two readings are the writer's) | UNDECIDABLE (same) | — | confirmed in structure by both lanes; the two clean-tree readings are the writer's and are re-taken by U-styles-config, whose brief now names `test:conformance` with `dist/` absent as a criterion |
| 6 | UNDECIDABLE on the audit exit alone | CONFIRMED | — | confirmed by the Orchestrator from `units/u1-conform-gate-report.md` (audit exit 0, the `setup` question printed); the question is accepted: the module cannot load in the Node `setup` project and its behaviour is proved in `src:browser` |
| 7 | UNDECIDABLE (no writing-rule violation found; the gate is writer-reported) | REFUTED: the sentence claims the showcase proves the published CSS, while `mountShowcase` loads the app stylesheet alone and the shell's `body` rule overrides the published paint on the served page | — | refuted: the sentence overclaims against the unit's own deviation 7; carried (brief 2), and the Orchestrator rules that the tree makes the sentence true rather than the sentence narrowing — the showcase loads the published cascade wherever it mounts and the shell stops overriding it |
| 8 | CONFIRMED | CONFIRMED | PASS | confirmed |
| 9 | CONFIRMED | CONFIRMED | FAIL: `tests/setupListeners.ts` matches no Owned glob | confirmed: brief item 7 grants "a `tests/setup*.ts` module named for what it does", so the file is owned by the item; the Orchestrator's § Scope list omitted the grant |
| 10 | UNDECIDABLE | UNDECIDABLE | — | confirmed by the Orchestrator from `units/u1-conform-gate-report.md`, taken on the tree with the manifest step: format, lint, check, build, the whole `npm test` chain, `test:distribution` (11 passed, 3 skipped, the new built-artifact case among them), Edge `test:src` 17, `test:app` 3, `test:src:styles` 40, all exit 0; audit exit 0 with the `setup` question and the three advisory dependency lines |
| 11 (analyst) | CONFIRMED: `extractSpecifiers` reads a `require` argument only as a `Literal`, while the dynamic `import` branch reads a substitution-free template; ``require(`bootstrap`)`` extracts nothing and the distribution predicate accepts it | — | — | confirmed: an instrument whose claimed coverage exceeds its matching (`quality.md`); carried (brief 2) |

## Findings carried

| Finding | Source | Carrier |
| --- | --- | --- |
| the app entry loads its partial through `meta.load-css` | analyst 4 | brief 2 item 3 |
| the `## Showcase` sentence overclaims; the shell overrides the published body paint; `mountShowcase` loads the app stylesheet alone | reviewer 7 and its required change; report deviation 7 | brief 2 items 1, 2, 4 |
| `extractSpecifiers` misses a template-literal `require` | analyst 11 | brief 2 item 6 |
| `## Tests` links the journey and not `Showcase.test.ts` | reviewer 13 | brief 2 item 4 |
| the `it` title `executes the scheme-validation example verdicts` | report deviation 6 | brief 2 item 5 |
| the constructor/`#mount` seam splits the button's setup | reviewer 11 (bound) | recorded; U7 owns the next pass over the shell |
| the `setup*` stem buys an audit question | reviewer 14 (bound) | recorded; the question is accepted as stated at claim 6 |
| criterion 3 (conformance with no `dist/`) | report deviation 4 | U-styles-config (criterion added to its brief) |

Verdict: fix round — claims 4 and 7 and analyst finding 11; brief 2 on `opus`.
