#!/usr/bin/env bash
# Successor to mutate.sh (round 3). Runs one named mutation against the rebuilt cascade: applies the
# edit, rebuilds the styles, runs the owned styles proofs and the Tailwind consumer file, keeps the
# whole run with only the colour codes stripped, lists each failing case with the first line of its
# failure message (KILL when that line is an AssertionError), then restores the file and checks its
# digest. What changed from mutate.sh: no grep filter; every mutation runs the Tailwind file; a
# JSON report per run feeds the kill list; the state-spacing and no-surface mutations are added.
# Usage: bash tmp/units/ebc-probe/mutate-3.sh <name> [tag]
set -u
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-ebc
name="$1"
tag="${2:+-$2}"
log="tmp/units/logs/ebc-3-mutation-$name$tag.log.txt"
styles_json="tmp/units/logs/ebc-3-mutation-$name$tag.styles.json"
service_json="tmp/units/logs/ebc-3-mutation-$name$tag.service.json"
case "$name" in
	class) file=src/styles/elements/_button.scss; from=$'\tbutton {\n\t\tpadding:'; to=$'\tbutton:not([class]) {\n\t\tpadding:' ;;
	target) file=src/styles/elements/_button.scss; from=$'\tbutton {\n\t\tpadding:'; to=$'\tbutton:not([data-bs-target]) {\n\t\tpadding:' ;;
	important) file=src/styles/elements/_button.scss; from='padding: var(--vn-space-3) var(--vn-space-6);'; to='padding: var(--vn-space-3) var(--vn-space-6) !important;' ;;
	spacing) file=src/styles/elements/_button.scss; from='box-shadow: var(--vn-button-shadow);'; to=$'box-shadow: var(--vn-button-shadow);\n\t\tletter-spacing: 0.05em;' ;;
	nav) file=src/styles/components/_nav.scss; from=$'\t:where(button.nav-link) {\n\t\t@include button-reboot;\n\t}\n'; to='' ;;
	state-spacing) file=src/styles/elements/_button.scss; from=$'\t\t&:hover {\n'; to=$'\t\t&:hover {\n\t\t\tletter-spacing: 0.05em;\n' ;;
	no-surface) file=src/styles/elements/_button.scss; from=$'\tbutton {\n\t\tpadding:'; to=$'\tbutton:not(button) {\n\t\tpadding:' ;;
	*) echo "unknown mutation $name"; exit 2 ;;
esac
before=$(sha256sum "$file" | cut -d' ' -f1)
cp "$file" "tmp/units/ebc-probe/restore.$name"
MFROM="$from" MTO="$to" MFILE="$file" node -e '
const fs = require("node:fs")
const text = fs.readFileSync(process.env.MFILE, "utf8")
const count = text.split(process.env.MFROM).length - 1
if (count !== 1) { console.error(`mutation site matched ${count} times`); process.exit(3) }
fs.writeFileSync(process.env.MFILE, text.replace(process.env.MFROM, process.env.MTO))
'
{
	echo "mutation: $name on $file"
	git diff -- "$file"
	npm run build:src:styles >/dev/null 2>&1
	echo "build exit=$?"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache \
		--reporter=default --reporter=json --outputFile.json="$styles_json" \
		tests/src/styles/elements/button.test.ts tests/src/styles/mixins.test.ts 2>&1 \
		| sed 's/\x1b\[[0-9;]*m//g'
	echo "styles exit=${PIPESTATUS[0]}"
	npx vitest run --config vite.config.ts --no-cache --project service \
		--reporter=default --reporter=json --outputFile.json="$service_json" \
		tests/service/tailwind/consumer.test.ts 2>&1 \
		| sed 's/\x1b\[[0-9;]*m//g'
	echo "service exit=${PIPESTATUS[0]}"
	echo "kills:"
	node tmp/units/ebc-probe/kills-3.mjs "$styles_json" "$service_json"
} > "$log" 2>&1
cp "tmp/units/ebc-probe/restore.$name" "$file"
rm "tmp/units/ebc-probe/restore.$name"
after=$(sha256sum "$file" | cut -d' ' -f1)
if [ "$before" = "$after" ]; then echo "restore: byte-identical $after" >> "$log"; else echo "restore: DIGEST MISMATCH $before $after" >> "$log"; fi
npm run build:src:styles >/dev/null 2>&1
echo "rebuild exit=$?" >> "$log"
sed -n '/^kills:/,$p' "$log"
