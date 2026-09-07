#!/usr/bin/env bash
# supervisor s2: re-pin every @orkestrel range to the catalog's version (the table in scaffold's .claude/agents/orkestrel.md),
# regenerate the lockfile against the registry, then repair from scaffold's tip and read the gates. Orchestrator-owned install.
set -u
export PATH=/opt/npm11/bin:$PATH
SCR=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass
cd /home/user/fleet/supervisor || exit 9
echo "== s2 $(date -u +%FT%TZ) over $(git rev-parse --short HEAD)"
node - <<'JS'
const fs = require('node:fs')
const catalog = fs.readFileSync('/home/user/scaffold/.claude/agents/orkestrel.md', 'utf8')
const versions = new Map()
for (const m of catalog.matchAll(/^\| `(@orkestrel\/[a-z]+)` +\| `([0-9.]+)` +\|/gm)) versions.set(m[1], m[2])
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const moved = []
for (const field of ['dependencies', 'devDependencies', 'peerDependencies']) {
  const block = pkg[field]
  if (!block) continue
  for (const name of Object.keys(block)) {
    if (!name.startsWith('@orkestrel/')) continue
    const v = versions.get(name)
    if (v === undefined) { moved.push(`${name}: no catalog row`); continue }
    const next = `^${v}`
    if (block[name] !== next) { moved.push(`${name}: ${block[name]} -> ${next} (${field})`); block[name] = next }
  }
}
fs.writeFileSync('package.json', JSON.stringify(pkg, null, '\t') + '\n')
console.log(moved.join('\n'))
JS
echo "== npm install (lockfile regenerated against the registry)"
rm -f package-lock.json
npm install --ignore-scripts --no-audit --no-fund 2>&1 | tail -4; echo "exit ${PIPESTATUS[0]}"
echo "== installed"; node -p "['scaffold','guide','contract','server','middleware'].map(n => n + ' ' + require('./node_modules/@orkestrel/' + n + '/package.json').version).join(' ')"
echo "== repair --offline from the tip"; node "$SCR/tip/package/dist/bin/main.js" repair --offline 2>&1 | tail -1
echo "== status"; git status --short
echo "== check"; timeout 900 npm run check 2>&1 | grep -E 'error TS' | head -30; echo "exit ${PIPESTATUS[0]}"
echo "== lint"; npx oxlint --config .oxlintrc.json --deny-warnings . 2>&1 | grep -c 'error'; echo "exit ${PIPESTATUS[0]}"
echo "== test:guides"; timeout 300 npm run test:guides 2>&1 | grep -E 'Tests |Test Files|failed' | tail -3; echo "exit ${PIPESTATUS[0]}"
echo "== test:policy"; timeout 300 npm run test:policy 2>&1 | grep -E 'Tests |Test Files|FAIL' | tail -4; echo "exit ${PIPESTATUS[0]}"
echo "== test:config"; timeout 300 npm run test:config 2>&1 | grep -E 'Tests |Test Files|FAIL' | tail -4; echo "exit ${PIPESTATUS[0]}"
echo "== docs"; timeout 180 npm run docs 2>&1 | grep -E 'rows read' ; echo "exit ${PIPESTATUS[0]}"
echo "== s2 done $(date -u +%FT%TZ)"
