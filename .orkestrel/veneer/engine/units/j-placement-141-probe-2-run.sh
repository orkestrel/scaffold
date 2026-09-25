#!/usr/bin/env bash
# Runs J-PLACEMENT-141-PROBE-2 on this worktree's Chromium through this worktree's own `srcBrowser`.
# Usage: bash tmp/j-placement-141/run-probe-2.sh <log name>
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-141b || exit 1
npx vitest run --config C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-141b/tmp/j-placement-141/vite.probe-141b.config.ts --root C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-141b --reporter=verbose tmp/probe/j-placement-141-probe-2.test.ts > "tmp/j-placement-141/$1" 2>&1
echo "exit=$?" >> "tmp/j-placement-141/$1"
