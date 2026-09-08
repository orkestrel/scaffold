#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/claude/d7n-guide-heading-design-brief.md"
journal="$SCAFFOLD/tmp/claude/d7n-guide-heading-design-subjective.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-guide-heading-design-subjective.err"
test -f "$brief"
test ! -e "$journal"
test ! -e "$stderr"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 1800 claude -p "Read $brief and hold the subjective design lane. The guide checkout is read-only. Do not run commands, edit files, delegate, or inspect the objective lane. Return the proposal only." --agent planner --model opus --effort high --permission-mode plan --add-dir "$FLEET/guide" --output-format stream-json --verbose > "$journal" 2> "$stderr"
