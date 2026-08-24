# Unit R2-AUDIT — objective audit of the orkestrel-publish skill commit

## Role and engine
GPT-5.6 Sol, inside the journaled codex CLI. Perform the audit directly and spawn nothing.

## Objective
Attempt to refute the following numbered claims about commit `cd9b90a` in
`/home/user/scaffold`. Per-claim verdicts with evidence, one terminal line.

## Context
- The diff: `git -C /home/user/scaffold show cd9b90a`.
- The pre-shrink contract the procedures moved from:
  `git -C /home/user/scaffold show 68103e2:.agents/orchestration.md` (sections "The release
  wave", "Preparing", "Reaching the approval", "Spending the window").
- The post-shrink contract at HEAD: `.agents/orchestration.md` § Publishing the fleet.
- The rulings: `.orkestrel/debrief/reconciliation.md` rulings 3 and 15.
- The writer's report: `.orkestrel/debrief/r2-publish-skill-report.md` — a claim under audit,
  not evidence.
- Authoring law: `.claude/rules/documentation.md` § Workflow skills; `AGENTS.md` § Writing and
  § Instruction files; `.claude/rules/writing.md`.

## Claims
1. No law the post-shrink contract keeps is restated in the skill; where the skill meets one, it
   points.
2. Every binding step of the pre-shrink procedures survives in the skill's `SKILL.md`,
   `references/wave.md`, or `references/window.md` — no upload-mechanics law, retry boundary,
   URL-relay law, bump trigger, or preparation-order step was dropped in the move.
3. Ruling 15's self-pin sweep is present in the preparation content, stating the sweep runs
   after the install and naming the patch-back control.
4. The skill directories conform to § Workflow skills: exact file inventory, frontmatter shape,
   `agents/openai.yaml` schema and key order, bridge `name` and `description` byte-identical to
   the canonical, the canonical path named in the bridge, no bridge-owned references.
5. The added lines obey the writing law: directive form, no counts of growable sets, no
   banned-vocabulary hits in the banned sense.
6. The `tests/distribution.test.ts` insertions name exactly the staged files of the new skill,
   in the array's sort order, and nothing else in that file moved.

## Scope
Read-only. No edits, no git state changes, no writes outside the bench journal directory.

## Output
Per-claim: `CONFIRMED` with evidence, or `BROKEN` with the exact line and the smallest correct
fix. Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
