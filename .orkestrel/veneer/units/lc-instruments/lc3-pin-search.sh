#!/usr/bin/env bash
# lc3-pin-search.sh: searches the paths round 2 named for any pin of a paint LABEL moves: a state
# fill, a label, a text-bg color, and a link hover color. Each pattern's command and output land in
# tmp/units/lc3-pin-search.log.txt.
cd /home/user/veneer-lc2
paths="tests/fixtures/oracle tests/app app/browser/constants.ts src guides"
run() {
	echo "## $1"
	echo "# command: grep -rnE '$2' $paths"
	grep -rnE "$2" $paths | cut -c1-240
	echo "# exit ${PIPESTATUS[0]} (1 means no match)"
	echo
}
{
	run 'pre-change dark and light state fills of the filled roles' '0\.492706|0\.550353|0\.559901|0\.609913|0\.0401998|0\.149268|0\.0224636|0\.133547|0\.763935|0\.790761|0\.786027|0\.810342|0\.97584313|0\.97858823|0\.1147733|0\.1025745'
	run 'a pinned button or tooltip label read as a color' "(btn-[a-z]+|-tooltip)[^\\n]*(rgb\\(255, 255, 255\\)|rgb\\(0, 0, 0\\)|'white'|'black'|#fff\\b|#000\\b)"
	run 'a text-bg foreground read as a color' "text-bg-[a-z]+[^\\n]*(rgb\\(255, 255, 255\\)|rgb\\(0, 0, 0\\)|'white'|'black'|#fff\\b|#000\\b|palette-(white|black)-base)"
	run 'a colored-link hover or focus color' 'link-[a-z]+:(hover|focus)|RGBA\(10, 88, 202|LINK_PAINT_PROPERTIES'
} > tmp/units/lc3-pin-search.log.txt 2>&1
