#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
target="$SCR/scaffold-path"
guide="$SCR/packed/orkestrel-guide-0.0.18.tgz"
test -f "$target/package.json"
test -f "$target/package-lock.json"
test -f "$guide"
test "$(git -C "$target" rev-parse HEAD)" = c87021bdc6367d27463139b293287a586de18240
logs=$(mktemp -d "$SCR/d7n-scaffold-path-prepare.XXXXXX")
printf '%s\n' "$logs"
cd "$target"
sha256sum package.json package-lock.json > "$logs/manifests.sha256"
git -C "$target" status --short > "$logs/before.status.txt"
npm install --no-save --package-lock=false --ignore-scripts --no-audit --no-fund "$guide" > "$logs/head-start.log.txt" 2>&1
sha256sum -c "$logs/manifests.sha256" > "$logs/head-start-preservation.log.txt"
sha256sum node_modules/@orkestrel/guide/dist/src/core/index.js > "$logs/guide.sha256"
test "$(cut -c1-64 "$logs/guide.sha256")" = 2b76b363f4b93b8017d42d5fd2de68ab55f2d0b01bad851f9b68fd4e80604d17
npm run build:src > "$logs/build-src.log.txt" 2>&1
npm run build:host > "$logs/build-host.log.txt" 2>&1
npm run build:inventory > "$logs/build-inventory.log.txt" 2>&1
sha256sum -c "$logs/manifests.sha256" > "$logs/final-preservation.log.txt"
git -C "$target" status --short > "$logs/after.status.txt"
printf '%s\n' 'Preparation completed; final acceptance and aligned-closure gates remain pending.'
