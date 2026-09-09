#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

journal="$SCAFFOLD/tmp/claude/d7n-parity-opus-capacity.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-parity-opus-capacity.err"

test ! -e "$journal"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 60 claude -p 'Reply LIVE only.' --model opus --effort high --permission-mode plan --output-format stream-json --verbose > "$journal" 2> "$stderr"
