#!/usr/bin/env bash
# Plants each control mutation in the mixin file, reads both compile instruments, and restores the
# file from its copy, confirming the restore with cmp.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd /home/user/veneer-bff
F=src/styles/_mixins.scss
B=tmp/probe/bff-mutation-backup/_mixins.scss.controls
plant() {
	cp "$F" "$B"
	python3 -c "import sys;p,o,n=sys.argv[1:4];s=open(p).read();assert s.count(o)==1,(p,o);open(p,'w').write(s.replace(o,n))" "$F" "$1" "$2"
	echo "== $3"
	npm run build:src >/dev/null 2>&1; echo "build exit=$?"
	node tmp/probe/bff-button-compile.mjs tmp/units/bff-baseline/index.css dist/src/styles/index.css | tail -1; echo "shipped compile exit=${PIPESTATUS[0]}"
	node tmp/probe/bff-button-expanded.mjs tmp/probe/bff-head . | tail -1; echo "expanded compile exit=${PIPESTATUS[0]}"
	cp "$B" "$F"; cmp "$B" "$F" && echo "restored $F"
}
plant $'\t@include forced-ring($width, $highlight) {\n\t\tbox-shadow: $reset;\n\t}' $'\t@include forced-ring($width, $highlight);\n\t@include forced-colors {\n\t\tbox-shadow: $reset;\n\t}' "emit the button's reset in a second media block"
plant $'\t\toutline: $width solid $highlight;\n\t\t@content;' $'\t\toutline: $width dashed $highlight;\n\t\t@content;' "draw the forced outline dashed"
npm run build:src >/dev/null 2>&1; echo "final rebuild exit=$?"
node tmp/probe/bff-button-compile.mjs tmp/units/bff-baseline/index.css dist/src/styles/index.css | tail -1; echo "shipped compile exit=${PIPESTATUS[0]}"
node tmp/probe/bff-button-expanded.mjs tmp/probe/bff-head . | tail -1; echo "expanded compile exit=${PIPESTATUS[0]}"
