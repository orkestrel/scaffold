#!/usr/bin/env bash
# Drive the real script against the existing daemon and reserved invalid DNS names.
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/d7n-ollama-hook-boundaries"
test ! -e "$out"
mkdir "$out"
export CI=false
export CLAUDE_CODE_REMOTE=false
export OLLAMA_MODEL='qwen3.5:2b-q4_K_M'
run() {
  local name="$1"
  local host="$2"
  local cap="$3"
  local status=0
  if OLLAMA_HOST="$host" timeout --kill-after=5s "$cap" bash "$SCAFFOLD/scripts/ollama.sh" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then status=0; else status=$?; fi
  printf '%s\n' "$status" > "$out/$name.exit.txt"
  printf '%s %s\n' "$name" "$status"
}
git -C "$SCAFFOLD" diff HEAD --binary > "$out/diff-before.txt"
run external http://example.invalid:11434 15s
run numeric-prefix http://127.example.invalid:11434 15s
run reuse http://127.0.0.1:11434 300s
run repeat http://127.0.0.1:11434 300s
git -C "$SCAFFOLD" diff HEAD --binary > "$out/diff-after.txt"
cmp "$out/diff-before.txt" "$out/diff-after.txt"
printf '%s\n' "$out"
