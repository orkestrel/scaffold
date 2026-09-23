#!/usr/bin/env bash
# Runs the cheap gates in the validation copy and reports each exit.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd "$(dirname "$0")/../base" || exit 2
for gate in format:check lint:check check build:src; do
	npm run "$gate" > "../instruments/$gate.log.txt" 2>&1
	echo "$gate exit=$?"
done
