#!/usr/bin/env bash
# Round 2: builds the styles and runs the named style proof files filtered by one test-name pattern,
# logging the command, the exit, and the load average.
# Usage: mfac-2-styles-run.sh <log-name> <pattern> <files...>
cd /home/user/veneer-mfac || exit 1
. tmp/units/mfac-env.sh
name="$1"; pattern="$2"; shift 2
log="tmp/units/mfac-2-$name.log.txt"
{
	echo "loadavg=$(cat /proc/loadavg)"
	echo "+ npm run build:src:styles"
	npm run build:src:styles > /dev/null 2>&1; echo "build-exit=$?"
	echo "+ npx vitest run --config configs/src/vite.styles.config.ts --reporter=verbose -t '$pattern' $*"
	npx vitest run --config configs/src/vite.styles.config.ts --reporter=verbose -t "$pattern" "$@"
	echo "exit=$?"
	echo "loadavg=$(cat /proc/loadavg)"
} > "$log" 2>&1
tail -n 25 "$log"
