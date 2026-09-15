#!/usr/bin/env bash
# Orchestrator tracked command: converge lint and format on the A1-fix tree, then read every scoped gate bare.
cd /c/Users/mikes/WebstormProjects/agent || exit 9
OUT=/c/Users/mikes/WebstormProjects/scaffold/tmp/units/a1-fix-gates.log.txt
: > "$OUT"
run() {
	echo "=== $*" >> "$OUT"
	"$@" >> "$OUT" 2>&1
	local code=$?
	echo "=== exit=$code" >> "$OUT"
	echo "$* -> exit $code"
}
run npm run lint
run npm run format
run npm run format:check
run npm run lint:check
run npm run check
run npm run test:src:core
run npm run test:setup
run npm run build
grep -E "Test Files|Tests " "$OUT"
git diff --stat | tail -1
