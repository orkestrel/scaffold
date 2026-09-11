#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

label=${1-}

fail() {
	printf '%s\n' "$1" >&2
	exit 1
}

[[ "$label" =~ ^[[:alnum:]][[:alnum:]._-]*$ ]] || fail 'evidence label must be safe'
test "$#" = 1 || fail 'evidence label is required'
out="$SCR/$label"
test ! -e "$out" || fail 'evidence output exists'
mkdir "$out"
status=0
if (cd "$SCAFFOLD" && node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --reporter=verbose --project src:bin tests/src/bin/CLI.test.ts -t 'reports only the missing shared test tool for an app-only workspace') > "$out/action.stdout.txt" 2> "$out/action.stderr.txt"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/action.exit.txt"
exit "$status"
