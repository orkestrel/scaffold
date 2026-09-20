#!/usr/bin/env bash
# Land U1-conform in Veneer: stage by pathspec from the retained round-5 status, commit with the drafted
# message, push. Orchestrator's tracked command, run only after u1-conform-audit-verdict-5.md accepts.
# Log: veneer-u1-conform-land.log.txt.txt.
set -u
VENEER="C:/Users/mikes/WebstormProjects/veneer"
STATUS="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/u1-conform-status-5.txt"
MSG="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/8082b48a-b39d-4cfd-ae0c-2f5c853292c4/scratchpad/u1-conform-commit-message.txt"
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/veneer-u1-conform-land.log.txt.txt"
cd "$VENEER" || exit 9
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) start $(git log --oneline -1)" > "$LOG"
paths=$(cut -c4- "$STATUS")
echo "$paths" >> "$LOG"
# shellcheck disable=SC2086
git add -- $paths >> "$LOG" 2>&1
echo "exit[add]=$?" >> "$LOG"
git status --porcelain | grep -v '^??' >> "$LOG"
git commit -F "$MSG" >> "$LOG" 2>&1
echo "exit[commit]=$?" >> "$LOG"
git push origin main >> "$LOG" 2>&1
echo "exit[push]=$?" >> "$LOG"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) end $(git log --oneline -1)" >> "$LOG"
grep -E "^exit\[|^== " "$LOG"
