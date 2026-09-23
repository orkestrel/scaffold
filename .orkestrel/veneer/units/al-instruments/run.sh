#!/usr/bin/env bash
# Runs each partial mutation through the alert proof on the validation copy, then restores the partial.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
base=/home/user/veneer-al/tmp/probe/fresh
here=/home/user/veneer-al/tmp/probe/mutations
cd "$base"
for mutation in "$@"; do
	cp "$here/$mutation.scss" src/styles/components/_alert.scss
	npm run build:src:styles > "$here/$mutation.build.txt" 2>&1 || echo "$mutation build failed"
	npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/alert.test.ts > "$here/$mutation.log.txt" 2>&1
	echo "== $mutation exit=$?"
	grep -E "^\s+×" "$here/$mutation.log.txt" | sed 's/.*alert.test.ts:[0-9:]* > //'
	grep -E "Tests " "$here/$mutation.log.txt"
done
cp /home/user/veneer-al/src/styles/components/_alert.scss src/styles/components/_alert.scss
npm run build:src:styles > "$here/restore.build.txt" 2>&1
echo "restored exit=$?"
