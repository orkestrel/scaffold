#!/usr/bin/env bash
# F5b: re-pack scaffold's tip after the config-face fix, re-extract it for the pass, then re-repair the held P.1 trees
# (sqlite, indexeddb) and the landed checkouts with no live writer (abort, budget, csv), taking test:config as the
# deciding reading in each. Orchestrator-owned tracked command; log beside it.
set -u
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
export PATH=/opt/npm11/bin:$PATH
cd /home/user/scaffold || exit 9
echo "== F5b $(date -u +%FT%TZ) at $(git rev-parse --short HEAD)"
mv "$SCR/packed/orkestrel-scaffold-0.0.63.tgz" "$SCR/packed/orkestrel-scaffold-0.0.63-prev.tgz"
npm pack --pack-destination "$SCR/packed" 2>&1 | tail -1; sha256sum "$SCR/packed/orkestrel-scaffold-0.0.63.tgz" | cut -c1-16
rm -rf "$SCR/tip/package" && mkdir -p "$SCR/tip" && tar -xzf "$SCR/packed/orkestrel-scaffold-0.0.63.tgz" -C "$SCR/tip" && ln -sfn /home/user/scaffold/node_modules "$SCR/tip/package/node_modules"
echo "== the packed vendored test carries the fix:"; grep -c 'declares no rootDir' "$SCR/tip/package/dist/host/tests/config.test.ts"
TIP=$SCR/tip/package
for n in sqlite indexeddb abort budget csv; do
  d=/home/user/fleet/$n; echo "### $n"; cd "$d" || continue
  echo "-- status before"; git status --short | tr '\n' ' '; echo
  node "$TIP/dist/bin/main.js" repair --offline 2>&1 | tail -1
  echo "-- status after"; git status --short | tr '\n' ' '; echo
  echo "-- test:config"; npm run test:config 2>&1 | grep -E 'Tests |FAIL' | tail -2; echo "   exit ${PIPESTATUS[0]}"
done
echo "== done $(date -u +%FT%TZ)"
