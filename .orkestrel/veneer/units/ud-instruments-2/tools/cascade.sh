#!/usr/bin/env bash
# Runs the cascade comparison in the landing copy: once with a `.d-probe` rule planted in the
# display partial (the control, which must report extra above zero and fail), then clean.
# Prints each run's exit code; restores the partial byte for byte and prints both digests.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
root=/home/user/veneer-ud
land=$root/tmp/probe/land
logs=$root/tmp/units/ud-instruments-2/logs
partial=$land/src/styles/utilities/_display.scss
mkdir -p "$land/tmp/probe"
cp "$root/tmp/units/ud-instruments-2/tools/cascade.test.ts" "$land/tmp/probe/cascade.test.ts"
cd "$land"
before=$(sha256sum "$partial" | cut -d' ' -f1)
cp "$partial" "$partial.orig"
printf '\n@layer utilities {\n\t.d-probe {\n\t\tdisplay: block !important;\n\t}\n}\n' >> "$partial"
{
	echo "run: cascade planted .d-probe (control); copy: $land"
	echo "planted: $(tail -5 "$partial" | tr '\n' ' ')"
	npm run build:src:styles > /dev/null 2>&1; echo "build exit=$?"
	npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe tmp/probe/cascade.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g'
	echo "vitest exit=${PIPESTATUS[0]}"
} > "$logs/cascade-planted.log.txt"
mv "$partial.orig" "$partial"
after=$(sha256sum "$partial" | cut -d' ' -f1)
echo "restored _display.scss sha256-before=$before sha256-after=$after equal=$([ "$before" = "$after" ] && echo true || echo false)" >> "$logs/cascade-planted.log.txt"
{
	echo "run: cascade clean; copy: $land"
	npm run build:src:styles > /dev/null 2>&1; echo "build exit=$?"
	npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe tmp/probe/cascade.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g'
	echo "vitest exit=${PIPESTATUS[0]}"
} > "$logs/cascade-clean.log.txt"
grep -h "SUMMARY\|vitest exit\|restored\|EXTRA" "$logs/cascade-planted.log.txt" "$logs/cascade-clean.log.txt"
