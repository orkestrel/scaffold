#!/usr/bin/env bash
# TOKEN-PROOFS round 3 gates. Each gate logs to tmp/units/tkp-3-<gate>.log.txt with its exit status
# and the load average appended.
cd /home/user/veneer-tkp || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
{ npm run check; echo "exit=$?"; cat /proc/loadavg; } > tmp/units/tkp-3-check.log.txt 2>&1
{ npm run lint:check; echo "exit=$?"; cat /proc/loadavg; } > tmp/units/tkp-3-lint-check.log.txt 2>&1
{ sha256sum tests/src/styles/tokens.test.ts guides/veneer.md > tmp/units/tkp-3-oxfmt-before.sha
  ./node_modules/.bin/oxfmt --config .oxfmtrc.json tests/src/styles/tokens.test.ts guides/veneer.md; echo "exit=$?"
  sha256sum -c tmp/units/tkp-3-oxfmt-before.sha; echo "unchanged-exit=$?"; } > tmp/units/tkp-3-oxfmt.log.txt 2>&1
{ npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts --reporter=verbose; echo "exit=$?"; cat /proc/loadavg; } 2>&1 | grep -v 'has been externalized' > tmp/units/tkp-3-tokens.log.txt
{ npm run test:guides; echo "exit=$?"; cat /proc/loadavg; } > tmp/units/tkp-3-test-guides.log.txt 2>&1
{ npm run test:policy; echo "exit=$?"; cat /proc/loadavg; } > tmp/units/tkp-3-test-policy.log.txt 2>&1
echo gates-done
