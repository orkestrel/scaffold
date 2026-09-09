#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
action=${2-}
label=${3-}
cap=${4-}

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

case "$package" in
	contract|codec|msg|sse|test) ;;
	*) fail 'package must be contract, codec, msg, sse, or test' ;;
esac
case "$action" in
	native) command=(node --experimental-strip-types tests/guides.test.ts) ;;
	guides) command=(npm run test:guides) ;;
	to-guide) command=(npm run test:guides -- --to guide) ;;
	to-source) command=(npm run test:guides -- --to source) ;;
	prepublish) command=(npm run prepublishOnly) ;;
	format) command=(npm run format) ;;
	lock) command=(npm install --package-lock-only --ignore-scripts) ;;
	install) command=(npm ci --ignore-scripts) ;;
	audit) command=(node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --offline) ;;
	overwrite) command=(node node_modules/@orkestrel/scaffold/dist/bin/main.js overwrite --offline) ;;
	help) command=(node node_modules/@orkestrel/scaffold/dist/bin/main.js --help) ;;
	*) fail 'action is not supported' ;;
esac
test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
[[ "$cap" =~ ^[1-9][0-9]*s$ ]] || fail 'cap must be a positive whole-second timeout'
target="$FLEET/$package"
out="$SCR/$label"
test -d "$target/.git" || fail "canonical package directory is absent: $target"
test ! -e "$out" || fail "evidence directory exists: $out"
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'target manifest name differs from the selected canonical package.'

mkdir "$out"
capture before
status=0
cd "$target"
if timeout --kill-after=15s "$cap" "${command[@]}" > "$out/action.stdout.txt" 2> "$out/action.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/action.exit.txt"
capture after
printf '%s %s %s\n' "$out" "$action" "$status"
exit "$status"
