#!/bin/bash
# One audit round for a package: the distill lane on Grok 4.6 (serialized on the grok lock) chained into the
# Sol objective lane, and the checker lane on Luna beside them. Usage: bash tmp/work/queue-round.sh <pkg> <round>
P=$1; N=$2; S=/home/user/scaffold; G=$S/tmp/work/grok5.sh; B=$S/tmp/cursor
CWD=/home/user/fleet/$P; [ "$P" = scaffold ] && CWD=$S
(
	BENCH_LOCK=.bench-grok.lock CURSOR_GROK_MODEL=cursor-grok-4.6-high bash $G $P-r$N-distill-grok $B/$P-r$N-distill-brief.md $CWD
	if [ -s "$B/$P-r$N-distill-grok.result.md" ]; then
		node $S/tmp/work/mkobjective.mjs $P $N
		bash $S/tmp/work/sol-lane.sh $P-r$N-objective-sol $B/$P-r$N-objective-brief.md $CWD .bench-sol-$P.lock
	else
		printf '%s DISTILL-EMPTY unit=%s-r%s-distill-grok\n' "$(date -u +%H:%M:%S)" "$P" "$N" >> $B/npm-shim.log
	fi
) > $S/tmp/work/round-$P-r$N-distill.log 2>&1 &
(
	BENCH_LOCK=.bench-luna-$P.lock CURSOR_GROK_MODEL=gpt-5.6-luna-high bash $G $P-r$N-checker-luna $B/$P-r$N-checker-brief.md $CWD
) > $S/tmp/work/round-$P-r$N-checker.log 2>&1 &
