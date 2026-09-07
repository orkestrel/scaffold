#!/usr/bin/env bash
# head-start-guide.sh — build the guide checkout at its landed tip, pack it, and install the
# tarball into scaffold with --no-save so D4 reads findDrift and tagline from the head start.
# Scaffold's node_modules matches its lockfile (read 2026-09-07 03:20 UTC), so the reconcile
# restores nothing else. Log: head-start-guide.log.txt beside this file.
set -u
GUIDE=/home/user/fleet/guide
SCAFFOLD=/home/user/scaffold
HERE=$(cd "$(dirname "$0")" && pwd)
PACKED="$HERE/packed"
rm -rf "$PACKED" && mkdir -p "$PACKED"
cd "$GUIDE" || exit 90
echo "guide tip: $(git log --oneline -1)"
if [ -n "$(git status --short)" ]; then echo "REFUSED: the guide tree is dirty"; git status --short; exit 91; fi
npm run build || exit 92
npm pack --json --ignore-scripts --pack-destination "$PACKED" > "$PACKED/pack.json" || exit 93
ARCHIVE=$(ls "$PACKED"/*.tgz)
echo "archive: $ARCHIVE"
cd "$SCAFFOLD" || exit 94
npm install --no-save --ignore-scripts --no-audit --no-fund "$ARCHIVE" || exit 95
echo "installed guide: $(node -p "require('./node_modules/@orkestrel/guide/package.json').version")"
grep -n "findDrift\|tagline\|locateComment" node_modules/@orkestrel/guide/dist/src/core/index.d.ts | head -8
echo "HEAD-START DONE"
