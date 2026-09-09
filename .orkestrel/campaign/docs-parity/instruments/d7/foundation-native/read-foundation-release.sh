#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

run_reading() {
	local name="$1"
	shift
	local status=0
	if "$@" > "$out/$name.stdout.txt" 2> "$out/$name.stderr.txt"; then
		status=0
	else
		status=$?
	fi
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	return "$status"
}

read_repository() {
	local package="$1"
	local target="$FLEET/$package"
	local evidence="$out/$package"
	test -d "$target/.git" || fail "canonical package directory is absent: $target"
	mkdir "$evidence"
	if timeout --kill-after=15s 60s git -C "$target" fetch origin > "$evidence/fetch.stdout.txt" 2> "$evidence/fetch.stderr.txt"; then
		printf '0\n' > "$evidence/fetch.exit.txt"
	else
		status=$?
		printf '%s\n' "$status" > "$evidence/fetch.exit.txt"
		return "$status"
	fi
	git -C "$target" branch --show-current > "$evidence/branch.txt"
	git -C "$target" rev-parse HEAD > "$evidence/head.txt"
	git -C "$target" rev-parse origin/main > "$evidence/origin-main.txt"
	if git -C "$target" merge-base --is-ancestor origin/main HEAD > "$evidence/ancestry.stdout.txt" 2> "$evidence/ancestry.stderr.txt"; then
		printf '0\n' > "$evidence/ancestry.exit.txt"
	else
		status=$?
		printf '%s\n' "$status" > "$evidence/ancestry.exit.txt"
	fi
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$evidence/status.txt"
	cp "$target/package.json" "$evidence/package.json"
}

test -n "$label" || fail 'evidence label is required'
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be a safe filename segment'
out="$SCR/$label"
test ! -e "$out" || fail "evidence directory exists: $out"
mkdir "$out"
node --version > "$out/node-version.txt"
npm --version > "$out/npm-version.txt"

for package in codec contract msg sse test guide scaffold; do
	if run_reading "registry-$package" timeout --kill-after=15s 60s npm view "@orkestrel/$package" --registry=https://registry.npmjs.org/ --json; then
		:
	else
		exit $?
	fi
done
for package in codec contract msg sse test guide scaffold; do
	if read_repository "$package"; then
		:
	else
		exit $?
	fi
done
printf '%s\n' "$out"
