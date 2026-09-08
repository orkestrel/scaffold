#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
brief="$SCAFFOLD/tmp/claude/d7n-layer-inventory-instrument-3-audit-subjective-brief.md"
journal="$SCAFFOLD/tmp/claude/d7n-layer-inventory-instrument-3-audit-subjective.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-layer-inventory-instrument-3-audit-subjective.err"
test -f "$brief"
test -f "$SCAFFOLD/tmp/units/d7n-layer-inventory-instrument-3-report.md"
test -f "$SCR/d7n-layer-inventory-instrument-3/instrument.diff.txt"
test -f "$SCR/d7n-layer-inventory-instrument-3/status.txt"
test ! -e "$journal"
test ! -e "$stderr"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 1800 claude -p "Read and follow $brief. Hold the subjective reviewer lane. The returned report is tmp/units/d7n-layer-inventory-instrument-3-report.md. Do not run commands, edit, delegate, or read credentials. Return the verdict as your final message." --agent reviewer --model opus --effort high --permission-mode plan --output-format stream-json --verbose > "$journal" 2> "$stderr"
