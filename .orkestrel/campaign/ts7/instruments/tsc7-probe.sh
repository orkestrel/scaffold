#!/bin/bash
# Read-only probe: run TypeScript 7.0.2's tsc (through the npx cache, never installed into the repository) against scaffold's own tsconfigs with --noEmit, then emit core declarations into the scratchpad for comparison.
set -u
cd /home/user/scaffold || exit 2
OUT=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts7
echo "== version"; npx -y -p typescript@7.0.2 tsc --version 2>&1 | tail -n 2; echo "exit=$?"
for cfg in tsconfig.json configs/src/tsconfig.core.json configs/src/tsconfig.server.json configs/src/tsconfig.bin.json; do
  echo "== tsc --noEmit -p $cfg (7.0.2)"; npx -y -p typescript@7.0.2 tsc --noEmit -p "$cfg" > "$OUT/noEmit-$(basename $cfg .json).log" 2>&1; echo "exit=$?"; tail -n 12 "$OUT/noEmit-$(basename $cfg .json).log"
done
echo "== 6.0.3 baseline on the same configs"; for cfg in tsconfig.json configs/src/tsconfig.core.json; do npx tsc --noEmit -p "$cfg" > "$OUT/noEmit6-$(basename $cfg .json).log" 2>&1; echo "$cfg exit=$?"; done
echo "== declaration emit of core with 7.0.2 into the scratchpad"; rm -rf "$OUT/decl7"; npx -y -p typescript@7.0.2 tsc -p configs/src/tsconfig.core.json --declaration --emitDeclarationOnly --noEmit false --outDir "$OUT/decl7" > "$OUT/decl7.log" 2>&1; echo "exit=$?"; tail -n 8 "$OUT/decl7.log"; find "$OUT/decl7" -name '*.d.ts' | wc -l
echo "== import ts from 'typescript' under 7.0.2"; mkdir -p "$OUT/imp" && cd "$OUT/imp" && printf '{"name":"imp","private":true,"type":"module"}\n' > package.json && npm install --silent --no-audit --no-fund typescript@7.0.2 >/dev/null 2>&1; echo "install exit=$?"; node -e "import('typescript').then(m=>console.log('default:',typeof m.default, 'keys:', Object.keys(m).slice(0,8).join(','), 'version:', m.default && m.default.version || m.version))" 2>&1 | tail -n 3; node -e "import('typescript/unstable/ast').then(m=>console.log('ast keys:', Object.keys(m).slice(0,20).join(',')))" 2>&1 | tail -n 3; node -e "import('typescript/unstable/sync').then(m=>console.log('sync keys:', Object.keys(m).slice(0,12).join(',')))" 2>&1 | tail -n 3
