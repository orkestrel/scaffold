#!/bin/bash
# The npx launch form contaminates a version self-report: `npx npm@X install`
# runs X's CLI but devEngines reads the ambient npm version. Install each npm
# into its own prefix and invoke its bin directly so `current.version` is true.
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/directnpm
rm -rf "$R"; mkdir -p "$R/bin"
echo "ambient npm $(npm -v) on node $(node -v)"

for v in 11.5.0 11.6.0; do
  npm install --silent --no-audit --no-fund --prefix "$R/bin/$v" "npm@$v" >/dev/null 2>&1
  cli="$R/bin/$v/node_modules/npm/bin/npm-cli.js"
  [ -f "$cli" ] && echo "installed npm $v -> self-reports $(node "$cli" --version)"
done

run() { # $1 npm version, $2 label, $3 manifest
  local cli
  if [ "$1" = "ambient" ]; then cli=""; else cli="$R/bin/$1/node_modules/npm/bin/npm-cli.js"; fi
  d="$R/$2-$1"; mkdir -p "$d/cache" "$d/p"; cd "$d/p"
  printf '%s\n' "$3" > package.json
  if [ -z "$cli" ]; then
    npm_config_cache="$d/cache" timeout 420 npm install --ignore-scripts --no-audit --no-fund >i.log 2>&1
  else
    npm_config_cache="$d/cache" timeout 420 node "$cli" install --ignore-scripts --no-audit --no-fund >i.log 2>&1
  fi
  code=$?
  crash="no"; grep -q edgesOut i.log && crash="yes"
  ref="no"; grep -q EBADDEVENGINES i.log && ref="yes"
  cur=$(grep -oE "current: \{ name: 'npm', version: '[^']+'" i.log | head -1 | grep -oE "[0-9]+\.[0-9]+\.[0-9]+")
  added=$(grep -oE "added [0-9]+ packages" i.log | head -1)
  printf '  %-9s %-16s exit=%-3s refused=%-4s crash=%-4s current=%-9s %s\n' "$1" "$2" "$code" "$ref" "$crash" "${cur:-–}" "${added:-–}"
}

PLAIN='{"name":"p","version":"0.0.1","private":true,"type":"module","devDependencies":{"vitest":"^4.1.11"}}'
GUARD='{"name":"p","version":"0.0.1","private":true,"type":"module","engines":{"node":">=22.18.0"},"devEngines":{"packageManager":{"name":"npm","version":">=11.6.0","onFail":"error"}},"devDependencies":{"vitest":"^4.1.11"}}'

echo "--- no guard: does the crash track the npm actually running? ---"
run ambient  "plain" "$PLAIN"
run 11.5.0   "plain" "$PLAIN"
run 11.6.0   "plain" "$PLAIN"
echo "--- devEngines guard: must REFUSE below 11.6.0 and ADMIT at/above ---"
run ambient  "guard" "$GUARD"
run 11.5.0   "guard" "$GUARD"
run 11.6.0   "guard" "$GUARD"
echo "DIRECT-NPM-DONE"
