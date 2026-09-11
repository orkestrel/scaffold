#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
label=${2-}
guide_label=${3-}
guide_hash=${4-}
target="$FLEET/$package"
out="$SCR/$label"
guide="$SCR/packed/$guide_label/orkestrel-guide-0.0.18.tgz"
guide_extract="$SCR/packed/$guide_label/extract/package"

fail() { printf '%s\n' "$1" >&2; exit 1; }

case "$package" in
	scaffold) ;;
	*) fail 'package is outside the upper layer' ;;
esac
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be safe'
[[ "$guide_label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'Guide pack label must be safe'
[[ "$guide_hash" =~ ^[[:xdigit:]]{64}$ ]] || fail 'Guide SHA256 must be hexadecimal'
test -d "$target/.git" || fail 'canonical target is absent'
test ! -e "$out" || fail 'evidence output exists'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'manifest name differs'
test -f "$guide" || fail "Guide archive is absent: $guide"
test "$(sha256sum "$guide" | cut -d ' ' -f 1)" = "${guide_hash,,}" || fail 'Guide archive hash differs'
test "$(node "$SCR/read-package-field.mjs" "$guide_extract/package.json" name)" = '@orkestrel/guide' || fail 'Guide archive name differs'
test "$(node "$SCR/read-package-field.mjs" "$guide_extract/package.json" version)" = '0.0.18' || fail 'Guide archive version differs'
test -d "$guide_extract/dist" || fail 'Guide archive dist is absent'

mkdir "$out"
sha256sum "$guide" > "$out/archives.sha256"
git -C "$target" rev-parse HEAD > "$out/head-before.txt"
git -C "$target" status --porcelain=v1 > "$out/status-before.txt"
git -C "$target" ls-files --stage > "$out/index-before.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-before.sha256"
status=0
if timeout --kill-after=15s 600s npm --prefix "$target" install --no-save --ignore-scripts --package-lock=false "$guide" > "$out/install.stdout.txt" 2> "$out/install.stderr.txt"; then status=0; else status=$?; fi
printf '%s\n' "$status" > "$out/install.exit.txt"
git -C "$target" rev-parse HEAD > "$out/head-after.txt"
git -C "$target" status --porcelain=v1 > "$out/status-after.txt"
git -C "$target" ls-files --stage > "$out/index-after.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-after.sha256"
cmp "$out/index-before.txt" "$out/index-after.txt"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
test "$status" -eq 0
if diff -r "$guide_extract/dist" "$target/node_modules/@orkestrel/guide/dist" > "$out/guide-dist.diff.txt"; then printf '0\n' > "$out/guide-dist.exit.txt"; else status=$?; printf '%s\n' "$status" > "$out/guide-dist.exit.txt"; exit "$status"; fi
status=0
if npm --prefix "$target" ls @orkestrel/guide --all --json > "$out/npm-ls.json" 2> "$out/npm-ls.stderr.txt"; then status=0; else status=$?; fi
printf '%s\n' "$status" > "$out/npm-ls.exit.txt"
printf '%s\n' "$out"
