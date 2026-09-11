#!/usr/bin/env bash
set -o pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/program"
npx oxfmt --config .oxfmtrc.json --check README.md guides/program.md tests/guides.test.ts src
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src
node --experimental-strip-types tests/guides.test.ts
