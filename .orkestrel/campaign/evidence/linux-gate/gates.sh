#!/bin/bash
# Non-mutating acceptance gate chain plus the release distribution proof, per
# AGENTS.md quality gates and orkestrel-publish references/wave.md step 8.
# Argument 1 is the repository name under /home/user.
# Records every gate's true exit code. Never stops the chain on a failure:
# a single report of every gate beats one failure hiding the rest.
set -u
repo="$1"
cd "/home/user/$repo" || exit 1
status_file="$2"
: > "$status_file"

run_gate() {
  local label="$1"; shift
  echo ""
  echo "########## GATE $label ##########"
  local start=$SECONDS
  timeout 1800 "$@"
  local code=$?
  local elapsed=$((SECONDS - start))
  echo "########## GATE $label exit=$code elapsed=${elapsed}s ##########"
  printf '%s\texit=%s\telapsed=%ss\n' "$label" "$code" "$elapsed" >> "$status_file"
}

run_gate "format:check"  npm run format:check
run_gate "lint:check"    npm run lint:check
run_gate "check"         npm run check
run_gate "build"         npm run build
run_gate "test"          npm test
run_gate "distribution"  npm run test:distribution -- --mode release
echo ""
echo "GATES-DONE $repo"
cat "$status_file"
