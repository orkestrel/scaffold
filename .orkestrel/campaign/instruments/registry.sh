#!/usr/bin/env bash
set -u
OUT=/home/user/scaffold/tmp/fleet/registry.tsv
: > "$OUT"
for r in abort agent brief browser budget console contract csv database emitter form guide html indexeddb interpret markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router scaffold sea server sqlite sse supervisor table template terminal test timeout tool toolbox websocket worker workflow workspace; do
  v=$(timeout 60 npm view "@orkestrel/$r" version 2>/dev/null || echo "UNPUBLISHED")
  local_v=$(node -e "try{console.log(require('/home/user/$r/package.json').version)}catch(e){console.log('NOLOCAL')}" 2>/dev/null)
  printf "%s\t%s\t%s\n" "$r" "${v:-UNPUBLISHED}" "$local_v" >> "$OUT"
done
echo "DONE" >> "$OUT"
