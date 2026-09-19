#!/usr/bin/env bash
# Orchestrator gate reading over unit S4-3's tree in the scaffold checkout, taken bare, after the
# build regenerates host.json and dist/host. Each stage logs to its own file; the summary prints
# exit codes and totals lines only.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
mkdir -p tmp/verify
step() {
	local name="$1"; shift
	"$@" > "tmp/verify/s4-3-${name}.log.txt" 2>&1
	local code=$?
	echo "${name}_EXIT=${code}"
	grep -E "Tests |Test Files|error|Error|passed|failed" "tmp/verify/s4-3-${name}.log.txt" | tail -3
}
step lintcheck npm run lint:check
step formatcheck npm run format:check
step check npm run check
step build npm run build
step policy npm run test:policy
step setup npm run test:setup
step core npm run test:src:core
step config npm run test:config
step guides npm run test:guides
step server npm run test:src:server
step bin npm run test:src:bin
echo "===== status after build ====="
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
