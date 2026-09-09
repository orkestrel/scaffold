#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

tarball=${1-}
label=${2-}
contract="$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz"
html="$SCR/d7n-html-stage.FBOpkx/packed/orkestrel-html-0.0.9.tgz"
markdown="$SCR/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz"
testtar="$SCR/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz"

fail() {
  printf '%s\n' "$1" >&2
  exit 1
}

test -n "$tarball" || fail 'Guide tarball path is required'
test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
tarball=$(realpath -e "$tarball")
case "$tarball" in
  "$SCR"/packed/*) ;;
  *) fail "Guide tarball must be within $SCR/packed" ;;
esac
test -f "$tarball" || fail "Guide tarball is not a file: $tarball"
out="$SCR/$label"
test ! -e "$out" || fail "evidence directory exists: $out"
mkdir -p "$out"

sha256sum "$tarball" "$contract" "$html" "$markdown" "$testtar" > "$out/artifacts.sha256"
git -C "$SCAFFOLD" ls-files --stage -- package.json package-lock.json > "$out/index-before.txt"
sha256sum "$SCAFFOLD/package.json" "$SCAFFOLD/package-lock.json" > "$out/manifests-before.sha256"
status=0
timeout --kill-after=15s 600 npm --prefix "$SCAFFOLD" install --no-save --ignore-scripts --package-lock=false "$contract" "$html" "$markdown" "$testtar" "$tarball" > "$out/install.log.txt" 2>&1 || status=$?
printf '%s\n' "$status" > "$out/install.exit.txt"
test "$status" -eq 0
cmp "$SCAFFOLD/node_modules/@orkestrel/guide/dist/src/core/index.js" "$FLEET/guide/dist/src/core/index.js"
node "$SCR/inspect-parity-guide.mjs" "$SCAFFOLD/node_modules/@orkestrel/guide/package.json" > "$out/metadata-installed.json"
sha256sum --check "$out/manifests-before.sha256" > "$out/manifest-preservation.log.txt"
git -C "$SCAFFOLD" ls-files --stage -- package.json package-lock.json > "$out/index-after.txt"
cmp "$out/index-before.txt" "$out/index-after.txt"
printf '%s\n' "$out"
