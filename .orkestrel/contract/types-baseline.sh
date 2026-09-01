#!/bin/bash
# Probe: tsc check-time diagnostics for @orkestrel/contract at 859d149.
# Run: bash types-baseline.sh
# Three runs per project; the reader takes medians from the printed rows.
# Control: the root project (includes tests) must report more types and
# instantiations than the scoped core project.
cd /home/user/contract || exit 1
for project in tsconfig.json configs/src/tsconfig.core.json; do
	echo "=== project: $project"
	for run in 1 2 3; do
		echo "--- run $run"
		npx tsc --noEmit --extendedDiagnostics -p "$project" 2>&1 \
			| grep -E "^(Files|Types|Instantiations|Memory used|Check time|Total time|Symbols):"
	done
done
