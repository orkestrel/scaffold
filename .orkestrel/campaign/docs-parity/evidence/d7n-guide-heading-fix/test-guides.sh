#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/guide
set -o pipefail
npm run test:guides 2>&1 | tee tmp/d7n-guide-heading-fix/test-guides.log.txt
status=${PIPESTATUS[0]}
printf 'exit=%s\n' "$status" | tee -a tmp/d7n-guide-heading-fix/test-guides.log.txt
exit "$status"
