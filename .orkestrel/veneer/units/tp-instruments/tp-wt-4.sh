#!/usr/bin/env bash
# TIP round-4 worktree gates: the repository's non-mutating format and lint checks.
source /home/user/veneer-tp/tmp/units/tp-env.sh
cd /home/user/veneer-tp
npm run format:check > tmp/units/tp-wt-fmt-4.log.txt 2>&1
echo "## format:check exit $? :: npm run format:check"
npm run lint:check > tmp/units/tp-wt-lint-4.log.txt 2>&1
echo "## lint:check exit $? :: npm run lint:check"
