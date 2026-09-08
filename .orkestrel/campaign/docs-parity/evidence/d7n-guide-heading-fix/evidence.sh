#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/guide
git diff --check > tmp/d7n-guide-heading-fix/diff-check.log.txt 2>&1
diff_status=$?
printf 'exit=%s\n' "$diff_status" >> tmp/d7n-guide-heading-fix/diff-check.log.txt
git diff --stat > tmp/d7n-guide-heading-fix/diff-stat.txt
git diff -- src/core/helpers.ts src/core/types.ts tests/setup.ts tests/src/core/helpers.test.ts tests/src/core/Guide.test.ts guides/guide.md > tmp/d7n-guide-heading-fix/diff.txt
git status --short > tmp/d7n-guide-heading-fix/status.txt
exit "$diff_status"
