#!/usr/bin/env bash
set -euo pipefail

cd /c/Users/mikes/WebstormProjects/mcp

receipt=tmp/d7n-mcp-dependent-closing-correction
mkdir -p "$receipt"

git diff -- README.md guides/mcp.md >"$receipt/tracked.diff.txt"
git diff --numstat -- README.md guides/mcp.md >"$receipt/tracked.numstat.txt"
git status --short >"$receipt/tracked.status.txt"
git rev-parse HEAD >"$receipt/head.txt"
