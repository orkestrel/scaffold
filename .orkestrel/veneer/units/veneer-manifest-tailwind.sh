#!/usr/bin/env bash
# Apply U1-conform's report-only manifest patch (remove @tailwindcss/vite and tailwindcss), run the
# install, and reinstall the @orkestrel/test 0.0.18 tarball the install prunes (a --no-save tarball
# does not survive a plain install). Orchestrator's tracked command. Log beside this file.
set -u
VENEER="C:/Users/mikes/WebstormProjects/veneer"
TEST_TGZ="C:/Users/mikes/WebstormProjects/test/tmp/pack/orkestrel-test-0.0.18.tgz"
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/veneer-manifest-tailwind.log.txt.txt"
cd "$VENEER" || exit 9
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) start $(git log --oneline -1)" > "$LOG"
grep -n 'tailwind' package.json >> "$LOG"
sed -i '/"@tailwindcss\/vite": /d; /"tailwindcss": /d' package.json
echo "after-sed: $(grep -c tailwind package.json) tailwind lines" >> "$LOG"
node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('manifest parses')" >> "$LOG" 2>&1
npm install >> "$LOG" 2>&1
echo "exit[install]=$?" >> "$LOG"
echo "test-exports-after-install: $(grep -c 'hoverAccessible\|stageMedia\|holdAccessible\|sendProtocol' node_modules/@orkestrel/test/dist/src/browser/index.d.ts)" >> "$LOG"
npm install --no-save "$TEST_TGZ" >> "$LOG" 2>&1
echo "exit[install-test]=$?" >> "$LOG"
echo "test-exports-after-tarball: $(grep -c 'hoverAccessible\|stageMedia\|holdAccessible\|sendProtocol' node_modules/@orkestrel/test/dist/src/browser/index.d.ts)" >> "$LOG"
echo "scaffold-installed: $(node -e "console.log(require('./node_modules/@orkestrel/scaffold/package.json').version)")" >> "$LOG"
ls node_modules/tailwindcss node_modules/@tailwindcss 2>&1 | head -2 >> "$LOG"
node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target . >> "$LOG" 2>&1
echo "exit[audit]=$?" >> "$LOG"
git status --porcelain -- package.json package-lock.json >> "$LOG"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) end" >> "$LOG"
grep -E "^exit\[|^after-sed|^manifest|^test-exports|^scaffold-installed|drifted|^setup:|No such file|^ M" "$LOG"
