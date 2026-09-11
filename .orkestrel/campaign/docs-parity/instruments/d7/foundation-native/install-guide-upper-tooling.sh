#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
label=${2-}
target="$FLEET/$package"
out="$SCR/$label"
scaffold="$SCR/packed/d7n-scaffold-guides-api-accepted/orkestrel-scaffold-0.0.64.tgz"

fail() { printf '%s\n' "$1" >&2; exit 1; }

case "$package" in
	guide) ;;
	*) fail 'package is outside the upper layer' ;;
esac
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be safe'
test -d "$target/.git" || fail 'canonical target is absent'
test ! -e "$out" || fail 'evidence output exists'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'manifest name differs'
test -f "$scaffold" || fail "archive is absent: $scaffold"
test "$(sha256sum "$scaffold" | cut -d ' ' -f 1)" = '5d4aa6553555074692cd7cf87e224a360f753c86424926d85ccc559b28e1815c' || fail 'Scaffold archive hash differs'

mkdir "$out"
sha256sum "$scaffold" > "$out/archives.sha256"
git -C "$target" rev-parse HEAD > "$out/head-before.txt"
git -C "$target" status --porcelain=v1 > "$out/status-before.txt"
git -C "$target" ls-files --stage > "$out/index-before.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-before.sha256"
status=0
if timeout --kill-after=15s 600s npm --prefix "$target" install --no-save --ignore-scripts --package-lock=false "$scaffold" @orkestrel/contract@0.0.17 @orkestrel/html@0.0.9 @orkestrel/markdown@0.0.14 @orkestrel/test@0.0.14 > "$out/install.stdout.txt" 2> "$out/install.stderr.txt"; then status=0; else status=$?; fi
printf '%s\n' "$status" > "$out/install.exit.txt"
git -C "$target" rev-parse HEAD > "$out/head-after.txt"
git -C "$target" status --porcelain=v1 > "$out/status-after.txt"
git -C "$target" ls-files --stage > "$out/index-after.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-after.sha256"
cmp "$out/index-before.txt" "$out/index-after.txt"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
test "$status" -eq 0
if diff -r "$SCR/packed/d7n-scaffold-guides-api-accepted/extract/package/dist" "$target/node_modules/@orkestrel/scaffold/dist" > "$out/scaffold-dist.diff.txt"; then printf '0\n' > "$out/scaffold-dist.exit.txt"; else status=$?; printf '%s\n' "$status" > "$out/scaffold-dist.exit.txt"; exit "$status"; fi
status=0
if npm --prefix "$target" ls @orkestrel/contract @orkestrel/test @orkestrel/scaffold @orkestrel/html @orkestrel/markdown --all --json > "$out/npm-ls.json" 2> "$out/npm-ls.stderr.txt"; then status=0; else status=$?; fi
printf '%s\n' "$status" > "$out/npm-ls.exit.txt"
printf '%s\n' "$out"
