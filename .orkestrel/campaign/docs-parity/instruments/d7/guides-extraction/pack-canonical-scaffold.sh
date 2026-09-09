#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

expected=${1-}
label=${2-}
branch='claude/orkestrel-npm-audit-deps-14ibta'
campaign='.orkestrel/campaign/docs-parity'

fail() {
  printf '%s\n' "$1" >&2
  exit 1
}

allowed() {
  case "$1" in
    "$campaign"|"$campaign"/*) return 0 ;;
    *) return 1 ;;
  esac
}

reject_paths() {
  local inventory=$1
  local path
  while IFS= read -r -d '' path; do
    allowed "$path" || fail "Product change outside campaign: $path"
  done < "$inventory"
}

capture() {
  local suffix=$1
  git -C "$SCAFFOLD" rev-parse HEAD > "$out/head-$suffix.txt"
  git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all > "$out/status-$suffix.txt"
  git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity/**' > "$out/product-diff-$suffix.txt"
  sha256sum "$SCAFFOLD/package.json" "$SCAFFOLD/package-lock.json" > "$out/metadata-$suffix.sha256"
  git -C "$SCAFFOLD" ls-files --stage -- package.json package-lock.json > "$out/metadata-index-$suffix.txt"
}

test -n "$expected" || fail 'Expected Scaffold commit is required.'
[[ "$expected" =~ ^[0-9a-f]{40}$ ]] || fail 'Expected Scaffold commit must be a lowercase full SHA-1.'
test -n "$label" || fail 'Evidence label is required.'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'Evidence label must be a safe filename segment.'
test -d "$SCAFFOLD/.git" || fail "Missing Scaffold checkout: $SCAFFOLD"
test "$(git -C "$SCAFFOLD" branch --show-current)" = "$branch" || fail 'Scaffold branch differs from the required branch.'
actual=$(git -C "$SCAFFOLD" rev-parse HEAD)
test "$actual" = "$expected" || fail 'Scaffold HEAD differs from the expected commit.'

out="$SCR/packed/$label"
test ! -e "$out" || fail "Evidence directory exists: $out"
mkdir -p "$out/extract"

git -C "$SCAFFOLD" diff --name-only -z --cached > "$out/staged-paths.bin"
git -C "$SCAFFOLD" diff --name-only -z > "$out/unstaged-paths.bin"
git -C "$SCAFFOLD" ls-files --others --exclude-standard -z > "$out/untracked-paths.bin"
reject_paths "$out/staged-paths.bin"
reject_paths "$out/unstaged-paths.bin"
reject_paths "$out/untracked-paths.bin"

printf '%s\n' "$expected" > "$out/expected-head.txt"
printf '%s\n' "$actual" > "$out/actual-head.txt"
capture before

status=0
(
  cd "$SCAFFOLD"
  timeout --kill-after=15s 600 npm pack --ignore-scripts --pack-destination "$out"
) > "$out/pack.log.txt" 2>&1 || status=$?
printf '%s\n' "$status" > "$out/pack.exit.txt"
test "$status" -eq 0

tarball="$out/orkestrel-scaffold-0.0.64.tgz"
test -f "$tarball" || fail "Missing expected tarball: $tarball"
tar -xzf "$tarball" -C "$out/extract"

for entry in \
  package.json \
  dist/src/core/index.js \
  dist/src/core/index.d.ts \
  dist/src/server/index.js \
  dist/src/server/index.d.ts; do
  cmp "$out/extract/package/$entry" "$SCAFFOLD/$entry"
done

if ! diff -r "$out/extract/package/dist/host" "$SCAFFOLD/dist/host" > "$out/host-diff.txt"; then
  fail 'Packed host inventory differs from canonical dist/host.'
fi

sha256sum \
  "$tarball" \
  "$out/extract/package/package.json" \
  "$SCAFFOLD/package.json" \
  "$out/extract/package/dist/src/core/index.js" \
  "$SCAFFOLD/dist/src/core/index.js" \
  "$out/extract/package/dist/src/core/index.d.ts" \
  "$SCAFFOLD/dist/src/core/index.d.ts" \
  "$out/extract/package/dist/src/server/index.js" \
  "$SCAFFOLD/dist/src/server/index.js" \
  "$out/extract/package/dist/src/server/index.d.ts" \
  "$SCAFFOLD/dist/src/server/index.d.ts" > "$out/artifacts.sha256"

sha256sum --check "$out/metadata-before.sha256" > "$out/metadata-preservation.log.txt"
capture after
cmp "$out/metadata-index-before.txt" "$out/metadata-index-after.txt"
cmp "$out/product-diff-before.txt" "$out/product-diff-after.txt"
printf 'artifact: %s\nlabel: local-artifact-only\n' "$tarball" > "$out/receipt.txt"
printf 'local-artifact-only: %s\n' "$tarball"
