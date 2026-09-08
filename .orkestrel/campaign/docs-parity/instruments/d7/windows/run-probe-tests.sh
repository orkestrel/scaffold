#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 5400 claude -p 'Read C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-probe-tests-windows-brief.md and execute its bounded assignment.' --agent builder --model sonnet --effort low --permission-mode acceptEdits --add-dir C:/Users/mikes/WebstormProjects/probe --output-format stream-json --verbose > "$SCAFFOLD/tmp/claude/d7n-probe-tests.jsonl" 2> "$SCAFFOLD/tmp/claude/d7n-probe-tests.err"
