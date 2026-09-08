#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
for unit in d7n-probe-tests d7n-probe-close d7n-agent-converge-fix d7n-agent-close d7n-ollama-converge-fix d7n-ollama-close d7n-workflow-converge-fix d7n-program-converge-fix d7n-brief-close-3-check d7n-brief-verify d7n-lsp-check d7n-lsp-verify d7n-toolbox-verify d7n-database-close-2-check d7n-terminal-audit d7n-mcp-audit; do
  bash "$SCR/port-brief.sh" "$unit"
done
