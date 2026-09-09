#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

publish=${1-}

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

validate() {
	local package="$1"
	local version="$2"
	local target="$FLEET/$package"
	local prepublish="$SCR/d7n-$package-final-prepublish"
	local packed="$SCR/packed/d7n-$package-publish-final"
	local archive="$packed/orkestrel-$package-$version.tgz"
	test -d "$target/.git" || fail "canonical package directory is absent: $target"
	test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail "package name differs: $package"
	test "$(node "$SCR/read-package-field.mjs" "$target/package.json" version)" = "$version" || fail "package version differs: $package"
	test "$(git -C "$target" branch --show-current)" = 'main' || fail "package is not on main: $package"
	test -z "$(git -C "$target" status --porcelain=v1 --untracked-files=all)" || fail "package tree is not clean: $package"
	git -C "$target" fetch origin
	test "$(git -C "$target" rev-parse HEAD)" = "$(git -C "$target" rev-parse origin/main)" || fail "package HEAD differs from origin/main: $package"
	test "$(<"$prepublish/action.exit.txt")" = '0' || fail "prepublish receipt differs: $package"
	test "$(<"$packed/pack.exit.txt")" = '0' || fail "pack receipt differs: $package"
	test -f "$archive" || fail "archive is absent: $archive"
	sha256sum --check "$packed/archive.sha256" > /dev/null
	cmp "$packed/extract/package/package.json" "$target/package.json"
	diff -r "$packed/extract/package/dist" "$target/dist" > /dev/null
}

test "$publish" = '--publish' || fail 'pass --publish to prepare the operator upload.'
test -t 0 || fail 'stdin must be a real terminal.'
test -t 1 || fail 'stdout must be a real terminal.'
printf '%s\n' 'Login approval and upload approval are separate.'
printf '%s\n' 'Open the currently printed approval URL promptly.'
printf '%s\n' 'Browser upload approval starts the 5-minute upload window.'

validate contract 0.0.17
validate codec 0.0.3
validate msg 0.0.10
validate sse 0.0.7
validate test 0.0.14

npm login --browser=false
npm whoami
npm publish "$SCR/packed/d7n-contract-publish-final/orkestrel-contract-0.0.17.tgz" --access public --ignore-scripts --browser=false
npm publish "$SCR/packed/d7n-codec-publish-final/orkestrel-codec-0.0.3.tgz" --access public --ignore-scripts --browser=false
npm publish "$SCR/packed/d7n-msg-publish-final/orkestrel-msg-0.0.10.tgz" --access public --ignore-scripts --browser=false
npm publish "$SCR/packed/d7n-sse-publish-final/orkestrel-sse-0.0.7.tgz" --access public --ignore-scripts --browser=false
npm publish "$SCR/packed/d7n-test-publish-final/orkestrel-test-0.0.14.tgz" --access public --ignore-scripts --browser=false
printf '%s\n' 'Upload commands completed; root registry confirmation remains required.'
