#!/usr/bin/env bash
# BARE-BUTTON (cb) mutation runs. Each mutation rewrites src/styles/elements/_button.scss from the
# saved fixed copy, rebuilds the styles, runs the owned proofs, logs the site, the command, the
# build and test exits, the summary line, and the failing case names, then restores the fixed copy
# byte for byte. Log: tmp/units/cb-mutations.log.txt.
set -u
cd /home/user/veneer-cb
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
PARTIAL=src/styles/elements/_button.scss
FIXED=tmp/units/cb-fixed-button.scss
LOG=tmp/units/cb-mutations.log.txt
RUN=tmp/units/cb-mutation-run.log.txt
TESTS="tests/src/styles/elements/button.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/carousel.test.ts tests/src/styles/components/close.test.ts"
COMMAND="npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $TESTS"
cp "$PARTIAL" "$FIXED"
: > "$LOG"

mutate() {
	local name="$1" site="$2" from="$3" to="$4"
	cp "$FIXED" "$PARTIAL"
	python3 tmp/units/cb-replace.py "$PARTIAL" "$from" "$to" || { echo "SITE NOT FOUND: $name" >> "$LOG"; return; }
	npm run build:src:styles > tmp/units/cb-mutation-build.log.txt 2>&1
	local build=$?
	$COMMAND > "$RUN" 2>&1
	local tests=$?
	{
		echo "== $name"
		echo "site: $site"
		echo "diff:"
		diff "$FIXED" "$PARTIAL" | sed 's/^/  /'
		echo "command: npm run build:src:styles && $COMMAND"
		echo "build exit: $build"
		echo "test exit: $tests"
		echo "summary: $(grep -E '^\s+Tests ' "$RUN" | sed 's/^ *//')"
		echo "failing cases:"
		grep -E '^ FAIL ' "$RUN" | sed -E 's/^ FAIL +\|[^|]*\| /  /'
		echo
	} >> "$LOG"
	cp "$FIXED" "$PARTIAL"
}

mutate 'bare selector widened back to button' \
	'the bare rule selector in src/styles/elements/_button.scss' \
	'button:not([class], [data-bs-target]) {' 'button {'
mutate 'font-size: inherit dropped from the universal rule' \
	'the universal button rule in src/styles/elements/_button.scss' \
	$'\t\tfont-size: inherit;\n' ''
mutate 'data-bs-target exclusion dropped' \
	'the bare rule selector in src/styles/elements/_button.scss' \
	'button:not([class], [data-bs-target]) {' 'button:not([class]) {'
mutate 'hover branch left unscoped' \
	'the hover branch of the bare rule in src/styles/elements/_button.scss' \
	'&:hover {' '@at-root button:hover {'
mutate 'active branch left unscoped' \
	'the active branch of the bare rule in src/styles/elements/_button.scss' \
	'&:active {' '@at-root button:active {'
mutate 'focus-visible branch left unscoped' \
	'the focus-visible branch of the bare rule in src/styles/elements/_button.scss' \
	'&:focus-visible {' '@at-root button:focus-visible {'
mutate 'disabled branch left unscoped' \
	'the disabled branch of the bare rule in src/styles/elements/_button.scss' \
	'&:disabled {' '@at-root button:disabled {'

cp "$FIXED" "$PARTIAL"
npm run build:src:styles > tmp/units/cb-mutation-build.log.txt 2>&1
echo "restored build exit: $?" >> "$LOG"
cmp "$FIXED" "$PARTIAL" && echo "restored partial equals the fixed copy" >> "$LOG"
