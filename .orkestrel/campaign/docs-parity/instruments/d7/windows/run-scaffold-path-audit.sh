#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/claude/d7n-scaffold-path-audit-subjective-brief.md"
journal="$SCAFFOLD/tmp/claude/d7n-scaffold-path-audit-subjective.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-scaffold-path-audit-subjective.err"
test -f "$brief"
test -f "$SCR/scaffold-path/tmp/d7n-scaffold-path-fix-2/diff.patch"
test -f "$SCR/scaffold-path/tmp/d7n-scaffold-path-fix-2/setupPolicy-test.patch"
test -f "$SCR/scaffold-path/tmp/d7n-scaffold-path-fix-2/status.txt"
test ! -e "$journal"
test ! -e "$stderr"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 1800 claude -p "Read and follow $brief. Hold the subjective reviewer lane. Do not run commands, edit, delegate, or read credentials. Return the verdict as your final message." --agent reviewer --model opus --effort high --permission-mode plan --add-dir "$SCR/scaffold-path" --output-format stream-json --verbose > "$journal" 2> "$stderr"
