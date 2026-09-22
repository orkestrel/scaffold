#!/bin/bash
# Scaffold 0.0.77 preparation, run 2 (successor of scaffold-release-prep.sh): the self-pin sweep moved the three
# generated-manifest snapshot fixtures; this run moves the CLI advisory's planned range and re-runs the gate chain
# from format:check through the full test script. dist is unchanged since run 1, whose release-mode distribution
# proof stands. Log: scaffold-release-prep-2.log.txt. Cap: 1200 s.
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/scaffold-release-prep-2.log.txt
: > "$LOG"
step() { echo "=== $1 ($(date -u +%H:%M:%S))" >> "$LOG"; }
cd /home/user/scaffold || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"
sed -i 's|"@orkestrel/test": "\^0\.0\.18",`|"@orkestrel/test": "^0.0.20",`|' tests/src/bin/CLI.test.ts
step "CLI advisory range: $(grep -c '"@orkestrel/test": "\^0\.0\.20",`' tests/src/bin/CLI.test.ts) hit(s) of ^0.0.20, $(grep -c '\^0\.0\.18' tests/src/bin/CLI.test.ts) of ^0.0.18"
step "self-pin sweep: ^0.0.18 for test under src and tests: $(grep -rn '@orkestrel/test.\{0,4\}\^0\.0\.18' src tests | wc -l); 0.0.76 literals: $(grep -rn '0\.0\.76' src tests --include='*.ts' --include='*.txt' --include='*.json' | wc -l)"
for gate in format:check lint:check check test; do
  step "npm run $gate"; timeout 900 npm run "$gate" >> "$LOG" 2>&1; step "$gate exit=$?"
done
step "status: $(git status --porcelain | tr '\n' ' ')"
echo "=== prep 2 done" >> "$LOG"
