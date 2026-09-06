# Verdict — U6 scaffold-seeds, audit round 1

Lanes that ran, each in a clean context on `u6-audit-brief.md` through Workflow `wf_9f096249-676`: subjective (`reviewer`, Opus 5), objective (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), and `checker` (Sonnet). The `verifier` ran the scaffold chain over the installed tree (`u6-verify-report.md`): format, lint, the planted lint control (red with the restriction's message, no residue), `check`, `build`, and `test:distribution` green; `npm test` red on five browser-resolver cases that the resume hook's concurrent `npm ci` caused (`orchestrator-measurements.md` § The resume hook's `npm ci`), the Orchestrator's own chain green project by project afterwards (`u6-npm-test-solo.log.txt`, `u6-npm-test-rest.log.txt`). Lane captures: `u6-audit-{subjective,objective,checker}.md`.

## Per-claim reconciliation

- 1, 3, 7, 8: PASS on every lane.
- 2: PASS on the restriction (every lane: the seven blocks, the pattern, the message, nothing else moved); FAIL on the report conjunct on every lane, upheld on the record: the report names the stale-inventory consequence and not the bump the two vendored bytes (`.oxlintrc.json`, `guides/scaffold.md`) oblige. The obligation is already the plan's (`plan.md` § Re-baseline: scaffold bumps and publishes on its own account, every target re-pins and runs `repair`); this verdict is where the report's omission is corrected, and no report is rewritten after its return.
- 4: FAIL (subjective, objective; the checker passed the substitution's completeness). Upheld: `PROPOSAL.md:251` and `:354-355` state that no in-process compiler API is available on either major, which the installed 6.0.3 declarations refute; the true constraint is the fleet's ruling (the compiler reached as the `tsc` command, the specifier refused by the vendored lint configuration, the 7 move the reason). `:728-729` keeps "exactly" of a parser whose own risk row treats it as a fallback. Carried to U6-fix edits 1 to 3.
- 5: FAIL (subjective, objective; the checker passed the rows' presence). Upheld: `ROADMAP.md:38-39` states the fleet-wide invariant as landed while the row names the visits that remain; `:73` asserts a fleet-wide negative census the measurement did not take; `:57` carries an undated "today". Carried to edits 4 to 6.
- 6: FAIL on every lane on the sizing conjunct. Ruled by measurement: the Orchestrator's contended reading (`orchestrator-measurements.md` § The `config` project under contention) shows the roll-up at 2.6 s beside a concurrent suite and the linter pair as the binding case, so 60,000 ms stands on a measured margin; the rationale names the extractor spawn beside the compiler's in edit 7.

## Findings outside the claims

Carried to U6-fix:

- Both reviewer lanes: the restriction reaches `src/**` and `app/**` alone, while the fleet's surviving importers live under `tests/**` (the vendored sweep and the generated proof, both of which `repair` replaces, and the `database` and `lsp` setup modules U10 and U11 remove). Ruled: the guard extends to `tests/**`, `configs/**`, `scripts/**`, and the root configuration files with the same pattern (edit 8), because the exit criterion's second bullet needs `lint:check` to refuse the specifier where it could return, and scaffold's own tree carries no such importer (the verifier's grep). Its control is the fix verifier's plant in a `tests/` file.
- Objective: `DECLARATION_DEV_DEPENDENCIES` is planned for a `bin` blueprint while the seeded `bin` config rolls no declarations, and U6's prose asserts the executable case. Ruled: the prose stops claiming the executable case (edit 9); the planning question is a ROADMAP row (edit 10), because changing the planner moves generated manifests and their pins, which is a successor unit.
- Subjective F2: the `@remarks` sentence in `src/core/constants.ts` misparses ("as a command" attaches to the emission). Recast per the lane's sentence (edit 11).
- Objective: `ROADMAP.md:57` "today" (edit 5).

Ruled, no carrier needed:

- Objective NOT-EVIDENCED on type-only imports: the unit's own control planted `import type { Node } from 'typescript'` (`instruments/u6/ts6-u6-lint-control-2.sh:18`) and the log reports it (`u6-lint-control.log.txt:3`), so the type-only form is refused; the lane misread the plant as a value import.
- Objective: the report states counts ("Four scaffold rows", "three expectations"); recorded against the report, which stays as returned.
- Subjective referral on the `@packageDocumentation` probe's fidelity: the probe drove the same chain with the plugin's override set and never called `declarationRollup`; edit 6 states the row on exactly that.

## Gate reading

Every scaffold gate is green over U6's tree (the verifier's chain, then the Orchestrator's `npm test` after the hook's reinstall settled and `build:inventory` refreshed the inventory). The fix round closes with a checker on its slice and a verifier over `format:check`, `lint:check` with a `tests/` plant, `check`, `build`, `test:src:core`, `test:policy`, `test:config`, and `test:guides`.

VERDICT: PASS on claims 1, 3, 7, and 8; FAIL 2 on the report alone, 4, 5, and 6 carried to U6-fix; the fix-round closure decides acceptance

## Closure over U6-fix

The fix adopted the round's prescriptions and the verdict's rulings verbatim, so it closed with a checker on its slice and a verifier over the gates that read the changed files (`.claude/rules/quality.md` § Rounds and verdicts). Checker (`u6-fix-checker.md`): VERDICT: PASS on every claim. Verifier (`u6-fix-verify-report.md`): `format:check`, `lint:check`, the planted type-only import under `tests/setup.ts` reddening `lint:check` with the restriction's message and leaving no residue, `check`, `build` (the inventory regenerated for the vendored bytes that moved again), `test:src:core` 385, `test:policy` 77, `test:config` 111, `test:guides` 17; GATES: GREEN. With the U6 verifier's chain and the Orchestrator's own test run (`u6-npm-test-solo.log.txt`, `u6-npm-test-rest.log.txt`), every scaffold gate is green over the tree that lands.

VERDICT: PASS — U6 accepted after U6-fix
