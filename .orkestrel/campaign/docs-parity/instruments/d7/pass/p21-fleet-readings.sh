#!/usr/bin/env bash
# P21: for every fleet checkout but guide and abort, in pass order, a scratch clone with the checkout's node_modules
# linked and the guide head start's readers reachable through the clone's own link, repair --offline from the pass tip,
# then the readings every P.1 brief states as expected: git status after repair, npm run docs, npm run check (tail),
# npm run test:guides (summary), npm run test:policy (failures with their first assertion lines).
set -u
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7
TIP=$SCR/pass/tip/package
TGZ=$SCR/pass/packed/orkestrel-guide-0.0.18.tgz
OUT=$SCR/pass/p21
LOG=$OUT/p21-fleet-readings.log.txt
export PATH=/opt/npm11/bin:$PATH
ORDER="codec msg sse contract test budget csv emitter html indexeddb ndjson sqlite timeout tool console database form markdown pool process reason router table template websocket browser interpret lsp qualifier queue rater relation sea server terminal workspace brief mcp middleware program worker workflow agent probe ollama toolbox"
: > "$LOG"
for n in $ORDER; do
  d=/home/user/fleet/$n
  [ -d "$d" ] || { echo "### $n | no checkout" >> "$LOG"; continue; }
  C=$OUT/clone-$n
  rm -rf "$C"; git clone -q "$d" "$C" 2>/dev/null || { echo "### $n | clone failed" >> "$LOG"; continue; }
  # a private node_modules view: the checkout's node_modules linked entry by entry, with @orkestrel/guide replaced by the head start
  mkdir -p "$C/node_modules/@orkestrel" "$C/node_modules/.bin"
  for e in "$d"/node_modules/* "$d"/node_modules/.bin; do
    b=$(basename "$e"); [ "$b" = "@orkestrel" ] && continue; [ "$b" = ".bin" ] && continue; ln -sfn "$e" "$C/node_modules/$b"; done
  for e in "$d"/node_modules/.bin/*; do ln -sfn "$e" "$C/node_modules/.bin/$(basename "$e")"; done
  for e in "$d"/node_modules/@orkestrel/*; do b=$(basename "$e"); [ "$b" = guide ] && continue; ln -sfn "$e" "$C/node_modules/@orkestrel/$b"; done
  mkdir -p "$C/node_modules/@orkestrel/guide" && tar -xzf "$TGZ" -C "$C/node_modules/@orkestrel/guide" --strip-components=1
  {
    echo "### $n ($(cd "$d" && git rev-parse --short HEAD), version $(node -p "require('$d/package.json').version"), guide range $(node -p "require('$d/package.json').devDependencies['@orkestrel/guide']"), head start $(node -p "require('$C/node_modules/@orkestrel/guide/package.json').version"))"
    cd "$C" || exit 9
    echo "-- repair"; node "$TIP/dist/bin/main.js" repair --offline 2>&1 | tail -1; git status --short | sed 's/^/   /'
    echo "-- lint"; npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep 'error policy' | cut -d: -f1 | sort | uniq -c | sort -rn | awk '{printf "   %s(%s)\n", $2, $1}'
    echo "-- docs"; timeout 120 npm run docs 2>&1 | grep -v '^$' | grep -v '^>' | sed 's/^/   /' | tail -60; echo "   exit ${PIPESTATUS[0]}"
    echo "-- check"; timeout 300 npm run check 2>&1 | grep 'error TS' | sed 's/^/   /' | head -20; echo "   exit ${PIPESTATUS[0]}"
    echo "-- test:guides"; timeout 300 npm run test:guides 2>&1 | grep -E 'Tests |Test Files|failed' | sed 's/^/   /' | tail -4; echo "   exit ${PIPESTATUS[0]}"
    echo "-- test:policy"; timeout 300 npm run test:policy --  --reporter=default 2>&1 | grep -E '^ *(FAIL|×|✗|AssertionError|Error:|- Expected|\+ Received|Tests |Test Files)|^\s+[+-] ' | sed 's/^/   /' | head -80; echo "   exit ${PIPESTATUS[0]}"
    echo
  } >> "$LOG" 2>&1
  rm -rf "$C"
done
echo "### P21 DONE" >> "$LOG"
