#!/bin/bash
# verify-bft.sh: the authoritative chain on the session branch after the bft landing (no frame changes, so no regeneration). Log: verify-bft.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
export PATH="$S/npm11/node_modules/.bin:$PATH"
cd /home/user/veneer || exit 1
L=$S/verify-bft.log.txt; : > "$L"
echo "=== head $(git rev-parse --short HEAD) at $(date -u +%H:%M:%S)" >> "$L"
for step in format:check lint:check check build test test:service; do
  echo "=== $step $(date -u +%H:%M:%S)" >> "$L"
  npm run "$step" >> "$L" 2>&1; rc=$?
  echo "=== $step exit=$rc $(date -u +%H:%M:%S)" >> "$L"
  [ $rc -ne 0 ] && { echo "=== CHAIN RED at $step" >> "$L"; exit 1; }
done
echo "=== CHAIN GREEN $(date -u +%H:%M:%S)" >> "$L"
