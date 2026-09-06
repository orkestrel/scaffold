# Audit brief — U2 policy-plugin

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: design fit, API feel, vocabulary, guide voice), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: correctness, constraints, what the code and the rules permit), and `checker` (Sonnet: mechanical conformance, scope honesty, the acceptance criteria as stated). Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Unit U2 moved the syntax-shaped policy rules out of the vendored sweep `tests/setupPolicy.ts` into the oxlint plugin `configs/policy.ts`, homed the registers there, added `RuleTester` pairs in `tests/config.test.ts`, and set the populations in `.oxlintrc.json`. The unit's brief is `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-policy-plugin-brief.md`; its report is `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-policy-plugin-report.md`. The unit also returned a shared-file patch for `.claude/rules/architecture.md`, which the Orchestrator applied serially as the integration edit; that file is part of the diff. The governing files: `/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md` § Policy instruments and § Configuration authority, `.claude/rules/architecture.md`, `.claude/rules/names.md`; the measurement the design rests on: `.orkestrel/campaign/ts6-api/m8m13-report.md`.

## Review evidence

The actual diff and status are at `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-policy-plugin.diff.txt` and `/home/user/scaffold/.orkestrel/campaign/ts6-api/u2-policy-plugin.status.txt` (captured by the Orchestrator from `git diff` and `git status --short` after the unit exited and the shared-file patch was applied). `host.json` is stale until `npm run build` regenerates it; the unit could not run that and the verifier does; do not count it against the unit. Read the diff in full. Read the changed files at their new state where the diff is not enough.

## Claims to falsify (verdict per claim: PASS, FAIL with the evidence, or CANNOT RULE with what is missing)

1. `tests/setupPolicy.ts` and `configs/policy.ts` name no compiler specifier, value or type, and `configs/policy.ts` declares no import.
2. Every rule whose reading needed the syntax tree moved to the plugin; no rule that stayed in the sweep still reads a syntax tree through any means (a regular expression standing in for a parser is a FAIL under `.claude/rules/quality.md` § Instruments).
3. Every register a moved rule reads exists in exactly one file, `configs/policy.ts`, and the sweep imports it from there; no copy drifted.
4. Every moved rule carries a `RuleTester` invalid case named for its membership boundary and a valid case drawn from outside that boundary, and deleting the rule's `report` call would redden exactly that case (rule from the code, not from the report).
5. Every moved rule keys on the file path's suffix, never an absolute prefix, so it reports identically under the CLI (absolute `filename`) and under `RuleTester` (its own base folder).
6. `PolicyContext` names only the members a rule reads, with readonly properties, in the file's existing style; no `any`, no assertion, no suppression, no nested function beyond the permitted shapes.
7. The `.oxlintrc.json` populations match the sweep's globs: placement rules over `src/**` and `app/**`, line-ending rules over `src/**`, `app/**`, and `configs/**`; ambient declaration files stay outside; no `typescript` restricted-import row was added in this unit.
8. No `POLICY_CONTROLS` row is left that nothing runs, and no test was skipped, disabled, or quarantined.
9. The unit's report claims match the diff: every file it names as changed is in the status, and no file outside the owned set changed.
10. Names follow `.claude/rules/names.md`: single-word entity members, `{verb}{Noun}` helpers, no `kind`/`type` discriminants introduced.
11. The unit's own flagged claims hold or are refuted on the code: `fileToPolicyStem` stripping the last extension reports a `.tsx`, `.mts`, or `.cts` file named for a registered domain where the sweep did not, and that is stricter rather than wrong; `isPolicyDomain` matching a registered folder as a path suffix cannot report a false positive inside a population anchored at the workspace root; the placement rules' `parent` walk is exercised by the invalid cases so a dropped `parent` reddens them.
12. `tests/setupPolicy.ts` importing nothing from `configs/policy.ts` is correct: no sweep rule reads a register after the move, so the brief's shared-register sentence has no remaining subject; rule whether any sweep function still needs one.
13. The applied `.claude/rules/architecture.md` patch states what the code does: each sentence that attributes a proof to the plugin or to the sweep matches where that rule now lives, and no sentence in that section still describes a deleted sweep reader.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
