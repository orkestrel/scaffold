#!/usr/bin/env bash
# Successor to capture-guides-extraction-review.sh. Select the actual replacement
# archive explicitly; retain evidence under the caller's unused label.
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
archive=${2-}
guide="$FLEET/guide"

fail() {
  printf '%s\n' "$1" >&2
  exit 1
}

compare() {
  local name="$1"
  local status=0
  shift
  cmp "$@" > "$out/$name.log.txt" 2>&1 || status=$?
  printf '%s\n' "$status" > "$out/$name.exit.txt"
  test "$status" -eq 0
}

test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[a-zA-Z0-9._-]+$ ]] || fail 'evidence label is invalid'
test -n "$archive" || fail 'candidate archive is required'
archive=$(realpath -e "$archive")
case "$archive" in
  "$SCR"/packed/*) ;;
  *) fail 'candidate archive must be under the pass packed directory' ;;
esac
test -f "$archive" || fail 'candidate archive must be a file'
out="$SCR/$label"
test ! -e "$out" || fail "evidence directory exists: $out"
mkdir -p "$out"

git -C "$guide" diff HEAD -- . > "$out/guide.diff.txt"
git -C "$guide" status --short > "$out/guide.status.txt"
git -C "$guide" rev-parse HEAD > "$out/guide.head.txt"
git -C "$guide" diff --check > "$out/guide.diff-check.txt"
git -C "$guide" ls-files --others --exclude-standard > "$out/guide.untracked.txt"
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/scaffold.diff.txt"
git -C "$SCAFFOLD" status --short > "$out/scaffold.status.txt"
git -C "$SCAFFOLD" rev-parse HEAD > "$out/scaffold.head.txt"
git -C "$SCAFFOLD" diff --check > "$out/scaffold.diff-check.txt"
git -C "$SCAFFOLD" ls-files --others --exclude-standard > "$out/scaffold.untracked.txt"
sha256sum "$guide/dist/src/core/index.js" "$guide/dist/src/core/index.d.ts" "$SCAFFOLD/node_modules/@orkestrel/guide/dist/src/core/index.js" "$SCAFFOLD/node_modules/@orkestrel/guide/dist/src/core/index.d.ts" "$archive" > "$out/artifacts.sha256"
compare core-js "$guide/dist/src/core/index.js" "$SCAFFOLD/node_modules/@orkestrel/guide/dist/src/core/index.js"
compare core-declaration "$guide/dist/src/core/index.d.ts" "$SCAFFOLD/node_modules/@orkestrel/guide/dist/src/core/index.d.ts"
printf '%s\n' "$out"
