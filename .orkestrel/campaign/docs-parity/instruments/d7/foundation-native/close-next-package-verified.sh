#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1-}
expected=${2-}
version=${3-}
visit=${4-}
label=${5-}
target="$FLEET/$package"
out="$SCR/$label"

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

capture() {
	local suffix="$1"
	git -C "$target" branch --show-current > "$out/branch-$suffix.txt"
	git -C "$target" rev-parse HEAD > "$out/head-$suffix.txt"
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-$suffix.txt"
	git -C "$target" diff HEAD --binary > "$out/diff-$suffix.txt"
	git -C "$target" ls-files --stage > "$out/index-$suffix.txt"
	sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-$suffix.sha256"
}

run_command() {
	local name="$1"
	local cap="$2"
	shift 2
	local status=0
	if timeout --kill-after=15s "$cap" "$@" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	return "$status"
}

case "$package" in
	abort|budget|csv|emitter|html|indexeddb|ndjson|sqlite|timeout|tool) ;;
	*) fail 'package is outside the confirmed next layer' ;;
esac
[[ "$expected" =~ ^[0-9a-f]{40}$ ]] || fail 'expected source HEAD is unsafe'
[[ "$version" =~ ^0\.0\.[0-9]+$ ]] || fail 'pending version is unsafe'
[[ "$visit" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'visit label is unsafe'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'closure label is unsafe'
test -d "$target/.git" || fail 'canonical target is absent'
test ! -e "$out" || fail 'closure evidence exists'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'manifest name differs'
test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = "$version" || fail 'manifest version differs'
test "$(git -C "$target" branch --show-current)" = claude/orkestrel-npm-audit-deps-14ibta || fail 'campaign branch differs'
test "$(git -C "$target" rev-parse HEAD)" = "$expected" || fail 'source HEAD differs'
git -C "$target" diff --cached --quiet || fail 'staged input is refused'
test -z "$(git -C "$target" ls-files --others --exclude-standard)" || fail 'untracked input is refused'

pack="$SCR/packed/$visit-pack"
prepublish="$SCR/$visit-prepublish"
test "$(<"$SCR/$visit/pack.exit.txt")" = 0 || fail 'visit pack failed'
test "$(<"$prepublish/action.exit.txt")" = 0 || fail 'visit prepublish failed'
cmp "$pack/manifests-after.sha256" <(sha256sum "$target/package.json" "$target/package-lock.json")
cmp "$pack/diff-after.txt" <(git -C "$target" diff HEAD --binary)
cmp "$pack/index-after.txt" <(git -C "$target" ls-files --stage)
test ! -e "$target/scripts/docs.ts" || fail 'retired docs script remains'

mkdir "$out"
capture before
run_command packed-manifest 60s cmp "$pack/extract/package/package.json" "$target/package.json"
run_command packed-dist 120s diff -r "$pack/extract/package/dist" "$target/dist"
run_command archive-sha256 60s sha256sum --check "$pack/archive.sha256"
run_command metadata 60s node "$SCR/validate-next-release.mjs" "$target/package.json" "$package" "$version"
run_command fetch 60s git -C "$target" fetch origin
run_command ancestry 60s git -C "$target" merge-base --is-ancestor origin/main HEAD
mapfile -t changed < <(git -C "$target" diff --name-only HEAD)
test "${#changed[@]}" -gt 0 || fail 'no tracked preparation paths exist'
for path in "${changed[@]}"; do
	case "$path" in
		package.json|package-lock.json|.claude/agents/orkestrel.md) ;;
		guides/*.md) test "$path" != "guides/$package.md" || fail 'package-owned guide changed' ;;
		scripts/docs.ts) test ! -e "$target/scripts/docs.ts" || fail 'retired docs path was not deleted' ;;
		*) fail "changed path is not allowed: $path" ;;
	esac
done
for path in "${changed[@]}"; do
	git -C "$target" add -- "$path"
done
run_command commit 120s git -C "$target" -c user.name=Claude -c user.email=noreply@anthropic.com commit -m "Prepare $package release" -m "Co-Authored-By: Claude <noreply@anthropic.com>" -m "Claude-Session: codex:01a0810d-21bf-7f60-8534-488348e05743"
release="$(git -C "$target" rev-parse HEAD)"
printf '%s\n' "$release" > "$out/release-head.txt"
run_command push-campaign 120s git -C "$target" push -u origin claude/orkestrel-npm-audit-deps-14ibta
run_command push-main 120s git -C "$target" push origin HEAD:main
test -z "$(git -C "$target" status --porcelain=v1 --untracked-files=all)" || fail 'campaign ref is not clean'
if git -C "$target" show-ref --verify --quiet refs/heads/main; then
	run_command switch-main 60s git -C "$target" switch main
	run_command merge-main 60s git -C "$target" merge --ff-only origin/main
else
	status=$?
	test "$status" -eq 1 || fail 'main reference read failed'
	run_command create-main 60s git -C "$target" switch -c main --track origin/main
fi
test "$(git -C "$target" branch --show-current)" = main || fail 'local main is absent'
test -z "$(git -C "$target" status --porcelain=v1 --untracked-files=all)" || fail 'local main is not clean'
test "$(git -C "$target" rev-parse HEAD)" = "$release" || fail 'local main differs from release'
run_command ref-origin-main 60s git -C "$target" rev-parse origin/main
run_command ref-campaign 60s git -C "$target" rev-parse refs/heads/claude/orkestrel-npm-audit-deps-14ibta
run_command ref-origin-campaign 60s git -C "$target" rev-parse origin/claude/orkestrel-npm-audit-deps-14ibta
for receipt in ref-origin-main ref-campaign ref-origin-campaign; do
	test "$(<"$out/$receipt.stdout.txt")" = "$release" || fail "release ref differs: $receipt"
done
capture after
run_command final-head 60s git -C "$target" rev-parse HEAD
test "$(<"$out/final-head.stdout.txt")" = "$release" || fail 'local main differs from release'
run_command final-manifest 60s cmp "$pack/extract/package/package.json" "$target/package.json"
run_command final-dist 120s diff -r "$pack/extract/package/dist" "$target/dist"
printf '%s\n' "$out"
