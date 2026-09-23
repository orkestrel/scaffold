#!/usr/bin/env bash
# Builds a fresh copy of e4e6a40 outside the worktree, lays the owned files over it, applies the
# shared patches, and runs the scoped gates, logging each exit.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
W=/home/user/veneer-upl
F=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/fresh
L=$W/tmp/probe/logs
rm -rf "$F"; mkdir -p "$F"
git -C "$W" archive e4e6a40 | tar -x -C "$F"
cp -al "$W/node_modules" "$F/node_modules"
for path in $(git -C "$W" status --porcelain | awk '{print $2}'); do
	mkdir -p "$F/$(dirname "$path")"; cp "$W/$path" "$F/$path"
done
cd "$F"
git apply --check "$W/tmp/units/upl-shared.patch"; echo "apply-check shared exit=$?"
git apply "$W/tmp/units/upl-shared.patch"; echo "apply shared exit=$?"
git apply --check "$W/tmp/units/upl-consumer.patch"; echo "apply-check consumer exit=$?"
git apply "$W/tmp/units/upl-consumer.patch"; echo "apply consumer exit=$?"
run() { local name=$1; shift; "$@" > "$L/fresh-$name.log.txt" 2>&1; local code=$?; echo "$name exit=$code :: $(grep -E 'Tests +[0-9]|All matched|Format issues|Found [0-9]+ warning' "$L/fresh-$name.log.txt" | sed 's/\x1b\[[0-9;]*m//g' | tail -1)"; }
run format npm run format:check
run lint npm run lint:check
run check npm run check
run build npm run build:src
run styles npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/sizing.test.ts tests/src/styles/utilities/position.test.ts tests/src/styles/utilities/visually-hidden.test.ts tests/src/styles/utilities/visibility.test.ts tests/src/styles/components/position.test.ts
run sections npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SizingSection.test.ts tests/app/browser/sections/PositionSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
run conformance npm run test:conformance
run service sh -c 'npm run build:src:styles && npm run test:service'
run guides npm run test:guides
run policy npm run test:policy
run setup npm run test:setup
