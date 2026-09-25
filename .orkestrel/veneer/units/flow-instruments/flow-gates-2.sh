#!/usr/bin/env bash
# Runs unit E-ID-FLOW's final gates in order after the fixes, one log each under
# tmp/units/flow-logs. Succeeds flow-gates.sh: adds the static checks and the owned files.
cd /home/user/veneer-flow
r=tmp/units/flow-run.sh
$r format-check npm run format:check > /dev/null
$r lint-check npm run lint:check > /dev/null
$r check npm run check > /dev/null
$r build-src-2 npm run build:src > /dev/null
$r owned-final npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/heading.test.ts tests/src/styles/elements/p.test.ts tests/src/styles/elements/address.test.ts tests/src/styles/elements/ol.test.ts tests/src/styles/elements/ul.test.ts tests/src/styles/components/type.test.ts tests/src/styles/components/card.test.ts > /dev/null
$r conformance-2 npm run test:conformance > /dev/null
$r src-styles-2 npm run test:src:styles > /dev/null
$r setup-2 npm run test:setup > /dev/null
$r guides-2 npm run test:guides > /dev/null
$r app-browser-2 npx vitest run --config vite.config.ts --no-cache --project app:browser > /dev/null
grep -H "^exit" tmp/units/flow-logs/{format-check,lint-check,check,build-src-2,owned-final,conformance-2,src-styles-2,setup-2,guides-2,app-browser-2}.log.txt
