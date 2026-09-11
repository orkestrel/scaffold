#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
label=${1-}
shift || true

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be safe'; test "$#" -gt 0 || fail 'package list is required'; out="$SCR/$label"; test ! -e "$out" || fail 'evidence output exists'; mkdir "$out"
declare -A queried=()
read_package() {
	local package="$1"
	local target="$FLEET/$package"
	local directory="$out/$package"
	local status=0
	[[ "$package" =~ ^[a-z][a-z0-9-]*$ ]] || fail 'package must be a lowercase bare name'
	case "$package" in agent|brief|browser|guide|interpret|lsp|mcp|middleware|ollama|probe|program|qualifier|queue|rater|relation|scaffold|sea|server|terminal|toolbox|worker|workflow|workspace) ;; *) fail 'package is outside the upper layer' ;; esac
	test -d "$target/.git" || fail "canonical target is absent: $package"
	test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail "manifest name differs: $package"
	mkdir "$directory"
	cp "$target/package.json" "$directory/package.json"
	sha256sum "$target/package-lock.json" > "$directory/package-lock.sha256"
	if timeout --kill-after=15s 60s git -C "$target" fetch origin > "$directory/fetch.stdout.txt" 2> "$directory/fetch.stderr.txt"; then status=0; else status=$?; fi
	printf '%s\n' "$status" > "$directory/fetch.exit.txt"
	test "$status" -eq 0
	git -C "$target" branch --show-current > "$directory/branch.txt"
	git -C "$target" rev-parse HEAD > "$directory/head.txt"
	git -C "$target" rev-parse origin/main > "$directory/origin-main.txt"
	status=0
	if git -C "$target" merge-base --is-ancestor origin/main HEAD > "$directory/ancestry.stdout.txt" 2> "$directory/ancestry.stderr.txt"; then status=0; else status=$?; fi
	printf '%s\n' "$status" > "$directory/ancestry.exit.txt"
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$directory/status.txt"
	while IFS= read -r dependency; do query "$dependency"; done < <(node "$SCR/read-layer-dependencies.mjs" "$target/package.json")
}
query(){ local package="$1"; [[ "$package" =~ ^[a-z][a-z0-9-]*$ ]] || fail 'declared package name is unsafe'; [[ ${queried[$package]+x} ]] && return; queried[$package]=1; timeout --kill-after=15s 60s npm view "@orkestrel/$package" --registry=https://registry.npmjs.org/ --json > "$out/registry-$package.stdout.txt" 2> "$out/registry-$package.stderr.txt" || { status=$?; printf '%s\n' "$status" > "$out/registry-$package.exit.txt"; return "$status"; }; printf '0\n' > "$out/registry-$package.exit.txt"; }
for package in "$@"; do read_package "$package"; query "$package"; done
printf '%s\n' "${!queried[@]}" | sort > "$out/registry-packages.txt"; printf '%s\n' "$out"
