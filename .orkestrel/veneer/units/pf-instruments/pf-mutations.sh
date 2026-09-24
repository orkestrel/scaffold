#!/usr/bin/env bash
# Runs each named PAGE-FRAME mutation against its proof and logs the red run, then puts the owned
# file back from the copy taken before the mutation. Log: tmp/units/pf-mutations.log.txt
set -u
cd /home/user/veneer-pf
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
LOG=tmp/units/pf-mutations.log.txt
: > "$LOG"
run() {
	local name=$1 script=$2
	local file
	cp tests/setupBrowser.ts tmp/units/pf-backup-setupBrowser.ts
	cp tests/setup.ts tmp/units/pf-backup-setup.ts
	file=$(python3 tmp/units/pf-mutate.py "$name") || { echo "mutation $name failed to apply" >> "$LOG"; return; }
	local out=tmp/units/pf-mutation-$name.log.txt
	local backup=tmp/units/pf-backup-setupBrowser.ts
	[ "$file" = tests/setup.ts ] && backup=tmp/units/pf-backup-setup.ts
	local change
	change=$(diff -u "$backup" "$file" | tail -n +3)
	npm run "$script" > "$out" 2>&1
	local code=$?
	cp tmp/units/pf-backup-setupBrowser.ts tests/setupBrowser.ts
	cp tmp/units/pf-backup-setup.ts tests/setup.ts
	{
		echo "== mutation: $name"
		echo "site: $file"
		echo "$change"
		echo "command: npm run $script"
		echo "exit: $code"
		grep -E "^ +Tests " "$out" | tail -1
		grep -E "^ FAIL " "$out" | sed 's/^/failing: /'
		echo
	} >> "$LOG"
}
for name in no-bounding subject-child-hidden region-before-bounding element-frames-unbounded region-at-viewport-pane area-off-by-one area-refusal-dropped restore-outside-finally restore-clears-every-hidden settle-refusal-dropped; do
	run "$name" test:setup:browser
done
run frame-area-unexported test:setup
