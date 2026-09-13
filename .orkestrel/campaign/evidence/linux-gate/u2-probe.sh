#!/bin/bash
# u2-probe.sh — U-2 from the fix-round audit: on a host whose ambient npm satisfies the
# generated floor, the moved provisioning case in tests/distribution.test.ts must report
# skipped while every other case passes. Stages npm 11.6.0 first on PATH; the gate reads
# process.env at module scope, so the prepend is what changes the branch under test.
set -u
cd /home/user/scaffold || exit 1
B=/tmp/claude-0/-home-user/488431e0-a918-55f9-9e40-378c151c8130/scratchpad/directnpm/bin/11.6.0/node_modules/.bin
export PATH="$B:$PATH"
echo "ambient npm on PATH: $(npm --version) (node $(node --version))"
timeout 1500 npm run test:distribution -- --mode release 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E 'provisions the floor|↓|skipped|Tests |Test Files|FAIL|×' 
echo "u2 exit=${PIPESTATUS[0]}"
