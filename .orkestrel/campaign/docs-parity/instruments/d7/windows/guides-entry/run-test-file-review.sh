#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/claude/d7n-guides-test-file-audit-brief.md"
journal="$SCAFFOLD/tmp/claude/d7n-guides-test-file-review.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-guides-test-file-review.err"
test -f "$brief"
test -f "$SCR/guides-test-file-gates-verified/after-test.diff.txt"
test -f "$SCR/guides-test-file-gates-verified/status.txt"
test ! -e "$journal"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 1800 claude -p "Read and follow $brief. Hold the independent reviewer lane on Opus. Do not run commands, edit, delegate or read credentials. Return the verdict as your final message." --agent reviewer --model opus --effort high --permission-mode plan --output-format stream-json --verbose > "$journal" 2> "$stderr"
