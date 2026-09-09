#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
node_modules/oxfmt/bin/oxfmt --config .oxfmtrc.json --write tests/src/bin/CLI.test.ts tests/src/core/helpers.test.ts
