#!/usr/bin/env bash
# Rebuilds so the vendored host and the inventory carry the current source, then re-runs the gates
# that read those generated artifacts.
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 2
npm run build > "tmp/units/d1-build-2.log.txt" 2>&1
echo "exit=$?" >> "tmp/units/d1-build-2.log.txt"
npm run test:distribution > "tmp/units/d1-distribution-2.log.txt" 2>&1
echo "exit=$?" >> "tmp/units/d1-distribution-2.log.txt"
npm test > "tmp/units/d1-test-2.log.txt" 2>&1
echo "exit=$?" >> "tmp/units/d1-test-2.log.txt"
