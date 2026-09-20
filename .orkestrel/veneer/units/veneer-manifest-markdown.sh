#!/usr/bin/env bash
# Declare @orkestrel/markdown as a devDependency (the user's ruling: an @orkestrel package may be
# declared, devDependency by default), record it in the lockfile, and reinstall the @orkestrel/test
# 0.0.18 tarball the install prunes. Orchestrator's tracked command. Log beside this file.
set -u
VENEER="C:/Users/mikes/WebstormProjects/veneer"
TEST_TGZ="C:/Users/mikes/WebstormProjects/test/tmp/pack/orkestrel-test-0.0.18.tgz"
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/veneer-manifest-markdown.log.txt.txt"
cd "$VENEER" || exit 9
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) start $(git log --oneline -1)" > "$LOG"
echo "installed-markdown: $(node -e "console.log(require('./node_modules/@orkestrel/markdown/package.json').version)")" >> "$LOG"
npm install --save-dev "@orkestrel/markdown@^0.0.15" >> "$LOG" 2>&1
echo "exit[install]=$?" >> "$LOG"
echo "test-exports-after-install: $(grep -c 'hoverAccessible\|stageMedia\|holdAccessible\|sendProtocol' node_modules/@orkestrel/test/dist/src/browser/index.d.ts)" >> "$LOG"
npm install --no-save "$TEST_TGZ" >> "$LOG" 2>&1
echo "exit[install-test]=$?" >> "$LOG"
echo "test-exports-after-tarball: $(grep -c 'hoverAccessible\|stageMedia\|holdAccessible\|sendProtocol' node_modules/@orkestrel/test/dist/src/browser/index.d.ts)" >> "$LOG"
echo "declared: $(node -e "console.log(require('./package.json').devDependencies['@orkestrel/markdown'])")" >> "$LOG"
node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target . >> "$LOG" 2>&1
echo "exit[audit]=$?" >> "$LOG"
git status --porcelain -- package.json package-lock.json >> "$LOG"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) end" >> "$LOG"
grep -E "^exit\[|^installed-markdown|^declared|^test-exports|drifted|^ M" "$LOG"
