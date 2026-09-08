#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
RECORD="$SCAFFOLD/.orkestrel/campaign/docs-parity"
mkdir -p "$RECORD/instruments/d7/windows"
for instrument in pass-env.sh host-check.sh bench-probes.sh reprobe-claude.sh port-bootstrap.sh run-clone.sh push-bootstrap.sh; do
  cp "$SCR/$instrument" "$RECORD/instruments/d7/windows/$instrument"
done
cp "$SCAFFOLD/tmp/units/d7n-session-sol-liveness-brief.md" "$RECORD/d7n-session-sol-liveness-brief.md"
git -C "$SCAFFOLD" diff --check -- .orkestrel/campaign/docs-parity
git -C "$SCAFFOLD" switch -c claude/orkestrel-npm-audit-deps-14ibta
git -C "$SCAFFOLD" add -- .orkestrel/campaign/docs-parity
git -C "$SCAFFOLD" -c user.name=Claude -c user.email=noreply@anthropic.com commit --only .orkestrel/campaign/docs-parity -F "$SCR/bootstrap-message.txt"
git -C "$SCAFFOLD" push -u origin claude/orkestrel-npm-audit-deps-14ibta
git -C "$SCAFFOLD" push origin HEAD:main
git -C "$SCAFFOLD" push origin HEAD:claude/docs-parity-windows-01a0810d
git -C "$SCAFFOLD" status --short --branch
