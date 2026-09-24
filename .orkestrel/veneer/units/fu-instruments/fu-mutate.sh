#!/usr/bin/env bash
# Runs each named UTIL-FRAMES mutation: applies it, runs the scoped command that must redden, records
# the mutated site, the command, the exit, the summary lines, and the failing case names in
# tmp/units/fu-mutations.log.txt, then restores the file and confirms the tree matches the pre-run
# digest of every owned file.
set -u
cd /home/user/veneer-fu
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
LOG=tmp/units/fu-mutations.log.txt
OWNED="app/browser/constants.ts tests/setup.ts tests/setup.test.ts tests/app/browser/integration.test.ts tests/app/browser/sections/FocusRingSection.test.ts tests/app/browser/sections/LinkSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts"
BEFORE=$(sha256sum $OWNED)
JOURNEY="npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project \"journey:light-1280*\""
SECTIONS="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser"
SETUP="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts"

run() {
	local name="$1"; shift
	if [ -n "$ONLY" ] && [ "$ONLY" != "$name" ]; then return; fi
	local site="$1"; shift
	{
		echo "=== mutation: $name"
		echo "site: $site"
	} >> "$LOG"
	python3 tmp/units/fu-mutate.py apply "$name" >> "$LOG" 2>&1
	for command in "$@"; do
		local out="tmp/units/fu-mutation-$name-$(echo "$command" | md5sum | cut -c1-6).log.txt"
		echo "command: $command" >> "$LOG"
		eval "$command" > "$out" 2>&1
		local code=$?
		echo "exit: $code" >> "$LOG"
		grep -E "Test Files|Tests  " "$out" | sed 's/\x1b\[[0-9;]*m//g' >> "$LOG"
		grep -E "^ FAIL " "$out" | sed 's/\x1b\[[0-9;]*m//g' | sort -u >> "$LOG"
		grep -E "AssertionError|^Error:" "$out" | sed 's/\x1b\[[0-9;]*m//g' | head -6 >> "$LOG"
		echo "output: $out" >> "$LOG"
	done
	python3 tmp/units/fu-mutate.py restore "$name" >> "$LOG" 2>&1
	echo >> "$LOG"
}

ONLY="${1:-}"
if [ -z "$ONLY" ]; then
	echo "UTIL-FRAMES mutation log, $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$LOG"
	echo >> "$LOG"
fi
run role-rings-default "app/browser/constants.ts, FOCUS_RING_SPECIMENS: each role specimen's link drops its focus-ring-<role> class" \
	"$JOURNEY -t 'each role ring under keyboard focus'" \
	"$SECTIONS tests/app/browser/sections/FocusRingSection.test.ts"
run ring-frame-unpadded "tests/app/browser/integration.test.ts, the focus ring case: the lifted wrapper loses its p-2 padding" \
	"$JOURNEY -t 'each role ring under keyboard focus'"
run link-state-undriven "tests/app/browser/integration.test.ts, the link state case: the pointer and the keyboard drive are removed" \
	"$JOURNEY -t 'drives a link of each link specimen'"
run container-always-hidden "app/browser/constants.ts, VISIBILITY_SPECIMENS: the Focusable container's span carries visually-hidden beside visually-hidden-focusable, so it stays hidden while its link holds focus" \
	"$JOURNEY -t 'reveals the focusable container'" \
	"$SECTIONS tests/app/browser/sections/VisibilitySection.test.ts"
run default-ring-unrested "tests/setup.ts, CASCADE_KEYS: the default-focus-ring resting row is removed" \
	"$SETUP"
run emphasis-link-merged "app/browser/constants.ts, LINK_SPECIMENS: the body emphasis link rejoins the Role links specimen" \
	"$SECTIONS tests/app/browser/sections/LinkSection.test.ts"

AFTER=$(sha256sum $OWNED)
if [ "$BEFORE" = "$AFTER" ]; then echo "restored: every owned file matches its pre-run digest" >> "$LOG"; else echo "RESTORE MISMATCH" >> "$LOG"; fi
