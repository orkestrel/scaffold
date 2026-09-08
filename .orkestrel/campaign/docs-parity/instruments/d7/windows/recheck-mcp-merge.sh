#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/mcp"
exec > "$SCR/bootstrap/mcp-merge.log.txt" 2>&1
git -C "$FLEET/mcp" diff --cached --stat
npm run check
npm run docs
npm run test:guides
npx --no-install vitest run --project src:core tests/src/core/MCPLegacy.test.ts
git -C "$FLEET/mcp" diff --cached > "$SCR/bootstrap/mcp-merge.diff.txt"
git -C "$FLEET/mcp" status --short > "$SCR/bootstrap/mcp-merge.status.txt"
