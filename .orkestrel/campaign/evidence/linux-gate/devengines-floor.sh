#!/bin/bash
# devengines-floor.sh — Sol's U-fix-2 audit claim 2 counterexample, reproduced on the host with
# the network available: which npm releases read the emitted devEngines record and refuse with
# EBADDEVENGINES, and what the ones that ignore it do with the lockfile-free vitest workspace.
# Each npm is installed into its own prefix and invoked by its own CLI (never through npx), so
# the version devEngines reads is the version running. Same manifests as direct-npm.sh.
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/devfloor
rm -rf "$R"; mkdir -p "$R/bin"
echo "ambient npm $(npm -v) on node $(node -v)"
for v in 10.5.0 10.8.3 10.9.0 10.9.3; do
  npm install --silent --no-audit --no-fund --prefix "$R/bin/$v" "npm@$v" >/dev/null 2>&1
  cli="$R/bin/$v/node_modules/npm/bin/npm-cli.js"
  [ -f "$cli" ] && echo "installed npm $v -> self-reports $(node "$cli" --version)" || echo "install of npm $v FAILED"
done
run() { # $1 npm version, $2 label, $3 manifest
  local cli="$R/bin/$1/node_modules/npm/bin/npm-cli.js"
  d="$R/$2-$1"; mkdir -p "$d/cache" "$d/p"; cd "$d/p" || return
  printf '%s\n' "$3" > package.json
  npm_config_cache="$d/cache" timeout 420 node "$cli" install --ignore-scripts --no-audit --no-fund >i.log 2>&1
  code=$?
  crash="no"; grep -q edgesOut i.log && crash="yes"
  ref="no"; grep -q EBADDEVENGINES i.log && ref="yes"
  other=$(grep -oE "npm (ERR!|error) code [A-Z_]+" i.log | head -1 | awk '{print $NF}')
  added=$(grep -oE "added [0-9]+ packages" i.log | head -1)
  printf '  %-7s %-6s exit=%-3s refused=%-4s crash=%-4s code=%-14s %s\n' "$1" "$2" "$code" "$ref" "$crash" "${other:-–}" "${added:-–}"
}
PLAIN='{"name":"p","version":"0.0.1","private":true,"type":"module","devDependencies":{"vitest":"^4.1.11"}}'
GUARD='{"name":"p","version":"0.0.1","private":true,"type":"module","engines":{"node":">=22.18.0"},"devEngines":{"packageManager":{"name":"npm","version":">=11.6.0","onFail":"error"}},"devDependencies":{"vitest":"^4.1.11"}}'
echo "--- guard manifest (the emitted devEngines record): does the npm read it? ---"
for v in 10.5.0 10.8.3 10.9.0 10.9.3; do run "$v" guard "$GUARD"; done
echo "--- plain manifest: what does an npm that ignores the record do? ---"
for v in 10.5.0 10.8.3 10.9.0 10.9.3; do run "$v" plain "$PLAIN"; done
echo "DEVFLOOR-DONE"
