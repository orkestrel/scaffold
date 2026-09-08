#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
target="$SCR/d7n-landing-ollama-scope.diff.txt"
test ! -e "$target"
if diff -u "$SCAFFOLD/.orkestrel/campaign/docs-parity/instruments/d7/windows/land-p2-trailers.sh" "$SCR/land-p2.sh" > "$target"; then
  printf '%s\n' 'expected a landing amendment' >&2
  exit 1
else
  status=$?
  test "$status" -eq 1
fi
