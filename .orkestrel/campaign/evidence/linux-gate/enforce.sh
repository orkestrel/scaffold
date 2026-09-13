#!/bin/bash
# THE decisive test. The two lanes contradict each other:
#   subjective lane: the crash fires inside #loadPeerSet during ideal-tree build,
#                    which precedes engine validation, so engine-strict cannot help.
#   objective lane:  the older npm refuses with EBADENGINE BEFORE dependency resolution.
# Only one can be true. Run it against the ACTUAL crashing graph, not a trivial dep.
set -u
R=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/enforce
rm -rf "$R"; mkdir -p "$R"
echo "npm $(npm -v) on node $(node -v)"

run() { # $1 label, $2 extra manifest keys, $3 npmrc content
  d="$R/$1"; mkdir -p "$d/cache" "$d/p"; cd "$d/p"
  node -e '
const fs=require("node:fs")
const extra=JSON.parse(process.argv[1])
fs.writeFileSync("package.json",JSON.stringify(Object.assign({
  name:"enforce",version:"0.0.1",private:true,type:"module",
  devDependencies:{vite:"^8.2.2",vitest:"^4.1.11"}
},extra),null,1))' "$2"
  [ -n "$3" ] && printf '%s\n' "$3" > .npmrc
  npm_config_cache="$d/cache" npm_config_legacy_peer_deps=false npm_config_strict_peer_deps=false \
    timeout 420 npm install --ignore-scripts --no-audit --no-fund >i.log 2>&1
  code=$?
  crash="no"; grep -q edgesOut i.log && crash="yes"
  which=""
  grep -q "EBADENGINE" i.log && which="${which}EBADENGINE "
  grep -q "EBADDEVENGINES" i.log && which="${which}EBADDEVENGINES "
  grep -qE "added [0-9]+ packages" i.log && which="${which}INSTALLED "
  printf '%-34s exit=%-3s crash=%-4s %s\n' "$1" "$code" "$crash" "${which:-(no marker)}"
}

run "baseline-no-guard"        '{}' ''
run "engines.npm-only"         '{"engines":{"node":">=22.18.0","npm":">=11.6.0"}}' ''
run "engines.npm+engine-strict" '{"engines":{"node":">=22.18.0","npm":">=11.6.0"}}' 'engine-strict=true'
run "devEngines.packageManager" '{"devEngines":{"packageManager":{"name":"npm","version":">=11.6.0","onFail":"error"}}}' ''
echo "ENFORCE-DONE"
