#!/usr/bin/env bash
# ER-MECH final readings: the planted controls, then the ordinary and release-mode distribution
# runs, each logged under tmp/units/ with its exit status appended.
cd /home/user/veneer-erm || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
python3 tmp/units/erm-plants.py
npm run test:distribution > tmp/units/erm-distribution.log.txt 2>&1
echo "exit=$?" >> tmp/units/erm-distribution.log.txt
npm run test:distribution -- --reporter=verbose > tmp/units/erm-distribution-verbose.log.txt 2>&1
echo "exit=$?" >> tmp/units/erm-distribution-verbose.log.txt
npm run test:distribution -- --mode release > tmp/units/erm-distribution-release.log.txt 2>&1
echo "exit=$?" >> tmp/units/erm-distribution-release.log.txt
npm run test:distribution -- --mode release --reporter=verbose > tmp/units/erm-distribution-release-verbose.log.txt 2>&1
echo "exit=$?" >> tmp/units/erm-distribution-release-verbose.log.txt
echo finished
