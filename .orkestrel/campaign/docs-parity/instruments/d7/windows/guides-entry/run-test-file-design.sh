#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/claude/d7n-guides-test-file-design-brief.md"
journal="$SCAFFOLD/tmp/claude/d7n-guides-test-file-design.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-guides-test-file-design.err"
test -f "$brief"
test ! -e "$journal"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 1800 claude -p "Read and follow $brief. Hold the subjective planner lane. Do not run commands, edit, delegate, or read credentials. Return the proposal as your final message." --agent planner --model opus --effort high --permission-mode plan --add-dir "$FLEET/guide" --output-format stream-json --verbose > "$journal" 2> "$stderr"

