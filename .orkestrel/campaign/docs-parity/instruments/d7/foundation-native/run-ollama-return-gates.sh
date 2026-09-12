#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
target="$FLEET/ollama"
out="$SCR/d7n-ollama-return-gates"
test ! -e "$out"
mkdir "$out"
git -C "$target" rev-parse HEAD > "$out/head.txt"
git -C "$target" status --porcelain=v1 > "$out/status-before.txt"
git -C "$target" diff HEAD --binary > "$out/diff-before.txt"
cd "$target"
for stage in format:check lint:check check build test; do
  label="${stage//:/-}"
  status=0
  timeout --kill-after=15s 900s npm run "$stage" > "$out/$label.stdout.txt" 2> "$out/$label.stderr.txt" || status=$?
  printf '%s\n' "$status" > "$out/$label.exit.txt"
  printf '%s %s\n' "$stage" "$status"
  test "$status" = 0 || exit "$status"
done
git -C "$target" status --porcelain=v1 > "$out/status-after.txt"
git -C "$target" diff HEAD --binary > "$out/diff-after.txt"
cmp "$out/status-before.txt" "$out/status-after.txt"
cmp "$out/diff-before.txt" "$out/diff-after.txt"
