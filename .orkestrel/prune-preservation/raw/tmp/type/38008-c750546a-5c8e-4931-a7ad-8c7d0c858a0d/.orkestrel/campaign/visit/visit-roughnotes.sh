#!/usr/bin/env bash
# Roughnotes visit after @orkestrel/scaffold 0.0.74 publishes (wave.md § Visit each target): the
# catalog re-pins every declared @orkestrel/* range to the registry (scaffold ^0.0.74, test ^0.0.17),
# the install brings the new CLI, the journey wrapper is written from the seed with roughnotes'
# four declared variants so the repair emits the axis, and the repair restores every vendored
# file and the content-owned root. The adoption units reconcile the test layer afterwards.
set -u
R="C:/Users/mikes/WebstormProjects/roughnotes"
sp="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad"
out="$sp/verify"
mkdir -p "$out"
cd "$R" || exit 1
echo "tip: $(git log --oneline -1)  dirty: $(git status --short | wc -l)"
served="$(npm view @orkestrel/scaffold version 2>/dev/null | tail -1)"
echo "registry serves scaffold: $served"
[ "$served" = "0.0.74" ] || { echo "not propagated; stop"; exit 2; }
echo "pins before: scaffold $(node -p "require('./package.json').devDependencies['@orkestrel/scaffold']") test $(node -p "require('./package.json').devDependencies['@orkestrel/test']")"
node node_modules/@orkestrel/scaffold/dist/bin/main.js catalog > "$out/visit-roughnotes-catalog.log.txt" 2>&1
echo "catalog_EXIT=$?"; tail -3 "$out/visit-roughnotes-catalog.log.txt"
echo "pins after catalog: scaffold $(node -p "require('./package.json').devDependencies['@orkestrel/scaffold']") test $(node -p "require('./package.json').devDependencies['@orkestrel/test']")"
npm install --ignore-scripts > "$out/visit-roughnotes-install.log.txt" 2>&1
echo "install_EXIT=$?"; tail -2 "$out/visit-roughnotes-install.log.txt"
echo "installed scaffold: $(node -p "require('./node_modules/@orkestrel/scaffold/package.json').version")  test: $(node -p "require('./node_modules/@orkestrel/test/package.json').version")"
cp "$sp/r-wrapper.ts" configs/app/vite.journey.config.ts
node node_modules/@orkestrel/scaffold/dist/bin/main.js repair > "$out/visit-roughnotes-repair.log.txt" 2>&1
echo "repair_EXIT=$?"; tail -6 "$out/visit-roughnotes-repair.log.txt"
echo "appJourney in root: $(grep -c 'appJourney' vite.config.ts)  hand-rolled journey(): $(grep -c 'export function journey' vite.config.ts)"
echo "test:journey: $(node -p "require('./package.json').scripts['test:journey']")"
echo "test chain: $(node -p "require('./package.json').scripts.test")"
node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --json > "$out/visit-roughnotes-audit.json" 2> "$out/visit-roughnotes-audit.err"
echo "audit_EXIT=$?"
node -e "const a=JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'));const q=('audit' in a?a.audit:a).questions;console.log(JSON.stringify(q.map(x=>[x.field,x.blocking,x.message.slice(0,220)]),null,1))" "$out/visit-roughnotes-audit.json"
echo "--- status ---"
git status --short | head -40
echo "(end)"
