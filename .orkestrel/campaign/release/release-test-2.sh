#!/usr/bin/env bash
# Prepare the @orkestrel/test 0.0.18 layer (wave.md § Prepare a layer): registry evidence, bump from
# the registry's 0.0.17, install, prepublishOnly to green. The release commit, the push, and the
# upload are separate Orchestrator steps; the upload takes the user's one-time code.
set -u
T="C:/Users/mikes/WebstormProjects/test"
out="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad/verify"
sweep="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/release/registry-sweep.mjs"
mkdir -p "$out"
cd "$T" || exit 1
echo "tip: $(git log --oneline -1)  dirty: $(git status --short | wc -l)"
echo "--- registry sweep before ---"
node "$sweep" "$T" 2>/dev/null | tee "$out/release-test-2-sweep-before.log.txt"
served="$(npm view @orkestrel/test version --prefer-online 2>/dev/null | tail -1)"
[ "$served" = "0.0.17" ] || { echo "registry serves $served, expected 0.0.17; stop"; exit 2; }
npm version 0.0.18 --no-git-tag-version > "$out/release-test-2-version.log.txt" 2>&1
echo "version_EXIT=$? now $(node -p "require('./package.json').version")"
npm install --ignore-scripts > "$out/release-test-2-install.log.txt" 2>&1
echo "install_EXIT=$?"
npm run prepublishOnly > "$out/release-test-2-prepublish.log.txt" 2>&1
code=$?
echo "prepublishOnly_EXIT=$code"
sed 's/\x1b\[[0-9;]*m//g' "$out/release-test-2-prepublish.log.txt" | grep -E "Tests  |error|Error|FAIL" | tail -12
[ "$code" -eq 0 ] || exit "$code"
echo "version literals in dist: $(grep -c '0\.0\.18' dist/src/core/index.js dist/src/browser/index.js dist/src/server/index.js 2>/dev/null | tr '\n' ' ')"
git status --short
echo "(end)"
