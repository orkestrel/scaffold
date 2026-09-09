#!/usr/bin/env bash
set -euo pipefail

source ../scaffold/tmp/pass/pass-env.sh
set -x

npm run check:src:core
npm run test:src:core -- tests/src/core/helpers.test.ts
npm run test:src:core -- tests/src/core/Parity.test.ts
npm run test:guides
./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings src/core/helpers.ts src/core/Parity.ts tests/src/core/helpers.test.ts
./node_modules/.bin/oxfmt --config .oxfmtrc.json --check src/core/helpers.ts src/core/Parity.ts tests/src/core/helpers.test.ts guides/guide.md
git diff HEAD --check -- src/core/helpers.ts src/core/Parity.ts tests/src/core/helpers.test.ts guides/guide.md
