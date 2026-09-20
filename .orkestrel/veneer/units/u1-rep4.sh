#!/usr/bin/env bash
# U1-rep4: wire test:setup, run repair pass 4 to register the Node setup project, read the gates,
# commit by pathspec. Log: scaffold/tmp/units/u1-rep4.log.txt.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
echo "--- wire test:setup into the chain ---"
node -e "
const fs = require('node:fs')
const path = 'package.json'
let text = fs.readFileSync(path, 'utf8')
const before = 'npm run test:policy && npm run test:config && npm run test:setup:browser'
const after = 'npm run test:policy && npm run test:config && npm run test:setup && npm run test:setup:browser'
if (!text.includes(before)) throw new Error('test chain not found')
fs.writeFileSync(path, text.replace(before, after))
"
grep -n '"test":' package.json
echo "--- repair (pass 4) ---"
node ../scaffold/dist/bin/main.js repair --target . 2>&1 | tail -30
echo "--- scripts after repair ---"
grep -n '"test:setup' package.json
echo "--- projects registered ---"
grep -n "label: '" vite.config.ts
echo "--- lint:check ---"
npm run lint:check 2>&1 | tail -8
echo "--- test:config ---"
npm run test:config 2>&1 | tail -6
echo "--- test:setup ---"
npm run test:setup 2>&1 | tail -6
echo "--- test:guides ---"
npm run test:guides 2>&1 | tail -8
echo "--- test:conformance ---"
npm run test:conformance 2>&1 | tail -6
echo "--- format:check ---"
npm run format:check 2>&1 | tail -6
echo "--- audit ---"
node ../scaffold/dist/bin/main.js audit --target . 2>&1 | tail -12 || true
echo "--- status ---"
git status --short
echo "u1-rep4-gates-done"
