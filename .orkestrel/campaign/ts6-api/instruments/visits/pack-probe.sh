#!/usr/bin/env bash
# Pack probe's landed tree into the Orchestrator's scratchpad as the database checkout's head start (scanDiagnostics), and record what was packed.
set -eu
SP=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
cd /home/user/fleet/probe
LOG="$SP/pack/pack-probe.log.txt"; mkdir -p "$SP/pack"
{
  echo "# pack-probe — $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "\$ git log --oneline -1"; git log --oneline -1
  echo "\$ git status --short | wc -l"; git status --short | wc -l
  echo "\$ grep -c scanDiagnostics dist/src/server/index.d.ts"; grep -c scanDiagnostics dist/src/server/index.d.ts
  echo "\$ npm pack --pack-destination $SP/pack"; PATH=/opt/npm11/bin:$PATH npm pack --pack-destination "$SP/pack" 2>&1 | tail -3
  echo "\$ ls -l $SP/pack/orkestrel-probe-*.tgz"; ls -l "$SP"/pack/orkestrel-probe-*.tgz
} | tee "$LOG"
