#!/usr/bin/env bash
# clone-fleet.sh: clones every package of the pass, and the guide, beside scaffold on the campaign branch, then installs each.
# Requires FLEET (the folder that holds the checkouts as <FLEET>/<pkg>) and SCR (logs land in $SCR/clone/). Skips a checkout that already exists. npm must be 11 or later.
set -u
: "${FLEET:?set FLEET}"; : "${SCR:?set SCR}"
mkdir -p "$SCR/clone"
BRANCH=claude/orkestrel-npm-audit-deps-14ibta
for p in abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace; do
  d="$FLEET/$p"
  if [ -d "$d/.git" ]; then echo "== $p present at $(git -C "$d" rev-parse --short HEAD)"; else git clone -q -b "$BRANCH" "https://github.com/orkestrel/$p" "$d" && echo "== $p cloned at $(git -C "$d" rev-parse --short HEAD)"; fi
  (cd "$d" && npm ci --ignore-scripts --no-audit --no-fund >"$SCR/clone/$p.log.txt" 2>&1 && echo "   installed" || echo "   INSTALL FAILED, see $SCR/clone/$p.log.txt")
done
