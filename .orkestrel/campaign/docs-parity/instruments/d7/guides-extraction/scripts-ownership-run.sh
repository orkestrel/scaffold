#!/usr/bin/env bash
set -u
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
phase=${1:?phase is required}
evidence="$SCR/scripts-ownership"
log="$evidence/$phase.log.txt"
status_file="$evidence/$phase.exit.txt"
mkdir -p "$evidence"
cd "$SCAFFOLD"
set +e
node node_modules/vitest/vitest.mjs run tests/src/server/Materializer.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server -t 'owns the scripts directory in raw and staged hosts' >"$log" 2>&1
status=$?
set -e
printf '%s\n' "$status" >"$status_file"
cat "$log"
exit "$status"
