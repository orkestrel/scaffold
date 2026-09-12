#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/d7n-ollama-hook-linux-ci"
test ! -e "$out"
mkdir "$out"
status=0
if timeout --kill-after=15s 1200s gh run watch 34676625435 --repo orkestrel/ollama --exit-status --interval 30 > "$out/watch.stdout.txt" 2> "$out/watch.stderr.txt"; then status=0; else status=$?; fi
printf '%s\n' "$status" > "$out/watch.exit.txt"
gh run view 34676625435 --repo orkestrel/ollama --json headSha,status,conclusion,url,jobs > "$out/run.json"
if [ "$status" != 124 ]; then
  gh run view 34676625435 --repo orkestrel/ollama --log > "$out/run.log.txt" 2> "$out/log.stderr.txt"
fi
printf 'CI: %s %s\n' "$status" "$out"
exit "$status"
