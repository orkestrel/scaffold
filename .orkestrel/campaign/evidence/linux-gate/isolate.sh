#!/bin/bash
# Isolate what actually triggers the arborist null-parent crash on npm 10.9.7.
# Both vite and vitest declare @types/node as an OPTIONAL peer with different ranges.
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/isolate
rm -rf "$R"; mkdir -p "$R"
try() { # $1 label, $2 devDependencies JSON
  d="$R/$1"; mkdir -p "$d/cache" "$d/p"; cd "$d/p"
  node -e 'require("node:fs").writeFileSync("package.json",JSON.stringify({name:"iso",version:"0.0.1",private:true,type:"module",devDependencies:JSON.parse(process.argv[1])},null,1))' "$2"
  npm_config_cache="$d/cache" npm_config_legacy_peer_deps=false npm_config_strict_peer_deps=false \
    timeout 420 npm install --ignore-scripts --no-audit --no-fund >i.log 2>&1
  code=$?; crash="no"; grep -q edgesOut i.log && crash="yes"
  printf '%-38s exit=%-3s crash=%s\n' "$1" "$code" "$crash"
}
echo "npm $(npm -v) on node $(node -v)"
try "vite-only"                 '{"vite":"^8.2.2"}'
try "vitest-only"               '{"vitest":"^4.1.11"}'
try "vite+vitest"               '{"vite":"^8.2.2","vitest":"^4.1.11"}'
try "vite+vitest+types26"       '{"vite":"^8.2.2","vitest":"^4.1.11","@types/node":"^26.5.0"}'
try "vite+vitest+types22"       '{"vite":"^8.2.2","vitest":"^4.1.11","@types/node":"^22.0.0"}'
try "vitest+types26"            '{"vitest":"^4.1.11","@types/node":"^26.5.0"}'
echo "ISOLATE-DONE"
