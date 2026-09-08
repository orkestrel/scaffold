#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

GUIDE="$FLEET/guide"
BRANCH='claude/orkestrel-npm-audit-deps-14ibta'
LOGS=$(mktemp -d "$SCR/d7n-guide-bootstrap-validate.XXXXXX")
BASE_STATUS="$LOGS/status-before.txt"
BASE_DIFF="$LOGS/diff-before.txt"
BASE_CACHED="$LOGS/diff-cached-before.txt"

run() {
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
  } >"$LOGS/$name.log.txt" 2>&1
  return "$status"
}

fail() {
  printf '%s\n' "$*" >&2
  exit 1
}

allowed() {
  case "$1" in
    guides/guide.md|src/core/helpers.ts|src/core/types.ts|tests/setup.ts|tests/src/core/helpers.test.ts|tests/src/core/Guide.test.ts|tests/setupPolicy.ts|tests/config.test.ts)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

check_state() {
  local line state path
  while IFS= read -r line; do
    state=${line:0:2}
    path=${line:3}
    if [ "$state" = '??' ]; then
      fail "untracked non-ignored file: $path"
    fi
    if [ "${state:0:1}" != ' ' ]; then
      fail "staged change: $path"
    fi
    if [ "$state" != '  ' ] && ! allowed "$path"; then
      fail "dirty path outside the Guide bootstrap candidate: $path"
    fi
  done < <(git -C "$GUIDE" status --porcelain=v1 --untracked-files=all)
}

finish() {
  local status=$1
  local captured=0
  set +e
  if ! git -C "$GUIDE" status --porcelain=v1 --untracked-files=all >"$LOGS/status-after.txt"; then
    captured=1
  fi
  if ! git -C "$GUIDE" diff --binary >"$LOGS/diff-after.txt"; then
    captured=1
  fi
  if ! git -C "$GUIDE" diff --cached --binary >"$LOGS/diff-cached-after.txt"; then
    captured=1
  fi
  if [ "$status" -eq 0 ]; then
    if [ "$captured" -ne 0 ]; then
      printf 'final state capture failed; logs: %s\n' "$LOGS" >&2
      status=1
    elif ! cmp -s "$BASE_STATUS" "$LOGS/status-after.txt" || ! cmp -s "$BASE_DIFF" "$LOGS/diff-after.txt" || ! cmp -s "$BASE_CACHED" "$LOGS/diff-cached-after.txt"; then
      printf 'tracked state changed; logs: %s\n' "$LOGS" >&2
      status=1
    elif ! touch "$LOGS/success"; then
      printf 'could not write success marker; logs: %s\n' "$LOGS" >&2
      status=1
    fi
  fi
  printf 'logs: %s\n' "$LOGS"
  exit "$status"
}

trap 'finish "$?"' EXIT

[ "$#" -eq 0 ] || fail 'validate-guide-bootstrap.sh accepts no arguments'
[ -d "$GUIDE/.git" ] || fail "missing guide checkout: $GUIDE"
[ "$(git -C "$GUIDE" branch --show-current)" = "$BRANCH" ] || fail "unexpected guide branch"
check_state
git -C "$GUIDE" status --porcelain=v1 --untracked-files=all >"$BASE_STATUS"
git -C "$GUIDE" diff --binary >"$BASE_DIFF"
git -C "$GUIDE" diff --cached --binary >"$BASE_CACHED"

cd "$GUIDE"
run format npm run format:check
run lint npm run lint:check
run check npm run check
run build npm run build
run test npm test
run docs npm run docs
