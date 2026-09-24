#!/usr/bin/env bash
# TIP round-3 gates (the build precedes the conformance gate, which reads dist/) on the rebuilt validation copy tmp/probe/base (2a3f223 + the owned files + the tp-shared-3 edits).
source /home/user/veneer-tp/tmp/units/tp-env.sh
cd /home/user/veneer-tp/tmp/probe/base
run() { local name=$1; shift; "$@" > ../tp-gate3-$name.log 2>&1; local code=$?; echo "## $name exit $code :: $*"; sed 's/\x1b\[[0-9;]*m//g' ../tp-gate3-$name.log | grep -E "Test Files|Tests  |All matched|Finished"; }
run check npm run check
run build npm run build:src
run conformance npm run test:conformance
run guides npm run test:guides
run policy npm run test:policy
run fmt npx oxfmt --config .oxfmtrc.json --ignore-path=../tp-empty.ignore --check guides/veneer.md
