#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || { printf '%s\n' 'output label must be safe' >&2; exit 1; }
out="$SCR/$label"
test ! -e "$out"
mkdir "$out"

confirm() {
	local package="$1"
	local version="$2"
	local packed="$SCR/packed/d7n-$package-final-registry-visit-pack"
	local gated="$SCR/d7n-$package-final-registry-visit-prepublish"
	local closure="$SCR/d7n-$package-registry-close"
	local target="$FLEET/$package"
	local record="$out/$package"
	mkdir "$record"
	local status=0
	if timeout --kill-after=15s 60s git -C "$target" fetch origin > "$record/fetch.stdout.txt" 2> "$record/fetch.stderr.txt"; then status=0; else status=$?; fi
	printf '%s\n' "$status" > "$record/fetch.exit.txt"
	test "$status" = 0
	git -C "$target" rev-parse HEAD origin/main origin/claude/orkestrel-npm-audit-deps-14ibta > "$record/refs.txt"
	git -C "$target" branch --show-current > "$record/branch.txt"
	git -C "$target" status --porcelain=v1 --untracked-files=all > "$record/status.txt"
	test ! -s "$record/status.txt"
	test "$(<"$record/branch.txt")" = main
	test "$(git -C "$target" rev-parse HEAD)" = "$(git -C "$target" rev-parse origin/main)"
	test "$(git -C "$target" rev-parse HEAD)" = "$(git -C "$target" rev-parse origin/claude/orkestrel-npm-audit-deps-14ibta)"
	test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package"
	test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = "$version"
	test "$(<"$gated/action.exit.txt")" = 0
	test "$(<"$packed/pack.exit.txt")" = 0
	test "$(git -C "$target" rev-parse HEAD)" = "$(<"$closure/release-head.txt")"
	test "$(<"$closure/final-manifest.exit.txt")" = 0
	test "$(<"$closure/final-dist.exit.txt")" = 0
	sha256sum --check "$packed/archive.sha256" > "$record/archive-check.txt"
	sha256sum --check "$gated/manifests-after.sha256" > "$record/manifest-check.txt"
	cmp "$packed/extract/package/package.json" "$target/package.json"
	diff -r "$packed/extract/package/dist" "$target/dist" > "$record/dist.diff.txt"
	printf '0\n' > "$record/confirmation.exit.txt"
	printf '%s %s main %s\n' "$package" "$version" "$(git -C "$target" rev-parse HEAD)"
}

confirm agent 0.0.21
confirm probe 0.0.13
printf '0\n' > "$out/confirmation.exit.txt"
