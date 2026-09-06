#!/usr/bin/env bash
# Independent proof that `repair` regenerates the distribution proof byte for byte where it is
# missing. Materializes a core+server blueprint through the built entry, copies the generated proof
# aside, removes it, runs `repair --offline --groups tests` over the workspace, and compares. Writes
# under the scratch directory it names alone; nothing under /home/user/scaffold moves.
set -u
ROOT=/home/user/scaffold
OUT=${1:-/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4/regenerate}
rm -rf "$OUT"; mkdir -p "$OUT"
cat > "$OUT/generate.mjs" <<'GEN'
import { Compiler, createBlueprint } from '/home/user/scaffold/dist/src/core/index.js'
import { Materializer } from '/home/user/scaffold/dist/src/server/index.js'
const blueprint = createBlueprint('proof', { src: ['core', 'server'], bin: true, integration: true })
const compiler = new Compiler()
const plan = compiler.compile(blueprint).plan
if (plan === undefined) throw new Error('The generated proof blueprint was blocked')
compiler.destroy()
const materializer = new Materializer()
materializer.materialize(plan, process.argv[2])
materializer.destroy()
GEN
node "$OUT/generate.mjs" "$OUT/generated"; echo "generate exit=$?"
cp "$OUT/generated/tests/distribution.test.ts" "$OUT/before.distribution.test.ts"
rm "$OUT/generated/tests/distribution.test.ts"
node "$ROOT/dist/bin/main.js" repair --offline --groups tests --target "$OUT/generated"; echo "repair exit=$?"
cmp "$OUT/before.distribution.test.ts" "$OUT/generated/tests/distribution.test.ts"; echo "cmp exit=$? (0 is byte-identical)"
grep -c "from 'typescript'\|transpileModule\|createProgram" "$OUT/generated/tests/distribution.test.ts"; echo "compiler names in the regenerated proof (expected 0)"
