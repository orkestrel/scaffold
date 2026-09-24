#!/usr/bin/env bash
# Runs the THEME unit's mutation runs on the final scratch copy tmp/probe/ct-copy (owned files,
# ct-shared.patch, and ct-unscoped.patch after the brief-2 row), which supersedes ct-mutations.sh: it
# adds the M8 V13 mutation and keeps one control log per command. ct-mutations-round-1.log.txt holds
# the first run of ct-mutations.sh, against the files before the brief-2 row. Each run saves the
# mutated file, applies one edit through ct-mutate.py, rebuilds where the run reads the built cascade,
# runs one command, restores the file, checks the restored digest, and logs to ct-mutations.log.txt.
set -u
ROOT=/home/user/veneer-ct
COPY=$ROOT/tmp/probe/ct-copy
OUT=$ROOT/tmp/units
LOG=$OUT/ct-mutations.log.txt
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd "$COPY" || exit 2
: > "$LOG"
STYLES='npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose'
APP='npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser'

record() {
	# $1 id, $2 file, $3 build (yes/no), $4 command
	local id=$1 file=$2 build=$3 command=$4
	local saved=$OUT/ct-mutation-$id.orig
	cp "$file" "$saved"
	local before
	before=$(sha256sum "$file" | cut -d' ' -f1)
	python3 "$OUT/ct-mutate.py" "$id" "$file" || { echo "mutation $id did not apply" >> "$LOG"; cp "$saved" "$file"; return; }
	{
		echo "=== $id"
		echo "site: $file"
		diff -u "$saved" "$file" | sed '1,2d'
	} >> "$LOG"
	local build_exit=skipped
	if [ "$build" = yes ]; then
		npm run build:src > "$OUT/ct-mutation-$id-build.log.txt" 2>&1
		build_exit=$?
	fi
	bash -c "$command" > "$OUT/ct-mutation-$id.log.txt" 2>&1
	local test_exit=$?
	cp "$saved" "$file"
	local after
	after=$(sha256sum "$file" | cut -d' ' -f1)
	rm "$saved"
	{
		echo "command: $command"
		echo "build exit: $build_exit"
		echo "test exit: $test_exit"
		echo "summary: $(sed 's/\x1b\[[0-9;]*m//g' "$OUT/ct-mutation-$id.log.txt" | grep -E '^ +Tests ' | tail -1 | sed 's/^ *//')"
		echo "failing:"
		sed 's/\x1b\[[0-9;]*m//g' "$OUT/ct-mutation-$id.log.txt" | grep -E '^ +(×|FAIL) ' | sed 's/^ *//' | sort -u
		echo "restored: $([ "$before" = "$after" ] && echo identical || echo DIFFERENT)"
		echo
	} >> "$LOG"
}

record M1-secondary src/styles/_tokens.scss yes "$STYLES tests/src/styles/theme.test.ts"
record M3-dark-hover src/styles/_tokens.scss yes "$STYLES tests/src/styles/theme.test.ts"
record M4-light-hover src/styles/_tokens.scss yes "$STYLES tests/src/styles/theme.test.ts"
record M5-dark-redeclares src/styles/_theme.scss yes "$STYLES tests/src/styles/theme.test.ts"
record M6-registry-rule tests/setupServer.ts no 'npm run test:setup'
record M7-theme-withheld guides/veneer.md yes 'npm run test:conformance'
record M8-dark-tiers-mixed src/styles/_tokens.scss yes "$STYLES tests/src/styles/theme.test.ts"
record S1-dark-attribute app/browser/constants.ts no "$APP tests/app/browser/sections/ColorModeSection.test.ts"
record S2-nested-attribute app/browser/constants.ts no "$APP tests/app/browser/sections/ColorModeSection.test.ts"
record S3-control-dropped app/browser/constants.ts no "$APP tests/app/browser/sections/ColorModeSection.test.ts"
record S4-section-unexported app/browser/index.ts no "$APP tests/app/browser/sections/ColorModeSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts"
# The control: every file restored, the same commands green.
npm run build:src > "$OUT/ct-mutation-control-build.log.txt" 2>&1
echo "=== control: build exit $?" >> "$LOG"
n=0
for command in "$STYLES tests/src/styles/theme.test.ts" 'npm run test:setup' 'npm run test:conformance' "$APP tests/app/browser/sections/ColorModeSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts"; do
	n=$((n + 1)); bash -c "$command" > "$OUT/ct-mutation-control-$n.log.txt" 2>&1
	code=$?
	echo "control: $command -> exit $code, $(sed 's/\x1b\[[0-9;]*m//g' "$OUT/ct-mutation-control-$n.log.txt" | grep -E '^ +Tests ' | tail -1 | sed 's/^ *//')" >> "$LOG"
done
