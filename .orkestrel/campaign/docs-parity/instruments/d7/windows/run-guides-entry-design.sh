#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/claude/d7n-guides-entry-design-host-brief.md"
journal="$SCAFFOLD/tmp/claude/d7n-guides-entry-design-subjective.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-guides-entry-design-subjective.err"
test -f "$brief"
test ! -e "$journal"
test ! -e "$stderr"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 1800 /c/Users/mikes/scoop/shims/claude.exe -p "Read $brief and the adjacent base brief. Hold the subjective design lane. The guide and scaffold checkouts are read-only. Use your read tools, do not run commands, edit, delegate, or inspect the objective lane. Return the bounded proposal only." --agent planner --model opus --effort high --permission-mode plan --add-dir "$FLEET/guide" --output-format stream-json --verbose > "$journal" 2> "$stderr"
