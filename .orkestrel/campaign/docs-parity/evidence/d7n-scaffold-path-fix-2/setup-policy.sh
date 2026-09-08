#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path

npm run test:setup -- tests/setupPolicy.test.ts 2>&1 | tee tmp/d7n-scaffold-path-fix-2/setup-policy.log
