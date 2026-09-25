#!/usr/bin/env bash
# The Orchestrator's re-run of J-NATIVE-PROBE round 3 on Chromium 153 in the detached probe worktree, after a check that the
# worktree's file equals the retained units/j-native-probe-3.test.ts. The log lands beside the unit's own log.
set -u
T=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe
U=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
C=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/tools/vite.probe-worktree.config.ts
LOG=$U/j-native-probe-3-153-orchestrator.log.txt
cd "$T" || exit 1
{
	a=$(sha256sum tmp/probe/j-native-probe-3.test.ts | cut -c1-64); b=$(sha256sum "$U/j-native-probe-3.test.ts" | cut -c1-64)
	if [ "$a" = "$b" ]; then echo "probe: the worktree copy equals the retained copy ($a)"; else echo "PROBE DIFFERS: worktree $a, retained $b"; exit 3; fi
	git log --oneline -1
	npx vitest run --config "$C" --root "$T" --reporter=verbose tmp/probe/j-native-probe-3.test.ts 2>&1 | sed 's/\x1b\[[0-9;]*m//g'
	echo "vitest exit=${PIPESTATUS[0]}"
	git status --short
} > "$LOG" 2>&1
grep -c "ROW " "$LOG"; grep -E "CONTROL|Tests |exit=|DIFFERS" "$LOG" | cut -c1-160 | head -30
