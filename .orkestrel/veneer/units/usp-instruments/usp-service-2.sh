#!/usr/bin/env bash
# Observation: the service project over the validation copy with UTIL-PAINT's revised profiles
# patch applied to the copy's profiles proof, then the proof restored from the pristine extract.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/veneer-usp/tmp/probe/base
patch -p1 < /home/user/scaffold/.orkestrel/veneer/units/up-unscoped-profiles-2.patch; echo "patch exit $?"
echo "command: npm run build:src:styles && npm run test:service"
npm run build:src:styles > /dev/null 2>&1 && npm run test:service > /home/user/veneer-usp/tmp/units/usp-service-2-run.log.txt 2>&1; echo "exit $?"
grep -E "^\s+Tests |FAIL|AssertionError" /home/user/veneer-usp/tmp/units/usp-service-2-run.log.txt
cp ../orig/tests/service/tailwind/profiles.test.ts tests/service/tailwind/profiles.test.ts
cmp ../orig/tests/service/tailwind/profiles.test.ts tests/service/tailwind/profiles.test.ts && echo "profiles proof restored"
