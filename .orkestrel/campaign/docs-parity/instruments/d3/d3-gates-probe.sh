#!/usr/bin/env bash
# d3-gates-probe.sh — reproduce the distribution test's consumer gate run with its output captured.
# Log: d3-gates-probe.log.txt beside this file. Mirrors tests/distribution.test.ts:771-935.
set -u
ROOT=/home/user/scaffold
HERE=$(cd "$(dirname "$0")" && pwd)
SCRATCH="$HERE/gates-probe"
rm -rf "$SCRATCH"
mkdir -p "$SCRATCH/packed" "$SCRATCH/consumer" "$SCRATCH/cache"
export PATH=/opt/npm11/bin:$PATH
export npm_config_cache="$SCRATCH/cache"
export npm_config_legacy_peer_deps=false
export npm_config_strict_peer_deps=false
echo "npm $(npm --version) node $(node --version)"
cd "$ROOT" || exit 90
npm pack --json --ignore-scripts --pack-destination "$SCRATCH/packed" > "$SCRATCH/pack.json" || exit 91
ARCHIVE=$(ls "$SCRATCH"/packed/*.tgz)
echo "archive $ARCHIVE"
cd "$SCRATCH/consumer" || exit 92
printf '{"name":"scaffold-install-consumer","private":true,"type":"module"}\n' > package.json
npm install --ignore-scripts --no-audit --no-fund "$ARCHIVE" || exit 93
cat > generate.mjs <<'JS'
import { Compiler, createBlueprint } from '@orkestrel/scaffold'
import { Materializer } from '@orkestrel/scaffold/server'
const target = process.argv[2]
const blueprint = createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })
const compiler = new Compiler()
const plan = compiler.compile(blueprint).plan
if (plan === undefined) throw new Error('The generated proof blueprint was blocked')
compiler.destroy()
const materializer = new Materializer()
materializer.materialize(plan, target)
materializer.destroy()
JS
node generate.mjs "$SCRATCH/generated" || exit 94
cat > repin.mjs <<'JS'
import { readFileSync, writeFileSync } from 'node:fs'
const [manifest, specifier] = process.argv.slice(2)
const text = JSON.parse(readFileSync(manifest, 'utf8'))
text.devDependencies['@orkestrel/scaffold'] = specifier
writeFileSync(manifest, `${JSON.stringify(text, undefined, '\t')}\n`)
JS
node repin.mjs "$SCRATCH/generated/package.json" "file:$ARCHIVE" || exit 95
cd "$SCRATCH/generated" || exit 96
npm install --ignore-scripts --no-audit --no-fund || exit 97
echo "== prepublishOnly: $(node -p "require('./package.json').scripts.prepublishOnly")"
npm run prepublishOnly
echo "GATES EXIT $?"
