#!/usr/bin/env bash
# Round 3's successor to accept-2.sh; it changes only the log prefix to acc3-. Runs round 3's acceptance commands one at a time, each into its own log under tmp/j-release-core/,
# and prints each command's exit status and its tally line. Usage: bash tmp/j-release-core/accept-3.sh
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core || exit 1
dir=tmp/j-release-core
run() {
	name=$1
	shift
	"$@" > "$dir/acc3-$name.log.txt" 2>&1
	status=$?
	tally=$(sed 's/\x1b\[[0-9;]*m//g' "$dir/acc3-$name.log.txt" | grep -E "Tests |Test Files |error|Finished|Found|drift|passed|failed" | tail -3 | tr '\n' ' ')
	echo "$name: exit $status; $tally"
}
run check npm run check
run lint npm run lint:check
run format npm run format:check
run policy npm run test:policy
run guides npm run test:guides
run setup-browser npm run test:setup:browser
for file in Lifetime HostSnapshot helpers Button index; do
	run "$file" npx vitest run --config vite.config.ts --no-cache --project src:browser "tests/src/browser/$file.test.ts"
done
