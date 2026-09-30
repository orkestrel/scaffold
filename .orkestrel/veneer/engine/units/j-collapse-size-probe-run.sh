#!/usr/bin/env bash
# Runs J-COLLAPSE-SIZE-PROBE on this worktree's Chromium through this worktree's own `srcBrowser`.
# Usage: bash tmp/j-collapse-size/run.sh <log name>
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size || exit 1
npx vitest run --config C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size/tmp/j-collapse-size/vite.probe.config.ts --root C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/probe-collapse-size --reporter=verbose tmp/probe/j-collapse-size-probe.test.ts > "tmp/j-collapse-size/$1" 2>&1
echo "exit=$?" >> "tmp/j-collapse-size/$1"
