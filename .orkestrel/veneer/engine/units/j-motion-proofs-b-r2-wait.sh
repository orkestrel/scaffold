#!/usr/bin/env bash
# Round 2: waits up to 540 seconds for a log to contain a line matching a pattern, then prints the log.
#
# Usage: bash tmp/j-motion-proofs-b/r2-wait.sh <log> <pattern>
set -u
log="$1"
pattern="$2"
deadline=$((SECONDS + 540))
until grep -qE "$pattern" "$log" 2>/dev/null; do
	if [ "$SECONDS" -ge "$deadline" ]; then
		echo "still waiting after 540 s"
		break
	fi
	sleep 5
done
cat "$log"
