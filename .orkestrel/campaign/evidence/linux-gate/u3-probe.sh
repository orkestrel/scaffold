#!/bin/bash
# U3: does npm 10.9.7's arborist crash reach a REAL consumer of published
# @orkestrel/scaffold, or is it confined to the test's file: tarball specifier?
# Variant A: generated workspace with scaffold from the registry (^0.0.64).
# Variant B: same workspace with the file: packed tarball (the test's shape).
set -u
W=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/distrepro
G="$W/generated"
export npm_config_cache="$W/cache" npm_config_legacy_peer_deps=false npm_config_strict_peer_deps=false
ARCHIVE=$(ls "$W/packed"/*.tgz | head -1)
echo "npm version under test: $(npm -v)"

run_variant() {
  local label="$1" spec="$2"
  cd "$G" || exit 1
  rm -rf node_modules package-lock.json
  node -e '
const fs=require("node:fs")
const m=JSON.parse(fs.readFileSync("package.json","utf8"))
m.devDependencies["@orkestrel/scaffold"]=process.argv[1]
fs.writeFileSync("package.json",JSON.stringify(m,null,"\t")+"\n")' "$spec"
  echo ""
  echo "##### VARIANT $label  spec=$spec #####"
  timeout 600 npm install --ignore-scripts --no-audit --no-fund > "$W/u3-$label.log" 2>&1
  echo "exit=$?"
  grep -E "npm error|added [0-9]+ packages" "$W/u3-$label.log" | head -6
}

run_variant "A-registry-range" "^0.0.64"
run_variant "B-file-tarball"   "file:$ARCHIVE"
echo ""
echo "U3-PROBE-DONE"
