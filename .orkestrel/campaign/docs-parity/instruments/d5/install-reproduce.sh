#!/usr/bin/env bash
# d5-install/reproduce.sh — reproduce tests/distribution.test.ts:908 outside the suite:
# pack scaffold, materialize the proof workspace from the built entries, point its
# @orkestrel/scaffold devDependency at the tarball, and run the same npm install,
# keeping npm's own output. Log: d5-install/reproduce.log.txt
set -u
S="$(cd "$(dirname "$0")" && pwd)"
ROOT=/home/user/scaffold
cd "$ROOT"
npm pack --json --ignore-scripts --pack-destination "$S/packed" > "$S/pack.json" 2> "$S/pack.err.txt"
ARCHIVE=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$S/pack.json','utf8'))[0].filename)")
echo "archive: $ARCHIVE"
node --input-type=module --eval "
const core = await import('$ROOT/dist/src/core/index.js')
const server = await import('$ROOT/dist/src/server/index.js')
const blueprint = core.createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })
const compiler = new core.Compiler()
const plan = compiler.compile(blueprint).plan
if (plan === undefined) throw new Error('blocked')
compiler.destroy()
const materializer = new server.Materializer({ host: '$ROOT/dist/host' })
const result = materializer.materialize(plan, '$S/generated')
materializer.destroy()
console.log('written', result.written.length)
"
cd "$S/generated"
node -e "
const fs=require('fs');const m=JSON.parse(fs.readFileSync('package.json','utf8'));
m.devDependencies['@orkestrel/scaffold']='file:../packed/$ARCHIVE';
fs.writeFileSync('package.json', JSON.stringify(m, undefined, '\t')+'\n');
console.log('devDependencies', JSON.stringify(m.devDependencies));
"
npm install --ignore-scripts --no-audit --no-fund > "$S/install.out.txt" 2> "$S/install.err.txt"
echo "install exit $?"
