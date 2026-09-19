#!/usr/bin/env bash
# Runs the authoritative gates this unit owns evidence for, each into its own log.
cd "C:/Users/mikes/WebstormProjects/scaffold" || exit 2
npm run test:distribution > "tmp/units/d1-distribution.log.txt" 2>&1
echo "exit=$?" >> "tmp/units/d1-distribution.log.txt"
npm test > "tmp/units/d1-test.log.txt" 2>&1
echo "exit=$?" >> "tmp/units/d1-test.log.txt"
