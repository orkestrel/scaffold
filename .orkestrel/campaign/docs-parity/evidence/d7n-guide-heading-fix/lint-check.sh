#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/guide
set -o pipefail
npx --no-install oxlint --config .oxlintrc.json --deny-warnings src/core/helpers.ts src/core/types.ts tests/setup.ts tests/src/core/helpers.test.ts tests/src/core/Guide.test.ts 2>&1 | tee tmp/d7n-guide-heading-fix/lint-check.log.txt
status=${PIPESTATUS[0]}
printf 'exit=%s\n' "$status" | tee -a tmp/d7n-guide-heading-fix/lint-check.log.txt
exit "$status"
