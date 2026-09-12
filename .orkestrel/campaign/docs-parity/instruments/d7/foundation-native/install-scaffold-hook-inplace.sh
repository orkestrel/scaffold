#!/usr/bin/env bash
# Restore the registry graph without removing unchanged native modules held by an editor worker.
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/d7n-scaffold-hook-inplace-install"
test ! -e "$out"
mkdir "$out"
git -C "$SCAFFOLD" diff HEAD --binary > "$out/diff-before.txt"
status=0
if (cd "$SCAFFOLD" && timeout --kill-after=15s 600s npm install --ignore-scripts) > "$out/install.stdout.txt" 2> "$out/install.stderr.txt"; then status=0; else status=$?; fi
printf '%s\n' "$status" > "$out/install.exit.txt"
test "$status" = 0
(cd "$SCAFFOLD" && timeout --kill-after=15s 60s npm ls --depth=0) > "$out/roots.txt" 2> "$out/roots.stderr.txt"
node "$SCR/read-package-field.mjs" "$SCAFFOLD/node_modules/@orkestrel/guide/package.json" version > "$out/guide.txt"
node "$SCR/read-package-field.mjs" "$SCAFFOLD/node_modules/@orkestrel/probe/package.json" version > "$out/probe.txt"
git -C "$SCAFFOLD" diff HEAD --binary > "$out/diff-after.txt"
printf '%s\n' "$out"
