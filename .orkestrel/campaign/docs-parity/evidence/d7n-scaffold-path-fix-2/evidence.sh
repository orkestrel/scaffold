#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path

git diff -- .claude/rules/portability.md tests/setupPolicy.ts tests/config.test.ts tests/setup.ts > tmp/d7n-scaffold-path-fix-2/diff.patch
git diff --stat -- .claude/rules/portability.md tests/setupPolicy.ts tests/config.test.ts tests/setup.ts > tmp/d7n-scaffold-path-fix-2/diffstat.txt
git status --short > tmp/d7n-scaffold-path-fix-2/status.txt
git diff --check -- .claude/rules/portability.md tests/setupPolicy.ts tests/config.test.ts tests/setup.ts > tmp/d7n-scaffold-path-fix-2/diff-check.log

set +e
git diff --no-index -- /dev/null tests/setupPolicy.test.ts > tmp/d7n-scaffold-path-fix-2/setupPolicy-test.patch
test_patch_status=$?
git diff --no-index --stat -- /dev/null tests/setupPolicy.test.ts > tmp/d7n-scaffold-path-fix-2/setupPolicy-test-diffstat.txt
test_stat_status=$?
git diff --no-index --check -- /dev/null tests/setupPolicy.test.ts > tmp/d7n-scaffold-path-fix-2/setupPolicy-test-check.log
test_check_status=$?
set -e

if [[ ${test_patch_status} -ne 1 || ${test_stat_status} -ne 1 || ${test_check_status} -ne 1 ]]; then
	exit 1
fi
