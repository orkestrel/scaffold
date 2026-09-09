#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
guide="$FLEET/guide"

fail() {
  printf '%s\n' "$1" >&2
  exit 1
}

test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
test "${GUIDE_PACK_TRANSACTION-}" = 'root' || fail 'root guarded transaction is required'
out="$SCR/packed/$label"
test ! -e "$out" || fail "evidence directory exists: $out"
mkdir -p "$out/extract"

node "$SCR/inspect-parity-guide.mjs" "$guide/package.json" > "$out/metadata-before.json"
sha256sum "$guide/package.json" "$guide/package-lock.json" > "$out/manifests-before.sha256"
git -C "$guide" ls-files --stage -- package.json package-lock.json > "$out/index-before.txt"
git -C "$guide" diff HEAD -- . > "$out/diff-before.txt"

status=0
(
  cd "$guide"
  timeout --kill-after=15s 600 npm pack --ignore-scripts --pack-destination "$out"
) > "$out/pack.log.txt" 2>&1 || status=$?
printf '%s\n' "$status" > "$out/pack.exit.txt"
test "$status" -eq 0

tarball="$out/orkestrel-guide-0.0.18.tgz"
test -f "$tarball" || fail "missing expected tarball: $tarball"
tar -xzf "$tarball" -C "$out/extract"
node "$SCR/inspect-parity-guide.mjs" "$out/extract/package/package.json" > "$out/metadata-packed.json"
cmp "$out/extract/package/dist/src/core/index.js" "$guide/dist/src/core/index.js"
cmp "$out/extract/package/dist/src/core/index.d.ts" "$guide/dist/src/core/index.d.ts"
sha256sum "$tarball" "$guide/dist/src/core/index.js" "$guide/dist/src/core/index.d.ts" > "$out/artifacts.sha256"
sha256sum --check "$out/manifests-before.sha256" > "$out/manifest-preservation.log.txt"
git -C "$guide" ls-files --stage -- package.json package-lock.json > "$out/index-after.txt"
cmp "$out/index-before.txt" "$out/index-after.txt"
git -C "$guide" diff HEAD -- . > "$out/diff-after.txt"
cmp "$out/diff-before.txt" "$out/diff-after.txt"
printf 'artifact: %s\nlabel: local-artifact-only\nrestoration: root owns package metadata restoration\n' "$tarball" > "$out/receipt.txt"
printf 'local-artifact-only: %s\n' "$out"
