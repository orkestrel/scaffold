#!/usr/bin/env bash
set -euo pipefail

cd /c/Users/mikes/WebstormProjects/mcp

receipt=tmp/d7n-mcp-dependent-closing-correction
freeze="$receipt/source-prepublish-freeze-v2"
mkdir -p "$freeze/guides"

git show HEAD:README.md >"$freeze/README.md"
git show HEAD:guides/mcp.md >"$freeze/guides/mcp.md"
git apply \
	--directory="$freeze" \
	--include="$freeze/README.md" \
	--include="$freeze/guides/mcp.md" \
	/c/Users/mikes/WebstormProjects/scaffold/tmp/pass/d7n-mcp-dependent-source-prepublish/diff-after.txt

set +e
git diff --no-index -- "$freeze/README.md" README.md >"$receipt/closing-readme.diff.txt"
readme_status=$?
git diff --no-index -- "$freeze/guides/mcp.md" guides/mcp.md >"$receipt/closing-guide.diff.txt"
guide_status=$?
set -e

if [[ "$readme_status" -ne 1 || "$guide_status" -ne 1 ]]; then
	printf 'Unexpected no-index diff exits: README=%s guide=%s\n' "$readme_status" "$guide_status" >&2
	exit 1
fi

git diff --no-index --numstat -- "$freeze/README.md" README.md >"$receipt/closing-readme.numstat.txt" || true
git diff --no-index --numstat -- "$freeze/guides/mcp.md" guides/mcp.md >"$receipt/closing-guide.numstat.txt" || true

git diff -- README.md guides/mcp.md >"$receipt/tracked.diff.txt"
git status --short >"$receipt/tracked.status.txt"
git rev-parse HEAD >"$receipt/head.txt"
