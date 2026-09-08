#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path
npx oxfmt --config .oxfmtrc.json --check tests/setupPolicy.ts tests/setupPolicy.test.ts tests/config.test.ts
npx oxlint --config .oxlintrc.json --deny-warnings tests/setupPolicy.ts tests/setupPolicy.test.ts tests/config.test.ts
