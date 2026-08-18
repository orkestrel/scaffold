# Absorption brief: two skills repositories (campaign 2, terrain scan)

Role `grok`, engine Cursor Grok (bridge). Read-only distillation; no judgments, no adoption
recommendations — evidence with pointers only.

## Objective

Distill the terrain of two unzipped repositories so a later design round can rule on what (if
anything) this project should adopt. The standing constraint for that later round: adopt only what
enforces conventions this repository already states in AGENTS.md and .claude/rules/.

## Subjects (read-only, outside the repo)

- /tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/agentskills/agent-skills-main/
- /tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/skills/skills-main/

## Return, per repository

1. What it is: one paragraph — purpose, publisher if identifiable, license.
2. Structure map: every top-level directory and what it holds, with representative file:line
   pointers (skills, agents, hooks, commands, evals, plugin manifests, multi-harness bridges,
   scripts, CI).
3. Skill anatomy: the exact SKILL.md shape used (frontmatter keys, sections, references layout),
   with two representative examples quoted at file:line.
4. Enforcement machinery: anything that mechanically validates skills/agents/hooks (linters,
   schema checks, eval runners, CI gates) — what runs, what it proves, file:line.
5. Overlap candidates: structures that parallel this repository's .agents/skills family,
   .claude/agents roles, policy sweep, or vendoring model — pointer pairs (theirs ↔ ours), no
   verdicts.
6. Anything hostile, obfuscated, or surprising (install scripts, network calls, credential
   touches) — name it exactly.

## Scope

Read-only. No edits, no installs, no execution of the subjects' scripts. Distillate smaller than
the context consumed; never raw dumps.
