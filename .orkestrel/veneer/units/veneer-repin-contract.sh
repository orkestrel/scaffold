#!/bin/bash
# veneer-repin-contract.sh: re-pin Veneer's @orkestrel/contract to ^0.0.18 (runtime) and @orkestrel/test to ^0.0.22
# (development) in one change, the pending shared change plan.md records, after both are on the registry; then the
# authoritative gate chain, its gate list from main-cg-gates.sh. The worktrees' node_modules are hard links into this
# checkout's, so the install marker is unlinked before it is written. No commit: the Orchestrator commits on green.
# Log: /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/veneer-repin-contract.log.txt
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/veneer-repin-contract.log.txt; : > "$LOG"
cd /home/user/veneer || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty; refusing" >> "$LOG"; exit 2; }
c=$(npm view @orkestrel/contract version --registry=https://registry.npmjs.org); t=$(npm view @orkestrel/test version --registry=https://registry.npmjs.org)
echo "=== npm $(npm --version) HEAD $(git rev-parse --short HEAD) registry contract@$c test@$t $(date -u +%H:%M:%S)" >> "$LOG"
[ "$c" = "0.0.18" ] && [ "$t" = "0.0.22" ] || { echo "=== registry not at contract 0.0.18 and test 0.0.22; refusing" >> "$LOG"; exit 3; }
node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json','utf8'));p.dependencies['@orkestrel/contract']='^0.0.18';p.devDependencies['@orkestrel/test']='^0.0.22';fs.writeFileSync('package.json',JSON.stringify(p,null,'\t')+'\n')"
npx oxfmt --write package.json >> "$LOG" 2>&1
npm install --ignore-scripts >> "$LOG" 2>&1; echo "=== npm install exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
rm -f node_modules/.orkestrel-lock.sha256; sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
echo "=== diff: [$(git diff --stat | tr '\n' ' ')]" >> "$LOG"
npm ls @orkestrel/contract >> "$LOG" 2>&1
for gate in format:check lint:check check build test:src:core test:src:browser test:src:styles test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides test:distribution test:service; do
  echo "=== npm run $gate ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 1500 npm run "$gate" >> "$LOG" 2>&1
  echo "=== $gate exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
done
echo "=== gates done ($(date -u +%H:%M:%S))" >> "$LOG"
