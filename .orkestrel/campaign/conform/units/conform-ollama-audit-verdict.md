# Audit verdict: unit conform-ollama

Subject: the uncommitted unit in `/home/user/fleet/ollama` (brief `briefs/conform-ollama-brief.md` with its addendum, audit brief `briefs/conform-ollama-audit-brief.md`, report `reports/conform-ollama-report.md`, evidence `units/conform-ollama.diff.txt` and `units/conform-ollama.status.txt`, proofs under `/home/user/work/evidence/ollama-proofs/`), implemented by a direct Opus `implementer` (`units/l56/ollama-implement-direct.md`) from the Luna-reconciled rulings (`units/l56/ollama-reconcile-luna.md`) with the addendum's consumer edit taken first.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on Cursor Grok 4.6 (`units/l56/ollama-r1-distill-grok.result.md`) | distillate |
| 1 | checker | `checker` on Cursor Grok 4.6 (`units/l56/ollama-r1-checker-grok.result.md`), Luna being dark | PASS, the report's ten observations referred |
| 1 | objective | `reviewer` on Claude Opus 5 (`units/l56/ollama-objective-r1.md`), Sol being dark | AUDIT-R1-OBJECTIVE |

Subjective lane: not run in the audit round, by the round's design. Both lanes ran on substitute engines, the Cursor account's usage limit having darkened Sol and Luna; both were blind to each other.

## Rulings

- Standing condition: the `tests/service/**` suites need a live Ollama daemon this container does not run and sit outside `npm test`; the rows touching them are proved by `check` and `lint:check`, and `prepublishOnly` runs them against a daemon before a publish (user-owned).
- AUDIT-R1-RULING
- Breaking rows (`ollama-subj-12`: `assembleResult` → `buildResult`; `ollama-obj-1`: `parseBody` returns `undefined` for a body it cannot parse): no fleet package declares `@orkestrel/ollama`; the bump ruling carries them for the registry's consumers.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/ollama`, recorded in `units/land-ollama.log.txt` and `units/conform-ollama.audit.txt`, and the landing commit named in the state table.

## Terminal

AUDIT-TERMINAL
