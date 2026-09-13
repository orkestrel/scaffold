#!/bin/bash
# Find which devDependency of a scaffold-generated workspace triggers the
# npm 10.9.7 arborist #loadPeerSet crash. Leave-one-out over the full set.
set -u
W=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/distrepro
B="$W/bisect"; rm -rf "$B"; mkdir -p "$B"
export npm_config_cache="$W/cache" npm_config_legacy_peer_deps=false npm_config_strict_peer_deps=false
BASE=$(node -e 'const fs=require("node:fs");const m=JSON.parse(fs.readFileSync(process.argv[1]+"/package.json","utf8"));m.devDependencies["@orkestrel/scaffold"]="^0.0.64";process.stdout.write(JSON.stringify(m.devDependencies))' "$W/generated")
echo "base devDeps: $BASE"
KEYS=$(node -e 'process.stdout.write(Object.keys(JSON.parse(process.argv[1])).join(" "))' "$BASE")

try() { # $1=label  $2=json devDependencies
  local d="$B/$1"; mkdir -p "$d"
  node -e '
const fs=require("node:fs")
fs.writeFileSync(process.argv[1]+"/package.json", JSON.stringify({name:"bisect-probe",version:"0.0.1",private:true,type:"module",devDependencies:JSON.parse(process.argv[2])},null,"\t")+"\n")' "$d" "$2"
  ( cd "$d" && timeout 420 npm install --ignore-scripts --no-audit --no-fund >install.log 2>&1; echo "$?" > exit.txt )
  local code; code=$(cat "$d/exit.txt")
  local crash="no"; grep -q "edgesOut" "$d/install.log" && crash="yes"
  printf '%-34s exit=%s crash=%s\n' "$1" "$code" "$crash"
}

echo "### full set (control: must crash)"
try "FULL" "$BASE"

echo "### leave-one-out"
for k in $KEYS; do
  SUB=$(node -e 'const o=JSON.parse(process.argv[1]);delete o[process.argv[2]];process.stdout.write(JSON.stringify(o))' "$BASE" "$k")
  try "without_$(echo "$k" | tr '/@' '__')" "$SUB"
done
echo "BISECT-DONE"
