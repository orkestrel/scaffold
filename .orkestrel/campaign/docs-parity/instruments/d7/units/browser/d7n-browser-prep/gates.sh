#!/usr/bin/env bash
# d7n-browser-prep: converge with `format`, then read each acceptance gate.
set -uo pipefail
export PATH=/opt/npm11/bin:$PATH
cd /home/user/fleet/browser
for step in "$@"; do
	echo "-- $step"
	case "$step" in
	format) npm run format ;;
	format:check) npm run format:check ;;
	lint) npx oxlint --config .oxlintrc.json --deny-warnings . ;;
	check) npm run check ;;
	guides) npm run test:guides ;;
	policy) npm run test:policy ;;
	config) npm run test:config ;;
	docs) npm run docs ;;
	esac
	echo "EXIT $?"
done
