#!/usr/bin/env bash
# Waits for a detached codex exec lane to finish: its last-message file is non-empty, or its pid is
# gone. Arguments: unit name (files under scaffold/tmp/codex/<unit>*). Waits for the pid file first.
UNIT="$1"
DIR=/c/Users/mikes/WebstormProjects/scaffold/tmp/codex
for _ in 1 2 3 4 5 6; do
	[ -s "$DIR/$UNIT.pid" ] && break
	sleep 5
done
PID=$(cat "$DIR/$UNIT.pid" 2>/dev/null | tr -d '[:space:]')
if [ -z "$PID" ]; then
	echo "$UNIT: no pid file after 30 s"
	exit 3
fi
while true; do
	if [ -s "$DIR/$UNIT-last.md" ]; then
		echo "$UNIT: last message written ($(wc -c < "$DIR/$UNIT-last.md") bytes; journal $(wc -c < "$DIR/$UNIT.jsonl") bytes)"
		exit 0
	fi
	if ! tasklist //FI "PID eq $PID" 2>/dev/null | grep -q "$PID"; then
		sleep 5
		if [ -s "$DIR/$UNIT-last.md" ]; then
			echo "$UNIT: last message written ($(wc -c < "$DIR/$UNIT-last.md") bytes; journal $(wc -c < "$DIR/$UNIT.jsonl") bytes)"
			exit 0
		fi
		echo "$UNIT: pid $PID gone without a last message (journal $(wc -c < "$DIR/$UNIT.jsonl") bytes; err $(wc -c < "$DIR/$UNIT.err") bytes)"
		exit 2
	fi
	sleep 20
done
