#!/usr/bin/env bash
set -o pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/workflow"
start=$SECONDS
node --experimental-strip-types tests/guides.test.ts --to guide > tmp/d7n-workflow-dependent-fix/to-guide-zero.stdout.txt 2> tmp/d7n-workflow-dependent-fix/to-guide-zero.stderr.txt
status=$?
printf '%s\n' "$status" > tmp/d7n-workflow-dependent-fix/to-guide-zero.exit.txt
printf '%s\n' "$((SECONDS - start))" > tmp/d7n-workflow-dependent-fix/to-guide-zero.seconds.txt
exit "$status"
