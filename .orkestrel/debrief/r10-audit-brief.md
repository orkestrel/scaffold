# Unit R10-AUDIT — objective audit of the trigger bounding

## Role and engine
GPT-5.6 Sol, inside the journaled codex CLI. Perform the audit directly and spawn nothing.

## Objective
Attempt to refute the following numbered claims about commit `61c6528` in
`/home/user/scaffold`. Per-claim verdicts with evidence, one terminal line.

## Context
- The diff: `git -C /home/user/scaffold show 61c6528`.
- The finding: S14's trigger-overlap half in
  `.orkestrel/debrief/instr-audit-subjective.md`, routed by
  `.orkestrel/debrief/r7-naming-report.md` § "The enterprise-bootstrap ruling".
- The two skill bodies at HEAD: `.agents/skills/enterprise-bootstrap/SKILL.md` and
  `.agents/skills/orkestrel-polish-surface/SKILL.md`.
- The writer's report: `.orkestrel/debrief/r10-bounding-report.md` — a claim under audit, not
  evidence.

## Claims
1. The bounded description names this skill's trigger and its boundary with
   `orkestrel-polish-surface` on the mechanism, and the boundary contradicts neither body: the
   build-loop critique stays inside this skill's claim, and nothing the polish skill claims is
   claimed here.
2. A dispatcher holding only the two descriptions can route every subject S14 names to exactly
   one skill; no subject still matches either description ambiguously.
3. The canonical and bridge descriptions are byte-identical, the `agents/openai.yaml` file is
   untouched, and its unchanged `short_description` carries none of the overlap the finding
   names.
4. The changed lines obey the writing law and the § Workflow skills description shape.

## Scope
Read-only. No edits, no git state changes, no writes outside the bench journal directory.

## Output
Per-claim: `CONFIRMED` with evidence, or `BROKEN` with the exact line and the smallest correct
fix. Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
