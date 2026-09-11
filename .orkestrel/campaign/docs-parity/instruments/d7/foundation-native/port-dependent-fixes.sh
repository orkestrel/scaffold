#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
for unit in d7n-mcp-converge-fix-windows d7n-program-converge-fix d7n-workflow-converge-fix; do
  bash "$SCR/port-brief.sh" "$unit"
done
