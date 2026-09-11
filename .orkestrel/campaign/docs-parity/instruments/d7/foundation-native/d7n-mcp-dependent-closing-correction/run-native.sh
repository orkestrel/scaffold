#!/usr/bin/env bash
set -uo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/windows/pass-env.sh
cd /c/Users/mikes/WebstormProjects/mcp

receipt=tmp/d7n-mcp-dependent-closing-correction
mkdir -p "$receipt"

node --experimental-strip-types tests/guides.test.ts \
	>"$receipt/native.stdout.txt" \
	2>"$receipt/native.stderr.txt"
status=$?
printf '%s\n' "$status" >"$receipt/native.exit.txt"

sed -n '1,$p' "$receipt/native.stdout.txt"
sed -n '1,$p' "$receipt/native.stderr.txt" >&2
exit "$status"
