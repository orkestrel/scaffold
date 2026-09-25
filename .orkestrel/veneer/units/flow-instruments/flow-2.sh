#!/usr/bin/env bash
# Runs unit E-ID-FLOW round 2: the owned files, the address literal mutation, the nested-list
# mutation, a rebuild from the restored source, then the owned files and the named gates, one log
# each under tmp/units/flow-logs, each ending in its exit code.
cd /home/user/veneer-flow
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
logs=tmp/units/flow-logs
owned="tests/src/styles/elements/heading.test.ts tests/src/styles/elements/p.test.ts tests/src/styles/elements/address.test.ts tests/src/styles/elements/ol.test.ts tests/src/styles/elements/ul.test.ts tests/src/styles/components/type.test.ts tests/src/styles/components/card.test.ts"
npm run build:src:styles > "$logs/build-r2-before.log.txt" 2>&1; echo "exit=$?" >> "$logs/build-r2-before.log.txt"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache $owned > "$logs/owned-r2-before.log.txt" 2>&1; echo "exit=$?" >> "$logs/owned-r2-before.log.txt"
tmp/units/flow-mutate.sh address-literal src/styles/elements/_address.scss 'var(--vn-space-8)' '1rem' tests/src/styles/elements/address.test.ts
tmp/units/flow-mutate.sh nested-list src/styles/elements/_ul.scss $'\t\tlist-style-type: disc;\n\t}\n' $'\t\tlist-style-type: disc;\n\t}\n\n\tul ul {\n\t\tmargin-bottom: 0;\n\t}\n' tests/src/styles/elements/ul.test.ts
npm run build:src:styles > "$logs/build-r2.log.txt" 2>&1; echo "exit=$?" >> "$logs/build-r2.log.txt"
npx vitest run --config configs/src/vite.styles.config.ts --no-cache $owned > "$logs/owned-r2.log.txt" 2>&1; echo "exit=$?" >> "$logs/owned-r2.log.txt"
npm run test:src:styles > "$logs/src-styles-r2.log.txt" 2>&1; echo "exit=$?" >> "$logs/src-styles-r2.log.txt"
npm run test:conformance > "$logs/conformance-r2.log.txt" 2>&1; echo "exit=$?" >> "$logs/conformance-r2.log.txt"
npm run test:guides > "$logs/guides-r2.log.txt" 2>&1; echo "exit=$?" >> "$logs/guides-r2.log.txt"
grep -H "^exit=" $logs/*-r2*.log.txt
for gate in format:check lint:check check; do
	log="$logs/${gate/:/-}-r2.log.txt"
	npm run "$gate" > "$log" 2>&1; echo "exit=$?" >> "$log"
done
grep -H "^exit=" $logs/*-r2.log.txt
