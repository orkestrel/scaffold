#!/usr/bin/env bash
# Runs the journey on the light-390 and dark-1280 variants in the stage, then a stage-only probe
# partial writing the accordion's `:not(.collapsed)` selector, which the census reads as the declared
# home of the `collapsed` class, and restores `index.scss` by digest and deletes the probe after.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
STAGE=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb/stage
I=/home/user/veneer-nb/tmp/units/nb-instruments-2
cd "$STAGE" || exit 1
strip() { sed 's/\x1b\[[0-9;]*m//g'; }
journey() {
	local log="$1"; shift
	echo "\$ npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot $*" > "$log"
	npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot "$@" > "$I/logs/.journey.out" 2>&1
	echo "exit $?" >> "$log"
	strip < "$I/logs/.journey.out" | grep -vE '^\s*$|\[vite\]|Port [0-9]+ is in use' >> "$log"
	rm -f "$I/logs/.journey.out"
}
journey "$I/logs/journey-light-390.log.txt" --project journey:light-390
journey "$I/logs/journey-dark-1280.log.txt" --project journey:dark-1280

INDEX=src/styles/index.scss
PROBE=src/styles/components/_census-probe.scss
digest=$(sha256sum "$INDEX" | cut -d' ' -f1)
cp "$INDEX" "$I/logs/.index.keep"
printf '@layer components {\n\t.accordion-button:not(.collapsed) {\n\t\t--vn-census-probe: 1;\n\t}\n}\n' > "$PROBE"
printf "@use 'components/census-probe';\n" >> "$INDEX"
journey "$I/logs/census-probe.log.txt" --project journey:light-390 -t 'reads the mounted class and style populations'
{
	echo "probe partial: $PROBE"
	sed 's/^/  /' "$PROBE"
	echo "index line appended: @use 'components/census-probe';"
} >> "$I/logs/census-probe.log.txt"
rm -f "$PROBE"
cp "$I/logs/.index.keep" "$INDEX"
rm -f "$I/logs/.index.keep"
after=$(sha256sum "$INDEX" | cut -d' ' -f1)
echo "index.scss digest before $digest after $after" >> "$I/logs/census-probe.log.txt"
test "$digest" = "$after" && test ! -e "$PROBE" && echo 'index.scss restored byte for byte; probe partial deleted' >> "$I/logs/census-probe.log.txt"
