Read-only distillate of both subjects. No edits, installs, or script runs.

================================================================================
REPO 1 — addyosmani/agent-skills
path: /tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/agentskills/agent-skills-main/
================================================================================

1. What it is

A pack of 24 production engineering workflows for AI coding agents (spec → plan → build → test → review → ship), plus 8 slash commands, 4 reviewer personas, and session hooks. Publisher is Addy Osmani (`README.md:1-18`, `.claude-plugin/plugin.json:5-10`, GitHub `addyosmani/agent-skills`). MIT (`LICENSE:1-3`, copyright 2025 Addy Osmani). No root `package.json`; version `0.6.7` lives in plugin manifests (`plugin.json:1-4`, `.claude-plugin/plugin.json:2`). Distributed as a Claude Code marketplace plugin, a Codex plugin, and via `npx skills add addyosmani/agent-skills` (`README.md:45-57`).

2. Structure map

Top-level:
- `skills/` — 24 `SKILL.md` directories (canonical skill bodies). Representative: `skills/test-driven-development/SKILL.md:1`, `skills/using-agent-skills/SKILL.md:1`.
- `agents/` — 4 persona files: `code-reviewer.md:1`, `test-engineer.md`, `security-auditor.md:1`, `web-performance-auditor.md`.
- `hooks/` — Claude lifecycle. Plugin-wired: `hooks.json:1-14` SessionStart → `session-start.sh:1`. Optional, not in that manifest: `simplify-ignore.sh:1`, `sdd-cache-pre.sh:1`, `sdd-cache-post.sh:1`.
- `commands/` — Antigravity TOML slash commands (`commands/spec.toml:1`).
- `.claude/commands/` — Claude Code markdown slash commands (`spec.md:1`, `build.md:1`). Eight stems: spec, plan, build, test, review, webperf, code-simplify, ship.
- `.gemini/commands/` — Gemini CLI TOML twins (`spec.toml:1`).
- `.opencode/skills/` — 24 copied `SKILL.md` trees for OpenCode (`docs/opencode-setup.md:1-43`).
- `.claude-plugin/` — `plugin.json:1-13` (commands + `./skills`), `marketplace.json:1-23` (schema, owner Addy Osmani).
- `.codex-plugin/plugin.json:1-29` — Codex plugin; `skills: "./skills/"`.
- `.agents/plugins/marketplace.json:1-22` — Agents marketplace; `policy.authentication: ON_INSTALL` at line 17.
- `references/` — shared checklists (`definition-of-done.md`, `security-checklist.md`, `testing-patterns.md`, …).
- `evals/` — `README.md:1`, `cases/*.json` (24 files), `fixtures/`.
- `scripts/` — validators and eval runner (`validate-skills.js:1`, `run-evals.js:1`).
- `docs/` — per-harness setup (`cursor-setup.md:1`, `codex-setup.md:1`, `skill-anatomy.md:1`).
- `.github/workflows/test-plugin-install.yml:1` — CI.
- `.claude/rules/skills-contributing.md:1` — path-scoped anti-duplication rule.
- Root: `README.md`, `LICENSE`, `CONTRIBUTING.md:1`, `CLAUDE.md:1`, `AGENTS.md:1`, `plugin.json:1`.

3. Skill anatomy

Contract in `docs/skill-anatomy.md:22-73` and `scripts/lib/skill-lint.js:28-60`. Frontmatter keys: `name`, `description` only. `name` must match directory kebab-case. `description` ≤1024 chars and must contain a “use when/before/after/during” trigger (`skill-lint.js:34-40`). Required headings (errors): `## Overview`, `## When to Use`, `## Common Rationalizations`, `## Red Flags`, `## Verification` (`skill-lint.js:45-51`). Supporting layout: optional `scripts/`, `references/`, sibling `.md` (`skill-anatomy.md:9-18`); shared checklists live at repo-root `references/` (`skill-anatomy.md:111-119`). Exemptions hardcoded, not in frontmatter: `using-agent-skills`, `idea-refine` (`skill-lint.js:57-60`).

Example A — standard (`skills/test-driven-development/SKILL.md:1-12`, later `363`, `375`, `387`):
```
---
name: test-driven-development
description: Drives development with tests. Use when implementing any logic, …
---
# Test-Driven Development
## Overview
## When to Use
… ## Common Rationalizations / ## Red Flags / ## Verification
```

Example B — exempt legacy (`skills/idea-refine/SKILL.md:1-16`, `158`, `168`):
```
---
name: idea-refine
description: Refines raw ideas … Triggers on "ideate", …
---
# Idea Refine
## How It Works
## Usage
… ## Red Flags / ## Verification
```
(Has `scripts/idea-refine.sh:1` and sibling `examples.md` / `frameworks.md`.)

4. Enforcement machinery

CI `.github/workflows/test-plugin-install.yml:8-99`:
- `node scripts/validate-skills.js` (`yml:22-23`) — walks `skills/`, runs `lintSkill` (`validate-skills.js:5-12`, `41`). Proves SKILL.md exists, frontmatter name/description, kebab dir, 1024-char cap, trigger phrase, required sections (`skill-lint.js:10-17`).
- `node scripts/validate-versions.js` (`yml:25-26`) — every listed manifest version equals `git describe --tags --abbrev=0` (`validate-versions.js:8-34`). Paths: `plugin.json`, `.codex-plugin/plugin.json`, `.claude-plugin/plugin.json`, marketplace JSONs.
- `node --test scripts/validate-versions-test.js` (`yml:28-29`).
- `node --test scripts/run-evals-test.js` then `node scripts/run-evals.js --min-rank1 80` (`yml:31-35`) — Tier 2 trigger/routing (TF-IDF rank, collision cosine, case coverage) (`run-evals.js:5-18`, `evals/README.md:14-20`). Tier 3 behavioral (`--behavioral`, headless `claude`) is opt-in, not CI (`run-evals.js:19-24`).
- `node scripts/validate-reference-links.js` (`yml:37-38`) — `references/*.md` links in SKILL.md must resolve relative to the skill dir (`validate-reference-links.js:18-22`).
- Job `validate-commands`: `validate-commands.js` (`yml:54-55`) — every slash command exists in `.claude/commands`, `.gemini/commands`, and `commands/` with identical `description` (`validate-commands.js:5-13`). `validate-artifact-paths.js` (`yml:60-61`) — spec/plan/todo paths only `SPEC.md` / `docs/SPEC.md` / `tasks/plan.md` / `tasks/todo.md` (`validate-artifact-paths.js:32-40`).
- Job `validate`: `npm install -g @anthropic-ai/claude-code` then `claude plugin validate .` (`yml:73-77`).
- Job `test-install`: marketplace add of `./`, `claude plugin install agent-skills@addy-agent-skills --scope user` (`yml:92-99`).
Hook regression `hooks/session-start-test.sh` is documented (`CONTRIBUTING.md:77-87`) but is not a step in that workflow.

5. Overlap candidates

(a) `.agents/skills/<name>/SKILL.md` family
- theirs `skills/<name>/SKILL.md` + optional `scripts/` / supporting md (`docs/skill-anatomy.md:9-18`) <-> this project `.agents/skills/<name>/SKILL.md` (`orkestrel-falsify/SKILL.md:1-4`) and Claude-side bridges `.claude/skills/<name>/SKILL.md:1-10` that only point at the canonical file.
- theirs `docs/skill-anatomy.md:22-33` name+description frontmatter <-> this project same two keys (`orkestrel-falsify/SKILL.md:1-4`).
- theirs `scripts/lib/skill-lint.js:1-17` skill-shape gate <-> this project `tests/setupPolicy.ts:51-52` `SKILL_FAMILY_ROOT = '.agents/skills'` and `inspectSkill` (`setupPolicy.ts:997-1014`) requiring exact-case `SKILL.md` plus `agents/openai.yaml`.
- theirs colocated `skills/idea-refine/scripts/idea-refine.sh:1` <-> this project skill `references/*.md` loaded from SKILL.md (`orkestrel-falsify/SKILL.md:17-18`).

(b) `.claude/agents/<role>.md` role files
- theirs `agents/code-reviewer.md:1-8` (`name`, `description`, persona body, verdict template at `59-80`) <-> this project `.claude/agents/reviewer.md` / `planner.md:1-8` (`name`, `description`, plus `tools`/`model`/`effort`/`permissionMode`).
- theirs `agents/security-auditor.md:1-8` <-> this project `.claude/agents/checker.md` / `analyst.md:1-8` (named audit roles).
- theirs `skills/using-agent-skills/SKILL.md:1-20` meta-router injected at session start (`hooks/session-start.sh:18-25`) <-> this project `.agents/orchestration.md` plus router-shaped roles (`planner.md:10-13`).

(c) policy/vendoring sweep that repairs drift across consumer targets
- theirs `scripts/validate-commands.js:5-13` (three command directories must stay in lockstep) <-> this project `HOST_PATHS` (`src/core/constants.ts:123-156`) listing vendored consumer surfaces including `.agents/skills`, `.claude/agents`, `.claude/skills`.
- theirs `scripts/validate-versions.js:8-34` (manifest copies must match the git tag) <-> this project `Materializer.repair` (`src/server/Materializer.ts:252-276`) rewriting missing/stale vendored artifacts.
- theirs `scripts/validate-artifact-paths.js:14-17` (producer/consumer path allowlist) <-> this project `tests/setupPolicy.ts:97-108` fleet policy sweep and `inspectSkillFamily` (`setupPolicy.ts:1058`).
- theirs `.opencode/skills/` duplicate trees (`docs/opencode-setup.md:27-42`) <-> this project `.claude/skills/` bridges that must stay aligned with `.agents/skills/` (`setupPolicy.ts:1433` “excludes `.claude/skills` from the skill family”).

6. Hostile / obfuscated / surprising

- Network from hooks: `hooks/sdd-cache-pre.sh:71-74` `curl -sI` against the WebFetch URL; `hooks/sdd-cache-post.sh:82` `curl -sI -L` same. Writes `.claude/sdd-cache/*.json` (`sdd-cache-post.sh:75-77`). Documented as optional, not in `hooks/hooks.json`.
- SessionStart injects the full `using-agent-skills` SKILL.md into every session (`hooks/session-start.sh:18-25`; wired `hooks.json:3-8`).
- `hooks/simplify-ignore.sh:9-10` rewrites files in place (hides annotated blocks from the model; real bytes live in `.claude/.simplify-ignore-cache`). Optional; sample wiring `hooks/SIMPLIFY-IGNORE.md:19-39`.
- Marketplace policy `"authentication": "ON_INSTALL"` (`.agents/plugins/marketplace.json:15-17`).
- CI `npm install -g @anthropic-ai/claude-code` then live plugin install (`test-plugin-install.yml:73-99`). Git HTTPS rewrite `yml:89-90`.
- No root `package.json`, so no `postinstall`. No `curl|sh` installer in-repo. `npx skills add` is README install prose (`README.md:47-48`), not a hook.
- `skills/idea-refine/scripts/idea-refine.sh:6-15` creates `docs/ideas/` and prints JSON. Harmless mkdir.

================================================================================
REPO 2 — mattpocock/skills
path: /tmp/claude-0/-home-user-scaffold/75034726-f81c-5f56-9643-b4a6748f097d/scratchpad/skills/skills-main/
================================================================================

1. What it is

Matt Pocock’s composable agent-skills set for “real engineering” (grilling, spec/tickets, TDD, review, domain modeling), published as the Claude Code plugin `mattpocock-skills` and via `npx skills@latest add mattpocock/skills` (`README.md:11-53`, `package.json:1-11`). Publisher Matt Pocock / aihero.dev (`package.json:5-8`, `.claude-plugin/plugin.json:5-10`). MIT (`LICENSE:1-3`, copyright 2026 Matt Pocock). Version `1.2.3` (`package.json:3`, `.claude-plugin/plugin.json:3`). Private npm package; only Changesets as a real dependency (`package.json:16-18`).

2. Structure map

Top-level:
- `skills/` — bucketed family (`AGENTS.md:1-8`):
  - `engineering/` — 18 promoted skills (`setup-matt-pocock-skills/SKILL.md:1`, `tdd/SKILL.md:1`, `ask-matt/SKILL.md:1`).
  - `productivity/` — 7 promoted (`grilling/SKILL.md:1`).
  - `misc/` — not promoted (`setup-pre-commit/SKILL.md:1`, `git-guardrails-claude-code/SKILL.md:1`).
  - `in-progress/` — public beta, not in plugin (`in-progress/README.md`).
  - `deprecated/` — empty (`deprecated/README.md:1-3`).
  Promoted set is the `skills` array in `.claude-plugin/plugin.json:21-47` (25 paths).
- Each skill dir: `SKILL.md` plus almost always `agents/openai.yaml` (Codex picker metadata). Colocated refs e.g. `tdd/tests.md`, `tdd/mocking.md`; `wizard/template.sh:1`.
- `docs/engineering/` and `docs/productivity/` — human pages mirroring promoted buckets (`.agents/writing-docs.md:1-5`). Published URLs `https://aihero.dev/skills-<name>`.
- `.agents/` — maintainer process: `invocation.md:1`, `install-block.md:1` (canonical install wording), `writing-docs.md:1`, `adr/0001-….md:1`, `adr/0002-ship-as-a-claude-code-plugin.md:1`.
- `.claude-plugin/plugin.json:1-48`, `marketplace.json:1-23` (fallback marketplace; official listing is Anthropic’s, `install-block.md:5-7`).
- `scripts/link-skills.sh:1` (dev symlink into `~/.claude/skills` and `~/.agents/skills`), `list-skills.sh:1`, `sync-plugin-version.mjs:1`.
- `.github/workflows/release.yml:1` — Changesets version PR on `main`.
- `.changeset/` — release notes.
- `.out-of-scope/` — refused features (`setup-skill-verify-mode.md:1`).
- Root: `README.md`, `LICENSE`, `AGENTS.md:1`, `CLAUDE.md:1` (same text as AGENTS.md in the copy read), `CONTEXT.md:1` (domain glossary), `CHANGELOG.md`, `package.json:1`.
No repo-level `agents/` personas, no `hooks/` pack, no `evals/`, no `.codex-plugin/` (deferred: `adr/0002:19-23`).

3. Skill anatomy

No anatomy linter. Shape is described in `.agents/invocation.md:3-10` and `AGENTS.md:19`. Frontmatter keys: `name`, `description`; user-invoked skills also set `disable-model-invocation: true` (`invocation.md:5`) and pair `policy.allow_implicit_invocation: false` in `agents/openai.yaml` (`invocation.md:10`). Model-invoked omit both. Sections are not standardized — each skill uses its own headings. References live inside the owning skill; cross-skill work is “Call the Skill tool with …”, not relative SKILL.md links (`invocation.md:16`).

Example A — model-invoked (`skills/engineering/tdd/SKILL.md:1-12`) plus `agents/openai.yaml:1-3`:
```
---
name: tdd
description: Test-driven development. Use when the user wants to build features …
---
# Test-Driven Development
## What a good test is
## Seams — where tests go
## Anti-patterns
## Rules of the loop
```
```
interface:
  display_name: "TDD"
  short_description: "Test-driven red-green-refactor"
```

Example B — user-invoked (`skills/engineering/setup-matt-pocock-skills/SKILL.md:1-17`) plus `agents/openai.yaml:1-5`:
```
---
name: setup-matt-pocock-skills
description: Configure this repo for the engineering skills …
disable-model-invocation: true
---
# Setup Matt Pocock's Skills
## Process
```
```
interface:
  display_name: "Setup Matt Pocock Skills"
  …
policy:
  allow_implicit_invocation: false
```

Human docs template (not SKILL.md): `What it does` / `When to reach for it` / `Common questions` / `It's working if` (`.agents/writing-docs.md:13-17`).

4. Enforcement machinery

No skill-content linter, no eval runner, no command-parity script.
- `AGENTS.md:9-11` instructs humans: promoted skills must appear in `README.md` and `.claude-plugin/plugin.json` `skills` array; run `claude plugin validate . --strict` after touching manifests. That command is not in CI.
- `package.json:11-15`: `npm run version` = changeset version + `node scripts/sync-plugin-version.mjs`; `check-plugin-version` is `--check` (exits 1 on drift) (`sync-plugin-version.mjs:1-27`). Copies `package.json` version into `.claude-plugin/plugin.json`.
- CI `.github/workflows/release.yml:10-37`: `npm ci`, `changesets/action@v1` with `version: npm run version`, `publish: npx changeset tag`, `GITHUB_TOKEN`. Proves release versioning, not skill quality.
- `scripts/link-skills.sh:8-13` is maintainer-only; not a CI gate.
- Docs/install wording is a copy-from-canonical rule (`.agents/install-block.md:1-3`), not a mechanical checker.

5. Overlap candidates

(a) `.agents/skills/<name>/SKILL.md` family
- theirs `skills/<bucket>/<name>/SKILL.md` + `agents/openai.yaml` (`AGENTS.md:1-9`, `tdd/agents/openai.yaml:1-3`) <-> this project `.agents/skills/<name>/SKILL.md` (`orkestrel-falsify/SKILL.md:1`) and the policy requirement of `agents/openai.yaml` (`tests/setupPolicy.ts:998-1014`).
- theirs `disable-model-invocation` + `policy.allow_implicit_invocation` (`.agents/invocation.md:5-10`) <-> this project role `permissionMode` / tool allowlists (`.claude/agents/planner.md:4-8`, `analyst.md:4-8`).
- theirs colocated refs (`tdd/SKILL.md:16` → `tests.md`, `mocking.md`) <-> this project `references/` beside SKILL.md (`orkestrel-falsify/SKILL.md:17-18`).
- theirs `scripts/link-skills.sh:16` dest `$HOME/.agents/skills` <-> this project canonical family root `.agents/skills` (`setupPolicy.ts:51-52`).

(b) `.claude/agents/<role>.md` role files
- theirs has no repo-level persona directory. Closest: per-skill `agents/openai.yaml` Codex UI metadata (`invocation.md:10`) <-> this project `.claude/agents/<role>.md` frontmatter `name`/`description`/`model`.
- theirs `skills/engineering/ask-matt/SKILL.md:1-11` (user-invoked router over the whole set, `AGENTS.md:21`) <-> this project orchestration/router roles (`.claude/agents/planner.md:10-13`, `.agents/orchestration.md`).
- theirs `skills/engineering/code-review/SKILL.md` (invoked from `implement/SKILL.md:13`) <-> this project `.claude/agents/reviewer.md` / `checker.md`.

(c) policy/vendoring sweep that repairs drift across consumer targets
- theirs `scripts/link-skills.sh:21-55` (find every SKILL.md, `ln -sfn` into `~/.claude/skills` and `~/.agents/skills`; `rm -rf` a non-symlink occupant at `49-50`) <-> this project `HOST_PATHS` (`.agents/skills`, `.claude/skills`, `.claude/agents` at `src/core/constants.ts:128-131`) plus `Materializer.repair` (`src/server/Materializer.ts:252-276`).
- theirs `scripts/sync-plugin-version.mjs:1-4` (keep plugin.json version = package.json) <-> this project repair of drifted vendored bytes.
- theirs `.agents/install-block.md:1-3` (“change here first, then propagate” into README/docs) <-> this project policy sweep proving family/layout invariants (`tests/setupPolicy.ts:97-101`, `inspectSkillFamily` at `1058`).
- theirs `AGENTS.md:9` (promoted skills must stay listed in plugin.json + README) <-> this project `inspectSkill` requiring SKILL.md + openai.yaml per discovered directory (`setupPolicy.ts:997-1014`).
- theirs `AGENTS.md:17` (promoted skill add/rename must re-sync `docs/<bucket>/<name>.md`) <-> this project guide/parity obligation (architecture/documentation rules; `HOST_PATHS` includes `guides/guide.md` at `constants.ts:154`).

6. Hostile / obfuscated / surprising

- `skills/engineering/wizard/template.sh:26-28` defaults `ENV_FILE=.env`; `write_env` upserts that file (`128-138`); `ask_secret` hidden input (`113`); `set_secret` pipes value to `gh secret set` (`141-148`). Example stages write `STRIPE_SECRET_KEY` to `.env` and GitHub (`198-201`). Skill tells the agent to copy this template (`wizard/SKILL.md:10`, `34-35`).
- `scripts/link-skills.sh:49-53`: if `$HOME/.claude/skills/<name>` exists and is not a symlink, `rm -rf` then `ln -sfn` into this clone. Same for `~/.agents/skills`. Header says maintainer-only (`link-skills.sh:4-6`).
- CI `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}` (`release.yml:36-37`) for Changesets PRs — standard Actions, not a skill hook.
- Documented consumer install `npx skills@latest add mattpocock/skills` (`README.md:51-52`, `install-block.md:32`) — not an in-repo postinstall. `package.json` has no `postinstall`.
- `skills/misc/git-guardrails-claude-code/SKILL.md:28-35` copies a hook script and `chmod +x` into `.claude/hooks/` or `~/.claude/hooks/`.
- `skills/misc/setup-pre-commit/SKILL.md:21-32` tells the agent to `npx husky init` in the consumer repo.
- No `curl|sh` in repo scripts. No obfuscation found.
