#!/usr/bin/env bash
set -o pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/program"
npx oxfmt --config .oxfmtrc.json --write README.md guides/program.md tests/guides.test.ts src/core/types.ts src/core/helpers.ts src/core/programs/Program.ts src/core/programs/ProgramManager.ts
