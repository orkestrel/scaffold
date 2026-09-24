#!/bin/bash
# to-audit-settling.sh: the Orchestrator's settling run for TOAST audit round 1, claim 3 and the claim-5 section controls.
# Stages a validation copy in the scratchpad (never in a live unit's tree): git archive 2a3f223 from veneer-to, a
# hard-linked node_modules with its caches removed, the unit's owned files, and to-shared.patch; then runs the unit's
# own mutation controls (to-audit-settling-styles.py and -section.py, the unit's scripts with only the base path
# changed) and records every mutation's build exit, test exit, summary, and failing cases.
# Log: .orkestrel/veneer/units/to-audit-settling.log.txt
LOG=/home/user/scaffold/.orkestrel/veneer/units/to-audit-settling.log.txt; : > $LOG
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
rm -rf /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle; mkdir -p /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base
git -C /home/user/veneer-to archive 2a3f223 | tar -x -C /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base
cp -al /home/user/veneer-to/node_modules /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base/node_modules && rm -rf /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base/node_modules/.vite /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base/node_modules/.vitest /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base/node_modules/.cache
for f in src/styles/components/_toast.scss tests/src/styles/components/toast.test.ts app/browser/sections/ToastSection.ts tests/app/browser/sections/ToastSection.test.ts; do mkdir -p $(dirname /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base/$f); cp /home/user/veneer-to/$f /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base/$f; done
(cd /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base && git apply /home/user/scaffold/.orkestrel/veneer/units/to-shared.patch) >> $LOG 2>&1; echo "=== patch applied exit=$? $(date -u +%T)" >> $LOG
(cd /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base && npm run build:src:styles > /dev/null 2>&1); echo "=== base build exit=$?" >> $LOG
(cd /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/to-settle/base && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/toast.test.ts 2>&1 | grep -E "Tests|Test Files") >> $LOG; echo "=== unmutated styles run done" >> $LOG
python3 /home/user/scaffold/.orkestrel/veneer/units/to-audit-settling-styles.py >> $LOG 2>&1; echo "=== styles controls exit=$? $(date -u +%T)" >> $LOG
python3 /home/user/scaffold/.orkestrel/veneer/units/to-audit-settling-section.py >> $LOG 2>&1; echo "=== section controls exit=$? $(date -u +%T)" >> $LOG
echo "=== settling done $(date -u +%T)" >> $LOG
