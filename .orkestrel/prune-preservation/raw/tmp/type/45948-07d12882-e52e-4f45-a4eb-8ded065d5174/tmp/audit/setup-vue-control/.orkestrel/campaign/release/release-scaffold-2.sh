#!/usr/bin/env bash
# Successor to release-scaffold.sh: the bump to 0.0.74 and the install landed; prepublishOnly
# reddened on the three manifest fixtures that carry scaffold's own caret (the planned
# `@orkestrel/scaffold` devDependency derives from package.json's version). Move them to ^0.0.74,
# then take the whole acceptance gate again.
set -u
S="C:/Users/mikes/WebstormProjects/scaffold"
out="C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/d7d4417a-5b51-47b1-85d7-d00611fbd930/scratchpad/verify"
cd "$S" || exit 1
echo "version: $(node -p "require('./package.json').version")"
sed -i 's#"@orkestrel/scaffold": "\^0.0.73"#"@orkestrel/scaffold": "^0.0.74"#g' tests/src/core/fixtures/app-only-toolchain.txt tests/src/core/fixtures/setup-false-manifest.txt tests/src/core/fixtures/source-manifest.txt
echo "remaining old self-pins: $(grep -rl '"@orkestrel/scaffold": "\^0.0.73"' tests/ src/ guides/ | wc -l)"
git diff --stat -- tests/src/core/fixtures
npm run prepublishOnly > "$out/release-scaffold-2-prepublish.log.txt" 2>&1
code=$?
echo "prepublishOnly_EXIT=$code"
sed 's/\x1b\[[0-9;]*m//g' "$out/release-scaffold-2-prepublish.log.txt" | grep -E "Tests  |error|Error|FAIL|staged" | tail -16
[ "$code" -eq 0 ] || exit "$code"
echo "self-pin literals in dist: $(grep -c '0\.0\.74' dist/src/core/index.js dist/src/server/index.js dist/bin/main.js 2>/dev/null | tr '\n' ' ')"
echo "--- status ---"
git status --short | grep -v "^?? tmp/\|^?? .orkestrel/"
echo "(end)"
