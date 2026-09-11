#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
out="$SCR/d7n-dependent-supported-lookup-input"
test ! -e "$out"
mkdir "$out"
for pair in 'typescript ^6.0.3' 'vitest ^4.1.11' 'oxfmt ^0.66.0'; do
	set -- $pair
	status=0
	if (cd "$FLEET/brief" && timeout --kill-after=15s 120s node "$SCR/read-supported-toolchain.mjs" "$1" "$2") > "$out/$1.stdout.txt" 2> "$out/$1.stderr.txt"; then status=0; else status=$?; fi
	printf '%s\n' "$status" > "$out/$1.exit.txt"
	test "$status" = 0
done
printf '%s\n' "$out"
