#!/usr/bin/env bash
# Prepare the @orkestrel/scaffold 0.0.74 layer (wave.md § Prepare a layer): registry evidence, bump
# from what the registry serves, install, prepublishOnly to green. The release commit, the push,
# and the upload are separate Orchestrator steps; the upload takes the user's one-time code.
set -u
S="C:/Users/mikes/WebstormProjects/scaffold"
out="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad/verify"
sweep="$S/.orkestrel/campaign/release/registry-sweep.mjs"
mkdir -p "$out"
cd "$S" || exit 1
echo "tip: $(git log --oneline -1)"
echo "dirty: $(git status --short | grep -v '^?? tmp/\|^?? .orkestrel/' | wc -l) tracked changes"
echo "--- registry sweep before ---"
node "$sweep" "$S" | tee "$out/release-scaffold-sweep-before.log.txt"
served="$(npm view @orkestrel/scaffold version 2>/dev/null | tail -1)"
[ "$served" = "0.0.73" ] || { echo "registry serves $served, expected 0.0.73; stop"; exit 2; }
npm version 0.0.74 --no-git-tag-version > "$out/release-scaffold-version.log.txt" 2>&1
echo "version_EXIT=$? now $(node -p "require('./package.json').version")"
npm install --ignore-scripts > "$out/release-scaffold-install.log.txt" 2>&1
echo "install_EXIT=$?"
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
npm run prepublishOnly > "$out/release-scaffold-prepublish.log.txt" 2>&1
code=$?
echo "prepublishOnly_EXIT=$code"
sed 's/\x1b\[[0-9;]*m//g' "$out/release-scaffold-prepublish.log.txt" | grep -E "Tests  |error|Error|FAIL|staged" | tail -16
[ "$code" -eq 0 ] || exit "$code"
echo "self-pin literals in dist/src: $(grep -c '0\.0\.74' dist/src/core/index.js dist/src/server/index.js dist/bin/main.js 2>/dev/null | tr '\n' ' ')"
echo "--- status ---"
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "(end)"
