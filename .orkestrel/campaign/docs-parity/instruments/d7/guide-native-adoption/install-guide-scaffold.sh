#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

guide="$FLEET/guide"
scaffold="$SCR/packed/d7n-scaffold-guides-api-accepted/orkestrel-scaffold-0.0.64.tgz"
contract="$SCR/packed/d7n-foundation-contract.ZjPTS5/orkestrel-contract-0.0.17.tgz"
html="$SCR/d7n-html-stage.FBOpkx/packed/orkestrel-html-0.0.9.tgz"
markdown="$SCR/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz"
testtar="$SCR/packed/d7n-foundation-test.ufR41o/orkestrel-test-0.0.14.tgz"
expected_scaffold='5d4aa6553555074692cd7cf87e224a360f753c86424926d85ccc559b28e1815c'
label=${1-}

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
out="$SCR/$label"
test ! -e "$out" || fail "evidence directory exists: $out"
for archive in "$scaffold" "$contract" "$html" "$markdown" "$testtar"; do
	test -f "$archive" || fail "archive is absent: $archive"
done
test "$(sha256sum "$scaffold" | cut -d ' ' -f 1)" = "$expected_scaffold" || fail 'Scaffold archive hash differs from the accepted archive.'

mkdir "$out"
sha256sum "$scaffold" "$contract" "$html" "$markdown" "$testtar" > "$out/archives.sha256"
git -C "$guide" rev-parse HEAD > "$out/head-before.txt"
git -C "$guide" status --porcelain=v1 > "$out/status-before.txt"
git -C "$guide" ls-files --stage > "$out/index-before.txt"
sha256sum "$guide/package.json" "$guide/package-lock.json" > "$out/manifests-before.sha256"
status=0
if timeout --kill-after=15s 600s npm --prefix "$guide" install --no-save --ignore-scripts --package-lock=false "$scaffold" "$contract" "$html" "$markdown" "$testtar" > "$out/install.stdout.txt" 2> "$out/install.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/install.exit.txt"
git -C "$guide" rev-parse HEAD > "$out/head-after.txt"
git -C "$guide" status --porcelain=v1 > "$out/status-after.txt"
git -C "$guide" ls-files --stage > "$out/index-after.txt"
sha256sum "$guide/package.json" "$guide/package-lock.json" > "$out/manifests-after.sha256"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
cmp "$out/index-before.txt" "$out/index-after.txt"
test "$status" -eq 0
if diff -r "$SCR/packed/d7n-scaffold-guides-api-accepted/extract/package/dist" "$guide/node_modules/@orkestrel/scaffold/dist" > "$out/scaffold-dist.diff.txt"; then
	printf '0\n' > "$out/scaffold-dist.exit.txt"
else
	status=$?
	printf '%s\n' "$status" > "$out/scaffold-dist.exit.txt"
	exit "$status"
fi
printf '%s\n' "$out"
