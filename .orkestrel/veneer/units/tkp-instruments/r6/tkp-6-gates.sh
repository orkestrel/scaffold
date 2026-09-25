#!/usr/bin/env bash
# TOKEN-PROOFS round 6 gates, derived from tmp/units/tkp-5-gates.sh. Each gate logs to
# tmp/units/tkp-6-<gate>.log.txt with its exit status and the load average appended.
cd /home/user/veneer-tkp || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
{ npm run check; echo "exit=$?"; cat /proc/loadavg; } > tmp/units/tkp-6-check.log.txt 2>&1
{ npm run lint:check; echo "exit=$?"; cat /proc/loadavg; } > tmp/units/tkp-6-lintcheck.log.txt 2>&1
{ sha256sum tests/src/styles/tokens.test.ts guides/veneer.md > tmp/units/tkp-6-oxfmt-before.sha
  ./node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/src/styles/tokens.test.ts guides/veneer.md; echo "exit=$?"
  sha256sum -c tmp/units/tkp-6-oxfmt-before.sha; echo "unchanged-exit=$?"; } > tmp/units/tkp-6-oxfmtcheck.log.txt 2>&1
{ npm run build:src:styles; echo "exit=$?"; } > tmp/units/tkp-6-buildstyles.log.txt 2>&1
{ npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/tokens.test.ts --reporter=verbose; echo "exit=$?"; cat /proc/loadavg; } 2>&1 | grep -v 'has been externalized' > tmp/units/tkp-6-vitesttokens.log.txt
{ npm run test:guides; echo "exit=$?"; cat /proc/loadavg; } > tmp/units/tkp-6-testguides.log.txt 2>&1
{ npm run test:policy; echo "exit=$?"; cat /proc/loadavg; } > tmp/units/tkp-6-testpolicy.log.txt 2>&1
echo gates-done
