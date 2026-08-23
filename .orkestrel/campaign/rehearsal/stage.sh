#!/usr/bin/env bash
# Rehearse the generated distribution proof's browser stage end to end against a real
# installed browser-face package: install from the registry, bundle an installed-package
# consumer with Vite, drive it in Playwright Chromium, compare runtime keys with the
# declarations. Nothing here is scaffold's code; this measures whether the DESIGN runs.
set -u
ROOT=/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/rehearsal
CONSUMER=$ROOT/consumer
SCAFFOLD=/home/user/scaffold

rm -rf "$CONSUMER" && mkdir -p "$CONSUMER"
cd "$CONSUMER" || exit 1

cat > package.json <<'JSON'
{ "name": "rehearsal-consumer", "private": true, "type": "module", "version": "0.0.0" }
JSON

echo "=== STAGE 1: install the published package ==="
npm install --no-audit --no-fund @orkestrel/router 2>&1 | tail -3
echo "install exit: ${PIPESTATUS[0]}"
node -e "const p=require('./node_modules/@orkestrel/router/package.json'); console.log('installed', p.name, p.version); console.log('exports:', JSON.stringify(p.exports,null,1))" || exit 1

echo
echo "=== STAGE 2: does the installed tree carry its own runtime dependencies? ==="
node -e "
const p=require('./node_modules/@orkestrel/router/package.json');
const deps=Object.keys(p.dependencies??{});
console.log('declared runtime deps:', deps.join(', ')||'(none)');
for (const d of deps) {
  try { require.resolve(d+'/package.json', {paths:['./node_modules/@orkestrel/router','.']}); console.log('  resolved', d) }
  catch (e) { console.log('  UNRESOLVED', d, e.code) }
}"

echo
echo "=== STAGE 3: bundle an installed-package consumer with Vite ==="
mkdir -p src
cat > index.html <<'HTML'
<!doctype html><html><head><meta charset="utf-8"><title>rehearsal</title></head>
<body><script type="module" src="/src/main.ts"></script></body></html>
HTML
cat > src/main.ts <<'TS'
import * as browser from '@orkestrel/router/browser'
declare global { interface Window { subjectKeys?: readonly string[] } }
window.subjectKeys = Object.keys(browser).sort()
TS
cat > vite.config.mjs <<'JS'
export default { base: './', build: { outDir: 'dist', emptyOutDir: true } }
JS
"$SCAFFOLD/node_modules/.bin/vite" build --config vite.config.mjs 2>&1 | tail -8
echo "vite build exit: ${PIPESTATUS[0]}"
