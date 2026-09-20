#!/usr/bin/env bash
# Veneer visit after the scaffold 0.0.76 release, run after U3 lands and before U1-conform:
# re-pin the development dependency from the registry, then reinstall the U6 Test tarball in a
# second install (the re-pin is lockfile-declared, so the later --no-save install keeps it),
# repair, audit. Orchestrator's tracked command; gates follow by verifier.
set -u
VENEER="C:/Users/mikes/WebstormProjects/veneer"
TEST_TGZ="C:/Users/mikes/WebstormProjects/test/tmp/pack/orkestrel-test-0.0.18.tgz"
LOG="C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/veneer-repin-0.0.76.log.txt.txt"
cd "$VENEER" || exit 9
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) start $(git log --oneline -1)" > "$LOG"
git status --porcelain | grep -v '^??' >> "$LOG"
echo "before: $(node -e "console.log(require('./package.json').devDependencies['@orkestrel/scaffold'])") installed: $(node -e "console.log(require('./node_modules/@orkestrel/scaffold/package.json').version)")" >> "$LOG"
npm install --save-dev "@orkestrel/scaffold@^0.0.76" >> "$LOG" 2>&1
echo "exit[install]=$?" >> "$LOG"
npm install --no-save "$TEST_TGZ" >> "$LOG" 2>&1
echo "exit[install-test]=$?" >> "$LOG"
echo "after: $(node -e "console.log(require('./package.json').devDependencies['@orkestrel/scaffold'])") installed: $(node -e "console.log(require('./node_modules/@orkestrel/scaffold/package.json').version)") test-exports: $(grep -c "hoverAccessible\|stageMedia\|holdAccessible\|sendProtocol" node_modules/@orkestrel/test/dist/src/browser/index.d.ts)" >> "$LOG"
node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --target . >> "$LOG" 2>&1
echo "exit[repair]=$?" >> "$LOG"
node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target . >> "$LOG" 2>&1
echo "exit[audit]=$?" >> "$LOG"
echo "== status" >> "$LOG"
git status --porcelain | grep -v '^??' >> "$LOG"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) end" >> "$LOG"
grep -E "^exit\[|^before|^after|written|drifted|replaced|created" "$LOG"
