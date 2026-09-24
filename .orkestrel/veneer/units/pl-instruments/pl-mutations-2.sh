#!/usr/bin/env bash
# PREFLIGHT-HOST (pl) round 2 mutation runs; supersedes pl-mutations.sh. Run pl-scratch-2.sh first.
# Each mutation edits the scratch copy under tmp/probe/pl-scratch (tracked files plus
# pl-shared-2.patch), runs the named scoped command there, logs the site, command, build exit, test
# exit, summary line, failing cases, and messages, and restores the scratch file.
set -u
W=/home/user/veneer-pl
S=$W/tmp/probe/pl-scratch
LOG=$W/tmp/units/pl-mutations-2.log.txt
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
SERVICE="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project service tests/service/tailwind/preflight.test.ts"
SETUP="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts"
: > "$LOG"

restore() {
	for f in tests/setupStyles.ts tests/setupStyles.test.ts tests/service/tailwind/preflight.test.ts src/styles/elements/_ul.scss; do cp "$W/$f" "$S/$f"; done
	cp "$W/tmp/probe/pl-guide-patched-2.md" "$S/guides/veneer.md"
}

# run NAME SITE BUILD(yes|no) COMMAND PYTHON-MUTATION
run() {
	local name=$1 site=$2 build=$3 command=$4 mutation=$5
	restore
	(cd "$S" && python3 -c "$mutation") >> "$LOG" 2>&1
	local mexit=$?
	{ echo "=== $name"; echo "site: $site"; echo "mutation applied exit: $mexit"; } >> "$LOG"
	local bexit="not run"
	if [ "$build" = yes ]; then
		(cd "$S" && npm run build:src:styles > "$W/tmp/units/pl-mutation-build-2.log.txt" 2>&1)
		bexit=$?
	fi
	echo "build exit: $bexit" >> "$LOG"
	echo "command: (cd tmp/probe/pl-scratch && $command)" >> "$LOG"
	(cd "$S" && eval "$command" > "$W/tmp/units/pl-mutation-run-2.log.txt" 2>&1)
	local texit=$?
	echo "test exit: $texit" >> "$LOG"
	grep -E "^\s+Tests " "$W/tmp/units/pl-mutation-run-2.log.txt" | sed 's/^/summary: /' >> "$LOG"
	grep -E "^ FAIL " "$W/tmp/units/pl-mutation-run-2.log.txt" | sed 's/^/failing: /' >> "$LOG"
	grep -E "^(AssertionError|Error|TypeError).*" "$W/tmp/units/pl-mutation-run-2.log.txt" | head -4 | sed 's/^/message: /' >> "$LOG"
	grep -E '^\+   "' "$W/tmp/units/pl-mutation-run-2.log.txt" | head -6 | sed 's/^/received: /' >> "$LOG"
	if [ "$build" = yes ]; then
		restore
		(cd "$S" && npm run build:src:styles > "$W/tmp/units/pl-mutation-build-2.log.txt" 2>&1)
		echo "restore build exit: $?" >> "$LOG"
	fi
	echo >> "$LOG"
}

PROFILE="const preflightProfile = await compileProfile(TAILWIND_PATHS.preflight)"

# Item 1: coverage.
run "C1 the caption side loses to the profile (a later-layer table rule)" \
	"tests/service/tailwind/preflight.test.ts compiled profile gains @layer utilities { table:where(*) { caption-side: bottom } }" no "$SERVICE" "
p='tests/service/tailwind/preflight.test.ts'
s=open(p).read()
assert s.count('$PROFILE')==1
open(p,'w').write(s.replace('$PROFILE', 'const preflightProfile = \`\${await compileProfile(TAILWIND_PATHS.preflight)}\\\\n@layer utilities { table:where(*) { caption-side: bottom } }\`'))
"
run "C2 the reading drops the declared longhands the reset never touches" \
	"tests/service/tailwind/preflight.test.ts reading = properties" no "$SERVICE" "
p='tests/service/tailwind/preflight.test.ts'
s=open(p).read()
old='const reading = [...new Set([...properties, ...declared])]'
assert s.count(old)==1
open(p,'w').write(s.replace(old, 'const reading = properties'))
"

# Item 2: the dimension key.
run "D1a the reset gives hr a fixed height (hr height: 0 -> 5px), no row recorded" \
	"tests/service/tailwind/preflight.test.ts compiled profile, height: 0 -> 5px" no "$SERVICE" "
p='tests/service/tailwind/preflight.test.ts'
s=open(p).read()
assert s.count('$PROFILE')==1
open(p,'w').write(s.replace('$PROFILE', 'const preflightProfile = (await compileProfile(TAILWIND_PATHS.preflight)).replace(/height: 0;/u, \'height: 5px;\')'))
"
run "D1b the same hr height move with its row recorded (hr | height | 5px), so it passes as a move like any other" \
	"tests/service/tailwind/preflight.test.ts compiled profile, height: 0 -> 5px; guides/veneer.md gains an hr | height row" no "$SERVICE" "
p='tests/service/tailwind/preflight.test.ts'
s=open(p).read()
assert s.count('$PROFILE')==1
open(p,'w').write(s.replace('$PROFILE', 'const preflightProfile = (await compileProfile(TAILWIND_PATHS.preflight)).replace(/height: 0;/u, \'height: 5px;\')'))
p='guides/veneer.md'
lines=open(p).read().split('\\n')
idx=[i for i,l in enumerate(lines) if l.startswith('| \`hr\`       | \`tab-size\`')]
assert len(idx)==1
lines.insert(idx[0], lines[idx[0]].replace('\`tab-size\`', '\`height\`').replace('\`8\`', '\`1px\`').replace('\`4\`', '\`5px\`'))
open(p,'w').write('\\n'.join(lines))
"
run "D2 the height dimension leaves select out of its tags" \
	"tests/setupStyles.ts PREFLIGHT_DIMENSIONS tags" no "$SERVICE" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"tags: Object.freeze(['input', 'select', 'textarea'])\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, \"tags: Object.freeze(['input', 'textarea'])\"))
"
run "D3 a guide row records a form control's height (the select | height row of the unpatched table)" \
	"guides/veneer.md the select | height row" no "$SERVICE" "
p='guides/veneer.md'
source=open('/home/user/veneer-pl/guides/veneer.md').read().split('\\n')
row=[l for l in source if l.startswith('| \`select\`   | \`height\`')]
assert len(row)==1
lines=open(p).read().split('\\n')
idx=[i for i,l in enumerate(lines) if l.startswith('| \`select\`   | \`color\`')]
assert len(idx)==1
lines.insert(idx[0]+1, row[0])
open(p,'w').write('\\n'.join(lines))
"
run "D4 a dimension edge dropped (height without padding-top)" \
	"tests/setupStyles.ts PREFLIGHT_DIMENSIONS edges" no "$SERVICE" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"\\t\\t\\t'padding-top',\\n\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, ''))
"
run "D5 the dimension names width in place of height" \
	"tests/setupStyles.ts PREFLIGHT_DIMENSIONS dimension" no "$SERVICE" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"\\t\\tdimension: 'height',\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, \"\\t\\tdimension: 'width',\"))
"

# Item 3: the control.
run "S1 the staged defaults sit in a sublayer of base" \
	"tests/setupStyles.ts PREFLIGHT_BUILDS staged row" no "$SERVICE" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"'@layer theme.defaults { select\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, \"'@layer base.defaults { select\"))
"
run "S2 the staged defaults sit in a top-level layer above the cascade" \
	"tests/setupStyles.ts PREFLIGHT_BUILDS staged row" no "$SERVICE" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"'@layer theme.defaults { select\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, \"'@layer defaults { select\"))
"
run "S3 the staged defaults never reach the page (an empty staged layer)" \
	"tests/setupStyles.ts PREFLIGHT_BUILDS staged row" no "$SERVICE" "
import re
p='tests/setupStyles.ts'
s=open(p).read()
new=re.sub(r\"'@layer theme\\.defaults \\{ select [^']*'\", \"'@layer theme.defaults {}'\", s)
assert new!=s
open(p,'w').write(new)
"

# Round-1 mutations, re-run on the round-2 tree.
run "M1a a preflight value changed (vertical-align: middle -> top)" \
	"tests/service/tailwind/preflight.test.ts compiled profile" no "$SERVICE" "
p='tests/service/tailwind/preflight.test.ts'
s=open(p).read()
assert s.count('$PROFILE')==1
open(p,'w').write(s.replace('$PROFILE', 'const preflightProfile = (await compileProfile(TAILWIND_PATHS.preflight)).replace(/vertical-align: middle/gu, \'vertical-align: top\')'))
"
run "M1b a preflight value changed (replaced elements display: inline)" \
	"tests/service/tailwind/preflight.test.ts compiled profile" no "$SERVICE" "
p='tests/service/tailwind/preflight.test.ts'
s=open(p).read()
assert s.count('$PROFILE')==1
open(p,'w').write(s.replace('$PROFILE', 'const preflightProfile = (await compileProfile(TAILWIND_PATHS.preflight)).replace(/display: block;([^;]*?)vertical-align: middle/u, \'display: inline;\$1vertical-align: middle\')'))
"
run "M2 a Veneer elements-layer declaration stops holding (ul list-style-type: revert-layer)" \
	"src/styles/elements/_ul.scss" yes "$SERVICE" "
p='src/styles/elements/_ul.scss'
s=open(p).read()
assert s.count('list-style-type: disc;')==1
open(p,'w').write(s.replace('list-style-type: disc;','list-style-type: revert-layer;'))
"
run "M3 a guide row removed (a | tab-size)" \
	"guides/veneer.md" no "$SERVICE" "
p='guides/veneer.md'
lines=open(p).read().split('\\n')
hit=[l for l in lines if l.startswith('| \`a\`        | \`tab-size\`')]
assert len(hit)==1
open(p,'w').write('\\n'.join(l for l in lines if l not in hit))
"
run "M12 a guide row records a pair Veneer declares (hr | border-top-style)" \
	"guides/veneer.md" no "$SERVICE" "
p='guides/veneer.md'
lines=open(p).read().split('\\n')
idx=[i for i,l in enumerate(lines) if l.startswith('| \`hr\`       | \`tab-size\`')]
assert len(idx)==1
lines.insert(idx[0], lines[idx[0]].replace('\`tab-size\`', '\`border-top-style\`').replace('\`8\`', '\`none\`').replace('\`4\`', '\`solid\`'))
open(p,'w').write('\\n'.join(lines))
"
run "M9 setup proof: the host row's layer is not a theme sublayer" \
	"tests/setupStyles.ts PREFLIGHT_BUILDS host row" no "$SETUP" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"['the host defaults', '@layer theme.defaults {}']\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, \"['the host defaults', '@layer defaults {}']\"))
"
run "M10 setup proof: the content box extent ignores box-sizing" \
	"tests/setupStyles.ts computeContentExtent" no "$SETUP" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"reading.get('box-sizing') === 'border-box' ? dimension.edges : []\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, 'dimension.edges'))
"
run "M11 setup proof: a dimension edge is not a padding or border width, and a tag is not rendered" \
	"tests/setupStyles.ts PREFLIGHT_DIMENSIONS" no "$SETUP" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"\\t\\t\\t'padding-top',\\n\"
assert s.count(old)==1
s=s.replace(old, \"\\t\\t\\t'margin-top',\\n\")
old=\"tags: Object.freeze(['input', 'select', 'textarea'])\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, \"tags: Object.freeze(['input', 'select', 'textarea', 'video'])\"))
"

restore
echo "=== scratch restored" >> "$LOG"
