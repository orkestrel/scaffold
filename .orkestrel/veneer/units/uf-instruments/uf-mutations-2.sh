#!/usr/bin/env bash
# UTIL-FONT round-2 mutation instrument for the F-b binding table. Runs against the validation copy
# at tmp/probe/base (git archive 2a3f223, node_modules hard-linked, the owned files copied over it,
# uf-shared-2.patch applied, npm run build:src run). Each mutation edits tests/setupStyles.ts, runs the
# binding case, logs the site, the command, the exit, the summary, and the failing case names, and
# restores the file. Output: tmp/units/uf-mutations-2.log.txt.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
ROOT=/home/user/veneer-uf
BASE=$ROOT/tmp/probe/base
WORK=$ROOT/tmp/probe/work
LOG=$ROOT/tmp/units/uf-mutations-2.log.txt
FILE=tests/setupStyles.ts
COMMAND='npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t "font entry"'
mkdir -p "$WORK"
cd "$BASE" || exit 1
cp "$FILE" "$WORK/uf-setupStyles.keep"
: > "$LOG"
echo "# UTIL-FONT round-2 mutation log, $(date -u +%Y-%m-%dT%H:%M:%SZ), copy $BASE" >> "$LOG"
run() {
	local name="$1" site="$2" old="$3" new="$4"
	cp "$WORK/uf-setupStyles.keep" "$FILE"
	{
		echo
		echo "## $name"
		echo "site: $site"
		echo "edit: $FILE"
	} >> "$LOG"
	OLD="$old" NEW="$new" python3 -c '
import os, sys
path = sys.argv[1]
text = open(path).read()
old, new = os.environ["OLD"], os.environ["NEW"]
if text.count(old) != 1:
    sys.exit("site not found once")
open(path, "w").write(text.replace(old, new))
' "$FILE" >> "$LOG" 2>&1 || echo "edit failed" >> "$LOG"
	echo "command: $COMMAND" >> "$LOG"
	bash -c "$COMMAND" > "$WORK/uf-m2-$name.log.txt" 2>&1
	echo "exit=$?" >> "$LOG"
	grep -E "Tests +[0-9]| FAIL |AssertionError|❯ tests/setupStyles.test.ts" "$WORK/uf-m2-$name.log.txt" | sed 's/^/  /' >> "$LOG"
	cp "$WORK/uf-setupStyles.keep" "$FILE"
}
run control 'none' 'export const FONT_STEP_TABLES' 'export const FONT_STEP_TABLES'
run droplh 'the lh tuple dropped from FONT_STEP_TABLES' \
	"	Object.freeze({ key: 'lh', property: 'line-height', cases: LINE_HEIGHT_CASES }),
" ''
run dropfst 'the fst tuple dropped from FONT_STEP_TABLES' \
	"	Object.freeze({
		key: 'fst',
		property: 'font-style',
		cases: Object.freeze(FONT_STYLE_VALUES.map((value) => Object.freeze({ key: value, value }))),
	}),
" ''
run wrongproperty "the fw tuple's property written as font-style" \
	"key: 'fw', property: 'font-weight'" "key: 'fw', property: 'font-style'"
cmp -s "$WORK/uf-setupStyles.keep" "$FILE" && echo $'\nsetup module restored: yes' >> "$LOG" || echo $'\nsetup module restored: NO' >> "$LOG"
echo $'\n# end' >> "$LOG"
