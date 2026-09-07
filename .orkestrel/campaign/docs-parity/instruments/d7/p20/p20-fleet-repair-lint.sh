#!/usr/bin/env bash
# P20: for every fleet checkout but guide and abort, a scratch clone with the checkout's node_modules linked,
# repair --offline from scaffold's extracted tip, then the real vendored rule's reading: diagnostics by rule and by file.
set -u
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7
TIP=$SCR/p18/scaffold-tip/package
OUT=$SCR/p20/clones
mkdir -p "$OUT"
for d in /home/user/fleet/*/; do
  n=$(basename "$d")
  [ "$n" = guide ] && continue
  [ "$n" = abort ] && continue
  C=$OUT/$n
  rm -rf "$C"; git clone -q "$d" "$C" 2>/dev/null || { echo "$n | clone failed"; continue; }
  ln -sfn "$d/node_modules" "$C/node_modules"
  ( cd "$C" && node "$TIP/dist/bin/main.js" repair --offline >/dev/null 2>&1; total=$(npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep -c 'error policy'); summary=$(npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep -c 'no-malformed-summary'); banned=$(npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep -c 'no-banned-term'); files=$(npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep 'error policy' | cut -d: -f1 | sort | uniq -c | sort -rn | head -4 | awk '{printf "%s(%s) ", $2, $1}'); echo "$n | total $total | summary $summary | banned $banned | $files" )
  rm -rf "$C"
done
