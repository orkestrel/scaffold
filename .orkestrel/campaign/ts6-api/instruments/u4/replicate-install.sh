#!/usr/bin/env bash
# Replicates the install step of scaffold's own distribution proof so the npm
# output that test discards is readable. Writes nothing under /home/user/scaffold.
set -u
B=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4/install
rm -rf "$B"
mkdir -p "$B/packed" "$B/consumer" "$B/cache"
export npm_config_cache="$B/cache"
export npm_config_legacy_peer_deps=false
export npm_config_strict_peer_deps=false
cd /home/user/scaffold || exit 1
npm pack --json --ignore-scripts --pack-destination "$B/packed" > "$B/pack.log.txt" 2>&1
echo "pack exit=$?"
ARCHIVE=$(ls "$B/packed"/*.tgz | head -1)
echo "archive=$ARCHIVE"
printf '{"name":"scaffold-install-consumer","private":true,"type":"module"}\n' > "$B/consumer/package.json"
cd "$B/consumer" || exit 1
npm install --ignore-scripts --no-audit --no-fund "$ARCHIVE" > "$B/consumer-install.log.txt" 2>&1
echo "consumer install exit=$?"
cat > "$B/consumer/generate.mjs" <<'GEN'
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
GEN
node generate.mjs "$B/generated" > "$B/generate.log.txt" 2>&1
echo "generate exit=$?"
node -e "const fs=require('node:fs');const p='$B/generated/package.json';const m=JSON.parse(fs.readFileSync(p,'utf8'));m.devDependencies['@orkestrel/scaffold']='file:'+require('node:path').relative('$B/generated','$ARCHIVE');fs.writeFileSync(p,JSON.stringify(m,null,'\t')+'\n')"
echo "repin exit=$?"
cd "$B/generated" || exit 1
npm install --ignore-scripts --no-audit --no-fund > "$B/generated-install.log.txt" 2>&1
echo "generated install exit=$?"
tail -30 "$B/generated-install.log.txt"
