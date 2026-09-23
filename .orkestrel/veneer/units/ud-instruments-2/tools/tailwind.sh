#!/usr/bin/env bash
# Runs the Tailwind consumer and profiles proofs in the landing copy: clean, then control A (the
# `!important` dropped from `.order-first` in the built cascade), then control B (`order-first`
# written onto the exclusion line in every copy), then clean again. Each control restores its files
# byte for byte and records the SHA-256 digest of each file before and after.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
root=/home/user/veneer-ud
land=$root/tmp/probe/land
logs=$root/tmp/units/ud-instruments-2/logs/tailwind
mkdir -p "$logs"
cd "$land"
strip() { sed 's/\x1b\[[0-9;]*m//g'; }
{
	echo "run: tailwind clean (before the controls); copy: $land"
	echo "command: npm run build:src:styles && npm run test:service"
	npm run build:src:styles 2>&1 | strip | tail -3
	echo "build exit=${PIPESTATUS[0]}"
	npm run test:service 2>&1 | strip
	echo "test:service exit=${PIPESTATUS[0]}"
} > "$logs/clean-before.log.txt"
css=dist/src/styles/index.css
before=$(sha256sum "$css" | cut -d' ' -f1)
cp "$css" "$css.orig"
sed -i 's/\.order-first{order:-1!important}/.order-first{order:-1}/' "$css"
{
	echo "run: tailwind control A; copy: $land"
	echo "mutation: in $css, .order-first{order:-1!important} -> .order-first{order:-1}"
	echo "mutated occurrences: $(grep -o '\.order-first{order:-1}' "$css" | wc -l); remaining important: $(grep -o '\.order-first{order:-1!important}' "$css" | wc -l)"
	echo "command: npm run test:service"
	npm run test:service -- --reporter=verbose 2>&1 | strip
	echo "test:service exit=${PIPESTATUS[0]}"
} > "$logs/control-a.log.txt"
mv "$css.orig" "$css"
after=$(sha256sum "$css" | cut -d' ' -f1)
echo "restored $css sha256-before=$before sha256-after=$after equal=$([ "$before" = "$after" ] && echo true || echo false)" >> "$logs/control-a.log.txt"
files="tests/setup.css tests/fixtures/tailwind/consumer.css tests/fixtures/tailwind/preflight.css"
: > "$logs/control-b.digests.txt"
for f in $files; do echo "$f sha256-before=$(sha256sum "$f" | cut -d' ' -f1)" >> "$logs/control-b.digests.txt"; cp "$f" "$f.orig"; sed -i 's/ container table");/ container order-first table");/' "$f"; done
{
	echo "run: tailwind control B; copy: $land"
	echo "mutation: order-first written onto the exclusion line in $files"
	grep -n 'order-first' $files | cut -c1-200
	echo "command: npm run test:service"
	npm run test:service -- --reporter=verbose 2>&1 | strip
	echo "test:service exit=${PIPESTATUS[0]}"
} > "$logs/control-b.log.txt"
for f in $files; do mv "$f.orig" "$f"; echo "$f sha256-after=$(sha256sum "$f" | cut -d' ' -f1)" >> "$logs/control-b.digests.txt"; done
cat "$logs/control-b.digests.txt" >> "$logs/control-b.log.txt"
{
	echo "run: tailwind clean (after the controls); copy: $land"
	echo "command: npm run build:src:styles && npm run test:service"
	npm run build:src:styles 2>&1 | strip | tail -3
	echo "build exit=${PIPESTATUS[0]}"
	npm run test:service 2>&1 | strip
	echo "test:service exit=${PIPESTATUS[0]}"
} > "$logs/clean-after.log.txt"
for f in clean-before control-a control-b clean-after; do echo "== $f"; grep -E "exit=|Tests |Test Files|sha256|^ +× |FAIL" "$logs/$f.log.txt" | head -20; done
