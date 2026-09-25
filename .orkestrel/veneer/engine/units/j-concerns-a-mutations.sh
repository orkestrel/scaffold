#!/usr/bin/env bash
# Applies each named mutation to its engine source, runs that engine's whole test file, records the
# failing cases and the counts, and restores the pristine source with its digest checked.
# Usage: bash tmp/j-concerns-a/mutations.sh <mutation>... ; the log is tmp/j-concerns-a/mutations.log.txt
set -u
cd "$(dirname "$0")/../.."
log=${LOG:-tmp/j-concerns-a/mutations.log.txt}
for mutation in "$@"; do
	case "$mutation" in
		scrollspy-*) file=tests/src/browser/ScrollSpy.test.ts ;;
		button-*) file=tests/src/browser/Button.test.ts ;;
		*) echo "unknown $mutation" >> "$log"; continue ;;
	esac
	{
		echo "=== $mutation against $file"
		node tmp/j-concerns-a/mutate.cjs "$mutation"
		NO_COLOR=1 FORCE_COLOR=0 npx vitest run --config vite.config.ts --no-cache --project src:browser "$file" 2>&1 \
			| grep -E -A14 "^ FAIL |Test Files|Tests  " \
			| grep -v -E "^npm notice|^ *❯|^ *[0-9]+\| |^ *\|" | head -120
		echo "exit=${PIPESTATUS[0]}"
		node tmp/j-concerns-a/mutate.cjs restore
	} >> "$log" 2>&1
done
