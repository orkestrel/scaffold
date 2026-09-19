#!/usr/bin/env bash
# Re-runs the census mutation alone, after `buildCensus` moved from `crypto.randomUUID` to
# `crypto.getRandomValues`. Appends to the same log the full run wrote.
set -u

cd "$(dirname "$0")/../.." || exit 1
LOG=tmp/probe/mutations3.log.txt

{
	echo "=== pass: census, re-run after the getRandomValues change (test:src:browser) ==="
	python tmp/probe/mutate3.py backup
	python tmp/probe/mutate3.py census
	npm run test:src:browser 2>&1 | grep -E "Tests |Test Files |FAIL |AssertionError" | head -10
	python tmp/probe/mutate3.py restore
	echo
	echo "=== restored tree ==="
	git status --short
} >>"$LOG" 2>&1

echo "done"
