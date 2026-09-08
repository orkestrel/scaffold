#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

GUIDE="$FLEET/guide"
BRANCH='claude/orkestrel-npm-audit-deps-14ibta'
LOGS=$(mktemp -d "$SCR/d7n-guide-heading-pack.XXXXXX")
EXPECTED=${1-}
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

clean() {
  [ -z "$(git -C "$GUIDE" status --porcelain=v1 --untracked-files=all)" ] || fail 'guide checkout is dirty'
}

read_package() {
  node -p "require(process.argv[1]).$1" "$GUIDE/package.json"
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
    fi
  fi
  printf 'logs: %s\n' "$LOGS"
  exit "$status"
}

[ "$#" -eq 1 ] || fail 'pack-guide-heading.sh requires one full commit SHA'
[[ "$EXPECTED" =~ ^[0-9a-fA-F]{40}$ ]] || fail 'expected SHA must be forty hexadecimal characters'
[ -d "$GUIDE/.git" ] || fail "missing guide checkout: $GUIDE"
clean
[ "$(git -C "$GUIDE" branch --show-current)" = "$BRANCH" ] || fail 'unexpected guide branch'
[ "$(git -C "$GUIDE" rev-parse HEAD)" = "$EXPECTED" ] || fail 'guide HEAD differs from expected SHA'
git -C "$GUIDE" status --porcelain=v1 --untracked-files=all >"$BASE_STATUS"
git -C "$GUIDE" diff --binary >"$BASE_DIFF"
git -C "$GUIDE" diff --cached --binary >"$BASE_CACHED"
trap 'finish "$?"' EXIT

run fetch git -C "$GUIDE" fetch origin
git -C "$GUIDE" merge-base --is-ancestor origin/main HEAD || fail 'origin/main is not an ancestor of guide HEAD'
clean
[ "$(git -C "$GUIDE" branch --show-current)" = "$BRANCH" ] || fail 'guide branch changed after fetch'
[ "$(git -C "$GUIDE" rev-parse HEAD)" = "$EXPECTED" ] || fail 'guide HEAD changed after fetch'

NAME=$(read_package name)
VERSION=$(read_package version)
[ "$NAME" = '@orkestrel/guide' ] || fail "unexpected package name: $NAME"
[ "$VERSION" = '0.0.18' ] || fail "unexpected package version: $VERSION"

PACKED=$(mktemp -d "$SCR/packed/d7n-guide-heading.XXXXXX")
EXTRACTED=$(mktemp -d "$PACKED/extract.XXXXXX")
TARBALL="$PACKED/orkestrel-guide-0.0.18.tgz"

cd "$GUIDE"
run build npm run build
run pack npm pack --ignore-scripts --pack-destination "$PACKED"
[ -f "$TARBALL" ] || fail "missing expected tarball: $TARBALL"
run extract tar -xzf "$TARBALL" -C "$EXTRACTED"
run compare cmp "$EXTRACTED/package/dist/src/core/index.js" "$GUIDE/dist/src/core/index.js"

COMMIT=$(git -C "$GUIDE" rev-parse HEAD)
TARBALL_HASH=$(sha256sum "$TARBALL" | awk '{print $1}')
DIST_HASH=$(sha256sum "$GUIDE/dist/src/core/index.js" | awk '{print $1}')
METADATA="$LOGS/metadata.txt"
{
  printf 'commit: %s\n' "$COMMIT"
  printf 'version: %s\n' "$VERSION"
  printf 'tarball: %s\n' "$TARBALL"
  printf 'tarball-sha256: %s\n' "$TARBALL_HASH"
  printf 'dist-sha256: %s\n' "$DIST_HASH"
} >"$METADATA"
cat "$METADATA"
clean
[ "$(git -C "$GUIDE" rev-parse HEAD)" = "$EXPECTED" ] || fail 'guide HEAD changed during packing'
printf 'status: clean\n' >"$LOGS/status-final.txt"
cat "$LOGS/status-final.txt"
printf 'logs: %s\n' "$LOGS"
