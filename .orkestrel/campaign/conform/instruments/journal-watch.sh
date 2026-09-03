#!/usr/bin/env bash
# Emit one line per new workflow result, per agent boot, and on any session/usage-limit string in agent transcripts.
W=/root/.claude/projects/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/subagents/workflows
declare -A seen
while true; do
  for j in $W/*/journal.jsonl; do
    [ -f "$j" ] || continue
    run=$(basename $(dirname $j))
    n=$(grep -c '"type":"result"' "$j" 2>/dev/null); b=$(grep -c '"type":"agent_start"\|"type":"start"' "$j" 2>/dev/null)
    key="$run:$n:$b"
    if [ "${seen[$run]}" != "$key" ]; then seen[$run]=$key; echo "$run results=$n boots=$b"; fi
    if [ -z "${seen[done:$run]}" ] && grep -q '"type":"workflow_end"\|"type":"end"\|"type":"complete"' "$j" 2>/dev/null; then seen[done:$run]=1; echo "$run WORKFLOW END"; fi
  done
  for a in $W/*/agent-*.jsonl; do
    [ -f "$a" ] || continue
    if [ -z "${seen[lim:$a]}" ] && tail -c 20000 "$a" | grep -qiE 'session limit|usage limit|rate_limit|overloaded_error'; then seen[lim:$a]=1; echo "LIMIT signal in $a"; fi
  done
  sleep 60
done
