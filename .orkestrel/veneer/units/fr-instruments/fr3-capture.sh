#!/usr/bin/env bash
# Runs one filtered CAPTURE=1 journey variant over this unit's cases. Usage: fr2-capture.sh <variant>
V="$1"
P="rings the switch|holds each pressed form control|hovers the file control|floats the empty textarea|lifts the focused grouped button|lifts the grouped select|focuses each plaintext control|rings each validated select|reads every resting cascade key"
LOG=/home/user/veneer-fr/tmp/units/fr3-capture-$V-filtered.log.txt
{
	echo "command: CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project \"journey:$V*\" -t \"$P\""
	timeout 1800 /home/user/veneer-fr/tmp/units/fr-run.sh env CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:$V*" -t "$P"
	echo "exit $?"
} > "$LOG" 2>&1
