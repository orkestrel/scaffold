#!/usr/bin/env bash
# BARE-BUTTON (cb) round-2 mutation runs. Successor of tmp/units/cb-mutate.sh, which stays as it ran.
# Changes from that script: the round-2 site list (the partial at a9dff19, the dropped
# `font-size: inherit` declaration, the unscoped focus-visible branch, and a universal rule writing
# the `--vn-size-5` and `--vn-line-body` tokens), and a restore check that compares the built
# stylesheet as well as the partial. Log: tmp/units/cb-mutations-2.log.txt.
set -u
cd /home/user/veneer-cb
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
PARTIAL=src/styles/elements/_button.scss
FIXED=tmp/units/cb-fixed-button-2.scss
LOG=tmp/units/cb-mutations-2.log.txt
RUN=tmp/units/cb-mutation-2-run.log.txt
TESTS="tests/src/styles/elements/button.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/carousel.test.ts tests/src/styles/components/close.test.ts"
COMMAND="npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot $TESTS"
cp "$PARTIAL" "$FIXED"
: > "$LOG"

record() {
	local name="$1" site="$2"
	npm run build:src:styles > tmp/units/cb-mutation-2-build.log.txt 2>&1
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
		echo "assertion lines:"
		grep -E 'AssertionError' "$RUN" | sed 's/\x1b\[[0-9;]*m//g; s/^/  /'
		echo
	} >> "$LOG"
	cp "$FIXED" "$PARTIAL"
}

mutate() {
	cp "$FIXED" "$PARTIAL"
	python3 tmp/units/cb-replace.py "$PARTIAL" "$3" "$4" || { echo "SITE NOT FOUND: $1" >> "$LOG"; return; }
	record "$1" "$2"
}

git show a9dff19:"$PARTIAL" > "$PARTIAL"
record 'partial at a9dff19 (failing-first reading for the round-2 cases)' \
	'src/styles/elements/_button.scss as committed at a9dff19'
mutate 'font-size: inherit dropped from the universal rule' \
	'the universal button rule in src/styles/elements/_button.scss' \
	$'\t\tfont-size: inherit;\n' ''
mutate 'focus-visible branch left unscoped' \
	'the focus-visible branch of the bare rule in src/styles/elements/_button.scss' \
	'&:focus-visible {' '@at-root button:focus-visible {'
mutate 'universal rule writes the --vn-size-5 and --vn-line-body tokens in place of inherit' \
	'the universal button rule in src/styles/elements/_button.scss' \
	$'\t\tfont-size: inherit;\n\t\tline-height: inherit;\n' $'\t\tfont-size: var(--vn-size-5);\n\t\tline-height: var(--vn-line-body);\n'

cp "$FIXED" "$PARTIAL"
npm run build:src:styles > tmp/units/cb-mutation-2-build.log.txt 2>&1
echo "restored build exit: $?" >> "$LOG"
cmp "$FIXED" "$PARTIAL" && echo "restored partial equals the fixed copy (cmp exit 0)" >> "$LOG"
cmp dist/src/styles/index.css tmp/units/cb-after-index.css && echo "restored dist/src/styles/index.css equals tmp/units/cb-after-index.css (cmp exit 0)" >> "$LOG"
sha256sum dist/src/styles/index.css tmp/units/cb-after-index.css >> "$LOG"
