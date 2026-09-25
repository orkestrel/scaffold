#!/usr/bin/env bash
# Round 3 successor of mutations.sh: identical, except that it drives mutate-3.cjs and strips colour
# codes from its log. Applies each named mutation, runs that engine's whole test file, records the
# failing cases and the counts, and restores the pristine source with its digest checked.
# Usage: LOG=<path> bash tmp/j-concerns-a/mutations-3.sh <mutation>...
set -u
cd "$(dirname "$0")/../.."
log=${LOG:-tmp/j-concerns-a/round3/mutations.log.txt}
for mutation in "$@"; do
	case "$mutation" in
		scrollspy-*) file=tests/src/browser/ScrollSpy.test.ts ;;
		button-*) file=tests/src/browser/Button.test.ts ;;
		*) echo "unknown $mutation" >> "$log"; continue ;;
	esac
	{
		echo "=== $mutation against $file"
		node tmp/j-concerns-a/mutate-3.cjs "$mutation"
		NO_COLOR=1 FORCE_COLOR=0 npx vitest run --config vite.config.ts --no-cache --project src:browser "$file" 2>&1 \
			| sed 's/\x1b\[[0-9;]*m//g' \
			| grep -E -A14 "^ FAIL |Test Files|Tests  " \
			| grep -v -E "^npm notice|^ *❯|^ *[0-9]+\| |^ *\|" | head -120
		echo "exit=${PIPESTATUS[0]}"
		node tmp/j-concerns-a/mutate-3.cjs restore
	} >> "$log" 2>&1
done
