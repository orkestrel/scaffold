#!/usr/bin/env bash
# Runs the FADE round-2 failing-first readings on the scratch copy tmp/probe/cf2-copy: the shipped
# fade proof and the shipped section proof against the tree without the fade partial's `@use` line,
# then the same commands with the line restored. Writes tmp/units/cf-mutations-2.log.txt and keeps
# each full log as tmp/units/cf-2-<reading>.log.txt.
set -u
ROOT=/home/user/veneer-cf/tmp/probe/cf2-copy
OUT=/home/user/veneer-cf/tmp/units
LOG=$OUT/cf-mutations-2.log.txt
SAVE=/home/user/veneer-cf/tmp/probe/cf2-save
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
STYLE='npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/fade.test.ts'
SECTION='npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FadeSection.test.ts'
mkdir -p "$SAVE"
: > "$LOG"
cd "$ROOT"
cp src/styles/index.scss "$SAVE/index.scss"

reading() {
	local name="$1" command="$2" file="$OUT/cf-2-$3.log.txt"
	bash -c "$command" > "$file" 2>&1
	local code=$?
	{
		echo "command: $command"
		echo "exit: $code"
		echo "summary: $(sed 's/\x1b\[[0-9;]*m//g' "$file" | grep -E '^ +Tests ' | sed 's/^ *//')"
		echo "failing cases:"
		sed 's/\x1b\[[0-9;]*m//g' "$file" | grep -E '^ FAIL ' | sed -E 's/^ FAIL .*> (fade classes|FadeSection) > /  - /'
		echo "full log: $file"
	} >> "$LOG"
}

phase() {
	local name="$1" tag="$2"
	{
		echo "=== $name"
		echo "barrel diff against the patched barrel:"
		diff -u "$SAVE/index.scss" src/styles/index.scss | sed -n '3,$p'
	} >> "$LOG"
	npm run build:src > "$OUT/cf-2-$tag-build.log.txt" 2>&1
	echo "build: npm run build:src, exit $?" >> "$LOG"
	reading "$name" "$STYLE" "$tag-fade"
	reading "$name" "$SECTION" "$tag-section"
	echo >> "$LOG"
}

python3 - <<'PY'
p='src/styles/index.scss'
s=open(p).read()
old="@use 'components/fade';\n"
assert s.count(old)==1
open(p,'w').write(s.replace(old,''))
PY
phase 'Red: the tree without the fade partial' nopartial
cp "$SAVE/index.scss" src/styles/index.scss
phase 'Green: the tree with the fade partial' partial
