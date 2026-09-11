#!/usr/bin/env bash
set -o pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/workflow"
start=$SECONDS
node --experimental-strip-types tests/guides.test.ts > tmp/d7n-workflow-dependent-fix/baseline.stdout.txt 2> tmp/d7n-workflow-dependent-fix/baseline.stderr.txt
status=$?
printf '%s\n' "$status" > tmp/d7n-workflow-dependent-fix/baseline.exit.txt
printf '%s\n' "$((SECONDS - start))" > tmp/d7n-workflow-dependent-fix/baseline.seconds.txt
exit "$status"
