#!/usr/bin/env bash
set -o pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/program"
node --experimental-strip-types tests/guides.test.ts "$@"
