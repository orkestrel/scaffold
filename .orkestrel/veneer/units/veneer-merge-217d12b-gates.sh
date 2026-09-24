#!/bin/bash
# veneer-merge-217d12b-gates.sh: the authoritative gate chain over Veneer main 217d12b (this session's contract and test re-pin merged with the engine session's J-BINDER-PRECEDENCE landing 468a118), run after the push the protocol puts before it; derived from veneer-repin-contract.sh with the re-pin steps removed.
# Log: /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/veneer-merge-217d12b.log.txt
SCR=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
LOG=$SCR/veneer-merge-217d12b.log.txt; : > "$LOG"
cd /home/user/veneer || exit 1
export PATH="$SCR/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty; refusing" >> "$LOG"; exit 2; }
npm install --ignore-scripts >> "$LOG" 2>&1; echo "=== npm install exit=$?" >> "$LOG"; rm -f node_modules/.orkestrel-lock.sha256; sha256sum package-lock.json | cut -d" " -f1 > node_modules/.orkestrel-lock.sha256; echo "=== HEAD $(git rev-parse --short HEAD) status [$(git status --porcelain | tr "\n" " ")] $(date -u +%H:%M:%S)" >> "$LOG"
echo "=== diff: [$(git diff --stat | tr '\n' ' ')]" >> "$LOG"
npm ls @orkestrel/contract >> "$LOG" 2>&1
for gate in format:check lint:check check build test:src:core test:src:browser test:src:styles test:app test:journey test:policy test:config test:setup test:setup:browser test:conformance test:guides test:distribution test:service; do
  echo "=== npm run $gate ($(date -u +%H:%M:%S))" >> "$LOG"
  timeout 1500 npm run "$gate" >> "$LOG" 2>&1
  echo "=== $gate exit=$? ($(date -u +%H:%M:%S))" >> "$LOG"
done
echo "=== gates done ($(date -u +%H:%M:%S))" >> "$LOG"
