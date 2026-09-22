#!/bin/bash
# Throwaway probe: can a command under the Codex Linux sandbox (workspace-write, as an Astra writer runs) launch
# Playwright Chromium for veneer's browser project? Model-free: `codex sandbox` runs the command under the sandbox
# without a model call. Log beside this script. Cap: 300 s per command.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/codex-sandbox-probe.log.txt
: > "$LOG"
cd /home/user/veneer || exit 1
NPMBIN="$SCR/npm11/node_modules/.bin"
echo "=== core project under codex sandbox ($(date -u +%H:%M:%S))" >> "$LOG"
timeout 300 codex sandbox -c 'sandbox_mode="workspace-write"' -- bash -c "export PATH=$NPMBIN:\$PATH; npm run test:src:core" >> "$LOG" 2>&1
echo "=== core exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
echo "=== browser project (helpers file) under codex sandbox ($(date -u +%H:%M:%S))" >> "$LOG"
timeout 300 codex sandbox -c 'sandbox_mode="workspace-write"' -- bash -c "export PATH=$NPMBIN:\$PATH; npm run test:src:browser -- tests/src/browser/helpers.test.ts" >> "$LOG" 2>&1
echo "=== browser exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
echo "=== probe done" >> "$LOG"
