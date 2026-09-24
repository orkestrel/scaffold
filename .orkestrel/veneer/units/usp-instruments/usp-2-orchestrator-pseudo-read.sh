#!/bin/bash
# usp2-pseudo-read.sh: builds 2a3f223 with UTIL-SPACING's round-2 owned files and shared patch in a scratch copy,
# then lists every emitted selector that belongs to the unit's keys (the margin, padding, user-select, and
# pointer-events classes) and carries a colon, to settle the census's pseudo-class blind spot against product.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; C=$S/usp2-copy; rm -rf "$C"; mkdir -p "$C"
export PATH="$S/npm11/node_modules/.bin:$PATH"
git -C /home/user/veneer archive 2a3f223 | tar x -C "$C" && cd "$C" && git init -q && git apply /home/user/scaffold/.orkestrel/veneer/units/usp-shared-2.patch || exit 2
(cd /home/user/veneer-usp && git status --porcelain | awk '$1=="??"{print $2}') | while read f; do mkdir -p "$C/$(dirname $f)"; cp /home/user/veneer-usp/$f "$C/$f"; done
cp -al /home/user/veneer-usp/node_modules "$C/node_modules"
npm run build:src > "$S/usp2-pseudo-build.log.txt" 2>&1; echo "build exit=$?"
node -e '
const css=require("fs").readFileSync(process.argv[1],"utf8");
const sels=new Set(); for (const m of css.matchAll(/([^{}]+)\{/g)) for (const s of m[1].split(",")) sels.add(s.trim());
const unit=/^\.(m|p)[xytbse]?-(auto|n?\d)|^\.(user-select|pe)-/;
const hits=[...sels].filter(s=>unit.test(s)); console.log("unit selectors", hits.length, "with a colon", hits.filter(s=>s.includes(":")).join(" | ")||"none");
' "$C/dist/src/styles/index.css"
