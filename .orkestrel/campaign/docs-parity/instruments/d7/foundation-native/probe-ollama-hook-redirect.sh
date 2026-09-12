#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
label=${1-}
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]]
out="$SCR/$label"
test ! -e "$out"
mkdir "$out"
git -C "$SCAFFOLD" diff HEAD --binary -- scripts/ollama.sh > "$out/source-before.patch"
status=0
timeout --kill-after=5s 90s node "$SCR/probe-ollama-hook-redirect.mjs" > "$out/probe.stdout.txt" 2> "$out/probe.stderr.txt" || status=$?
printf '%s\n' "$status" > "$out/probe.exit.txt"
git -C "$SCAFFOLD" diff HEAD --binary -- scripts/ollama.sh > "$out/source-after.patch"
cmp "$out/source-before.patch" "$out/source-after.patch"
printf '%s %s\n' "$out" "$status"
exit "$status"
