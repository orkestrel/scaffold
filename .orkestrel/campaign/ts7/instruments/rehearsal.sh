#!/bin/bash
# Rehearsal, outside the repository: a git-archive copy of scaffold at HEAD moved to typescript@7.0.2 with the
# @typescript/typescript6 bridge, every in-process API import re-pointed at the bridge, then the gates run there.
set -u
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts7
R=$S/rehearsal; rm -rf "$R"; mkdir -p "$R"
git archive --format=tar HEAD | tar -x -C "$R"
cd "$R" || exit 2
echo "== HEAD $(git -C /home/user/scaffold rev-parse --short HEAD) copied to $R"
echo "== re-point the in-process API imports at the bridge"
for f in tests/setupPolicy.ts tests/guides.test.ts tests/distribution.test.ts tests/src/core/templates.test.ts; do sed -i "s#from 'typescript'#from '@typescript/typescript6'#" "$f"; done
sed -i "s#{{launcher}}import ts from 'typescript'#{{launcher}}import ts from '@typescript/typescript6'#" src/core/templates.ts
grep -rn "from 'typescript'\|from '@typescript/typescript6'" src tests | cut -c1-110
echo "== manifest: typescript ^7.0.2, bridge added"
node -e 'const fs=require("fs");const p=JSON.parse(fs.readFileSync("package.json","utf8"));p.devDependencies.typescript="^7.0.2";p.devDependencies["@typescript/typescript6"]="^6.0.2";fs.writeFileSync("package.json",JSON.stringify(p,null,"\t")+"\n")'
echo "== npm install (registry through the proxy)"; T0=$(date +%s); npm install --no-audit --no-fund > install.log 2>&1; echo "install exit=$? in $(( $(date +%s) - T0 ))s"; tail -n 3 install.log
node -e 'for (const p of ["typescript","@typescript/typescript6","vite-plugin-dts","unplugin-dts","@microsoft/api-extractor","vitest","vite"]) { try { console.log(p, require(p+"/package.json").version) } catch (e) { console.log(p, "missing") } }'
for step in "format:check" "lint:check" "check" "build" "test:src:core" "test:src:server" "test:src:bin" "test:policy" "test:config" "test:setup" "test:guides"; do
  T0=$(date +%s); npm run $step > "log-$(echo $step | tr ':' '-').txt" 2>&1; E=$?; echo "== npm run $step → exit $E in $(( $(date +%s) - T0 ))s"; [ $E -ne 0 ] && grep -v "^$" "log-$(echo $step | tr ':' '-').txt" | tail -n 25
done
echo "== host.json digest drift after the vendored setupPolicy.ts edit (rebuilt by build:inventory above)"; git -C /home/user/scaffold show HEAD:host.json | md5sum; md5sum host.json
echo "== distribution proof in release mode under npm 11 (the reading the roadmap carries)"; T0=$(date +%s); PATH=/opt/npm11/bin:$PATH npm run test:distribution -- --mode release > log-test-distribution.txt 2>&1; echo "exit=$? in $(( $(date +%s) - T0 ))s"; tail -n 6 log-test-distribution.txt
