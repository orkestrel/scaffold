#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

TARGET=${1-}
fail() {
  printf '%s\n' "$*" >&2
  exit 1
}

if [ "$#" -ne 1 ]; then
  fail 'guide checkout path is required'
fi
if [ ! -d "$TARGET/.git" ]; then
  fail "missing guide checkout: $TARGET"
fi
LOGS=$(mktemp -d "$SCR/d7n-guide-policy-observe.XXXXXX")
BASE_STATUS="$LOGS/status-before.txt"
BASE_DIFF="$LOGS/diff-before.txt"
BASE_CACHED="$LOGS/diff-cached-before.txt"

run() {
  local status
  {
    printf '+'
    printf ' %q' "$@"
    printf '\n'
    if "$@"; then status=0; else status=$?; fi
    printf 'exit=%s\n' "$status"
  } >"$LOGS/observe.log.txt" 2>&1
  return "$status"
}

finish() {
  local status=$1
  local captured=0
  set +e
  git -C "$TARGET" status --porcelain=v1 --untracked-files=all >"$LOGS/status-after.txt" || captured=1
  git -C "$TARGET" diff --binary >"$LOGS/diff-after.txt" || captured=1
  git -C "$TARGET" diff --cached --binary >"$LOGS/diff-cached-after.txt" || captured=1
  if [ "$status" -eq 0 ] && { [ "$captured" -ne 0 ] || ! cmp -s "$BASE_STATUS" "$LOGS/status-after.txt" || ! cmp -s "$BASE_DIFF" "$LOGS/diff-after.txt" || ! cmp -s "$BASE_CACHED" "$LOGS/diff-cached-after.txt"; }; then
    printf 'guide tracked state changed or final capture failed; evidence: %s\n' "$LOGS" >&2
    status=1
  fi
  printf 'evidence: %s\n' "$LOGS"
  exit "$status"
}

trap 'finish "$?"' EXIT

git -C "$TARGET" status --porcelain=v1 --untracked-files=all >"$BASE_STATUS"
git -C "$TARGET" diff --binary >"$BASE_DIFF"
git -C "$TARGET" diff --cached --binary >"$BASE_CACHED"
run timeout 120 node "$SCR/guide-policy-observe.mjs" "$TARGET" "$LOGS"
