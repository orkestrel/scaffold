#!/usr/bin/env bash
# Plants one literal, runs the owned style proofs, and restores the file byte-identically.
# usage: mmod-plant.sh NAME FILE OLD NEW
source /home/user/veneer-mmod/tmp/units/mmod-env.sh
name=$1; file=$2; old=$3; new=$4
log=/home/user/veneer-mmod/tmp/units/mmod-plant-$name.log.txt
backup=/home/user/veneer-mmod/tmp/units/mmod-plant-$name.backup
cp "$file" "$backup"
OLD="$old" NEW="$new" python3 -c '
import os,sys
p=sys.argv[1]; s=open(p).read(); o=os.environ["OLD"]; n=os.environ["NEW"]
assert s.count(o)==1, "plant anchor not unique"
open(p,"w").write(s.replace(o,n))' "$file"
{ echo "plant: $file"; diff "$backup" "$file"; npm run build:src:styles >/dev/null 2>&1; echo "build=$?"
  npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/modal.test.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/mixins.test.ts; echo "exit=$?"; cat /proc/loadavg; } > "$log" 2>&1
cp "$backup" "$file"
cmp "$backup" "$file" && echo "restored=identical" >> "$log"
rm "$backup"
grep -E "×|AssertionError|Tests |exit=|restored=" "$log"
