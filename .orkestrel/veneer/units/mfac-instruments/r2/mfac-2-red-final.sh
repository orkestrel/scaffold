#!/usr/bin/env bash
# Round 2: puts round 1's direct factor reads back on the label and the bar, runs the subtree cases
# with the same command the green reading uses, and restores both partials byte-identically.
cd /home/user/veneer-mfac || exit 1
. tmp/units/mfac-env.sh
files="src/styles/components/_form-floating.scss src/styles/components/_progress.scss"
for f in $files; do cp "$f" "tmp/units/$(basename "$f").red-backup"; done
sums_before=$(sha256sum $files)
python3 tmp/units/mfac-2-plant-label.py src/styles/components/_form-floating.scss
python3 tmp/units/mfac-2-plant-bar.py src/styles/components/_progress.scss
tmp/units/mfac-2-styles-run.sh red-final 'subtree that sets the motion factor alone' tests/src/styles/components/form-floating.test.ts tests/src/styles/components/progress.test.ts > /dev/null
for f in $files; do cp "tmp/units/$(basename "$f").red-backup" "$f"; rm "tmp/units/$(basename "$f").red-backup"; done
sums_after=$(sha256sum $files)
if [ "$sums_before" = "$sums_after" ]; then echo "restored=identical" >> tmp/units/mfac-2-red-final.log.txt; else echo "restored=DIFFERENT" >> tmp/units/mfac-2-red-final.log.txt; fi
npm run build:src:styles > /dev/null 2>&1; echo "rebuild-exit=$?" >> tmp/units/mfac-2-red-final.log.txt
