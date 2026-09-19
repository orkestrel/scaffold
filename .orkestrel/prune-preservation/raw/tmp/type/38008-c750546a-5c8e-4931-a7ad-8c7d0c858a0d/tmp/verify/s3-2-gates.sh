#!/usr/bin/env bash
# Orchestrator gate reading over unit S3-2's tree: the host inventory regenerated over the one
# vendored byte change (dist/src is current from the s3 build), then the projects that read it and
# the skill sweep, then the non-mutating format and lint checks. Each stage logs to its own file.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
step() {
	local name="$1"; shift
	"$@" > "tmp/verify/s3-2-${name}.log.txt" 2>&1
	local code=$?
	echo "${name}_EXIT=${code}"
	sed 's/\x1b\[[0-9;]*m//g' "tmp/verify/s3-2-${name}.log.txt" | grep -E "Tests |Test Files|error|Error|staged|Finished|correct format" | tail -3
}
step buildhost npm run build:host
step buildinventory npm run build:inventory
step policy npm run test:policy
step config npm run test:config
step formatcheck npm run format:check
step lintcheck npm run lint:check
echo "===== status ====="
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "(end status)"
