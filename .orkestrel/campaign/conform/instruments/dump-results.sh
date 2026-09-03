#!/usr/bin/env bash
# Dump every result of a workflow run to one JSON file per agent, named by the role and package the
# agent's first message states. Usage: dump-results.sh <runId> <outdir>
set -u
run=$1; out=$2
W=/root/.claude/projects/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/subagents/workflows/$run
mkdir -p "$out"
n=0
grep '"type":"result"' "$W/journal.jsonl" | while read -r line; do
  n=$((n + 1))
  id=$(printf '%s' "$line" | jq -r .agentId)
  head=$(head -n 1 "$W/agent-$id.jsonl" | jq -r '.message.content | if type=="string" then . else map(.text // "") | join(" ") end | .[0:400]')
  role=other
  case "$head" in
    *reconciliation\ lane*) role=reconcile ;;
    *running\ fix\ round\ 1*) role=fix1 ;;
    *running\ fix\ round\ 2*) role=fix2 ;;
    *\`implementer\`*) role=implement ;;
    *\`reviewer\`*) role=objective ;;
    *\`checker\`*) role=checker ;;
  esac
  pkg=$(printf '%s' "$head" | grep -o -E 'conform-[a-z]+-(audit-)?brief' | head -1 | sed -E 's/conform-([a-z]+)-.*/\1/')
  [ -z "$pkg" ] && pkg=$(printf '%s' "$head" | grep -o -E 'package [a-z]+' | head -1 | cut -d' ' -f2)
  [ -z "$pkg" ] && pkg=unknown
  case "$head" in *audit\ round\ 2*) role="${role}-r2" ;; *audit\ round\ 3*) role="${role}-r3" ;; *) [ "$role" = objective ] || [ "$role" = checker ] && role="${role}-r1" ;; esac
  printf '%s' "$line" | jq '.result' > "$out/$(printf '%02d' "$n")-$pkg-$role-$id.json"
  echo "$(printf '%02d' "$n") $pkg $role $id $(wc -c < "$out/$(printf '%02d' "$n")-$pkg-$role-$id.json")"
done
