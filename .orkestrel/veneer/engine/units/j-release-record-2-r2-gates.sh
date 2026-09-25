#!/usr/bin/env bash
# Round 2: runs the read-only acceptance gates one after another, logging each under
# tmp/j-release-record/logs/r2-gate-<script>.log.txt, and prints each exit code with its summary.
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record || exit 1
for script in check lint:check format:check test:guides test:setup:browser; do
	log="tmp/j-release-record/logs/r2-gate-${script//:/-}.log.txt"
	npm run "$script" >"$log" 2>&1
	echo "npm run $script: exit $?"
	grep -E "Test Files|Tests |All matched files|Found [0-9]+ warning|error" "$log" | sed 's/\x1b\[[0-9;]*m//g' | head -5
done
