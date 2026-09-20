#!/usr/bin/env bash
# Land U4b in Veneer: stage by pathspec from the retained round-2 status, commit with the drafted
# message, push. Orchestrator's tracked command, run only after u4b-audit-verdict-2.md accepts.
# Log: veneer-u4b-land.log.txt.txt.
set -u
VENEER="C:/Users/mikes/WebstormProjects/veneer"
STATUS="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/u4b-status-2.txt"
MSG="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/8082b48a-b39d-4cfd-ae0c-2f5c853292c4/scratchpad/u4b-commit-message.txt"
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/veneer-u4b-land.log.txt.txt"
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
