#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
label=${2-}
target="$FLEET/$package"
out="$SCR/$label"
scaffold="$SCR/packed/d7n-scaffold-guides-api-accepted/orkestrel-scaffold-0.0.64.tgz"
guide="$SCR/packed/d7n-guide-native-entry-final/orkestrel-guide-0.0.18.tgz"
html="$SCR/d7n-html-stage.FBOpkx/packed/orkestrel-html-0.0.9.tgz"
markdown="$SCR/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz"
probe="$SCR/packed/orkestrel-probe-0.0.13.tgz"

fail() { printf '%s\n' "$1" >&2; exit 1; }

case "$package" in
	scaffold|contract|codec|msg|sse|test) fail 'package is outside the next layer' ;;
	*) [[ "$package" =~ ^[a-z][a-z0-9-]*$ ]] || fail 'package must be a lowercase bare name' ;;
esac
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be safe'
test -d "$target/.git" || fail 'canonical target is absent'
test ! -e "$out" || fail 'evidence output exists'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'manifest name differs'
for archive in "$scaffold" "$guide" "$html" "$markdown"; do test -f "$archive" || fail "archive is absent: $archive"; done
if [ "$package" = database ]; then test -f "$probe" || fail "archive is absent: $probe"; fi
test "$(sha256sum "$scaffold" | cut -d ' ' -f 1)" = '5d4aa6553555074692cd7cf87e224a360f753c86424926d85ccc559b28e1815c' || fail 'Scaffold archive hash differs'
test "$(sha256sum "$guide" | cut -d ' ' -f 1)" = 'cc605b5bcfe6db1c86ab6cdfda6415879253b56cf5b4d5d0d325c19eb1b7eac7' || fail 'Guide archive hash differs'
if [ "$package" = database ]; then test "$(sha256sum "$probe" | cut -d ' ' -f 1)" = '3e32ee7509e07c1b91f421624d4c1a2d7ccfe34cc7f1621b73fdddb5ced859d5' || fail 'Probe archive hash differs'; fi

mkdir "$out"
sha256sum "$scaffold" "$guide" "$html" "$markdown" > "$out/archives.sha256"
if [ "$package" = database ]; then sha256sum "$probe" >> "$out/archives.sha256"; fi
git -C "$target" rev-parse HEAD > "$out/head-before.txt"
git -C "$target" status --porcelain=v1 > "$out/status-before.txt"
git -C "$target" ls-files --stage > "$out/index-before.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-before.sha256"
status=0
if [ "$package" = database ]; then
	if timeout --kill-after=15s 600s npm --prefix "$target" install --no-save --ignore-scripts --package-lock=false "$scaffold" "$guide" "$html" "$markdown" "$probe" @orkestrel/contract@0.0.17 @orkestrel/test@0.0.14 > "$out/install.stdout.txt" 2> "$out/install.stderr.txt"; then status=0; else status=$?; fi
else
	if timeout --kill-after=15s 600s npm --prefix "$target" install --no-save --ignore-scripts --package-lock=false "$scaffold" "$guide" "$html" "$markdown" @orkestrel/contract@0.0.17 @orkestrel/test@0.0.14 > "$out/install.stdout.txt" 2> "$out/install.stderr.txt"; then status=0; else status=$?; fi
fi
printf '%s\n' "$status" > "$out/install.exit.txt"
git -C "$target" rev-parse HEAD > "$out/head-after.txt"
git -C "$target" status --porcelain=v1 > "$out/status-after.txt"
git -C "$target" ls-files --stage > "$out/index-after.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-after.sha256"
cmp "$out/index-before.txt" "$out/index-after.txt"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
test "$status" -eq 0
if diff -r "$SCR/packed/d7n-scaffold-guides-api-accepted/extract/package/dist" "$target/node_modules/@orkestrel/scaffold/dist" > "$out/scaffold-dist.diff.txt"; then printf '0\n' > "$out/scaffold-dist.exit.txt"; else status=$?; printf '%s\n' "$status" > "$out/scaffold-dist.exit.txt"; exit "$status"; fi
if diff -r "$FLEET/guide/dist/src" "$target/node_modules/@orkestrel/guide/dist/src" > "$out/guide-dist.diff.txt"; then printf '0\n' > "$out/guide-dist.exit.txt"; else status=$?; printf '%s\n' "$status" > "$out/guide-dist.exit.txt"; exit "$status"; fi
status=0
if [ "$package" = database ]; then
	if npm --prefix "$target" ls @orkestrel/contract @orkestrel/test @orkestrel/guide @orkestrel/scaffold @orkestrel/html @orkestrel/markdown @orkestrel/probe --all --json > "$out/npm-ls.json" 2> "$out/npm-ls.stderr.txt"; then status=0; else status=$?; fi
else
	if npm --prefix "$target" ls @orkestrel/contract @orkestrel/test @orkestrel/guide @orkestrel/scaffold @orkestrel/html @orkestrel/markdown --all --json > "$out/npm-ls.json" 2> "$out/npm-ls.stderr.txt"; then status=0; else status=$?; fi
fi
printf '%s\n' "$status" > "$out/npm-ls.exit.txt"
printf '%s\n' "$out"
