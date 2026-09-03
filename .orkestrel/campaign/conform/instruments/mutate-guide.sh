#!/usr/bin/env bash
# Mutation probe for unit guide-regex: put the old regex back at extractMemberMethods, run the mirrored
# helpers test (the new pin must fail), restore the fix, run again (must pass). Output is the record.
set -u
cd /home/user/fleet/guide || exit 2
OLD='(<.*>)?\\??\\('
NEW='\\??(<.*>)?\\('
F=src/core/helpers.ts
echo "control: sites carrying the fix = $(grep -c 'const method = line.code.match(/^\\t(?:async )?\\\*?(\\w+)\\??(<.\*>)?\\\(/)' $F)"
# Revert only the first site (extractMemberMethods) so the probe names one pin.
LINE=$(grep -n 'export function extractMemberMethods' $F | cut -d: -f1)
SITE=$(awk -v s="$LINE" 'NR>s && /const method = line.code.match/ {print NR; exit}' $F)
echo "mutating line $SITE"
sed -i "${SITE}s#(\\\\w+)\\\\??(<\\.\\*>)?\\\\(#(\\\\w+)(<.*>)?\\\\??\\\\(#" $F
sed -n "${SITE}p" $F
npm run test:src:core -- tests/src/core/helpers.test.ts > /home/user/work/logs/mutate-guide-red.log 2>&1
echo "mutated run exit=$? : $(grep -E 'Tests ' /home/user/work/logs/mutate-guide-red.log | tail -1)"
grep -E '✗|×|FAIL|failed' /home/user/work/logs/mutate-guide-red.log | head -3
sed -i "${SITE}s#(\\\\w+)(<\\.\\*>)?\\\\??\\\\(#(\\\\w+)\\\\??(<.*>)?\\\\(#" $F
sed -n "${SITE}p" $F
npm run test:src:core -- tests/src/core/helpers.test.ts > /home/user/work/logs/mutate-guide-green.log 2>&1
echo "restored run exit=$? : $(grep -E 'Tests ' /home/user/work/logs/mutate-guide-green.log | tail -1)"
echo "tree after probe:"; git status --short
