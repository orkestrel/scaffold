#!/usr/bin/env bash
# Settle audit claims 8 and 9 by running unit S3's retained instruments on the host.
# The objective lane could not run them: its sandbox is read-only and every one mutates.
# Each script mutates a source file, runs its command, and restores in a finally block.
# Run them one at a time — they write the same files — and read the tree after each.
set -u
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 1
BASELINE="8"
for script in s3-relocation-control s3-red-3-identity s3-red-1-selection s3-red-2-pinning; do
	echo "===== ${script} ====="
	node "tmp/units/${script}.mjs"
	echo "----- exit ${?} -----"
	COUNT=$(git diff --name-only | wc -l | tr -d ' ')
	echo "tracked files modified after ${script}: ${COUNT} (baseline ${BASELINE})"
	if [ "${COUNT}" != "${BASELINE}" ]; then
		echo "TREE NOT RESTORED — stopping"
		git diff --name-only
		exit 1
	fi
done
echo "===== all instruments run, tree restored ====="
git diff --stat
