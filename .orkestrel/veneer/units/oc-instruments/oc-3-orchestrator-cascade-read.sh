#!/bin/bash
# oc3-cascade-read.sh: build OFFCANVAS round 3 (2a3f223 + owned files + oc-shared-3.patch) in a scratch copy and read the navbar and offcanvas rules the round-3 navbar comment names. Log: oc3-cascade-read.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; C=$S/oc3-copy; LOG=$S/oc3-cascade-read.log.txt; : > $LOG
rm -rf $C && mkdir -p $C && git -C /home/user/veneer archive 2a3f223 | tar -x -C $C && cd $C && git init -q
git apply /home/user/scaffold/.orkestrel/veneer/units/oc-shared-3.patch >> $LOG 2>&1; echo "=== apply exit=$?" >> $LOG
for f in $(git -C /home/user/veneer-oc status --porcelain | awk '{print $2}'); do mkdir -p $(dirname $f); cp /home/user/veneer-oc/$f $f; done
cp -al /home/user/veneer-oc/node_modules node_modules
export PATH="$S/npm11/node_modules/.bin:$PATH"; npm run build:src:styles >> $LOG 2>&1; echo "=== build exit=$?" >> $LOG
node -e '
const css=require("fs").readFileSync("dist/src/styles/index.css","utf8");
for (const sel of [".navbar-expand-lg .offcanvas{",".offcanvas{",".offcanvas.offcanvas-end{",".offcanvas.offcanvas-top{",".navbar-expand-lg .navbar-collapse{",".collapse:not(.show){"]) {
  let i=css.indexOf(sel); const hits=[]; while(i>=0){hits.push(i); i=css.indexOf(sel,i+1)}
  for (const h of hits) { const end=css.indexOf("}",h); console.log(h, css.slice(h, Math.min(end+1,h+420))); }
}' >> $LOG 2>&1
echo "=== read exit=$?" >> $LOG
