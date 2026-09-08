#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/claude/d7n-layer-wave-subjective-brief.md"
journal="$SCAFFOLD/tmp/claude/d7n-layer-wave-subjective.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-layer-wave-subjective.stderr.txt"
test -f "$brief"
test ! -e "$journal"
test ! -e "$stderr"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 900 claude -p "Read and follow $brief. Hold the subjective planner lane. Do not run commands, edit, delegate, inspect other lanes, or read credentials. Return the proposal as your final message." --agent planner --model opus --effort high --permission-mode plan --output-format stream-json --verbose > "$journal" 2> "$stderr"
