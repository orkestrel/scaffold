# Design-round brief: what to adopt from agent-skills and mattpocock/skills

One brief, two blind lanes: `planner` (Opus 5, subjective, native) and `analyst` (GPT-5.6 Sol,
objective, journaled CLI, read-only). Neither sees the other's answer.

## Objective

Rule on the Orchestrator's draft matrix below: which learnings from two vendored skill
repositories this project should adopt, which it must reject. Standing constraint from the user:
adopt only what enforces conventions this repository ALREADY states; where genuinely undecided,
rule by the spirit of those conventions. The deliverable is a recommendation plus (if adopted) a
small implementation; your lane's output is input to that ruling.

## Context — read before ruling

- Evidence: the absorption distillate at `tmp/cursor/skills-audit-absorb.log` (213 lines,
  file:line pointers into both subjects and into this repository). Treat its pointers as claims to
  spot-check, not as verified fact — it is a bench distillate.
- Subjects (read-only, outside the repo):
  `/tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/agentskills/agent-skills-main/`
  and `/tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/skills/skills-main/`.
- Our canon: `AGENTS.md`; `.claude/rules/documentation.md` § Workflow skills (the skill contract);
  `.claude/rules/quality.md`; `tests/setupPolicy.ts` (`readSkillFamily`, `inspectSkill`,
  `inspectSkillFamily`, `parseSkillPrompt`, `matchesSkillToken`, `extractSkillReferences`) — read
  these first-hand; they are what "already enforced" means.
- Our skill family: `.agents/skills/*/SKILL.md` + `agents/openai.yaml` (exactly
  `display_name`/`short_description`/`default_prompt`), `.claude/skills/*` bridges.
- Environment: linux; network denied to the objective lane; no step needs it.

## Draft matrix — attack it

ADOPT candidates (each must be shown to enforce an EXISTING stated convention):

- K1. Extend `inspectSkill` with description checks: frontmatter `description` exists, is
  non-empty, and is trigger-focused. documentation.md already states "Frontmatter contains only
  `name` and a trigger-focused `description`" — today the sweep checks neither key. Their
  `skill-lint.js` proves the mechanical form (trigger-phrase requirement, length cap). Open
  sub-questions: is a trigger-token check (e.g. a "Use …" family match) an honest mechanical proxy
  for "trigger-focused", or a vacuous one? Would every existing `.agents/skills` member pass it
  today (enumerate them)? Is a length cap backed by any stated convention, or policy import?
- K2. Nothing else clears the constraint. Confirm or break this: name any structure in either
  repo that mechanically enforces a convention our canon states and our instruments miss.

REJECT (each with the rejection ground to confirm or break):

- K3. Their required-section sets (Overview/When to Use/Common Rationalizations/Red Flags/
  Verification) — our canon deliberately fixes no section list for SKILL.md; importing one is
  policy, not enforcement.
- K4. Routing evals (TF-IDF rank-1, collision cosine, CI-gated) — no stated convention requires
  routing evals; new capability without canon backing.
- K5. `disable-model-invocation` frontmatter + `policy.allow_implicit_invocation` in openai.yaml —
  our canon fixes openai.yaml to exactly three keys; widening the fleet contract needs a canon
  change first.
- K6. `.out-of-scope/` folders, ADR directories, human-docs mirrors, version-parity and
  command-parity validators, session-start skill injection, symlink installers — each either
  duplicates an existing mechanism of ours (capability matrix rows, commit messages as decision
  homes, HOST_PATHS/repair, CLAUDE.md includes) or has no subject here.
- K7. Skill CONTENT imports (their TDD/review/spec workflow bodies) — documentation.md: skills
  prescribe process and do not copy laws; their content is a foreign voice over laws AGENTS.md
  already states.
- K8. Their hostile-surface patterns (secret-writing wizard template, rm -rf symlink installer,
  network-calling hooks) — nothing to adopt; confirm nothing analogous is being proposed.

## Unknowns

- Whether every current `.agents/skills` member's description would pass a mechanical trigger
  check — settle by reading them (they are few); list any that would fail.
- Anything in either repo the distillate missed that clears the constraint — say none if none.

## Scope and execution

Read-only, report-only, perform directly, spawn nothing. The objective lane may run read-only
commands; it must not write files.

## Output

- Subjective lane: Design / Alternatives / Units / Tensions / Risks over K1–K8, arguing fit,
  vocabulary, and what adoption does to the skill family's feel.
- Objective lane: one verdict per K1–K8 — CONFIRMED or BROKEN with evidence (file:line or
  executed read-only checks); attempt refutation first; drop what you cannot substantiate and say
  so. For K1, enumerate the current skill descriptions and state pass/fail under a concrete
  trigger-check you specify.
