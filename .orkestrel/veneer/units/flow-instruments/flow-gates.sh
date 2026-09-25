#!/usr/bin/env bash
# Runs unit E-ID-FLOW's suite gates in order, one log each under tmp/units/flow-logs.
cd /home/user/veneer-flow
r=tmp/units/flow-run.sh
$r build-src npm run build:src > /dev/null
$r conformance npm run test:conformance > /dev/null
$r src-styles npm run test:src:styles > /dev/null
$r setup npm run test:setup > /dev/null
$r guides npm run test:guides > /dev/null
$r app-browser npx vitest run --config vite.config.ts --no-cache --project app:browser > /dev/null
grep -H "^exit" tmp/units/flow-logs/{build-src,conformance,src-styles,setup,guides,app-browser}.log.txt
