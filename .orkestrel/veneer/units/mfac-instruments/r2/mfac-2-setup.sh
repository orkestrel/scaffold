#!/usr/bin/env bash
# Round 2: runs the setup:browser proof file, logging the command, the exit, and the load average.
# Usage: mfac-2-setup.sh <log-name> [extra vitest args...]
cd /home/user/veneer-mfac || exit 1
. tmp/units/mfac-env.sh
name="$1"; shift
log="tmp/units/mfac-2-$name.log.txt"
{
	echo "loadavg=$(cat /proc/loadavg)"
	echo "+ npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts $*"
	npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts "$@"
	echo "exit=$?"
	echo "loadavg=$(cat /proc/loadavg)"
} > "$log" 2>&1
tail -n 12 "$log"
