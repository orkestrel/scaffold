#!/usr/bin/env bash
# Successor to moff-plants.sh (round 2): runs the round-1 plants and the plants the audit named
# (hiding-opaque, leak, mixin) against the owned style proofs, restoring each planted file
# byte-identically. Pass plant names to run a subset; no argument runs every plant.
cd /home/user/veneer-moff || exit 1
export PATH=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
OFF=src/styles/components/_offcanvas.scss
NAV=src/styles/components/_navbar.scss
declare -A FILE SCRIPT
FILE[literal]=$OFF
SCRIPT[literal]='
import sys;p=sys.argv[1];s=open(p).read()
a="""		--bs-offcanvas-transition:
			transform var(--vn-motion-panel) var(--vn-ease-panel),
			opacity var(--vn-motion-panel) var(--vn-ease-out);"""
assert s.count(a)==1;open(p,"w").write(s.replace(a,"		--bs-offcanvas-transition: transform 0.3s ease-in-out;"))'
FILE[opacity]=$OFF
SCRIPT[opacity]='
import sys;p=sys.argv[1];s=open(p).read()
a="	visibility: hidden,\n	opacity: 0,\n"
assert s.count(a)==1;open(p,"w").write(s.replace(a,"	visibility: hidden,\n"))'
FILE[transition]=$OFF
SCRIPT[transition]='
import sys;p=sys.argv[1];s=open(p).read()
a="@include transition(var(--bs-offcanvas-transition));"
assert s.count(a)==2;open(p,"w").write("\n".join(l for l in s.split("\n") if a not in l))'
FILE[navbar-reset]=$NAV
SCRIPT[navbar-reset]='
import sys;p=sys.argv[1];s=open(p).read()
a="			transform: none !important;\n			opacity: 1;\n"
assert s.count(a)==1;open(p,"w").write(s.replace(a,"			transform: none !important;\n"))'
FILE[hiding-opaque]=$OFF
SCRIPT[hiding-opaque]='
import sys;p=sys.argv[1];s=open(p).read()
assert s.endswith("\t}\n}\n")
open(p,"w").write(s[:-len("}\n")]+"\n\t@include breakpoint-down(sm) {\n\t\t.offcanvas-sm.hiding {\n\t\t\topacity: 1;\n\t\t}\n\t}\n}\n")'
FILE[leak]=$OFF
SCRIPT[leak]='
import sys;p=sys.argv[1];s=open(p).read()
a="					--bs-offcanvas-border-width: 0;\n"
assert s.count(a)==1;open(p,"w").write(s.replace(a,a+"					opacity: 0;\n"))'
FILE[mixin]=$OFF
SCRIPT[mixin]='
import sys;p=sys.argv[1];s=open(p).read()
a="\n\t\t@include transition(var(--bs-offcanvas-transition));\n"
assert s.count(a)==1;open(p,"w").write(s.replace(a,"\n\t\ttransition: var(--bs-offcanvas-transition);\n"))'
plant() {
	local name=$1 file=${FILE[$1]} script=${SCRIPT[$1]}
	local log=tmp/units/moff-plant-$name.log.txt
	local backup=tmp/units/work/plant-$name.bak
	cp "$file" "$backup"
	python3 -c "$script" "$file"
	{
		echo "# plant $name on $file (moff-plants-2.sh)"
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
	echo "$name $(grep '^exit=' "$log") $(tail -1 "$log")"
}
names=("$@")
[ ${#names[@]} -eq 0 ] && names=(literal opacity transition navbar-reset hiding-opaque leak mixin)
for name in "${names[@]}"; do plant "$name"; done
npm run build:src:styles >/dev/null 2>&1; echo "final build=$?"
