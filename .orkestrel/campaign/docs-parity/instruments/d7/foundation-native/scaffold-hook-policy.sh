#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
label=${1-}
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]]
out="$SCR/$label"
test ! -e "$out"
mkdir "$out"
git -C "$SCAFFOLD" rev-parse HEAD > "$out/head.txt"
git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all > "$out/status.txt"
git -C "$SCAFFOLD" diff HEAD --binary > "$out/diff.txt"
printf '%s\n' 'npm run test:policy' > "$out/command.txt"
cd "$SCAFFOLD"
status=0
timeout --kill-after=15s 180s npm run test:policy > "$out/action.stdout.txt" 2> "$out/action.stderr.txt" || status=$?
printf '%s\n' "$status" > "$out/action.exit.txt"
printf '%s %s\n' "$out" "$status"
exit "$status"
