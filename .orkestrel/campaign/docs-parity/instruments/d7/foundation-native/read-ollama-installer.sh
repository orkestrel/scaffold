#!/usr/bin/env bash
# Follow the official installer redirect; read only, never execute.
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/d7n-ollama-installer-reading"
test ! -e "$out"
mkdir "$out"
status=0
if timeout --kill-after=5s 30s curl --fail --silent --show-error --location --proto '=https' --proto-redir '=https' --tlsv1.2 --max-time 25 https://ollama.com/install.sh > "$out/installer.txt" 2> "$out/installer.stderr.txt"; then status=0; else status=$?; fi
printf '%s\n' "$status" > "$out/installer.exit.txt"
test "$status" = 0
test -s "$out/installer.txt"
sha256sum "$out/installer.txt" > "$out/installer.sha256"
printf '%s\n' "$out"
