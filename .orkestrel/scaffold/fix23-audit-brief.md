# Audit of scaffold fix units 2 and 3

## Role and engine

GPT-5.6 Sol `analyst`, read-only sandbox, at `/home/user/scaffold`. Claude Opus 5 wrote fix unit 2
and the native builder wrote fix unit 3, so this audit is the cross-engine lane for both.

## Objective

Per-claim verdicts on the combined range at commit 183e8c7 (the diff is at `tmp/fix23-diff.patch`;
the unit reports at `tmp/fix2-report.md` and `tmp/fix3-report.md`; the briefs beside them; the fix
unit 1 audit rulings at `tmp/fix1-audit-verdict.md`).

## Context

Read first: AGENTS.md, .claude/rules/names.md, .claude/rules/typescript.md,
.claude/rules/writing.md, .claude/rules/tests.md, .claude/rules/architecture.md, and the guide
sections the diff touches. You may run read-only commands and scoped vitest runs; the host carries
concurrent load, so a timing reading is an observation. Never run a git state-mutating command.

## The claims

1. The `establish` rename is complete: no `.directory(` call or declaration residue anywhere, the
   guide table row matches, and the TSDoc verb agrees with the name.
2. The substitution sweep is truthfully scoped and correctly ruled, including terms a
   word-boundary pattern cannot match: sweep `should`, `currently`, `simply`, `just`, `easy`,
   `via`, `newer`, temporal `once`, `now`, `today`, `e\.g\.`, and `i\.e\.` (the period-terminated
   patterns without a trailing boundary) over src/, guides/, README.md, ROADMAP.md, and the
   shipped `--help` text, and rule every hit by sense. The templates' emitted prose and this
   repository's materialized copy moved together.
3. The SR7 sentences the fix unit 2 writer authored are true of the code: `--help` replaces the
   run and exits 0 before the line is read as a command, from CLI source; the prose refusal on a
   line that never became a command holds even with `--json`; the `resolveContainedPath` example
   tests the suffix and the stated concurrency boundary matches the implementation.
4. The `remove` TSDoc landed by fix unit 3 states the mechanism exactly: the plan decides
   foreignness, the preview must agree with the re-derivation, the summary matches the guide's
   sentence, and the widening sentence describes what `#reconfirmCandidates` actually does —
   including over untracked and protected foreign findings the deletion skips.
5. The fix unit 1 audit's carried referral: can a plan the compiler emits produce a foreign
   finding on a protected path, so the `matchesProtectedPath` skip in `remove` is reachable
   through real input? Read the derivation roots and the compiler. If no real plan reaches it,
   rule whether the guard is lawful invariant defense needing a comment, or the reworked fixture
   at tests/src/server/Materializer.test.ts must change; if a real plan reaches it, name the
   input shape.
6. The register entry and the rule sentence landed exactly and nowhere else:
   `'src/server/execution'` in `FUNCTION_DOMAIN_FOLDERS`, and the `.orkestrel/campaign/` sentence
   once under § Where campaign artifacts live.
7. The unit reports are honest, including fix unit 2's absorbed deviation (the SR7 sentences are
   its own, flagged as needing ruling) and its scoped-run readings.

## Execution

Perform this assignment directly. Spawn nothing. Edit nothing. State no count in prose you write;
never name a list item by its position.

## Output

The orkestrel-falsify verdict shape: numbered verdicts in claim order with file:line evidence,
findings outside the claims at the BROKEN standard only, one terminal VERDICT line.
