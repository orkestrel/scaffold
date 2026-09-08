#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path

npm run test:config -- tests/config.test.ts -t "loads every configured policy rule through the real binary" 2>&1 | tee tmp/d7n-scaffold-path-fix-2/red.log
