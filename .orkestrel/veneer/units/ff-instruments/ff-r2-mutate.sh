#!/usr/bin/env bash
# Runs one round-2 journey mutation at one variant, filtered to the named case, logs it, and restores.
# Usage: ff-r2-mutate.sh MUTATION VARIANT PATTERN
set -u
cd /home/user/veneer-ff
cp tests/app/browser/integration.test.ts tmp/units/ff-keep-journey.ts
python3 tmp/units/ff-r2-mutate.py "$1" || { cp tmp/units/ff-keep-journey.ts tests/app/browser/integration.test.ts; exit 9; }
diff tmp/units/ff-keep-journey.ts tests/app/browser/integration.test.ts > "tmp/units/ff-mut2-$1-$2.diff.txt"
tmp/units/ff-journey-case.sh "$2" "mut2-$1" "$3"
code=$?
cp tmp/units/ff-keep-journey.ts tests/app/browser/integration.test.ts
rm tmp/units/ff-keep-journey.ts
exit $code
