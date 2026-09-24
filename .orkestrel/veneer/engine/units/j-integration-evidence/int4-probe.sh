#!/usr/bin/env bash
# Probes whether one type added to src/browser/types.ts without a guide row passes the guides gate,
# then restores the file and digests it before and after.
set -u
cd "$(dirname "$0")/../.."
{
	echo "before: $(sha256sum src/browser/types.ts)"
	node tmp/j-integration/mutate.cjs plant tmp/j-integration/m-int4-probe.json
	npm run test:guides 2>&1
	echo "run exit: $?"
	node tmp/j-integration/mutate.cjs restore tmp/j-integration/m-int4-probe.json
	echo "after: $(sha256sum src/browser/types.ts)"
} > tmp/j-integration/int4-probe.log.txt 2>&1
