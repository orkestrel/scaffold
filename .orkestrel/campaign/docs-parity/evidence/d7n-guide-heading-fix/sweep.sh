#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/guide
set -o pipefail
exec > >(tee tmp/d7n-guide-heading-fix/sweep.log.txt) 2>&1
git diff --unified=0 -- src/core/helpers.ts src/core/types.ts tests/setup.ts tests/src/core/helpers.test.ts tests/src/core/Guide.test.ts guides/guide.md > tmp/d7n-guide-heading-fix/sweep.diff.txt
status=0
if rg -n $'\uFFFD' src/core/helpers.ts src/core/types.ts tests/setup.ts tests/src/core/helpers.test.ts tests/src/core/Guide.test.ts guides/guide.md; then
	printf 'replacement-character=found\n'
	status=1
else
	printf 'replacement-character=none\n'
fi
if rg -n '^\+.*(@ts-nocheck|@ts-ignore|@ts-expect-error|eslint-disable|\.skip\(|\.todo\()' tmp/d7n-guide-heading-fix/sweep.diff.txt; then
	printf 'forbidden-addition=found\n'
	status=1
else
	printf 'forbidden-addition=none\n'
fi
if rg -n '^\+\s*(export\s+)?function\s+' tmp/d7n-guide-heading-fix/sweep.diff.txt; then
	printf 'new-function=found\n'
	status=1
else
	printf 'new-function=none\n'
fi
printf 'exit=%s\n' "$status"
exit "$status"
