#!/usr/bin/env bash
set -o pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/workflow"
start=$SECONDS
npx oxfmt --config .oxfmtrc.json --write README.md guides/workflow.md tests/guides.test.ts src > tmp/d7n-workflow-dependent-fix/format.stdout.txt 2> tmp/d7n-workflow-dependent-fix/format.stderr.txt
status=$?
printf '%s\n' "$status" > tmp/d7n-workflow-dependent-fix/format.exit.txt
printf '%s\n' "$((SECONDS - start))" > tmp/d7n-workflow-dependent-fix/format.seconds.txt
exit "$status"
