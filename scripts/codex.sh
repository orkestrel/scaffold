#!/bin/bash
# ============================================================================
# scripts/codex.sh — SessionStart hook: Codex bench readiness only
# ----------------------------------------------------------------------------
# Codex is invoked on demand by .claude/agents/codex.md. This hook performs no
# install, login, logout, model call, auth-cache read, or credential-value
# inspection. It only reports CLI and auth readiness into Claude Code's
# SessionStart context. Always exits 0.
# ============================================================================

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if ! command -v codex >/dev/null 2>&1; then
  echo "codex.sh: bench dark — Codex CLI is not installed; install it in the Claude Code Cloud environment setup."
  exit 0
fi

version="$(codex --version 2>/dev/null | head -n 1)"
worker_model="${CODEX_WORKER_MODEL:-gpt-5.6-terra}"
worker_effort="${CODEX_WORKER_EFFORT:-medium}"
thinker_model="${CODEX_THINKER_MODEL:-gpt-5.6-sol}"
thinker_effort="${CODEX_THINKER_EFFORT:-high}"

if codex login status >/dev/null 2>&1; then
  auth="cached Codex authentication ready"
else
  auth="AUTH DARK — run 'codex login --device-auth' in this live Cloud session, then retry"
fi

echo "codex.sh: bench lit — ${version}; ${auth}; worker=${worker_model}/${worker_effort}; thinker=${thinker_model}/${thinker_effort}."
exit 0
