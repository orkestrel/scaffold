#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

brief="$SCAFFOLD/tmp/claude/d7n-parity-example-population-question-brief.md"
journal="$SCAFFOLD/tmp/claude/d7n-parity-example-population-question.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-parity-example-population-question.err"

test -f "$brief"
test ! -e "$journal"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 1800 claude -p "Read and follow $brief. Hold the independent subjective lane. Do not execute commands, edit, delegate or read credentials. Return the answer as your final message." --agent planner --model opus --effort high --permission-mode plan --output-format stream-json --verbose > "$journal" 2> "$stderr"
