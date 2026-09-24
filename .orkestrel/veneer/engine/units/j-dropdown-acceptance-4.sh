#!/usr/bin/env bash
# J-DROPDOWN round-4 landing chain (a copy of acceptance-3.sh writing to acceptance-4, with the guide re-padded first): runs each acceptance command in the worktree and records its exit code
# beside its output under tmp/j-dropdown/acceptance/.
cd C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown || exit 1
out=tmp/j-dropdown/acceptance-4
mkdir -p "$out"
step() {
	name=$1
	shift
	"$@" > "$out/$name.log.txt" 2>&1
	echo "exit=$?" >> "$out/$name.log.txt"
	tail -1 "$out/$name.log.txt" | sed "s/^/$name /"
}
step check npm run check:src:browser
step lint npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
step format-write npx oxfmt --config .oxfmtrc.json --write guides/veneer.md
step format npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
step browser npm run test:src:browser
step guides npm run test:guides
step policy npm run test:policy
step build-core npm run build:src:core
step build-styles npm run build:src:styles
step build-browser npm run build:src:browser
step conformance npm run test:conformance
step setup npm run test:setup
