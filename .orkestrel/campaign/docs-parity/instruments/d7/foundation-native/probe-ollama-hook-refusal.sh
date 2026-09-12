#!/usr/bin/env bash
# Successor to probe-ollama-hook-boundaries.sh: repeat the corrected hostname refusal only.
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/d7n-ollama-hook-refusal"
test ! -e "$out"
mkdir "$out"
export CI=false
export CLAUDE_CODE_REMOTE=false
export OLLAMA_MODEL=fixture-model
git -C "$SCAFFOLD" diff HEAD --binary > "$out/diff-before.txt"
for label in external numeric-prefix; do
  case "$label" in
    external) host=http://example.invalid:11434;;
    numeric-prefix) host=http://127.example.invalid:11434;;
  esac
  status=0
  if OLLAMA_HOST="$host" timeout --kill-after=5s 15s bash "$SCAFFOLD/scripts/ollama.sh" > "$out/$label.stdout.txt" 2> "$out/$label.stderr.txt"; then status=0; else status=$?; fi
  printf '%s\n' "$status" > "$out/$label.exit.txt"
  test "$status" = 1
  grep -Fx 'ollama.sh: the configured endpoint is unreachable; local startup is limited to HTTP loopback' "$out/$label.stderr.txt"
done
git -C "$SCAFFOLD" diff HEAD --binary > "$out/diff-after.txt"
cmp "$out/diff-before.txt" "$out/diff-after.txt"
printf '0\n' > "$out/proof.exit.txt"
printf '%s\n' "$out"
