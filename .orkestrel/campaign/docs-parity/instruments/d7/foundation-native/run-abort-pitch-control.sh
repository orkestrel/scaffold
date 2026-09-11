#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
label=${1-}
[[ "$label" =~ ^d7n-abort-pitch-control-[a-z-]+$ ]]
target="$FLEET/abort"
out="$SCR/$label"
test ! -e "$out"
test -d "$target/.git"
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = @orkestrel/pitch-control
mkdir "$out"
git -C "$target" diff HEAD --binary > "$out/diff-before.txt"
git -C "$target" status --porcelain=v1 > "$out/status-before.txt"
sha256sum "$target/package.json" "$target/package-lock.json" "$target/README.md" > "$out/inputs-before.sha256"
status=0
if (cd "$target" && timeout --kill-after=15s 180s node --experimental-strip-types tests/guides.test.ts) > "$out/action.stdout.txt" 2> "$out/action.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/action.exit.txt"
sha256sum "$target/package.json" "$target/package-lock.json" "$target/README.md" > "$out/inputs-after.sha256"
cmp "$out/inputs-before.sha256" "$out/inputs-after.sha256"
printf '%s native-exit=%s\n' "$out" "$status"
