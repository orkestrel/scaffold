#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
label=${2-}

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

capture() {
	local suffix="$1"
	git -C "$target" rev-parse HEAD > "$out/head-$suffix.txt"
	git -C "$target" branch --show-current > "$out/branch-$suffix.txt"
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-$suffix.txt"
	git -C "$target" diff HEAD --binary > "$out/diff-$suffix.txt"
	git -C "$target" ls-files --stage > "$out/index-$suffix.txt"
	sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-$suffix.sha256"
}

search() {
	local name="$1"
	local value="$2"
	local status=0
	printf 'rg -n -F %q %q %q\n' "$value" "$target/src" "$target/tests" > "$out/$name.argv.txt"
	if rg -n -F "$value" "$target/src" "$target/tests" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then status=0; else status=$?; fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	if [ "$status" -gt 1 ]; then return "$status"; fi
	return 0
}

case "$package" in
	abort|budget|emitter) prior='0.0.9' ;;
	csv) prior='0.0.6' ;;
	html) prior='0.0.8' ;;
	indexeddb|sqlite) prior='0.0.10' ;;
	ndjson|timeout) prior='0.0.9' ;;
	tool) prior='0.0.13' ;;
	*) fail 'package is outside the selected next layer' ;;
esac
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label is unsafe'
target="$FLEET/$package"
out="$SCR/$label"
test -d "$target/.git" || fail 'canonical target is absent'
test ! -e "$out" || fail 'evidence output exists'
mkdir "$out"
capture before
error=0
if search own-version "$prior"; then :; else error=$?; fi
if [ "$error" -eq 0 ]; then if search contract '^0.0.16'; then :; else error=$?; fi; fi
if [ "$error" -eq 0 ]; then if search test '^0.0.13'; then :; else error=$?; fi; fi
capture after
cmp "$out/head-before.txt" "$out/head-after.txt"
cmp "$out/branch-before.txt" "$out/branch-after.txt"
cmp "$out/status-before.txt" "$out/status-after.txt"
cmp "$out/diff-before.txt" "$out/diff-after.txt"
cmp "$out/index-before.txt" "$out/index-after.txt"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
if [ "$error" -ne 0 ]; then exit "$error"; fi
if [ "$(<"$out/own-version.exit.txt")" -eq 0 ] || [ "$(<"$out/contract.exit.txt")" -eq 0 ] || [ "$(<"$out/test.exit.txt")" -eq 0 ]; then exit 1; fi
printf '%s\n' "$out"
