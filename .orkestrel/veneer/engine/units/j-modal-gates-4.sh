#!/usr/bin/env bash
# J-MODAL landing acceptance chain (brief 4, item G), a copy of gates.sh with the guide re-pad before the format check; each exit code follows its output.
cd C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal || exit 1
run() {
	"$@"
	echo "EXIT $* -> $?"
}
run npm run check:src:browser
run npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
run npx oxfmt --config .oxfmtrc.json --write guides/veneer.md
run npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
run npm run test:src:browser
run npm run test:guides
run npm run test:policy
run npm run build:src:core
run npm run build:src:styles
run npm run build:src:browser
run npm run test:conformance
run npm run test:setup
