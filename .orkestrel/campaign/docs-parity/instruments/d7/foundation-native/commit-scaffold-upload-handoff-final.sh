#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
output="$SCR/$label"
campaign=.orkestrel/campaign/docs-parity
prompt=prompt.txt
verdict="$SCAFFOLD/$campaign/d7n-scaffold-upload-handoff-verdict.md"
prepublish="$SCR/d7n-scaffold-upper-git-final-prepublish"
parse="$SCR/d7n-scaffold-upload-prompt-parse"
pack="$SCR/packed/d7n-scaffold-upper-git-final-pack"
archive="$pack/orkestrel-scaffold-0.0.64.tgz"
digest=a4e7078da602619e54384dbc7bdddaf25a2fdc6af0842a55004b8328365b8be7
head=d2175dfe17a2c5b4ec6b4903077287833e9f0786

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

run() {
	local name="$1"
	shift
	local status=0
	if timeout --kill-after=15s 120s "$@" > "$output/$name.stdout.txt" 2> "$output/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$output/$name.exit.txt"
	return "$status"
}

[[ "$label" =~ ^[a-z][a-z0-9-]*$ ]] || fail 'record label is required'
test ! -e "$output" || fail 'checkpoint evidence exists'
test "$(<"$prepublish/action.exit.txt")" = 0 || fail 'Scaffold prepublish receipt differs'
test "$(tr -d '\r\357\273\277' < "$parse/parse.exit.txt")" = 0 || fail 'Scaffold prompt parser receipt differs'
test -f "$verdict" || fail 'Scaffold upload handoff verdict is absent'
grep -Fx 'VERDICT: PASS' "$verdict" > /dev/null || fail 'Scaffold upload handoff verdict does not pass'
test -f "$SCAFFOLD/$prompt" || fail 'Scaffold prompt is absent'
test "$(node "$SCR/read-package-field.mjs" "$SCAFFOLD/package.json" version)" = 0.0.64 || fail 'Scaffold manifest version differs'
test -f "$archive" || fail 'Scaffold packed archive is absent'

mkdir "$output"
run branch-before git -C "$SCAFFOLD" branch --show-current
test "$(<"$output/branch-before.stdout.txt")" = main || fail 'Scaffold must be on main'
run head-before git -C "$SCAFFOLD" rev-parse HEAD
test "$(<"$output/head-before.stdout.txt")" = "$head" || fail 'Scaffold release HEAD differs'
run index-before git -C "$SCAFFOLD" diff --cached --quiet
test "$(<"$output/index-before.exit.txt")" = 0 || fail 'Scaffold has staged input'
run prompt-directory grep -F "cd 'C:/Users/mikes/WebstormProjects/scaffold'" "$SCAFFOLD/$prompt"
test "$(<"$output/prompt-directory.exit.txt")" = 0 || fail 'Scaffold prompt lacks the canonical directory'
run prompt-publish grep -F 'npm publish --ignore-scripts --browser=false' "$SCAFFOLD/$prompt"
test "$(<"$output/prompt-publish.exit.txt")" = 0 || fail 'Scaffold prompt lacks the canonical publish command'
mapfile -t directories < <(grep -oE 'C:/Users/mikes/WebstormProjects/[^ '\'';)]+' "$SCAFFOLD/$prompt")
for directory in "${directories[@]}"; do
	test "$directory" = C:/Users/mikes/WebstormProjects/scaffold || fail "Scaffold prompt names a sibling upload directory: $directory"
done
run before-manifest cmp "$pack/extract/package/package.json" "$SCAFFOLD/package.json"
test "$(<"$output/before-manifest.exit.txt")" = 0 || fail 'Scaffold manifest differs from the packed artifact'
run before-dist diff -r "$pack/extract/package/dist" "$SCAFFOLD/dist"
test "$(<"$output/before-dist.exit.txt")" = 0 || fail 'Scaffold distribution differs from the packed artifact'
run archive-sha256 sha256sum "$archive"
run archive-digest awk -v expected="$digest" '$1 == expected { found = 1 } END { exit found ? 0 : 1 }' "$output/archive-sha256.stdout.txt"
test "$(<"$output/archive-digest.exit.txt")" = 0 || fail 'Scaffold packed archive digest differs'
run status-before git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all
while IFS= read -r entry; do
	path="${entry:3}"
	case "$path" in
		"$prompt"|"$campaign"/*) ;;
		*) fail "unrelated change: $path" ;;
	esac
done < "$output/status-before.stdout.txt"
run fetch git -C "$SCAFFOLD" fetch origin
test "$(<"$output/fetch.exit.txt")" = 0 || fail 'Scaffold origin fetch failed'
run ancestry git -C "$SCAFFOLD" merge-base --is-ancestor origin/main HEAD
test "$(<"$output/ancestry.exit.txt")" = 0 || fail 'Scaffold origin main is not an ancestor'
run check git -C "$SCAFFOLD" diff --check
test "$(<"$output/check.exit.txt")" = 0 || fail 'Scaffold diff check failed'
run add git -C "$SCAFFOLD" add -- "$campaign" "$prompt"
test "$(<"$output/add.exit.txt")" = 0 || fail 'Scaffold staging failed'
run commit git -C "$SCAFFOLD" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m "Record Scaffold upload handoff: $label" -m 'Co-Authored-By: Claude <noreply@anthropic.com>' -m 'Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743'
test "$(<"$output/commit.exit.txt")" = 0 || fail 'Scaffold handoff commit failed'
run push git -C "$SCAFFOLD" push origin HEAD:main HEAD:claude/orkestrel-npm-audit-deps-14ibta HEAD:claude/docs-parity-windows-01a0810d
test "$(<"$output/push.exit.txt")" = 0 || fail 'Scaffold handoff push failed'
run origin-main git -C "$SCAFFOLD" rev-parse origin/main
run origin-campaign git -C "$SCAFFOLD" rev-parse origin/claude/orkestrel-npm-audit-deps-14ibta
run origin-docs git -C "$SCAFFOLD" rev-parse origin/claude/docs-parity-windows-01a0810d
run head-after git -C "$SCAFFOLD" rev-parse HEAD
current="$(<"$output/head-after.stdout.txt")"
test "$(<"$output/origin-main.stdout.txt")" = "$current" || fail 'origin main differs from HEAD'
test "$(<"$output/origin-campaign.stdout.txt")" = "$current" || fail 'origin campaign differs from HEAD'
test "$(<"$output/origin-docs.stdout.txt")" = "$current" || fail 'origin docs differs from HEAD'
run after-manifest cmp "$pack/extract/package/package.json" "$SCAFFOLD/package.json"
test "$(<"$output/after-manifest.exit.txt")" = 0 || fail 'Scaffold manifest differs after push'
run after-dist diff -r "$pack/extract/package/dist" "$SCAFFOLD/dist"
test "$(<"$output/after-dist.exit.txt")" = 0 || fail 'Scaffold distribution differs after push'
run branch-after git -C "$SCAFFOLD" branch --show-current
test "$(<"$output/branch-after.stdout.txt")" = main || fail 'Scaffold is not on main after push'
run status-after git -C "$SCAFFOLD" status --porcelain=v1 --untracked-files=all
test ! -s "$output/status-after.stdout.txt" || fail 'Scaffold is not clean'
printf '%s\n' "$output"
