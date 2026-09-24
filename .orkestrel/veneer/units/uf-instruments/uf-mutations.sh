#!/usr/bin/env bash
# UTIL-FONT mutation instrument. Runs against the validation copy at tmp/probe/base (git archive
# 2a3f223, node_modules hard-linked, the owned files copied over it, uf-shared.patch applied).
# Each cascade mutation edits the built dist/src/styles/index.css, runs the font proof, logs the
# mutated site, the command, the exits, the summary line, and the failing case names, then restores
# the pristine build. The source mutations edit one source file, run the named gate, and restore it.
# Output: tmp/units/uf-mutations.log.txt.
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
ROOT=/home/user/veneer-uf
BASE=$ROOT/tmp/probe/base
WORK=$ROOT/tmp/probe/work
LOG=$ROOT/tmp/units/uf-mutations.log.txt
CSS=dist/src/styles/index.css
PROOF='npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=json --outputFile=RESULT tests/src/styles/utilities/font.test.ts'
mkdir -p "$WORK"
cd "$BASE" || exit 1
cat > "$WORK/replace.py" <<'PY'
# Replaces each OLD with NEW in the file, refusing an OLD the file does not carry.
import sys
path, pairs = sys.argv[1], sys.argv[2:]
text = open(path).read()
for index in range(0, len(pairs), 2):
    old, new = pairs[index], pairs[index + 1]
    if old not in text:
        sys.exit(f'absent: {old}')
    text = text.replace(old, new)
open(path, 'w').write(text)
PY
cat > "$WORK/summary.py" <<'PY'
# Prints the summary line and every failing case name of one vitest JSON result.
import json, sys
data = json.load(open(sys.argv[1]))
print(f"summary: {data['numFailedTests']} failed | {data['numPassedTests']} passed ({data['numTotalTests']})")
for suite in data['testResults']:
    for case in suite['assertionResults']:
        if case['status'] == 'failed':
            print(f"  red: {case['fullName']}")
PY
: > "$LOG"
echo "# UTIL-FONT mutation log, $(date -u +%Y-%m-%dT%H:%M:%SZ), copy $BASE" >> "$LOG"
npm run build:src > "$WORK/build.log.txt" 2>&1
echo "pristine build: npm run build:src exit=$?" >> "$LOG"
cp "$CSS" "$WORK/pristine.css"
mutate() {
	local name="$1" site="$2"; shift 2
	cp "$WORK/pristine.css" "$CSS"
	{
		echo
		echo "## $name"
		echo "site: $site"
		echo "edit: $CSS (built cascade; no rebuild, the proof loads this file)"
	} >> "$LOG"
	python3 "$WORK/replace.py" "$CSS" "$@" >> "$LOG" 2>&1 || echo "edit failed" >> "$LOG"
	local result="$WORK/$name.json"
	echo "command: ${PROOF/RESULT/$result}" >> "$LOG"
	${PROOF/RESULT/$result} > /dev/null 2>&1
	echo "test exit=$?" >> "$LOG"
	python3 "$WORK/summary.py" "$result" >> "$LOG"
	cp "$WORK/pristine.css" "$CSS"
}
mutate control 'none' '.fs-1{' '.fs-1{'
mutate fluid '.fs-1 to .fs-4 written as the release fluid calc()' \
	'.fs-1{font-size:var(--vn-size-8)!important}' '.fs-1{font-size:calc(1.375rem + 1.5vw)!important}' \
	'.fs-2{font-size:var(--vn-size-7)!important}' '.fs-2{font-size:calc(1.325rem + .9vw)!important}' \
	'.fs-3{font-size:var(--vn-size-6)!important}' '.fs-3{font-size:calc(1.3rem + .6vw)!important}' \
	'.fs-4{font-size:var(--vn-size-5)!important}' '.fs-4{font-size:calc(1.275rem + .3vw)!important}'
mutate literal '.fs-1 to .fs-6 written as the release capped literals' \
	'.fs-1{font-size:var(--vn-size-8)!important}' '.fs-1{font-size:2.5rem!important}' \
	'.fs-2{font-size:var(--vn-size-7)!important}' '.fs-2{font-size:2rem!important}' \
	'.fs-3{font-size:var(--vn-size-6)!important}' '.fs-3{font-size:1.75rem!important}' \
	'.fs-4{font-size:var(--vn-size-5)!important}' '.fs-4{font-size:1.5rem!important}' \
	'.fs-5{font-size:var(--vn-size-4)!important}' '.fs-5{font-size:1.25rem!important}' \
	'.fs-6{font-size:var(--vn-size-3)!important}' '.fs-6{font-size:1rem!important}'
mutate fs6literal '.fs-6 written as the release literal 1rem' \
	'.fs-6{font-size:var(--vn-size-3)!important}' '.fs-6{font-size:1rem!important}'
mutate cap 'the release (min-width:1200px) cap block added after the font rules' \
	'.lh-lg{line-height:2!important}' '.lh-lg{line-height:2!important}@media (min-width:1200px){.fs-1{font-size:2.5rem!important}.fs-2{font-size:2rem!important}.fs-3{font-size:1.75rem!important}.fs-4{font-size:1.5rem!important}}'
mutate lhliteral '.lh-base written as the literal 1.5' \
	'.lh-base{line-height:var(--vn-line-body)!important}' '.lh-base{line-height:1.5!important}'
mutate lhsm '.lh-sm written as 1.2' '.lh-sm{line-height:1.25!important}' '.lh-sm{line-height:1.2!important}'
mutate monotoken '.font-monospace written as var(--vn-font-mono-base)' \
	'.font-monospace{font-family:var(--bs-font-monospace)!important}' '.font-monospace{font-family:var(--vn-font-mono-base)!important}'
mutate monoliteral '.font-monospace written as the literal monospace' \
	'.font-monospace{font-family:var(--bs-font-monospace)!important}' '.font-monospace{font-family:monospace!important}'
mutate lighter100 '.fw-lighter written as 100' '.fw-lighter{font-weight:lighter!important}' '.fw-lighter{font-weight:100!important}'
mutate bolder700 '.fw-bolder written as 700' '.fw-bolder{font-weight:bolder!important}' '.fw-bolder{font-weight:700!important}'
mutate normalmissing '.fw-normal renamed away' '.fw-normal{font-weight:400!important}' '.fw-normalx{font-weight:400!important}'
mutate italicmissing '.fst-italic renamed away' '.fst-italic{font-style:italic!important}' '.fst-italicx{font-style:italic!important}'
drop=()
for rule in '.font-monospace{font-family:var(--bs-font-monospace)' '.fs-1{font-size:var(--vn-size-8)' '.fs-2{font-size:var(--vn-size-7)' '.fs-3{font-size:var(--vn-size-6)' '.fs-4{font-size:var(--vn-size-5)' '.fs-5{font-size:var(--vn-size-4)' '.fs-6{font-size:var(--vn-size-3)' '.fst-italic{font-style:italic' '.fst-normal{font-style:normal' '.fw-lighter{font-weight:lighter' '.fw-light{font-weight:300' '.fw-normal{font-weight:400' '.fw-medium{font-weight:500' '.fw-semibold{font-weight:600' '.fw-bold{font-weight:700' '.fw-bolder{font-weight:bolder' '.lh-1{line-height:1' '.lh-sm{line-height:1.25' '.lh-base{line-height:var(--vn-line-body)' '.lh-lg{line-height:2'; do
	drop+=("$rule!important}" "$rule}")
done
mutate normal '!important dropped on every font rule' "${drop[@]}"
mutate reorder 'the first and last rule of the fs, fst, fw (light and bold), and lh entries swapped in place' \
	'.fw-light{font-weight:300!important}' '' \
	'.fw-bold{font-weight:700!important}' '.fw-bold{font-weight:700!important}.fw-light{font-weight:300!important}' \
	'.fs-1{font-size:var(--vn-size-8)!important}' '' \
	'.fs-6{font-size:var(--vn-size-3)!important}' '.fs-6{font-size:var(--vn-size-3)!important}.fs-1{font-size:var(--vn-size-8)!important}' \
	'.fst-italic{font-style:italic!important}' '' \
	'.fst-normal{font-style:normal!important}' '.fst-normal{font-style:normal!important}.fst-italic{font-style:italic!important}' \
	'.lh-1{line-height:1!important}' '' \
	'.lh-lg{line-height:2!important}' '.lh-lg{line-height:2!important}.lh-1{line-height:1!important}'
python3 - "$WORK/pristine.css" "$WORK/unlayered.css" "$WORK/elements.css" <<'PY'
# Writes two relocated cascades: the size and base line-height rules moved out of every layer, still
# important; and the rules the heading case reads moved into an elements-layer block at normal priority.
import sys
pristine = open(sys.argv[1]).read()
text = pristine
for rule in ['.fs-3{font-size:var(--vn-size-6)!important}', '.lh-base{line-height:var(--vn-line-body)!important}']:
    assert text.count(rule) == 1
    text = text.replace(rule, '', 1) + rule
open(sys.argv[2], 'w').write(text)
text = pristine
moved = ''
for rule in ['.fs-6{font-size:var(--vn-size-3)!important}', '.fw-light{font-weight:300!important}', '.lh-sm{line-height:1.25!important}', '.fw-bold{font-weight:700!important}', '.fs-2{font-size:var(--vn-size-7)!important}']:
    assert text.count(rule) == 1
    text = text.replace(rule, '')
    moved += rule.replace('!important', '')
open(sys.argv[3], 'w').write(text + '@layer elements{' + moved + '}')
PY
relocate() {
	local name="$1" site="$2" source="$3"
	{
		echo
		echo "## $name"
		echo "site: $site"
		echo "edit: $CSS replaced by $source"
	} >> "$LOG"
	cp "$source" "$CSS"
	local result="$WORK/$name.json"
	echo "command: ${PROOF/RESULT/$result}" >> "$LOG"
	${PROOF/RESULT/$result} > /dev/null 2>&1
	echo "test exit=$?" >> "$LOG"
	python3 "$WORK/summary.py" "$result" >> "$LOG"
	cp "$WORK/pristine.css" "$CSS"
}
relocate unlayered '.fs-3 and .lh-base rules moved out of every layer, still important' "$WORK/unlayered.css"
relocate elementslayer '.fs-6, .fw-light, .lh-sm, .fw-bold, .fs-2 moved to an elements-layer block at normal priority' "$WORK/elements.css"
mutate moderule 'a [data-bs-theme=dark] .fw-semibold rule added' \
	'.fs-3{font-size:var(--vn-size-6)!important}' '.fs-3{font-size:var(--vn-size-6)!important}[data-bs-theme=dark] .fw-semibold{font-weight:800!important}'
mutate density '.lh-lg written as calc(2 * var(--vn-factor-density))' \
	'.lh-lg{line-height:2!important}' '.lh-lg{line-height:calc(2 * var(--vn-factor-density))!important}'
mutate infixed 'an (min-width:768px) .fw-md-bold rule added' \
	'.lh-lg{line-height:2!important}' '.lh-lg{line-height:2!important}@media (min-width:768px){.fw-md-bold{font-weight:700!important}}'
mutate infixedsample 'an (min-width:768px) .fw-md-semibold rule added, the infixed class the reading case mounts' \
	'.lh-lg{line-height:2!important}' '.lh-lg{line-height:2!important}@media (min-width:768px){.fw-md-semibold{font-weight:700!important}}'
cmp -s "$WORK/pristine.css" "$CSS" && echo $'\npristine cascade restored: yes' >> "$LOG" || echo $'\npristine cascade restored: NO' >> "$LOG"

# Source mutations: each edits one source file, runs its gate, and restores the file.
source_mutation() {
	local name="$1" file="$2" site="$3" gate="$4"; shift 4
	{
		echo
		echo "## $name"
		echo "site: $site"
		echo "edit: $file"
	} >> "$LOG"
	cp "$file" "$WORK/$name.keep"
	python3 "$WORK/replace.py" "$file" "$@" >> "$LOG" 2>&1 || echo "edit failed" >> "$LOG"
	echo "command: $gate" >> "$LOG"
	bash -c "$gate" > "$WORK/$name.log.txt" 2>&1
	echo "exit=$?" >> "$LOG"
	grep -E "Tests +[0-9]|✓ built|error during build| FAIL " "$WORK/$name.log.txt" | sed 's/^/  /' >> "$LOG"
	cp "$WORK/$name.keep" "$file"
}
source_mutation absent src/styles/index.scss "the @use 'utilities/font' line removed" \
	"npm run build:src:styles && ${PROOF/--reporter=json --outputFile=RESULT/--reporter=verbose}" \
	"@use 'utilities/font';"$'\n' ''
npm run build:src:styles > "$WORK/rebuild.log.txt" 2>&1
cmp -s "$WORK/pristine.css" "$CSS" && echo "rebuilt cascade equals the pristine build: yes" >> "$LOG" || echo "rebuilt cascade equals the pristine build: NO" >> "$LOG"
source_mutation section app/browser/constants.ts 'the five font specimens removed from TYPE_SPECIMENS' \
	'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/TypeSection.test.ts' \
	"$(python3 -c "
t=open('app/browser/constants.ts').read()
s=t.index(\"\tObject.freeze({\n\t\tname: 'Font sizes',\")
e=t.index('])', s)
print(t[s:e], end='')
")" ''
source_mutation ledger guides/veneer.md 'the #### fs and #### lh tables removed' 'npm run test:conformance' \
	"$(python3 -c "
t=open('guides/veneer.md').read()
s=t.index('#### \`fs\`\n'); e=t.index('#### ', s+5)
print(t[s:e], end='')
")" '' \
	"$(python3 -c "
t=open('guides/veneer.md').read()
s=t.index('#### \`lh\`\n'); e=t.index('#### ', s+5)
print(t[s:e], end='')
")" ''
source_mutation tablevalue tests/setupStyles.ts "the LINE_HEIGHT_CASES sm value written as '1.2'" \
	'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t "font entry"' \
	"Object.freeze({ key: 'sm', value: '1.25' })" "Object.freeze({ key: 'sm', value: '1.2' })"
source_mutation entryrow tests/setupStyles.ts 'the FONT_ENTRY_CASES fst row removed' \
	'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t "font entry"' \
	"	Object.freeze({ prefix: 'fst', property: 'font-style', name: 'fst-italic' }),"$'\n' ''
source_mutation entryproperty tests/setupStyles.ts "the FONT_ENTRY_CASES lh row's property written as font-size" \
	'npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t "font entry"' \
	"prefix: 'lh', property: 'line-height'" "prefix: 'lh', property: 'font-size'"
# The Tailwind negative control writes one shipped name onto every copy of the exclusion line.
{
	echo
	echo "## tailwind-line"
	echo "site: fw-bold written onto the exclusion line in tests/setup.css, tests/fixtures/tailwind/consumer.css, tests/fixtures/tailwind/preflight.css, and the guide fence"
} >> "$LOG"
for file in tests/setup.css tests/fixtures/tailwind/consumer.css tests/fixtures/tailwind/preflight.css guides/veneer.md; do
	cp "$file" "$WORK/$(basename "$file").keep"
	sed -i 's/ start-100");/ start-100 fw-bold");/' "$file"
done
echo "command: npm run build:src:styles && npm run test:service" >> "$LOG"
(npm run build:src:styles && npm run test:service) > "$WORK/tailwind-line.log.txt" 2>&1
echo "exit=$?" >> "$LOG"
grep -E "Tests +[0-9]| FAIL " "$WORK/tailwind-line.log.txt" | sed 's/^/  /' >> "$LOG"
for file in tests/setup.css tests/fixtures/tailwind/consumer.css tests/fixtures/tailwind/preflight.css guides/veneer.md; do
	cp "$WORK/$(basename "$file").keep" "$file"
done
echo "exclusion line restored: $(grep -c 'fw-bold")' tests/setup.css tests/fixtures/tailwind/consumer.css tests/fixtures/tailwind/preflight.css guides/veneer.md | tr '\n' ' ')" >> "$LOG"
echo $'\n# end' >> "$LOG"
