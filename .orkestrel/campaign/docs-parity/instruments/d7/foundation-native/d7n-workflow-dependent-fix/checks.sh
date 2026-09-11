#!/usr/bin/env bash
set -o pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/workflow"
start=$SECONDS
npx oxfmt --config .oxfmtrc.json --check README.md guides/workflow.md tests/guides.test.ts src > tmp/d7n-workflow-dependent-fix/format-check.stdout.txt 2> tmp/d7n-workflow-dependent-fix/format-check.stderr.txt
format_status=$?
printf '%s\n' "$format_status" > tmp/d7n-workflow-dependent-fix/format-check.exit.txt
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src > tmp/d7n-workflow-dependent-fix/lint-check.stdout.txt 2> tmp/d7n-workflow-dependent-fix/lint-check.stderr.txt
lint_status=$?
printf '%s\n' "$lint_status" > tmp/d7n-workflow-dependent-fix/lint-check.exit.txt
printf '%s\n' "$((SECONDS - start))" > tmp/d7n-workflow-dependent-fix/checks.seconds.txt
if (( format_status != 0 )); then exit "$format_status"; fi
exit "$lint_status"
