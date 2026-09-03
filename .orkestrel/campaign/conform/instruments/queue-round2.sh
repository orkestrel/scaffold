#!/bin/bash
# Round runner while the Cursor API models are dark (23:03 UTC, usage limit until 2026-09-16): the distill and the
# checker both run on Cursor Grok 4.6 across the two Grok locks, the evidence regenerates first, and the objective
# lane is dispatched by the Orchestrator on the native Opus reviewer when DISTILL-READY appears in the shim log.
# Usage: bash tmp/work/queue-round2.sh <pkg> <round> [distill lock] [checker lock]
P=$1; N=$2; S=/home/user/scaffold; G=$S/tmp/work/grok5.sh; B=$S/tmp/cursor
CWD=/home/user/fleet/$P; [ "$P" = scaffold ] && CWD=$S
node $S/tmp/work/evidence.mjs $P > $S/tmp/work/round-$P-r$N-evidence.log 2>&1
(
	BENCH_LOCK=${3:-.bench-grok.lock} CURSOR_GROK_MODEL=cursor-grok-4.6-high bash $G $P-r$N-distill-grok $B/$P-r$N-distill-brief.md $CWD
	if [ -s "$B/$P-r$N-distill-grok.result.md" ]; then
		printf '%s DISTILL-READY unit=%s-r%s-distill-grok\n' "$(date -u +%H:%M:%S)" "$P" "$N" >> $B/npm-shim.log
	else
		printf '%s DISTILL-EMPTY unit=%s-r%s-distill-grok\n' "$(date -u +%H:%M:%S)" "$P" "$N" >> $B/npm-shim.log
	fi
) > $S/tmp/work/round-$P-r$N-distill.log 2>&1 &
(
	BENCH_LOCK=${4:-.bench-grok-2.lock} CURSOR_GROK_MODEL=cursor-grok-4.6-high bash $G $P-r$N-checker-grok $B/$P-r$N-checker-brief.md $CWD
) > $S/tmp/work/round-$P-r$N-checker.log 2>&1 &
