# Unit R8-AUDIT — objective audit of the transport move

## Role and engine
GPT-5.6 Sol, inside the journaled codex CLI. Perform the audit directly and spawn nothing.

## Objective
Attempt to refute the following numbered claims about commits `e882305` and the move it records
in `/home/user/scaffold`. Per-claim verdicts with evidence, one terminal line.

## Context
- The diff: `git -C /home/user/scaffold show e882305`.
- The pre-move files: `git -C /home/user/scaffold show 4575c74:.claude/agents/codex.md` and
  `git -C /home/user/scaffold show 4575c74:.codex/agents/claude.toml`.
- The ruling: `.orkestrel/debrief/reconciliation.md` ruling 10 (finding S11), and
  `.orkestrel/debrief/re-baseline-3.md` for the integration patches the commit carries.
- The writer's report: `.orkestrel/debrief/r8-transports-report.md` — a claim under audit, not
  evidence.

## Claims
1. Each moved file carries the pre-move content minus only the dispatch frontmatter and the
   recorded conversions; no binding clause of either transport contract was dropped, and the
   two R4 patches are applied byte-for-byte as `r4-charters-report.md` states them.
2. No file outside `dist/`, `.orkestrel/`, `tmp/`, `node_modules/`, and `host.json` names the
   old paths, and every referrer the report lists names the new home.
3. The `HOST_PATHS` and `tests/distribution.test.ts` patches are complete and mutually
   consistent: every staged file under `.agents/transports/` and `.agents/templates/` has an
   expanded row in sort order, the old transport rows are gone, and each of the case's
   membership loops is satisfiable once `dist/host` regenerates.
4. The `.agents/orchestration.md` § Roles rewrite preserves ruling 10's content, names each
   side's bridges, and drops no law the pre-move bullets carried.
5. The added lines obey the writing law: directive form, no counts of growable sets, no
   banned-vocabulary hits in the banned sense.

## Scope
Read-only. No edits, no git state changes, no writes outside the bench journal directory.

## Output
Per-claim: `CONFIRMED` with evidence, or `BROKEN` with the exact line and the smallest correct
fix. Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
