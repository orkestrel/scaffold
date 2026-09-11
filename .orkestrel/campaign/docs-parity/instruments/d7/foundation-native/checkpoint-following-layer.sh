#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
output="$SCR/$label"
campaign=.orkestrel/campaign/docs-parity
publish=publish.txt

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

run() {
	local name="$1"
	shift
	local status=0
	if timeout --kill-after=15s 120s "$@" > "$output/$name.stdout.txt" 2> "$output/$name.stderr.txt"; then status=0; else status=$?; fi
	printf '%s\n' "$status" > "$output/$name.exit.txt"
	return "$status"
}

[[ "$label" =~ ^[a-z][a-z0-9-]*$ ]] || fail 'record label is required'
test ! -e "$output" || fail 'checkpoint evidence exists'
test "$(git -C "$SCAFFOLD" branch --show-current)" = main || fail 'Scaffold must be on main'
mkdir "$output"
git -C "$SCAFFOLD" diff --cached --binary -- "$publish" > "$output/publish-before.patch"
while IFS= read -r path; do
	case "$path" in
		"$publish") test "$(git -C "$SCAFFOLD" diff --cached --name-status -- "$publish")" = $'D\tpublish.txt' || fail 'publish staging is not a deletion' ;;
		*) fail "unrelated staged path: $path" ;;
	esac
done < <(git -C "$SCAFFOLD" diff --cached --name-only)
run fetch git -C "$SCAFFOLD" fetch origin
run ancestry git -C "$SCAFFOLD" merge-base --is-ancestor origin/main HEAD
run check git -C "$SCAFFOLD" diff --check
git -C "$SCAFFOLD" add -- "$campaign"
run commit git -C "$SCAFFOLD" -c user.name=Claude -c user.email=noreply@anthropic.com commit --only "$campaign" -m "Record release preparation: $label" -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
git -C "$SCAFFOLD" diff --cached --binary -- "$publish" > "$output/publish-after.patch"
cmp "$output/publish-before.patch" "$output/publish-after.patch"
run push git -C "$SCAFFOLD" push origin HEAD:main HEAD:claude/orkestrel-npm-audit-deps-14ibta HEAD:claude/docs-parity-windows-01a0810d
run origin-main git -C "$SCAFFOLD" rev-parse origin/main
run origin-campaign git -C "$SCAFFOLD" rev-parse origin/claude/orkestrel-npm-audit-deps-14ibta
run origin-docs git -C "$SCAFFOLD" rev-parse origin/claude/docs-parity-windows-01a0810d
head="$(git -C "$SCAFFOLD" rev-parse HEAD)"
test "$(<"$output/origin-main.stdout.txt")" = "$head" || fail 'origin main differs from HEAD'
test "$(<"$output/origin-campaign.stdout.txt")" = "$head" || fail 'origin campaign differs from HEAD'
test "$(<"$output/origin-docs.stdout.txt")" = "$head" || fail 'origin docs differs from HEAD'
git -C "$SCAFFOLD" status --porcelain=v1 --branch > "$output/status-after.txt"
printf '%s\n' "$output"
