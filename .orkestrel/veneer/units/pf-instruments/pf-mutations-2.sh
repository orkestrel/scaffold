#!/usr/bin/env bash
# Runs each named round-2 PAGE-FRAME mutation against its proof and logs the red run, then puts the
# owned file back from the copy taken before the mutation. Log: tmp/units/pf-mutations-2.log.txt
set -u
cd /home/user/veneer-pf
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
LOG=tmp/units/pf-mutations-2.log.txt
: > "$LOG"
run() {
	local name=$1; shift
	cp tests/setupBrowser.ts tmp/units/pf-2-backup-setupBrowser.ts
	cp tests/app/browser/integration.test.ts tmp/units/pf-2-backup-integration.ts
	local file
	file=$(python3 tmp/units/pf-mutate-2.py "$name") || { echo "mutation $name failed to apply" >> "$LOG"; return; }
	local backup=tmp/units/pf-2-backup-setupBrowser.ts
	[ "$file" = tests/app/browser/integration.test.ts ] && backup=tmp/units/pf-2-backup-integration.ts
	local change
	change=$(diff -u "$backup" "$file" | tail -n +3)
	local out=tmp/units/pf-mutation-2-$name.log.txt
	env "$@" > "$out" 2>&1
	local code=$?
	cp tmp/units/pf-2-backup-setupBrowser.ts tests/setupBrowser.ts
	cp tmp/units/pf-2-backup-integration.ts tests/app/browser/integration.test.ts
	rm -f tmp/units/pf-2-backup-setupBrowser.ts tmp/units/pf-2-backup-integration.ts
	{
		echo "== mutation: $name"
		echo "site: $file"
		echo "$change"
		echo "command: $*"
		echo "exit: $code"
		grep -E "^ +Tests " "$out" | tail -1
		grep -E "^ FAIL " "$out" | sed 's/^/failing: /'
		grep -E "AssertionError|^Error:" "$out" | head -3 | sed 's/^/reason: /'
		echo
	} >> "$LOG"
}
run viewport-branch-skips-reread npm run test:setup:browser
run settle-refusal-dropped npm run test:setup:browser
run primary-unlifted CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-1280*" -t "repaints a host under the pointer while it is hovered and while it is held"
run primary-unlifted-unguarded CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-1280*" -t "repaints a host under the pointer while it is hovered and while it is held"
