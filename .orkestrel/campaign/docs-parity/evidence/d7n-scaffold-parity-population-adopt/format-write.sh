#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
node node_modules/oxfmt/bin/oxfmt --config .oxfmtrc.json --write tests/guides.test.ts tests/src/core/compilers.test.ts
