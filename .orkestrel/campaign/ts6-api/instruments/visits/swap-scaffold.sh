#!/usr/bin/env bash
# Install scaffold's packed head start into one fleet checkout without touching its manifest or lockfile, and record the range replaced.
# Usage: swap-scaffold.sh <tarball> <target-dir>
set -eu
TARBALL=$1; TARGET=$2
LOG=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/pack/swap-$(basename "$TARGET").log.txt
cd "$TARGET"
{
  echo "# swap-scaffold $(basename "$TARGET") — $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "range replaced: $(grep -o '"@orkestrel/scaffold": "[^"]*"' package.json)"
  echo "installed before: $(node -e "console.log(require('@orkestrel/scaffold/package.json').version)")"
  echo "\$ npm install --no-save --no-audit --no-fund $TARBALL"
  npm install --no-save --no-audit --no-fund "$TARBALL" 2>&1 | tail -3
  echo "installed after: $(node -e "console.log(require('@orkestrel/scaffold/package.json').version)")"
  echo "head start present: $(grep -c "declarationRollup" node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts || true) declarationRollup hits in the vendored helpers; $(grep -c "\"typescript\"" node_modules/@orkestrel/scaffold/dist/host/.oxlintrc.json || true) typescript restrictions in the vendored lint config"
  echo "manifest/lockfile diff: $(git diff --stat -- package.json package-lock.json | tail -1)"
} | tee "$LOG"
