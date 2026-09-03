#!/bin/bash
# The distill-to-objective chain alone (the checker already ran): bash tmp/work/queue-distill.sh <pkg> <round> [grok lock]
P=$1; N=$2; S=/home/user/scaffold; G=$S/tmp/work/grok5.sh; B=$S/tmp/cursor
CWD=/home/user/fleet/$P; [ "$P" = scaffold ] && CWD=$S
(
	BENCH_LOCK=${3:-.bench-grok-2.lock} CURSOR_GROK_MODEL=cursor-grok-4.6-high bash $G $P-r$N-distill-grok $B/$P-r$N-distill-brief.md $CWD
	if [ -s "$B/$P-r$N-distill-grok.result.md" ]; then
		node $S/tmp/work/mkobjective.mjs $P $N
		bash $S/tmp/work/sol-lane.sh $P-r$N-objective-sol $B/$P-r$N-objective-brief.md $CWD .bench-sol-$P.lock
	else
		printf '%s DISTILL-EMPTY unit=%s-r%s-distill-grok\n' "$(date -u +%H:%M:%S)" "$P" "$N" >> $B/npm-shim.log
	fi
) > $S/tmp/work/round-$P-r$N-distill.log 2>&1 &
