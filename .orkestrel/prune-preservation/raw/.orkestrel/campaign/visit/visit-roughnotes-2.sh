#!/usr/bin/env bash
# Successor to visit-roughnotes.sh: the catalog, the install, and the wrapper landed; repair was
# blocked because the hand-rolled test:journey names --project 'journey:*'. Set the script to the
# planned value the audit names, then repair and audit again.
set -u
R="C:/Users/mikes/WebstormProjects/roughnotes"
sp="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad"
out="$sp/verify"
cd "$R" || exit 1
node "$sp/set-journey-script.mjs"
node node_modules/@orkestrel/scaffold/dist/bin/main.js repair > "$out/visit-roughnotes-repair-2.log.txt" 2>&1
echo "repair_EXIT=$?"; tail -8 "$out/visit-roughnotes-repair-2.log.txt"
echo "appJourney in root: $(grep -c 'appJourney' vite.config.ts)  hand-rolled journey(): $(grep -c 'export function journey' vite.config.ts)  VARIANTS in root: $(grep -c 'VARIANTS' vite.config.ts)"
echo "test:journey: $(node -p "require('./package.json').scripts['test:journey']")"
echo "test chain: $(node -p "require('./package.json').scripts.test")"
node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --json > "$out/visit-roughnotes-audit-2.json" 2> "$out/visit-roughnotes-audit-2.err"
echo "audit_EXIT=$?"
node -e "const a=JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));const q=('audit' in a?a.audit:a).questions;console.log(JSON.stringify(q.map(x=>[x.field,x.blocking,x.message.slice(0,160)]),null,1))" "$out/visit-roughnotes-audit-2.json"
echo "--- status ---"
git status --short | head -60
echo "--- diffstat ---"
git diff --stat | tail -30
echo "(end)"
