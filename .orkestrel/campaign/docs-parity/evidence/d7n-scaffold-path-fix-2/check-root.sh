#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path

npx tsc --noEmit --project tsconfig.json 2>&1 | tee tmp/d7n-scaffold-path-fix-2/check-root.log
