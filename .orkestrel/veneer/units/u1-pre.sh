#!/usr/bin/env bash
# U1-pre (Orchestrator): regenerate the lockfile from the authored manifest, install, install the
# pinned Playwright Chromium, run the first scaffold repair, and stage the generated sample for U1a.
# Log: scratchpad/u1-pre.log.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
rm -f package-lock.json
npm install --no-audit --no-fund 2>&1 | tail -8
echo "--- lockfile digest ---"
sha256sum package-lock.json
npx playwright install chromium 2>&1 | tail -3
ls "$LOCALAPPDATA/ms-playwright"
echo "--- repair ---"
node ../scaffold/dist/bin/main.js repair --target . 2>&1 | tail -60
echo "--- status after repair ---"
git status --short
mkdir -p tmp
rm -rf tmp/sample
cp -r "tmp/sample" tmp/sample
echo "u1-pre-done"
