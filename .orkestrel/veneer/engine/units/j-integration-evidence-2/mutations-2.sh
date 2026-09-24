#!/usr/bin/env bash
# Runs every round-2 mutation against its one test file: digest, plant, run the whole file, restore,
# digest again, and record the failing case titles in a summary.
set -u
cd "$(dirname "$0")/../.."
summary=tmp/j-integration/mutations-2.summary.log.txt
: > "$summary"
while read -r name subject test; do
	[ -z "$name" ] && continue
	log="tmp/j-integration/$name.log.txt"
	{
		echo "subject: $subject"
		echo "before: $(sha256sum "$subject")"
		node tmp/j-integration/mutate.cjs plant "tmp/j-integration/$name.json"
		npm run test:src:browser -- "$test" 2>&1
		echo "run exit: $?"
		node tmp/j-integration/mutate.cjs restore "tmp/j-integration/$name.json"
		echo "after: $(sha256sum "$subject")"
	} > "$log" 2>&1
	{
		echo "== $name ($test)"
		sed -e 's/\x1b\[[0-9;]*m//g' "$log" | grep -E '^before:|^after:| FAIL |Tests  |run exit' | sed -e 's/^ FAIL  |src:browser (chromium)| / FAIL /'
	} >> "$summary"
done < tmp/j-integration/mutations-2.list
echo "done" >> "$summary"
