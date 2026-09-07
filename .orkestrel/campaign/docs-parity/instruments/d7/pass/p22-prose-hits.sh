#!/usr/bin/env bash
# P22: for every package whose P21b section shows a prose-rule failure, the exact hits (line, message, path) after
# repair --offline in a scratch clone, written to p21/prose-<pkg>.txt for the P.1 brief. Skips packages already captured.
set -u
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
TIP=$SCR/tip/package
export PATH=/opt/npm11/bin:$PATH
LOG=$SCR/p21/p22-prose-hits.log.txt; : > "$LOG"
pkgs=$(awk '/^### /{n=$2} /rule: .prose./{print n}' $SCR/p21/p21b-fleet-readings.log.txt | sort -u)
for n in $pkgs; do
  [ -s "$SCR/p21/prose-$n.txt" ] && { echo "$n: already captured" >> "$LOG"; continue; }
  d=/home/user/fleet/$n; C=$SCR/p21/probe-$n; rm -rf "$C"
  git clone -q "$d" "$C" 2>/dev/null || { echo "$n: clone failed" >> "$LOG"; continue; }
  ln -sfn "$d/node_modules" "$C/node_modules"
  ( cd "$C" && node "$TIP/dist/bin/main.js" repair --offline >/dev/null 2>&1; timeout 300 npx vitest run --config vite.config.ts --no-cache --project policy --reporter=default 2>&1 | grep -E '"line"|"message"|"path"' | paste - - - | sed 's/ *"line": //; s/, *"message": / /; s/, *"path": / /; s/,$//' > "$SCR/p21/prose-$n.txt" )
  echo "$n: $(wc -l < "$SCR/p21/prose-$n.txt") hits" >> "$LOG"
  rm -rf "$C"
done
echo "P22 DONE" >> "$LOG"
