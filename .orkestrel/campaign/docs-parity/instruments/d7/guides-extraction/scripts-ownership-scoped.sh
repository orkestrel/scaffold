#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"
exec > >(tee tmp/pass/scripts-ownership/scoped.log.txt) 2>&1
node node_modules/vitest/vitest.mjs run tests/src/server/Materializer.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server
node node_modules/vitest/vitest.mjs run tests/src/core/helpers.test.ts tests/src/core/compilers.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t 'matchesOrchestrationPath|isCanonPath|selectHostPaths|plans the catalog file inside the canon and none of the moved wiring|runs the package-owned guides proof only when selected'
node node_modules/vitest/vitest.mjs run tests/src/server/helpers.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:server -t 'matchesExecutablePath|vendored imports|stages the canon beside the vendored set from this checkout'
node node_modules/vitest/vitest.mjs run tests/src/bin/CLI.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:bin -t 'deletes tracked unplanned scripts without deleting untracked files'
node node_modules/vitest/vitest.mjs run tests/distribution.test.ts --config vite.config.ts --no-cache --reporter=dot --project distribution -t 'stages exactly the declared vendored host inventory'
