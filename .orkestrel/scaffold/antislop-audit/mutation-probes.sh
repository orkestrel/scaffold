#!/usr/bin/env bash
# Mutation probes: each breaks one guard, expects the named gate to redden, restores, re-proves green.
set -u
cd /home/user/scaffold
log() { echo "=== $1 ==="; }

log "M1 break jsPlugins specifier -> test:config must fail"
sed -i 's|"specifier": "./configs/policy.ts"|"specifier": "./configs/absent.ts"|' .oxlintrc.json
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project config > /dev/null 2>&1
echo "M1 broken-config test:config exit=$? (expect nonzero)"
git checkout -- .oxlintrc.json

log "M2 delete policy/no-mocking rule row -> test:config must fail"
sed -i 's|"policy/no-mocking": "error",||' .oxlintrc.json
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project config > /dev/null 2>&1
echo "M2 missing-rule test:config exit=$? (expect nonzero)"
git checkout -- .oxlintrc.json

log "M3 reintroduce a private member in src -> lint:check must fail naming policy(no-keyword-privacy)"
TARGET=$(ls src/core/*/*.ts | head -1)
echo "M3 target: $TARGET"
sed -i '0,/^export class [A-Za-z]* {/s//&\n\tprivate probeKeyword = 1/' "$TARGET"
npm run lint:check 2>&1 | grep -m1 "no-keyword-privacy" || echo "M3 RULE DID NOT FIRE"
git checkout -- "$TARGET"

log "M4 add a disable directive -> test:policy must fail on the suppression rule"
printf '// %s%s\n' "oxlint" "-disable-next-line" >> src/core/constants.ts
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project policy 2>&1 | grep -m1 -E "suppression|failed" || echo "M4 RULE DID NOT FIRE"
git checkout -- src/core/constants.ts

log "restore proof: all four gates green again"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project config > /dev/null 2>&1; echo "test:config exit=$?"
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project policy > /dev/null 2>&1; echo "test:policy exit=$?"
npm run lint:check > /dev/null 2>&1; echo "lint:check exit=$?"
git status --short
