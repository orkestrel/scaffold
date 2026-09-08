#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
target="$FLEET/guide"
brief="$SCAFFOLD/tmp/claude/d7n-guide-heading-close-fix-brief.md"
journal="$SCAFFOLD/tmp/claude/d7n-guide-heading-close-fix.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-guide-heading-close-fix.err"
test -f "$brief"
test ! -e "$journal"
test ! -e "$stderr"
test "$(git -C "$target" rev-parse HEAD)" = 0accc1509113e67e2362a51cd9789e5b05005879
test -z "$(git -C "$target" status --porcelain --untracked-files=all)"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 2700 claude -p "Read $brief. Act as the sole implementer in $target. Use only Read, Grep, Glob, Edit and Write. Do not run Bash or any alternate execution, install, delegate, commit, publish, inspect credentials or change permissions. Root owns host validation. Return your report as the final message and do not write a report file." --agent implementer --model opus --effort high --permission-mode acceptEdits --add-dir "$target" --output-format stream-json --verbose > "$journal" 2> "$stderr"
