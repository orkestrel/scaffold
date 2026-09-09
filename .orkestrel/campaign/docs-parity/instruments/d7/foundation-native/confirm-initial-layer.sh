#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

out="$SCR/d7n-initial-layer-final-state"
test ! -e "$out"
mkdir "$out"

confirm() {
	local package="$1"
	local version="$2"
	local target="$FLEET/$package"
	local packed="$SCR/packed/d7n-$package-publish-final"
	local gated="$SCR/d7n-$package-final-prepublish"
	local record="$out/$package"
	mkdir "$record"
	git -C "$target" fetch origin > "$record/fetch.stdout.txt" 2> "$record/fetch.stderr.txt"
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
	test "$(<"$packed/baseline-dist.diff-qr.exit.txt")" = 0
	sha256sum --check "$packed/archive.sha256" > "$record/archive-check.txt"
	sha256sum --check "$gated/manifests-after.sha256" > "$record/manifest-check.txt"
	cmp "$packed/extract/package/package.json" "$target/package.json"
	diff -r "$packed/extract/package/dist" "$target/dist" > "$record/dist.diff.txt"
	printf '0\n' > "$record/confirmation.exit.txt"
	printf '%s %s main %s\n' "$package" "$version" "$(git -C "$target" rev-parse HEAD)"
}

confirm contract 0.0.17
confirm codec 0.0.3
confirm msg 0.0.10
confirm sse 0.0.7
confirm test 0.0.14
printf '0\n' > "$out/confirmation.exit.txt"
