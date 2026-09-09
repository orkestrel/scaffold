#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
label=${2-}
scaffold="$SCR/packed/d7n-scaffold-guides-api-accepted/orkestrel-scaffold-0.0.64.tgz"
guide="$SCR/packed/d7n-guide-native-entry-final/orkestrel-guide-0.0.18.tgz"
contract="$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz"
html="$SCR/d7n-html-stage.FBOpkx/packed/orkestrel-html-0.0.9.tgz"
markdown="$SCR/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz"
testtar="$SCR/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz"

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

case "$package" in
	contract|codec|msg|sse|test) ;;
	*) fail 'package must be contract, codec, msg, sse, or test' ;;
esac
test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
target="$FLEET/$package"
out="$SCR/$label"
test -d "$target/.git" || fail "canonical package directory is absent: $target"
test ! -e "$out" || fail "evidence directory exists: $out"
for archive in "$scaffold" "$guide" "$contract" "$html" "$markdown" "$testtar"; do
	test -f "$archive" || fail "archive is absent: $archive"
done
test "$(sha256sum "$scaffold" | cut -d ' ' -f 1)" = '5d4aa6553555074692cd7cf87e224a360f753c86424926d85ccc559b28e1815c' || fail 'Scaffold archive hash differs from the accepted archive.'
test "$(sha256sum "$guide" | cut -d ' ' -f 1)" = 'cc605b5bcfe6db1c86ab6cdfda6415879253b56cf5b4d5d0d325c19eb1b7eac7' || fail 'Guide archive hash differs from the accepted archive.'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'target manifest name differs from the selected canonical package.'

mkdir "$out"
sha256sum "$scaffold" "$guide" "$contract" "$html" "$markdown" "$testtar" > "$out/archives.sha256"
git -C "$target" rev-parse HEAD > "$out/head-before.txt"
git -C "$target" status --porcelain=v1 > "$out/status-before.txt"
git -C "$target" ls-files --stage > "$out/index-before.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-before.sha256"
status=0
if timeout --kill-after=15s 600s npm --prefix "$target" install --no-save --ignore-scripts --package-lock=false "$scaffold" "$guide" "$contract" "$html" "$markdown" "$testtar" > "$out/install.stdout.txt" 2> "$out/install.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/install.exit.txt"
git -C "$target" rev-parse HEAD > "$out/head-after.txt"
git -C "$target" status --porcelain=v1 > "$out/status-after.txt"
git -C "$target" ls-files --stage > "$out/index-after.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-after.sha256"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
cmp "$out/index-before.txt" "$out/index-after.txt"
test "$status" -eq 0
if diff -r "$SCR/packed/d7n-scaffold-guides-api-accepted/extract/package/dist" "$target/node_modules/@orkestrel/scaffold/dist" > "$out/scaffold-dist.diff.txt"; then
	printf '0\n' > "$out/scaffold-dist.exit.txt"
else
	status=$?
	printf '%s\n' "$status" > "$out/scaffold-dist.exit.txt"
	exit "$status"
fi
if diff -r "$FLEET/guide/dist/src" "$target/node_modules/@orkestrel/guide/dist/src" > "$out/guide-dist.diff.txt"; then
	printf '0\n' > "$out/guide-dist.exit.txt"
else
	status=$?
	printf '%s\n' "$status" > "$out/guide-dist.exit.txt"
	exit "$status"
fi
printf '%s\n' "$out"
