#!/usr/bin/env bash
# U1 declaration-baseline: reproduce each face's single-file rollup with tsc 6.0.3 emit + api-extractor's own engine,
# and diff -w (comments and blank lines dropped) against the shipped dist rollup vite-plugin-dts produced on the same tree.
set -u
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/u1
INV="$S/api-extractor-invoke.cjs"
mat() { grep -vE '^\s*$|^\s*//|^\s*/\*|^\s*\*' "$1"; }
face() { # <checkout> <facekey> <tsconfig rel> <entry rel under emit> <shipped dist rel> <corerewrite:yes|no>
  local co=$1 key=$2 tcfg=$3 entry=$4 dist=$5 rewrite=$6
  local root="$co" out="$S/$(basename $co)-$key/emit" roll="$S/$(basename $co)-$key/rollup.d.ts"
  rm -rf "$(dirname "$out")"; mkdir -p "$out" "$(dirname "$roll")"
  local TSC="node $co/node_modules/typescript/bin/tsc"
  echo "== $(basename $co) $key: tsc --version $($TSC --version)"
  $TSC -p "$co/$tcfg" --declaration --emitDeclarationOnly --noEmit false --outDir "$out" > "$(dirname "$out")/emit.log" 2>&1
  echo "tsc-emit exit=$? files=$(find "$out" -name '*.d.ts' | wc -l) entry=$([ -f "$out/$entry" ] && echo yes || echo NO)"
  "$co/node_modules/typescript/bin/tsc" --showConfig -p "$co/$tcfg" > "$(dirname "$out")/showconfig.json" 2>/dev/null
  node -e "const j=require('$(dirname "$out")/showconfig.json');const co=j.compilerOptions||{};if('$key'.indexOf('core')>=0){co.types=['node']}require('fs').writeFileSync('$(dirname "$out")/co.json',JSON.stringify(co))"
  node "$INV" "$out/$entry" "$roll" "$root" "$co/package.json" "$([ "$key" = core ] && echo core || echo other)" "$(dirname "$out")/showconfig.json" 2>&1 | tail -3
  echo "invoke-exit=$?"
  if [ "$rewrite" = yes ]; then
    node -e "const fs=require('fs');let c=fs.readFileSync('$roll','utf8');c=c.replace(/(?:\.\.\/)+core\/index\.[jt]s/g,'@orkestrel/scaffold').replace(/@src\/core/g,'@orkestrel/scaffold');fs.writeFileSync('$roll',c)"
  fi
  echo "rollup-lines=$(wc -l < "$roll" 2>/dev/null) shipped-lines=$(wc -l < "$co/$dist" 2>/dev/null)"
  echo "-- material diff (shipped < vs > reproduced), first 40 lines:"
  diff -w <(mat "$co/$dist") <(mat "$roll") | head -40
  echo "material-diff-lines=$(diff -w <(mat "$co/$dist") <(mat "$roll") | grep -cE '^[<>]')"
  echo "-- import-line diff:"
  diff <(grep -E '^import' "$co/$dist") <(grep -E '^import' "$roll") | head -30
  echo
}
face /home/user/scaffold core configs/src/tsconfig.core.json index.d.ts dist/src/core/index.d.ts no
face /home/user/scaffold server configs/src/tsconfig.server.json server/index.d.ts dist/src/server/index.d.ts yes
face /home/user/fleet/console core configs/src/tsconfig.core.json index.d.ts dist/src/core/index.d.ts no
face /home/user/fleet/console browser configs/src/tsconfig.browser.json browser/index.d.ts dist/src/browser/index.d.ts yes
face /home/user/fleet/console server configs/src/tsconfig.server.json server/index.d.ts dist/src/server/index.d.ts yes
echo "== leftover check (no writes into any checkout tree)"
for c in /home/user/scaffold /home/user/fleet/console; do echo "$c: $(git -C $c status --short | grep -v '.orkestrel/campaign' | head -3 | tr '\n' '|')"; done
