#!/bin/bash
# Successor of codex-sandbox-probe.sh: the same browser-project command under the Codex sandbox with
# `sandbox_workspace_write.network_access=true`, to learn whether the loopback listener vitest's browser
# mode needs is reachable when the exec keeps the host network namespace. Log beside this script. Cap 300 s.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/codex-sandbox-probe-2.log.txt
: > "$LOG"
cd /home/user/veneer || exit 1
NPMBIN="$SCR/npm11/node_modules/.bin"
echo "=== browser project (helpers file), network_access=true ($(date -u +%H:%M:%S))" >> "$LOG"
timeout 300 codex sandbox -c 'sandbox_mode="workspace-write"' -c 'sandbox_workspace_write.network_access=true' -- bash -c "export PATH=$NPMBIN:\$PATH; npm run test:src:browser -- tests/src/browser/helpers.test.ts" >> "$LOG" 2>&1
echo "=== browser exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
echo "=== probe done" >> "$LOG"
