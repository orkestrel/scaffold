#!/usr/bin/env bash
# The cascade census and its negative controls: the built cascade, a copy with a planted selector
# under the unit's keys that the inventory does not record, and a copy with one declaration written
# normal. The copies live under tmp/probe/usp-census and are removed after the runs.
set -uo pipefail
cd /home/user/veneer-usp/tmp/probe
BUILT=base/dist/src/styles/index.css
mkdir -p usp-census
python3 -c "import sys;s=open(sys.argv[1]).read();o='.m-3{margin:var(--vn-space-8)!important}';assert o in s;open(sys.argv[2],'w').write(s.replace(o,o+'.m-6{margin:4rem!important}',1))" "$BUILT" usp-census/extra.css
python3 -c "import sys;s=open(sys.argv[1]).read();o='.m-3{margin:var(--vn-space-8)!important}';assert o in s;open(sys.argv[2],'w').write(s.replace(o,'.m-3{margin:var(--vn-space-8)}',1))" "$BUILT" usp-census/normal.css
for target in "$BUILT" usp-census/extra.css usp-census/normal.css; do
	echo "== census over $target"
	echo "command: node /home/user/veneer-usp/tmp/units/usp-cascade-2.mjs $(realpath "$target")"
	node /home/user/veneer-usp/tmp/units/usp-cascade-2.mjs "$(realpath "$target")"
	echo "census exit $?"
done
rm -r usp-census
