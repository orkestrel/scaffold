#!/usr/bin/env bash
# Emit one line per new workflow result and on any real limit error in agent transcripts (API error shapes
# only, never prose quoting an earlier limit).
W=/root/.claude/projects/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/subagents/workflows
declare -A seen
while true; do
  for j in $W/*/journal.jsonl; do
    [ -f "$j" ] || continue
    run=$(basename $(dirname $j))
    n=$(grep -c '"type":"result"' "$j" 2>/dev/null)
    if [ "${seen[$run]}" != "$n" ]; then seen[$run]=$n; echo "$run results=$n"; fi
  done
  for a in $W/*/agent-*.jsonl; do
    [ -f "$a" ] || continue
    if [ -z "${seen[lim:$a]}" ] && tail -c 20000 "$a" | grep -qE 'rate_limit_error|overloaded_error|usage limit reached|hit your limit|limit will reset'; then seen[lim:$a]=1; echo "LIMIT error in $a"; fi
  done
  sleep 60
done
