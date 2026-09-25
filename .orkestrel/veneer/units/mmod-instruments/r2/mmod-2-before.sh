#!/usr/bin/env bash
# Round 2 of E-ID-MOTION-MODAL. Failing-first reading for R2: runs a plant against round 1's
# modal.test.ts (the pre-edit backup), then restores the round-2 test file byte-identically.
# usage: mmod-2-before.sh NAME OLD NEW
source /home/user/veneer-mmod/tmp/units/mmod-env.sh
name=$1; old=$2; new=$3
test=tests/src/styles/components/modal.test.ts
cp "$test" tmp/units/mmod-2-before-final.test.ts.txt
cp tmp/units/mmod-2-backup/$test "$test"
PLANT_LOG=1 bash tmp/units/mmod-2-plant.sh "before-$name" src/styles/components/_modal.scss "$old" "$new" > /dev/null
cp tmp/units/mmod-2-before-final.test.ts.txt "$test"
cmp tmp/units/mmod-2-before-final.test.ts.txt "$test" && echo "test-restored=identical" >> tmp/units/mmod-2-plant-before-$name.log.txt
rm tmp/units/mmod-2-before-final.test.ts.txt
grep -E "×|AssertionError|Error:|Tests |exit=|restored=|rebuild=" tmp/units/mmod-2-plant-before-$name.log.txt
