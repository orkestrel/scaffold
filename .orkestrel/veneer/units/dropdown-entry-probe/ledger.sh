#!/bin/bash
# Probe: what the conformance ledger prints for the candidate dropdown entry rule, at Veneer main 92ca407 plus the candidate.
cd /home/user/veneer-probe || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OUT=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/dropdown-probe
git diff --stat
echo "== build:src"; npm run build:src > $OUT/candidate-buildsrc.log.txt 2>&1; echo "exit=$?"
echo "== conformance"; npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project conformance > $OUT/candidate-conformance.log.txt 2>&1; echo "exit=$?"
echo "== guides"; npm run test:guides > $OUT/candidate-guides.log.txt 2>&1; echo "exit=$?"
