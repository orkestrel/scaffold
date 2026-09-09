#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/claude/d7n-guides-test-file-close-brief.md"
journal="$SCAFFOLD/tmp/claude/d7n-guides-test-file-close-review.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-guides-test-file-close-review.err"
test -f "$brief"
test -f "$SCR/guides-test-file-gates-accepted/after-test.diff.txt"
test -f "$SCR/guides-test-file-gates-accepted/status.txt"
test ! -e "$journal"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 1800 claude -p "Read and follow $brief. Hold the independent subjective reviewer lane on Opus. Do not execute commands, edit, delegate or read credentials. Return the verdict as your final message." --agent reviewer --model opus --effort high --permission-mode plan --output-format stream-json --verbose > "$journal" 2> "$stderr"
