#!/usr/bin/env bash
# Runs one mutation reading: digest the subject, plant, run one case, restore, digest again.
# Usage: mutation.sh <spec> <subject> <test file> <case title> <log>
set -u
spec="$1"; subject="$2"; file="$3"; title="$4"; log="$5"
cd "$(dirname "$0")/../.."
{
	echo "subject: $subject"
	echo "before: $(sha256sum "$subject")"
	node tmp/j-integration/mutate.cjs plant "$spec"
	echo "planted: $(sha256sum "$subject")"
	npm run test:src:browser -- "$file" -t "$title" 2>&1
	echo "run exit: $?"
	node tmp/j-integration/mutate.cjs restore "$spec"
	echo "after: $(sha256sum "$subject")"
} > "$log" 2>&1
