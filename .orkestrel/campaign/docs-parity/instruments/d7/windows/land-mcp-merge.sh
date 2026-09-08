#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
git -C "$FLEET/mcp" diff --check --cached
git -C "$FLEET/mcp" -c user.name=Claude -c user.email=noreply@anthropic.com commit -F "$SCR/mcp-merge-message.txt"
git -C "$FLEET/mcp" push -u origin claude/orkestrel-npm-audit-deps-14ibta
git -C "$FLEET/mcp" status --short
