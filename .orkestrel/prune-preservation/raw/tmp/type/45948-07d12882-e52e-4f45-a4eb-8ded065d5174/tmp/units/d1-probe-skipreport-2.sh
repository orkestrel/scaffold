#!/usr/bin/env bash
# Builds one app-only generated workspace the way the distribution case does, then runs its
# vendored config project alone so the run's own skip and pass counts are readable.
set -e
root="C:/Users/mikes/WebstormProjects/scaffold"
scratch="$root/tmp/units/d1-skipreport"
rm -rf "$scratch"
mkdir -p "$scratch/packed" "$scratch/consumer"
cd "$root"
npm.cmd pack --json --ignore-scripts --pack-destination "$scratch/packed" > /dev/null
archive=$(ls "$scratch/packed"/*.tgz | head -1)
printf '{"name":"d1-skipreport-consumer","private":true,"type":"module"}\n' > "$scratch/consumer/package.json"
cd "$scratch/consumer"
npm.cmd install --ignore-scripts --no-audit --no-fund "$archive" > /dev/null
cat > generate.mjs <<'JS'
import { Compiler, createBlueprint } from '@orkestrel/scaffold'
import { Materializer } from '@orkestrel/scaffold/server'
const blueprint = createBlueprint('proof', { app: ['core', 'server'] })
const compiler = new Compiler()
const plan = compiler.compile(blueprint).plan
if (plan === undefined) throw new Error('The generated blueprint was blocked')
compiler.destroy()
const materializer = new Materializer()
materializer.materialize(plan, process.argv[2])
materializer.destroy()
JS
node generate.mjs "$scratch/generated"
cd "$scratch/generated"
node -e "const f=require('node:fs');const m=JSON.parse(f.readFileSync('package.json','utf8'));m.devDependencies['@orkestrel/scaffold']='file:'+process.argv[1].replaceAll('\\','/');f.writeFileSync('package.json',JSON.stringify(m,null,'\t')+'\n')" "$archive"
npm.cmd install --ignore-scripts --no-audit --no-fund > /dev/null
npm.cmd run test:config
