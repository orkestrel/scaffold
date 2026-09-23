#!/usr/bin/env bash
# Runs the accordion proof on the validation copy with the accordion partial emptied (the cascade
# rebuilt first), restores the partial and checks it by its SHA-256 digest, rebuilds, and runs the
# same proof again as the green control. Logs: logs/empty-partial.log.txt, logs/green-control.log.txt.
# The STAGE variable names another validation copy in place of tmp/probe/base.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
HERE="$(cd "$(dirname "$0")" && pwd)"
BASE="${STAGE:-$HERE/../../probe/base}"
LOGS="$HERE/logs"
PARTIAL="$BASE/src/styles/components/_accordion.scss"
SAVED="$BASE/../_accordion.scss.saved"
cd "$BASE" || exit 2
digest="$(sha256sum "$PARTIAL" | cut -d' ' -f1)"
cp "$PARTIAL" "$SAVED"
: > "$PARTIAL"
{
	echo "partial digest before: $digest"
	echo "partial emptied: $(wc -c < "$PARTIAL") bytes"
	npm run build:src:styles > /dev/null 2>&1; echo "build:src:styles exit=$?"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/accordion.test.ts 2>&1
	echo "accordion proof exit=$?"
} > "$LOGS/empty-partial.log.txt"
cp "$SAVED" "$PARTIAL"
rm "$SAVED"
restored="$(sha256sum "$PARTIAL" | cut -d' ' -f1)"
{
	echo "partial digest restored: $restored (matches: $([ "$restored" = "$digest" ] && echo yes || echo no))"
	npm run build:src:styles > /dev/null 2>&1; echo "build:src:styles exit=$?"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/accordion.test.ts 2>&1
	echo "accordion proof exit=$?"
} > "$LOGS/green-control.log.txt"
grep -E "Tests |exit=|digest" "$LOGS/empty-partial.log.txt" "$LOGS/green-control.log.txt"
