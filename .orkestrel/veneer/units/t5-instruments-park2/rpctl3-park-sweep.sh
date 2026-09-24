#!/bin/bash
# Park-point sweep in the RP control worktree (probe D variant: park, then stagePane at the tester's own size, with
# the copy at the tester origin in journey:light-390). Rewrites only this worktree's unshared copy of the round-5
# build's park coordinate, runs the case per point, and restores the copy. Log: rpctl3-park-sweep.log.txt
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; P=$S/veneer-rpctl3; F=$P/node_modules/@orkestrel/test/dist/src/browser/index.js
LOG=$S/rpctl3-park-sweep.log.txt; : > $LOG
cd $P || exit 1
for pt in "-1 -1" "-1000 -1000" "801 -1" "-1 514" "801 514" "5000 5000"; do
  set -- $pt; cp $S/rpctl3-index-r5.js.txt $F
  python3 - "$1" "$2" "$F" <<'PY'
import sys
x,y,f=sys.argv[1],sys.argv[2],sys.argv[3]
t=open(f).read(); old='x: -1,\n\t\t\ty: -1\n'
assert t.count(old)==1, 'park literal not found'
open(f,'w').write(t.replace(old,f'x: {x},\n\t\t\ty: {y}\n'))
PY
  ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390 -t "takes no mouseover event from the parked pointer" > $S/rpctl3-park-$1_$2.log.txt 2>&1
  echo "park ($1, $2) exit=$? $(sed 's/\x1b\[[0-9;]*m//g' $S/rpctl3-park-$1_$2.log.txt | grep -oE 'primary-parked [a-z-]+ [0-9-]+,[0-9-]+' | head -1)" >> $LOG
done
cp $S/rpctl3-index-r5.js.txt $F; echo "restored $(cmp -s $S/rpctl3-index-r5.js.txt $F && echo ok)" >> $LOG
