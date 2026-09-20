#!/usr/bin/env bash
# Test visit after the scaffold 0.0.76 vendored-only release: re-pin the development dependency
# from the registry, install, repair, audit. Orchestrator's tracked command; gates follow by verifier.
cd "C:/Users/mikes/WebstormProjects/test" || exit 9
LOG="C:/Users/mikes/WebstormProjects/test/tmp/test-repin-0.0.76.log.txt"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) start $(git log --oneline -1)" > "$LOG"
git status --porcelain | grep -v '^??' >> "$LOG"
echo "before: $(node -e "console.log(require('./package.json').devDependencies['@orkestrel/scaffold'])")" >> "$LOG"
npm install --save-dev "@orkestrel/scaffold@^0.0.76" >> "$LOG" 2>&1
echo "exit[install]=$?" >> "$LOG"
echo "after: $(node -e "console.log(require('./package.json').devDependencies['@orkestrel/scaffold'])") installed: $(node -e "console.log(require('./node_modules/@orkestrel/scaffold/package.json').version)")" >> "$LOG"
node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --target . >> "$LOG" 2>&1
echo "exit[repair]=$?" >> "$LOG"
node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target . >> "$LOG" 2>&1
echo "exit[audit]=$?" >> "$LOG"
echo "== status" >> "$LOG"
git status --porcelain | grep -v '^??' >> "$LOG"
echo "== $(date -u +%Y-%m-%dT%H:%M:%SZ) end" >> "$LOG"
grep -E "^exit\[|^before|^after|written|drifted" "$LOG"
