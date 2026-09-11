#!/usr/bin/env bash
set -o pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/program"

before=$(git diff -- README.md guides/program.md tests/guides.test.ts src | git hash-object --stdin)
node --experimental-strip-types tests/guides.test.ts --to guide
after_guide=$(git diff -- README.md guides/program.md tests/guides.test.ts src | git hash-object --stdin)
test "$before" = "$after_guide"
node --experimental-strip-types tests/guides.test.ts --to source
after_source=$(git diff -- README.md guides/program.md tests/guides.test.ts src | git hash-object --stdin)
test "$after_guide" = "$after_source"
printf '%s\n' "diff $before" "guide $after_guide" "source $after_source"
