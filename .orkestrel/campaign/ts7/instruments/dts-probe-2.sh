#!/bin/bash
# Successor of dts-probe.sh: (A) vite-plugin-dts with typescript@7.0.2 plus the @typescript/typescript6 bridge; (B) api-extractor over tsgo-emitted declarations with the project package.json in place.
set -u
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts7
cd $S/dts || exit 2
echo "== A1: typescript@7.0.2 + @typescript/typescript6 + vite-plugin-dts@5.0.3"
npm install --silent --no-audit --no-fund typescript@7.0.2 @typescript/typescript6@latest vite-plugin-dts@5.0.3 >/dev/null 2>&1; echo "install exit=$?"
node -e 'for (const p of ["typescript","@typescript/typescript6","vite-plugin-dts","unplugin-dts","@microsoft/api-extractor"]) { try { console.log(p, require(p+"/package.json").version) } catch (e) { console.log(p, "missing") } }'
rm -rf dist; npx vite build > build-bridge-5.0.3.log 2>&1; echo "exit=$?"; tail -n 8 build-bridge-5.0.3.log; ls dist 2>/dev/null; [ -f dist/index.d.ts ] && cat dist/index.d.ts
echo "== A2: same with vite-plugin-dts@5.1.0"
npm install --silent --no-audit --no-fund vite-plugin-dts@5.1.0 >/dev/null 2>&1; node -e 'console.log("vite-plugin-dts", require("vite-plugin-dts/package.json").version, "unplugin-dts", require("unplugin-dts/package.json").version)'
rm -rf dist; npx vite build > build-bridge-5.1.0.log 2>&1; echo "exit=$?"; tail -n 6 build-bridge-5.1.0.log; ls dist 2>/dev/null
echo "== A3: does the bridge carry the old API? (createSourceFile, transpileModule, version)"
node -e "const ts=require('@typescript/typescript6'); console.log('version', ts.version, 'createSourceFile', typeof ts.createSourceFile, 'transpileModule', typeof ts.transpileModule, 'forEachChild', typeof ts.forEachChild, 'sys', typeof ts.sys)"
echo "== B: api-extractor over tsgo-emitted declarations"
ls -la $S/decl7/package.json $S/decl7-tsconfig.json 2>&1 | cut -c1-120
cat $S/decl7/package.json
cd $S/dts && npx api-extractor run --local --config $S/api-extractor.json > $S/api-extractor-2.log 2>&1; echo "api-extractor exit=$?"; grep -v "^\s*$" $S/api-extractor-2.log | tail -n 14; ls -l $S/decl7-out 2>/dev/null; [ -f $S/decl7-out/rollup.d.ts ] && echo "rollup: $(grep -c '^\s*/\*\*' $S/decl7-out/rollup.d.ts) doc blocks, $(grep -c '@remarks' $S/decl7-out/rollup.d.ts) @remarks, $(wc -l < $S/decl7-out/rollup.d.ts) lines" && grep -n -m1 -A6 "Names how an artifact" $S/decl7-out/rollup.d.ts
