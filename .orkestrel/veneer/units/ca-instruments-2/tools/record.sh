#!/usr/bin/env bash
# Runs the unmutated control and every styles mutation against the shipped carousel proof, then the
# unmutated control and every section mutation against the shipped section proof, one log per row,
# and rebuilds the styles at the end so dist matches the unmutated partial.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
T=/home/user/veneer-ca/tmp/units/ca-instruments-2
cd /home/user/veneer-ca/tmp/probe/base
python3 -u $T/tools/mutate.py none \
	item-display-block active-display-dropped next-display-dropped prev-display-dropped \
	next-guard-dropped prev-guard-dropped active-end-dropped active-start-dropped \
	fade-item-opacity-dropped fade-active-dropped fade-incoming-dropped fade-prev-incoming-dropped \
	fade-delay-dropped fade-bare-transition item-bare-transition control-bare-transition \
	indicator-bare-transition control-literal-duration control-literal-filter prev-left-dropped \
	next-right-dropped hover-dropped focus-dropped icons-swapped indicator-border-box \
	indicator-literal-inset active-pip-dropped caption-literal-white dark-omits-filter \
	pointer-event-dropped carousel-position-dropped track-overflow-dropped clearfix-dropped extra-rule \
	> $T/logs/mutations.summary.txt 2>&1
echo "styles exit=$?" >> $T/logs/mutations.summary.txt
python3 -u $T/tools/mutate-section.py none advancing-direction-dropped inverted-class-dropped \
	slide-class-added aria-current-dropped control-label-dropped indicator-target-dropped \
	inline-style-added fade-class-dropped captions-dropped stray-block path-lightened \
	> $T/logs/section-mutations.summary.txt 2>&1
echo "section exit=$?" >> $T/logs/section-mutations.summary.txt
npm run build:src:styles > $T/logs/rebuild-after-mutations.log.txt 2>&1
echo "rebuild exit=$?" >> $T/logs/section-mutations.summary.txt
echo DONE >> $T/logs/section-mutations.summary.txt
