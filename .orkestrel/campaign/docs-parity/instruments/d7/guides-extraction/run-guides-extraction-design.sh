#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
timeout 1800 claude -p 'Read and follow C:/Users/mikes/WebstormProjects/scaffold/tmp/units/d7n-guides-extraction-design-brief.md. Hold the independent subjective planner lane. Use read-only tools and return the design proposal.' --agent planner --model opus --effort high --permission-mode plan --output-format stream-json --verbose > "$SCAFFOLD/tmp/claude/d7n-guides-extraction-design.jsonl" 2> "$SCAFFOLD/tmp/claude/d7n-guides-extraction-design.err"
