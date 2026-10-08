# Claude Code bridge

`AGENTS.md` governs code. `.agents/orchestration.md` governs agent operation. This file adds Claude Code mechanics and cannot weaken either. Claude Code loads it at session start beside the root `AGENTS.md`; another harness reads it only when started inside `.claude/`.

## Dispatch

- Use the Agent tool for one unit, or when the next step depends on the result. Name a role from `.claude/agents/` as `subagent_type`; never `general-purpose`, `Plan`, `claude`, or `fork`.
- Use a Workflow for a fan-out of many small units, a staged pipeline, or a loop. Give every `agent()` node a model alias from § Models and an effort. Serialize writing nodes. Recover an interrupted run with `resumeFromRunId`.
- Never dispatch `fork`; it runs on the session's model and context. Every unit starts with a clean context on its role's model.
- Use the built-in `Explore` agent with `model: haiku` for a quick locate; it loads no instruction files.
- Foreground Bash is capped at 10 minutes. Run anything longer as a background command with an internal `timeout`.
- Write a reusable or long-running program as a TypeScript file and run it with `node`; a heredoc, `node -e`, `&&` chain, or `${...}` argument trips the Windows approval classifier, and a one-shot read-only check may run inline. Probe a bench with `node .agents/skills/orkestrel-dispatch/scripts/bench.ts`, launch a lane through `scripts/launch.ts`, and read its answer with `scripts/result.ts`, all from the dispatch skill.

## Models

- Use the aliases `haiku`, `sonnet`, and `opus` in role frontmatter, a Workflow node, and a per-invocation `model`. Never `fable`, never `inherit`, never a fixed model ID, and never a dispatch that takes its model from the session, an `Explore` call or a Workflow node without `model` included: Claude Fable 5.1 orchestrates and is never a subagent.
- Keep `CLAUDE_CODE_SUBAGENT_MODEL` at `sonnet` in the `env` object of `.claude/settings.json`. It serves a subagent that no role frontmatter and no dispatch assigned a model; frontmatter and a per-invocation `model` outrank it (measured 2026-10-08 on Claude Code 2.1.294: `general-purpose` took it, `Plan` did not). Never set `CLAUDE_CODE_SUBAGENT_MODEL_FORCE`; it overrides every role.
- An alias serves the model the installed Claude Code maps it to. After a model release, measure the mapping with `claude -p "Reply with the single word OK." --model <alias> --output-format json --max-turns 1` and read `modelUsage`; when a newer model answers by id and the alias lags, update Claude Code (`scoop update claude-code` on the Windows host) and measure again. Claude Code 2.1.294 serves Haiku 5.5 as `haiku`, Sonnet 5.5 as `sonnet`, and Opus 5.5 as `opus` (measured 2026-10-08). When a measurement moves an alias, update, in the same change, the version each `.claude/agents/` charter names in its description and opening line and the rows of `.agents/orchestration.md` § Engines.
- Run the main session on `fable` or `opus` at high effort and keep the model fixed for the session; a model switch invalidates the prompt cache. An effort switch invalidates it too except on Opus 5.5 and Fable 5.1 under a Claude subscription or API key.
- Reach Astra through `analyst` and `astra`, Grok through `grok`. Role frontmatter carries Claude models only.

## Context and cache

- Roles that launch a CLI, run gates, or only read set `omitClaudeMd: true`; their charters carry the permission floor they need. Writers and reviewers load the contract.
- Adding or removing an MCP server invalidates the cache when its tools load into the prefix; deferred tools (the default) append without disturbing it. Avoid either mid-session.
- An edit to a loaded instruction file takes effect after `/clear`, `/compact`, or a restart. Edits under `.claude/agents/` and `.claude/skills/` hot-reload.
- Keep large reads in subagents. The main context holds decisions.

## Wiring

- `.mcp.json` registers `probe` from `node_modules/@orkestrel/probe/dist/bin/main.js`. Run `npm ci --ignore-scripts` before the first `prove` call in a fresh checkout.
- `.claude/settings.json` hooks: `SessionStart` runs the Cloud setup hooks under `scripts/` and the dispatch skill's `sweep.ts --report`; `Stop` runs `git diff --check`. `scripts/` holds Cloud setup hooks and nothing else.
- `claude mcp serve` exposes this harness to a Codex- or Cursor-primary session.
- `.claude/skills/<name>/SKILL.md` loads `.agents/skills/<name>/SKILL.md` and adds nothing.

## Cloud

- Setup installs `@openai/codex` and never authenticates. Start each live session with `codex login --device-auth`.
- `scripts/deps.sh` reinstalls when the lockfile digest differs from `node_modules/.orkestrel-lock.sha256`. Write the marker only after `npm ci` succeeds for that lockfile, in the same turn.
- `scripts/browsers.sh` installs the Chromium builds `node_modules/playwright-core/browsers.json` pins into `PLAYWRIGHT_BROWSERS_PATH` when the store lacks them, and only when `CLAUDE_CODE_REMOTE` is `true`; a remote container pre-installs one build, and a lockfile that pins another makes every browser launch fail until this hook runs.
