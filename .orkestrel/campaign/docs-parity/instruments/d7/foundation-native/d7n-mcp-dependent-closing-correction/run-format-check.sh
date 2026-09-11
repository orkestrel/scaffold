#!/usr/bin/env bash
set -uo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/windows/pass-env.sh
cd /c/Users/mikes/WebstormProjects/mcp

receipt=tmp/d7n-mcp-dependent-closing-correction
mkdir -p "$receipt"

npx --no-install oxfmt --config .oxfmtrc.json --check README.md guides/mcp.md \
	>"$receipt/format.stdout.txt" \
	2>"$receipt/format.stderr.txt"
status=$?
printf '%s\n' "$status" >"$receipt/format.exit.txt"

sed -n '1,$p' "$receipt/format.stdout.txt"
sed -n '1,$p' "$receipt/format.stderr.txt" >&2
exit "$status"
