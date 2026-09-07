#!/usr/bin/env bash
# land.sh — the joint landing of D4, D5 (with its fix rounds), D6 (with its fix round), and D6b
# on scaffold's campaign branch, staged by path and never with `git add -A`. Log: land.log.txt
# beside this file. Run only after `d6-audit-verdict.md` and `d6b-audit-verdict.md` read PASS and
# the verifier's whole-suite gate is green. The campaign records under `.orkestrel/` are committed
# separately, before this script runs.
set -euo pipefail
cd /home/user/scaffold
PATHS=(
	.claude/rules/documentation.md
	.claude/rules/tests.md
	.claude/rules/workspace.md
	README.md
	guides/scaffold.md
	host.json
	package.json
	scripts/docs.ts
	src/core/Compiler.ts
	src/core/compilers.ts
	src/core/constants.ts
	src/core/errors.ts
	src/core/factories.ts
	src/core/helpers.ts
	src/core/templates.ts
	src/core/types.ts
	src/server/Materializer.ts
	src/server/Upstream.ts
	src/server/helpers.ts
	tests/distribution.test.ts
	tests/guides.test.ts
	tests/setupServer.ts
	tests/src/core/Compiler.test.ts
	tests/src/core/compilers.test.ts
	tests/src/core/helpers.test.ts
	tests/src/core/templates.test.ts
	tests/src/server/helpers.test.ts
	tsconfig.json
)
echo "== status before =="
git status --short | grep -v "\.orkestrel/" || true
for path in "${PATHS[@]}"; do
	if [ -e "$path" ]; then git add -- "$path"; fi
done
echo "== staged =="
git diff --cached --stat
LEFT=$(git status --short | grep -v "\.orkestrel/" | grep -v "^[MA]  " || true)
if [ -n "$LEFT" ]; then
	echo "REFUSED: unstaged tree paths remain:"
	echo "$LEFT"
	exit 1
fi
git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$(dirname "$0")/land-message.txt"
git log --oneline -1
