#!/usr/bin/env bash
# Runs the three plants, each logged to tmp/units/lret-plant-<name>.log.txt and restored byte for
# byte from a backup under tmp/units, with the restoring `git diff --stat` in the log.
set -u
cd /home/user/veneer-lret
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
replace() {
	python3 - "$1" "$2" "$3" <<'PY'
import sys
p,old,new=sys.argv[1],sys.argv[2],sys.argv[3]
s=open(p).read()
assert s.count(old)==1, (p, old)
open(p,'w').write(s.replace(old,new,1))
PY
}
restore() {
	local log="$1"; shift
	for pair in "$@"; do
		local file="${pair%%=*}" backup="${pair#*=}"
		cp "$backup" "$file"
		cmp "$backup" "$file" && echo "restored $file byte-identical" >> "$log"
	done
	echo '--- git diff --stat after restore' >> "$log"
	git diff --stat -- src tests/setupServer.test.ts guides/veneer.md >> "$log"
}

# radius: doubles the canonical radius token in the tokens partial.
log=tmp/units/lret-plant-radius.log.txt
cp src/styles/_tokens.scss tmp/units/_tokens.scss.backup
replace src/styles/_tokens.scss '--vn-radius-base: calc(0.375rem * var(--vn-factor-radius));' '--vn-radius-base: calc(0.75rem * var(--vn-factor-radius));'
{
	echo 'plant=radius'; cat /proc/loadavg
	git diff -- src/styles/_tokens.scss
	npm run build:src:styles > /dev/null 2>&1; echo "build exit=$?"
	npm run test:conformance 2>&1; echo "exit=$?"
} > "$log"
restore "$log" "src/styles/_tokens.scss=tmp/units/_tokens.scss.backup"

# witness: moves one bootstrap-sourced token and its reference map cell together.
log=tmp/units/lret-plant-witness.log.txt
cp src/styles/_tokens.scss tmp/units/_tokens.scss.backup
cp guides/veneer.md tmp/units/veneer.md.plant-backup
replace src/styles/_tokens.scss '--vn-radius-pill: 50rem;' '--vn-radius-pill: 40rem;'
replace guides/veneer.md '`calc(2rem * var(--vn-factor-radius))`, `50rem`' '`calc(2rem * var(--vn-factor-radius))`, `40rem`'
{
	echo 'plant=witness'; cat /proc/loadavg
	git diff -- src/styles/_tokens.scss; git diff -- guides/veneer.md | grep '^[-+]|' | cut -c1-160
	npm run build:src:styles > /dev/null 2>&1; echo "build exit=$?"
	npm run test:conformance 2>&1; echo "exit=$?"
} > "$log"
restore "$log" "src/styles/_tokens.scss=tmp/units/_tokens.scss.backup" "guides/veneer.md=tmp/units/veneer.md.plant-backup"
npm run build:src:styles > tmp/units/lret-plant-rebuild.log.txt 2>&1; echo "rebuild exit=$?" >> tmp/units/lret-plant-rebuild.log.txt

# undecided: adds an in-memory pair no probe decides to the text-only proof's gaps.
log=tmp/units/lret-plant-undecided.log.txt
cp tests/setupServer.test.ts tmp/units/setupServer.test.ts.backup
replace tests/setupServer.test.ts "			['btn', '.btn', 'filter', ['none'], undefined],
		] as const" "			['btn', '.btn', 'filter', ['none'], undefined],
			['btn', '.btn', '--bs-btn-padding-x', ['1px'], 'red'],
		] as const"
{
	echo 'plant=undecided'; cat /proc/loadavg
	git diff -- tests/setupServer.test.ts | grep '^[-+]	' 
	npx vitest run --config vite.config.ts --no-cache --project setup tests/setupServer.test.ts -t "text-only member" 2>&1; echo "exit=$?"
} > "$log"
restore "$log" "tests/setupServer.test.ts=tmp/units/setupServer.test.ts.backup"
