#!/usr/bin/env bash
# Read the registry's latest version and every @orkestrel range each published package declares.
OUT=/home/user/work/registry.json
echo "{" > $OUT.tmp
first=1
for p in abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace scaffold; do
  j=$(npm view "@orkestrel/$p" version dependencies devDependencies peerDependencies optionalDependencies --json 2>/dev/null)
  [ -z "$j" ] && j='{"error":"unavailable"}'
  [ $first = 1 ] || echo "," >> $OUT.tmp; first=0
  printf '"%s": %s' "$p" "$j" >> $OUT.tmp
done
echo "}" >> $OUT.tmp
mv $OUT.tmp $OUT
echo "registry read $(date -u +%FT%TZ)"
