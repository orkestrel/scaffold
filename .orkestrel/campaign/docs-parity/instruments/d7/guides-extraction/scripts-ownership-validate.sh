#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
exec > >(tee tmp/pass/scripts-ownership/validate.log.txt) 2>&1
node node_modules/typescript/bin/tsc --noEmit -p configs/src/tsconfig.core.json
node node_modules/typescript/bin/tsc --noEmit -p configs/src/tsconfig.server.json
node node_modules/typescript/bin/tsc --noEmit -p configs/src/tsconfig.bin.json
node node_modules/typescript/bin/tsc --noEmit -p tmp/pass/scripts-ownership/tsconfig.tests.json
node_modules/oxlint/bin/oxlint --config .oxlintrc.json --deny-warnings src/core/constants.ts src/server/Materializer.ts src/server/types.ts tests/setupServer.ts tests/src/core/helpers.test.ts tests/src/core/compilers.test.ts tests/src/server/helpers.test.ts tests/src/server/Materializer.test.ts tests/src/bin/CLI.test.ts tests/distribution.test.ts
node_modules/oxfmt/bin/oxfmt --config .oxfmtrc.json --check src/core/constants.ts src/server/Materializer.ts src/server/types.ts guides/scaffold.md tests/setupServer.ts tests/src/core/helpers.test.ts tests/src/core/compilers.test.ts tests/src/server/helpers.test.ts tests/src/server/Materializer.test.ts tests/src/bin/CLI.test.ts tests/distribution.test.ts
git diff --check -- src/core/constants.ts src/server/Materializer.ts src/server/types.ts guides/scaffold.md tests/setupServer.ts tests/src/core/helpers.test.ts tests/src/core/compilers.test.ts tests/src/server/helpers.test.ts tests/src/server/Materializer.test.ts tests/src/bin/CLI.test.ts tests/distribution.test.ts
