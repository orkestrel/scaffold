#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

out="$SCR/scaffold-compiler-host-fixture"

run_check() {
	local name="$1"
	local status=0
	shift
	"$@" > "$out/$name.log.txt" 2>&1 || status=$?
	printf '%s\n' "$status" > "$out/$name.exit.txt"
	test "$status" -eq 0
}

cd "$SCAFFOLD"
run_check focused node node_modules/vitest/vitest.mjs run tests/src/core/Compiler.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core
run_check lint node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings tests/src/core/Compiler.test.ts
run_check format node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/src/core/Compiler.test.ts
