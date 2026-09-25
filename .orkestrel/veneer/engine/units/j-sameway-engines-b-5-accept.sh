#!/usr/bin/env bash
# Acceptance criterion 3: five consecutive whole-file runs of each owned test file, through the
# src:browser project, each read for a reported ResizeObserver loop.
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b || exit 1
mkdir -p tmp/j-sameway-engines-b/logs
for file in Tooltip Popover; do
	log="tmp/j-sameway-engines-b/logs/accept-${file}.log.txt"
	: > "$log"
	for run in 1 2 3 4 5; do
		echo "=== ${file} run ${run} ===" >> "$log"
		npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/${file}.test.ts" >> "$log" 2>&1
		echo "exit $?" >> "$log"
	done
	echo "${file}: loop lines $(grep -c 'ResizeObserver loop' "$log")"
	grep "=== \|Tests \|^exit" "$log"
done
