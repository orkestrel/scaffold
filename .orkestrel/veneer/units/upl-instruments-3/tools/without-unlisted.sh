#!/usr/bin/env bash
# Runs the setup-browser project in the fresh copy with the shared patch applied and the unlisted
# patch reversed, then applies the unlisted patch again.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
W=/home/user/veneer-upl
cd "$W/tmp/probe/fresh"
git apply -R "$W/tmp/units/upl-unlisted-3.patch"; echo "reverse unlisted exit=$?"
npm run test:setup:browser > "$W/tmp/units/upl-instruments-3/logs/setup-browser-without-unlisted.log.txt" 2>&1
echo "test:setup:browser exit=$? :: $(sed 's/\x1b\[[0-9;]*m//g' "$W/tmp/units/upl-instruments-3/logs/setup-browser-without-unlisted.log.txt" | grep -E 'Tests +[0-9]' | tail -1)"
sed 's/\x1b\[[0-9;]*m//g' "$W/tmp/units/upl-instruments-3/logs/setup-browser-without-unlisted.log.txt" | grep -E '^ FAIL' | sort -u
git apply "$W/tmp/units/upl-unlisted-3.patch"; echo "reapply unlisted exit=$?"
