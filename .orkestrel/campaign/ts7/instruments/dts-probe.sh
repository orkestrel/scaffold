#!/bin/bash
# Probe A: vite-plugin-dts (5.1.0, then the installed 5.0.3 line) with scaffold's exact options under typescript@7.0.2, in a scratch project.
# Probe B: @microsoft/api-extractor 7.59.0 rolling up the .d.ts files typescript@7.0.2's tsc emitted for scaffold's core project.
set -u
S=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts7
P=$S/dts; mkdir -p $P/src && cd $P
cat > package.json <<'J'
{ "name": "dts-probe", "private": true, "type": "module" }
J
cat > tsconfig.json <<'J'
{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "bundler", "strict": true, "lib": ["ESNext"], "types": [], "noEmit": false, "declaration": true, "emitDeclarationOnly": true, "rootDir": "src", "outDir": "dist", "skipLibCheck": true }, "include": ["src/**/*.ts"] }
J
cat > src/index.ts <<'T'
/**
 * Doubles a number.
 *
 * @remarks
 * A remark that must survive the rollup.
 * @example
 * double(2) // 4
 */
export function double(value: number): number {
	return value * 2
}
T
cat > vite.config.ts <<'T'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'
export default defineConfig({
	plugins: [dts({ tsconfigPath: resolve('tsconfig.json'), bundleTypes: { extractorConfig: { compiler: { overrideTsconfig: { compilerOptions: { types: [] } } } } } })],
	build: { lib: { entry: resolve('src/index.ts'), formats: ['es'], fileName: () => 'index.js' }, outDir: 'dist' },
})
T
echo "== install vite + vite-plugin-dts@5.1.0 + api-extractor + typescript@7.0.2"
npm install --silent --no-audit --no-fund vite@latest vite-plugin-dts@5.1.0 @microsoft/api-extractor@7.59.0 typescript@7.0.2 >/dev/null 2>&1; echo "install exit=$?"
node -e 'for (const p of ["vite","vite-plugin-dts","unplugin-dts","@microsoft/api-extractor","typescript"]) { try { console.log(p, require(p+"/package.json").version) } catch (e) { console.log(p, "missing") } }'
echo "== vite build (vite-plugin-dts 5.1.0, typescript 7.0.2)"; rm -rf dist; npx vite build > build-5.1.0.log 2>&1; echo "exit=$?"; tail -n 25 build-5.1.0.log; ls dist 2>/dev/null; [ -f dist/index.d.ts ] && cat dist/index.d.ts
echo "== same with vite-plugin-dts@5.0.3"; npm install --silent --no-audit --no-fund vite-plugin-dts@5.0.3 >/dev/null 2>&1; node -e 'console.log("vite-plugin-dts", require("vite-plugin-dts/package.json").version, "unplugin-dts", require("unplugin-dts/package.json").version)'; rm -rf dist; npx vite build > build-5.0.3.log 2>&1; echo "exit=$?"; tail -n 20 build-5.0.3.log; ls dist 2>/dev/null
echo "== control: vite-plugin-dts@5.0.3 with typescript@6.0.3"; npm install --silent --no-audit --no-fund typescript@6.0.3 >/dev/null 2>&1; rm -rf dist; npx vite build > build-ts6.log 2>&1; echo "exit=$?"; tail -n 6 build-ts6.log; ls dist 2>/dev/null; [ -f dist/index.d.ts ] && head -12 dist/index.d.ts
echo "== Probe B: api-extractor over tsgo-emitted declarations of scaffold core ($S/decl7)"
ls $S/decl7 | head -20
cat > $S/api-extractor.json <<J
{ "\$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",
  "projectFolder": "$S/decl7", "mainEntryPointFilePath": "$S/decl7/index.d.ts",
  "compiler": { "tsconfigFilePath": "$S/decl7-tsconfig.json" },
  "apiReport": { "enabled": false }, "docModel": { "enabled": true, "apiJsonFilePath": "$S/decl7-out/<unscopedPackageName>.api.json" },
  "dtsRollup": { "enabled": true, "untrimmedFilePath": "$S/decl7-out/rollup.d.ts" }, "tsdocMetadata": { "enabled": false },
  "messages": { "extractorMessageReporting": { "default": { "logLevel": "warning" } }, "tsdocMessageReporting": { "default": { "logLevel": "none" } } } }
J
printf '{ "name": "@orkestrel/scaffold-decl7-probe", "version": "0.0.0", "main": "index.js", "typings": "index.d.ts" }\n' > $S/decl7/package.json
printf '{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "bundler", "lib": ["ESNext", "WebWorker"], "types": ["node"], "skipLibCheck": true, "typeRoots": ["/home/user/scaffold/node_modules/@types"] }, "include": ["%s/decl7/**/*.d.ts"] }\n' "$S" > $S/decl7-tsconfig.json
mkdir -p $S/decl7-out; npx api-extractor run --local --config $S/api-extractor.json > $S/api-extractor.log 2>&1; echo "api-extractor exit=$?"; tail -n 12 $S/api-extractor.log; ls -l $S/decl7-out 2>/dev/null; [ -f $S/decl7-out/rollup.d.ts ] && echo "rollup: $(grep -c '^\s*/\*\*' $S/decl7-out/rollup.d.ts) doc blocks, $(grep -c '@remarks' $S/decl7-out/rollup.d.ts) @remarks, $(wc -l < $S/decl7-out/rollup.d.ts) lines"; [ -f $S/decl7-out/scaffold-decl7-probe.api.json ] && echo "api.json: $(wc -c < $S/decl7-out/scaffold-decl7-probe.api.json) bytes"
