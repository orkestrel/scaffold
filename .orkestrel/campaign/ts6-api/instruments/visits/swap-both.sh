#!/usr/bin/env bash
# Install scaffold's and probe's packed head starts into one fleet checkout in ONE npm invocation, because a second `npm install --no-save <tarball>` reconciles the tree against the lockfile and restores the registry copy of the first (observed in database at 22:21 UTC on 2026-09-06). Touches neither manifest nor lockfile; records the ranges replaced.
# Usage: swap-both.sh <scaffold-tarball> <probe-tarball> <target-dir>
set -eu
SCAFFOLD=$1; PROBE=$2; TARGET=$3
LOG=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/pack/swap-both-$(basename "$TARGET").log.txt
cd "$TARGET"
{
  echo "# swap-both $(basename "$TARGET") — $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "ranges replaced: $(grep -o '"@orkestrel/scaffold": "[^"]*"' package.json) $(grep -o '"@orkestrel/probe": "[^"]*"' package.json)"
  echo "installed before: scaffold $(node -e "console.log(require('@orkestrel/scaffold/package.json').version)") ($(grep -c '\^typescript' node_modules/@orkestrel/scaffold/dist/host/dotfiles/oxlintrc.json || true) restrictions), probe $(node -e "console.log(require('@orkestrel/probe/package.json').version)")"
  echo "\$ npm install --no-save --no-audit --no-fund $SCAFFOLD $PROBE"
  npm install --no-save --no-audit --no-fund "$SCAFFOLD" "$PROBE" 2>&1 | tail -3
  echo "installed after: scaffold $(node -e "console.log(require('@orkestrel/scaffold/package.json').version)"), probe $(node -e "console.log(require('@orkestrel/probe/package.json').version)")"
  echo "scaffold head start present: $(grep -c "declarationRollup" node_modules/@orkestrel/scaffold/dist/host/configs/helpers.ts || true) declarationRollup hits in the vendored helpers; $(grep -c '\^typescript' node_modules/@orkestrel/scaffold/dist/host/dotfiles/oxlintrc.json || true) typescript restrictions in the vendored lint config"
  echo "probe head start present: $(grep -rl "from 'typescript'" node_modules/@orkestrel/probe/dist 2>/dev/null | wc -l) files importing typescript in probe's dist (the head start has none); resolved $(grep -A2 '"node_modules/@orkestrel/probe"' node_modules/.package-lock.json | grep -o '"resolved": "[^"]*"' | cut -c1-60)"
  echo "manifest/lockfile diff: $(git diff --stat -- package.json package-lock.json | tail -1)"
} | tee "$LOG"
