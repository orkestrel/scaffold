#!/usr/bin/env bash
# Pack scaffold's landed tree into the Orchestrator's scratchpad as the fleet's head start, and record what was packed.
set -eu
SP=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6
cd /home/user/scaffold
LOG="$SP/pack/pack-scaffold.log.txt"; mkdir -p "$SP/pack"
{
  echo "# pack-scaffold — $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "\$ git log --oneline -1"; git log --oneline -1
  echo "\$ git status --short | wc -l"; git status --short | wc -l
  echo "\$ ls dist/host/configs/helpers.ts dist/host/.oxlintrc.json"; ls -l dist/host/configs/helpers.ts dist/host/.oxlintrc.json
  echo "\$ grep -c declarationRollup dist/host/configs/helpers.ts"; grep -c declarationRollup dist/host/configs/helpers.ts
  echo "\$ grep -c '\"typescript\"' dist/host/.oxlintrc.json"; grep -c '"typescript"' dist/host/.oxlintrc.json || true
  echo "\$ npm pack --pack-destination $SP/pack"; PATH=/opt/npm11/bin:$PATH npm pack --pack-destination "$SP/pack" 2>&1 | tail -3
  echo "\$ ls -l $SP/pack/*.tgz"; ls -l "$SP"/pack/*.tgz
} | tee "$LOG"
