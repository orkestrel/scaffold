#!/usr/bin/env bash
# The Orchestrator's replay of the J-TOOLTIP round-3 instrument, part 2 of 4: the build-door, hide,
# move-back, and fill rows over Tooltip.test.ts. The log is copied to
# units/j-tooltip-mutations-3-orchestrator-2.log.txt.
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
bash "$S/w2-replay.sh" tooltip 3 \
	"the build reads no door between a content function and its move" \
	"hide removes a relocated tip" \
	"no record precedes the move" \
	"an engine-displaced element is not restored" \
	"fill resolves after destruction" \
	"a second platform close is prevented again"
cp "$U/j-tooltip-mutations-3-orchestrator.log.txt" "$U/j-tooltip-mutations-3-orchestrator-2.log.txt"
echo "wrapper exit=$?"
