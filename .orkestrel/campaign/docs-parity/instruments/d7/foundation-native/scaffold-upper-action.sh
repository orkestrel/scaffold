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
case "$package" in scaffold) ;; *) fail 'package is outside the upper layer' ;; esac
case "$action" in
	catalog) command=(node dist/bin/main.js catalog);;
	lock) command=(npm install --package-lock-only --ignore-scripts);;
	install) command=(npm ci --ignore-scripts);;
	format) command=(npm run format);;
	prepublish) command=(npm run prepublishOnly);;
	check) command=(npm run check);;
	guides) command=(npm run test:guides);;
	pins) command=(node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/compilers.test.ts);;
	*) fail 'action is not supported';;
esac
[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be safe'; [[ "$cap" =~ ^[1-9][0-9]*s$ ]] || fail 'cap must be a positive whole-second timeout'
target="$FLEET/$package"; out="$SCR/$label"; test -d "$target/.git" || fail 'canonical target is absent'; test ! -e "$out" || fail 'evidence output exists'; test "$(node "$SCR/read-package-field.mjs" "$target/package.json" name)" = "@orkestrel/$package" || fail 'manifest name differs'
mkdir "$out"
capture before; status=0; if (cd "$target" && timeout --kill-after=15s "$cap" "${command[@]}") > "$out/action.stdout.txt" 2> "$out/action.stderr.txt"; then status=0; else status=$?; fi; printf '%s\n' "$status" > "$out/action.exit.txt"; capture after; printf '%s %s %s\n' "$out" "$action" "$status"; exit "$status"
