#!/bin/bash
# Reproduce tests/distribution.test.ts "installed package consumer" install step
# to read the npm error the assertion at :912 hides.
set -u
W=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/distrepro
rm -rf "$W"; mkdir -p "$W"/{packed,consumer,cache}
cd /home/user/scaffold || exit 1
export npm_config_cache="$W/cache"
export npm_config_legacy_peer_deps=false
export npm_config_strict_peer_deps=false

echo "### pack"
npm pack --json --ignore-scripts --pack-destination "$W/packed" > "$W/pack.json" 2>"$W/pack.err" || { echo "PACK FAILED"; tail -5 "$W/pack.err"; exit 1; }
ARCHIVE=$(ls "$W/packed"/*.tgz | head -1); echo "archive=$ARCHIVE"

echo "### consumer install of packed scaffold"
cd "$W/consumer" || exit 1
printf '{"name":"scaffold-install-consumer","private":true,"type":"module"}\n' > package.json
npm install --ignore-scripts --no-audit --no-fund "$ARCHIVE" > "$W/consumer-install.log" 2>&1 || { echo "CONSUMER INSTALL FAILED"; tail -20 "$W/consumer-install.log"; exit 1; }
echo "consumer install ok"

echo "### generate workspace"
cat > generate.mjs <<'EOF'
import { Compiler, createBlueprint } from '@orkestrel/scaffold'
import { Materializer } from '@orkestrel/scaffold/server'
const blueprint = createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })
const compiler = new Compiler()
const plan = compiler.compile(blueprint).plan
if (plan === undefined) throw new Error('The generated proof blueprint was blocked')
compiler.destroy()
const materializer = new Materializer()
materializer.materialize(plan, process.argv[2])
materializer.destroy()
console.log('generated')
EOF
node generate.mjs "$W/generated" > "$W/generate.log" 2>&1 || { echo "GENERATE FAILED (planner API guess)"; tail -20 "$W/generate.log"; }

if [ -f "$W/generated/package.json" ]; then
  echo "### swap specifier and install"
  node -e '
const fs=require("node:fs"),p=process.argv[1],a=process.argv[2]
const m=JSON.parse(fs.readFileSync(p+"/package.json","utf8"))
m.devDependencies["@orkestrel/scaffold"]="file:"+a
fs.writeFileSync(p+"/package.json",JSON.stringify(m,null,"\t")+"\n")
' "$W/generated" "$ARCHIVE"
  cd "$W/generated" || exit 1
  npm install --ignore-scripts --no-audit --no-fund > "$W/generated-install.log" 2>&1
  echo "generated install exit=$?"
  echo "--- generated install output ---"
  tail -40 "$W/generated-install.log"
fi
