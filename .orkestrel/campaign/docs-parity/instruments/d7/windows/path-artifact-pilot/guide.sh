#!/usr/bin/env bash
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
set -euo pipefail

PILOT="$SCR/path-artifact-pilot"
GUIDE="/c/Users/mikes/WebstormProjects/guide"
HOST="$PILOT/node_modules/@orkestrel/scaffold/dist/host"
HEAD="1d5afa3c637ea280c54649d8661856de05f22eaf"
BRANCH="claude/orkestrel-npm-audit-deps-14ibta"
CASE="loads every configured policy rule through the real binary"

if [[ ! -f "$HOST/manifest.json" || ! -f "$HOST/tests/setupPolicy.ts" || ! -f "$HOST/tests/config.test.ts" ]]; then
	echo "Installed scaffold host is incomplete: $HOST" >&2
	exit 1
fi

printf '%s  %s\n' "60f6f1612933be6c5eb022e803e0b0fdf0d50452de8307d2688a3b832df0cf78" "$HOST/manifest.json" | sha256sum --check --status
printf '%s  %s\n' "ebe2777780193eed9d8d0641d6326535a6b5084d88aee0b6361d0b2409281ded" "$HOST/tests/setupPolicy.ts" | sha256sum --check --status
printf '%s  %s\n' "b880877803d909f83bc2ba4110d795cfecf620402696272e967bb55b90b66578" "$HOST/tests/config.test.ts" | sha256sum --check --status

if [[ "$(git -C "$GUIDE" rev-parse HEAD)" != "$HEAD" ]]; then
	echo "Guide HEAD does not match the required candidate." >&2
	exit 1
fi

if [[ "$(git -C "$GUIDE" branch --show-current)" != "$BRANCH" ]]; then
	echo "Guide branch does not match the campaign branch." >&2
	exit 1
fi

EVIDENCE="$(mktemp -d "$SCR/guide-path-bootstrap.XXXXXX")"
REPAIR="$EVIDENCE/repair"
printf '%s\n' "$EVIDENCE"
git -C "$GUIDE" status --short > "$EVIDENCE/status-before.txt"
git -C "$GUIDE" diff --binary > "$EVIDENCE/diff-before.txt"

set +e
(
	cd "$GUIDE"
	npm run test:config -- tests/config.test.ts -t "$CASE" > "$EVIDENCE/baseline.stdout.txt" 2> "$EVIDENCE/baseline.stderr.txt"
)
BASELINE=$?
set -e
printf '%s\n' "$BASELINE" > "$EVIDENCE/baseline.exit.txt"

set +e
node "$PILOT/guide.mjs" "$GUIDE" "$REPAIR" > "$EVIDENCE/repair.stdout.txt" 2> "$EVIDENCE/repair.stderr.txt"
REPAIR_STATUS=$?
set -e
printf '%s\n' "$REPAIR_STATUS" > "$EVIDENCE/repair.exit.txt"

if [[ "$REPAIR_STATUS" -ne 0 ]]; then
	git -C "$GUIDE" status --short > "$EVIDENCE/status-after.txt"
	git -C "$GUIDE" diff --binary > "$EVIDENCE/diff-after.txt"
	printf '%s\n' "$EVIDENCE/repair.stdout.txt"
	printf '%s\n' "$EVIDENCE/repair.stderr.txt"
	printf '%s\n' "$EVIDENCE/repair.exit.txt"
	printf '%s\n' "$EVIDENCE/status-after.txt"
	printf '%s\n' "$EVIDENCE/diff-after.txt"
	exit "$REPAIR_STATUS"
fi

set +e
(
	cd "$GUIDE"
	npm run test:config -- tests/config.test.ts -t "$CASE" > "$EVIDENCE/final.stdout.txt" 2> "$EVIDENCE/final.stderr.txt"
)
FINAL=$?
set -e
printf '%s\n' "$FINAL" > "$EVIDENCE/final.exit.txt"
git -C "$GUIDE" status --short > "$EVIDENCE/status-after.txt"
git -C "$GUIDE" diff --binary > "$EVIDENCE/diff-after.txt"

printf '%s\n' "$EVIDENCE/status-before.txt"
printf '%s\n' "$EVIDENCE/diff-before.txt"
printf '%s\n' "$EVIDENCE/baseline.exit.txt"
printf '%s\n' "$EVIDENCE/repair.stdout.txt"
printf '%s\n' "$EVIDENCE/repair.stderr.txt"
printf '%s\n' "$EVIDENCE/repair.exit.txt"
printf '%s\n' "$EVIDENCE/final.exit.txt"
printf '%s\n' "$EVIDENCE/status-after.txt"
printf '%s\n' "$EVIDENCE/diff-after.txt"
exit "$FINAL"
