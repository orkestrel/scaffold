#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path

npx oxfmt --config .oxfmtrc.json --check tests/setupPolicy.ts tests/config.test.ts tests/setupPolicy.test.ts tests/setup.ts .claude/rules/portability.md 2>&1 | tee tmp/d7n-scaffold-path-fix-2/format-check.log
