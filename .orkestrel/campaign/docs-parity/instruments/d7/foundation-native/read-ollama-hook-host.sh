#!/usr/bin/env bash
# Read local Ollama and the official installer; do not install or pull.
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/d7n-ollama-hook-host-reading"
test ! -e "$out"
mkdir "$out"
run() {
  local name="$1"
  local status=0
  shift
  if timeout --kill-after=5s 30s "$@" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then status=0; else status=$?; fi
  printf '%s\n' "$status" > "$out/$name.exit.txt"
  printf '%s %s\n' "$name" "$status"
}
run platform uname -s
run version ollama --version
run readiness curl --fail --silent --show-error --max-time 5 http://127.0.0.1:11434/api/version
run models curl --fail --silent --show-error --max-time 5 http://127.0.0.1:11434/api/tags
run missing curl --silent --show-error --max-time 5 --write-out '\n%{http_code}\n' --header 'Content-Type: application/json' --data-binary '{"model":"docs-parity-absent-control"}' http://127.0.0.1:11434/api/show
run present curl --silent --show-error --max-time 5 --write-out '\n%{http_code}\n' --header 'Content-Type: application/json' --data-binary '{"model":"qwen3.5:2b-q4_K_M"}' http://127.0.0.1:11434/api/show
run installer curl --fail --silent --show-error --proto '=https' --tlsv1.2 --max-time 25 https://ollama.com/install.sh
sha256sum "$out/installer.stdout.txt" > "$out/installer.sha256"
printf '%s\n' "$out"
