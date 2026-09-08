#!/usr/bin/env bash
set -u
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 150 claude -p 'Read-only liveness probe. Use no tools. Return exactly LIVE.' --model opus --effort high --permission-mode default --output-format stream-json --verbose > "$SCAFFOLD/tmp/claude/d7n-session-reprobe.jsonl" 2> "$SCAFFOLD/tmp/claude/d7n-session-reprobe.err"
printf 'claude exit=%s\n' "$?"
claude auth login --help
