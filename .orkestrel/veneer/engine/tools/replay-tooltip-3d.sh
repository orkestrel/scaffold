#!/usr/bin/env bash
# The Orchestrator's replay of the J-TOOLTIP round-3 instrument, part 4 of 4: the proof-binding rows
# the round-2 objective lane listed as unbound, over Tooltip.test.ts. The log is copied to
# units/j-tooltip-mutations-3-orchestrator-4.log.txt.
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
bash "$S/w2-replay.sh" tooltip 3 \
	"an invalid descendants selector is accepted" \
	"the promotion compensation is omitted" \
	"the offset is not passed" \
	"update is not forwarded" \
	"a prevented hide proceeds" \
	"a refused promotion is not cleaned up" \
	"the hide wait is dropped"
cp "$U/j-tooltip-mutations-3-orchestrator.log.txt" "$U/j-tooltip-mutations-3-orchestrator-4.log.txt"
echo "wrapper exit=$?"
