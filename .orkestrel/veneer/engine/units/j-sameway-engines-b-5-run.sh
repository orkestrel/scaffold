#!/usr/bin/env bash
# Runs one scratch copy under tmp/probe/<site>/ N times in Chromium and logs each run.
# Usage: run.sh <site> <count>
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b || exit 1
site="$1"
count="${2:-5}"
log="tmp/j-sameway-engines-b/logs/${site}.log.txt"
mkdir -p tmp/j-sameway-engines-b/logs
: > "$log"
for run in $(seq 1 "$count"); do
	echo "=== run $run ===" >> "$log"
	npx vitest run --config tmp/probe/vitest.probe.config.ts --no-cache "tmp/probe/${site}/" >> "$log" 2>&1
	echo "exit $?" >> "$log"
	if [ -f "tmp/probe/recording.json" ]; then
		mv "tmp/probe/recording.json" "tmp/j-sameway-engines-b/logs/${site}.run${run}.json"
	fi
done
grep -n "=== run\|^exit\|ResizeObserver loop\|Tests \| FAIL\|Unhandled\|This error originated\|The latest test that might" "$log"
