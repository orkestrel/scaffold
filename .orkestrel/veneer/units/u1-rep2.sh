#!/usr/bin/env bash
# U1-rep, second pass: register the projects the seeded proofs select, wire the gate chain, and
# commit the adoption checkpoint. Log: scratchpad/u1-rep2.log.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
echo "--- repair (second pass) ---"
node ../scaffold/dist/bin/main.js repair --target . 2>&1 | tail -40
echo "--- scripts after repair ---"
node -e "const m=require('./package.json'); for (const k of Object.keys(m.scripts).filter(k=>k.startsWith('test'))) console.log(k, '=>', m.scripts[k])"
echo "--- wire the test chain ---"
node -e "
const fs = require('node:fs')
const path = 'package.json'
let text = fs.readFileSync(path, 'utf8')
const before = '\"test\": \"npm run test:src && npm run test:src:styles && npm run test:app && npm run test:journey && npm run test:policy && npm run test:config\",'
const after = '\"test\": \"npm run test:src && npm run test:src:styles && npm run test:app && npm run test:journey && npm run test:policy && npm run test:config && npm run test:setup:browser && npm run test:conformance && npm run test:guides\",'
if (!text.includes(before)) throw new Error('test chain not found')
fs.writeFileSync(path, text.replace(before, after))
"
grep -n '"test":' package.json
echo "--- projects registered in the root configuration ---"
grep -n "label: '" vite.config.ts
echo "--- audit ---"
node ../scaffold/dist/bin/main.js audit --target . 2>&1 | tail -12 || true
echo "--- commit ---"
git add -- .claude .editorconfig .gitattributes .oxlintignore .oxlintrc.json .prettierignore AGENTS.md CLAUDE.md LICENSE README.md app configs guides package-lock.json package.json scripts src tests tsconfig.json vite.config.ts
git status --short
git commit -q -F "units/u1-rep2-message.txt"
git log --oneline -2
git status --short --branch
echo "u1-rep2-done"
