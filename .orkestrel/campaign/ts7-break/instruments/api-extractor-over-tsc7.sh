#!/usr/bin/env bash
# Emits scaffold's core declarations with TypeScript 7.0.2's tsc, then rolls them up with the installed
# @microsoft/api-extractor 7.59.0 driven by its bundled compiler only (no typescriptCompilerFolder).
set -u
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts7-break
cd /home/user/scaffold || exit 2
rm -rf "$S/emit7/out" "$S/emit7/rollup"; mkdir -p "$S/emit7/out" "$S/emit7/rollup"
echo "== tsc 7 declaration emit, $(date -u +%H:%M:%S)"
node node_modules/typescript/bin/tsc -p configs/src/tsconfig.core.json --declaration --emitDeclarationOnly --noEmit false --outDir "$S/emit7/out" 2>&1 | tail -5
echo "tsc exit=${PIPESTATUS[0]}"; find "$S/emit7/out" -name '*.d.ts' | wc -l; ls "$S/emit7/out" | head
ENTRY=$(find "$S/emit7/out" -name 'index.d.ts' | head -1); echo "entry=$ENTRY"
cat > "$S/emit7/api-extractor.json" <<JSON
{
  "\$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
  "projectFolder": "/home/user/scaffold",
  "mainEntryPointFilePath": "$ENTRY",
  "compiler": { "overrideTsconfig": { "compilerOptions": { "types": ["node"], "lib": ["ESNext", "WebWorker"], "skipLibCheck": true, "target": "ESNext", "module": "ESNext", "moduleResolution": "bundler" }, "files": ["$ENTRY"] } },
  "apiReport": { "enabled": false }, "docModel": { "enabled": false }, "tsdocMetadata": { "enabled": false },
  "dtsRollup": { "enabled": true, "untrimmedFilePath": "$S/emit7/rollup/index.d.ts" },
  "messages": { "extractorMessageReporting": { "default": { "logLevel": "warning" } }, "compilerMessageReporting": { "default": { "logLevel": "warning" } }, "tsdocMessageReporting": { "default": { "logLevel": "none" } } }
}
JSON
cat > "$S/emit7/rollup.mjs" <<'JS'
import { Extractor, ExtractorConfig } from '/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-esm/index.js'
const configPath = process.argv[2]
const config = ExtractorConfig.loadFileAndPrepare(configPath)
const result = Extractor.invoke(config, { localBuild: true, showVerboseMessages: false })
console.log(`succeeded=${result.succeeded} errors=${result.errorCount} warnings=${result.warningCount}`)
JS
echo "== api-extractor rollup (bundled 5.9.3), $(date -u +%H:%M:%S)"
node "$S/emit7/rollup.cjs" "$S/emit7/api-extractor.json" 2>&1 | tail -12
wc -l "$S/emit7/rollup/index.d.ts" 2>/dev/null; wc -l dist/src/core/index.d.ts 2>/dev/null
echo "== material diff against the shipped rollup (whitespace ignored)"
diff -w <(grep -vE '^\s*$|^//' dist/src/core/index.d.ts) <(grep -vE '^\s*$|^//' "$S/emit7/rollup/index.d.ts") | head -40
echo "diff lines: $(diff -w <(grep -vE '^\s*$|^//' dist/src/core/index.d.ts) <(grep -vE '^\s*$|^//' "$S/emit7/rollup/index.d.ts") | wc -l)"
