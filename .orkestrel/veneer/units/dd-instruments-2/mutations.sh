#!/bin/bash
# Runs every mutation mutate.py names, one after another, and writes the summary to
# logs/mutations.log.txt.
cd "$(dirname "$0")" || exit 1
: >logs/mutations.log.txt
for m in control control-section control-setup baseline-no-partial show-rule-missing dropup-copies-top spacer-dropped two-carets-on-dropstart empty-rule-dropped raised-flag-flipped position-omitted position-swapped end-rule-unconditioned wrong-boundary sm-end-boundary sm-end-pair-boundary centering-added literal-hover-background active-rule-dropped disabled-rule-dropped header-rule-dropped divider-rule-dropped item-text-rule-dropped dark-block-on-menu plain-background-fixed literal-zindex room-dropped dropend-column-narrowed specimen-drops-show raised-column-flipped nav-row-dropped nav-row-dropped-narrow-predicate; do
	python3 mutate.py "$m" >>logs/mutations.log.txt 2>&1
done
echo done >>logs/mutations.log.txt
