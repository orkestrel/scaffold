#!/bin/bash
# UTIL-EFFECT negative controls on the validation copy at tmp/probe/base, each logged under
# tmp/units/: the service proofs green, then red with a shipped important shared name written onto
# the exclusion line in every copy, then red with that name's `!important` dropped from the built
# cascade; and the conformance ledger red with the unit's Additions row removed from the guide.
# Every planted change is reverted before the next run.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
W=/home/user/veneer-ue
B=$W/tmp/probe/base
U=$W/tmp/units
COPIES="tests/setup.css tests/fixtures/tailwind/consumer.css tests/fixtures/tailwind/preflight.css guides/veneer.md"
cd $B
summary() { echo "$1 exit $2 :: $(grep -E 'Tests +[0-9]' $3 | tail -n 1 | sed 's/^ *//')"; grep -E "^ FAIL " $3 | sed 's/^ *//' | sort -u; }
npm run build:src > /dev/null 2>&1 || echo "build failed"
npm run test:service > $U/ue-control-service-green.log.txt 2>&1; summary "service green" $? $U/ue-control-service-green.log.txt
for f in $COPIES; do sed -i 's/ shadow-lg shadow-none");/ shadow-lg shadow-none opacity-50");/' $f; done
grep -c 'opacity-50");' $COPIES
npm run test:service > $U/ue-control-service-line.log.txt 2>&1; summary "service with opacity-50 on the line" $? $U/ue-control-service-line.log.txt
for f in $COPIES; do sed -i 's/ shadow-none opacity-50");/ shadow-none");/' $f; done
grep -c 'opacity-50");' $COPIES
cp dist/src/styles/index.css $W/tmp/probe/index.css.keep
sed -i 's/\.opacity-50{opacity:\.5!important}/.opacity-50{opacity:.5}/' dist/src/styles/index.css
grep -o '\.opacity-50{[^}]*}' dist/src/styles/index.css
npm run test:service > $U/ue-control-service-important.log.txt 2>&1; summary "service with the opacity-50 importance dropped" $? $U/ue-control-service-important.log.txt
cp $W/tmp/probe/index.css.keep dist/src/styles/index.css
grep -o '\.opacity-50{[^}]*}' dist/src/styles/index.css
cp guides/veneer.md $W/tmp/probe/guide.keep
grep -v '^| `focus-ring`   | `.focus-ring:focus { outline }`' $W/tmp/probe/guide.keep > guides/veneer.md
npm run test:conformance > $U/ue-control-conformance-addition.log.txt 2>&1; summary "conformance without the focus-ring Additions row" $? $U/ue-control-conformance-addition.log.txt
cp $W/tmp/probe/guide.keep guides/veneer.md
npm run test:conformance > $U/ue-control-conformance-green.log.txt 2>&1; summary "conformance green" $? $U/ue-control-conformance-green.log.txt
