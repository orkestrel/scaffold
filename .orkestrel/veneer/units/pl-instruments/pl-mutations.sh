#!/usr/bin/env bash
# PREFLIGHT-HOST (pl) mutation runs. Each mutation edits the scratch copy under
# tmp/probe/pl-scratch (the worktree's tracked files plus pl-shared.patch applied), runs the named
# scoped command there, logs the site, command, build exit, test exit, summary line, and failing
# case names, and restores the scratch file from the worktree or the patched guide copy.
set -u
W=/home/user/veneer-pl
S=$W/tmp/probe/pl-scratch
LOG=$W/tmp/units/pl-mutations.log.txt
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
SERVICE="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project service tests/service/tailwind/preflight.test.ts"
SETUP="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts"
: > "$LOG"

restore() {
	for f in tests/setupStyles.ts tests/setupStyles.test.ts tests/service/tailwind/preflight.test.ts src/styles/elements/_ul.scss; do cp "$W/$f" "$S/$f"; done
	cp "$W/tmp/probe/pl-guide-patched.md" "$S/guides/veneer.md"
}

# run NAME SITE BUILD(yes|no) COMMAND PYTHON-MUTATION
run() {
	local name=$1 site=$2 build=$3 command=$4 mutation=$5
	restore
	(cd "$S" && python3 -c "$mutation") >> "$LOG" 2>&1
	local mexit=$?
	{
		echo "=== $name"
		echo "site: $site"
		echo "mutation applied exit: $mexit"
		(cd "$S" && git -C "$W" diff --no-index --stat -- "$W/$(echo "$site" | cut -d' ' -f1)" "$S/$(echo "$site" | cut -d' ' -f1)" 2>/dev/null | tail -1)
	} >> "$LOG"
	local bexit="not run"
	if [ "$build" = yes ]; then
		(cd "$S" && npm run build:src:styles > "$W/tmp/units/pl-mutation-build.log.txt" 2>&1)
		bexit=$?
	fi
	echo "build exit: $bexit" >> "$LOG"
	echo "command: (cd tmp/probe/pl-scratch && $command)" >> "$LOG"
	(cd "$S" && eval "$command" > "$W/tmp/units/pl-mutation-run.log.txt" 2>&1)
	local texit=$?
	echo "test exit: $texit" >> "$LOG"
	grep -E "^\s+Tests " "$W/tmp/units/pl-mutation-run.log.txt" | sed 's/^/summary: /' >> "$LOG"
	grep -E "^ FAIL " "$W/tmp/units/pl-mutation-run.log.txt" | sed 's/^/failing: /' >> "$LOG"
	grep -E "^(AssertionError|Error|TypeError).*" "$W/tmp/units/pl-mutation-run.log.txt" | head -4 | sed 's/^/message: /' >> "$LOG"
	grep -E '^\+   "' "$W/tmp/units/pl-mutation-run.log.txt" | head -6 | sed 's/^/received: /' >> "$LOG"
	if [ "$build" = yes ]; then
		restore
		(cd "$S" && npm run build:src:styles > "$W/tmp/units/pl-mutation-build.log.txt" 2>&1)
		echo "restore build exit: $?" >> "$LOG"
	fi
	echo >> "$LOG"
}

run "M1a a preflight value changed (Tailwind's reset aligns replaced elements to the top)" \
	"tests/service/tailwind/preflight.test.ts compiled profile, vertical-align: middle -> top" no "$SERVICE" "
p='tests/service/tailwind/preflight.test.ts'
s=open(p).read()
old='const preflightProfile = await compileProfile(TAILWIND_PATHS.preflight)'
assert s.count(old)==1
s=s.replace(old, 'const preflightProfile = (await compileProfile(TAILWIND_PATHS.preflight)).replace(/vertical-align: middle/gu, \'vertical-align: top\')')
open(p,'w').write(s)
"

run "M1b a preflight value changed (Tailwind's reset leaves replaced elements inline)" \
	"tests/service/tailwind/preflight.test.ts compiled profile, display: block -> inline on the replaced-element rule" no "$SERVICE" "
p='tests/service/tailwind/preflight.test.ts'
s=open(p).read()
old='const preflightProfile = await compileProfile(TAILWIND_PATHS.preflight)'
assert s.count(old)==1
s=s.replace(old, 'const preflightProfile = (await compileProfile(TAILWIND_PATHS.preflight)).replace(/display: block;([^;]*?)vertical-align: middle/u, \'display: inline;\$1vertical-align: middle\')')
open(p,'w').write(s)
"

run "M2 a Veneer elements-layer declaration stops holding its value (ul list-style-type reverts to the layer beneath)" \
	"src/styles/elements/_ul.scss list-style-type: disc -> revert-layer" yes "$SERVICE" "
p='src/styles/elements/_ul.scss'
s=open(p).read()
assert s.count('list-style-type: disc;')==1
open(p,'w').write(s.replace('list-style-type: disc;','list-style-type: revert-layer;'))
"

run "M3 a guide row removed (a | tab-size)" \
	"guides/veneer.md the a | tab-size row" no "$SERVICE" "
p='guides/veneer.md'
lines=open(p).read().split('\n')
hit=[l for l in lines if l.startswith('| \`a\`        | \`tab-size\`')]
assert len(hit)==1
open(p,'w').write('\n'.join(l for l in lines if l not in hit))
"

run "M4 a guide row's preflight value changed (html | tab-size 4 -> 2)" \
	"guides/veneer.md the html | tab-size row" no "$SERVICE" "
p='guides/veneer.md'
lines=open(p).read().split('\n')
idx=[i for i,l in enumerate(lines) if l.startswith('| \`html\`     | \`tab-size\`')]
assert len(idx)==1
lines[idx[0]]=lines[idx[0]].replace('| \`4\`   ','| \`2\`   ')
assert '\`2\`' in lines[idx[0]]
open(p,'w').write('\n'.join(lines))
"

run "M5 a guide row records a dimension (the select | height row of the unpatched table)" \
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

run "M6 a dimension edge dropped (height without padding-top)" \
	"tests/setupStyles.ts PREFLIGHT_DIMENSIONS height edges" no "$SERVICE" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"Object.freeze(['border-top-width', 'padding-top', 'padding-bottom', 'border-bottom-width'])\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, \"Object.freeze(['border-top-width', 'padding-bottom', 'border-bottom-width'])\"))
"

run "M7 the staged defaults sit above the cascade (a top-level layer rather than a theme sublayer)" \
	"tests/setupStyles.ts PREFLIGHT_BUILDS Chromium 153 sheet" no "$SERVICE" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"'@layer theme.defaults { select\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, \"'@layer defaults { select\"))
"

run "M8 the staged defaults never reach the page (the Chromium 153 row stages an empty layer)" \
	"tests/setupStyles.ts PREFLIGHT_BUILDS Chromium 153 sheet" no "$SERVICE" "
import re
p='tests/setupStyles.ts'
s=open(p).read()
new=re.sub(r\"'@layer theme\\.defaults \\{ select [^']*'\", \"'@layer theme.defaults {}'\", s)
assert new!=s
open(p,'w').write(new)
"

run "M9 setup proof: the host row's layer is not a theme sublayer" \
	"tests/setupStyles.ts PREFLIGHT_BUILDS host row" no "$SETUP" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"['the host build', '@layer theme.defaults {}']\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, \"['the host build', '@layer defaults {}']\"))
"

run "M10 setup proof: the content extent ignores box-sizing" \
	"tests/setupStyles.ts computeContentExtent" no "$SETUP" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"reading.get('box-sizing') === 'border-box' ? edges : []\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, 'edges'))
"

run "M11 setup proof: a dimension edge is not a padding or border width" \
	"tests/setupStyles.ts PREFLIGHT_DIMENSIONS height edges" no "$SETUP" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"'border-top-width', 'padding-top', 'padding-bottom', 'border-bottom-width'\"
assert s.count(old)==1
open(p,'w').write(s.replace(old, \"'border-top-width', 'margin-top', 'padding-bottom', 'border-bottom-width'\"))
"

run "M12 a guide row records a pair Veneer declares (hr | border-top-style)" \
	"guides/veneer.md an hr | border-top-style row" no "$SERVICE" "
p='guides/veneer.md'
lines=open(p).read().split('\\n')
idx=[i for i,l in enumerate(lines) if l.startswith('| \`hr\`       | \`tab-size\`')]
assert len(idx)==1
lines.insert(idx[0], lines[idx[0]].replace('\`tab-size\`', '\`border-top-style\`').replace('\`8\`', '\`none\`').replace('\`4\`', '\`solid\`'))
open(p,'w').write('\\n'.join(lines))
"

run "M13 the dimensions table names a dimension the pairing never moves (width in place of height)" \
	"tests/setupStyles.ts PREFLIGHT_DIMENSIONS dimension" no "$SERVICE" "
p='tests/setupStyles.ts'
s=open(p).read()
old=\"Object.freeze([\\n\\t\\t'height',\"
assert s.count(old)==1, s.count(old)
open(p,'w').write(s.replace(old, \"Object.freeze([\\n\\t\\t'width',\"))
"

restore
echo "=== scratch restored" >> "$LOG"
