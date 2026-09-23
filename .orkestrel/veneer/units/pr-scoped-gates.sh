#!/bin/bash
# pr-scoped-gates.sh: the PROOF-RESOLVER landing on the session branch (cherry-picked after the ACCORDION chain): the scoped gates the verdict names. Log: $S/pr-scoped-gates.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/pr-scoped-gates.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; cd /home/user/veneer || exit 1
echo "=== HEAD $(git rev-parse --short HEAD) ($(date -u +%H:%M:%S))" >> $LOG
for g in format:check lint:check check test:guides test:policy test:conformance; do npm run $g >> $LOG 2>&1; echo "=== $g exit=$? ($(date -u +%H:%M:%S))" >> $LOG; done
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts >> $LOG 2>&1; echo "=== setup-server proof exit=$? ($(date -u +%H:%M:%S))" >> $LOG
echo "=== pr scoped gates done ($(date -u +%H:%M:%S))" >> $LOG
