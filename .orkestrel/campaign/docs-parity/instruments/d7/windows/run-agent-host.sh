#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

TARGET="$FLEET/agent"
BRIEF="$SCAFFOLD/tmp/units/d7n-agent-converge-fix-host-brief.md"
REPORT="$SCAFFOLD/tmp/units/d7n-agent-converge-fix-report.md"
JOURNAL="$SCAFFOLD/tmp/claude/d7n-agent-converge-fix-host.jsonl"
STDERR="$SCAFFOLD/tmp/claude/d7n-agent-converge-fix-host.err"

test -f "$BRIEF"
test ! -e "$REPORT"
test ! -e "$JOURNAL"
test ! -e "$STDERR"
test -z "$(git -C "$TARGET" status --porcelain --untracked-files=all)"
mkdir -p "$SCAFFOLD/tmp/claude"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 5400 claude -p "Read $BRIEF. Work only in $TARGET as the sole writer. Use only Read, Grep, Glob, Edit, and Write. Bash is forbidden. The Orchestrator owns host validation. Do not install, delegate, commit, or change permissions. Return the canonical report at $REPORT." --agent implementer --model opus --effort high --permission-mode acceptEdits --add-dir "$TARGET" --output-format stream-json --verbose > "$JOURNAL" 2> "$STDERR"
