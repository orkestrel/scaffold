#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
mkdir -p "$SCR/guides-extraction"
git -C "$SCAFFOLD" diff HEAD -- . ':!.orkestrel/campaign/docs-parity' > "$SCR/guides-extraction/design.diff"
git -C "$SCAFFOLD" status --porcelain > "$SCR/guides-extraction/design.status"
git -C "$FLEET/guide" status --porcelain > "$SCR/guides-extraction/guide.status"
git -C "$FLEET/guide" fetch origin
git -C "$FLEET/guide" rev-parse HEAD origin/main origin/claude/orkestrel-npm-audit-deps-14ibta > "$SCR/guides-extraction/design.state"
git -C "$FLEET/guide" merge-base --is-ancestor origin/main HEAD
node --version
npm --version
claude --version
timeout 150 claude -p 'Read-only liveness probe. Use no tools. Return exactly LIVE.' --model opus --effort high --permission-mode plan --output-format stream-json --verbose > "$SCAFFOLD/tmp/claude/d7n-guides-extraction-liveness.jsonl" 2> "$SCAFFOLD/tmp/claude/d7n-guides-extraction-liveness.err"
