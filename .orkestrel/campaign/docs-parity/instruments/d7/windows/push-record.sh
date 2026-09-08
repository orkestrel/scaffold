#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

BRANCH=claude/orkestrel-npm-audit-deps-14ibta
RECORD=.orkestrel/campaign/docs-parity

test "$(git -C "$SCAFFOLD" branch --show-current)" = "$BRANCH"
git -C "$SCAFFOLD" diff --check -- "$RECORD"
git -C "$SCAFFOLD" add -- "$RECORD"
git -C "$SCAFFOLD" -c user.name=Claude -c user.email=noreply@anthropic.com commit --only -F "$SCR/record-message.txt" -- "$RECORD"
git -C "$SCAFFOLD" push -u origin "$BRANCH"
git -C "$SCAFFOLD" push origin HEAD:main
git -C "$SCAFFOLD" push origin HEAD:claude/docs-parity-windows-01a0810d
git -C "$SCAFFOLD" rev-parse HEAD
git -C "$SCAFFOLD" status --short
