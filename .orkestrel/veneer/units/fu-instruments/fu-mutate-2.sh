#!/usr/bin/env bash
# Runs each named UTIL-FRAMES round-2 mutation: applies it, runs the scoped command that must
# redden, records the mutated site, the command, the exit, the summary lines, and the failing case
# names in tmp/units/fu-mutations-2.log.txt, restores the file, and confirms every touched file
# matches its pre-run digest.
set -u
cd /home/user/veneer-fu
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
LOG=tmp/units/fu-mutations-2.log.txt
FILES="src/styles/utilities/_link.scss tests/setup.ts app/browser/constants.ts tests/setup.test.ts tests/app/browser/integration.test.ts"
BEFORE=$(sha256sum $FILES)
JOURNEY="npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project \"journey:light-1280*\""
SETUP="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts"

run() {
	local name="$1"; shift
	local site="$1"; shift
	{
		echo "=== mutation: $name"
		echo "site: $site"
	} >> "$LOG"
	python3 tmp/units/fu-mutate-2.py apply "$name" >> "$LOG" 2>&1
	for command in "$@"; do
		local out="tmp/units/fu-mutation-2-$name-$(echo "$command" | md5sum | cut -c1-6).log.txt"
		echo "command: $command" >> "$LOG"
		eval "$command" > "$out" 2>&1
		local code=$?
		echo "exit: $code" >> "$LOG"
		sed 's/\x1b\[[0-9;]*m//g' "$out" | grep -E "Test Files|Tests  " >> "$LOG"
		sed 's/\x1b\[[0-9;]*m//g' "$out" | grep -E "^ FAIL " | sort -u >> "$LOG"
		sed 's/\x1b\[[0-9;]*m//g' "$out" | grep -E "AssertionError|^(Type)?Error:" | head -6 >> "$LOG"
		echo "output: $out" >> "$LOG"
	done
	python3 tmp/units/fu-mutate-2.py restore "$name" >> "$LOG" 2>&1
	echo >> "$LOG"
}

echo "UTIL-FRAMES round-2 mutation log, $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$LOG"
echo >> "$LOG"
run emphasis-state-rule-deleted "src/styles/utilities/_link.scss, .link-body-emphasis: the &:hover and &:focus block is deleted" \
	"$JOURNEY -t 'drives a link of each link specimen'"
run role-link-hover-color "src/styles/utilities/_link.scss: a .link-<role>:hover rule painting a darker role color is added after the colored-link helper" \
	"$JOURNEY -t 'drives a link of each link specimen'"
run link-tables-absent "tests/setup.ts: the LINK_STATE_TARGETS, LINK_STEP_PROPERTIES, LINK_PAINT_PROPERTIES, and FOCUS_INDICATOR_PROPERTIES declarations are removed" \
	"$SETUP"

AFTER=$(sha256sum $FILES)
if [ "$BEFORE" = "$AFTER" ]; then echo "restored: every touched file matches its pre-run digest" >> "$LOG"; else echo "RESTORE MISMATCH" >> "$LOG"; fi
