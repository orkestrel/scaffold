#!/usr/bin/env bash
# After U1-author run 4 exited: take PLANT-PEER on the host, format the tree (no unit is live),
# read format:check and lint:check, and commit run 4's work as a checkpoint by pathspec.
# Log: scaffold/units/u1-checkpoint-4.log.txt.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
echo "--- PLANT-PEER (host) ---"
node "u1-plant-peer.mjs" 2>&1 | tee "u1-plant-peer.log.txt"
git diff --exit-code -- package.json && echo "package.json unchanged"
echo "--- format (tree, no unit live) ---"
npm run format 2>&1 | tail -n 2
npm run format:check 2>&1 | tail -n 2
npm run lint:check 2>&1 | tail -n 1
echo "--- status ---"
git status --short
echo "--- commit ---"
git add -- app/browser src/browser tests/app/browser tests/src/browser tests/conformance.test.ts tests/setupBrowser.test.ts tests/setupBrowser.ts tests/setupConformance.test.ts tests/setupConformance.ts
git status --short | grep -v "^[AM]  " || true
git commit -q -F "u1-checkpoint-4-message.txt"
git log --oneline -2
git status --short --branch
echo "u1-checkpoint-4-done"
