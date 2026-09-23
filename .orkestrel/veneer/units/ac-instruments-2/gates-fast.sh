#!/usr/bin/env bash
# Runs the cheap gates in the validation copy (tmp/probe/base) and reports each exit.
# Round 2: supersedes ac-instruments/gates-fast.sh; logs go to logs/base-<gate>.log.txt, an
# intermediate reading that gates-final.sh supersedes.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE/../../probe/base" || exit 2
for gate in format:check lint:check check build:src; do
	npm run "$gate" > "$HERE/logs/base-${gate/:/-}.log.txt" 2>&1
	echo "$gate exit=$?"
done
