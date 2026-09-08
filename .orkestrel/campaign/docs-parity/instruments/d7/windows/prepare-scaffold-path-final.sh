#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

target=/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path
baseline=c87021bdc6367d27463139b293287a586de18240
guide="$target/node_modules/@orkestrel/guide/dist/src/core/index.js"
guidehash=2b76b363f4b93b8017d42d5fd2de68ab55f2d0b01bad851f9b68fd4e80604d17

test "$SCR/scaffold-path" = "$target"
test -d "$target"
test "$(cd "$target" && pwd -P)" = "$target"
test -z "$(git -C "$target" rev-parse --show-prefix)"
test "$(git -C "$target" rev-parse HEAD)" = "$baseline"
test -f "$target/package.json"
test -f "$target/package-lock.json"
test -f "$guide"
test -d "$target/dist"
test -d "$target/dist/host"
test ! -L "$target/dist"
test ! -L "$target/dist/host"
test "$(readlink -f "$target/dist")" = "$target/dist"
test "$(readlink -f "$target/dist/host")" = "$target/dist/host"

evidence=$(mktemp -d "$SCR/d7n-scaffold-path-final-prepare.XXXXXX")
git -C "$target" status --short > "$evidence/before.status.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$evidence/manifests.sha256"
sha256sum "$guide" > "$evidence/guide.sha256"
test "$(cut -c1-64 "$evidence/guide.sha256")" = "$guidehash"

cd "$target"
npm run build:src > "$evidence/build-src.log.txt" 2>&1
npm run build:host > "$evidence/build-host.log.txt" 2>&1
npm run build:inventory > "$evidence/build-inventory.log.txt" 2>&1

sha256sum -c "$evidence/manifests.sha256" > "$evidence/manifests-preservation.log.txt"
git -C "$target" status --short > "$evidence/after.status.txt"
git -C "$target" diff > "$evidence/final.diff"
git -C "$target" diff -- host.json > "$evidence/host.diff"
if git -C "$target" diff --no-index -- /dev/null "$target/tests/setupPolicy.test.ts" > "$evidence/setupPolicy-test.diff"; then
	:
else
	status=$?
	test "$status" = 1
fi

printf '%s\n' "$evidence"
printf '%s\n' 'Preparation completed.'
