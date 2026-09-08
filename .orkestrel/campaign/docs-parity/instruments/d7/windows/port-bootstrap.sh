#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
bash "$SCAFFOLD/.orkestrel/campaign/docs-parity/instruments/d7/pass/port-instruments.sh"
test -f "$SCR/clone-fleet.sh"
git -C "$SCAFFOLD" fetch origin
git -C "$SCAFFOLD" log -1 --format='%h %s' origin/main
git -C "$SCAFFOLD" log -1 --format='%h %s' origin/claude/orkestrel-npm-audit-deps-14ibta
