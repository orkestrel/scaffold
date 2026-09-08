#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

TARGET="$FLEET/agent"
BRANCH='claude/orkestrel-npm-audit-deps-14ibta'
HEAD='54e71991c6189b8fd1e5895421f3f3723407bf1b'
LOGS=$(mktemp -d "$SCR/d7n-agent-final-host.XXXXXX")
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
    guides/agent.md|README.md|tests/guides.test.ts|src/*.ts)
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
      fail "dirty path outside the agent fix: $path"
    fi
  done < <(git -C "$TARGET" status --porcelain=v1 --untracked-files=all)
}

check_writes() {
  local name=$1
  local log="$LOGS/$name.log.txt"
  local summary='^rows read: [1-9][0-9]*, disagreements found: 0, written: 0, reported: 0$'
  grep -Eq "$summary" "$log" || fail "$name did not report the accepted docs summary"
  if grep -E '^rows read: ' "$log" | grep -Ev "$summary" >"$LOGS/$name-summaries.txt"; then
    fail "$name reported an unexpected docs summary"
  fi
}

finish() {
  local status=$1
  local captured=0
  set +e
  if ! git -C "$TARGET" status --porcelain=v1 --untracked-files=all >"$LOGS/status-after.txt"; then
    captured=1
  fi
  if ! git -C "$TARGET" diff --binary >"$LOGS/diff-after.txt"; then
    captured=1
  fi
  if ! git -C "$TARGET" diff --cached --binary >"$LOGS/diff-cached-after.txt"; then
    captured=1
  fi
  if [ "$status" -eq 0 ]; then
    if [ "$captured" -ne 0 ]; then
      printf 'final state capture failed; logs: %s\n' "$LOGS" >&2
      status=1
    elif ! cmp -s "$BASE_STATUS" "$LOGS/status-after.txt" || ! cmp -s "$BASE_DIFF" "$LOGS/diff-after.txt" || ! cmp -s "$BASE_CACHED" "$LOGS/diff-cached-after.txt"; then
      printf 'source state changed; logs: %s\n' "$LOGS" >&2
      status=1
    fi
  fi
  printf 'logs: %s\n' "$LOGS"
  exit "$status"
}

trap 'finish "$?"' EXIT

[ -d "$TARGET/.git" ] || fail "missing agent checkout: $TARGET"
[ "$(git -C "$TARGET" branch --show-current)" = "$BRANCH" ] || fail 'unexpected agent branch'
[ "$(git -C "$TARGET" rev-parse HEAD)" = "$HEAD" ] || fail 'unexpected agent HEAD'
check_state
git -C "$TARGET" status --porcelain=v1 --untracked-files=all >"$BASE_STATUS"
git -C "$TARGET" diff --binary >"$BASE_DIFF"
git -C "$TARGET" diff --cached --binary >"$BASE_CACHED"

git -C "$TARGET" diff -U0 -- src >"$LOGS/source-hunks.txt"
awk '/^\+\+\+|^---/ { next } /^[+-]/ { content = substr($0, 2); if (content !~ /^[[:space:]]*(\*|\/\/|\/\*\*)/) print }' "$LOGS/source-hunks.txt" >"$LOGS/source-runtime.txt"
if [ -s "$LOGS/source-runtime.txt" ]; then
  cat "$LOGS/source-runtime.txt" >&2
  fail "source diff contains a non-comment hunk; logs: $LOGS"
fi

cd "$TARGET"
run docs-guide npm run docs -- --to guide
check_writes docs-guide
run docs-source npm run docs -- --to source
check_writes docs-source
run core npm run test:src:core
