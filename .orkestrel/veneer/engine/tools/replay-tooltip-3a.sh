#!/usr/bin/env bash
# The Orchestrator's replay of the J-TOOLTIP round-3 instrument, part 1 of 4: the sanitizer, parser,
# helper, and guard rows (the fast files). The log is copied to
# units/j-tooltip-mutations-3-orchestrator-1.log.txt.
S="$(dirname "$0")"
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
bash "$S/w2-replay.sh" tooltip 3 \
	"the native sanitizer drops its configuration" \
	"the allowlist admits a global href" \
	"the allowlist loses an ARIA name" \
	"the allowlist admits data attributes" \
	"the unsupported refusal is removed" \
	"a hostile fallback array escapes" \
	"an unknown fallback member is skipped" \
	"a placement string is refused" \
	"one delay fills the show wait alone" \
	"the hover word turns on focus" \
	"the built tip stays attached" \
	"an element content is copied, not moved" \
	"the writer ignores html" \
	"the sanitize target guard is uncontained" \
	"an arrow that is not an HTML element is accepted"
cp "$U/j-tooltip-mutations-3-orchestrator.log.txt" "$U/j-tooltip-mutations-3-orchestrator-1.log.txt"
echo "wrapper exit=$?"
