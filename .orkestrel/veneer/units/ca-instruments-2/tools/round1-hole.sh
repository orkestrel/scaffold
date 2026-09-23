#!/usr/bin/env bash
# Failing-first for the section proof: runs the added section mutations against round 1's section
# proof (extracted from the retained ca.diff), which reads green under each, then restores the
# round-2 proof in the validation copy.
set -eu
W=/home/user/veneer-ca
B=$W/tmp/probe/base
T=$W/tmp/units/ca-instruments-2
F=tests/app/browser/sections/CarouselSection.test.ts
sed -n '/^+++ b\/tests\/app\/browser\/sections\/CarouselSection.test.ts/,$p' /home/user/scaffold/.orkestrel/veneer/units/ca.diff \
	| sed '1,2d' | sed 's/^+//' > "$T/logs/round1-section-proof.ts.txt"
cp "$T/logs/round1-section-proof.ts.txt" "$B/$F"
CA_LOGS="$T/logs/round1-section-hole" python3 "$T/tools/mutate-section.py" none stray-block path-lightened
cp "$W/$F" "$B/$F"
cmp "$W/$F" "$B/$F" && echo restored
