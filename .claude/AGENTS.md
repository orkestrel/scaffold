# Claude Code bridge

`AGENTS.md` governs code. `.agents/orchestration.md` governs agent operation. This file adds Claude Code mechanics and cannot weaken either. Claude Code loads it at session start beside the root `AGENTS.md`; another harness reads it only when started inside `.claude/`.

## Dispatch

- Use the Agent tool for one unit, or when the next step depends on the result. Name the role as `subagent_type`.
- Use a Workflow for a fan-out of many small units, a staged pipeline, or a loop. Give every `agent()` node a model alias and an effort. Serialize writing nodes. Recover an interrupted run with `resumeFromRunId`.
- Never run a design or review lane as `fork`. A lane starts with a clean context.
- Use the built-in `Explore` agent for a quick locate; it loads no instruction files.
- Foreground Bash is capped at 10 minutes. Run anything longer as a background command with an internal `timeout`.
- Write a reusable or long-running program as a TypeScript file and run it with `node`; a heredoc, `node -e`, `&&` chain, or `${...}` argument trips the Windows approval classifier, and a one-shot read-only check may run inline. Probe a bench with `node .agents/skills/orkestrel-dispatch/scripts/bench.ts`, launch a lane through `scripts/launch.ts`, and read its answer with `scripts/result.ts`, all from the dispatch skill.

## Models

- Use the aliases `opus` and `sonnet`. Never `inherit`, never a fixed model ID, never `CLAUDE_CODE_SUBAGENT_MODEL`.
- An alias serves the model the installed Claude Code maps it to. After a model release, measure the mapping with `claude -p --model <alias> --output-format json` and read `modelUsage`; when a newer model answers by id and the alias lags, update Claude Code (`scoop update claude-code` on this host) and measure again. Claude Code 2.1.284 serves Sonnet 5.5 as `sonnet` and Opus 5.5 as `opus` (measured 2026-09-29).
- Run the main session on `opus` at high effort and keep the model fixed for the session; a model switch invalidates the prompt cache. An effort switch invalidates it too except on Opus 5.5 and Fable 5.1 under a Claude subscription or API key.
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
