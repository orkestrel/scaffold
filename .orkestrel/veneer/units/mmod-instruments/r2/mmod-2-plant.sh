#!/usr/bin/env bash
# Round 2 of E-ID-MOTION-MODAL, successor to mmod-plant.sh: same plant, round-2 log names.
# Plants one edit, runs the owned style proofs, and restores the file byte-identically.
# usage: mmod-2-plant.sh NAME FILE OLD NEW
source /home/user/veneer-mmod/tmp/units/mmod-env.sh
name=$1; file=$2; old=$3; new=$4
log=/home/user/veneer-mmod/tmp/units/mmod-2-plant-$name.log.txt
backup=/home/user/veneer-mmod/tmp/units/mmod-2-plant-$name.backup
cp "$file" "$backup"
OLD="$old" NEW="$new" python3 -c '
import os,sys
p=sys.argv[1]; s=open(p).read(); o=os.environ["OLD"]; n=os.environ["NEW"]
assert s.count(o)==1, "plant anchor not unique"
open(p,"w").write(s.replace(o,n))' "$file" || { rm "$backup"; echo "plant failed"; exit 1; }
{ echo "plant: $file"; diff "$backup" "$file"; echo "+ npm run build:src:styles"; npm run build:src:styles >/dev/null 2>&1; echo "build=$?"
  echo "+ npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/modal.test.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/mixins.test.ts"
  npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/modal.test.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/mixins.test.ts; echo "exit=$?"; cat /proc/loadavg; } > "$log" 2>&1
cp "$backup" "$file"
cmp "$backup" "$file" && echo "restored=identical" >> "$log"
rm "$backup"
npm run build:src:styles >/dev/null 2>&1; echo "rebuild=$?" >> "$log"
grep -E "×|AssertionError|Error:|Tests |exit=|restored=|rebuild=" "$log"
