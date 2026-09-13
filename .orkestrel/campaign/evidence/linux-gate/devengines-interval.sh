#!/bin/bash
# devengines-interval.sh — the U-fix-4 audit's R-1 and R-2: run every npm release the registry
# serves from 10.9.0 up to 11.6.0 against the emitted devEngines record (guard manifest), so the
# refusal claim over that interval rests on a reading at every release rather than on its ends;
# and run the two 11.5.x patch releases against the plain manifest, so "11.6.0 is the first release
# that installs a generated workspace" rests on every release before it. Each npm is installed
# into its own prefix and invoked by its own CLI.
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/devinterval
rm -rf "$R"; mkdir -p "$R/bin"
echo "ambient npm $(npm -v) on node $(node -v); registry read $(date -u +%Y-%m-%d)"
VERSIONS="10.9.1 10.9.2 10.9.4 10.9.5 10.9.6 10.9.8 10.9.9 11.0.0 11.1.0 11.2.0 11.3.0 11.4.0 11.4.1 11.4.2 11.5.1 11.5.2"
for v in $VERSIONS; do
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
  added=$(grep -oE "added [0-9]+ packages" i.log | head -1)
  printf '  %-7s %-6s exit=%-3s refused=%-4s crash=%-4s %s\n' "$1" "$2" "$code" "$ref" "$crash" "${added:-–}"
}
PLAIN='{"name":"p","version":"0.0.1","private":true,"type":"module","devDependencies":{"vitest":"^4.1.11"}}'
GUARD='{"name":"p","version":"0.0.1","private":true,"type":"module","engines":{"node":">=22.18.0"},"devEngines":{"packageManager":{"name":"npm","version":">=11.6.0","onFail":"error"}},"devDependencies":{"vitest":"^4.1.11"}}'
echo "--- guard manifest (the emitted devEngines record) at every unmeasured release in [10.9.0, 11.6.0) ---"
for v in $VERSIONS; do run "$v" guard "$GUARD"; done
echo "--- plain manifest at the 11.5.x patch releases: does any install before 11.6.0? ---"
for v in 11.5.1 11.5.2; do run "$v" plain "$PLAIN"; done
echo "DEVINTERVAL-DONE"
