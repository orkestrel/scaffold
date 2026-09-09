#!/usr/bin/env bash
set -u
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$SCAFFOLD"

run() {
	name="$1"
	shift
	set +e
	"$@" 2>&1 | tee "tmp/pass/scaffold-parity-population-adopt/${name}.log.txt"
	status="${PIPESTATUS[0]}"
	set -e
	printf '%s\n' "$status" > "tmp/pass/scaffold-parity-population-adopt/${name}.exit.txt"
	return "$status"
}

run guides npm run test:guides
run entry node node_modules/vitest/vitest.mjs run tests/src/core/compilers.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t 'the guides entry'
run classifier node node_modules/vitest/vitest.mjs run tests/src/core/templates.test.ts --config vite.config.ts --no-cache --reporter=dot --project src:core -t 'emitted distribution classifier'
run typecheck node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json
run lint node node_modules/oxlint/bin/oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts tests/setupServer.ts tests/src/core/templates.test.ts tests/src/core/compilers.test.ts
run format node node_modules/oxfmt/bin/oxfmt --config .oxfmtrc.json --check tests/guides.test.ts tests/setupServer.ts tests/src/core/templates.test.ts tests/src/core/compilers.test.ts
