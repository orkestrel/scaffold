#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
target="$SCAFFOLD"
out="$SCR/$label"
accepted="$SCR/packed/d7n-scaffold-upper-git-final-pack/extract/package"

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

run() {
	local name="$1"
	local cap="$2"
	local status=0
	shift 2
	printf '%q ' "$@" > "$out/$name.command.txt"
	printf '\n' >> "$out/$name.command.txt"
	if (cd "$target" && timeout --kill-after=15s "$cap" "$@") > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	return "$status"
}

compare() {
	local name="$1"
	shift
	local status=0
	printf '%q ' "$@" > "$out/$name.command.txt"
	printf '\n' >> "$out/$name.command.txt"
	if "$@" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	case "$status" in
		0|1) ;;
		*) fail "comparison failed: $name" ;;
	esac
}

[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label is unsafe'
test ! -e "$out" || fail 'evidence exists'
test -d "$accepted/dist" || fail 'accepted distribution is absent'
test -f "$accepted/package.json" || fail 'accepted manifest is absent'
test "$(node "$SCR/read-package-field.mjs" "$accepted/package.json" version)" = 0.0.64 || fail 'accepted manifest version differs'
test "$(git -C "$target" branch --show-current)" = main || fail 'Scaffold is not on local main'

mkdir "$out"
capture before
run build 600s npm run build
capture after
compare dist-full diff -r "$accepted/dist" "$target/dist"
compare source-material diff -r -w --exclude='*.map' "$accepted/dist/src" "$target/dist/src"
compare bin-material diff -r -w --exclude='*.map' "$accepted/dist/bin" "$target/dist/bin"
compare host-strict diff -r "$accepted/dist/host" "$target/dist/host"
compare manifest-current cmp "$accepted/package.json" "$target/package.json"
printf '%s\n' "$out"
