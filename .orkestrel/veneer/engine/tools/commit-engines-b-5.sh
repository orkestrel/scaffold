#!/usr/bin/env bash
# Commits J-SAMEWAY-ENGINES-B round 5 in its worktree and retains the round under units/ in the same action (2026-09-25):
# the status, the diff, the probes (the recorder, the platform reproduction, the workbench config, and the scripts), and
# the logs, with the j-sameway-engines-b-5- prefix. The report is retained already.
# Usage: bash commit-engines-b-5.sh <message-file>
set -u
MESSAGE="$1"
TREE=/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b
UNITS=/c/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units
T=$TREE/tmp/j-sameway-engines-b
cd "$TREE" || exit 1
git status --short > "$UNITS/j-sameway-engines-b-5-status.txt"
git add -- tests/src/browser/Tooltip.test.ts tests/src/browser/Popover.test.ts
git commit -q -F "$MESSAGE"; echo "commit exit=$?"
git log --oneline -1
git diff 3bb9afb HEAD > "$UNITS/j-sameway-engines-b-5.diff"
cp "$TREE/tmp/probe/recorder.ts" "$UNITS/j-sameway-engines-b-5-recorder.ts"
cp "$TREE/tmp/probe/platform/loop.test.ts" "$UNITS/j-sameway-engines-b-5-loop.test.ts"
cp "$TREE/tmp/probe/vitest.probe.config.ts" "$UNITS/j-sameway-engines-b-5-vitest.probe.config.ts"
for f in accept.sh analyze.py copy.py run.sh summarize.py task.py; do cp "$T/$f" "$UNITS/j-sameway-engines-b-5-$f"; done
for f in summary.txt platform.log.txt accept-Tooltip.log.txt accept-Popover.log.txt tooltip-2396.log.txt tooltip-3147.log.txt tooltip-3373.log.txt popover-794.log.txt control-tooltip.log.txt control-popover.log.txt; do cp "$T/logs/$f" "$UNITS/j-sameway-engines-b-5-$f"; done
ls "$UNITS" | grep -c "^j-sameway-engines-b-5-"
