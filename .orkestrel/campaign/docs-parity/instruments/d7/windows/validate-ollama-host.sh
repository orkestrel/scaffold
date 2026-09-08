#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

TARGET="$FLEET/ollama"
LOGS=$(mktemp -d "$SCR/d7n-ollama-host.XXXXXX")
cd "$TARGET"

check() {
  local name=$1
  shift
  local status
  {
    printf '+'
    printf ' %q' "$@"
    printf '\n'
    if "$@"; then
      status=0
    else
      status=$?
    fi
    printf 'exit=%s\n' "$status"
  } > "$LOGS/$name.log.txt" 2>&1
  if [ "$status" -ne 0 ]; then
    printf '%s exited %s; logs: %s\n' "$name" "$status" "$LOGS" >&2
    exit "$status"
  fi
}

check audit node "$SCR/ollama-audit-controls.mjs" "$TARGET"
check format npx --no-install oxfmt --config .oxfmtrc.json --check guides/ollama.md README.md tests src
check lint npx --no-install oxlint --config .oxlintrc.json --deny-warnings tests src
check types npm run check
check docs npm run docs
check guides npm run test:guides
check policy npm run test:policy
printf 'logs: %s\n' "$LOGS"
