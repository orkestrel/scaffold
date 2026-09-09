#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

mode=${1-}
label=${2-}
guide="$FLEET/guide"
out="$SCR/$label"

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

capture() {
	local suffix="$1"
	git -C "$guide" rev-parse HEAD > "$out/head-$suffix.txt"
	git -C "$guide" status --porcelain=v1 > "$out/status-$suffix.txt"
	git -C "$guide" ls-files --stage > "$out/index-$suffix.txt"
	sha256sum "$guide/package.json" "$guide/package-lock.json" > "$out/manifests-$suffix.sha256"
}

case "$mode" in
	preview|apply) ;;
	*) fail 'mode must be preview or apply' ;;
esac
test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
test ! -e "$out" || fail "evidence directory exists: $out"
mkdir "$out"
capture before
if diff -r "$SCR/packed/d7n-scaffold-guides-api-accepted/extract/package/dist" "$guide/node_modules/@orkestrel/scaffold/dist" > "$out/scaffold-dist-before.diff.txt"; then
	printf '0\n' > "$out/scaffold-dist-before.exit.txt"
else
	status=$?
	printf '%s\n' "$status" > "$out/scaffold-dist-before.exit.txt"
	exit "$status"
fi
status=0
if timeout --kill-after=15s 180s node "$SCR/apply-guide-native-tooling.mjs" "$guide" "$out" "$mode" > "$out/instrument.stdout.txt" 2> "$out/instrument.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/instrument.exit.txt"
capture after
if [ "$mode" = preview ]; then
	cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
else
	cmp <(cut -d ' ' -f 1 "$out/manifests-before.sha256" | tail -1) <(cut -d ' ' -f 1 "$out/manifests-after.sha256" | tail -1)
fi
cmp "$out/index-before.txt" "$out/index-after.txt"
printf '%s exit %s\n' "$mode" "$status"
printf '%s\n' "$out"
exit "$status"
