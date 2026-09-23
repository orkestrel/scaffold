#!/usr/bin/env bash
# Applies each mutation to one owned source file, rebuilds the styles, runs the named proof, records
# the test summary, and restores the file from its copy, confirming the restore with cmp.
set -u
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
cd /home/user/veneer-bff
B=tmp/probe/bff-mutation-backup
mkdir -p "$B"
run() { # name file python-replacement-old python-replacement-new test-files...
	local name="$1" file="$2" old="$3" new="$4"; shift 4
	cp "$file" "$B/$(basename "$file")"
	python3 -c "import sys;p,o,n=sys.argv[1:4];s=open(p).read();assert s.count(o)==1,(p,o);open(p,'w').write(s.replace(o,n))" "$file" "$old" "$new"
	npm run build:src:styles >/dev/null 2>&1
	echo "== $name"
	if [ "$1" = "COMPILE" ]; then
		npm run build:src >/dev/null 2>&1
		node tmp/probe/bff-button-compile.mjs tmp/units/bff-baseline/index.css dist/src/styles/index.css | tail -4; echo "compile exit=${PIPESTATUS[0]}"
	else
		timeout 400 npx vitest run --config configs/src/vite.styles.config.ts --no-cache "$@" 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E "^ FAIL|AssertionError|Tests  " | head -8
	fi
	cp "$B/$(basename "$file")" "$file"
	cmp "$B/$(basename "$file")" "$file" && echo "restored $file"
}
C=tests/src/styles/components
run "remove the select's forced-ring include" src/styles/components/_form-select.scss $'\t\t@include forced-ring;\n' '' $C/form-select.test.ts
run "hoist the outline out of the media block" src/styles/_mixins.scss $'\t@include forced-colors {\n\t\toutline: $width solid $highlight;\n\t\t@content;\n\t}' $'\toutline: $width solid $highlight;\n\t@include forced-colors {\n\t\t@content;\n\t}' $C/form-control.test.ts
run "add outline: 0 to the validated text control's focus rule" src/styles/components/_validation.scss $'\t\t\tborder-color: var(--bs-form-#{$state}-border-color);\n\t\t\tbox-shadow: 0 0 0 var(--vn-focus-width) rgba(var(--bs-#{$role}-rgb), 0.25);\n\t\t}\n\n\t\t.was-validated textarea' $'\t\t\tborder-color: var(--bs-form-#{$state}-border-color);\n\t\t\toutline: 0;\n\t\t\tbox-shadow: 0 0 0 var(--vn-focus-width) rgba(var(--bs-#{$role}-rgb), 0.25);\n\t\t}\n\n\t\t.was-validated textarea' $C/validation.test.ts
run "revert the validated width to the 3rem literal" src/styles/components/_validation.scss 'width: calc(var(--vn-space-24) + calc(1.5em + 0.75rem));' 'width: calc(3rem + calc(1.5em + 0.75rem));' $C/validation.test.ts
run "emit the button's reset in a second media block" src/styles/_mixins.scss $'\t@include forced-ring($width, $highlight) {\n\t\tbox-shadow: $reset;\n\t}' $'\t@include forced-ring($width, $highlight);\n\t@include forced-colors {\n\t\tbox-shadow: $reset;\n\t}' COMPILE
run "remove the check's forced-ring include" src/styles/components/_form-check.scss $'\t\t@include forced-ring;\n' '' $C/form-check.test.ts
run "remove the range's forced-ring include" src/styles/components/_form-range.scss $'\t\t@include forced-ring;\n' '' $C/form-range.test.ts
run "remove the text control's forced-ring include" src/styles/components/_form-control.scss $'\t\t@include forced-ring;\n' '' $C/form-control.test.ts $C/validation.test.ts
npm run build:src >/dev/null 2>&1
echo "final rebuild exit=$?"
