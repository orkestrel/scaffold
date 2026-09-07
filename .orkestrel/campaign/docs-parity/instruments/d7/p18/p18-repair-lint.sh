#!/usr/bin/env bash
# P18: in scratch clones of two fleet packages, run `repair --offline` from scaffold's packed tip and read lint:check.
set -u
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7
TIP=$SCR/p18/scaffold-tip
mkdir -p "$TIP" && tar -xzf "$SCR/../../docs/d7/../d4/packed/orkestrel-scaffold-0.0.63.tgz" -C "$TIP" 2>/dev/null || tar -xzf "$(ls /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/*/packed/orkestrel-scaffold-0.0.63.tgz | head -1)" -C "$TIP"
ln -sfn /home/user/scaffold/node_modules "$TIP/package/node_modules"
echo "== tip"; node -p "require('$TIP/package/package.json').version"; ls "$TIP/package/dist/host/scripts/docs.ts"
for n in abort mcp; do
  C=$SCR/p18/$n
  rm -rf "$C"; git clone -q /home/user/fleet/$n "$C" && ln -sfn /home/user/fleet/$n/node_modules "$C/node_modules"
  cd "$C" || exit 9
  echo "== $n: repair --offline"; node "$TIP/package/dist/bin/main.js" repair --offline 2>&1 | tail -3
  echo "== $n: git status"; git status --short | tr '\n' ' '; echo
  echo "== $n: lint:check"; npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep -c 'error policy'; npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep 'error policy' | cut -d: -f1 | sort | uniq -c | sort -rn | head -6
  echo "== $n: lint rules hit"; npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep -o 'policy([a-z-]*)' | sort | uniq -c
done
