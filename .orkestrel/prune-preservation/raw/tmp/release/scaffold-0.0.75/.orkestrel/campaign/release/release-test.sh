#!/usr/bin/env bash
# Prepare the @orkestrel/test 0.0.17 layer (wave.md § Prepare a layer): bump from what the registry
# serves, install, prepublishOnly to green, release commit. The push and the upload are separate
# Orchestrator steps: the push precedes the window, the upload takes the user's one-time code.
set -u
T="C:/Users/mikes/WebstormProjects/test"
out="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad/verify"
mkdir -p "$out"
cd "$T" || exit 1
served="$(npm view @orkestrel/test version 2>/dev/null | tail -1)"
echo "registry serves: $served"
[ "$served" = "0.0.16" ] || { echo "registry moved; stop"; exit 2; }
npm version 0.0.17 --no-git-tag-version > "$out/release-test-version.log.txt" 2>&1
echo "version_EXIT=$? now $(node -p "require('./package.json').version")"
npm install --ignore-scripts > "$out/release-test-install.log.txt" 2>&1
echo "install_EXIT=$?"
npm run prepublishOnly > "$out/release-test-prepublish.log.txt" 2>&1
code=$?
echo "prepublishOnly_EXIT=$code"
sed 's/\x1b\[[0-9;]*m//g' "$out/release-test-prepublish.log.txt" | grep -E "Tests  |error|Error|FAIL" | tail -12
[ "$code" -eq 0 ] || exit "$code"
grep -c "0\.0\.17" dist/src/core/index.js dist/src/browser/index.js dist/src/server/index.js 2>/dev/null | tr '\n' ' '; echo "(version literals in dist)"
git status --short
