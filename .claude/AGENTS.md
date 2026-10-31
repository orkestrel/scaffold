# Claude Code bridge

`AGENTS.md` governs code. `.agents/orchestration.md` governs agent operation. This file adds Claude Code mechanics and cannot weaken either. Claude Code loads it at session start beside the root `AGENTS.md`; another harness reads it only when started inside `.claude/`.

## Dispatch

- `.agents/skills/orkestrel-parallel/references/claude-code.md` owns starting, continuing, tracking, and backgrounding lanes in Claude Code, and its quirks. Choose continuation or a fresh context per `.agents/orchestration.md` § Sessions and consultation.
- Serialize writing Workflow nodes, and give every `agent()` node a model alias from § Models and an effort.
- Probe a bench with `node .agents/skills/orkestrel-dispatch/scripts/bench.ts`, launch a lane through `scripts/launch.ts`, and read its answer with `scripts/result.ts`, all from the dispatch skill. `.agents/platforms/<platform>.md` owns the host shell's quirks.

## Models

- Use the aliases `haiku`, `sonnet`, and `opus` in role frontmatter, a Workflow node, and a per-invocation `model`. Never `fable`, except the consultant dispatch `.agents/orchestration.md` § Engines admits, which passes `model: fable` per invocation; never `inherit`, never a fixed model ID, and never a dispatch that takes its model from the session, including an `Explore` call or a Workflow node without `model`; `.agents/orchestration.md` § Engines owns where Claude Fable 5.1 may run.
- Keep `CLAUDE_CODE_SUBAGENT_MODEL` at `sonnet` in the `env` object of `.claude/settings.json`. It serves a subagent that no role frontmatter and no dispatch assigned a model; frontmatter and a per-invocation `model` outrank it (measured 2026-10-08 on Claude Code 2.1.294: `general-purpose` took it, `Plan` did not). Never set `CLAUDE_CODE_SUBAGENT_MODEL_FORCE`; it overrides every role.
- An alias serves the model the installed Claude Code maps it to. After a model release, measure the mapping with `claude -p "Reply with the single word OK." --model <alias> --output-format json --max-turns 1` and read `modelUsage`; when a newer model answers by id and the alias lags, update Claude Code through the host's package manager and measure again. Claude Code 2.1.294 serves Haiku 5.5 as `haiku`, Sonnet 5.5 as `sonnet`, and Opus 5.5 as `opus` (measured 2026-10-08). When a measurement moves an alias, update, in the same change, the version each `.claude/agents/` charter names in its description and opening line and the rows of `.agents/orchestration.md` § Engines.
- Run the main session on `fable` or `opus` at high effort. Apply `.agents/orchestration.md` § Cache; check Claude Code's documented behavior for the installed version, model, and provider before changing model options.
- Reach Astra through `analyst` and `astra`, Grok through `grok`. Role frontmatter carries Claude models only.

## Context and cache

- A role that edits source, designs, or rules on conformance or drift loads the contract. A driver, a gate runner, and a bulk or lookup reader set `omitClaudeMd: true`, and their charters carry the permission floor they need.
- Check whether MCP definitions load into the prefix or through deferred tool search before attributing a cache change to a server change.
- Reload loaded project instructions through `/clear`, `/compact`, or a restart when required by the installed version. Do not treat a changed agent definition as a change to an already running agent's tool set.
- Route supporting reads per `.agents/orchestration.md` § Routing. The main context holds decisions.

## Wiring

- `.mcp.json` registers `probe` from `node_modules/@orkestrel/probe/dist/bin/main.js`. Run `npm ci --ignore-scripts` before the first `prove` call in a fresh checkout.
- `.claude/settings.json` hooks: `SessionStart` runs the Cloud setup hooks under `scripts/` and the dispatch skill's `sweep.ts --report`; `Stop` runs `git diff --check`. `scripts/` holds Cloud setup hooks and nothing else.
- `claude mcp serve` exposes this harness to a Codex- or Cursor-primary session.
- `.claude/skills/<name>/SKILL.md` loads `.agents/skills/<name>/SKILL.md` and adds nothing.

## Cloud

- Setup installs `@openai/codex` and never authenticates. Start each live session with `codex login --device-auth`.
- When `npm ci` in a remote session refuses `EBADDEVENGINES`, run `scripts/npm.sh` and rerun the install.
- `scripts/deps.sh` reinstalls when the lockfile digest differs from `node_modules/.orkestrel-lock.sha256`. Write the marker only after `npm ci` succeeds for that lockfile, in the same turn.
- When a browser launch in a remote session reports `Executable doesn't exist`, run `scripts/browsers.sh` and rerun the test before treating the failure as a defect.
