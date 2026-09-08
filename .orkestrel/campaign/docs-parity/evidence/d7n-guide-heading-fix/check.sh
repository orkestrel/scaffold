#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/guide
set -o pipefail
npm run check 2>&1 | tee tmp/d7n-guide-heading-fix/check.log.txt
status=${PIPESTATUS[0]}
printf 'exit=%s\n' "$status" | tee -a tmp/d7n-guide-heading-fix/check.log.txt
exit "$status"
