#!/usr/bin/env bash
# Runs the whole mutation record in the landing copy: the unmutated control, every round-1
# mutation, every round-2 mutation, and the round-3 mutation, one log per run under logs/record/.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd /home/user/veneer-ud/tmp/units/ud-instruments-3/tools
python3 mutate.py record control \
	print-omitted print-screen print-before-walk display-value-omitted display-breakpoint-omitted \
	display-walk-reversed display-important-dropped flex-initial-value flex-justify-initial \
	flex-per-entry flex-important-dropped align-initial-value align-responsive \
	align-important-dropped stack-display-dropped stack-important stack-utilities-layer \
	flex-shrink-before-flex \
	display-mode-override vstack-direction-dropped hstack-center-dropped inline-style-added \
	section-residue-left label-bare label-trailing-bare
echo "record exit=$?"
