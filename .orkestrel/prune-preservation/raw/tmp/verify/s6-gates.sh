#!/usr/bin/env bash
set -u
cd C:/Users/mikes/WebstormProjects/scaffold || exit 1
step() { local name="$1"; shift; "$@" > "tmp/verify/s6-${name}.log.txt" 2>&1; echo "${name}_EXIT=$?"; sed "s/\[[0-9;]*m//g" "tmp/verify/s6-${name}.log.txt" | grep -E "Tests |correct format" | tail -2; }
step formatcheck npm run format:check
step lintcheck npm run lint:check
step check npm run check
step core npm run test:src:core
step bin npm run test:src:bin
step config npm run test:config
