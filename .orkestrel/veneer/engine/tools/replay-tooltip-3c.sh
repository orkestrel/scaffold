#!/usr/bin/env bash
# The Orchestrator's replay of the J-TOOLTIP round-3 instrument, part 3 of 4: the descendant, arrow,
# vocabulary, and precedence rows over Tooltip.test.ts. The log is copied to
# units/j-tooltip-mutations-3-orchestrator-3.log.txt.
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
bash "$S/w2-replay.sh" tooltip 3 \
	"a failing descendant throws out of the listener" \
	"a consumer's descendant tooltip is driven" \
	"the arrow ignores the trigger center" \
	"the class group is ignored" \
	"the selector group is ignored" \
	"the constructor placement is ignored (precedence reversed)"
cp "$U/j-tooltip-mutations-3-orchestrator.log.txt" "$U/j-tooltip-mutations-3-orchestrator-3.log.txt"
echo "wrapper exit=$?"
