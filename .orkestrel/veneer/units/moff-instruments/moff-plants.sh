#!/usr/bin/env bash
# Runs each plant against the owned style proofs and restores the planted file byte-identically.
cd /home/user/veneer-moff || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
plant() {
	local name=$1 file=$2 script=$3
	local log=tmp/units/moff-plant-$name.log.txt
	local backup=tmp/units/work/plant-$name.bak
	cp "$file" "$backup"
	python3 -c "$script" "$file"
	{
		echo "# plant $name on $file"
		diff "$backup" "$file"
		echo '$ npm run build:src:styles'
		npm run build:src:styles >/dev/null 2>&1; echo "build=$?"
		echo '$ npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/navbar.test.ts'
		npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/navbar.test.ts
		echo "exit=$?"
		cat /proc/loadavg
	} > "$log" 2>&1
	cp "$backup" "$file"
	if cmp "$backup" "$file"; then echo "restored=identical" >> "$log"; else echo "restored=DIFFERS" >> "$log"; fi
}
plant literal src/styles/components/_offcanvas.scss '
import sys;p=sys.argv[1];s=open(p).read()
a="""		--bs-offcanvas-transition:
			transform var(--vn-motion-panel) var(--vn-ease-panel),
			opacity var(--vn-motion-panel) var(--vn-ease-out);"""
assert s.count(a)==1;open(p,"w").write(s.replace(a,"		--bs-offcanvas-transition: transform 0.3s ease-in-out;"))'
plant opacity src/styles/components/_offcanvas.scss '
import sys;p=sys.argv[1];s=open(p).read()
a="	visibility: hidden,\n	opacity: 0,\n"
assert s.count(a)==1;open(p,"w").write(s.replace(a,"	visibility: hidden,\n"))'
plant transition src/styles/components/_offcanvas.scss '
import sys;p=sys.argv[1];s=open(p).read()
a="@include transition(var(--bs-offcanvas-transition));"
assert s.count(a)==2;open(p,"w").write("\n".join(l for l in s.split("\n") if a not in l))'
plant navbar-reset src/styles/components/_navbar.scss '
import sys;p=sys.argv[1];s=open(p).read()
a="			transform: none !important;\n			opacity: 1;\n"
assert s.count(a)==1;open(p,"w").write(s.replace(a,"			transform: none !important;\n"))'
npm run build:src:styles >/dev/null 2>&1; echo "final build=$?"
